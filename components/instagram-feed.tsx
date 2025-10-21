import Image from "next/image"

export default function InstagramFeed() {

  const instagramPosts = [
    {
      id: 1,
      image: "./images/girl.jpeg",
      alt: "Young African woman with plants",
      link: "https://www.instagram.com/ekondolife/",
    },
    {
      id: 2,
      image: "./images/ekondo event 2.jpg",
      alt: "African hands planting seeds",
      link: "https://www.instagram.com/ekondolife/",
    },
    {
      id: 3,
      image: "./images/instagram3.jpg",
      alt: "Plant workshop with young Africans",
      link: "https://www.instagram.com/ekondolife/",
    },
    {
      id: 4,
      image: "./images/girl3.jpg",
      alt: "Modern African home with plants",
      link: "https://www.instagram.com/ekondolife/",
    },
    {
      id: 5,
      image: "./images/instagram2.jpg",
      alt: "Traditional African plant containers",
      link: "https://www.instagram.com/ekondolife/",
    },
    {
      id: 6,
      image: "./images/instagram1.jpg",
      alt: "Urban garden in African city",
      link: "https://www.instagram.com/ekondolife/",
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
