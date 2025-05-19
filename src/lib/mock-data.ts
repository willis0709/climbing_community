
import type { User, Video, Comment, ForumTopic, Challenge, TrainingLogEntry, ProfessionalCoach, Message, Conversation } from './types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alex Honnold',
    avatarUrl: 'https://placehold.co/100x100.png',
    climbingExperience: 'Expert',
    achievements: ['Freed El Capitan', 'Speed records'],
    trainingLog: [
      { id: 'tl1', date: new Date(Date.now() - 86400000 * 2).toISOString(), notes: 'Hangboard session, 4 sets of max hangs.', duration: '1 hour', intensity: 'High' },
      { id: 'tl2', date: new Date(Date.now() - 86400000 * 5).toISOString(), notes: 'Campus board training.', duration: '45 mins', intensity: 'Medium' },
    ],
    isMember: true,
    membershipTier: 'Summit', // Updated
    subscriptionPlan: 'summit-annual', // Updated
    subscriptionEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    totalSponsoredAmount: 150,
  },
  {
    id: 'user2',
    name: 'Lynn Hill',
    avatarUrl: 'https://placehold.co/100x100.png',
    climbingExperience: 'Legend',
    achievements: ['First free ascent of The Nose'],
    isMember: true,
    membershipTier: 'Crux', // Updated
    subscriptionPlan: 'crux-monthly', // Updated
    subscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(), // Expires in 20 days
    totalSponsoredAmount: 75,
  },
  {
    id: 'user3',
    name: 'Chris Sharma',
    avatarUrl: 'https://placehold.co/100x100.png',
    climbingExperience: 'Expert',
    achievements: ['Established numerous hard routes'],
    isMember: true,
    membershipTier: 'Base Camp', // Updated
    subscriptionPlan: 'basecamp-annual', // Updated
    subscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 150)).toISOString(), // Expires in 150 days
    totalSponsoredAmount: 200,
  },
    {
    id: 'user4',
    name: 'Beta Breaker',
    avatarUrl: 'https://placehold.co/100x100.png',
    climbingExperience: 'Advanced',
    achievements: ['Local legend at The Crag'],
    isMember: false,
    membershipTier: 'None',
    totalSponsoredAmount: 25,
  }
];

export const mockVideos: Video[] = [
  {
    id: 'video1',
    title: 'Climbing The Dawn Wall',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'climbing rock',
    uploader: mockUsers[0],
    location: 'Yosemite, USA',
    difficulty: '5.14d',
    routeType: 'Big Wall',
    uploadDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    views: 10500,
    description: 'A challenging climb on El Capitan. This is an exclusive look for members.',
    videoUrl: 'https://placehold.co/1280x720.mp4',
    aiAnalysis: {
      difficultyRating: 'Extremely Hard (5.14d equivalent)',
      suggestions: 'Maintain consistent pacing. Focus on micro-beta for crux sections. Excellent body tension displayed.',
    },
    comments: [
      { id: 'c1', user: mockUsers[1], text: 'Incredible send!', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 'c2', user: mockUsers[2], text: 'Inspiring stuff!', timestamp: new Date(Date.now() - 7200000).toISOString() },
    ],
    isExclusive: true,
    sponsors: [{ user: mockUsers[2], amount: 50 }, { user: mockUsers[1], amount: 20 }],
    totalSponsorship: 70,
  },
  {
    id: 'video2',
    title: 'Bouldering Session in Font',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'bouldering forest',
    uploader: mockUsers[1],
    location: 'Fontainebleau, France',
    difficulty: 'V10',
    routeType: 'Boulder',
    uploadDate: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    views: 7800,
    description: 'Working on some classic problems. Open to all viewers.',
    videoUrl: 'https://placehold.co/1280x720.mp4',
    isExclusive: false,
    sponsors: [{ user: mockUsers[0], amount: 30 }],
    totalSponsorship: 30,
  },
  {
    id: 'video3',
    title: 'Sport Climbing in Spain (Crux+)',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sport climbing',
    uploader: mockUsers[2],
    location: 'Siurana, Spain',
    difficulty: '5.13a',
    routeType: 'Sport',
    uploadDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    views: 5200,
    isExclusive: true, 
    sponsors: [{ user: mockUsers[0], amount: 100 }, {user: mockUsers[3], amount: 25 }],
    totalSponsorship: 125,
  },
  {
    id: 'video4',
    title: 'Local Crag Exploration',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'climbing outdoor',
    uploader: mockUsers[0],
    location: 'Red River Gorge, USA',
    difficulty: '5.12b',
    routeType: 'Sport',
    uploadDate: new Date(Date.now() - 86400000 * 10).toISOString(),
    views: 3100,
    description: 'Finding new lines at a familiar spot. Public video.',
    isExclusive: false,
    sponsors: [],
    totalSponsorship: 0,
  },
];

