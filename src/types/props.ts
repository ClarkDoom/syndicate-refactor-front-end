/* ---------======= custom props ======--------- */

export interface TvShowResultProps {
  profileId: number
}

/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}
