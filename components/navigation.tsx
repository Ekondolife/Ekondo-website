"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, ShoppingBag, User, X, LogOut, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import { useCart } from "./cart-context"
import { useUser } from "./user-provider"
import { Badge } from "@/components/ui/badge"
import { SearchDialog } from "./search-dialog"

const routes = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/retail" },
  { name: "Experiences", path: "/experience" },
  { name: "Services", path: "/services" },
  { name: "Spaces", path: "/spaces" },
  { name: "About", path: "/about" },
  { name: "Journal", path: "/journal" },
  { name: "Contact", path: "/contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount } = useCart()
  const { uid, email, displayName, signOut } = useUser()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-x-hidden">
      <div className="container flex h-16 items-center justify-between px-2 md:px-4 gap-2 md:gap-4">
        {/* Left section: Hamburger + Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-1">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-xs sm:w-[400px] px-0">
              <div className="flex items-center justify-between mb-8 px-4">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/images/ekondo logo.png"
                    alt="Ekondo Logo"
                    width={80}
                    height={20}
                    className="h-8 w-auto max-w-[100px] object-contain"
                  />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <nav>
                <ul className="flex flex-col space-y-4 px-4">
                  {routes.map((route) => (
                    <li key={route.path}>
                      <Link
                        href={route.path}
                        className={cn(
                          "block py-2 text-lg font-medium transition-colors hover:text-primary",
                          pathname === route.path ? "text-primary" : "text-foreground"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {route.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Divider */}
              <div className="border-t my-4"></div>

              {/* Cart + Profile (mobile only) */}
              <div className="flex items-center justify-between px-4">
                <Link href="/cart" className="relative flex items-center" onClick={() => setIsOpen(false)}>
                  <ShoppingBag className="h-6 w-6" />
                  {itemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {itemCount}
                    </Badge>
                  )}
                  <span className="ml-2 text-sm font-medium">Cart</span>
                </Link>

                {uid ? (
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      router.push("/account")
                    }}
                    className="flex items-center space-x-2"
                  >
                    <UserCircle className="h-6 w-6" />
                    <span className="text-sm font-medium">Account</span>
                  </button>
                ) : (
                  <Link href="/login" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <User className="h-6 w-6" />
                    <span className="text-sm font-medium">Sign In</span>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="font-bold tracking-tight">
            <Image
              src="/images/ekondo logo.png"
              alt="Ekondo Logo"
              width={120}
              height={40}
              className="h-8 w-24 md:h-10 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-4">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                pathname === route.path ? "text-primary" : "text-foreground"
              )}
            >
              {route.name}
              {pathname === route.path && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section: Search + ModeToggle + Profile + Cart */}
        <div className="flex items-center gap-1 md:gap-2">
          <SearchDialog />
          <ModeToggle />

          {/* Profile (desktop) */}
          <div className="hidden lg:block">
            {uid ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || email || "User")}&background=random`}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b">
                    <p className="text-sm font-medium">{displayName || "User"}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center cursor-pointer">
                      <UserCircle className="h-4 w-4 mr-2" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Sign In</span>
                </Link>
              </Button>
            )}
          </div>

          {/* Cart (desktop) */}
          <Button variant="ghost" size="icon" className="relative hidden lg:inline-flex" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
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
