
export type Video = {
  id: string;
  title: string;
  thumbnailUrl: string;
  dataAiHint?: string; // Added for placeholder images
  uploader: UserSummary;
  location: string;
  difficulty: string; // e.g., "V5", "5.12a"
  routeType: string; // e.g., "Boulder", "Sport", "Trad"
  uploadDate: string; // ISO string
  views: number;
  description?: string;
  videoUrl?: string; // For actual video playback, or data URI
  aiAnalysis?: {
    difficultyRating: string;
    suggestions: string;
  };
  comments?: Comment[];
  isExclusive?: boolean; // For member-only content
  sponsors?: Array<{ user: UserSummary; amount: number }>; // For sponsorship feature
  totalSponsorship?: number; // Aggregated sponsorship amount
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  climbingExperience: string; // e.g., "Beginner", "Intermediate", "Advanced", "Expert"
  achievements: string[];
  uploadedVideos?: Video[];
  trainingLog?: TrainingLogEntry[];
  following?: UserSummary[];
  followers?: UserSummary[];
  isMember?: boolean; // Kept for general member check, tier implies membership
  membershipTier?: 'Base Camp' | 'Crux' | 'Summit' | 'None'; // Updated membership tier names
  subscriptionPlan?: string; // Can store specific plan like 'summit-annual'
  subscriptionEndDate?: string; // ISO string for mock display
  totalSponsoredAmount?: number; // For sponsor leaderboard
};

export type UserSummary = Pick<User, 'id' | 'name' | 'avatarUrl'>;

export type TrainingLogEntry = {
  id: string;
  date: string; // ISO string
  notes: string;
  duration?: string; // e.g., "2 hours"
  intensity?: string; // e.g., "High"
};

export type Comment = {
  id: string;
  user: UserSummary;
  text: string;
  timestamp: string; // ISO string
};

export type ForumTopic = {
  id: string;
  title: string;
  author: UserSummary;
  createdAt: string; // ISO string
  lastReplyAt: string; // ISO string
  repliesCount: number;
  category: string;
};

export type ForumPost = {
  id:string;
  topicId: string;
  author: UserSummary;
  content: string;
  createdAt: string; // ISO string
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  participants: number;
  imageUrl?: string;
  dataAiHint?: string; // Added for placeholder images
  status: "upcoming" | "active" | "completed";
};

export type Notification = {
  id: string;
  type: "new_video" | "new_comment" | "new_follower" | "challenge_start";
  message: string;
  link?: string;
  read: boolean;
  timestamp: string; // ISO string
};

export type SubscriptionPlan = {
  id: string; // e.g., "basecamp-monthly", "summit-annual"
  tier: 'Base Camp' | 'Crux' | 'Summit'; // Updated tier names
  name: string; // e.g., "Base Camp 會員 - 月繳"
  price: string; // e.g., "NT$ 650/月"
  priceType: 'monthly' | 'annual';
  annualEquivalentPrice?: string; // e.g., "(約 NT$ 583/月)"
  features: string[];
  cta: string;
  iconName?: 'Star' | 'Gem' | 'ShieldCheck' | 'Award';
};

export type CoachService = {
  name: string; // e.g., "Video Analysis", "1-on-1 Coaching Session"
  description?: string;
  price: string; // e.g., "NT$ 500 / video", "NT$ 1,500 / hour"
  type: 'single' | 'subscription' | 'per_session'; // For mock distinction
};

export type CoachReview = {
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO String
};

export type ProfessionalCoach = {
  id: string;
  name: string;
  avatarUrl: string;
  dataAiHint?: string; // For placeholder images
  expertise: string; // e.g., "Bouldering Specialist", "Lead Climbing Coach"
  specialties: string[]; // e.g., ["Technique", "Mental Game", "Strength Training"]
  qualifications?: string[]; // e.g., ["AMGA Certified", "CSCS"]
  bio: string;
  teachingStyle: string;
  contactInfo?: {
    email?: string;
    platformMessage?: boolean; // Indicates if they can be messaged via the platform (mock)
  };
  hourlyRate?: number; // For general paid consultations, might be superseded by servicesOffered
  servicesOffered?: CoachService[];
  availabilityNotes?: string; // e.g., "Mon-Fri 9am-5pm, Book 24hrs in advance"
  mockReviews?: CoachReview[];
  isAvailableForBooking?: boolean;
  memberPerks?: string[]; // e.g., ["Free 15-min intro call for Pro members"]
  yearsExperience: number;
};

// Messaging Feature Types
export type Message = {
  id: string;
  conversationId: string;
  senderId: string; // User ID of the sender
  text: string;
  timestamp: string; // ISO string
  read?: boolean;
};

export type Conversation = {
  id: string;
  participants: UserSummary[]; // Array of users in the conversation
  lastMessage?: Message;
  unreadCount?: number; // For the current viewing user
  title?: string; // Could be group chat title or generated from participant names
};