mockUsers[0].uploadedVideos = [mockVideos[0], mockVideos[3]];
mockUsers[1].uploadedVideos = [mockVideos[1]];
mockUsers[2].uploadedVideos = [mockVideos[2]];


export const mockTrainingLogs: TrainingLogEntry[] = [
    ...(mockUsers[0].trainingLog ?? []),
    { id: 'tl3', date: new Date(Date.now() - 86400000 * 1).toISOString(), notes: 'Endurance climbing on auto-belay.', duration: '1.5 hours', intensity: 'Medium' },
    { id: 'tl4', date: new Date(Date.now() - 86400000 * 3).toISOString(), notes: 'Rest day, light stretching.', duration: '30 mins', intensity: 'Low' },
];


export const mockForumTopics: ForumTopic[] = [
  {
    id: 'topic1',
    title: 'Best finger training techniques?',
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastReplyAt: new Date(Date.now() - 3600000).toISOString(),
    repliesCount: 15,
    category: 'Training',
  },
  {
    id: 'topic2',
    title: 'Favorite climbing destinations for winter?',
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    lastReplyAt: new Date(Date.now() - 86400000).toISOString(),
    repliesCount: 22,
    category: 'Travel',
  },
];

export const mockChallenges: Challenge[] = [
  {
    id: 'challenge1',
    title: 'Vertical Mile Challenge',
    description: 'Climb a total of one vertical mile in a month. Track your ascents!',
    startDate: new Date(Date.now() - 86400000 * 10).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 20).toISOString(), // Ends in 20 days
    participants: 152,
    imageUrl: 'https://placehold.co/400x200.png',
    dataAiHint: 'mountain summit',
    status: 'active',
  },
  {
    id: 'challenge2',
    title: 'Boulder Bash Weekly',
    description: 'Complete 10 new boulder problems this week. Any grade counts!',
    startDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 5).toISOString(), // Ends in 5 days
    participants: 78,
    status: 'active',
  },
   {
    id: 'challenge3',
    title: 'Project Send-Off',
    description: 'Send your long-term project by the end of the season.',
    startDate: new Date(Date.now() + 86400000 * 5).toISOString(), // Starts in 5 days
    endDate: new Date(Date.now() + 86400000 * 60).toISOString(),
    participants: 0,
    imageUrl: 'https://placehold.co/400x200.png',
    dataAiHint: 'climbing project',
    status: 'upcoming',
  },
];

