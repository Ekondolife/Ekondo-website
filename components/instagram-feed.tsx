import Image from "next/image"

export default function InstagramFeed() {
  // Instagram feed with images of young urban Africans and plants
  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop&crop=center",
      alt: "Young African woman with plants",
      link: "https://instagram.com",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1616627188467-fac8d174d157?w=300&h=300&fit=crop&crop=center",
      alt: "African hands planting seeds",
      link: "https://instagram.com",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=300&fit=crop&crop=center",
      alt: "Plant workshop with young Africans",
      link: "https://instagram.com",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center",
      alt: "Modern African home with plants",
      link: "https://instagram.com",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop&crop=center",
      alt: "Traditional African plant containers",
      link: "https://instagram.com",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=300&h=300&fit=crop&crop=center",
      alt: "Urban garden in African city",
      link: "https://instagram.com",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {instagramPosts.map((post) => (
        <a
          key={post.id}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-square overflow-hidden organic-shape group"
        >
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="sr-only">View on Instagram</span>
          </div>
        </a>
      ))}
    </div>
  )
}
