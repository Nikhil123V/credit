"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, AlertTriangle, CheckCircle2, Phone, Mail } from "lucide-react"
import { mockCustomers } from "@/lib/mock-data"
import type { Customer } from "@/lib/types"

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // In a real app, this would be an API call
    setCustomers(mockCustomers)
  }, [])

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight animate-slide-up">Customers</h2>
          <p className="text-muted-foreground animate-slide-up delay-100">Manage your customer list</p>
        </div>
        <div className="flex items-center gap-2 animate-slide-up delay-200">
          <Link href="/dashboard/add-customer">
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Customer
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium">No customers found</h3>
            <p className="text-muted-foreground">Try adjusting your search or add a new customer</p>
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <Link href={`/dashboard/customers/${customer.id}`} key={customer.id}>
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 animate-bounce-in">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <CardTitle className="text-lg">{customer.name}</CardTitle>
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
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                  {customer.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{customer.email}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Outstanding:</span>
                    <span className="font-medium">₹{customer.outstandingBalance.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
