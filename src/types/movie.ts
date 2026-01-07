export interface CastMember {
  _id: string;
  name: string;
  image: string;
  role?: string;
}

export interface Review {
  _id: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Episode {
  _id: string;
  name: string;
  description?: string;
  duration?: string;
  image: string;
  videoUrl?: string;
  videoType?: number;
  episodeNumber: number;
  seasonNumber: number;
  view?: number;
  hlsFileName?: string;
  drmEnabled?: boolean;
  link?: string;
}

export interface Season {
  _id: string;
  name: string;
  seasonNumber: number;
  episodeCount?: number;
  image?: string;
  releaseDate?: string;
}

export interface MovieDetail {
  _id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  year: string;
  view: number;
  media_type: "movie" | "series" | "tv";
  maturity: string;
  contentRating: number;
  genre: string[]; // These are IDs in the response
  language: string[]; // These are IDs in the response
  cast?: CastMember[];
  reviews?: Review[];
  season?: Season[];
  episode?: Episode[];
  director?: {
    name: string;
    image?: string;
  };
  music?: {
    name: string;
    image?: string;
  };
  hlsFileName?: string;
  drmEnabled?: boolean;
  firstEpisode?: Episode;
  videoType?: number;
}

export interface MovieDetailResponse {
  status: boolean;
  message: string;
  movie: MovieDetail[];
}
export interface Subtitle {
  _id: string;
  language: {
    _id: string;
    name: string;
    uniqueId: string;
  };
  file: string;
  isDefault?: boolean;
}

export interface SubtitleResponse {
  status: boolean;
  message: string;
  subtitles: Subtitle[];
}
