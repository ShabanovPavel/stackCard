import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import StackCards from "./components/stackCard/index";
import TestC from "./components/stackCard/testComponent";

const Cards = [
  <TestC text={"дизайн!"} style={{ backgroundColor: "red" }} />,
  <TestC text={"Дизайн!!"} style={{ backgroundColor: "green" }} />,
  <TestC text={"Дизайн!!!"} style={{ backgroundColor: "silver" }} />,
  <TestC text={"Закрой глаза:) "} style={{ backgroundColor: "black" }} />,
  <TestC text={"Дизайн!!!"} style={{ backgroundColor: "yellow" }} />,
  <TestC text={"Голограмма"} style={{ backgroundColor: "#3499" }} />,
];

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StackCards
          cards={Cards.reverse()}
          sizeStack={4}
          speedAnimation={600}
          sensitivitySwipe={100}
          heightCard={450}
          widthCard={250}
          scalePaddingWidth={15}
          scalePaddingHeight={20}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
