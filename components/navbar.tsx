"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, Users, PlusCircle, BarChart3, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/lib/auth-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { UserButton } from "@clerk/nextjs"

export function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: BarChart3,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/customers",
      label: "Customers",
      icon: Users,
      active: pathname === "/dashboard/customers",
    },
    {
      href: "/dashboard/add-loan",
      label: "Add Loan",
      icon: PlusCircle,
      active: pathname === "/dashboard/add-loan",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary animate-pulse-slow" />
            <span className="text-xl font-bold hidden md:inline-block">CrediKhaata</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 ml-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                  route.active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="hidden md:flex">
            <Button variant="outline" size="sm" onClick={logout} className="gap-1">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          <div className="div">
            <UserButton/>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-4 py-4">
                <div className="px-2 py-2">
                  <h2 className="mb-2 font-semibold">Menu</h2>
                  <div className="flex flex-col gap-2">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                          route.active ? "bg-accent" : ""
                        }`}
                      >
                        <route.icon className="h-4 w-4" />
                        {route.label}
                      </Link>
                    ))}
                    
                    <Button
                      variant="outline"
                      className="mt-4 w-full justify-start gap-2"
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                    ><LogOut className="h-4 w-4" />
                      Logout
                      
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
