import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { DB, getCurrentUser } from "../utils/firebase";
import moment from "moment";

const Container = styled.View`
  flex: 1;
`;
const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #febb25;
  padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: greenyellow;
`;
const ItemTime = styled.Text`
  font-size: 12px;
  color: #106a39;
`;
const channels = [];
for (let idx = 0; idx < 1000; idx++) {
  channels.push({
    id: idx,
    title: `title ${idx}`,
    createdAt: idx,
  });
}

// 생성된 날짜가 오늘과 같으면 시간 렌더링, 하루 이상 차이 나면 생선된 날짜 렌더링
const getDateOrTime = (ts) => {
  const now = moment().startOf("day");
  const target = moment(ts).startOf("day");
  return moment(ts).format(now.diff(target, "days") > 0 ? "MM/DD" : "HH:mm");
};

const Item = React.memo(({ item: { id, title, createdAt }, onPress }) => {
  // console.log(`Item: ${id}`);

  return (
    <ItemContainer onPress={() => onPress({ id, title })}>
      <ItemTextContainer>
        <ItemTitle>{title}</ItemTitle>
      </ItemTextContainer>
      <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
      <MaterialIcons name="keyboard-arrow-right" size={24} color={"#febb25"} />
    </ItemContainer>
  );
});

const ChannelList = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    const unsubscribe = DB.collection("channels")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setChannels(list);
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const memeberRef = DB.collection("channels");
    const { uid } = getCurrentUser();
    // console.log(uid);
    const chatList = memeberRef.where("member", "array-contains", uid);
    chatList.onSnapshot((snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push(doc.data());
      });
      console.log(list);
      setList(list);
    });
  }, []);

  const _handleItemPress = (params) => {
    console.log("파람즈 : " + params);
    navigation.navigate("Channel", params);
  };

  return (
    <Container>
      <FlatList
        keyExtractor={(item) => item["id"]}
        data={list}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
        windowSize={3}
      />
    </Container>
  );
};

export default ChannelList;
