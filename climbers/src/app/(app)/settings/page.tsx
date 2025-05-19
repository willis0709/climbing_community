import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Check, Bell, UserCircle, Palette, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Settings</CardTitle>
          <CardDescription>Manage your account and application preferences.</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary"/> Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Alex Honnold" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bio">Short Bio</Label>
            <Input id="bio" defaultValue="Professional rock climber, known for free solo ascents." />
          </div>
          <Button><Check className="mr-2 h-4 w-4" /> Save Profile Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-primary"/> Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="newVideoNotifs" className="flex flex-col space-y-1">
              <span>New Videos from Followed Users</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive notifications when users you follow upload new videos.
              </span>
            </Label>
            <Switch id="newVideoNotifs" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
             <Label htmlFor="commentNotifs" className="flex flex-col space-y-1">
              <span>Comments on Your Videos</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get notified about new comments on your content.
              </span>
            </Label>
            <Switch id="commentNotifs" defaultChecked />
          </div>
          <Button><Check className="mr-2 h-4 w-4" /> Save Notification Settings</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5 text-primary"/> Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="darkModeToggle" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Toggle between light and dark themes. (Theme switching not fully implemented)
              </span>
            </Label>
            <Switch id="darkModeToggle" />
          </div>
           <Button disabled><Check className="mr-2 h-4 w-4" /> Apply Theme</Button>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-primary"/> Account Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>

    </div>
  );
}