export const mockCoaches: ProfessionalCoach[] = [
  {
    id: 'coach1',
    name: 'Coach Dave',
    avatarUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'coach portrait',
    expertise: 'Bouldering & Technique Specialist',
    specialties: ['Movement Analysis', 'Strength Training for Bouldering', 'Mental Game'],
    qualifications: ['ACME Certified Climbing Coach', 'Advanced Movement Specialist'],
    bio: "With over 10 years of coaching experience, Dave has helped climbers of all levels break through plateaus and send their dream projects. He focuses on a holistic approach to climbing.",
    teachingStyle: "Analytical and encouraging, focusing on refining technique and building climber confidence.",
    contactInfo: { platformMessage: true, email: "dave@verticalvisions.app" },
    servicesOffered: [
      { name: "Video Analysis (Single)", price: "NT$ 750 / video", type: "single", description: "Detailed feedback on one video." },
      { name: "Video Analysis (Monthly Subscription)", price: "NT$ 2,500 / month", type: "subscription", description: "Up to 5 videos analyzed per month." },
      { name: "1-on-1 Bouldering Technique (Hourly)", price: "NT$ 2,000 / hour", type: "per_session" },
      { name: "1-on-1 Bouldering Package (Monthly)", price: "NT$ 7,000 / month", type: "subscription", description: "4 one-hour sessions." }
    ],
    availabilityNotes: "Mon-Fri 10am-6pm. Book at least 48 hours in advance.",
    mockReviews: [
      { userId: 'user2', userName: 'Lynn H.', rating: 5, comment: "Dave's video analysis was spot on!", date: new Date(Date.now() - 86400000 * 7).toISOString() },
      { userId: 'user3', userName: 'Chris S.', rating: 4, comment: "Great tips for my project.", date: new Date(Date.now() - 86400000 * 14).toISOString() }
    ],
    isAvailableForBooking: true,
    memberPerks: ["10% off for Base Camp+", "15% off for Crux+", "20% off for Summit members"],
    yearsExperience: 10,
  },
  {
    id: 'coach2',
    name: 'Coach Sarah',
    avatarUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'coach smiling',
    expertise: 'Competition & Youth Climbing Coach',
    specialties: ['Competition Strategy', 'Youth Development', 'Endurance Training'],
    qualifications: ['National Competition Certified', 'Youth Climbing Specialist'],
    bio: "Sarah is a former competitive climber with a passion for nurturing young talent and preparing athletes for the rigors of competition. She has coached national-level youth climbers.",
    teachingStyle: "Structured and goal-oriented, with an emphasis on dynamic movement and mental preparation.",
    contactInfo: { platformMessage: true },
    servicesOffered: [
      { name: "Competition Prep Session (1-on-1)", price: "NT$ 1,800 / hour", type: "per_session" },
      { name: "Youth Squad Training (Group)", price: "NT$ 800 / person / session", type: "per_session", description: "Minimum 4, Maximum 8 participants." },
      { name: "Seasonal Competition Plan (Subscription)", price: "NT$ 7,000 / season", type: "subscription", description: "Full season prep." }
    ],
    availabilityNotes: "Evenings & Weekends. Currently fully booked for 1-on-1.",
    mockReviews: [
      { userId: 'user1', userName: 'Alex H.', rating: 5, comment: "Sarah is fantastic with young climbers.", date: new Date(Date.now() - 86400000 * 5).toISOString() },
    ],
    isAvailableForBooking: false,
    memberPerks: ["Priority booking for Summit members"],
    yearsExperience: 8,
  },
  {
    id: 'coach3',
    name: 'Coach Kenji',
    avatarUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'coach training',
    expertise: 'Lead Climbing & Outdoor Skills',
    specialties: ['Route Reading', 'Anchor Building', 'Multi-pitch Efficiency', 'Fear Management'],
    qualifications: ['AMGA Single Pitch Instructor', 'Wilderness First Responder'],
    bio: "Kenji is an AMGA certified guide who loves helping gym climbers transition to the outdoors. His expertise lies in safety, efficiency, and mastering lead climbing techniques.",
    teachingStyle: "Patient and methodical, emphasizing safety and building a strong foundation of outdoor skills.",
    contactInfo: { email: "kenji@verticalvisions.app" },
    servicesOffered: [
      { name: "Intro to Outdoor Leading (Full Day)", price: "NT$ 4,000 / person", type: "single", description: "Full day course, gear included." },
      { name: "Anchor Clinic (Group)", price: "NT$ 1,000 / person", type: "per_session", description: "3-hour clinic, max 6 people." },
      { name: "Custom Route Design (Per Route)", price: "NT$ 3,000 - NT$5,000 / route", type: "single", description: "Price varies by complexity." }
    ],
    availabilityNotes: "Weekends by appointment. Check calendar for group clinic dates.",
    isAvailableForBooking: true,
    memberPerks: ["Free 15-min intro call for Crux+ members"],
    yearsExperience: 12,
  }
];

const currentUser = mockUsers[0]; // Assume Alex Honnold is the current user for mock messages

