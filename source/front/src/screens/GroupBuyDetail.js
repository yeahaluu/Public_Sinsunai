import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import moment from "moment";
import "moment/locale/ko";
import axios from "axios";

const screenHeight = Dimensions.get("window")["height"];
const screenWidth = Dimensions.get("window")["width"];
const standard = screenHeight > screenWidth ? screenWidth : screenHeight;
const mainFontSize = standard * 0.1;
const subFontSize = standard * 0.05;
const marginSize = standard * 0.03;

const Container = styled.ScrollView`
  background-color: #d2e1d1;
`;

const DuetimeText = styled.Text`
  font-size: ${subFontSize}px;
  text-align: right;
  margin: ${marginSize}px;
`;

const TitleText = styled.Text`
  font-size: ${mainFontSize}px;
  text-align: center;
  margin: ${marginSize}px;
`;

const SubTitleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  margin: ${marginSize}px;
`;

const SubTitleText = styled.Text`
  font-size: ${subFontSize}px;
`;

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.Image`
  height: ${screenWidth * 0.5}px;
  width: ${screenWidth * 0.5}px;
  border-radius: 10px;
  margin: ${marginSize}px;
`;

const ContentContainer = styled.View`
  background-color: white;
  border-radius: 10px;
  width: ${screenWidth * 0.9}px;
  height: ${screenHeight * 0.3}px;
  margin: ${marginSize}px;
  padding: 10px;
`;
const ContentText = styled.Text`
  font-size: ${subFontSize}px;
`;

const PriceChatContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: ${screenHeight * 0.1}px;
  border-width: 1px;
  margin-top: ${marginSize}px;
`;

const PriceChatText = styled.Text`
  font-size: 18px;
`;

const imgUri =
  "https://cdn.mkhealth.co.kr/news/photo/202010/50970_51164_4758.jpg";

export default GroupBuyDetail = ({ route }) => {
  // const { article } = route.params;
  const [article, setArticle] = useState({
    meeting_time: 0,
    title: "",
    article_kind: "",
    personnel: 0,
    body: "",
    price: 0,
  });
  useEffect(() => {
    axios({
      method: "get",
      url: `/articles/${route.params.article.id}/`,
    })
      .then((res) => setArticle(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <DuetimeText>종료: {moment(article.meeting_time).fromNow()}</DuetimeText>
      <TitleText>{article.title}</TitleText>
      <SubTitleContainer>
        <SubTitleText>{article.article_kind}</SubTitleText>
        <SubTitleText>{article.personnel}명</SubTitleText>
      </SubTitleContainer>
      <StyledContainer>
        {!!article.article_picture ? (
          <StyledImg source={{ uri: article.article_picture }} />
        ) : null}
        {/* <StyledImg
          source={{
            uri: "https://sinsunaibucket.s3.ap-northeast-2.amazonaws.com/20190927150306_1280.jpg",
          }}
        /> */}
        <ContentContainer>
          <ContentText>{article.body}</ContentText>
        </ContentContainer>
      </StyledContainer>
      <PriceChatContainer>
        <PriceChatText>{article.price}원</PriceChatText>
        <PriceChatText>채팅하기</PriceChatText>
      </PriceChatContainer>
    </Container>
  );
};
