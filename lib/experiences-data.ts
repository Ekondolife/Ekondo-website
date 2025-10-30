// Shared experiences data to be used across pages
export const experiences = [
  {
    id: 5,
    title: "Southside Festival",
    description: "Southside Festival is a vibrant celebration of art, nature, and self-expression. From hands-on workshops to live music and games, every moment invites you to unwind, create, and celebrate the joy of expression.",
    longDescription: `Southside Festival is a vibrant celebration of art, nature, and self-expression. From hands-on workshops to live music and games, every moment invites you to unwind, create, and celebrate the joy of expression.

Ticket Types:
🌿 Early Bird (₦5,000) – Limited discount for the fastest hands.
🌱 Entry Token (₦8,000) – Basic access + starter tokens.
🎨 Experience Pass (₦20,000) – More tokens to dive into pottery, tie & dye, painting etc.
`,
    ticketTypes: [
      { name: "Early Bird", price: 5000, description: "Limited discount for the fastest hands." },
      { name: "Entry Token", price: 8000, description: "Basic access + starter tokens." },
      { name: "Experience Pass", price: 20000, description: "More tokens to dive into pottery." },
    ],
    date: "December 2025",
    time: "3:00PM",
    location: "Ekondo Park Abuja",
    price: 5000, // Default price
    capacity: 200,
    spotsLeft: 150,
    type: "Event",
    image: "/images/ekondo december event 2.jpeg",
    featured: true,
  },
  {
    id: 1,
    title: "Paint & Plant Pottery Experience",
    description: "Step away from the daily hustle and reconnect through creativity. Paint and Plant offers a calming, hands-on experience where you'll decorate your own pot and plant something meaningful inside.",
    date: "On-Demand",
    time: "6:00PM",
    location: "Ekondo Park",
    price: 15000,
    capacity: 20,
    spotsLeft: 12,
    type: "Workshop",
    image: "/images/pot design.jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "Play 4 Wellness",
    description: "Wellness starts with play, and Play 4 Wellness is your invitation to move, laugh, and connect, no matter your age. These sessions are a refreshing break from routine, filled with active games, mindful group activities, and moments of shared joy.",
    date: "On-Demand",
    time: "5:00PM",
    location: "Ekondo Park",
    price: 15000,
    capacity: 30,
    spotsLeft: 18,
    type: "Event",
    image: "/images/table tennis game.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Fridays at Ekondo",
    description: "Every Friday, Ekondo Park transforms into a space of music, games, creativity, and community. Unwind, meet new people, and try something joyful.",
    date: "Every Friday",
    time: "5:00PM",
    location: "Ekondo Park",
    price: 15000,
    capacity: 100,
    spotsLeft: 50,
    type: "Event",
    image: "/images/ekondo event.jpg",
    featured: true,
  },
  {
    id: 4,
    title: "Creative Upcycling",
    description: "Rediscover the magic in everyday materials. Blend art and sustainability to reimagine waste into beautiful, practical creations.",
    date: "On-Demand",
    time: "6:00PM",
    location: "Ekondo Park",
    price: 15000,
    capacity: 16,
    spotsLeft: 10,
    type: "Workshop",
    image: "/images/two women.JPG",
    featured: false,
  },
]

// Helper function to get recurring events (non On-Demand)
export const getRecurringEvents = () => {
  return experiences
    .filter(exp => exp.date && exp.date !== "On-Demand")
    .map(exp => ({
      title: exp.title,
      location: exp.location,
      date: exp.date,
      time: exp.time || "Check schedule",
      image: exp.image,
      id: exp.id,
      type: exp.type,
      price: exp.price,
      spotsLeft: exp.spotsLeft
    }))
}

// Helper function to get featured experiences
export const getFeaturedExperiences = () => {
  return experiences.filter(exp => exp.featured)
}
