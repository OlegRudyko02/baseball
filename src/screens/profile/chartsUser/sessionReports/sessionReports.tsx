import React, { useState }  from "react";
import styled from "styled-components";
import Picker from "./datePicker";
type ReportsProps = {
  events: any[];
};
const Reports: React.FC<ReportsProps> = ({ events }) => {
  const [date, setDate] = useState('')
  const sessionList = (data: any) => {
    return data.map((item: any) => {
      return (
        <TableRow key={item.date}>
          <span> {item.date} </span>
          <span>{item.type || '-'}</span>
          <span>{item.name || '-'}</span>
          <span>{item.purchased || '-'}</span>
        </TableRow>
      );
    });
  };
  const changeDate = (value: string) => {
    if (date !== value)  {
      setDate(value) 
    }  
  }
  return (
    <Container>
      <Header>
        <h3>Session</h3>
        <div style={{ position: "relative" }}>
          <Picker setDate={changeDate} />
        </div>
      </Header>
      <TableHeader>
        <span>Date</span>
        <span>Type</span>
        <span>Name</span>
        <span>Purchased</span>
      </TableHeader>
      {date !== '' ? sessionList([{date: date}]): !events.length ? (
        <Text>The player haven't had any sessions yet!</Text>
      ) : (
        sessionList(events)
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 500px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
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
export default Reports;
