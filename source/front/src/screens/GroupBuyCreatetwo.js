import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Switch } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, TextArea, Button } from "../components";
import { AntDesign } from "@expo/vector-icons";
import AnalysisResult from "../components/GroupBuy/AnalysisResult";
import { getData } from "../utils/asyncstorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import axios from "axios";
import Modal from "react-native-modal";
import { createChannel } from "../utils/firebase";

const screenHeight = Dimensions.get("window")["height"];
const screenWidth = Dimensions.get("window")["width"];
const standard = screenHeight > screenWidth ? screenWidth : screenHeight;

const Container = styled.ScrollView`
  background-color: #f2f2f2;
`;
const HeadBackground = styled.View`
  /* position: absolute; */
  width: 100%;
  height: 15%;
  justify-content: center;
  background-color: ${({ isSeller }) => (isSeller ? "#106a39" : "#febb25")};
`;
const CompleteButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
`;
const ButtonTitle = styled.Text`
  font-size: 23px;
  color: ${({ isSeller }) => (isSeller ? "#febb25" : "#106a39")};
`;
const HeadTextContainer = styled.SafeAreaView`
  margin-top: 40px;
  align-items: center;
  justify-content: center;
`;
const HeadText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${({ isSeller }) => (isSeller ? "white" : "black")};
`;
const KindNumberRow = styled.View`
  flex-direction: row;
  width: 100%;
`;
const DateTimeRow = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LabelText = styled.Text`
  font-size: 20px;
`;
const ToggleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const ToggleText = styled.Text`
  font-size: ${standard * 0.04}px;
  margin-right: 5px;
`;

const CameraContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PhotoText = styled.Text`
  font-size: ${screenWidth * 0.05}px;
`;

const InfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 0px;
`;
const SingleInfoContainer = styled.View`
  width: 40%;
`;

const InfoLabel = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-left: 20px;
  /* margin-bottom: 6px; */
`;

const InfoInput = styled.TextInput`
  background-color: wheat;
  padding: 20px 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid black;
  border-radius: 4px;
`;

const inputBasic = `
height: 60px;
padding: 0px 10px;
border-bottom-width: 1px;
border-color: black;
font-size: 20px;
`;

const TitleInput = styled.TextInput`
  width: 100%;
  height: 60px;
  padding: 0px 10px;
  border-bottom-width: 1px;
  border-color: black;
  font-size: 20px;
`;
const KindInput = styled.TextInput`
  width: 70%;
  ${inputBasic}
`;
const NumberInput = styled.TextInput`
  width: 30%;
  border-left-width: 0.2px;
  ${inputBasic}
`;

const PlaceSelector = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  /* justify-content: center; */
  align-items: center;
  justify-content: space-between;
  border-top-width: 0px;
  ${inputBasic}
  flex-direction: row;
`;
const PlaceText = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

const TimeContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  ${inputBasic}
`;

const DateView = styled.View`
  width: 35%;
  justify-content: flex-start;
  /* flex-direction: row; */
`;
const TimeView = styled.View`
  width: 30%;
  justify-content: flex-start;
  /* flex-direction: row; */
`;

const ContentInput = styled.TextInput`
  width: 100%;
  height: 400px;
  padding: 10px 10px;
  font-size: 20px;
`;

const ToggleButton = styled.TouchableOpacity`
  height: 40px;
  width: 30%;
  padding: 5px;
  background-color: ${({ isSeller }) => (isSeller ? "#106a39" : "#febb25")};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
const ToggleInsideText = styled.Text`
  font-size: 17px;
  color: ${({ isSeller }) => (isSeller ? "white" : "black")};
