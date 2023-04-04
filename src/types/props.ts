// types
import { SetStateAction } from 'react';
import { Show, Profile, Review, Comment } from './models'
import { Dispatch } from 'react';

/* ---------======= custom props ======--------- */

export interface CreateReviewProps {
  profileId: number
}
export interface TvShowResultProps {
  profileId: number
}

export interface ProfileListsProps {
  profileId: number, 
}
export interface CommunityCardProps {
  show: Show, 
}
export interface CommunityReviewCardProps {
  review: Review, 
}
export interface CommunityCommentCardProps {
  comment: Comment, 
}
export interface ProfilePageProps {
  profile: Profile, 
  handleLogout: () => void;
}
export interface ListCardProps {
  show: Show, 
  selectedList: string,
  changeListType: (evt: any) => Promise<void>,
  deleteShow: (evt: any) => Promise<void>
}
export interface EditProfileModuleProps {
  profile: Profile, 
  setChangeOccured: Dispatch<SetStateAction<boolean>>,
  changeOccured: Boolean
}

/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}
