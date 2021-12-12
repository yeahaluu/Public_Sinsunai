import React, { useState, useEffect, useLayoutEffect } from "react";
import { DB, createMessage, getCurrentUser } from "../utils/firebase";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../components";

const Container = styled.View`
  flex: 1;
`;

const SendButton = (props) => {
  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
      }}
    >
      <MaterialIcons
        name="send"
        size={24}
        color={props.text ? "blue" : "grey"}
      />
    </Send>
  );
};

const Channel = ({ navigation, route: { params } }) => {
  const [messages, setMessages] = useState([]);
  const { uid, name, photoUrl } = getCurrentUser();

  const _handleMessageSend = async (messageList) => {
    const newMessage = messageList[0];
    try {
      await createMessage({ channelId: params.id, message: newMessage });
    } catch (e) {
      Alert.alert("메시지 전송 오류", e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = DB.collection("channels")
      .doc(params.id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setMessages(list);
      });

    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: params.title || "Channel" });
  }, []);

  return (
    <Container>
      <GiftedChat
        listViewProps={{
          style: { backgroundColor: "white" },
        }}
        placeholder="Enter a message..."
        messages={messages}
        user={{ _id: uid, name, avatar: photoUrl }}
        onSend={_handleMessageSend}
        alwaysShowSend={true}
        textInputProps={{
          autoCapitalize: "none",
          autoCorrect: false,
          textContentType: "none", // for iOS
          underlineColorAndroid: "transparent", // for Android
        }}
        multiline={false}
        renderUsernameOnMessage={true}
        scrollToBottom={true}
        renderSend={(props) => <SendButton {...props} />}
      />
    </Container>
  );
};

export default Channel;
