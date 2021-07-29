import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { BATTING_LOG } from "../../../../api/graphql/query";
import SelectFilter from "../../../../components/selectFilter";
import Paginate from "../../../../components/paginate";
import './style.css'
type BattingProps = {
  pages: string;
  summary: any;
  user: any;
};
const Batting: React.FC<BattingProps> = ({ pages, summary, user }) => {
  const [searchName, setSearchName] = useState("");
  const [type, setType] = useState("None");
  const [offsetLog, setOffsetLog] = useState(0);
  const typeData = [
    "None",
    "Four Seam Fastball",
    "Two Seam Fastball",
    "Curveball",
    "Changeup",
    "Slider",
  ];
  const types = type === "None" ? {} : { pitch_type: type };
  const name = searchName.length ? { pitcher_name: searchName } : {};
  const { loading, data: log } = useQuery(BATTING_LOG, {
    variables: {
      input: {
        profile_id: user.id,
        count: 10,
        offset: offsetLog,
        ...types,
        ...name,
      },
    },
  });
  const search = (evt: any) => {
    setSearchName(evt.target.value);
    setOffsetLog(0);
  };
  const changeType = (value: string) => {
    setType(value);
    setOffsetLog(0);
  };
  const summaryTable = (title: string, data: any) => {
    return (
      <>
        <h3>{title}</h3>
        <TableHeader>
          <span>Pitch Type</span>
          <span>Distance</span>
          <span>Launch Angle</span>
          <span>Exit Velocity</span>
        </TableHeader>
        {data.map((item: any) => {
          return item.pitch_type !== null ? (
            <TableRow key={Math.random().toString(16).slice(2, 8)}>
              <span> {item.pitch_type} </span>
              <span>{item.distance}</span>
              <span>{item.launch_angle}</span>
              <span>{item.exit_velocity}</span>
            </TableRow>
          ) : null;
        })}
      </>
    );
  };
  const logList = (data: any) => {
    return data.map((item: any) => {
      return (
        <TableRow key={Math.random().toString(16).slice(2, 8)}>
          <span> {item.date} </span>
          <span>{item.pitcher_name}</span>
          <span>{item.pitcher_handedness}</span>
          <span>{item.pitch_type}</span>
          <span>{item.pitch_call}</span>
        </TableRow>
      );
    });
  };
  const handleClick = (data: any) => {
    setOffsetLog(data.selected * 10);
  };
  const initialPage = (10 + offsetLog) / 10 - 1;
  const pageCount = log && Math.ceil(log.batting_log.total_count / 10);
  return (
    <Container>
      {pages === "Summary" ? (
        <Pages>
          {!summary.top_values.length && !summary.average_values.length ? (
            <Text>There's no info yet!</Text>
          ) : summary.top_values.length && summary.average_values.length ? (
            <>
              {summaryTable("Top Batting Values", summary.top_values)}
              {summaryTable("Average Batting Values", summary.average_values)}
            </>
          ) : summary.top_values.length ? (
            summaryTable("Top Batting Values", summary.top_values)
          ) : summary.average_values.length ? (
            summaryTable("Average Batting Values", summary.average_values)
          ) : null}
        </Pages>
      ) : pages === "Charts" ? (
        <Pages>
          <Text>There's no info yet!</Text>
        </Pages>
      ) : pages === "Log" ? (
        <Pages>
          <Options>
            <input
              type="text"
              placeholder="Search"
              value={searchName}
              onChange={search}
            />
            <SelectFilter
              position={{ right: "0px" }}
              data={typeData}
              choose={changeType}
              text="Pitch Type "
            />
          </Options>
          <h3>Batting Log</h3>
          <TableHeader>
            <span>Date</span>
            <span>Pitcher Name</span>
            <span>Pitcher Handedness</span>
            <span>Pitch Type</span>
            <span>Pitch Call</span>
          </TableHeader>
          {loading ? null : !log.batting_log.total_count ? (
            <Text>The player haven't had any sessions yet!</Text>
          ) : (
            <>
              {logList(log.batting_log.batting_log)}
              <Paginate
                handleClick={handleClick}
                initialPage={initialPage}
                pageCount={pageCount}
              />
            </>
          )}
        </Pages>
      ) : null}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  width: 100%;
`;
const Pages = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 420px;
  & h3 {
    margin: 16px 0;
  }
`;
const TableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
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
  & span {
    width: 100%;
    color: #333;
  }
`;
const Text = styled.div`
  margin: auto;
`;
const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export default Batting;
