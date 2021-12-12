import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dimensions, Text } from "react-native";
import LineGraph from "@chartiful/react-native-line-graph";
import moment from "moment";
import KindCode from "../../../assets/model/KindCode";
import KoreanClasses from "../../../assets/model/KoreanClasses";

export default PriceLineGraph = ({ data, labels }) => {
  return (
    <LineGraph
      data={data}
      labels={labels}
      width={Dimensions.get("window")["width"] * 0.8}
      height={Dimensions.get("window")["height"] * 0.3}
      lineColor="#FEBB25"
      dotColor="#347975"
      lineWidth={3}
      isBezier
      hasDots={true}
      baseConfig={{
        startAtZero: false,
        hasXAxisBackgroundLines: false,
        xAxisLabelCount: 8,
        xAxisLabelStyle: {
          rotation: 0,
          fontSize: 12,
          width: 70,
          yOffset: 4,
          xOffset: -5,
        },
        hasYAxisLabels: true,
        yAxisLabelStyle: {
          fontSize: 10,
        },
      }}
      style={{
        // marginBottom: 10,
        padding: 10,
        paddingTop: 20,
        borderRadius: 20,
        backgroundColor: `#FFFAB4`,
      }}
    />
  );
};
