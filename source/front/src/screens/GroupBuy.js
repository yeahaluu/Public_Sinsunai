import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

// predefined sizes based on machine
const screenHeight = Dimensions.get("window")["height"];
const screenWidth = Dimensions.get("window")["width"];
const standard = screenHeight > screenWidth ? screenWidth : screenHeight;
const mainFontSize = standard * 0.1;
const subFontSize = standard * 0.05;

// styled componenets
const Container = styled.ScrollView`
  margin-top: ${screenHeight * 0.05}px;
`;
const BoardNameContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: ${screenHeight * 0.03}px;
  margin-bottom: ${screenHeight * 0.03}px;
`;
const BoardNameText = styled.Text`
  text-align: center;
  font-size: ${mainFontSize}px;
`;

const IconContainer = styled.TouchableOpacity`
  width: ${screenWidth * 0.2}px;
  height: ${screenHeight * 0.05}px;
  justify-content: center;
  align-items: center;
`;

const FilterContainer = styled.View`
  width: ${screenWidth * 0.2}px;
  height: ${screenHeight * 0.05}px;
`;

const FilterButton = styled.TouchableOpacity`
  border-width: 1px;
  border-radius: 10px;
  background-color: black;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FilterButtonText = styled.Text`
  font-size: ${subFontSize}px;
  color: white;
`;
const ArticleContainer = styled.View`
  height: 70px;
  margin: 3px 10px;
`;
const ArticleMain = styled.View`
  border-radius: 10px;
  /* elevation: 11;
  box-shadow: 4px 2px 2px black;
  shadow-opacity: 0.5; */
  flex: 1;
  justify-content: space-between;
  /* align-items: center; */
`;
const ArticleTitle = styled.Text`
  align-self: flex-start;
  font-size: 20px;
  margin: 0px 20px;
`;

const ArticleItemContainer = styled.View`
  width: 100%;
  /* height: ${subFontSize * 0.9}px; */
  margin-bottom: 5px;
  flex-direction: row;
  justify-content: space-around;
`;
const ArticleItem = styled.Text`
  font-size: ${subFontSize * 0.8}px;
`;
// // styled componenets
// const Container = styled.ScrollView`
//   margin-top: ${screenHeight * 0.05}px;
// `;
// const BoardNameContainer = styled.View`
//   flex: 1;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;
//   margin-top: ${screenHeight * 0.03}px;
//   margin-bottom: ${screenHeight * 0.03}px;
// `;
// const BoardNameText = styled.Text`
//   text-align: center;
//   font-size: ${mainFontSize}px;
// `;

// const IconContainer = styled.TouchableOpacity`
//   width: ${screenWidth * 0.2}px;
//   height: ${screenHeight * 0.05}px;
//   justify-content: center;
//   align-items: center;
// `;

// const FilterContainer = styled.View`
//   width: ${screenWidth * 0.2}px;
//   height: ${screenHeight * 0.05}px;
// `;

// const FilterButton = styled.TouchableOpacity`
//   border-width: 1px;
//   border-radius: 10px;
//   background-color: black;
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

// const FilterButtonText = styled.Text`
//   font-size: ${subFontSize}px;
//   color: white;
// `;
// const ArticleContainer = styled.View`
//   height: ${screenHeight * 0.15}px;
//   margin: 2%;
// `;
// const ArticleMain = styled.View`
//   border-radius: 10px;
//   elevation: 11;
//   box-shadow: 4px 2px 2px black;
//   shadow-opacity: 0.5;
//   flex: 1;
//   justify-content: space-between;
//   align-items: center;
// `;
// const ArticleTitle = styled.Text`
//   font-size: ${subFontSize}px;
// `;

// const ArticleItemContainer = styled.View`
//   width: 100%;
//   height: ${subFontSize * 0.9}px;
//   flex-direction: row;
//   justify-content: space-around;
// `;
// const ArticleItem = styled.Text`
//   font-size: ${subFontSize * 0.8}px;
// `;

// componenet
export default GroupBuy = ({ navigation }) => {
  const articles = [{ isSeller: true }, { isSeller: false }];
  // change the color of the article based on the user
  const articleList = articles.map((article, idx) => {
    if (article.isSeller) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("GroupBuyDetail")}
          key={idx}
        >
          <ArticleContainer>
            <ArticleMain style={{ backgroundColor: "#d2e1d1" }}>
              <ArticleItemContainer />
              <ArticleTitle>부사가 넘모 많아용 나눠 가져용</ArticleTitle>
              <ArticleItemContainer>
                <ArticleItem>품목: 사과/부사</ArticleItem>
                <ArticleItem>가격: 20,000</ArticleItem>
                <ArticleItem>위치: 127m</ArticleItem>
              </ArticleItemContainer>
            </ArticleMain>
          </ArticleContainer>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("GroupBuyDetail")}
          key={idx}
        >
          <ArticleContainer>
            <ArticleMain style={{ backgroundColor: "#febb25" }}>
              <ArticleItemContainer />
              <ArticleTitle>article{idx}</ArticleTitle>
              <ArticleItemContainer>
                <ArticleItem>품목</ArticleItem>
                <ArticleItem>가격</ArticleItem>
                <ArticleItem>위치</ArticleItem>
              </ArticleItemContainer>
            </ArticleMain>
          </ArticleContainer>
        </TouchableOpacity>
      );
    }
  });
  return (
    <Container>
      <BoardNameContainer>
        <IconContainer onPress={() => navigation.navigate("GroupBuyCreate")}>
          <AntDesign name="pluscircle" size={24} color="black" />
        </IconContainer>
        <BoardNameText>게시판 목록</BoardNameText>
        <FilterContainer>
          <FilterButton>
            <FilterButtonText>필터</FilterButtonText>
          </FilterButton>
        </FilterContainer>
      </BoardNameContainer>
      {articleList}
    </Container>
  );
};
