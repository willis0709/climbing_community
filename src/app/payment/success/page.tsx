
import type { Metadata } from 'next';
import { Suspense } from 'react';
import SuccessContent from './success-content';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Payment Successful - Climbers Community',
  description: 'Your payment was successful.',
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="ml-4 text-lg">Loading payment details...</p>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  );
}
