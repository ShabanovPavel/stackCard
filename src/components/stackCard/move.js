import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";
//Обертка над карточкой отвечающая за перемещение этой карточки
export default class Move extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Xposition: new Animated.Value(0),
      Yposition: new Animated.Value(props.index * props.scalePaddingHeight),
    };
    this.cardSizeWidth = new Animated.Value(
      props.index * props.scalePaddingWidth + this.props.widthCard
    );
    this.cardSizeHeight = new Animated.Value(
      props.index * props.scalePaddingHeight + this.props.heightCard
    );
    props.getRef(this);
  }

  movedSwipe(dx) {
    this.state.Xposition.setValue(dx);
  }

  render() {
    const { item } = this.props;
    const rotateCard = this.state.Xposition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-20deg", "0deg", "20deg"],
    });

    const cardStyle = {
      width: this.cardSizeWidth,
      height: this.cardSizeHeight,
      transform: [
        { translateX: this.state.Xposition },
        { translateY: this.state.Yposition },
        { rotate: rotateCard },
      ],
    };

    return (
      <View style={styles.container}>
        <Animated.View style={cardStyle}>{item}</Animated.View>
      </View>
    );
  }

  animatedSwipe = (toValue, callBack) =>
    Animated.timing(
      this.state.Xposition,
      {
        toValue: toValue + this.props.widthCard,
        duration: this.props.speedAnimation,
      },
      { useNativeDriver: true }
    ).start(callBack);

  animatedBack = () =>
    Animated.spring(
      this.state.Xposition,
      {
        toValue: 0,
        speed: 5,
        bounciness: 15,
      },
      { useNativeDriver: true }
    ).start();

  animatedReset = () =>
    Animated.spring(
      this.state.Xposition,
      {
        toValue: 0,
        speed: 5,
        bounciness: 15,
      },
      { useNativeDriver: true }
    ).start();
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
  },
});
