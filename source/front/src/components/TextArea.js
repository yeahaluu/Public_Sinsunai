import React, { useState, forwardRef } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenHeight = Dimensions.get("window")["height"];

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;
const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
`;
const StyledTextInput = styled.TextInput`
  height: ${screenHeight * 0.3}px;
  background-color: wheat;
  padding: 20px 10px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 4px;
`;

const TextArea = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      isPassword,
      returnKeyType,
      maxLength,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Container>
        <Label isFocused={isFocused}>{label}</Label>
        <StyledTextInput
          multiline={true}
          ref={ref}
          isFocused={isFocused}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur;
          }}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none" // for iOS
          underlineColorAndroid="transparent" // for Android
        />
      </Container>
    );
  }
);

export default TextArea;
