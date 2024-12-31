"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/file-upload"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"
import { createPaymentForm } from '@/lib/payfast'
import PaymentForm from '@/components/payment-form'

// ... (previous imports and schema remain the same)

export default function CreateListingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentData, setPaymentData] = useState<{ url: string; fields: Record<string, string> } | null>(null)

  const form = useForm<z.infer<typeof listingSchema>>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      duration: 7,
      images: [],
    },
  })

  async function onSubmit(values: z.infer<typeof listingSchema>) {
    setIsSubmitting(true)
    try {
      // Generate payment data
      const payment = createPaymentForm({
        amount: 10.00, // R10 listing fee
        item_name: "Scrap Metal Listing Fee",
        return_url: `${window.location.origin}/marketplace/create/success`,
        cancel_url: `${window.location.origin}/marketplace/create/cancel`,
        notify_url: `${window.location.origin}/api/payment/notify`,
        email_address: "user@example.com", // Get from auth session
      });

      setPaymentData(payment);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  if (paymentData) {
    return (
      <PaymentForm
        formData={paymentData}
        onCancel={() => {
          setPaymentData(null)
          setIsSubmitting(false)
        }}
      />
    )
  }

  // ... (rest of the component remains the same)
}