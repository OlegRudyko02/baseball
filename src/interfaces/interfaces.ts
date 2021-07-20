export interface ISignIn {
  email: string
  password: string
}

export interface ISignUp extends ISignIn {
  password_confirmation: string
  role: string
}