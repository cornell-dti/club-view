//file for types
export type StudentType = {
  id: string;
  firstName: string;
  lastName: string;
  year?: string;
  email: string;
  managed: ClubType[];
  favorites: ClubType[];
  events: EventType[];
};

export enum URLs {
  'instagram' = 'instagram.com',
  'facebook' = 'facebook.com',
  'slack' = 'slack.com',
  'discord' = 'discord.gg',
  'twitter' = 'twitter.com',
  'linkedin' = 'linkedin.com',
  'youtube' = 'youtube.com',
  'github' = 'github.com',
  'reddit' = 'reddit.com',
  'other' = '',
}

export type ClubType = {
  id: string;
  name: string;
  category: CategoryType;
  email: string;
  description: string;
  url: string;
  status: string;
  images?: string[];
  openDate?: string;
  closeDate?: string;
  socials: SocialType[];
  registeredBy: StudentType;
  events: EventType[];
};

export type SocialType = {
  platform: string;
  url: string;
};

export type EventType = {
  id: string;
  title: string;
  hostedBy: ClubType;
  description: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime: string;
  location: string;
};

export enum CategoryType {
  ACADEMIC = 'academic',
  PROJECTTEAM = 'project team',
  CAREERDEVELOPMENT = 'career development',
  COMMUNITYSERVICE = 'community service',
  CULTURAL = 'cultural',
  SOCIAL = 'social',
  FOOD_DRINK = 'food and drink',
  HEALTH_WELLBEING = 'health and wellbeing',
  GAMING = 'gaming',
  POLITICAL_ADVOCACY = 'political and advocacy',
  PROFESSIONAL_FRATERNITY_COUNCIL = 'professional fraternity council',
  PUBLICATION_MEDIA = 'publication and media',
  SPIRITUAL_RELIGIOUS = 'spiritual and religious',
  SPORTS_CLUB_COUNCIL = 'sports club council',
  STUDENT_GOVERNMENT = 'student government',
  SUSTAINABILITY = 'sustainability',
  ENVIRONMENTAL_WILDLIFE = 'environmental and wildlife',
  THE_ARTS = 'the arts',
}
