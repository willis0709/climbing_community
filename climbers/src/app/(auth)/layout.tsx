
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Climbers Community',
  description: 'Login or Register for Climbers Community.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      {children}
    </div>
  );
}
