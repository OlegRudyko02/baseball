import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/client";
import PersonalInfo from "./personalInfo/personalInfo";
import ChartsUser from "./chartsUser/chartsUser";
import { CURRENT_PROFILE, PROFILE } from "../../api/graphql/query";
import { UPDATE_PROFILE } from "../../api/graphql/mutation";
import { actions } from "../../states/profile";
import { useAppDispatch } from "../../store";
import { useParams } from "react-router-dom";
import * as tata from 'tata-js' 

type ProfileProps = {};
const Profile: React.FC<ProfileProps> = ({}) => {
  const dispatch = useAppDispatch();
  let params = useParams();
  let id:any = { id: 0 }
  if (Object.keys(params).length) id = params ///TODO:
  id.id.toString()
  const query = Object.keys(params).length ? PROFILE : CURRENT_PROFILE;
  const options = Object.keys(params).length
    ? {
        variables: { id : id.id },
        onCompleted(data: any) {
          dispatch(actions.update(data.profile));
        },
      }
    : {
        onCompleted(data: any) {
          dispatch(actions.update(data.current_profile));
        },
      };
  const { loading } = useQuery(query, options);
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    onCompleted(data) {
      tata.success('Success', 'Profile has been updated successfully.')
      dispatch(actions.update(data.update_profile.profile));
    },
    onError(error) {
      tata.error('Error', error)
    }
  });

  return (
    <Container>
      <UserInfo>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PersonalInfo params={params} updateProfile={updateProfile} />
        )}
      </UserInfo>
      <UserCharts>{loading ? <div>Loading...</div> : <ChartsUser />}</UserCharts>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
const UserInfo = styled.div`
  height: 100%;
  width: 380px;
  background-color: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow: auto;
  padding: 16px;
`;
const UserCharts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
`;

export default Profile;
