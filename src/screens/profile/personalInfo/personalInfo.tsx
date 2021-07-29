import React, { useState } from "react";
import Info from "../personalInfo/userInfo";
import Form from '../personalInfo/userInfoForm'
import { useAppSelector } from '../../../store'
import { profile } from '../../../states/profile'

type PersonalInfoProps = {
  updateProfile: any
  params: any
}
const PersonalInfo: React.FC <PersonalInfoProps>= ({ updateProfile, params }) => {
  const [formVisible, setFormVisible] = useState(false);
  const data = useAppSelector(profile) 
  return (
    formVisible ?
      <Form updateProfile={updateProfile} data={data} closeForm={() => setFormVisible(false)}/>
    :
      <Info params={params} data={data} openForm={() => setFormVisible(true)}/>
  )
}

export default PersonalInfo