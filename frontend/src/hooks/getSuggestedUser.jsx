import axios from "axios";
import React, { useEffect } from "react";
import { setSuggestedUsers } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";

const getSuggestedUsers = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios(`${serverUrl}/user/suggested`, {
          withCredentials: true,
        });
        dispatch(setSuggestedUsers(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userData]);
};

export default getSuggestedUsers;
