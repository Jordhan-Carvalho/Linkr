import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();
export default UserContext;

export const UserContextProvider = (props) => {
  const initialTokenState =
    localStorage.getItem("tokenObject") &&
    JSON.parse(localStorage.getItem("tokenObject")).token;
  const initialUserState =
    localStorage.getItem("tokenObject") &&
    JSON.parse(localStorage.getItem("tokenObject")).user;

  const [token, setToken] = useState(initialTokenState);
  const [user, setUser] = useState(initialUserState);

  const signUp = async (body) => {
    try {
      const { data } = await axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_up`,
        body
      );

      if (data.token) {
        let tokenObject = { user: data.user, token: data.token };
        localStorage.setItem("tokenObject", JSON.stringify(tokenObject));

        setToken(data.token);
        setUser(data.user);
        return data;
      }
    } catch (error) {
      alert(error.response.data.message);
      return null;
    }
  };

  const signIn = async (body) => {
    try {
      const { data } = await axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_in`,
        body
      );
      if (data.token) {
        let tokenObject = { user: data.user, token: data.token };
        localStorage.setItem("tokenObject", JSON.stringify(tokenObject));

        setToken(data.token);
        setUser(data.user);
        return data;
      }
    } catch (error) {
      alert(error.response.data.message);
      return null;
    }
  };

  const clearData = () => {
    localStorage.removeItem("tokenObject");
    setUser({});
    setToken("");
  };

  return (
    <UserContext.Provider
      value={{
        token,
        signIn,
        signUp,
        user,
        clearData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
