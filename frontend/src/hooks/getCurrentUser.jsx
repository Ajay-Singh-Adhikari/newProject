import axios from "axios";
import React, { useEffect } from "react";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";

const getCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios(`${serverUrl}/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
};

export default getCurrentUser;
