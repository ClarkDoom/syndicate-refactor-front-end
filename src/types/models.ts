/* ---------===== custom props ====--------- */



/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  userName: string;
  aboutMe?: string;
  photo?: string;
  id: number;
  shows: []
}

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  profile: { id: number };
  createdAt: string;
  updatedAt: string;
}

export interface Show {
  // id: number;
  // tmbdShowId: string;
  // addedBy: { id: number};
  // name: string;
  // seasons: [];
  // showDescription: string;
  // imageUrl: string;
  // listType: string;
  // createdAt: string;
  // updatedAt: string;
  id: '',
  tmbdShowId: 0,
  addedBy: 0,
  showName: '',
  showDescription: '',
  imageUrl: '',
  showType: '',
  createdAt: '',
  updatedAt: '',
  profile: Profile,
  reviews: []
}

export interface SearchResult {
  poster_path: string;
  name: string;
  first_air_date: string;
}

export interface ShowResult {
  id: number;
  name: string;
  seasons: [];
  first_air_date: string;
  poster_path: string;
  overview: string;
}

export interface SeasonResult {
  name: string;
  season_number: number;
  overview: string;
  poster_path: string;
  air_date: string;
  episodes: []
}

export interface EpisodeResult {
  name: string;
  still_path: string;
  episode_number: number;
  air_date: string;
  show_id: number;
  season_number: number;
  overview: string;
  runtime: number;
  vote_average: number;
  id: number;
  crew: [];
  guest_stars: [];
  cast: []
}

export interface CastMemberResult {
  name: string;
  character: string;
  profile_path: string;
  // not sure why this cast needs to be here
  cast: [];
}


export interface Review {
  id: number;
  reviewContent: string;
  rating: number;
  author: { id: number };
  tmbdShowId: string;
  reviewFor: { id: number };
  reviewForType: string;
  reviewTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  commentText: string;
  commentOn: { id: number };
  reaction: string;
  createdBy: { id: number }
  createdAt: string;
  updatedAt: string;
  commentBy: Profile
}