`;

export default GroupBuyCreatetwo = ({ navigation, route }) => {
  const contentRef = useRef();
  const locationRef = useRef();
  const kindRef = useRef();
  const priceRef = useRef();
  const personnelRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [kind, setKind] = useState("");
  const [price, setPrice] = useState(0);
  const [personnel, setPersonnel] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [date, setDate] = useState(moment().toDate());

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const photo = !!route.params
    ? !!route.params.photo
      ? route.params.photo
      : null
    : null;

  const market = !!route.params
    ? !!route.params.market
      ? route.params.market
      : null
    : null;

  const toggleSwitch = () => {
    setIsSeller((preState) => !preState);
  };
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const onCreateBtnClick = async () => {
    const token = await getData("token");
    // createChannel(title);
    axios({
      method: "post",
      url: "/articles/",
      data: {
        title,
        article_kind: kind,
        personnel: parseInt(personnel),
        meeting_time: date,
        body: content,
        market_id: market.id,
        price: price,
        article_picture: photo,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        createChannel(title);
        navigation.navigate("GroupBuy");
      })
      .catch((err) => console.error(err));
  };
  // const onCreateBtnClick = () => {
  //   const data = {
  //     title,
  //     article_kind: kind,
  //     personnel: parseInt(personnel),
  //     meeting_time: moment(date).format("YYYY-MM-DDThh:mm"),
  //     body: content,
  //     market_id: market.id,
  //     article_picture: photo,
  //   };
  //   console.log(data);
  // };

  useEffect(() => {
    setDisabled(
      isSeller
        ? !(
            !!photo &&
            !!title &&
            !!content &&
            !!market &&
            !!kind &&
            !!price &&
            !!personnel
          )
        : !(
            !!title &&
            !!content &&
            !!market &&
            !!kind &&
            !!price &&
            !!personnel
          )
    );
  }, [title, content, market, kind, price, isSeller, personnel]);
  return (
    <Container>
      <HeadBackground isSeller={isSeller}>
        <HeadTextContainer isSeller={isSeller}>
          <HeadText isSeller={isSeller}>공동구매 글쓰기</HeadText>
          <CompleteButton>
            <ButtonTitle isSeller={isSeller} onPress={onCreateBtnClick}>
              완료
            </ButtonTitle>
          </CompleteButton>
        </HeadTextContainer>
      </HeadBackground>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <TitleInput placeholder="제목" onChangeText={setTitle} />
        <KindNumberRow>
          <KindInput placeholder="품목" onChangeText={setKind} />
          <NumberInput
            keyboardType="number-pad"
            placeholder="인원"
            onChangeText={setPersonnel}
          />
        </KindNumberRow>
        <TitleInput
          keyboardType="decimal-pad"
          placeholder="가격"
          onChangeText={setPrice}
        />
        <PlaceSelector
          onPress={() => navigation.navigate("MapScreenGroup", { photo })}
        >
          <PlaceText>가게 선택하기</PlaceText>
          <ToggleButton
            onPress={() => setIsSeller(!isSeller)}
            isSeller={isSeller}
          >
            <ToggleInsideText isSeller={isSeller}>
              {isSeller ? "구매자로 전환" : "판매자로 전환"}
            </ToggleInsideText>
          </ToggleButton>
        </PlaceSelector>
        {isSeller && (
          <PlaceSelector
            onPress={() =>
              navigation.navigate("Camera", { from: "GroupBuyCreatetwo" })
            }
          >
            <PlaceText>농산물 촬영</PlaceText>
            {!!photo && (
              <ToggleButton onPress={() => setIsModal(!isModal)}>
                <ToggleInsideText isSeller={isSeller}>
                  분석결과 보기
                </ToggleInsideText>
              </ToggleButton>
            )}
          </PlaceSelector>
        )}
        <TimeContainer>
          <InfoLabel>날짜</InfoLabel>
          <DateView>
            <DateTimePicker
              locale={"ko"}
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          </DateView>
          <InfoLabel>시간</InfoLabel>
          <TimeView>
            <DateTimePicker
              locale={"ko"}
              value={date}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          </TimeView>
        </TimeContainer>
        <ContentInput
          multiline={true}
          placeholder="내용"
          onChangeText={setContent}
        />
      </KeyboardAwareScrollView>
      <Modal isVisible={isModal}>
        <AnalysisResult photo={photo} setIsModal={toggleModal} />
      </Modal>
    </Container>
  );
};
