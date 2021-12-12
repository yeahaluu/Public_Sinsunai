import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { AntDesign } from "@expo/vector-icons";
import CameraBtn from "../assets/logo_1000.png";

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const PlusSign = styled.View`
  width: 100px;
  height: 100px;
  opacity: 0.5;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50px) translateY(-50px);
`;

const screenWidth = Dimensions.get("window")["width"];
const screenHeight = Dimensions.get("window")["height"];
const ShortLength =
  screenWidth > screenHeight ? screenHeight * 0.9 : screenWidth * 0.9;

const ThousandBox = styled.View`
  position: absolute;
  opacity: 0.5;
  border-style: dotted;
  border-color: black;
  border-width: 5px;
  width: ${ShortLength}px;
  height: ${ShortLength}px;
  top: 50%;
  left: 50%;
  transform: translateX(-${ShortLength / 2}px) translateY(-${ShortLength / 2}px);
`;

const StyledText = styled.Text`
  text-align: center;
  margin-top: 30px;
  font-size: 20px;
`;

export default function App({ navigation, route }) {
  // camera permissions
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  // media library permissions
  const [status, requestPermission] = MediaLibrary.usePermissions();

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3"); // default is 4:3
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  // tack a pic
  const setSnap = async () => {
    if (hasCameraPermission === true) {
      const photo = await camera.takePictureAsync();
      // await MediaLibrary.saveToLibraryAsync(photo.uri);
      if (!route.params) {
        navigation.navigate("AnalysisResult", { photo });
      } else if (route.params.from === "GroupBuyCreatetwo") {
        navigation.navigate({
          name: "GroupBuyCreate",
          params: { photo },
          merge: true,
        });
      }
    }
  };

  // on screen  load, ask for permission to use the camera
  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status == "granted");
    }
    // async function getLibraryStatus() {
    //   const { status } = await MediaLibrary.getPermissionsAsync();
    //   requestPermission();
    // }
    getCameraStatus();
    // getLibraryStatus();
  }, []);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android") {
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  if (hasCameraPermission === null) {
    return (
      <View style={styles.information}>
        <Text>Waiting for camera permissions</Text>
      </View>
    );
  } else if (hasCameraPermission === false) {
    return (
      <View style={styles.information}>
        <Text>No access to camera</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.cameraPreview}
          onCameraReady={setCameraReady}
          ratio={ratio}
          ref={(ref) => {
            setCamera(ref);
          }}
        >
          <View>
            <StyledText>아래 네모에 상품이 꽉 차게 찍어주세요</StyledText>
          </View>
          <ThousandBox />
          <PlusSign>
            <AntDesign name="plus" size={100} color={"black"} />
          </PlusSign>
          <View style={styles.snapContainer}>
            <TouchableOpacity
              onPress={() => {
                setSnap();
              }}
            >
              <Logo source={CameraBtn} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  information: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  cameraPreview: {
    flex: 1,
  },
  snapContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
  },
});
