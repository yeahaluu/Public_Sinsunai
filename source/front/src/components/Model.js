import React, { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";
// import AllClasses from "../../assets/model/AllClasses";
import KindClasses from "../../assets/model/KindClasses";
import KindCode from "../../assets/model/KindCode";
import KoreanClasses from "../../assets/model/KoreanClasses";
import axios from "axios";
import moment from "moment";

export default Model = ({
  modelInput,
  setModelResult,
  setGradeResult,
  setData,
  setLabels,
  setPrice,
}) => {
  useEffect(() => {
    async function loadAll() {
      // load model
      console.log("[+] 모델 로딩 시작");
      const tfReady = await tf.ready();
      const modelJson = await require("../../assets/model/model.json");
      const modelWeight =
        await require("../../assets/model/group1-shard1of1.bin");
      const modelLoaded = await tf.loadLayersModel(
        bundleResourceIO(modelJson, modelWeight)
      );
      console.log("[+] 모델 로딩 완료");

      // load data
      const imgB64 = await FileSystem.readAsStringAsync(modelInput.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      const raw = new Uint8Array(imgBuffer);
      const imgTensor = decodeJpeg(raw).reshape([1, 224, 224, 3]);

      // create predictions
      const modelPred = modelLoaded.predict(imgTensor);
      const modelPredArr = modelPred.arraySync()[0];
      let temp = {};
      for (let i = 0; i < modelPredArr.length; i++) {
        temp[KindClasses[i]] = modelPredArr[i];
      }
      const tempArr = Object.entries(temp).sort((a, b) => b[1] - a[1]);
      const resultArr = tempArr.map((val) => [val[0].split("_"), val[1]]);
      setModelResult(resultArr);

      const gradeModelJson =
        await require("../../assets/model/grade/model.json");
      const gradeModelWeight =
        await require("../../assets/model/grade/group1-shard1of1.bin");
      const gradeModelLoaded = await tf.loadLayersModel(
        bundleResourceIO(gradeModelJson, gradeModelWeight)
      );
      const gradePred = gradeModelLoaded.predict(imgTensor);
      const gradePredArr = gradePred.arraySync()[0];
      let temp2 = {};
      for (let i = 0; i < gradePredArr.length; i++) {
        temp2[`${i + 1}`] = gradePredArr[i];
      }
      const gradeResultArr = Object.entries(temp2).sort((a, b) => b[1] - a[1]);
      setGradeResult(gradeResultArr);

      axios({
        method: "GET",
        url: "https://www.kamis.or.kr/service/price/xml.do",
        params: {
          action: "monthlySalesList",
          p_cert_key: "26294f41-ad06-4c67-b139-f9bb0c3cae99",
          p_cert_id: 2147,
          p_returntype: "json",
          p_itemcode: KindCode[KoreanClasses[resultArr[0][0][0]]],
          p_convert_kg_yn: "Y",
          p_yyyy: moment().year(),
        },
      })
        .then((res) => {
          const tempData = [0, 0, 0, 0, 0, 0, 0, 0];
          const tempLabels = [0, 0, 0, 0, 0, 0, 0, 0];
          for (i = 0; i < 8; i++) {
            const year = moment().subtract(i, "months").year();
            const month = moment().subtract(i, "months").month() + 1;
            res.data.price[0].item.forEach((obj) => {
              if (obj.yyyy === year.toString()) {
                const temp = obj[`m${month}`];
                tempData[7 - i] = parseInt(temp.replace(",", ""));
                tempLabels[7 - i] = month;
              }
            });
          }
          console.log(tempData);
          setData(tempData);
          setLabels(tempLabels);
          setPrice(tempData[7]);
        })
        .catch((err) => console.log(err));
    }
    loadAll();
  }, []);
  return null;
};
