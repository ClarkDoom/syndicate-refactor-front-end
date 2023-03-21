/* ---------===== custom props ====--------- */



/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  userName: string;
  aboutMe?: string;
  photo?: string;
  id: number;
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
  id: number;
  tmbdShowId: string;
  addedBy: { id: number};
  name: string;
  seasons: [];
  showDescription: string;
  imageUrl: string;
  listType: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  reviewContent: string;
  rating: number;
  author: { id: number };
  tmbdShowId: string;
  reviewFor: { id: number};
  reviewForType: string;
  reviewTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  commentText: string;
  commentOn: { id: number};
  reaction: string;
  createdBy: { id: number }
  createdAt: string;
  updatedAt: string;
}