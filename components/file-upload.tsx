"use client"

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, FileText, CheckCircle } from "lucide-react"

interface FileUploadProps {
  label: string
  description: string
  accept: string
  onChange: (file: File) => void
}

export default function FileUpload({
  label,
  description,
  accept,
  onChange
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      onChange(selectedFile)
    }
  }

  const handleRemove = () => {
    setFile(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>
      <Card className="p-4">
        {!file ? (
          <div
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <div className="text-sm font-medium mb-1">Click to upload</div>
            <div className="text-xs text-muted-foreground">{description}</div>
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={handleFileChange}
              ref={inputRef}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium">{file.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}