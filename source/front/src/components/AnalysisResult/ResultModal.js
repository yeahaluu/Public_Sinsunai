import React from "react";
import Modal from "react-native-modal";
import { Dimensions, Button } from "react-native";

import { Kind, Grade } from "./RingGraph";
import PriceLineGraph from "./PriceLineGraph";
import styled from "styled-components/native";

const StyledView = styled.View`
  /* width: 100%;
  height: 80%; */
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: #ffdeb4;
  border-radius: 25px;
  padding: 10px;
`;

const RingContainer = styled.View`
  width: ${Dimensions.get("window")["width"] * 0.8 + 20}px;
  /* height: ${Dimensions.get("window")["height"] * 0.8}px; */
  align-items: flex-start; /* Legend 길이와 상관 없이 원 그래프가 위 아래 평행하도록 */
  background-color: #fefbde;
  border-radius: 20px;
`;

const StyledButton = styled.Pressable`
  width: ${Dimensions.get("window")["width"] * 0.8 + 20}px;
  height: 40px;
  background: #fe6825;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: white;
`;

export default ResultModal = ({
  hideModal,
  isVisible,
  modelResult,
  data,
  labels,
  gradeResult,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <StyledView>
        <RingContainer>
          <Kind modelResult={modelResult} />
          <Grade gradeResult={gradeResult} />
        </RingContainer>
        <PriceLineGraph modelResult={modelResult} data={data} labels={labels} />
        <StyledButton title="hide" onPress={hideModal}>
          <ButtonText>돌아가기</ButtonText>
        </StyledButton>
      </StyledView>
    </Modal>
  );
};
