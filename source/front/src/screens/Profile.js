import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Image, Input, Button } from "../components";
import { logout, getCurrentUser, updateUserPhoto, DB } from "../utils/firebase";
import { UserContext } from "../contexts";
import { Alert, View } from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { storeData, getData } from "../utils/asyncstorage";

const MainContainer = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;
const Container = styled.View`
  z-index: 2;
  flex: 1;
  justify-content: center;
  padding: 40px 40px;
`;
const ProfileTextContinaer = styled.View`
  justify-content: flex-start;
`;
const BackgroundColorContainer = styled.View`
  position: absolute;
  z-index: 1;
  height: 20%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #febb25;
`;

const StyledLabel = styled.Text`
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
`;
const StyledProfileContentText = styled.Text`
  font-size: 25px;
  font-weight: 500;
`;

const ButtonContainer = styled.TouchableOpacity`
  margin-top: 10px;
  width: 100%;
  height: 100px;
  background-color: white;
  border-radius: 5px;
  flex-direction: row;
  box-shadow: 0px 4px black;
  shadow-opacity: 0.5;
  shadow-radius: 3px;
`;
const IconArea = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;
const ButtonContents = styled.View`
  flex: 5;
  justify-content: center;
`;
const ButtonTitle = styled.Text`
  font-size: 25px;
  font-weight: 600;
`;
const ButtonContent = styled.Text`
  font-size: 15px;
  font-weight: 500;
`;

const ButtonBox = ({ icon, title, content, onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <IconArea>
        <MaterialIcons name={icon} size={50} color="#febb25" />
      </IconArea>
      <ButtonContents>
        <ButtonTitle>{title}</ButtonTitle>
        <ButtonContent>{content}</ButtonContent>
      </ButtonContents>
    </ButtonContainer>
  );
};

export default Profile = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);

  const user = getCurrentUser();
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const djangoLogout = async () => {
    axios({
      method: "post",
      url: "/rest-auth/logout/",
    });
  };

  const _handleLogoutButtonPress = async () => {
    try {
      await logout();
      djangoLogout();
    } catch (e) {
      console.log("[Profile] logout: ", e.message);
    } finally {
      dispatch({});
    }
  };

  const _handlePhotoChange = async (url) => {
    try {
      const updatedUser = await updateUserPhoto(url);
      setPhotoUrl(updatedUser.photoUrl);
    } catch (e) {
      Alert.alert("사진 에러!", e.message);
    }
  };

  return (
    <MainContainer>
      <BackgroundColorContainer />
      <Container>
        <Image
          rounded
          url={photoUrl}
          showButton
          onChangeImage={_handlePhotoChange}
        />
        <ProfileTextContinaer>
          <StyledLabel>Nickname</StyledLabel>
          <StyledProfileContentText>{user.name}</StyledProfileContentText>
          <StyledLabel>Email</StyledLabel>
          <StyledProfileContentText>{user.email}</StyledProfileContentText>
        </ProfileTextContinaer>
        <ButtonBox
          icon="chat"
          title="chatting list"
          content="누구랑 채팅하고 있었을까요?"
          onPress={() => navigation.navigate("ChannelList")}
        />
        <ButtonBox
          icon="list-alt"
          title="article list"
          content="내가... 뭐라고 했더라...?"
          onPress={() => {}}
        />
        <ButtonBox
          icon="storefront"
          title="상인 등록"
          content="판매자로 글을 쓸 수 있어용"
          onPress={() => navigation.navigate("SellerStore")}
        />
        {/* <Button title="logout" onPress={_handleLogoutButtonPress} /> */}
      </Container>
    </MainContainer>
  );
};
