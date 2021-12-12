import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Touchable,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import axios from "axios";
import moment from "moment";

const screenHeight = Dimensions.get("screen")["height"];

const StyledView = styled.View`
  /* flex: 1; */
  /* justify-content: center; */
  align-items: center;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  height: ${screenHeight * 0.4}px;
  background-color: white;
  border-width: 1px;
  border-color: grey;
  border-radius: 15px;
  box-shadow: 4px 2px 2px black;
  shadow-opacity: 1;
  elevation: 11;
`;
const Title = styled.Text`
  font-size: 30px;
  margin: 5px;
`;

const CloseButton = styled.TouchableOpacity`
  /* flex: 1; */
  justify-content: center;
  align-items: center;
  width: 50px;
  padding: 10px;
  /* margin: 5%; */
  background-color: #febb25;
  border-radius: 10px;
  position: absolute;
  right: 20px;
  bottom: 15px;
`;

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

const ArticleListItem = ({ article, location, navigation, hideModal }) => {
  const onItemContainerPress = () => {
    navigation.navigate("GroupBuyDetail", { article });
    hideModal();
  };
  return (
    <ItemContainer onPress={onItemContainerPress}>
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

const HeaderView = styled.View`
  width: 100%;
  height: 100px;
  background-color: #106a39;
  align-items: center;
  padding-top: 20px;
`;

export default MapModal = ({
  isVisible,
  hideModal,
  market,
  location,
  navigation,
}) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `/markets/${market.id}/articles`,
    })
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.error(market, err));
  }, [market]);
  const ArticleList = articles.reverse().map((article, index) => {
    return (
      <ArticleListItem
        article={article}
        key={index}
        location={location}
        navigation={navigation}
        hideModal={hideModal}
      />
    );
  });
  return (
    <Modal isVisible={isVisible} hasBackdrop={false}>
      <View style={{ flex: 1 }}></View>
      <StyledScrollView>
        <StyledView>
          <HeaderView>
            <Title style={{ fontSize: 30, color: "white" }}>
              {market.name}
            </Title>
            <CloseButton onPress={hideModal}>
              <Text
                style={{ fontSize: 15, color: "#106a39", fontWeight: "bold" }}
              >
                끄기
              </Text>
            </CloseButton>
          </HeaderView>
          {ArticleList}
        </StyledView>
      </StyledScrollView>
    </Modal>
  );
};
