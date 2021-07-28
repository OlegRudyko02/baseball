import React, { useState } from "react";
import styled from "styled-components";
import TabChart from "../../components/tabButton";
import {
  LEADERBOARD_BATTING,
  LEADERBOARD_PITCHING,
} from "../../api/graphql/query";
import { useQuery, useMutation } from "@apollo/client";
import SelectFilter from "../../components/selectFilter";
import BlueHeart from "../../components/icon/blueHeart";
import GrayHeart from "../../components/icon/grayHeart";
import * as tata from "tata-js";
import { UPDATE_FAVORITE_PROFILE } from "../../api/graphql/mutation";
import { OptionsLeaderboard } from "../../interfaces/interfaces";
import { Position, Favorite } from "../../enums/enums";
import { Link } from "react-router-dom";
const LeaderBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Batting");
  const [options, setOptions] = useState<OptionsLeaderboard>({
    type: "Exit Velocity",
    date: "All",
    school: "",
    team: "",
    position: "All",
    age: "",
    favorite: "All",
  });

  enum TypeBatting {
    "Exit Velocity" = "exit_velocity",
    "Carry Distance" = "carry_distance",
  }
  enum TypePitching {
    "Pitch Velocity" = "pitch_velocity",
    "Spin Rate" = "spin_rate",
  }
  enum Type {
    "Exit Velocity" = "exit_velocity",
    "Carry Distance" = "carry_distance",
    "Pitch Velocity" = "pitch_velocity",
    "Spin Rate" = "spin_rate",
  }
  enum Date {
    "All" = "",
    "Last Week" = "last_week",
    "Last Mounth" = "last_mounth",
  }

  const query =
    activeTab === "Batting" ? LEADERBOARD_BATTING : LEADERBOARD_PITCHING;
  const date = options.date === "All" ? {} : { date: Date[options.date] };
  const school = options.school === "" ? {} : { school: options.school };
  const team = options.team === "" ? {} : { team: options.team };
  const position =
    options.position === "All" ? {} : { position: Position[options.position] };
  const age = options.age === "" ? {} : { age: +options.age };
  const favorite = options.favorite === "All" ? {} : { favorite: 1 };
  const { data, loading } = useQuery(query, {
    variables: {
      input: {
        type: Type[options.type],
        ...date,
        ...school,
        ...team,
        ...position,
        ...age,
        ...favorite,
      },
    },
  });
  const typeData =
    activeTab === "Batting"
      ? Object.keys(TypeBatting)
      : Object.keys(TypePitching);

  const changeType = (
    value: "Exit Velocity" | "Carry Distance" | "Pitch Velocity" | "Spin Rate"
  ) => {
    setOptions({ ...options, type: value });
  };
  const changeDate = (value: "All" | "Last Week" | "Last Mounth") => {
    setOptions({ ...options, date: value });
  };
  const changePosition = (
    value:
      | "All"
      | "Catcher"
      | "First Base"
      | "Second Base"
      | "Shortstop"
      | "Third Base"
      | "Outfield"
      | "Pitcher"
  ) => {
    setOptions({ ...options, position: value });
  };
  const changeFavorite = (value: "All" | "Favorite") => {
    setOptions({ ...options, favorite: value });
  };
  const changeSchool = (evt: any) => {
    setOptions({ ...options, school: evt.target.value });
  };
  const changeTeam = (evt: any) => {
    setOptions({ ...options, team: evt.target.value });
  };
  const changeAge = (evt: any) => {
    setOptions({ ...options, age: evt.target.value });
  };

  const [updateFavorite] = useMutation(UPDATE_FAVORITE_PROFILE, {
    refetchQueries: [
      {
        query: LEADERBOARD_BATTING,
        variables: {
          input: {
            type: Type[options.type],
            ...date,
            ...school,
            ...team,
            ...position,
            ...age,
            ...favorite,
          },
        },
      },
    ],
    onCompleted(data) {
      !data.update_favorite_profile.favorite
        ? tata.success(
            "Success",
            "This profile removed from favorite list successfully."
          )
        : tata.success(
            "Success",
            "This profile added to favorite list successfully."
          );
    },
    onError(error) {
      tata.error("Error", error);
    },
  });
  const leaderList = (data: any) => {
    return data.map((item: any, index: number) => {
      let teams = item.teams.map((item: any) => item.name + ",");
      return (
        <TableRow key={Math.random().toString(16).slice(2, 8)}>
          <span> {index + 1} </span>
          <Link to={`/profile/${item.batter_datraks_id}`}>{item.batter_name || item.pitcher_name}</Link>
          <span>{item.age}</span>
          <span>{item.school.name}</span>
          <span>{teams}</span>
          <span>{item.exit_velocity || item.pitch_type}</span>
          <span>{item.launch_angle || item.velocity}</span>
          <span>{item.distance || item.spin_rate}</span>
          <span>
            <Heart
              onClick={() =>
                updateFavorite({
                  variables: {
                    form: {
                      profile_id: item.batter_datraks_id,
                      favorite: item.favorite ? false : true,
                    },
                  },
                })
              }
            >
              {item.favorite ? <BlueHeart /> : <GrayHeart />}
            </Heart>
          </span>
        </TableRow>
      );
    });
  };
  return (
    <Container>
      <Header>
        <p>Leaderboard</p>
        <Option>
          <SelectFilter
            choose={changeDate}
            data={Object.keys(Date)}
            text="Date "
          />
          <Input
            placeholder="School"
            type="text"
            value={options.school}
            onChange={changeSchool}
          />
          <Input
            placeholder="Team"
            type="text"
            value={options.team}
            onChange={changeTeam}
          />
          <SelectFilter
            choose={changePosition}
            data={Object.keys(Position)}
            text="Position "
          />
          <Input
            placeholder="Age"
            type="text"
            value={options.age}
            onChange={changeAge}
          />
          <SelectFilter
            choose={changeFavorite}
            data={Object.keys(Favorite)}
            initialVal="All"
          />
        </Option>
      </Header>
      <Tabs>
        <div>
          <TabChart
            style={
              activeTab === "Batting"
                ? { color: "#fff", backgroundColor: "#667784" }
                : {}
            }
            onClick={() => {
              setActiveTab("Batting");
              setOptions({ ...options, type: "Exit Velocity" });
            }}
            text={"Batting"}
          />
          <TabChart
            style={
              activeTab === "Pitching"
                ? { color: "#fff", backgroundColor: "#667784" }
                : {}
            }
            onClick={() => {
              setActiveTab("Pitching");
              setOptions({ ...options, type: "Pitch Velocity" });
            }}
            text={"Pitching"}
          />
        </div>
        <SelectFilter
          choose={changeType}
          data={typeData}
          initialVal={options.type}
        />
      </Tabs>
      {loading ? null : activeTab === "Batting" ? (
        <>
          <TableHeader>
            <span>Rank</span>
            <span>Batter Name</span>
            <span>Age</span>
            <span>School</span>
            <span>Teams</span>
            <span>Exit Velocity</span>
            <span>Launch Angle</span>
            <span>Distance</span>
            <span>Favorite</span>
          </TableHeader>
          {leaderList(data.leaderboard_batting.leaderboard_batting)}
        </>
      ) : (
        <>
          <TableHeader>
            <span>Rank</span>
            <span>Pitcher Name</span>
            <span>Age</span>
            <span>School</span>
            <span>Teams</span>
            <span>Pitch Type</span>
            <span>Velocity</span>
            <span>Spin Rate</span>
            <span>Favorite</span>
          </TableHeader>
          {leaderList(data.leaderboard_pitching.leaderboard_pitching)}
        </>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  & p {
    font-size: 24px;
    line-height: 1.25;
    font-weight: 400;
    color: #667784;
  }
`;
const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
`;
const TableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  & span {
    text-align: center;
    width: 100%;
    font-size: 14px;
    line-height: 1;
    font-weight: 300;
    color: #667784;
  }
`;
const TableRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f7f8f9;
  padding: 10px 0px;
  margin-top: 8px;
  & span {
    text-align: center;
    line-height: 1;
    font-weight: 400;
    font-size: 14px;
    width: 100%;
    color: #414f5a;
  }
  & a {
    text-decoration:none;
    text-align: center;
    line-height: 1;
    font-weight: 400;
    font-size: 14px;
    width: 100%;
    color: #414f5a;
    cursor: pointer;
  }
  & a:hover {
    color: #48bbff
  }
`;
const Option = styled.div`
  display: flex;
  align-items: center;
`;
const Heart = styled.div`
  cursor: pointer;
  & svg {
    width: 14px;
    height: 14px;
  }
`;
const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #48bbff;
  margin: 0px 8px;
`;
export default LeaderBoard;
