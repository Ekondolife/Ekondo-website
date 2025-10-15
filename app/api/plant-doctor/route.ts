export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Simple, dependency-free advice generator to avoid external AI packages
    const userMessage: string = Array.isArray(messages)
      ? String(messages[messages.length - 1]?.content ?? "")
      : ""

    const lower = userMessage.toLowerCase()
    let advice =
      "Hi! I'm Dibia 🌿. Tell me your plant type, location, and what's happening (yellow leaves? pests? watering?). I'll share tips suited for our climate."

    if (lower.includes("yellow") || lower.includes("brown")) {
      advice =
        "Yellowing leaves often come from overwatering or low light. Let the top 2–3cm of soil dry before watering, move to bright indirect light, and trim damaged leaves. In Lagos humidity, water less during rainy season."
    } else if (lower.includes("pest") || lower.includes("insect") || lower.includes("mealy") || lower.includes("aphid")) {
      advice =
        "For common pests (mealybugs/aphids), wipe leaves with a mild soapy-water solution, then rinse. Repeat 2–3 times weekly. Improve airflow and avoid overfertilizing. Neem oil spray at night can help."
    } else if (lower.includes("water") || lower.includes("watering")) {
      advice =
        "Water when the topsoil dries. Most indoor plants prefer deep watering then full drain—never let pots sit in water. In warm seasons, check twice weekly; in rainy season, reduce frequency."
    } else if (lower.includes("light") || lower.includes("sun")) {
      advice =
        "Aim for bright, indirect light. East-facing windows are gentle; harsh afternoon sun can scorch leaves. Rotate the pot monthly so growth stays even."
    }

    return Response.json({ message: advice })
  } catch (error) {
    console.error("Plant Doctor API error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
