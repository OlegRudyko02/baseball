export interface ISignIn {
  email: string
  password: string
}
export interface IRecovery {
  email: string
}
export interface ISignUp extends ISignIn {
  password_confirmation: string
  role: string
}

export interface OptionsLeaderboard {
  type: "Exit Velocity" | "Carry Distance" | "Pitch Velocity" | "Spin Rate"
  date: 'All' | "Last Week" | "Last Mounth"
  school: string
  team: string
  position: 'All' | "Catcher" | "First Base" | "Second Base" | "Shortstop" | "Third Base" | "Outfield" | "Pitcher"
  age: string
  favorite: 'All' | 'Favorite'
}
export interface OptionsNetwork {
  name: string
  school: string
  team: string
  position: 'All' | "Catcher" | "First Base" | "Second Base" | "Shortstop" | "Third Base" | "Outfield" | "Pitcher"
  age: string
  favorite: 'All' | 'Favorite'
  show: '10' | '15' | '25'
  offset: number
}