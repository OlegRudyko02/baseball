export interface profileStore {
  profile: {
    age: number
    avatar: string
    bats_hand: string
    biography: string
    facilities: any[]
    feet: number
    first_name: string
    id: string
    inches: number
    last_name: string
    position: string
    position2: string
    school: {id: string, name: string}
    school_year: string
    teams: [{id: string, name: string}]
    throws_hand: string
    weight: number
    recent_events?: any[]
    act_score?:any
    batter_summary?: any[]
    batting_top_values?: any[]
    broad_jump?: any
    events_opened?: boolean
    favorite?: boolean
    gpa_score?: any
    grip_left?: any
    grip_right?: any
    paid?: boolean
    pitcher_summary?: any[]
    pitching_top_values?: any[]
    sat_score?: any
    winsgspan?: any
    wrist_to_elbow?: any
  }
}



