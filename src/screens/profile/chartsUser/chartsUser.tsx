import React, { useState } from "react";
import styled from "styled-components";
import TabChart from "../../../components/tabButton";
import Bar from "../progressBar";
import Comparison from "../chartsUser/comparison";
import Reports from "../chartsUser/sessionReports";
import Batting from "../chartsUser/batting";
import { useQuery } from "@apollo/client";
import {
  BATTING_SUMMARY,
  PROFILE_EVENTS,
} from "../../../api/graphql/query";
import { useAppSelector } from "../../../store";
import { profile } from "../../../states/profile";
import { useParams } from "react-router-dom";

type ChartsUserProps = {};
const ChartsUser: React.FC<ChartsUserProps> = ({}) => {
  const [activeTab, setActiveTab] = useState("Batting");
  const [pagesBatting, setPagesBatting] = useState("Summary");
  const user = useAppSelector(profile);
  const { loading: loadEvents, data: events } = useQuery(PROFILE_EVENTS, {
    variables: { input: { profile_id: user.id, count: 10, offset: 0 } },
  });
  const { loading, data } = useQuery(BATTING_SUMMARY, {
    variables: { id: user.id },
  });
  const params = useParams();
  const onClickBatting = (page: string) => {
    setPagesBatting(page);
    setActiveTab("Batting");
  };
  return (
    <>
      {loadEvents || loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ContainerCharts>
            <h3>Top Batting Values</h3>
            <ChartBars>
              <Bar label="Exit Velocity" max={100} current={38} />
              <Bar label="Carry Distance" max={100} current={13} />
              <Bar label="Launch Angle" max={100} current={27} />
            </ChartBars>
          </ContainerCharts>
          {Object.keys(params).length ? null : (
            <ContainerCharts>
              <h3>Recent Session Reports</h3>
              {events.profile_events.events.length ? (
                ""
              ) : (
                <span>No data currently linked to this profile</span>
              )}
            </ContainerCharts>
          )}
          <ContainerCharts>
            <ChartButtons>
              <ListContainer>
                <TabChart
                  style={
                    activeTab === "Batting"
                      ? { color: "#fff", backgroundColor: "#667784" }
                      : {}
                  }
                  onClick={() => setActiveTab("Batting")}
                  text={"Batting"}
                />
                <ModalList className="list">
                  <span onClick={() => onClickBatting("Summary")}>Summary</span>
                  <span onClick={() => onClickBatting("Charts")}>Charts</span>
                  <span onClick={() => onClickBatting("Log")}>Log</span>
                </ModalList>
              </ListContainer>
              {Object.keys(params).length ? null : (
                <TabChart
                  style={
                    activeTab === "Reports"
                      ? { color: "#fff", backgroundColor: "#667784" }
                      : {}
                  }
                  onClick={() => setActiveTab("Reports")}
                  text={"Session Reports"}
                />
              )}
              <TabChart
                style={
                  activeTab === "Comparison"
                    ? { color: "#fff", backgroundColor: "#667784" }
                    : {}
                }
                onClick={() => setActiveTab("Comparison")}
                text={"Comparison"}
              />
            </ChartButtons>
            {activeTab === "Comparison" ? (
              <Comparison user={user} />
            ) : activeTab === "Batting" ? (
              <Batting
                user={user}
                summary={data.batting_summary}
                pages={pagesBatting}
              />
            ) : activeTab === "Reports" ? (
              <Reports events={events.profile_events.events} />
            ) : activeTab === "Pitching" ? null : null}
          </ContainerCharts>
        </>
      )}
    </>
  );
};
const ContainerCharts = styled.div`
  padding: 16px;
  margin: 16px;
  background-color: #fff;
  color: #667784;
  border-radius: 16px;
  & h3 {
    font-size: 18px;
    font-weight: 900;
    color: #414f5a;
  }
`;
const ChartBars = styled.div`
  display: flex;
  align-items: center;
`;
const ChartButtons = styled.div`
  display: flex;
  align-items: center;
`;
const ListContainer = styled.div`
  position: relative;
  &:hover .list {
    display: block;
  }
`;
const ModalList = styled.div`
  position: absolute;
  top: 45px;
  left: 10px;
  background-color: #fff;
  padding: 8px 0;
  display: none;
  width: 178px;
  border-radius: 5px;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  & span {
    display: block;
    width: 100%;
    padding: 8px 16px;
    color: #788b99;
    cursor: pointer;
  }
  & span::hover {
    background-color: rgba(72, 187, 255, 0.1);
  }
`;
export default ChartsUser;
