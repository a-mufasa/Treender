import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY } from "../assets/styles";
import { curCity, curState } from "../backend/UpdateDb";

const City = () => (
  <TouchableOpacity style={styles.city}>
    <Text style={styles.cityText}>
      <Icon name="location-sharp" size={13} color={DARK_GRAY} /> {curCity || "Fayetteville"}
    </Text>
  </TouchableOpacity>
);

export default City;
