"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import { useCart } from "./cart-context"
import { Badge } from "@/components/ui/badge"
import { SearchDialog } from "./search-dialog"

const routes = [
  { name: "Home", path: "/" },
  { name: "Retail", path: "/retail" },
  { name: "Experience", path: "/experience" },
  { name: "Services", path: "/services" },
  { name: "Spaces", path: "/spaces" },
  { name: "About", path: "/about" },
  { name: "Journal", path: "/journal" },
  { name: "Contact", path: "/contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="text-2xl font-bold tracking-tight" onClick={() => setIsOpen(false)}>
                  <span className="text-primary">Eko</span>
                  <span className="text-orange">ndo</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav>
                <ul className="flex flex-col space-y-4">
                  {routes.map((route) => (
                    <li key={route.path}>
                      <Link
                        href={route.path}
                        className={cn(
                          "block py-2 text-lg font-medium transition-colors hover:text-primary",
                          pathname === route.path ? "text-primary" : "text-foreground",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {route.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Eko</span>
            <span className="text-orange">ndo</span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                pathname === route.path ? "text-primary" : "text-foreground",
              )}
            >
              {route.name}
              {pathname === route.path && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SearchDialog />
          <ModeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs cart-badge organic-shape-soft"
                >
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Cart ({itemCount})</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
