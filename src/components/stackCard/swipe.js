import React, { Component } from "react";
import { View, PanResponder } from "react-native";

//Контроллер жестов, для выбора дейтсвий
export default class Swipe extends Component {
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0) this.props.movedRightSwipe(gestureState);
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > this.props.sensitivitySwipe) {
          gestureState.dx > 0
            ? this.props.rightSwipe()
            : this.props.leftSwipe();
        } else {
          this.props.resetSwipe();
        }
      },
    });
  }

  render() {
    return (
      <View
        {...this.panResponder.panHandlers}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        {this.props.children}
      </View>
    );
  }
}
