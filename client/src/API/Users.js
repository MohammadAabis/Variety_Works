import axios from "axios";
import apiURL from "../config";

const client = axios.create({
  baseURL: apiURL + "users",
});

const Signup = async (dataArg) => {
  const respData = await client.post("/signup", dataArg);  // /signup is the endpoint which is defined in the server side of the routers
  return respData;
};

// const Signin = async (dataArg) => {
//   const respData = await client.post("/login", dataArg);
//   return respData;
// };

export { Signup };
