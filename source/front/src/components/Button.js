import React, { useState } from "react";
import styled from "styled-components/native";

const TRANSPARENT = "transparent";

const Container = styled.TouchableOpacity`
  background-color: ${({ isFilled }) => (isFilled ? "#febb25" : TRANSPARENT)};
  align-items: center;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
const Title = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ isFilled }) => (isFilled ? "#106A39" : "#abcdef")};
`;

const Button = ({
  containerStyle,
  title,
  onPress,
  isFilled = true,
  disabled,
}) => {
  return (
    <Container
      style={containerStyle}
      onPress={onPress}
      isFilled={isFilled}
      disabled={disabled}
    >
      <Title isFilled={isFilled}>{title}</Title>
    </Container>
  );
};

export default Button;
