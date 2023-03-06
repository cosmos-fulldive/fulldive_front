import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, dataToSubmit)
    .then((response) => console.log("response", response.data));

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/join`, dataToSubmit).then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
