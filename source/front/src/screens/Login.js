import React, { useState, useRef, useEffect, useContext } from "react";
import { UserContext, ProgressContext } from "../contexts";
import styled from "styled-components/native";
import { Input, Button, Spinner } from "../components";
import { Alert } from "react-native";
import { login } from "../utils/firebase";
import axios from "axios";
import { storeData, getData } from "../utils/asyncstorage";
import BackgroundImg from "../assets/background.jpg";
import LogoImg from "../assets/logo_with_word.png";
// focus 얻은 textinput 컴포넌트 위치에 맞춰 스크롤 이동
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// 형식 맞추기 위한 정규 표현식 util
import { validateEmail, removeWhitespace } from "../utils/common";
// 아이폰 노치 디자인 대응 - 가림 방지
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const BackgroundImage = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: #febb25;
`;
const Logo = styled.Image`
  width: 200px;
  height: 200px;
  position: absolute;
`;
const SignupButton = styled.TouchableOpacity`
  background-color: transparent;
  align-items: center;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
`;
const ButtonTitle = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #106a39;
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const passwordRef = useRef();

  const { spinner } = useContext(ProgressContext);
  // const { inProgress } = useContext(ProgressContext);
  const { dispatch } = useContext(UserContext);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? "" : "이메일 형식이 아닙니다"
    );
  };
  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };
  const _handleLoginButtonPress = async () => {
    try {
      spinner.start();
      const user = await login({ email, password });
      dispatch(user);
      // Alert.alert("로그인 성공", user.email);
    } catch (e) {
      Alert.alert("로그인 실패", e.message);
    } finally {
      spinner.stop();
    }
    axios({
      method: "post",
      url: "/rest-auth/login/",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => storeData("token", res.data.key))
      .catch((err) => console.log(err));
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20} // 스크롤 되는 위치 조정할 수 있음
    >
      <BackgroundImage source={BackgroundImg} resizeMode="cover">
        <Logo source={LogoImg} />
      </BackgroundImage>
      {/* {inProgress && <Spinner />} */}
      <Container insets={insets}>
        <Input
          label="email"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <SignupButton onPress={() => navigation.navigate("Signup")}>
          <ButtonTitle>Signup</ButtonTitle>
        </SignupButton>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
