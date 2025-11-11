export interface Space {
  id: number
  name: string
  description: string
  image: string
  location: string
  hours: string
  capacity: string
  amenities: string[]
  featured: boolean
  hourlyPrice: number
  dailyPrice: number
  longDescription: string
}

export const spaces: Space[] = [
  {
    id: 1,
    name: "Mint organics",
    description:
      "Mint Organic Care is a body and home wellness boutique brand with a vision of sustainable luxury.",
    image: "/images/ekondo event.jpg",
    location: "8 Tarkwa Crescent wuse 2, Abuja. ",
    hours: "Mon-Sat: 9AM-6PM, Sun: 10AM-5PM",
    capacity: "Up to 50 people",
    amenities: ["Retail Shop", "Workshop Space", "Community Garden", "Cafe", "Parking"],
    featured: true,
    hourlyPrice: 15000,
    dailyPrice: 90000,
    longDescription:
      "Our flagship location in the heart of Abuja is a nature-focused space designed for events and community gatherings. The brand has expanded to have retail locations at other spots, like the Living Room in Wuse 2. It offers a peaceful environment for events like team bonding, paint and plant sessions, and other community-focused activities. You can also find Ekondolife products, such as plants and pots, at other retail locations in Abuja.",
  },
  {
    id: 2,
    name: "Locale Lagos",
    description: "An intimate creative space for workshops and private events, surrounded by tropical plants and natural light.",
    image: "/images/two girls.WEBP",
    location: "2 Saka Jojo Street, VI, Lagos.",
    hours: "Tue-Sat: 10AM-11PM",
    capacity: "Up to 25 people",
    amenities: ["Workshop Tables", "Natural Light", "Plant Library", "Refreshments"],
    featured: false,
    hourlyPrice: 15000,
    dailyPrice: 90000,
    longDescription:
      "An intimate creative space for workshops and private events, surrounded by tropical plants and natural light. Perfect for small gatherings, workshops, and intimate community events. The space features beautiful natural lighting, workshop tables, a plant library, and refreshments to make your event unforgettable.",
  },
  {
  id: 3,
  name: "Living Room",
  description:
    "A cozy, plant-filled nook for creativity and connection — where sunlight, greenery, and good ideas meet in harmony.",
  image: "/images/living room.WEBP",
  location: "19 Thaba Tseka St, Wuse 2, Abuja.",
  hours: "Tue-Sat: 10AM-11PM",
  capacity: "Up to 25 people",
  amenities: ["Workshop Tables", "Natural Light", "Plant Library", "Refreshments"],
  featured: false,
  hourlyPrice: 15000,
  dailyPrice: 90000,
  longDescription:
    "Step into the Living Room, a cozy nook filled with plants and natural light. This space is perfect for fostering creativity and connection, whether you're hosting a workshop, a small gathering, or simply seeking inspiration among greenery. Enjoy the harmonious blend of sunlight, plants, and a welcoming atmosphere.",
},
{
  id: 4,
  name: "TBC Concierge",
  description:
    "A refined mini-haven blending nature with lifestyle — discover our curated plants and décor inside Wuye’s stylish TBC Concierge.",
  image: "/images/TBC.WEBP",
  location: "Suite 18, Birgi Plaza, Wuye, Abuja.",
  hours: "Tue-Sat: 10AM-11PM",
  capacity: "Up to 25 people",
  amenities: ["Workshop Tables", "Natural Light", "Plant Library", "Refreshments"],
  featured: false,
  hourlyPrice: 15000,
  dailyPrice: 90000,
  longDescription:
    "Step into TBC Concierge, a refined mini-haven where nature meets lifestyle. Located within Wuye's stylish TBC Concierge, this space offers a curated selection of plants and décor, perfect for those seeking a touch of greenery in an elegant setting. Ideal for small gatherings and plant shopping.",
},
{
  id: 5,
  name: "Sage & She",
  description:
    "A serene, feminine-inspired space where mindful living meets botanical beauty — plants, scents, and style in perfect balance.",
  image: "/images/sage and she.WEBP",
  location: "No. 41 Osun Crescent, Maitama, Abuja.",
  hours: "Tue-Sat: 10AM-11PM",
  capacity: "Up to 25 people",
  amenities: ["Boutique Display", "Natural Light", "Calm Ambience"],
  featured: false,
  hourlyPrice: 15000,
  dailyPrice: 90000,
  longDescription:
    "Discover a tranquil space at Sage & She, designed for those who appreciate the blend of botanical beauty and mindful living. Ideal for small gatherings, plant shopping, and serene moments surrounded by nature-inspired décor.",
},
{
  id: 6,
  name: "CelebrationsNG",
  description:
    "A lively corner of nature within the city’s buzz — explore joyful plant collections at CelebrationsNG, Wuse 2.",
  image: "/images/celebrations.jpeg",
  location: "Adetokunbo Ademola & Aminu Kano Crescent, Wuse 2, Abuja.",
  hours: "Tue-Sat: 10AM-11PM",
  capacity: "Up to 25 people",
  amenities: ["Vibrant Display", "Gift Options", "Indoor Plants", "Decor"],
  featured: false,
  hourlyPrice: 15000,
  dailyPrice: 90000,
  longDescription:
    "Find a vibrant selection of plants at CelebrationsNG, where nature meets celebration. Perfect for plant enthusiasts looking to add a touch of greenery to their homes or offices, with options for gifts and décor.",
},

]

export function getSpaceById(id: number): Space | undefined {
  return spaces.find(space => space.id === id)
}

