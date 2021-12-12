import React from "react";
import styled from "styled-components/native";
import MapComponentGroup from "../components/GroupBuy/MapComponentGroup";

const StyledView = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default MapScreen = ({ navigation, route }) => {
  const onMarketSelect = (market) => {
    navigation.navigate("GroupBuyCreate", {
      market,
      photo: route.params.photo,
    });
  };
  return (
    <StyledView>
      <MapComponentGroup onMarketSelect={onMarketSelect} />
    </StyledView>
  );
};