export const mockMessagesByConversationId: Record<string, Message[]> = {
  'conv1': [
    { id: 'msg1', conversationId: 'conv1', senderId: 'user2', text: 'Hey Alex, saw your latest video. Incredible!', timestamp: new Date(Date.now() - 86400000 * 2 - 3600000 * 5).toISOString(), read: true },
    { id: 'msg2', conversationId: 'conv1', senderId: 'user1', text: 'Thanks Lynn! That crux was tricky.', timestamp: new Date(Date.now() - 86400000 * 2 - 3600000 * 4).toISOString(), read: true },
    { id: 'msg3', conversationId: 'conv1', senderId: 'user2', text: 'How did you manage that dyno?', timestamp: new Date(Date.now() - 86400000 * 2 - 3600000 * 3).toISOString(), read: true },
    { id: 'msg4', conversationId: 'conv1', senderId: 'user1', text: 'Lots of practice and a bit of luck! Want to chat about it sometime?', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), read: false },
  ],
  'conv2': [
    { id: 'msg5', conversationId: 'conv2', senderId: 'coach1', text: 'Hi Alex, regarding your training plan for next month...', timestamp: new Date(Date.now() - 86400000 * 1 - 3600000 * 10).toISOString(), read: true },
    { id: 'msg6', conversationId: 'conv2', senderId: 'user1', text: 'Great, looking forward to it Coach Dave!', timestamp: new Date(Date.now() - 86400000 * 1 - 3600000 * 8).toISOString(), read: true },
    { id: 'msg7', conversationId: 'conv2', senderId: 'coach1', text: 'Let\'s focus on finger strength and core. I\'ve sent over some exercises.', timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), read: false },
  ],
  'conv3': [
      {id: 'msg8', conversationId: 'conv3', senderId: 'user3', text: 'Awesome community here!', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), read: true}
  ]
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: mockMessagesByConversationId['conv1'][mockMessagesByConversationId['conv1'].length - 1],
    unreadCount: currentUser.id === mockUsers[0].id ? 1 : 0, // Unread for Alex
    title: mockUsers[1].name, // Or generate based on participants
  },
  {
    id: 'conv2',
    participants: [mockUsers[0], mockCoaches[0] as unknown as User], // Cast coach to User for UserSummary
    lastMessage: mockMessagesByConversationId['conv2'][mockMessagesByConversationId['conv2'].length - 1],
    unreadCount: currentUser.id === mockUsers[0].id ? 1 : 0, // Unread for Alex
    title: mockCoaches[0].name,
  },
  {
    id: 'conv3',
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: mockMessagesByConversationId['conv3'][mockMessagesByConversationId['conv3'].length - 1],
    unreadCount: 0,
    title: mockUsers[2].name
  }
];


export const getVideoById = (id: string): Video | undefined => mockVideos.find(v => v.id === id);
export const getUserById = (id: string): User | undefined => mockUsers.find(u => u.id === id);
export const getVideosByUploader = (userId: string): Video[] => mockVideos.filter(v => v.uploader.id === userId);
export const getCoaches = (): ProfessionalCoach[] => mockCoaches;
export const getConversationsForUser = (userId: string): Conversation[] => {
    return mockConversations
        .filter(conv => conv.participants.some(p => p.id === userId))
        .map(conv => {
            // Determine the title if not explicitly set (e.g., other participant's name)
            if (!conv.title) {
                const otherParticipant = conv.participants.find(p => p.id !== userId);
                conv.title = otherParticipant ? otherParticipant.name : "Conversation";
            }
            // Update unread count based on messages where sender is not the current user and message is unread
            // Ensure mockMessagesByConversationId[conv.id] exists before filtering
            const messages = mockMessagesByConversationId[conv.id] || [];
            conv.unreadCount = messages.filter(m => m.senderId !== userId && !m.read).length;
            return conv;
        })
        .sort((a, b) => new Date(b.lastMessage?.timestamp || 0).getTime() - new Date(a.lastMessage?.timestamp || 0).getTime());
};
export const getMessagesForConversation = (conversationId: string): Message[] => mockMessagesByConversationId[conversationId] || [];


// For Sponsor Leaderboard:
export const getSponsorsLeaderboard = (): User[] => {
  // In a real app, this would query and aggregate sponsorship data.
  // For mock, we'll use the totalSponsoredAmount on users.
  return [...mockUsers]
    .filter(user => (user.totalSponsoredAmount || 0) > 0)
    .sort((a, b) => (b.totalSponsoredAmount || 0) - (a.totalSponsoredAmount || 0));
};
