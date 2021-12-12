import React from "react";
import styled from "styled-components/native";
import MapComponent from "../components/MapComponent";

const StyledView = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default MapScreen = ({ navigation }) => {
  return (
    <StyledView>
      <MapComponent navigation={navigation} />
    </StyledView>
  );
};
