import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useQuery, useLazyQuery } from "@apollo/client";
import { PROFILE, PROFILE_NAMES } from "../../../../api/graphql/query";
import { useClickOutside } from "../../../../App";
import  SelectFilter  from '../../../../components/selectFilter'

type ChartsUserProps = {
  user: any;
};
const Comparison: React.FC<ChartsUserProps> = ({ user }) => {
  const [type, setType] = useState("distance");
  const [searchName, setSearchName] = useState("");
  const [listVisibility, setListVisibility] = useState(false);
  const listRef = useRef(null);
  useClickOutside(listRef, () => setListVisibility(false));
  const { loading, data: current_profile } = useQuery(PROFILE, {
    variables: { id: user.id },
  });
  const [getUser, { data: listUser }] = useLazyQuery(PROFILE_NAMES);
  const [getProfile, { data: compUser }] = useLazyQuery(PROFILE);
  const search = (evt: any) => {
    setSearchName(evt.target.value);
    getUser({
      variables: {
        input: { player_name: evt.target.value, position: user.position },
      },
    });
  };
  const types = ['Distance', 'Launch Angle', 'Exit Velocity']
  const typesValue =  ['distance', 'launch_angle', 'exit_velocity']
  const changeType = (value: string) => {
    let index = types.findIndex((item) => item === value)
    setType(typesValue[index]);
  };
  const chooseUser = (id: string, name: string) => {
    setSearchName(name);
    getProfile({ variables: { id: id } });
    setListVisibility(false);
  };
  const userInfo = (user: any, compUser?: boolean) => {
    return (
      <UserContainer>
        <Info>
          <UserImg>
            <img src={user.avatar || "/assets/user.svg"} alt="#" />
          </UserImg>
          {compUser ? (
            <Input ref={listRef}>
              <input
                onClick={() => setListVisibility(true)}
                type="text"
                placeholder='Enter Player Name'
                value={searchName}
                onChange={search}
              />
              {listUser &&
              listUser.profile_names.profile_names.length &&
              listVisibility ? (
                <ListUser>
                  {listUser.profile_names.profile_names.map((item: any) => {
                    return (
                      <div
                        onClick={() =>
                          chooseUser(
                            item.id,
                            item.first_name + " " + item.last_name
                          )
                        }
                        key={item.id}
                      >
                        {item.first_name + " " + item.last_name}
                      </div>
                    );
                  })}
                </ListUser>
              ) : null}
            </Input>
          ) : (
            <span>{user.first_name + " " + user.last_name || "-"}</span>
          )}
        </Info>
        <Info>
          <p>Age:</p> <span>{user.age || "-"}</span>
        </Info>
        <Info>
          <p>Height:</p>{" "}
          <span>
            {user.feet ? user.feet + " ft " + user.inches + " in" : "-"}
          </span>
        </Info>
        <Info>
          <p>Weight:</p> <span>{user.weight ? user.weight + " lbs" : "-"}</span>
        </Info>
      </UserContainer>
    );
  };
  const userResult = (userRes: any, compUserRes: any) => {
    const label = ["Fastball", "Curveball", "Changeup", "Slider"];
    return label.map((item, index) => {
      return (
        <Result key={item}>
          <p>{item}</p>
          <p> {userRes[index] ? userRes[index][type] : "-"} </p>
          <p> {compUserRes[index] ? compUserRes[index][type] : "-"} </p>
        </Result>
      );
    });
  };

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <Container>
      <Users>
        {userInfo(user)}
        {userInfo((compUser && compUser.profile) || {}, true)}
      </Users>
      <div style={{marginBottom: '20px'}}>
       <SelectFilter position={{ left: '75px' }} initialVal={'Distance'} data={types} choose={changeType} text={'Top Batting Values - '} />
      </div>
      <div>
        {userResult(
          current_profile.profile.batting_top_values,
          (compUser && compUser.profile.batting_top_values) || []
        )}
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Users = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Info = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  color: #333;
  & span {
    margin-left: 8px;
  }
`;
const UserContainer = styled.div`
  width: 100%;
`;
const Result = styled.div`
  width: 100%;
  margin-bottom: 4px;
  min-height: 44px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: #f7f8f9;
  & p {
    width: 100%;
  }
`;
const UserImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  margin-bottom: 10px;
`;
const Input = styled.div`
  position: relative;
  margin-left: 10px;
`;
const ListUser = styled.div`
  width: 100%;
  position: absolute;
  border: 1px solid gray;
  z-index: 2;
  background-color: #fff;
  padding-left: 8px;
  & div {
    cursor: pointer;
    margin: 8px 0;
  }
`;
export default Comparison;
