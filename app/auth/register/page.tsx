"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Building2, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  accountType: z.enum(["individual", "company"]),
  role: z.enum(["buyer", "seller", "both"])
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: "individual",
      role: "both"
    },
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    if (step === 1) {
      setStep(2)
    } else {
      console.log(values)
      // Handle registration
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Image Section */}
      <div className="relative hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1567502669551-8d58f952c9f9?auto=format&fit=crop&q=80"
          alt="Scrap Metal Trading"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-3xl font-bold mb-4">Join Our Community</h1>
            <p className="text-gray-200 max-w-md">
              Create an account to start buying and selling scrap metal on South Africa's premier marketplace.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-muted-foreground">
              {step === 1 ? "Choose your account type" : "Set up your credentials"}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 ? (
                <>
                  <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Account Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div className="relative flex flex-col items-center space-y-2 rounded-lg border-2 p-4 cursor-pointer hover:border-primary transition-colors">
                              <User className="h-6 w-6" />
                              <RadioGroupItem value="individual" id="individual" className="sr-only" />
                              <span>Individual</span>
                            </div>
                            <div className="relative flex flex-col items-center space-y-2 rounded-lg border-2 p-4 cursor-pointer hover:border-primary transition-colors">
                              <Building2 className="h-6 w-6" />
                              <RadioGroupItem value="company" id="company" className="sr-only" />
                              <span>Company</span>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>I want to</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-3 gap-4"
                          >
                            <div className="relative flex items-center justify-center rounded-lg border-2 p-4 cursor-pointer hover:border-primary transition-colors">
                              <RadioGroupItem value="buyer" id="buyer" className="sr-only" />
                              <span>Buy</span>
                            </div>
                            <div className="relative flex items-center justify-center rounded-lg border-2 p-4 cursor-pointer hover:border-primary transition-colors">
                              <RadioGroupItem value="seller" id="seller" className="sr-only" />
                              <span>Sell</span>
                            </div>
                            <div className="relative flex items-center justify-center rounded-lg border-2 p-4 cursor-pointer hover:border-primary transition-colors">
                              <RadioGroupItem value="both" id="both" className="sr-only" />
                              <span>Both</span>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              <Button type="submit" className="w-full">
                {step === 1 ? "Next" : "Create Account"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}