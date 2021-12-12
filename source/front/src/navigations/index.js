import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./MainTab";
import { Spinner } from "../components";
import { ProgressContext, UserContext } from "../contexts";

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer>
      <MainTab />
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
