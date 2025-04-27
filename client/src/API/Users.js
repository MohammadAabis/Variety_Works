import axios from "axios";
import apiURL from "../config";

const client = axios.create({
  baseURL: apiURL + "users",
});

const Signup = async (dataArg) => {
  const respData = await client.post("/signup", dataArg); // "/signup" is the endpoint which is defined in the server side of the routers
  return respData;
};

const Signin = async (dataArg) => {
  const respData = await client.post("/signin", dataArg);
  return respData;
};

const AddDynamicData = async (dataArg) => {
  const respData = await client.post("/form", dataArg);
  return respData;
};
const GetFormData = async (dataArg) => {
  const respData = await client.post("/get-all-form", dataArg);
  return respData;
};
const GetFormCategory = async (category) => {
  const respData = await client.get(`/form/${encodeURIComponent(category)}`);
  return respData.data;
};

const UpdateDynamicData = async (id, data) => {
  const resp = await client.put(`/form/${id}`, data);
  return resp;
};

const SubmitFormResponses = async (data) => {
  const resp = await client.post("/submit", data);
  return resp;
};

export {
  Signup,
  Signin,
  AddDynamicData,
  GetFormData,
  GetFormCategory,
  UpdateDynamicData,
  SubmitFormResponses,
};
