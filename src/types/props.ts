// types
import { Show, Profile, Review } from './models'

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

/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}
