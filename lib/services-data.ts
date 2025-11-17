export interface Service {
  id: number
  title: string
  description: string
  image: string
  price: string
  longDescription: string
  features: string[]
  popular: boolean
}

export const services: Service[] = [
  {
    id: 1,
    title: "Plant Maintenance",
    description: "Keep your plants healthy and thriving with our expert care services.",
    image: "/images/guy working.jpg",
    price: "From ₦25,000/month",
    longDescription: "Professional plant maintenance service to ensure your indoor and outdoor plants stay healthy, vibrant, and beautiful year-round. Our expert team provides comprehensive care including watering, feeding, pruning, pest control, and regular health assessments.",
    features: [
      "Weekly or bi-weekly visits",
      "Watering and feeding",
      "Pruning and pest control",
      "Health assessments",
      "Replacement guarantee",
    ],
    popular: false,
  },
  {
    id: 2,
    title: "Landscape Design & Installation",
    description: "Transform your outdoor space with custom landscape design tailored to African climates.",
    image: "/images/Ekondo-14.JPG",
    price: "From ₦150,000",
    longDescription: "Complete landscape design and installation services for residential and commercial properties. We specialize in creating beautiful outdoor spaces using native African plants that thrive in the local climate. From initial design consultation to final installation, we handle everything.",
    features: [
      "Custom design consultation",
      "Native plant selection",
      "Professional installation",
      "Irrigation systems",
      "3-month maintenance included",
    ],
    popular: true,
  },
  {
    id: 3,
    title: "Indoor Plant Styling",
    description: "Professional styling services to create stunning indoor green spaces.",
    image: "/images/girl2.jpeg",
    price: "From ₦75,000",
    longDescription: "Transform your indoor spaces with professional plant styling. Our team assesses your space, selects the perfect plants, curates beautiful pots and planters, and strategically places everything to create a stunning biophilic environment that enhances both aesthetics and air quality.",
    features: [
      "Space assessment",
      "Plant selection and sourcing",
      "Pot and planter curation",
      "Professional placement",
      "Care instructions",
    ],
    popular: false,
  },
  {
    id: 4,
    title: "Corporate Green Spaces",
    description: "Enhance your workplace with biophilic design that boosts productivity and wellness.",
    image: "/images/ekondo event.jpg",
    price: "Custom Quote",
    longDescription: "Create healthy, productive work environments with our corporate biophilic design services. We analyze your workspace and create comprehensive plans for incorporating plants that improve air quality, reduce stress, and boost employee wellness and productivity.",
    features: [
      "Workspace analysis",
      "Biophilic design plan",
      "Installation and setup",
      "Ongoing maintenance",
      "Employee wellness workshops",
    ],
    popular: false,
  },
  {
    id: 5,
    title: "Garden Consultation",
    description: "Get expert advice on planning and maintaining your garden.",
    image: "/images/fine plant image.webp",
    price: "From ₦35,000/session",
    longDescription: "Expert garden consultation to help you plan, design, and maintain your dream garden. We provide personalized recommendations for plant selection, layout design, maintenance schedules, and ongoing support to ensure your garden thrives in the local climate.",
    features: [
      "Site visit and assessment",
      "Personalized recommendations",
      "Plant and material suggestions",
      "Maintenance schedule",
      "Follow-up support",
    ],
    popular: false,
  },
  {
    id: 6,
    title: "Vertical Garden Installation",
    description: "Maximize your space with beautiful living walls and vertical gardens.",
    image: "/images/Services Casestudy/French Institute4.webp",
    price: "From ₦120,000",
    longDescription: "Install stunning vertical gardens and living walls to maximize your space while creating beautiful, functional green features. Our team handles the complete process from structural assessment to plant installation, ensuring a stunning and sustainable result.",
    features: [
      "Custom design",
      "Structural assessment",
      "Irrigation system setup",
      "Plant installation",
      "Maintenance training",
    ],
    popular: false,
  },
]

export function getServiceById(id: number): Service | undefined {
  return services.find(service => service.id === id)
}

