"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSurfyPalStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrustScoreBadge } from "@/components/trust-score/trust-score-badge"
import { Menu, Home, Search, User, LogOut, LayoutDashboard, MessageSquare, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const mainNavItems = [
  { name: "Home", href: "/" },
  { name: "Listings", href: "/listings" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About", href: "/about" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { currentUser, signOut } = useSurfyPalStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">SurfyPal</span>
          </Link>

          <nav className="hidden md:flex md:gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <TrustScoreBadge score={currentUser.trustScore} className="hidden md:flex" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${currentUser.id}`}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/messages">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Messages
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saved">
                      <Heart className="mr-2 h-4 w-4" />
                      Saved
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex md:gap-2">
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 p-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <div className="flex items-center gap-2">
                  <Link href="/" className="text-lg font-bold">
                    SurfyPal
                  </Link>
                </div>
                <nav className="grid gap-3">
                  <Link href="/" className="flex items-center gap-2 text-sm font-medium" onClick={() => setOpen(false)}>
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <Link
                    href="/listings"
                    className="flex items-center gap-2 text-sm font-medium"
                    onClick={() => setOpen(false)}
                  >
                    <Search className="h-4 w-4" />
                    Listings
                  </Link>
                  {currentUser ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-sm font-medium"
                        onClick={() => setOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href={`/profile/${currentUser.id}`}
                        className="flex items-center gap-2 text-sm font-medium"
                        onClick={() => setOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          signOut()
                          setOpen(false)
                        }}
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2 pt-4">
                      <Button asChild>
                        <Link href="/signin" onClick={() => setOpen(false)}>
                          Sign in
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/signup" onClick={() => setOpen(false)}>
                          Sign up
                        </Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

