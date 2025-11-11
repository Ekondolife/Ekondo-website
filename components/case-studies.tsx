"use client"

 import Image from "next/image"
 import { useMemo, useState, useCallback, useEffect } from "react"
 import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
 import { ChevronLeft, ChevronRight } from "lucide-react"

 type CaseStudy = {
   client: string
   images: string[]
 }

export default function CaseStudies() {
  // Static list from public/images/Services Casestudy
   const items: CaseStudy[] = useMemo(
     () => [
       { client: "Arami", images: [
        "/images/Services Casestudy/arami1.jpg", 
        "/images/Services Casestudy/Arami2.jpg",
        "/images/Services Casestudy/Arami3.jpg",
      ] },
       { client: "Ceesolar", images: [
        "/images/Services Casestudy/Ceesolar1.jpg",
        "/images/Services Casestudy/Ceesolar2.jpg",
        "/images/Services Casestudy/Ceesolar3.jpg",
      ] },
       { client: "French Institute", images: [
        "/images/Services Casestudy/French Institute1.jpg",
        "/images/Services Casestudy/French Institute2.jpg",
        "/images/Services Casestudy/French Institute3.jpg",
        "/images/Services Casestudy/French Institute4.jpg",
        "/images/Services Casestudy/French Institute5.jpg",
      ] },
       { client: "Napims", images: [
        "/images/Services Casestudy/Napims1.jpeg",
        "/images/Services Casestudy/Napims2.jpeg",
        "/images/Services Casestudy/Napims3.jpeg",
        "/images/Services Casestudy/Napims4.jpeg",
      ] },
       { client: "NNPC RTI HQ", images: [
        "/images/Services Casestudy/NNPC1.jpeg",
        "/images/Services Casestudy/NNPC2.jpeg",
        "/images/Services Casestudy/NNPC3.jpeg",
      ] },
       { client: "Tele Softas", images: [
        "/images/Services Casestudy/tele softas1.jpg",
        "/images/Services Casestudy/tele softas2.jpg",
        "/images/Services Casestudy/tele softas3.jpg",
      ] },
       { client: "UAC High-Res", images: [
        "/images/Services Casestudy/UAC1.jpg",
        "/images/Services Casestudy/UAC2.jpg",
        "/images/Services Casestudy/UAC3.jpg",
      ] },
       { client: "Urban Abode Estate Abuja", images: [
        "/images/Services Casestudy/Urban Abode1.jpg",
        "/images/Services Casestudy/Urban Abode2.jpg",
        "/images/Services Casestudy/Urban Abode3.jpg",
      ] },
     ],
     []
   )

   const [active, setActive] = useState<CaseStudy | null>(null)
   const [index, setIndex] = useState(0)

   const hasMultiple = active?.images && active.images.length > 1

   const goPrev = useCallback(() => {
     if (!active) return
     setIndex((i) => (i - 1 + active.images.length) % active.images.length)
   }, [active])

   const goNext = useCallback(() => {
     if (!active) return
     setIndex((i) => (i + 1) % active.images.length)
   }, [active])

   // keyboard navigation
   useEffect(() => {
     const onKey = (e: KeyboardEvent) => {
       if (!active) return
       if (e.key === "ArrowLeft") goPrev()
       if (e.key === "ArrowRight") goNext()
     }
     window.addEventListener("keydown", onKey)
     return () => window.removeEventListener("keydown", onKey)
   }, [active, goPrev, goNext])

  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Case Studies</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          A glimpse of spaces we&apos;ve transformed for clients. Tap a card to view.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {items.map((cs) => (
             <Dialog
               key={cs.client}
               onOpenChange={(o) => {
                 if (!o) {
                   setActive(null)
                   setIndex(0)
                 }
               }}
             >
              <DialogTrigger asChild>
                <button
                  className="group relative w-full overflow-hidden rounded-xl border-none shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40"
                   onClick={() => {
                     setActive(cs)
                     setIndex(0)
                   }}
                >
                  <div className="relative h-56">
                    <Image
                       src={cs.images[0]}
                      alt={cs.client}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="inline-block bg-background/80 backdrop-blur px-3 py-1 rounded-md text-sm font-medium">
                      {cs.client}
                    </div>
                  </div>
                </button>
              </DialogTrigger>
               <DialogContent className="p-0 max-w-4xl overflow-hidden">
                 {active && (
                   <div className="relative w-full h-[70vh] bg-background">
                     <Image
                       src={active.images[index]}
                       alt={`${active.client} ${index + 1}`}
                       fill
                       className="object-contain"
                       priority
                     />
                     {hasMultiple && (
                       <>
                         <button
                           aria-label="Previous image"
                           onClick={goPrev}
                           className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 border rounded-full p-2 shadow"
                         >
                           <ChevronLeft className="h-5 w-5" />
                         </button>
                         <button
                           aria-label="Next image"
                           onClick={goNext}
                           className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 border rounded-full p-2 shadow"
                         >
                           <ChevronRight className="h-5 w-5" />
                         </button>
                         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur px-3 py-1 rounded text-xs">
                           {index + 1} / {active.images.length}
                         </div>
                       </>
                     )}
                   </div>
                 )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}


