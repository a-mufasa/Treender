import React from "react";
import { Text, View, Image } from "react-native";
import { MessageT } from "../types";
import styles from "../assets/styles";

const Message = ({lastMessage, name }: MessageT) => {

  const IMAGES = {
    "Loblolly-Pine.jpg": require("../assets/images/Loblolly-Pine.jpg"),
    "Persimmon.jpg": require("../assets/images/Persimmon.jpg"),
    "Honey-Locust.jpg": require("../assets/images/Honey-Locust.jpg"),
    "Eastern-Red-Cedar.jpg": require("../assets/images/Eastern-Red-Cedar.jpg"),
  };

  const imageKey = name.replace(/ /g, "-") + ".jpg";
  const imageSource = IMAGES[imageKey];

  return (
    <View style={styles.containerMessage}>
      <Image source={imageSource} style={styles.avatar} />
      <View>
        <Text>{name}</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>
    </View>
  );
};

export default Message;
