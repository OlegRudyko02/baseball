import React from "react";
import styled from "styled-components";
import Age from "../../../../components/icon/age";
import Bats from "../../../../components/icon/bats";
import Throws from "../../../../components/icon/throws";
import Height from "../../../../components/icon/height";
import Weight from "../../../../components/icon/weight";
import GrayHeart from "../../../../components/icon/grayHeart";
import BlueHeart from "../../../../components/icon/blueHeart";
import { UPDATE_FAVORITE_PROFILE } from '../../../../api/graphql/mutation'
import { useMutation } from "@apollo/client";
import { actions } from "../../../../states/profile";
import { useAppDispatch } from "../../../../store";
import * as tata from 'tata-js'

type UserInfoProps = {
  openForm: () => void;
  data: any;
  params: any;
};
const UserInfo: React.FC<UserInfoProps> = ({ openForm, data, params }) => {
  const infoRow = (text: string, Img: any, value: string) => {
    return (
      <InfoRow>
        <LabelInfoRow>
          <div>
            <Img />
          </div>
          <span>{text}</span>
        </LabelInfoRow>
        <p>{value}</p>
      </InfoRow>
    );
  };
  const dispatch = useAppDispatch();
  const [updateFavorite] = useMutation(UPDATE_FAVORITE_PROFILE, { onCompleted(data) {
    !data.update_favorite_profile.favorite ?
    tata.success('Success', 'This profile removed from favorite list successfully.'):
    tata.success('Success', 'This profile added to favorite list successfully.');
    dispatch(actions.updateFavorite(data.update_favorite_profile))
  }, onError(error) {
    tata.error('Error', error)
  }})
  const infoCol = (text: string, value: string) => {
    return (
      <InfoCol>
        <p>{text}</p>
        <span>{value}</span>
      </InfoCol>
    );
  };
  const extractTeam = (arr: any) => {
    let str: string = "";
    arr.forEach((el: any) => {
      str += el.name + " ";
    });
    return str;
  };
  return (
    <>
      <Header>
        <UserImg>
          <img src={data.avatar || "/assets/user.svg"} alt="#" />
        </UserImg>
        <h4>{data.first_name + " " + data.last_name}</h4>
        <p>{data.position}</p>
        <p>{data.position2}</p>
        {Object.keys(params).length ? (
          <HeartContainer onClick={() => updateFavorite({variables: {form: {profile_id: data.id, favorite: !data.favorite}}})}>
            {data.favorite ? <BlueHeart /> : <GrayHeart />}
          </HeartContainer>
        ) : (
          <Edit onClick={openForm}></Edit>
        )}
      </Header>
      {infoRow("Age", Age, data.age)}
      {infoRow("Height", Height, data.feet + " ft " + data.inches + " in")}
      {infoRow("Weight", Weight, data.weight + " lbs")}
      {infoRow("Throws", Throws, data.throws_hand.toUpperCase())}
      {infoRow("Bats", Bats, data.bats_hand.toUpperCase())}
      {data.school.name ? infoCol("School", data.school.name) : null}
      {data.school_year !== "none"
        ? infoCol("School Year", data.school_year)
        : null}
      {data.teams.length ? infoCol("Team", extractTeam(data.teams)) : null}
      {data.facilities[0]
        ? infoCol("Facility", data.facilities[0].u_name)
        : null}
      {data.biography !== "" ? (
        <About>
          <div>About</div>
          <p>{data.biography}</p>
        </About>
      ) : null}
    </>
  );
};
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  & h4 {
    font-size: 20px;
    line-height: 24px;
    color: #414f5a;
    word-wrap: break-word;
  }
  & p {
    line-height: 19px;
    color: #788b99;
    margin-top: 4px;
  }
`;
const UserImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  margin-bottom: 10px;
`;
const Edit = styled.div`
  position: absolute;
  top: 12px;
  right: 13px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: skyblue;
  cursor: pointer;
`;
const HeartContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 13px;
  cursor: pointer;
`;
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0px;
`;
const InfoCol = styled.div`
  color: #667784;
  margin-bottom: 10px;
  & p {
    font-size: 14px;
    line-height: 17px;
    font-weight: 300;
    margin-bottom: 3px;
  }
`;
const LabelInfoRow = styled.div`
  display: flex;
  align-items: center;
  & div {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }
`;
const About = styled.div`
  & div {
    font-size: 18px;
    font-weight: 900;
    color: #414f5a;
    text-align: left;
    display: inline-block;
    position: relative;
    z-index: 1;
    background-color: #ffffff;
    width: 100%;
  }
  & div::before {
    content: "";
    position: absolute;
    top: 11px;
    left: 60px;
    right: 0;
    height: 1px;
    background-color: #e7ebef;
    z-index: 0;
  }
  & p {
    color: #788b99;
    line-height: 1.75;
    word-wrap: break-word;
  }
`;
export default UserInfo;
