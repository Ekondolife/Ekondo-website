export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Enhanced plant advice system with comprehensive responses
    const userMessage: string = Array.isArray(messages)
      ? String(messages[messages.length - 1]?.content ?? "")
      : ""

    const lower = userMessage.toLowerCase()
    let advice = ""

    // Comprehensive plant advice based on user queries
    if (lower.includes("yellow") || lower.includes("brown") || lower.includes("wilting")) {
      advice = `🌿 **Yellow/Brown Leaves Diagnosis:**

**Common Causes:**
• Overwatering (most common in Lagos humidity)
• Underwatering during dry season
• Low light conditions
• Nutrient deficiency

**Solutions:**
• Check soil moisture - insert finger 2-3cm deep
• If wet: reduce watering frequency, improve drainage
• If dry: water thoroughly until drainage holes flow
• Move to bright, indirect light (east-facing window ideal)
• Trim damaged leaves to redirect energy
• Consider repotting if roots are cramped

**Lagos-Specific Tips:**
• Water less during rainy season (June-September)
• Increase humidity with pebble trays during harmattan
• Use well-draining soil mix (cocopeat + perlite)

Need more specific help? Tell me your plant type! 🌱`
    } 
    else if (lower.includes("pest") || lower.includes("insect") || lower.includes("mealy") || lower.includes("aphid") || lower.includes("bug")) {
      advice = `🐛 **Pest Control Guide:**

**Common Pests in Lagos:**
• Mealybugs (white cottony masses)
• Aphids (small green/black insects)
• Spider mites (tiny red/brown dots)
• Scale insects (brown bumps)

**Natural Treatment Steps:**
1. **Isolate** affected plant immediately
2. **Wipe** leaves with soapy water (1 tsp dish soap + 1L water)
3. **Rinse** thoroughly with clean water
4. **Repeat** every 3-4 days for 2 weeks
5. **Improve** airflow around plant
6. **Apply** neem oil spray at night (avoid sun exposure)

**Prevention:**
• Regular leaf cleaning
• Proper watering (avoid overwatering)
• Good air circulation
• Quarantine new plants for 2 weeks

**Emergency:** If severe infestation, consider pruning heavily affected areas. 🌿`
    }
    else if (lower.includes("water") || lower.includes("watering") || lower.includes("moisture")) {
      advice = `💧 **Watering Wisdom:**

**The Golden Rule:** Water when top 2-3cm of soil is dry

**Watering Technique:**
• Water slowly and deeply
• Continue until water flows from drainage holes
• Empty saucer after 30 minutes
• Never let pot sit in standing water

**Seasonal Schedule (Lagos):**
• **Dry Season (Nov-Mar):** Check every 3-4 days
• **Rainy Season (Jun-Sep):** Check every 5-7 days
• **Harmattan (Dec-Feb):** Increase humidity, reduce watering

**Signs to Watch:**
• **Overwatering:** Yellow leaves, mushy stems, mold
• **Underwatering:** Droopy leaves, dry soil, crispy edges

**Pro Tips:**
• Use room temperature water
• Water in morning for best absorption
• Group plants to increase humidity
• Consider self-watering pots for busy schedules

What's your current watering routine? 🌱`
    }
    else if (lower.includes("light") || lower.includes("sun") || lower.includes("window")) {
      advice = `☀️ **Light Requirements Guide:**

**Light Types:**
• **Direct Light:** Sun rays hit plant directly (morning sun OK, afternoon sun harsh)
• **Bright Indirect:** Near sunny window, no direct rays
• **Medium Indirect:** 2-3 feet from window
• **Low Light:** 4+ feet from window or north-facing

**Window Directions (Lagos):**
• **East:** Gentle morning sun - perfect for most plants
• **West:** Hot afternoon sun - use sheer curtains
• **South:** Brightest - great for sun-loving plants
• **North:** Lowest light - choose shade-tolerant plants

**Plant Placement Tips:**
• Rotate plant monthly for even growth
• Move 1-2 feet closer/farther to adjust light
• Use sheer curtains to filter harsh sun
• Consider grow lights for dark spaces

**Light Stress Signs:**
• **Too Much:** Brown spots, crispy edges, bleached leaves
• **Too Little:** Leggy growth, small leaves, leaning toward light

**Best Low-Light Plants for Lagos:**
• Snake Plant, ZZ Plant, Pothos, Peace Lily

Which direction does your window face? 🌿`
    }
    else if (lower.includes("soil") || lower.includes("potting") || lower.includes("repot")) {
      advice = `🪴 **Soil & Repotting Guide:**

**When to Repot:**
• Roots growing out of drainage holes
• Plant dries out very quickly
• Stunted growth despite good care
• Soil stays wet too long

**Best Soil Mix for Lagos:**
• 50% cocopeat (retains moisture)
• 30% perlite (improves drainage)
• 20% compost (adds nutrients)
• Optional: charcoal bits (prevents root rot)

**Repotting Steps:**
1. Choose pot 1-2 inches larger
2. Add drainage layer (pebbles/charcoal)
3. Fill with fresh soil mix
4. Gently remove plant, loosen roots
5. Place in new pot, fill gaps
6. Water thoroughly

**Pot Selection:**
• Terracotta: Good for overwaterers
• Ceramic: Retains moisture longer
• Plastic: Lightweight, good drainage
• Always ensure drainage holes!

**Timing:** Best in growing season (March-October)

Need help choosing the right pot size? 🌱`
    }
    else if (lower.includes("fertilizer") || lower.includes("feed") || lower.includes("nutrient")) {
      advice = `🌱 **Fertilizing Guide:**

**When to Fertilize:**
• Growing season: March-October
• Every 2-4 weeks for most plants
• Monthly for slow growers
• Never fertilize stressed plants

**Types of Fertilizers:**
• **Liquid:** Easy to apply, quick absorption
• **Granular:** Slow-release, lasts 2-3 months
• **Organic:** Compost, worm castings, fish emulsion

**Dilution Rule:** Use half-strength to avoid burn

**Signs of Over-fertilizing:**
• Brown leaf tips
• White crust on soil
• Stunted growth
• Leaf drop

**Signs of Under-fertilizing:**
• Pale leaves
• Slow growth
• Small new leaves

**Lagos-Specific Tips:**
• Reduce fertilizing during harmattan
• Flush soil monthly to prevent salt buildup
• Use organic options for edible plants

**Emergency:** If over-fertilized, flush soil with water 2-3 times. 🌿`
    }
    else if (lower.includes("propagate") || lower.includes("cutting") || lower.includes("multiply")) {
      advice = `✂️ **Propagation Guide:**

**Easy Plants to Propagate:**
• Pothos, Spider Plant, Snake Plant, ZZ Plant

**Water Propagation:**
1. Cut 4-6 inch stem with 2-3 leaves
2. Remove bottom leaves
3. Place in water (change weekly)
4. Wait for roots (2-4 weeks)
5. Plant in soil when roots are 2 inches

**Soil Propagation:**
1. Cut stem with nodes
2. Dip in rooting hormone (optional)
3. Plant in moist soil
4. Keep humid (cover with plastic)
5. Wait for new growth

**Division Method:**
• Separate plant at roots
• Ensure each section has roots
• Repot immediately
• Water lightly

**Best Time:** Spring/early summer for fastest results

**Pro Tip:** Use clean, sharp scissors for clean cuts!

Which plant are you trying to propagate? 🌱`
    }
    else if (lower.includes("lagos") || lower.includes("nigeria") || lower.includes("climate")) {
      advice = `🇳🇬 **Plant Care in Lagos Climate:**

**Climate Challenges:**
• High humidity (70-90%)
• Intense sun and heat
• Harmattan dust (Dec-Feb)
• Heavy rains (Jun-Sep)

**Adaptation Strategies:**
• **Humidity:** Group plants, use pebble trays
• **Heat:** Provide shade, increase watering
• **Dust:** Wipe leaves weekly during harmattan
• **Rain:** Reduce watering, improve drainage

**Best Plants for Lagos:**
• Snake Plant, ZZ Plant, Pothos
• Peace Lily, Spider Plant
• Rubber Plant, Monstera
• Succulents (with good drainage)

**Seasonal Care:**
• **Dry Season:** Increase humidity, reduce watering
• **Rainy Season:** Improve drainage, watch for mold
• **Harmattan:** Clean leaves, increase humidity

**Local Tips:**
• Use local soil amendments
• Buy from local nurseries
• Join Lagos plant communities
• Visit Ikoyi/Lekki plant markets

Ready to create your Lagos plant paradise? 🌿`
    }
    else if (lower.includes("beginner") || lower.includes("start") || lower.includes("first")) {
      advice = `🌱 **Beginner Plant Parent Guide:**

**Best Starter Plants:**
1. **Snake Plant** - Nearly indestructible
2. **Pothos** - Grows fast, easy to propagate
3. **ZZ Plant** - Thrives on neglect
4. **Spider Plant** - Produces babies easily
5. **Peace Lily** - Shows when it needs water

**Essential Supplies:**
• Well-draining pots with holes
• Quality potting mix
• Watering can with long spout
• Plant mister
• Basic fertilizer

**Golden Rules:**
1. **Start Small** - Begin with 2-3 plants
2. **Learn Each Plant** - Research individual needs
3. **Observe Daily** - Check soil, leaves, growth
4. **Don't Overwater** - Most common mistake
5. **Be Patient** - Plants grow slowly

**First Month Checklist:**
• Week 1: Learn watering schedule
• Week 2: Check light requirements
• Week 3: Look for pests/diseases
• Week 4: Assess growth and health

**Common Mistakes to Avoid:**
• Overwatering
• Wrong light placement
• Ignoring drainage
• Moving plants too often

**Pro Tip:** Keep a plant journal to track care!

Ready to start your plant journey? 🌿`
    }
    else {
      // Default response with helpful prompts
      advice = `🌿 **Sannu! I'm Dibia, your plant wisdom keeper.**

I specialize in helping with plant care in African climates, especially Lagos conditions. Here's how I can help:

**Quick Help Topics:**
• Yellow/brown leaves diagnosis
• Pest identification and treatment
• Watering schedules and techniques
• Light requirements and placement
• Soil and repotting advice
• Fertilizing guidelines
• Propagation methods
• Lagos climate adaptation

**To get the best advice, tell me:**
• What plant you have (if you know)
• What's happening (yellow leaves, pests, etc.)
• Your location (Lagos, other city)
• Your current care routine

**Example:** "My snake plant has yellow leaves and I'm in Lagos"

What's going on with your plants today? 🌱`
    }

    return Response.json({ message: advice })
  } catch (error) {
    console.error("Plant Doctor API error:", error)
    return Response.json({ 
      error: "I'm having trouble connecting right now. Please try again or visit our contact page for support." 
    }, { status: 500 })
  }
}
