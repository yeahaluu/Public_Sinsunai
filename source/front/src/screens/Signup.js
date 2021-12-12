import React, { useState, useRef, useEffect, useContext } from "react";
import { UserContext, ProgressContext } from "../contexts";
import styled from "styled-components/native";
import { Image, Input, Button } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, removeWhitespace } from "../utils/common";
import axios from "axios";
import { storeData, getData } from "../utils/asyncstorage";

import { Alert } from "react-native";
import { signup } from "../utils/firebase";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: #febb25;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const profile =
    "https://theparentingplace.net/wp-content/uploads/2021/02/BlankImage.jpg";
  const [photoUrl, setPhotoUrl] = useState(profile);

  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = "";
      if (!name) {
        _errorMessage = "닉네임을 입력해주세요";
      } else if (!validateEmail(email)) {
        _errorMessage = "이메일 형식을 맞춰주세요";
      } else if (password.length < 6) {
        _errorMessage = "비밀번호는 6자리를 넘게해주세요";
      } else if (password !== passwordConfirm) {
        _errorMessage = "비밀번호가 맞지 않습니다";
      } else {
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  // 이후 api 들어갈 자리 axios
  const _handleSignupButtonPress = async () => {
    // console.log(photoUrl);
    try {
      spinner.start();
      const user = await signup({ email, password, name, photoUrl });
      dispatch(user);
      Alert.alert("회원가입 완료", user.email);
    } catch (e) {
      Alert.alert("회원가입 에러", e.message);
    } finally {
      spinner.stop();
      axios({
        method: "post",
        url: "/users/signup/",
        data: {
          username: name,
          email: email,
          password: password,
          passwordConfirmation: passwordConfirm,
        },
      })
        .then((res) =>
          axios({
            method: "post",
            url: "/rest-auth/login/",
            data: {
              email: email,
              password: password,
            },
          }).then((res) => storeData("token", res.data.key))
        )
        .catch((err) => console.log(err));
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Image
          rounded
          url={photoUrl}
          showButton
          onChangeImage={(url) => setPhotoUrl(url)}
        />
        <Input
          label="Nickname"
          value={name}
          onChangeText={(text) => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Nickname"
          returnKeyType="next"
        />
        <Input
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <Input
          ref={passwordConfirmRef}
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSignupButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Signup"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
