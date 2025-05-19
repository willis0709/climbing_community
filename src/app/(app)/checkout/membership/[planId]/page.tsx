// src/app/(app)/checkout/membership/[planId]/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Membership Checkout - Climbers Community',
  description: 'Complete your membership subscription.',
};

type PageProps = {
  params: {
    planId: string;
  };
};

// ✅ 靜態產生所有 planId 對應的頁面
export async function generateStaticParams() {
  return [
    { planId: 'basecamp-monthly' },
    { planId: 'basecamp-annual' },
    { planId: 'crux-monthly' },
    { planId: 'crux-annual' },
    { planId: 'summit-monthly' },
    { planId: 'summit-annual' },
  ];
}

export default function MembershipCheckoutPage({ params }: PageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Checkout Page</h1>
      <p className="mt-2">Plan ID: {params.planId}</p>
    </div>
  );
}