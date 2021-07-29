import React, { useState } from "react";
import styled from "styled-components";
import { Field, Form } from "react-final-form";
import Input from "../../../../components/inputUserForm";
import SelectField from "../../../../components/selectField";
import SubmitButton from "../../../../components/button";
import Textarea from "../../../../components/textarea";
import { SCHOOL, TEAMS, FACILITY } from "../../../../api/graphql/query";
import { useQuery } from "@apollo/client";
import MultiSelect from "../../../../components/multiSelect";
import Api from "../../../../api";
import axios from "axios";

type UserInfoFormProps = {
  closeForm: () => void;
  data: any;
  updateProfile: any;
};
type UploadImage = {
  file: {
    lastModified: number;
    lastModifiedDate: any;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
  };
  imagePreviewUrl: string | ArrayBuffer | null;
};
const UserInfoForm: React.FC<UserInfoFormProps> = ({
  data,
  closeForm,
  updateProfile,
}) => {
  const [uploadImage, setUploadImage] = useState<UploadImage>({
    file: {
      lastModified: 0,
      lastModifiedDate: null,
      name: "",
      size: 0,
      type: "",
      webkitRelativePath: "",
    },
    imagePreviewUrl: "",
  });
  const [avatar, setAvatar] = useState("");
  const handleImageChange = (evt: any) => {
    let reader = new FileReader();
    let file = evt.target.files[0];
    reader.onloadend = () => {
      setUploadImage({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    if (file) reader.readAsDataURL(file);
  };
  const UploadImage = () => {
    Api.uploadImage({ name: uploadImage.file.name })
      .then((res: any) => {
        setAvatar(res.data.fileKey);
        axios.put(res.data.signedUrl, uploadImage.file);
      })
  };
  const submit = (values: any) => {
    const value = { ...values };
    value.age = +value.age;
    value.feet = +value.feet;
    !value.inches ? (value.inches = 0) : (value.inches = +value.inches);
    value.weight = +value.weight;
    !value.biography ? (value.biography = "") : value.biography.toString();
    if (avatar !== "")
      value.avatar = `https://baseballcloud-staging-assets.s3.us-east-2.amazonaws.com/${avatar}`;
      console.log(values);
    // updateProfile({ variables: { form: value } });
    // closeForm();
  };
  const validInput = (value: string) =>
    value && value.toString().trim().length ? undefined : "Required";
  const validAge = (value: string) =>
    value && value.toString().trim().length && +value < 30
      ? undefined
      : +value > 30
      ? "must not be older than 30"
      : "Required";
  const validWeight = (value: string) =>
    value && value.toString().trim().length && +value >= 50 && +value <= 350
      ? undefined
      : +value < 50
      ? "minimal is 50 lbs"
      : +value > 350
      ? "maximum is 350 lbs"
      : "Required";
  const validSelect = (value: string) => (value ? undefined : "Required");
  const { loading: loadSchool, data: school } = useQuery(SCHOOL, {
    variables: { search: "" },
  });
  const { loading: loadTeams, data: teams } = useQuery(TEAMS, {
    variables: { search: "" },
  });
  const { loading: loadFacility, data: facility } = useQuery(FACILITY, {
    variables: { search: "" },
  });
  const pos = [
    "Catcher",
    "First Base",
    "Second Base",
    "Shortstop",
    "Third Base",
    "Outfield",
    "Pitcher",
  ];
  const pos2 = [
    "-",
    "Catcher",
    "First Base",
    "Second Base",
    "Shortstop",
    "Third Base",
    "Outfield",
    "Pitcher",
  ];
  const bat = ["R", "L"];
  const schoolYear = ["Freshman", "Sophomore", "Junior", "Senior", "None"];
  return (
    <>
      {loadFacility || loadSchool || loadTeams ? (
        <div>Loading...</div>
      ) : (
        <>
          <UserImg>
            <img
              src={
                uploadImage.imagePreviewUrl !== ""
                  ? uploadImage.imagePreviewUrl
                  : data.avatar || "/assets/user.svg"
              }
              alt="#"
            />
          </UserImg>
          <ChooseImage>
            <input type="file" id="uploadImage" onChange={handleImageChange} />
            <label htmlFor="uploadImage">
              {uploadImage.imagePreviewUrl !== "" && avatar === ""
                ? uploadImage.file.name
                : "Choose Photo"}
            </label>
            {uploadImage.imagePreviewUrl !== "" && avatar === "" ? (
              <Upload>
                <p onClick={UploadImage}>Upload Photo</p>
                <span
                  onClick={() =>
                    setUploadImage({ ...uploadImage, imagePreviewUrl: "" })
                  }
                >
                  Cancel
                </span>
              </Upload>
            ) : null}
          </ChooseImage>
          <Form
            initialValues={data}
            onSubmit={submit}
            render={({ handleSubmit, submitting, values }) => (
              <FormWrapper onSubmit={handleSubmit}>
                <Row>
                  <Field
                    name="first_name"
                    validate={validInput}
                    component={Input}
                    placeholder="First Name"
                    style={{ marginRight: "8px" }}
                  />
                  <Field
                    name="last_name"
                    component={Input}
                    placeholder="Last Name"
                    validate={validInput}
                  />
                </Row>
                <Field
                  name="position"
                  component={SelectField}
                  placeholder="Position in Game"
                  arr={pos}
                  validate={validSelect}
                />
                <Field
                  name="position2"
                  component={SelectField}
                  placeholder="Secondary Position in Game"
                  arr={pos2}
                />
                <Section>
                  <div>Personal Info</div>
                </Section>
                <Field
                  name="age"
                  validate={validAge}
                  component={Input}
                  placeholder="Age"
                />
                <Row>
                  <Field
                    name="feet"
                    validate={validInput}
                    component={Input}
                    placeholder="Feet"
                    style={{ marginRight: "8px" }}
                  />
                  <Field name="inches" component={Input} placeholder="Inches" />
                </Row>
                <Field
                  name="weight"
                  validate={validWeight}
                  component={Input}
                  placeholder="Weight"
                />
                <Row>
                  <Field
                    name="throws_hand"
                    validate={validSelect}
                    component={SelectField}
                    placeholder="Throws"
                    style={{ marginRight: "8px" }}
                    arr={bat}
                  />
                  <Field
                    name="bats_hand"
                    component={SelectField}
                    placeholder="Bats"
                    arr={bat}
                    validate={validSelect}
                  />
                </Row>
                <Section>
                  {" "}
                  <div>School</div>
                </Section>
                <Field
                  name="school"
                  component={MultiSelect}
                  placeholder="School"
                  data={school.schools.schools}
                />
                <Field
                  name="school_year"
                  component={SelectField}
                  placeholder="School Year"
                  arr={schoolYear}
                />
                <Field
                  name="teams"
                  component={MultiSelect}
                  placeholder="Teams"
                  data={teams.teams.teams}
                  multiple
                /> 
                <Section>
                  <div>Facility</div>
                </Section>
                <Field
                  name="facilities"
                  component={MultiSelect}
                  placeholder="Facility"
                  data={facility.facilities.facilities}
                />
                <Section>
                  {" "}
                  <div>About</div>
                </Section>
                <Field
                  name="biography"
                  component={Textarea}
                  placeholder="Describe yourself in a few words"
                />
                <Row>
                  <Button
                    onClick={closeForm}
                    disabled={submitting}
                    type="button"
                  >
                    {" "}
                    Cancle{" "}
                  </Button>
                  <SubmitButton disabled={submitting} text={"Sign In"} />
                </Row>
              </FormWrapper>
            )}
          />
        </>
      )}
    </>
  );
};
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;
const ChooseImage = styled.div`
  text-align: center;
  margin-bottom: 20px;
  & input {
    display: none;
  }
  & label {
    cursor: pointer;
  }
  & label:hover {
    color: #48bbff;
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
  margin: auto;
  margin-bottom: 20px;
`;
const Section = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 15px;
  & div {
    font-size: 18px;
    font-weight: 900;
    color: #414f5a;
    text-align: left;
    display: inline-block;
    z-index: 1;
    background-color: #ffffff;
    padding-right: 12px;
  }
  &::before {
    content: "";
    position: absolute;
    top: 11px;
    left: 0px;
    right: 0;
    height: 1px;
    background-color: #e7ebef;
    z-index: 0;
  }
`;
const Button = styled.button`
  border: solid 1px transparent;
  box-shadow: 0 2px 25px 0 rgb(0 0 0 / 0%);
  background-color: #fff;
  display: block;
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  margin-bottom: 15px;
  cursor: pointer;
  border: solid 1px #d1d7db;
  width: 100%;
  margin-right: 8px;
`;
const Upload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & p {
    color: #48bbff;
    margin-right: 10px;
  }
`;
export default UserInfoForm;
