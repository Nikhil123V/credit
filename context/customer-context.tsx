"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Customer = {
  id: string
  name: string
  phone: string
  email?: string
  address: string
  status: string
  outstandingBalance: number
}

type CustomerContextType = {
  customers: Customer[]
  addCustomer: (customer: Customer) => void
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>([])

  function addCustomer(customer: Customer) {
    setCustomers((prev) => [...prev, customer])
  }

  return (
    <CustomerContext.Provider value={{ customers, addCustomer }}>
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomerContext() {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error("useCustomerContext must be used within a CustomerProvider")
  }
  return context
}