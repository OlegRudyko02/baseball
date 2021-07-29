import React, { useState } from "react";
import styled from "styled-components";
import { OptionsNetwork } from "../../interfaces/interfaces";
import { Position, Favorite } from "../../enums/enums";
import { useQuery, useMutation } from "@apollo/client";
import { NETWORK_PROFILES } from "../../api/graphql/query";
import { UPDATE_FAVORITE_PROFILE } from "../../api/graphql/mutation";
import * as tata from "tata-js";
import SelectFilter from "../../components/selectFilter";
import BlueHeart from "../../components/icon/blueHeart";
import GrayHeart from "../../components/icon/grayHeart";
import Paginate from "../../components/paginate";
import { Link } from "react-router-dom";

const Network: React.FC = () => {
  const [options, setOptions] = useState<OptionsNetwork>({
    name: "",
    school: "",
    team: "",
    position: "All",
    age: "",
    favorite: "All",
    show: "10",
    offset: 0
  });
  const name = options.name === "" ? {} : { player_name: options.name };
  const school = options.school === "" ? {} : { school: options.school };
  const team = options.team === "" ? {} : { team: options.team };
  const position =
    options.position === "All" ? {} : { position: Position[options.position] };
  const age = options.age === "" ? {} : { age: +options.age };
  const favorite = options.favorite === "All" ? {} : { favorite: 1 };
  const { data, loading } = useQuery(NETWORK_PROFILES, {
    variables: {
      input: {
        ...name,
        ...school,
        ...team,
        ...position,
        ...age,
        ...favorite,
        profiles_count: +options.show,
        offset: options.offset,
      },
    },
  });
  const showData = ["10", "15", "25"];
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
    setOptions({ ...options, position: value, offset: 0  });
  };
  const changeFavorite = (value: "All" | "Favorite") => {
    setOptions({ ...options, favorite: value, offset: 0  });
  };
  const changeShow = (value: "10" | "15" | "25") => {
    let offset = options.offset/ +options.show
    setOptions({ ...options, show: value, offset: offset * +value});
  };
  const changeSchool = (evt: any) => {
    setOptions({ ...options, school: evt.target.value, offset: 0});
  };
  const changeName = (evt: any) => {
    setOptions({ ...options, name: evt.target.value, offset: 0});
  };
  const changeTeam = (evt: any) => {
    setOptions({ ...options, team: evt.target.value, offset: 0});
  };
  const changeAge = (evt: any) => {
    setOptions({ ...options, age: evt.target.value, offset: 0});
  };
  const [updateFavorite] = useMutation(UPDATE_FAVORITE_PROFILE, {
    refetchQueries: [
      {
        query: NETWORK_PROFILES,
        variables: {
          input: {
            ...name,
            ...school,
            ...team,
            ...position,
            ...age,
            ...favorite,
            profiles_count: +options.show,
            offset: options.offset,
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
  const handleClick = (data:any) => {
    setOptions({...options, offset: data.selected * +options.show})
  }
  const playerskList = (data: any) => {
    return data.map((item: any) => {
      let teams = item.teams.length
        ? item.teams.map((item: any) => item.name + ",")
        : "";
      return (
        <TableRow key={Math.random().toString(16).slice(2, 8)}>
          <Link to={`/profile/${item.id}`}>{item.first_name + ' ' + item.last_name}</Link>
          <span>{"-"}</span>
          <span>{item.school !== null ? item.school.name : "-"}</span>
          <span>{teams === "" ? "-" : teams}</span>
          <span>{item.age}</span>
          <span>
            <Heart
              onClick={() =>
                updateFavorite({
                  variables: {
                    form: {
                      profile_id: item.id,
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
  const initialPage = ((+options.show + options.offset)/+options.show) - 1;
  const pageCount = data && Math.ceil(data.profiles.total_count/ +options.show)
  return (
    <Container>
      <Header>
        <p>Network</p>
        <Option>
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
          <div style={{marginLeft: '8px'}}>
            <SelectFilter choose={changeShow} data={showData} text="Show: " />
          </div>
        </Option>
      </Header>

      <Search>
      {loading ? <div></div> : <div>Available Players ({data.profiles.total_count})</div>}  
        <input
          type="text"
          placeholder={"Player Name"}
          value={options.name}
          onChange={changeName}
        />
      </Search>
      {loading ? null : (
        <>
          <TableHeader>
            <span>Player Name</span>
            <span>Sessions</span>
            <span>School</span>
            <span>Teams</span>
            <span>Age</span>
            <span>Favorite</span>
          </TableHeader>
          <ListWrapper>
            {playerskList(data.profiles.profiles)}
          </ListWrapper>
          <Paginate handleClick={handleClick} initialPage={initialPage} pageCount={pageCount} />
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
const Search = styled.div`
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
  text-align: center;
  & span {
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
  text-align: center;
  & span {
    width: 100%;
    line-height: 1;
    font-weight: 400;
    font-size: 14px;
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
const ListWrapper = styled.div`
  overflow: scroll;
`;
export default Network;
