import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../Utils/Colors";

const Button = ({ title = "Button", active = false, Press = () => {} }) => {
  return (
    <TouchableOpacity
      disabled={!active}
      onPress={Press}
      style={[
        styles.container,
        {
          backgroundColor: active ? Colors.primary : Colors.gray,
        },
      ]}
    >
      <Text
        style={{
          color: !active ? Colors.primary : Colors.gray,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 10,
    borderRadius: 10,
  },
});
