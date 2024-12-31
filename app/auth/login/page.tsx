"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Recycle } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
    // Handle login
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Image Section */}
      <div className="relative hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80"
          alt="Scrap Metal"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <Recycle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
            <p className="text-gray-200 max-w-md">
              Access South Africa's premier scrap metal marketplace and start trading today.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              
              <Button type="submit" className="w-full">
                Login
              </Button>

              <div className="text-center space-y-2">
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline block">
                  Forgot your password?
                </Link>
                <div className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-primary hover:underline">
                    Register here
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}