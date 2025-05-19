
"use client";

import type { ProfessionalCoach } from "@/lib/types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, CalendarCheck, Mail, MessageSquare, Star, DollarSign, ShieldCheck, Award, CheckCircle, Info, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CoachProfileCardProps {
  coach: ProfessionalCoach;
  isMember: boolean; // To tailor CTA or show member perks
}

export function CoachProfileCard({ coach, isMember }: CoachProfileCardProps) {
  const { toast } = useToast();

  const handleContact = () => {
    if (coach.contactInfo?.platformMessage) {
       toast({ title: "Contact Coach (Mock)", description: `Platform messaging for ${coach.name} is not implemented.` });
    } else if (coach.contactInfo?.email) {
      window.location.href = `mailto:${coach.contactInfo.email}`;
    } else {
       toast({ title: "Contact Coach (Mock)", description: `No direct contact method specified for ${coach.name}.` });
    }
  };

  const handleBookSession = () => {
    toast({ title: "Book Session (Mock)", description: `Booking a session with ${coach.name} is not implemented. Availability: ${coach.isAvailableForBooking ? coach.availabilityNotes || 'Yes' : 'No'}` });
  };
  
  const handleChat = () => {
    toast({ title: "Chat with Coach (Mock)", description: `Live chat with ${coach.name} is not implemented.` });
  }

  const averageRating = coach.mockReviews && coach.mockReviews.length > 0 
    ? coach.mockReviews.reduce((acc, review) => acc + review.rating, 0) / coach.mockReviews.length
    : null;

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center text-center p-6 bg-muted/30">
        <Avatar className="h-24 w-24 mb-3 border-4 border-primary shadow-md">
          <AvatarImage src={coach.avatarUrl} alt={coach.name} data-ai-hint={coach.dataAiHint || "coach profile"} />
          <AvatarFallback className="text-3xl">{coach.name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{coach.name}</CardTitle>
        <CardDescription className="text-primary font-medium">{coach.expertise}</CardDescription>
        <p className="text-xs text-muted-foreground">{coach.yearsExperience} years of experience</p>
        {averageRating && (
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="ml-1.5 text-xs text-muted-foreground">({averageRating.toFixed(1)} from {coach.mockReviews?.length} reviews)</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-4">
        
        <div>
            <h4 className="font-semibold text-sm text-foreground/90 mb-1">Specialties:</h4>
            <div className="flex flex-wrap gap-1.5">
            {coach.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">{specialty}</Badge>
            ))}
            </div>
        </div>

        {coach.qualifications && coach.qualifications.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-foreground/90 mb-1 flex items-center"><Award className="mr-1.5 h-4 w-4 text-accent"/> Qualifications:</h4>
            <ul className="list-disc list-inside text-xs text-muted-foreground pl-4 space-y-0.5">
              {coach.qualifications.map(q => <li key={q}>{q}</li>)}
            </ul>
          </div>
        )}
        
        <p className="text-sm text-muted-foreground line-clamp-3"><span className="font-semibold text-foreground/80">Bio:</span> {coach.bio}</p>
        <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground/80">Teaching Style:</span> {coach.teachingStyle}</p>

        {coach.availabilityNotes && (
             <p className="text-sm text-muted-foreground flex items-start"><Clock className="mr-1.5 h-4 w-4 mt-0.5 text-primary shrink-0"/> <span className="font-semibold text-foreground/80 mr-1">Availability:</span> {coach.availabilityNotes}</p>
        )}

        {coach.servicesOffered && coach.servicesOffered.length > 0 && (
          <div>
            <Separator className="my-3" />
            <h4 className="font-semibold text-sm text-foreground/90 mb-2 flex items-center"><Briefcase className="mr-1.5 h-4 w-4 text-accent"/> Services Offered:</h4>
            <div className="space-y-2">
              {coach.servicesOffered.slice(0, 2).map(service => ( // Show first 2 services, add "more" if needed
                <div key={service.name} className="p-2.5 bg-muted/50 rounded-md border border-border/70 text-xs">
                  <p className="font-medium text-foreground/90">{service.name}</p>
                  <p className="text-muted-foreground">{service.price} {service.description ? `- ${service.description}`: ''}</p>
                </div>
              ))}
              {coach.servicesOffered.length > 2 && <p className="text-xs text-center text-primary hover:underline cursor-pointer" onClick={() => toast({title: "View All Services", description: "This would show a modal or navigate to a detailed coach page."})}>View all services...</p>}
            </div>
          </div>
        )}


        {isMember && coach.memberPerks && coach.memberPerks.length > 0 && (
          <div className="mt-3 p-2.5 bg-primary/10 rounded-md border border-primary/20">
            <h4 className="font-semibold text-sm text-primary mb-1 flex items-center">
                <Star className="mr-1.5 h-4 w-4"/> Member Perks:
            </h4>
            <ul className="list-disc list-inside text-xs text-primary/80 pl-1 space-y-0.5">
              {coach.memberPerks.map(perk => <li key={perk}>{perk}</li>)}
            </ul>
          </div>
        )}
         {coach.hourlyRate && !coach.servicesOffered?.length && ( // Only show if no specific services listed
             <p className="text-sm font-semibold text-accent flex items-center mt-2">
                <DollarSign className="mr-1.5 h-4 w-4" /> General Consultation Rate: ${coach.hourlyRate}/hour
            </p>
        )}

      </CardContent>
      <CardFooter className="p-4 border-t flex flex-col items-stretch gap-3">
        <Button
          variant="default"
          size="default" 
          onClick={handleBookSession}
          disabled={!coach.isAvailableForBooking}
          className={cn(
            "w-full",
            !coach.isAvailableForBooking && "bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed"
          )}
        >
          <CalendarCheck className="mr-2 h-4 w-4" />
          {coach.isAvailableForBooking ? "Book Session" : "Unavailable for Booking"}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={handleContact} className="w-full">
            <Mail className="mr-1.5 h-4 w-4" /> Contact
          </Button>
          <Button variant="ghost" size="sm" onClick={handleChat} className="w-full">
            <MessageSquare className="mr-1.5 h-4 w-4"/> Quick Chat
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
