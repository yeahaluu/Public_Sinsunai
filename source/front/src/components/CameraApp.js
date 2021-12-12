import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { AntDesign } from "@expo/vector-icons";

const CameraApp = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  setSnap = async () => {
    if (cameraPermission === true) {
      console.log(this);
      const photo = await this.camera.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(photo.uri);
    }
  };

  if (cameraPermission === null) {
    return <View />;
  }

  if (cameraPermission === false) {
    return <Text>No Access to Camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        type={cameraType}
        style={{ width: 200, height: 300 }}
        ref={(ref) => {
          // this.camera = ref
          // if (!ref) {
          //   this.camera = ref
          // } else {
          //   this.camera
          // }
        }}
      >
        <View style={styles.snapContainer}>
          {/* <TouchableOpacity
            onPress={() => {
              setCameraType(
                cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
              )
            }}
          >
            <Text>Flip</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              setSnap();
            }}
          >
            <AntDesign name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  snapContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  button: {},
  text: {},
});

export default CameraApp;
