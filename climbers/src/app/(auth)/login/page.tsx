
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { MountainIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Placeholder for social icons - in a real app, you might use SVGs or a library
const GoogleIcon = () => <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.59,4.73 17.93,7.17 18.24,7.91L20.93,6.33C19.91,4.18 17.34,2.73 14.7,2.73C9.05,2.73 4.5,7.22 4.5,12.01C4.5,16.79 9.05,21.27 14.7,21.27C18.54,21.27 21.73,18.33 21.73,14.38C21.73,13.03 21.58,11.9 21.35,11.1Z"></path></svg>;
const FacebookIcon = () => <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H17V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z"></path></svg>;
const AppleIcon = () => <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M19.1,12.76C19.1,11.23 20.26,10.08 21.8,10.08C21.76,10.07 21.72,10.06 21.68,10.06C20.63,10.06 19.73,10.56 19.22,11.25C18.72,10.56 17.84,10.06 16.78,10.06C15.25,10.06 14.09,11.23 14.09,12.76C14.09,14.21 15.06,15.19 16.21,15.71C15.42,16.91 15.11,17.53 15.11,17.53C14.74,18.72 14.04,20.09 12.93,20.09C11.78,20.09 11.26,19.34 10.39,19.34C9.5,19.34 8.94,20.09 7.83,20.09C6.59,20.09 5.86,18.69 5.45,17.53H5.44C4.09,13.41 5.86,9.11 7.94,7.05C8.86,6.12 9.94,5.63 11.13,5.63C12.32,5.63 13.26,6.12 14.05,6.83L15.09,5.91C14.16,5 12.88,4.38 11.13,4.38C9.5,4.38 8.16,5.05 7.16,5.96C4.45,8.56 3.07,12.76 4.85,17.85C5.89,20.93 7.41,22.13 8.94,22.13C9.91,22.13 10.67,21.47 11.49,21.47C12.33,21.47 12.96,22.13 14.07,22.13C15.5,22.13 16.69,20.71 17.25,19.68C17.41,19.32 17.84,18.22 18.41,17.08C18.42,17.07 18.43,17.05 18.43,17.04C18.47,16.96 18.5,16.89 18.53,16.82C19.45,15.21 19.1,14.05 19.1,12.76M11.13,7.01C10.3,7.01 9.56,7.43 9.09,8.09C8.35,8.99 7.93,10.13 7.93,11.35C7.93,11.75 8,12.14 8.11,12.53C8.79,11.27 10.04,10.41 11.47,10.41C11.83,10.41 12.18,10.46 12.5,10.56C12.07,8.62 11.27,7.01 11.13,7.01Z"></path></svg>;


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSocialLogin = async (provider: string) => {
    toast({
      title: "Simulating Login...",
      description: `Attempting to log in with ${provider}. This is a mock action.`,
    });
    // Simulate API call and redirection
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/'); // Redirect to homepage on successful mock login
  };

  const handleEmailLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Simulating Login...",
      description: "Attempting email login. This is a mock action.",
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/');
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <Link href="/" className="flex items-center justify-center gap-2 text-xl font-semibold mb-2">
          <MountainIcon className="h-7 w-7 text-primary" />
          <span className="font-bold text-2xl tracking-tight">Climbers Community</span>
        </Link>
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription>Login to access your account and member benefits.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-center py-6 text-base" onClick={() => handleSocialLogin('Google')}>
            <GoogleIcon /> Login with Google
          </Button>
          <Button variant="outline" className="w-full justify-center py-6 text-base" onClick={() => handleSocialLogin('Facebook')}>
            <FacebookIcon /> Login with Facebook
          </Button>
          <Button variant="outline" className="w-full justify-center py-6 text-base" onClick={() => handleSocialLogin('Apple')}>
            <AppleIcon /> Login with Apple
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full py-6 text-base">Login</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2 text-sm">
        {/* <p>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p> */}
        <Link href="/" className="text-muted-foreground hover:text-primary hover:underline">
            Back to Home
        </Link>
      </CardFooter>
    </Card>
  );
}
