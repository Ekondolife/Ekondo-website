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
    name: "Ekondo Park Abuja",
    description:
      "Our flagship location in the heart of Abuja. A nature-focused space for events and community gatherings.",
    image: "/images/ekondo event.jpg",
    location: "MaMa Village Garden, beside Sharon rose garden, Abuja, Nigeria",
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
    name: "Ekondo Studio at Locale Lagos",
    description: "An intimate creative space for workshops and private events, surrounded by tropical plants and natural light.",
    image: "/images/two girls.jpg",
    location: "2 Saka Jojo St, Victoria Island, Lagos, Nigeria",
    hours: "Tue-Sat: 10AM-11PM",
    capacity: "Up to 25 people",
    amenities: ["Workshop Tables", "Natural Light", "Plant Library", "Refreshments"],
    featured: false,
    hourlyPrice: 15000,
    dailyPrice: 90000,
    longDescription:
      "An intimate creative space for workshops and private events, surrounded by tropical plants and natural light. Perfect for small gatherings, workshops, and intimate community events. The space features beautiful natural lighting, workshop tables, a plant library, and refreshments to make your event unforgettable.",
  },
]

export function getSpaceById(id: number): Space | undefined {
  return spaces.find(space => space.id === id)
}

