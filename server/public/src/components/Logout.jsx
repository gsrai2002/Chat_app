import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const localStorageItem = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (!localStorageItem) {
        throw new Error("No user data found in local storage");
      }
      const parsedData = JSON.parse(localStorageItem);
      if (!parsedData || !parsedData._id) {
        throw new Error("Invalid user data found in local storage");
      }
      const id = parsedData._id;
      
      const response = await axios.get(`${logoutRoute}/${id}`);
      if (response.status === 200) {
        localStorage.clear();
        navigate("/login");
      } else {
        throw new Error("Logout request failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: #3d52a0;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
