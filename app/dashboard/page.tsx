"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, FileText, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { mockCustomers } from "@/lib/mock-data"
import type { Customer } from "@/lib/types"

export default function DashboardPage() {
  const { user } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // In a real app, this would be an API call
    setCustomers(mockCustomers)
  }, [])

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "overdue") return matchesSearch && customer.status === "overdue"
    if (activeTab === "upToDate") return matchesSearch && customer.status === "up-to-date"

    return matchesSearch
  })

  const totalOutstanding = customers.reduce((sum, customer) => sum + customer.outstandingBalance, 0)
  const overdueAmount = customers
    .filter((customer) => customer.status === "overdue")
    .reduce((sum, customer) => sum + customer.outstandingBalance, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight animate-slide-up">Dashboard</h2>
          <p className="text-muted-foreground animate-slide-up delay-100">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2 animate-slide-up delay-200">
          <Link href="/dashboard/add-customer">
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Customer
            </Button>
          </Link>
          <Link href="/dashboard/add-loan">
            <Button variant="outline" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Loan
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="animate-bounce-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalOutstanding.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From {customers.length} customers</p>
          </CardContent>
        </Card>
        <Card className="animate-bounce-in delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{overdueAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {customers.filter((c) => c.status === "overdue").length} overdue customers
            </p>
          </CardContent>
        </Card>
        <Card className="animate-bounce-in delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">Transactions in the last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 animate-slide-up delay-300">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-semibold">Customer Overview</h3>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Customers</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="upToDate">Up to Date</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <CustomerTable customers={filteredCustomers} />
          </TabsContent>
          <TabsContent value="overdue" className="mt-4">
            <CustomerTable customers={filteredCustomers} />
          </TabsContent>
          <TabsContent value="upToDate" className="mt-4">
            <CustomerTable customers={filteredCustomers} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Outstanding</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Next Due Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">{customer.name}</td>
                  <td className="px-4 py-3 text-sm">₹{customer.outstandingBalance.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{customer.nextDueDate}</td>
                  <td className="px-4 py-3 text-sm">
                    {customer.status === "overdue" ? (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Overdue
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Up to date
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/customers/${customer.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="gap-1">
                        <FileText className="h-3 w-3" />
                        PDF
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
