"use client"

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/file-upload"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle, Upload } from "lucide-react"

const verificationSchema = z.object({
  idNumber: z.string().min(13).max(13),
  idDocument: z.any(),
  proofOfAddress: z.any(),
  bankStatement: z.any(),
  companyRegistration: z.any().optional(),
  taxClearance: z.any().optional(),
})

export default function VerificationPage() {
  const [uploadProgress, setUploadProgress] = useState(0)

  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
  })

  function onSubmit(values: z.infer<typeof verificationSchema>) {
    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress === 100) {
        clearInterval(interval)
        toast({
          title: "Documents Submitted",
          description: "Your verification documents have been submitted for review.",
        })
      }
    }, 500)
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Account Verification</CardTitle>
          <CardDescription>
            Upload your verification documents to start trading
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your ID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FileUpload
                  label="ID Document"
                  description="Upload your ID document (PDF or image)"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(file) => form.setValue('idDocument', file)}
                />

                <FileUpload
                  label="Proof of Address"
                  description="Not older than 3 months"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(file) => form.setValue('proofOfAddress', file)}
                />

                <FileUpload
                  label="Bank Statement"
                  description="Not older than 3 months"
                  accept=".pdf"
                  onChange={(file) => form.setValue('bankStatement', file)}
                />

                {/* Conditional company documents */}
                {form.watch('accountType') === 'company' && (
                  <>
                    <FileUpload
                      label="Company Registration"
                      description="CIPC registration documents"
                      accept=".pdf"
                      onChange={(file) => form.setValue('companyRegistration', file)}
                    />

                    <FileUpload
                      label="Tax Clearance"
                      description="Valid tax clearance certificate"
                      accept=".pdf"
                      onChange={(file) => form.setValue('taxClearance', file)}
                    />
                  </>
                )}
              </div>

              {uploadProgress > 0 && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} />
                  <p className="text-sm text-muted-foreground text-center">
                    Uploading documents... {uploadProgress}%
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full">
                Submit Documents
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}