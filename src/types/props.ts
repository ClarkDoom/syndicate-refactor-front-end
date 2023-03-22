// types
import { Show, Profile } from './models'

/* ---------======= custom props ======--------- */

export interface TvShowResultProps {
  profileId: number
}

export interface ProfileListsProps {
  profileId: number, 
}

/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}
