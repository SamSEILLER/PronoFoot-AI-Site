/**
 * PronoFoot AI — Cloudflare Worker backend
 * Required secret: OPENAI_API_KEY
 * Required variable: ALLOWED_ORIGIN (e.g. https://samseiller.github.io)
 */
const json = (body, status = 200, origin = "") => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": origin || "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  }
});
function cleanText(v, max = 100) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = env.ALLOWED_ORIGIN || "";
    if (request.method === "OPTIONS") {
      if (allowed && origin !== allowed) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: {
        "Access-Control-Allow-Origin": origin || allowed || "null",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
      }});
    }
    if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405, allowed);
    if (allowed && origin !== allowed) return json({ error: "Origine non autorisée." }, 403, allowed);
    if (!env.OPENAI_API_KEY) return json({ error: "Backend non configuré : secret OPENAI_API_KEY absent." }, 503, allowed);
    let payload;
    try { payload = await request.json(); } catch { return json({ error: "JSON invalide." }, 400, allowed); }
    const match = payload && payload.match;
    if (!match || typeof match !== "object") return json({ error: "Données du match manquantes." }, 400, allowed);
    const home = cleanText(match.home, 80), away = cleanText(match.away, 80), competition = cleanText(match.competition, 100);
    if (!home || !away) return json({ error: "Les deux équipes sont requises." }, 400, allowed);
    const probabilities = match.probabilities && typeof match.probabilities === "object" ? match.probabilities : {};
    const odds = match.odds_1x2 && typeof match.odds_1x2 === "object" ? match.odds_1x2 : {};
    const numeric = v => Number.isFinite(Number(v)) && v !== null && v !== "" ? Number(v) : null;
    const stats = {
      kickoff: cleanText(match.kickoff, 40),
      model: cleanText(match.prediction_model_version, 80),
      probabilities: { home: numeric(probabilities.home), draw: numeric(probabilities.draw), away: numeric(probabilities.away) },
      odds_1x2: { home: numeric(odds.home), draw: numeric(odds.draw), away: numeric(odds.away) },
      expected_goals: { home: numeric(match.home_expected_goals), away: numeric(match.away_expected_goals) },
      history_matches: numeric(match.history_matches),
      predicted_label: cleanText(match.predicted_label, 10),
      data_status: cleanText(payload.dataStatus, 80)
    };
    const sum = Object.values(stats.probabilities).every(v => v !== null) ? Object.values(stats.probabilities).reduce((a,b)=>a+b,0) : null;
    const prompt = [
      "Tu es Football Prediction Lab, analyste quantitatif prudent. Analyse uniquement les données fournies; ne prétends pas avoir consulté des sources externes.",
      "Réponds en français, de façon structurée et concise : (1) données et limites, (2) lecture probabiliste 1/N/2, (3) cotes justes 1/p si p valide, (4) espérance de retour p*cote-1 seulement si une cote réelle est présente, (5) facteurs de risque/scénarios d'invalidation, (6) verdict PARIER/BOF/À ÉVITER/NO BET, (7) score de robustesse SR sur 100 distinct de la probabilité.",
      "N'invente jamais blessures, compositions, météo, forme, statistiques, cotes ou sources. Signale explicitement les données manquantes. Le modèle est expérimental : si les données sont insuffisantes ou si la value n'est pas vérifiable, privilégie NO BET. Pas de garantie de gain. Une cote juste et une value ne sont calculables que pour les données valides.",
      "Si les probabilités ne totalisent pas environ 1 (tolérance 0.03), signale l'incohérence et ne fais pas de recommandation fondée dessus. Une cote manquante doit être dite indisponible.",
      "Match : " + home + " — " + away + ". Compétition : " + (competition || "non renseignée") + ".",
      "Données structurées (seule source factuelle) : " + JSON.stringify(stats),
      "Somme des probabilités 1/N/2 : " + (sum === null ? "indisponible" : sum.toFixed(4)) + "."
    ].join("\n\n");
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "Authorization": "Bearer " + env.OPENAI_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-4.1-mini",
          input: prompt,
          max_output_tokens: 1100,
          store: false
        })
      });
      const result = await response.json();
      if (!response.ok) {
        const message = response.status === 429 ? "Limite de requêtes atteinte. Réessaie plus tard." : "Le fournisseur IA a refusé la requête (" + response.status + ").";
        return json({ error: message }, response.status === 429 ? 429 : 502, allowed);
      }
      const text = (result.output || []).flatMap(item => item.content || []).filter(item => item.type === "output_text").map(item => item.text).join("\n").trim();
      if (!text) return json({ error: "L'IA n'a renvoyé aucun texte exploitable." }, 502, allowed);
      return json({ analysis: text, model: env.OPENAI_MODEL || "gpt-4.1-mini", generated_at: new Date().toISOString(), input_data: stats }, 200, allowed);
    } catch {
      return json({ error: "Service IA temporairement indisponible." }, 502, allowed);
    }
  }
};
