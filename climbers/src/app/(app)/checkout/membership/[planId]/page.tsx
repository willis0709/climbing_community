
import type { Metadata } from 'next';
import { Suspense } from 'react';
import CheckoutContent from './checkout-content';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Membership Checkout - Climbers Community',
  description: 'Complete your membership subscription.',
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="ml-4 text-lg">Loading checkout...</p>
    </div>
  );
}

export default function MembershipCheckoutPage({ params }: { params: { planId: string } }) {
  // The planId is passed from the page component to the client component
  // No need to use useParams() here in the page.tsx file itself.
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutContent planId={params.planId} />
    </Suspense>
  );
}
