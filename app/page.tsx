import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CreditCard, Users, BarChart3, FileText } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary animate-pulse-slow" />
            <span className="text-xl font-bold">CrediKhaata</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="outline" className="animate-in">
                Login
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="animate-in">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 animate-slide-up">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Customer Credit with Ease
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    CrediKhaata helps shopkeepers track customer loans, manage repayments, and maintain clear financial
                    records.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="animate-bounce-in">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="animate-bounce-in delay-150">
                      Existing User
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-2 animate-fade-in">
                  <Card className="transform transition-all duration-200 hover:scale-105">
                    <CardHeader className="space-y-1">
                      <Users className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">Customer Management</CardTitle>
                      <CardDescription>Track all your customers in one place</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="transform transition-all duration-200 hover:scale-105">
                    <CardHeader className="space-y-1">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">Loan Tracking</CardTitle>
                      <CardDescription>Record and monitor all credit transactions</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="transform transition-all duration-200 hover:scale-105">
                    <CardHeader className="space-y-1">
                      <BarChart3 className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">Payment Analytics</CardTitle>
                      <CardDescription>Visualize payment trends and balances</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="transform transition-all duration-200 hover:scale-105">
                    <CardHeader className="space-y-1">
                      <FileText className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">PDF Statements</CardTitle>
                      <CardDescription>Generate professional customer statements</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground animate-bounce-in">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight animate-slide-up">
                  Everything You Need to Manage Credit
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-slide-up">
                  CrediKhaata provides all the tools you need to manage customer credit efficiently and professionally.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 animate-slide-up">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Customer Management</h3>
                      <p className="text-muted-foreground">
                        Add and manage customer profiles with contact information and credit history.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Loan Tracking</h3>
                      <p className="text-muted-foreground">
                        Record new loans with item details, amounts, and due dates.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Repayment Recording</h3>
                      <p className="text-muted-foreground">
                        Track partial or full repayments with dates and remaining balances.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4 animate-slide-up delay-150">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Overdue Alerts</h3>
                      <p className="text-muted-foreground">
                        Visual indicators for overdue loans to help prioritize collections.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">PDF Statements</h3>
                      <p className="text-muted-foreground">
                        Generate and export professional customer statements as PDF.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Dark Mode Support</h3>
                      <p className="text-muted-foreground">
                        Switch between light and dark themes for comfortable viewing.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} CrediKhaata. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
