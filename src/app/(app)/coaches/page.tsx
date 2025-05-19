
import { CoachProfileCard } from "@/components/coach-profile-card";
import { getCoaches, mockUsers } from "@/lib/mock-data";
import type { User } from "@/lib/types";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Filter, Search } from "lucide-react";

// Mock current user (user1 is member, user2 is not)
const currentUser = mockUsers[0] as User; 

export default function CoachesPage() {
  const coaches = getCoaches();
  const isCurrentUserMember = currentUser?.isMember || false;

  // Mock specialties for filter - in a real app, this would be dynamic
  const allSpecialties = Array.from(new Set(coaches.flatMap(c => c.specialties)));

  return (
    <div className="space-y-8">
      <Card className="text-center py-10 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="text-4xl font-bold flex items-center justify-center">
            <Briefcase className="mr-3 h-10 w-10 text-primary" />
            Meet Our Professional Coaches
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Connect with experienced climbing coaches to elevate your skills, get personalized feedback, and achieve your climbing goals.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Filter Coaches</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Input placeholder="Search by name or expertise..." className="max-w-xs" />
          <Select>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-specialties">All Specialties</SelectItem>
              {allSpecialties.map(spec => <SelectItem key={spec} value={spec}>{spec}</SelectItem>)}
            </SelectContent>
          </Select>
           <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Availability</SelectItem>
              <SelectItem value="available">Available for Booking</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Apply Filters
          </Button>
        </CardContent>
      </Card>

      {coaches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <CoachProfileCard key={coach.id} coach={coach} isMember={isCurrentUserMember} />
          ))}
        </div>
      ) : (
        <Card className="py-10">
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground">No coaches available at the moment.</p>
            <p className="text-sm text-muted-foreground mt-1">Please check back later or contact support for more information.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
