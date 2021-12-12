// import { model } from "@tensorflow/tfjs-layers";
import React from "react";
import { Dimensions } from "react-native";
import ActivityRings from "react-native-activity-rings";
import KoreanClasses from "../../../assets/model/KoreanClasses";

const screenWidth = Dimensions.get("window")["width"];
const screenHeight = Dimensions.get("window")["height"];
const standard = screenHeight / 4.5;

export const Kind = ({ modelResult }) => {
  const kinds = ["", "", ""];
  const scores = [0, 0, 0];
  for (let i = 0; i < modelResult.length; i++) {
    const name =
      modelResult[i][0][0] !== "chinese-cabbage"
        ? `${KoreanClasses[modelResult[i][0][0]]}(${
            KoreanClasses[modelResult[i][0][1]]
          })`
        : `${KoreanClasses[modelResult[i][0][0]]}`;
    const score = modelResult[i][1];
    if (!kinds[0].length) {
      kinds[0] = name;
      scores[0] = score;
    } else if (!kinds[1].length) {
      if (kinds[0] === name) continue;
      kinds[1] = name;
      scores[1] = score;
    } else if (!kinds[2].length) {
      if (kinds[1] === name) continue;
      kinds[2] = name;
      scores[2] = score;
    } else break;
  }
  const activityData = [
    {
      label: kinds[0],
      value: scores[0], // ring will use color from theme
      color: "#FE6825",
    },
    {
      label: kinds[1],
      value: scores[1],
      color: "#cb5f18",
    },
    {
      label: kinds[2],
      value: scores[2],
      color: "#86040f",
      backgroundColor: "#cccccc",
    },
  ];

  const activityConfig = {
    width: standard,
    height: standard,
  };

  return (
    <ActivityRings
      theme={"light"}
      legend={true}
      data={activityData}
      config={activityConfig}
    />
  );
};

export const Grade = ({ gradeResult }) => {
  const grades = ["L", "M", "S"];
  const scores = [0.5, 0.3, 0.2];
  // const firstName = modelResult[0][0][0] + modelResult[0][0][1];
  // for (let i = 0; i < modelResult.length; i++) {
  //   const newName = modelResult[i][0][0] + modelResult[i][0][1];
  //   const score = modelResult[i][1];
  //   if (newName === firstName) {
  //     if (!grades[0].length) {
  //       grades[0] = modelResult[i][0][2];
  //       scores[0] = score;
  //     } else if (!grades[1].length) {
  //       grades[1] = modelResult[i][0][2];
  //       scores[1] = score;
  //     } else if (!grades[2].length) {
  //       grades[2] = modelResult[i][0][2];
  //       scores[2] = score;
  //     }
  //   }
  //   if (!!grades[2].length) break;
  // }
  const activityData = [
    {
      label: `${gradeResult[0][0]} 등급`,
      value: gradeResult[0][1],
      color: "#8EDC8B",
    },
    {
      label: `${gradeResult[1][0]} 등급`,
      value: gradeResult[1][1],
      color: "#8FC640",
    },
    {
      label: `${gradeResult[2][0]} 등급`,
      value: gradeResult[2][1],
      color: "#106A39",
      backgroundColor: "#cccccc",
    },
  ];

  const activityConfig = {
    width: standard,
    height: standard,
  };

  return (
    <ActivityRings
      theme={"light"}
      legend={true}
      data={activityData}
      config={activityConfig}
    />
  );
};
