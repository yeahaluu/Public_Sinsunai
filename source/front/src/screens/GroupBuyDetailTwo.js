import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { DB, addChatUser } from "../utils/firebase";
import moment from "moment";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const Main = styled.View`
  flex: 1;
`;
const Container = styled.ScrollView`
  background-color: #f2f2f2;
`;
const ImageContainer = styled.View`
  width: 100%;
`;
const ImageItem = styled.Image`
  width: 100%;
  height: ${width};
`;
const TitleText = styled.Text`
  font-size: 40px;
  font-weight: 600;
  margin: 20px;
`;
const ProfileContinaer = styled.View`
  flex-direction: row;
  margin-top: 70px;
  align-items: center;
`;
const ProfileContentContianer = styled.View`
  margin-left: 20px;
  justify-content: center;
`;
const ProfileText = styled.Text`
  font-size: 35px;
  color: ${({ up }) => (up ? "white" : "black")};
`;
const PhotoContainer = styled.View`
  align-items: flex-start;
  margin-left: 30px;
`;
const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const BackgroundColorContainer = styled.View`
  position: absolute;
  height: 120px;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #febb25;
`;

const KindPersonRow = styled.View`
  flex-direction: row;
  background-color: #febb25;
`;
const KindContainer = styled.View`
  padding: 10px 20px;
  width: 50%;
  /* background-color: red; */
`;
const KindText = styled.Text`
  font-size: 17px;
  color: #106a39;
`;
const BodyConatiner = styled.View`
  padding: 20px;
`;
const BodyText = styled.Text`
  font-size: 28px;
`;
const FooterContainer = styled.View`
  width: 100%;
  height: 60px;
  background-color: #febb25;
  justify-content: center;
`;
const ChattingButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  width: 40%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #106a39;
  border-radius: 10px;
`;
const ChattingText = styled.Text`
  font-size: 20px;
  color: white;
`;
const PriceText = styled.Text`
  font-size: 20px;
  color: #106a39;
`;
export default GroupBuyDetailTwo = ({ route, navigation }) => {
  const [article, setArticle] = useState({
    meeting_time: 0,
    title: "",
    article_kind: "a",
    personnel: 0,
    body: "",
    price: 10,
    meeting_time: "",
    update_at: "",
    article_picture: null,
  });
  const [market, setMarket] = useState({
    latitude: "",
    longitude: "",
    name: "",
    score: 0,
  });
  const [user, setUser] = useState({
    email: "",
    market: 0,
    seller: false,
    username: "",
  });
  const [photoUrl, setPhotoUrl] = useState("b");
  useEffect(() => {
    axios({
      method: "get",
      url: `/articles/${route.params.article.id}/`,
    })
      .then((res) => {
        setArticle(res.data);
        setMarket(res.data.market);
        setUser(res.data.user);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    const userRef = DB.collection("users")
      .where("email", "==", user.email)
      .get()
      .then((docs) =>
        docs.forEach((doc) => {
          const { storageUrl } = doc.data();
          // console.log(storageUrl);
          setPhotoUrl(storageUrl);
        })
      );
  }, [user]);

  const getDateOrTime = (ts) => {
    const now = moment().startOf("day");
    const target = moment(ts).startOf("day");
    const timeDiff = moment(ts).format(
      now.diff(target, "days") > 0 ? "DD" : "HH"
    );
    return timeDiff.replace(/(^0+)/, "");
  };

  const _handleChattingButtonPress = async () => {
    const params = await addChatUser(article.title);
    console.log(params);
    navigation.navigate("Channel", params);
  };

  return (
    <Main>
      <Container>
        <BackgroundColorContainer />
        <ProfileContinaer>
          <PhotoContainer>
            <StyledImage source={{ uri: photoUrl }} />
          </PhotoContainer>
          <ProfileContentContianer>
            <ProfileText up={true}>{user.username}</ProfileText>
            <ProfileText style={{ fontSize: 23 }} up={false}>
              {user.email}
            </ProfileText>
          </ProfileContentContianer>
        </ProfileContinaer>
        {!!article.article_picture && (
          <ImageContainer>
            <ImageItem
              source={{
                uri: `${article.article_picture}`,
              }}
            />
          </ImageContainer>
        )}
        <TitleText>{article.title}</TitleText>
        <KindPersonRow>
          <KindContainer>
            <KindText value={article.article_kind}>
              품종 | {article.article_kind}
            </KindText>
          </KindContainer>
          <KindContainer>
            <KindText>모집인원 | {article.personnel}</KindText>
          </KindContainer>
        </KindPersonRow>
        <KindPersonRow>
          <KindContainer>
            <KindText>
              마감시간 {moment(article.meeting_time).format("YYYY-MM-DD")}
            </KindText>
          </KindContainer>
          <KindContainer>
            <KindText>{getDateOrTime(article.update_at)} 시간 전</KindText>
          </KindContainer>
        </KindPersonRow>
        <BodyConatiner>
          <BodyText>{article.body}</BodyText>
        </BodyConatiner>
      </Container>
      <FooterContainer>
        <PriceText style={{ marginLeft: 30, fontSize: 25 }}>
          ₩ {article.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </PriceText>
        <ChattingButton onPress={_handleChattingButtonPress}>
          <ChattingText>채팅하기</ChattingText>
        </ChattingButton>
      </FooterContainer>
    </Main>
  );
};
