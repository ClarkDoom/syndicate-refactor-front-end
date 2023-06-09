/* ---------==== custom forms ====--------- */

export interface CreateShowForm {
  tmbdShowId: number;
  showName: string;
  showDescription: string;
  imageUrl: string;
  showType: string;

}

/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  userName: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
