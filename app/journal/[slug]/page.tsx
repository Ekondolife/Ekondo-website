import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import NewsletterSignup from "@/components/newsletter-signup"

export const postsBySlug: Record<string, any> = {
  "low-maintenance-indoor-plants-lagos-under-20000": {
    title: "10 Low-Maintenance Indoor Plants You Can Buy in Lagos (Under ₦20,000)",
    excerpt:
      "Looking for affordable low-maintenance indoor plants in Lagos that thrive in Nigeria’s climate? Discover 10 options under ₦20,000.",
    author: "Favour",
    authorBio: "Ekondo writer and plant enthusiast.",
    authorImage: "/placeholder-user.jpg",
    date: "October 6, 2025",
    readTime: "8 min read",
    category: "Plant Care",
    image: "/images/Ekondo Products/Size_B_Spider_Plant_in_a_Red_Chidi-scaled.webp",
    content: `
      <p>Looking for affordable low-maintenance indoor plants in Lagos that thrive in Nigeria’s climate? 
      Discover 10 low-maintenance houseplants (under ₦20,000) you can buy at Ekondo Life, plus care tips and pot pairing ideas.</p>

      <p>Living in Lagos can feel fast-paced and hectic, but adding plants to your apartment or office is one of the simplest ways to create calm, beauty, and fresh air. 
      At Ekondo Life, we specialize in low-maintenance indoor plants for Nigeria, carefully chosen for their ability to adapt to Lagos’s humidity, heat, and small living spaces.</p>

      <figure>
        <img src="/images/fine plant image.webp" alt="Lush indoor greenery" style="border-radius: full"/>
        <figcaption>Bring calm to your space with resilient, low-maintenance plants.</figcaption>
      </figure>

      <h2 className="text-2xl font-bold m-32">Why Low-Maintenance Plants Are Ideal for Lagos Apartments</h2>
      <ul>
        <li>Adaptable to Nigeria’s climate — handle humidity, heat, and dusty harmattan air.</li>
        <li>Beginner-friendly — easy to care for even with a busy schedule.</li>
        <li>Affordable & accessible — with options under ₦20,000, anyone can start a plant collection.</li>
        <li>Space-saving — fit perfectly into apartments, balconies, or office desks.</li>
      </ul>

      <h2>Top 10 Low-Maintenance Indoor Plants (Available at Ekondo Life)</h2>

      <h3>1. Snake Plant (Sansevieria)</h3>
      <p><strong>Light & Placement:</strong> Thrives in low to bright light. Great for corners.<br/>
      <strong>Care Tips:</strong> Water once every 2–3 weeks. Extremely drought-tolerant.<br/>
      <strong>Price at Ekondo Life:</strong> ₦15,000 – ₦25,000</p>

      <h3>2. Baby Rubber Plant (Peperomia obtusifolia)</h3>
      <p><strong>Light & Placement:</strong> Medium to bright indirect light.<br/>
      <strong>Care Tips:</strong> Water when topsoil feels dry; leaves store water.<br/>
      <strong>Price at Ekondo Life:</strong> ₦15,000 – ₦25,000</p>

      <figure>
        <img src="/images/sans img.jpg" alt="Stylish pots and indoor plants" />
        <figcaption>Style your plants with our handcrafted pots.</figcaption>
      </figure>

      <h3>3. Peace Lily (Spathiphyllum)</h3>
      <p><strong>Light & Placement:</strong> Bright, indirect light.<br/>
      <strong>Care Tips:</strong> Water weekly. Leaves droop when thirsty — easy reminder!<br/>
      <strong>Price:</strong> ₦15,000 – ₦25,000</p>

      <h3>4. Aloe Vera</h3>
      <p><strong>Light & Placement:</strong> Sunny window spots.<br/>
      <strong>Care Tips:</strong> Water sparingly. Bonus: natural skin care benefits.<br/>
      <strong>Price:</strong> ₦15,000 – ₦25,000</p>

      <h3>5. Pothos (Golden / Marble Queen)</h3>
      <p><strong>Light & Placement:</strong> Hanging shelves or trailing from pots.<br/>
      <strong>Care Tips:</strong> Tolerates low light. Water when topsoil is dry.<br/>
      <strong>Price:</strong> ₦15,000 – ₦25,000</p>

      <h2>Care Tips for Indoor Plants in Lagos</h2>
      <ul>
        <li>Use well-draining soil and pots with holes.</li>
        <li>Rotate plants monthly so all sides get light.</li>
        <li>Wipe dust from leaves (especially during harmattan).</li>
        <li>Water less during rainy season to prevent root rot.</li>
      </ul>

      <h2>Where to Buy Indoor Plants in Lagos</h2>
      <p>You can buy all these plants directly from Ekondo Life:</p>
      <ul>
        <li><a href="https://ekondolife.com/plants/" target="_blank">Browse our Indoor Plant Collection</a></li>
        <li>Shop stylish Pots & Planters</li>
        <li>Join our Community Workshops</li>
      </ul>

      <h2>Why Indoor Plants Are Worth It</h2>
      <p>Indoor plants improve air quality, reduce stress, and bring nature closer to your home — even in a busy city like Lagos.</p>

      <h2>Conclusion</h2>
      <p>Ready to transform your Lagos apartment into a green sanctuary? Start small — pick one or two low-maintenance indoor plants, pair them with a beautiful pot, and watch your home come alive.</p>
    `,
  },
  "determining-right-light-for-your-plant": {
    title: "DETERMINING THE RIGHT LIGHT OF YOUR SPACE FOR YOUR PLANT.",
    excerpt:
    "Understand how to assess light in your space so your plant thrives with the right placement and care.",
    author: "Dianabasi",
    authorBio: "Writer for Ekondo — helping plant parents thrive.",
    authorImage: "/placeholder-user.jpg",
    date: "August 20, 2025",
    readTime: "7 min read",
    category: "Plant Care",
    image: "/images/fine plant image.webp",
    content: `
      <p>This article was written by <strong>Dianabasi</strong> for Ekondo.</p>

      <p>Do you remember when we learnt about Photosynthesis back then in primary school? If you do, you’re smart. I appreciate that.</p>

      <p>Anyway, as a quick refresher, <strong>photosynthesis</strong> is the process by which plants use sunlight, water, and oxygen to make their food so that they can have energy, keep growing, and not die.</p>

      <figure>
        <img src="/images/Ekondo Products/Size_B_Spider_Plant_in_a_Red_Chidi-scaled.webp" alt="Spider plant soaking up light" />
        <figcaption>Right light makes all the difference.</figcaption>
      </figure>

      <p>Therefore, before ordering your lovely plants from Ekondo and starting your journey to becoming an awesome plant parent, we recommend that you first learn how to give plants the necessary amount of light they need for survival.</p>

      <h2>Why do plants need light?</h2>
      <p>Like we already mentioned above, plants need light for energy. Just like other living things, this energy is what gives them the strength to grow and flourish. Without proper lighting your plants may:</p>
      <ul>
        <li>Lose their color (chlorophyll) and go from green to pale green to yellow and eventually white.</li>
        <li>Become long and very thin.</li>
        <li>Begin to drop their leaves.</li>
        <li>Get sunburnt if the light is too much.</li>
      </ul>

      <h2>What are the types of light?</h2>
      <p>We all live in different settings. Some people live in spaces with bright light and lots of windows, while others may live in places with a lot less light. To make it easier, we group light into two categories: <strong>Direct Light</strong> and <strong>Indirect Light</strong>.</p>

      <h3>Direct Light</h3>
      <p>This type of light literally touches the place you want to keep your plant. An easy way to tell is by putting your hand in between the window and your plant (or any object) during the hottest time of the day. If you can feel the sun’s rays directly on your skin, it’s direct light.</p>

      <figure>
        <img src="/images/plant lighting.JPEG" alt="Soft light through a window and plants" />
        <figcaption>Observe how light moves across your space.</figcaption>
      </figure>

      <h3>Indirect Light</h3>
      <p>This is reflected light — bright light even though no direct sunlight hits anything in that space. Most houseplants prefer indirect light, which is why they’re great for indoors. Indirect light can be divided into two extra categories:</p>
      <ul>
        <li><strong>High Indirect Light:</strong> Bright and warm but not scorching.</li>
        <li><strong>Low Indirect Light:</strong> Mild brightness and temperature.</li>
      </ul>
      <p>With these brief descriptions, you can figure out what kind of plant to get or how to care for the one(s) you already have. Remember, plants are alive and they’ll be happier in an environment they enjoy.</p>

      <h2>Where should I keep my plants for the best light?</h2>
      <p>One of the most useful hacks is knowing what direction your window faces — North, South, East, or West. Open a compass app and check.</p>
      <ul>
        <li><strong>North Facing Windows:</strong> Rarely get strong light — maybe an hour or two in morning/late afternoon. Choose <em>low indirect light</em> plants and place them close to the window to soak up what’s available.</li>
        <li><strong>South Facing Windows:</strong> Lots of sunlight, especially late morning and early afternoon. Sun-loving plants do well close to the window. High indirect light plants can stay nearby, but shield them from direct rays to prevent scorch.</li>
        <li><strong>East Facing Windows:</strong> First rays of gentle morning sun; softer by afternoon. Both high and low indirect light plants love this spot.</li>
        <li><strong>West Facing Windows:</strong> Strong afternoon sun till evening. Great for direct light plants and high indirect light plants.</li>
      </ul>
      <p><strong>N/B:</strong> If your space has more than one window, use the guide above to decide which window to place each plant near.</p>

      <h2>Where should I keep my plants if I have artificial lights?</h2>
      <p>Sunlight is ideal, but if your space has little to no direct or indirect sunlight you can still nurture plants with artificial lights (LEDs, grow lights, etc.). The placement logic is similar:</p>
      <p>If your bulb is directly over the plant, that’s <strong>Direct Light</strong>. Apply the same window-direction tips to adjust distance and intensity. And if you’re unsure, reach out to us — we’ll help you figure it out together.</p>

      <h2>Final thoughts</h2>
      <p>Knowing the right ways to take care of your plants is necessary for their survival. Now that you understand light types and can assess your space, choose the right plant from our Ekondo collection and watch it thrive.</p>
    `,
  },
  "ekondo-community-heralding-contentment": {
    title: "EKONDO- COMMUNITY HERALDING CONTENTMENT",
    excerpt:
    "A reflection on community, creativity, and contentment at Ekondo—moments that bring people together.",
    author: "Eloho",
    authorBio: "Writer for Ekondo — exploring community, art, and wellness.",
    authorImage: "/placeholder-user.jpg",
    date: "August 20, 2025",
    readTime: "8 min read",
    category: "Community",
    image: "/images/two women.JPG",
    content: `
      <p>This article was written by <strong>Eloho</strong> for Ekondo.</p>

      <p>The night is warm, despite the heavy downpour from the day before. The sky is starless but somehow giving light in its deep blueness. I am sat on one of two chairs on a balcony in a short-let apartment in Lekki, watching an empty plot of land with my friend, talking about the emptiness of a city I have lived in all my life. The same emptiness I sometimes feel in myself.</p>

      <p>We’ve been sat here for over 15 minutes, me talking about everything I have been dying to say to someone I know will listen with love in their eyes, ears, and posture. He fits well, has all the things my heart searches for as a confirmation of safety before resting, before unraveling. With him, it is easy for me to talk about the things that bother me. It is easy to talk about how I feel like I am drowning in my work, how I do not sleep as much as I want to, how I am out of the house by 7:00am and back home earliest by 7:00pm. It is easy to tell him about how my life, so packed with corporate and familial responsibilities and my ever-turbulent emotions, feels removed from my people.</p>

      <p>It is easy to tell him about how, for the past few years, it has been difficult for me to engage in conversation with friends and family via text or over the phone. How looking at my screen and jumping from one conversation to another tires me. How sometimes, when the notification banner pops up on my phone, I somehow convince myself I will respond once I am done with a task at work, once I get home, once I am well settled, once I am able to put my words together, once I find the right words to reply with. I never reach this point, where my nervous system feels well enough to accommodate the words and voices of all my beloved. So, the messages accumulate, pile up, and I am scared, reluctant, and unwilling, all three at the same time, to dive into them.</p>

      <p>He tells me he understands and that he is grateful for understanding. He talks about the life he lives in a different city up north, how things somehow work so well for him because this city is less noisy, more relaxed. In a way, he is surrounded by peace and more with community. He works at a wellness company — Ekondo Life — with friends who have now become family, friends who he lives with, who pop in and out of his home occasionally. Friends who, with and without celebratory occasions, are present. He is not required or expected to be or do more, because he is there.</p>

      <p><em>‘Yes!’</em> I say, <em>‘I find that I can only be present when I am physically present.’</em></p>

      <p>When I am not physically present in a place or with people, it is difficult for me to be present at all. I cannot dedicate or engage all of myself in conversation with friends and family if they are not before me. It feels like punishment. Removing my mind from my body, maintaining a certain state of emotion that matches the tone and mood of one text here and a phone call there, all the while knowing my skin and bones don’t feel alive. The feeling is like trying to detach my head from my body all the while expecting it to function or being brain dead and expecting me to know what to do with my body. It is like being ambidextrous but without skill, using this nostril to smell this and the other to smell that. It is like my left leg walking in this direction and my right leg going another. How can I know who or what I am supposed to be?</p>

      <p>There is a remedy for this type of thing, but like all treatments, there is expected to be a certain level of consistency. We are not expected to be sick and take a quarter or half of our prescriptions and expect wholeness. When we do this, we only learn to live with the pain, the sickness, the whatever it is that has us not feeling like ourselves, until one day, it becomes so part of us, so like us, we cannot tell the difference between who we are with and without defect.</p>

      <h2>The remedy is love</h2>
      <p>If I am able to see the people in my life who bring this word alive, as frequently as is outrageous, all the colors of my world will be too bright for even me to see sometimes. If I am able to do the things that make me feel as though I am in control of my life and the direction my body takes morning and night, I will not feel as misplaced as I often do. Seeing my people once a week or two, reading one book a month, having brunch and dinner dates weeks apart, makes me feel as though I am incomplete. The feeling is like placing the same puzzle piece in its place over and over again, without ever solving the whole thing.</p>

      <p><em>‘What does Ekondo mean?’</em> I ask.</p>
      <p><em>‘Community or Universe’.</em></p>

      <p>My friend feels as though his life is complete, as though he wants for nothing more asides stupid wealth which often times is not guaranteed. He is, at the moment, satisfied with the life around him. It is easy for him to move about life so freely, not wanting and needing, because of his community. It is effective. He is filled with just enough excitement and more than enough love to live a life that he feels so content with. I imagined what it must feel like to have your heart beat steady five out of seven days in the week. I imagined what it must feel like to wake up with a smile on your face, to wake up expectant for the day, knowing that in your home is a friend who loves you, two more down the street, a few others a 10–15-minute drive away, and a family at work.</p>

      <p>I know what it feels like when I’m able to meet up with friends once every week or two, one in a month. How all my anxieties disappear because I know that I no longer have to perform, how endless my laughter feels, how jokes roll out our mouths and the air stinks with joy. I know how proud I am of myself, when I take time out to dress up and eat good food, read at least four books in a month or complete a short story.</p>

      <p><em>‘I’m jealous of you, that you feel this way most of the time. It’s such a crazy blessing.’</em></p>
      <p><em>‘I know’</em> he says, smiling at me.</p>
    `,
  },
  "essential-tips-for-keeping-plants-alive": {
    title: "5 essential tips for keeping your plants alive",
    excerpt:
    "New to plant care? Start with these five essential, practical tips to keep your plants healthy.",
    author: "Favour",
    authorBio: "Ekondo writer — simple guidance for happy plants.",
    authorImage: "/placeholder-user.jpg",
    date: "August 20, 2025",
    readTime: "5 min read",
    category: "Plant Care",
    image: "/images/sans img.jpg",
    content: `
      <p>Embarking on your journey as a plant parent can be an exciting and rewarding experience. To ensure your green companions thrive and flourish, we’ve put together five essential tips that will set you on the path to success. Let’s dig in!</p>

      <h2>1) Light Matters a Lot</h2>
      <p>Determining if your plant is receiving the right amount of light is crucial for its overall health and growth. Each plant is unique, and the ideal lighting conditions can vary. By observing your plant’s response and adjusting its placement you can ensure that it receives the optimal amount of light. Place your plant where diffused rays reach it when your curtains or blinds are opened. Experiment with various spots until you find the best fit for each plant.</p>

      <figure>
        <img src="/images/fine plant image.webp" alt="Cozy desk with plants" className="rounded-lg"/>
        <figcaption>Create small rituals with plants on your desk or shelf.</figcaption>
      </figure>

      <h2>2) Water Wisely</h2>
      <p>Overwatering is one of the most common mistakes new plant parents make. It’s essential to find the right balance. Before watering, check the soil moisture level by inserting your finger about an inch deep. If it feels dry, it’s time to water; if it’s still moist, wait a little longer. Use a bottle or a cup and gradually pour water in a circular motion into the soil until water drains from underneath. Avoid pouring too quickly or forcefully, as water may run through the pot without fully hydrating the soil.</p>
      <div class="cta-center"><a class="cta-button" style="background:#22c55e;" href="https://wa.me/2348176267792?text=Hi%20Ekondo%2C%20I%20want%20to%20request%20a%20watering%20bottle" target="_blank" rel="noopener noreferrer">💧 Request a Watering Bottle</a></div>

      <h2>3) Let Us Spray</h2>
      <p>Ekondo essential mix is a versatile tool in plant care, providing effective pest control, healthier leaves and fragrance. Spraying your plants with Ekondo essential mix can boost their overall health and vitality. It contains compounds that act as growth stimulants, promoting healthy foliage, root development, and overall growth. Mist in the morning so leaves dry before evening. Adjust the nozzle to produce a fine mist; stand a few inches away and cover both sides of the leaves—especially undersides where pests hide.</p>

      <figure>
        <img src="/images/Ekondo Products/Size_B_Spider_Plant_in_a_Red_Chidi-scaled.webp" alt="Healthy plant on window sill" />
        <figcaption>Small, consistent care goes a long way.</figcaption>
      </figure>

      <h2>4) Consistency Is Key</h2>
      <p>Establish a regular watering and maintenance routine. Create a schedule based on your plant’s needs and stick to it. Observe how your plant responds and adjust if necessary. Remember, it’s better to underwater than overwater—most plants recover from slight dehydration, but overwatering can lead to root rot.</p>
      <div class="cta-center"><a class="cta-button"  style="background:#22c55e;"href="https://wa.me/2348176267792?text=Hi%20Ekondo%2C%20help%20me%20set%20a%20plant%20care%20reminder" target="_blank" rel="noopener noreferrer">⏰ Set a Reminder</a></div>

      <h2>5) Ask for Help On Time</h2>
      <p>Plants can be sensitive to changes and can deteriorate quickly if issues are left unaddressed. Seeking help from our plant doctor early lets you act promptly and protect your plants. Reaching out not only fixes problems; it also builds your plant‑care confidence.</p>
      <div class="cta-center"><a class="cta-button"  style="background:#22c55e;" href="https://wa.me/2348176267792?text=Hi%20Ekondo%2C%20I%20need%20help%20from%20the%20plant%20doctor" target="_blank" rel="noopener noreferrer">📞 Reach Out to Us</a></div>

      <h3>Final Notes</h3>
      <p>Take the time to understand your plant. Read its care card and observe it regularly—leaves, color, and growth patterns. Don’t be discouraged by setbacks; learning from experience is part of the process. Enjoy the calm and beauty plants bring into your life. Happy plant parenting — we’re rooting for you! 🌿</p>
    `,
  },
  "how-to-care-for-your-plant-during-hot-and-dusty-period": {
    title: "How to Care for Your Plant During This Hot and Dusty Period",
    excerpt:
    "Learn how to care for your plant during the hot and dusty period.",
    author: "Ekondo",
    authorBio: "Ekondo — nurturing plants through every season.",
    authorImage: "/placeholder-user.jpg",
    date: "November 2025",
    readTime: "6 min read",
    category: "Plant Care",
    image: "/images/dusty_plant.jpg",
    content: `
      <p>
        There is something about this time of the year. The heat sits heavy in the air, the wind carries dust like fine powder, 
        and everything feels a little louder and a little quieter at the same time. Our plants feel it too. They breathe the weather 
        just as we do, and during this hot and dusty season, they need a little extra care, a softer kind of attention, and a gentler rhythm to stay happy.
      </p>

      <p>
        If your plants have been looking a bit tired lately, you are not alone. Every plant parent in Abuja and across Nigeria is navigating 
        the same season. The good news is that with the right care, your plant will not just survive — it will thrive. 
        Here is how to keep your leafy friends glowing.
      </p>

      <h2>Give Your Plant More Water — the Right Way</h2>
      <p>
        Heat takes moisture from the soil faster than usual, which means your plant becomes thirsty more often. 
        Instead of sprinkling water lightly, water deeply and slowly, allowing the soil to fully drink. 
        You want the roots to stay hydrated from within.
      </p>
      <p>
        Morning watering works beautifully because your plant has enough time to absorb moisture and prepare for the hot afternoon.
        Always touch the soil before watering — if the top layer feels dry, it is time.
      </p>

      <h2>Clean Off the Dust So Your Plant Can Breathe</h2>
      <p>
        Dust blocks light, and light is food for your plant. A layer of dust can slow down photosynthesis and make your plant struggle.
        Use a soft, damp cloth and gently wipe each leaf — think of it as giving your plant a small spa moment.
      </p>
      <p>
        For plants with many small leaves, wiping may be difficult. In that case, a gentle shower works perfectly.
        Dust-free leaves are happier, brighter, and more energized.
      </p>

      <figure>
        <img src="/images/Ekondo Products/Size_B_Spider_Plant_in_a_Red_Chidi-scaled.webp" alt="Clean leaves helping plants breathe" />
        <figcaption>Dust-free leaves absorb light better and stay healthier.</figcaption>
      </figure>

      <h2>Protect Your Plant from Direct Heat</h2>
      <p>
        The sun is harsher during this season. Even plants that love bright light can get stressed.
        Brown edges or curling leaves are signs that the sun feels too strong.
      </p>
      <p>
        Move your plant slightly away from windows, soften sunlight with light curtains,
        or create gentle shade when needed. During dusty periods, soft light is your friend.
      </p>

      <h2>Add Humidity Back into Your Space</h2>
      <p>
        Hot air pulls moisture from everything — including your plant. If your home feels dry, your plant feels it too.
        Light misting in the morning helps, as does grouping plants together to create a small humid zone.
      </p>
      <p>
        Placing a bowl of water close to your plant can also help. As the water evaporates, it creates a kinder atmosphere
        for your green companion.
      </p>

      <h2>Feed Slowly and Gently</h2>
      <p>
        This season puts plants under stress, so overfeeding can overwhelm them.
        If fertilizing is necessary, choose something mild and natural, and use it sparingly.
        Think of it as a nourishing drink rather than a heavy meal.
      </p>

      <h2>Pay Attention — Plants Speak</h2>
      <p>
        Your plant will always tell you what it needs, but the language is soft.
        Drooping often means thirst. Brown tips usually signal too much heat.
        Pale leaves may mean dust buildup or poor light.
      </p>
      <p>
        When you watch closely, you will always know how to help.
      </p>

      <h2>Final Thoughts</h2>
      <p>
        At Ekondo, we believe plants are more than décor. They are living companions that add softness,
        beauty, and grounding to our lives. This season may be hot and dusty, but with a little tenderness,
        your plants will stay strong and lush.
      </p>

      <p>
        If you ever need help choosing the right plant for your space or learning how to care for the ones you already have,
        Ekondo is always here to guide you gently.
      </p>

      <p><strong>As always, we are rooting for you. 🌿</strong></p>
    `,
  },
}

