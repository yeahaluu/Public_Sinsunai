import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;

const StyledText = styled.Text`
  font-size: 30px;
`;

export default SellerStore = () => {
  return (
    <Container>
      <StyledText>가게 고르는 곳</StyledText>
    </Container>
  );
};
