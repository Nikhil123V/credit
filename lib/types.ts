export type Customer = {
  id: string
  name: string
  phone: string
  email: string
  address: string
  outstandingBalance: number
  nextDueDate: string
  status: "overdue" | "up-to-date"
  transactions: Transaction[]
}

export type Transaction = {
  id: string
  customerId: string
  date: string
  itemName: string
  amount: number
  dueDate: string
  status: "paid" | "partially-paid" | "unpaid"
  remainingBalance: number
  repayments: Repayment[]
}

export type Repayment = {
  id: string
  transactionId: string
  date: string
  amount: number
}
