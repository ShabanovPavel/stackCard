import React from "react";

import { View, Text } from "react-native";

export default ({ text }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text style={{ color: "#fff" }}>{text}</Text>
  </View>
);
