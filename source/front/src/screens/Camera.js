import React from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import CameraApp from "../components/CameraTemp";

const Container = styled.View`
  flex: 1;
`;

export default Camera = ({ navigation, route }) => {
  return (
    <Container>
      <StatusBar hidden />
      <CameraApp navigation={navigation} route={route} />
    </Container>
  );
};
