import { gql } from "@apollo/client";

export const CURRENT_PROFILE = gql`
  query current_profile {
    current_profile {
      id
      first_name
      last_name
      position
      position2
      avatar
      throws_hand
      bats_hand
      biography
      school_year
      feet
      inches
      weight
      age
      school {
        id
        name
      }
      teams {
        id
        name
      }
      facilities {
        id
        email
        u_name
      }
    }
  }
`;
export const PROFILE = gql`
  query Profile($id: String!) {
    profile(id: $id) {
      id
      first_name
      last_name
      position
      position2
      school_year
      avatar
      throws_hand
      bats_hand
      biography
      feet
      inches
      weight
      age
      recent_events {
        id
        event_type
        event_name
        date
        is_pitcher
        data_rows_count
        recent_avatars {
          id
          first_name
          last_name
          avatar
        }
      }
      winsgspan
      grip_right
      grip_left
      wrist_to_elbow
      broad_jump
      grip_left
      act_score
      gpa_score
      sat_score
      batting_top_values {
        pitch_type
        distance
        launch_angle
        exit_velocity
      }
      pitching_top_values {
        velocity
        spin_rate
        pitch_type
      }
      pitcher_summary {
        velocity
        spin_rate
        horizontal_break
      }
      batter_summary {
        exit_velocity
        distance
        launch_angle
      }
      school {
        id
        name
      }
      teams {
        id
        name
      }
      facilities {
        id
        email
        u_name
      }
      favorite
      events_opened
      paid
    }
  }
`;
export const SCHOOL = gql`
  query Schools($search: String!) {
    schools(search: $search) {
      schools {
        id
        name
      }
    }
  }
`;
export const TEAMS = gql`
  query Teams($search: String!) {
    teams(search: $search) {
      teams {
        id
        name
      }
    }
  }
`;
export const FACILITY = gql`
  query Facilities($search: String!) {
    facilities(search: $search) {
      facilities {
        id
        email
        u_name
      }
    }
  }
`;
export const PROFILE_EVENTS = gql`
  query ProfileEvents($input: FilterProfileEventsInput!) {
    profile_events(input: $input) {
      events {
        id
        date
        event_type
        event_name
      }
      total_count
    }
  }
`;
export const BATTING_SUMMARY = gql`
  query BattingSummary($id: ID!) {
    batting_summary(id: $id) {
      top_values {
        id
        distance
        pitch_type
        launch_angle
        exit_velocity
      }
      average_values {
        id
        distance
        pitch_type
        launch_angle
        exit_velocity
      }
    }
  }
`;
export const BATTING_LOG = gql`
  query BattingLog($input: FilterBattingLogInput!) {
    batting_log(input: $input) {
      batting_log {
        date
        pitcher_name
        pitcher_handedness
        pitch_type
        pitch_call
        exit_velocity
        launch_angle
        direction
        distance
        hit_spin_rate
        hang_time
        pitcher_datraks_id
      }
      total_count
    }
  }
`;
export const PROFILE_NAMES = gql`
  query ProfileNames($input: FilterProfileNamesInput!) {
    profile_names(input: $input) {
      profile_names {
        id
        position
        first_name
        last_name
        inches
        feet
        weight
        age
      }
    }
  }
`;
export const LEADERBOARD_PITCHING = gql`
  query LeaderboardPitching($input: FilterLeaderboardInput!) {
    leaderboard_pitching(input: $input) {
      leaderboard_pitching {
        pitcher_name
        pitch_type
        velocity
        spin_rate
        vertical_break
        horizontal_break
        pitcher_datraks_id
        age
        school {
          id
          name
        }
        teams {
          id
          name
        }
        favorite
      }
    }
  }
`;
export const LEADERBOARD_BATTING = gql`
  query LeaderboardBatting($input: FilterLeaderboardInput!) {
    leaderboard_batting(input: $input) {
      leaderboard_batting {
        batter_name
        exit_velocity
        launch_angle
        distance
        batter_datraks_id
        age
        school {
          id
          name
        }
        teams {
          id
          name
        }
        favorite
      }
    }
  }
`;
export const NETWORK_PROFILES = gql`
  query Profiles($input: FilterProfilesInput!) {
    profiles(input: $input) {
      profiles {
        id
        first_name
        last_name
        position
        position2
        school_year
        feet
        inches
        weight
        age
        events {
          id
        }
        school {
          id
          name
        }
        teams {
          id
          name
        }
        favorite
      }
      total_count
    }
  }
`;
