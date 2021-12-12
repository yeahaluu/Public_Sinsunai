import React from "react";
import { TouchableOpacity, Text, View, Touchable } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components";

const StyledView = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  box-shadow: 4px 2px 2px grey;
  shadow-opacity: 0.5;
  elevation: 11;
`;
export default MapModal = ({
  isVisible,
  hideModal,
  market,
  onMarketSelect,
}) => {
  if (!!market) {
    return (
      <Modal isVisible={isVisible} hasBackdrop={false}>
        <View style={{ flex: 1 }}></View>
        <StyledView>
          <Text style={{ fontSize: 30 }}>{market.name}</Text>
          <TouchableOpacity onPress={() => onMarketSelect(market)}>
            <Text style={{ fontSize: 20 }}>선택</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hideModal}>
            <Text style={{ fontSize: 20 }}>닫기</Text>
          </TouchableOpacity>
        </StyledView>
      </Modal>
    );
  } else {
    return null;
  }
};
