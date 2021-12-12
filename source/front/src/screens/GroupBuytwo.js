import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import moment from "moment";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";

// article list
const Container = styled.ScrollView`
  background-color: #f2f2f2;
`;
const StyledText = styled.Text`
  font-size: 12px;
`;

const HeadBackground = styled.View`
  /* position: absolute; */
  width: 100%;
  height: 100px;
  justify-content: center;
  background-color: #106a39;
`;
const HeadTextContainer = styled.SafeAreaView`
  margin-top: 40px;
  align-items: center;
  justify-content: center;
`;
const HeadText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #febb25;
`;
const CompleteButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
`;
const CompleteButtonRight = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
`;
const ButtonTitle = styled.Text`
  font-size: 23px;
  color: #febb25;
`;
// article list item
const ItemContainer = styled.TouchableOpacity`
  width: 100%;
  height: 120px;
  background-color: white;
  box-shadow: 0px 4px black;
  shadow-opacity: 0.5;
  shadow-radius: 3px;
  margin-bottom: 10px;
  padding: 15px 20px;
  flex-direction: row;
`;
const ItemContainerLeft = styled.View`
  flex: 2;
  /* background-color: blue; */
`;
const ItemContainerRight = styled.View`
  flex: 1;
  /* background-color: black; */
  justify-content: flex-end;
  align-items: flex-end;
`;
const ItemTitle = styled.Text`
  font-size: 27px;
  font-weight: 600;
`;
const KindText = styled.Text`
  font-size: 22px;
  font-weight: 400;
`;
const TimeText = styled.Text`
  font-size: 12px;
`;

const DistanceText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: #324cd1;
  margin-bottom: 20px;
`;
const PriceText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #106a39;
`;
const getDistance = (obj1, obj2) => {
  return (
    ((obj1.latitude - obj2.latitude) ** 2 +
      (obj1.longitude - obj2.longitude) ** 2) **
      (1 / 2) *
    111000
  );
};
// article item badge
const BadgeContainer = styled.View`
  width: 80px;
  height: 20px;
  background-color: ${({ for_selling }) =>
    for_selling ? "#5c9348" : "#febb25"};
  justify-content: center;
  align-items: center;
`;
const BadgeText = styled.Text`
  font-size: 12px;
  color: white;
`;

const ArticleItemBadge = ({ for_selling }) => {
  return (
    <BadgeContainer for_selling={for_selling}>
      <BadgeText>{for_selling ? "판매자" : "소비자"}</BadgeText>
    </BadgeContainer>
  );
};

const ArticleListItem = ({ article, location, navigation }) => {
  return (
    <ItemContainer
      onPress={() => navigation.navigate("GroupBuyDetail", { article })}
    >
      <ItemContainerLeft>
        <ArticleItemBadge for_selling={article.for_selling} />
        <ItemTitle>{article.title}</ItemTitle>
        <KindText>{article.article_kind}</KindText>
        <TimeText>{moment(article.meeting_time).fromNow()}</TimeText>
      </ItemContainerLeft>
      <ItemContainerRight>
        <DistanceText>
          {parseInt(getDistance(article.market, location.coords))}m
        </DistanceText>
        <PriceText>₩ {article.price}</PriceText>
      </ItemContainerRight>
    </ItemContainer>
  );
};

export default GroupBuytwo = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [location, setLocation] = useState(null);
  const isFocused = useIsFocused();
  useEffect(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    const newLocation = await Location.getCurrentPositionAsync({});
    setLocation(newLocation);
    axios({
      method: "get",
      url: "/articles/",
    })
      .then((res) => {
        setArticles(res.data.reverse());
      })
      .catch((err) => console.error(err));
  }, [isFocused]);
  const ArticleList = articles.map((article, index) => {
    return (
      <ArticleListItem
        article={article}
        key={index}
        location={location}
        navigation={navigation}
      />
    );
  });
  return (
    <Container stickyHeaderIndices={[0]}>
      <HeadBackground>
        <HeadTextContainer>
          <HeadText>공동구매 목록</HeadText>

          <CompleteButton onPress={() => navigation.navigate("GroupBuyCreate")}>
            <ButtonTitle>새 글</ButtonTitle>
          </CompleteButton>
          {/* <CompleteButtonRight onPress={() => {}}>
            <ButtonTitle>필터</ButtonTitle>
          </CompleteButtonRight> */}
        </HeadTextContainer>
      </HeadBackground>
      {ArticleList}
    </Container>
  );
};
