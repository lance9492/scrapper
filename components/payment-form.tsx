"use client"

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

interface PaymentFormProps {
  formData: {
    url: string;
    fields: Record<string, string>;
  };
  onCancel: () => void;
}

export default function PaymentForm({ formData, onCancel }: PaymentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Processing Payment</h2>
        <p className="text-muted-foreground mb-6">
          You are being redirected to PayFast to complete your payment...
        </p>

        <form ref={formRef} action={formData.url} method="POST" className="hidden">
          {Object.entries(formData.fields).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
        </form>

        <Button variant="outline" onClick={onCancel} className="w-full">
          Cancel Payment
        </Button>
      </div>
    </div>
  );
}