const fallback = {
  title: "The Ekondo Journal",
  author: "Ekondo",
  authorBio: "Community stories and plant wisdom.",
  authorImage: "/placeholder-user.jpg",
  date: "",
  readTime: "",
  category: "Plant Care",
  image: "/images/fine plant image.webp",
  content: `<p>Article coming soon.</p>`,
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = postsBySlug[params.slug] ?? fallback

  return (
    <div className="flex flex-col bg-background">
      {/* Back Button */}
      <div className="container px-4 py-8">
        <Button variant="ghost" asChild>
          <Link href="/journal">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journal
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[55vh] min-h-[400px] w-full overflow-hidden rounded-none">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>

      {/* Article Content */}
      <article className="py-16 bg-background/80">
        <div className="container px-6">
          <Card className="border-none shadow-lg rounded-2xl max-w-4xl mx-auto bg-card">
            <CardContent className="p-6 md:p-10">
              {/* Category */}
            <div className="flex justify-center mb-6">
                <div className="bg-primary/10 text-primary text-xs font-semibold px-4 py-1 rounded-full">
                {post.category}
              </div>
            </div>

            {/* Title */}
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{post.date}</div>
              <span>•</span>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime}</div>
              <span>•</span>
                <div className="flex items-center gap-2"><User className="h-4 w-4" />{post.author}</div>
            </div>

              <Separator className="mb-10" />

              {/* Ensure all images inside article content have a consistent rounded appearance */}
              <style>{`
                .article-content img,
                .article-content figure img {
                  border-radius: 0.75rem !important;
                  overflow: hidden;
                  object-fit: cover;
                  width: 100%;
                  max-width: 640px; 
                  height: 630px;
                  display: block;
                  margin: 0.75rem auto; /* center images */
                }
                .article-content figure {
                  overflow: hidden;
                  border-radius: 0.75rem;
                  margin: 1.25rem 0;
                }
              `}</style>

              {/* Main Text */}
              <div
                className="article-content prose prose-lg md:prose-xl max-w-none
                prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-foreground
                prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:font-extrabold prose-h2:border-b prose-h2:border-primary/30 prose-h2:pb-3
                prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:font-bold
                prose-headings:mt-12 prose-headings:mb-6
                prose-p:mb-6 prose-p:leading-8 prose-p:text-foreground/90
                prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2
                prose-strong:text-foreground
                prose-a:text-primary hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:pl-4 prose-blockquote:italic
                prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <Separator className="my-12" />

              {/* Author Box */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
                  </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-serif text-xl font-semibold">{post.author}</h3>
                  <p className="text-muted-foreground text-sm">{post.authorBio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center font-serif">Recommended Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {Object.entries(postsBySlug)
              .filter(([slug]) => slug !== params.slug)
              .slice(0, 2)
              .map(([slug, rec]) => (
                <Card key={slug} className="border-none shadow-md overflow-hidden group">
                  <Link href={`/journal/${slug}`}>
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image src={rec.image || "/placeholder.svg"} alt={rec.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <CardContent className="p-6 flex flex-col justify-center items-center">
                      <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors text-center">{rec.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{rec.excerpt}</p>
                      <span className="text-xs text-muted-foreground">{rec.author}</span>
                    </CardContent>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </article>

      {/* Stay Updated CTA */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Get the latest articles, tips, and inspiration delivered to your inbox
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  )
}

