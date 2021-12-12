import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import MapView from "react-native-maps";
import MapModal from "./MapModal";
import * as Location from "expo-location";
import api from "../../assets/api";
import axios from "axios";

const MapContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 2px 2px black;
  shadow-opacity: 0.5;
`;

export default MapComponent = ({ onMarketSelect }) => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markets, setMarkets] = useState([]);
  const [viewMarkets, setViewMarkets] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  // const [marketName, setMarketName] = useState("");
  const [singleMarket, setSingleMarket] = useState(null);
  const toggleModal = (item) => {
    setSingleMarket(item);
    setModalVisible(!isModalVisible);
  };

  const onRegionChange = (reg) => {
    setRegion(reg);
    setViewMarkets(
      markets.filter((item) => {
        return (
          item.latitude < reg.latitude + 0.5 * reg.latitudeDelta &&
          item.latitude > reg.latitude - 0.5 * reg.latitudeDelta &&
          item.longitude < reg.longitude + 0.5 * reg.longitudeDelta &&
          item.longitude > reg.longitude - 0.5 * reg.longitudeDelta
        );
      })
    );
  };
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const newLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setLocation(newLocation);
      axios({
        method: "GET",
        url: "/markets/",
      })
        .then((res) => {
          const markets = res.data;
          const temp = [];
          for (i = 0; i < markets.length; i++) {
            temp.push({ ...markets[i], id: i + 1 });
          }
          setMarkets(temp);
          setViewMarkets(
            temp.filter((item) => {
              return (
                item.latitude < newLocation.coords.latitude + 0.5 * 0.005 &&
                item.latitude > newLocation.coords.latitude - 0.5 * 0.005 &&
                item.longitude < newLocation.coords.longitude + 0.5 * 0.005 &&
                item.longitude > newLocation.coords.longitude - 0.5 * 0.005
              );
            })
          );
        })
        .catch((err) => console.error(err));
    })();
  }, []);

  const marketPings = viewMarkets.map((item, index) => (
    <MapView.Marker
      coordinate={{
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
      }}
      pinColor={"blue"}
      key={index}
    >
      <MapView.Callout onPress={() => toggleModal(item)}>
        <TouchableOpacity>
          <View>
            <Text>여기인가요?</Text>
          </View>
        </TouchableOpacity>
      </MapView.Callout>
    </MapView.Marker>
  ));
  let latitude = 37.78825;
  let longitude = -122.4324;
  let text = "Loading Map...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    return (
      <MapContainer>
        <MapView
          style={styles.map}
          initialRegion={region}
          provider={"google"}
          onRegionChange={onRegionChange}
        >
          <MapView.Marker coordinate={{ latitude, longitude }}></MapView.Marker>
          {marketPings}
        </MapView>
        <MapModal
          isVisible={isModalVisible}
          hideModal={toggleModal}
          market={singleMarket}
          onMarketSelect={onMarketSelect}
        />
      </MapContainer>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width * 0.9,
    height: Dimensions.get("screen").height * 0.8,
    borderRadius: 10,
  },
});
