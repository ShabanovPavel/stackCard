import React, { Component } from "react";
import { View } from "react-native";
//Вид карточки возможно содержиние еще чего-нибудь)
export default class Card extends Component {
  render() {
    const { content } = this.props;
    return (
      <View style={{ flex: 1, borderRadius: 10, ...content.props.style }}>
        {content}
      </View>
    );
  }
}
