
import type { Metadata } from 'next';
import { Suspense } from 'react';
import FailureContent from './failure-content';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Payment Failed - Climbers Community',
  description: 'Your payment could not be processed.',
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="ml-4 text-lg">Loading payment status...</p>
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FailureContent />
    </Suspense>
  );
}
