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
  mapUrl: string
}

export const spaces: Space[] = [
  {
    id: 6,
    name: "Ekondo Park",
    description:
      "Our flagship location in the heart of Abuja is a nature-focused space designed for events and community gatherings.",
    image: "/images/ekondo_park.webp",
    location: "MaMa Village Garden, Gwarinpa, Abuja.",
    hours: "Mon-Sat: 9AM-6PM, Sun: 10AM-5PM",
    capacity: "Up to 500 people",
    amenities: ["Retail Shop", "Workshop Space", "Community Garden", "Cafe", "Parking"],
    featured: true,
    hourlyPrice: 25000,
    dailyPrice: 150000,
    longDescription:
      "Our flagship location in the heart of Abuja is a nature-focused space designed for events and community gatherings...",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Ekondo%20Park%20MaMa%20Village%20Garden%2C%20Gwarinpa%2C%20Abuja",
  },
  {
    id: 1,
    name: "Mint organics",
    description:
      "Mint Organic Care is a body and home wellness boutique brand with a vision of sustainable luxury.",
    image: "/images/mint_organic.webp",
    location: "8 Tarkwa Crescent wuse 2, Abuja.",
    hours: "Mon-Sat: 9AM-6PM, Sun: 10AM-5PM",
    capacity: "Up to 50 people",
    amenities: ["Retail Shop", "Workshop Space", "Community Garden", "Cafe", "Parking"],
    featured: false,
    hourlyPrice: 15000,
    dailyPrice: 90000,
    longDescription:
      "Our flagship location in the heart of Abuja is a nature-focused space designed for events and community gatherings...",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Mint%20organics%208%20Tarkwa%20Crescent%20wuse%202%2C%20Abuja",
  },
  {
    id: 2,
    name: "Locale Lagos",
    description:
      "An intimate creative space for workshops and private events, surrounded by tropical plants and natural light.",
    image: "/images/locale.webp",
    location: "2 Saka Jojo Street, VI, Lagos.",
    hours: "Tue-Sat: 10AM-11PM",
    capacity: "Up to 25 people",
    amenities: ["Workshop Tables", "Natural Light", "Plant Library", "Refreshments"],
    featured: false,
    hourlyPrice: 15000,
    dailyPrice: 90000,
    longDescription:
      "An intimate creative space for workshops and private events...",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Locale%20Lagos%202%20Saka%20Jojo%20Street%2C%20VI%2C%20Lagos",
  },
  {
    id: 3,
    name: "Living Room",
    description:
      "A cozy, plant-filled nook for creativity and connection — where sunlight, greenery, and good ideas meet in harmony.",
    image: "/images/living_room.webp",
    location: "19 Thaba Tseka St, Wuse 2, Abuja.",
    hours: "Tue-Sat: 10AM-11PM",
    capacity: "Up to 25 people",
    amenities: ["Workshop Tables", "Natural Light", "Plant Library", "Refreshments"],
    featured: false,
    hourlyPrice: 15000,
    dailyPrice: 90000,
    longDescription:
      "Step into the Living Room, a cozy nook filled with plants and natural light...",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Living%20Room%2019%20Thaba%20Tseka%20St%2C%20Wuse%202%2C%20Abuja",
  },
  {
    id: 4,
    name: "TBC Concierge",
    description:
      "A refined mini-haven blending nature with lifestyle — discover our curated plants and décor inside Wuye’s stylish TBC Concierge.",
    image: "/images/TBC.webp",
    location: "Suite 18, Birgi Plaza, Wuye, Abuja.",
    hours: "Tue-Sat: 10AM-11PM",
    capacity: "Up to 25 people",
    amenities: ["Workshop Tables", "Natural Light", "Plant Library", "Refreshments"],
    featured: false,
    hourlyPrice: 15000,
    dailyPrice: 90000,
    longDescription:
      "Step into TBC Concierge, a refined mini-haven where nature meets lifestyle...",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=TBC%20Concierge%20Suite%2018%2C%20Birgi%20Plaza%2C%20Wuye%2C%20Abuja",
  },
  {
    id: 5,
    name: "Sage & She",
    description:
      "A serene, feminine-inspired space where mindful living meets botanical beauty — plants, scents, and style in perfect balance.",
    image: "/images/sage_and_she.webp",
    location: "No. 41 Osun Crescent, Maitama, Abuja.",
    hours: "Tue-Sat: 10AM-11PM",
    capacity: "Up to 25 people",
    amenities: ["Boutique Display", "Natural Light", "Calm Ambience"],
    featured: false,
    hourlyPrice: 15000,
    dailyPrice: 90000,
    longDescription:
      "Discover a tranquil space at Sage & She...",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sage%20%26%20She%20No.%2041%20Osun%20Crescent%2C%20Maitama%2C%20Abuja",
  },
]


export function getSpaceById(id: number): Space | undefined {
  return spaces.find(space => space.id === id)
}

