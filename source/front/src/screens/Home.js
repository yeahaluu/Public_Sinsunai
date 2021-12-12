import React from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import LogoImg from "../assets/logo_with_word.png";
import BackgroundImg from "../assets/background.jpg";

import Model from "../components/Model";
import MapComponent from "../components/MapComponent";

const Container = styled.TouchableOpacity`
  flex: 1;
`;

const Background = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  align-items: center;
  letter-spacing: 5px;
`;

const Logo = styled.Image`
  width: 200px;
  height: 200px;
  position: absolute;
`;

const NullView = styled.View`
  height: 500px;
`;

export default Home = ({ navigation }) => {
  return (
    <Container onPress={() => navigation.navigate("Camera")}>
      <StatusBar barStyle="light-content" />
      <Background source={BackgroundImg} resizeMode="cover">
        <Logo source={LogoImg} />
        <NullView />
        <StyledText>Touch to Start</StyledText>
      </Background>
    </Container>
  );
};
