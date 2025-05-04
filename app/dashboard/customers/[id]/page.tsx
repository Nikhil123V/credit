"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, FileText, AlertTriangle, CheckCircle2, Calendar, Phone, Mail, MapPin } from "lucide-react"
import { mockCustomers } from "@/lib/mock-data"
import type { Customer, Transaction } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function CustomerDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [repaymentAmount, setRepaymentAmount] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCustomer = mockCustomers.find((c) => c.id === params.id)
    if (foundCustomer) {
      setCustomer(foundCustomer)
    }
  }, [params.id])

  if (!customer) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  const handleRepayment = () => {
    if (!selectedTransaction) return

    const amount = Number.parseFloat(repaymentAmount)
    if (isNaN(amount) || amount <= 0 || amount > selectedTransaction.remainingBalance) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount that is less than or equal to the remaining balance.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    toast({
      title: "Repayment recorded",
      description: `₹${amount} repayment recorded successfully.`,
    })

    setIsDialogOpen(false)
    setRepaymentAmount("")
    setSelectedTransaction(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight animate-slide-up">{customer.name}</h2>
          <p className="text-muted-foreground animate-slide-up delay-100">Customer Details</p>
        </div>
        <div className="flex items-center gap-2 animate-slide-up delay-200">
          <Button variant="outline" className="gap-1">
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="animate-bounce-in">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{customer.address}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-bounce-in delay-100">
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Outstanding Balance:</span>
              <span className="font-semibold">₹{customer.outstandingBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Due Date:</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{customer.nextDueDate}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
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
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 animate-slide-up delay-300">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-semibold">Transaction History</h3>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <TransactionTable
              transactions={customer.transactions}
              onRecordRepayment={(transaction) => {
                setSelectedTransaction(transaction)
                setIsDialogOpen(true)
              }}
            />
          </TabsContent>
          <TabsContent value="unpaid" className="mt-4">
            <TransactionTable
              transactions={customer.transactions.filter((t) => t.status === "unpaid" || t.status === "partially-paid")}
              onRecordRepayment={(transaction) => {
                setSelectedTransaction(transaction)
                setIsDialogOpen(true)
              }}
            />
          </TabsContent>
          <TabsContent value="paid" className="mt-4">
            <TransactionTable
              transactions={customer.transactions.filter((t) => t.status === "paid")}
              onRecordRepayment={(transaction) => {
                setSelectedTransaction(transaction)
                setIsDialogOpen(true)
              }}
            />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Repayment</DialogTitle>
            <DialogDescription>Enter the amount received from the customer.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="item">Item</Label>
              <Input id="item" value={selectedTransaction?.itemName || ""} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="remaining">Remaining Balance</Label>
              <Input
                id="remaining"
                value={`₹${selectedTransaction?.remainingBalance.toLocaleString() || ""}`}
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Repayment Amount</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                value={repaymentAmount}
                onChange={(e) => setRepaymentAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRepayment}>Record Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function TransactionTable({
  transactions,
  onRecordRepayment,
}: {
  transactions: Transaction[]
  onRecordRepayment: (transaction: Transaction) => void
}) {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Item</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Due Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Remaining</th>
              <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">{transaction.date}</td>
                  <td className="px-4 py-3 text-sm">{transaction.itemName}</td>
                  <td className="px-4 py-3 text-sm">₹{transaction.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{transaction.dueDate}</td>
                  <td className="px-4 py-3 text-sm">
                    {transaction.status === "unpaid" ? (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Unpaid
                      </Badge>
                    ) : transaction.status === "partially-paid" ? (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      >
                        Partially Paid
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Paid
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">₹{transaction.remainingBalance.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      {transaction.status !== "paid" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => onRecordRepayment(transaction)}
                        >
                          <PlusCircle className="h-3 w-3" />
                          Record Payment
                        </Button>
                      )}
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
