import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import styled from "styled-components/native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import ResultModal from "../components/AnalysisResult/ResultModal";
import Model from "../components/Model";
import KoreanClasses from "../../assets/model/KoreanClasses";

const screenWidth = Dimensions.get("window")["width"];
const screenHeight = Dimensions.get("window")["height"];

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  /* justify-content: space-around; */
  /* background-color: #f2f2ff; */
  background-color: #f2f2d2;
`;
const TitleText = styled.Text`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
`;
const StyledText = styled.Text`
  font-size: 30px;
`;

const StyledImg = styled.Image`
  width: ${screenWidth * 0.9}px;
  height: ${screenWidth * 0.9}px;
  border-radius: 10px;
`;
const StyledImgContainer = styled.View`
  /* width: ${screenWidth * 0.9}px;
  height: ${screenWidth * 0.9}px; */
  /* position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-${(screenWidth * 0.9) / 2}px)
    translateY(-${(screenWidth * 0.9) / 2}px); */
  elevation: 11;
`;

const Result = styled.TouchableOpacity`
  /* position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-${(screenWidth * 0.9) / 2}px) translateY(-150px); */
  margin-top: 25px;
  width: ${screenWidth * 0.9}px;
  height: ${(screenHeight - screenWidth) * 0.55}px;
  background-color: #ffffff;
  /* border: #106a39; */
  border-radius: 15px;
  /* border-width: 2px; */
  /* margin-bottom: 50px; */
  padding: 10px;
  elevation: 11;
`;

const BoxContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const KindBox = styled.View`
  height: 100%;
  width: ${(screenWidth * 0.9) / 3 - 15}px;
  padding-top: 10px;
  align-items: center;
  background-color: #8fc640;
  border-radius: 20px;
  margin-left: 5px;
  margin-right: 5px;
`;
const GradeBox = styled.View`
  height: 100%;
  width: ${(screenWidth * 0.9) / 3 - 15}px;
  padding-top: 10px;
  align-items: center;
  background-color: #febb25;
  border-radius: 20px;
  margin-left: 5px;
  margin-right: 5px;
`;
const PriceBox = styled.View`
  height: 100%;
  width: ${(screenWidth * 0.9) / 3 - 15}px;
  padding-top: 10px;
  align-items: center;
  background-color: #a1bdff;
  border-radius: 20px;
  margin-left: 5px;
  margin-right: 5px;
`;

const customFontSize = screenWidth < 330 ? 18 : 20;

const TextItem = styled.Text`
  padding: 10px;
  font-size: ${customFontSize}px;
  color: white;
  margin: 5px;
`;

// const ShowDetail = styled.Text`
//   font-size: 20px;
//   text-align: center;
//   position: absolute;
//   top: 90%;
//   left: 50%;
//   transform: translateX(-${(screenWidth * 0.9) / 2}px) translateY(-150px);
// `;
const HeadBackground = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 12%;
  background-color: #febb25;
`;
const IconBackground = styled.View`
  border-radius: 20px;
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: ${({ color }) => color};
`;

const TextContainer = styled.View`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;
const IconBack = ({ color }) => {
  return <IconBackground color={color} />;
};

export default AnalysisResult = ({ route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [modelInput, setModelInput] = useState(null);
  const [modelResult, setModelResult] = useState([
    [["분석중", "분석중", "분석중"]],
  ]);
  const [gradeResult, setGradeResult] = useState([
    ["분석중", 0],
    ["분석중", 0],
    ["분석중", 0],
  ]);
  const [price, setPrice] = useState("분석중");
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [labels, setLabels] = useState(["", "", "", "", "", "", "", ""]);

  const { photo } = route.params;
  const setPhoto = async () => {
    const imgY = photo.height / 2 - photo.width * 0.45;
    const cropResult = await manipulateAsync(
      photo.uri,
      [
        {
          crop: {
            originX: photo.width * 0.05,
            originY: imgY,
            height: photo.width * 0.9,
            width: photo.width * 0.9,
          },
        },
      ],
      { compress: 1, format: SaveFormat.PNG }
    );
    setImage(cropResult);
    const resizeResult = await manipulateAsync(
      cropResult.uri,
      [
        {
          resize: {
            width: 224,
            height: 224,
          },
        },
      ],
      { compress: 1, format: SaveFormat.JPEG }
    );
    setModelInput(resizeResult);
  };

  useEffect(() => {
    setPhoto();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const croppedImg = image ? <StyledImg source={{ uri: image.uri }} /> : null;
  const modelComponent = modelInput ? (
    <Model
      modelInput={modelInput}
      setModelResult={setModelResult}
      setGradeResult={setGradeResult}
      setData={setData}
      setLabels={setLabels}
      setPrice={setPrice}
    />
  ) : null;
  return (
    <Container>
      <HeadBackground />
      <TitleText>SinsunAi Result</TitleText>
      <StyledImgContainer
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
        }}
      >
        {croppedImg}
      </StyledImgContainer>
      <Result
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
        }}
        onPress={toggleModal}
      >
        <BoxContainer>
          <KindBox>
            <IconBack color={"#1e8b11"} />
            <FontAwesome5 name="apple-alt" size={70} color="white" />
            <TextContainer>
              <TextItem>{KoreanClasses[modelResult[0][0][0]]}</TextItem>
              <TextItem>{KoreanClasses[modelResult[0][0][1]]}</TextItem>
            </TextContainer>
          </KindBox>
          <GradeBox>
            <IconBack color={"#8b5e11"} />
            <MaterialIcons name="upgrade" size={70} color="white" />
            <TextContainer>
              <TextItem>{gradeResult[0][0]}</TextItem>
              <TextItem>등급</TextItem>
            </TextContainer>
          </GradeBox>
          <PriceBox>
            <IconBack color={"#557ad2"} />
            <FontAwesome name="won" size={70} color="white" />
            <TextContainer>
              <TextItem>{price}</TextItem>
              <TextItem>원/1kg</TextItem>
            </TextContainer>
          </PriceBox>
        </BoxContainer>
      </Result>
      {/* <ShowDetail>자세한 정보를 원하시면 박스를 누르세요</ShowDetail> */}
      {modelComponent}
      <ResultModal
        isVisible={isModalVisible}
        hideModal={toggleModal}
        modelResult={modelResult}
        data={data}
        labels={labels}
        gradeResult={gradeResult}
      />
    </Container>
  );
};
