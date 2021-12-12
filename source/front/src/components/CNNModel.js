// import React from "react";
// import { Text } from "react-native";
// import * as tf from "@tensorflow/tfjs";
// import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
// // import * as modelJson from "../assets/model.json";
// // import * as modelWeights from "../assets/group1-shard1of1.bin";

// export default CNNModel = () => {
//   async function loadModel() {
//     // const model = await tf.loadLayersModel("file:///C://Users//multicampus//자율플젝//S05P31A206//source//front//src//assets//model.json");
//     const modelJson = require("../assets/model.json");
//     const modelWeights = require("../assets/group1-shard1of1.bin");
//     const model = await tf.loadLayersModel(
//       bundleResourceIO(modelJson, modelWeights)
//     );
//     return model;
//   }
//   console.log(loadModel());
//   return <Text>Hello</Text>;
// };
