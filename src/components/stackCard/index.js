import React, { Component } from "react";
import { StyleSheet, View, Dimensions, ToastAndroid } from "react-native";
import Card from "./card";
import Move from "./move";
import Swipe from "./swipe";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default class StackCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _cards: props.cards,
      viewList: [],
      stackTargetCardEnd: [],
      targetRefCardFirst: undefined,
      targetRefCardEnd: undefined,
    };
  }

  async componentDidMount() {
    await this.updateViewList();
  }

  async updateViewList() {
    let viewList = this.state._cards
      .slice(this.state._cards.length - this.props.sizeStack)
      .map((item, index) => {
        return (
          <Move
            key={index}
            getRef={ref => this.setState({ targetRefCardFirst: ref })}
            index={index}
            speedAnimation={this.props.speedAnimation}
            item={<Card content={item} />}
            heightCard={this.props.heightCard}
            widthCard={this.props.widthCard}
            scalePaddingWidth={this.props.scalePaddingWidth}
            scalePaddingHeight={this.props.scalePaddingHeight}
          />
        );
      });

    this.setState({ viewList: [...viewList] });
  }

  leftSwipe() {
    const newTargetRefCardEnd = [...this.state.stackTargetCardEnd];
    const lengthStackRefCardEnd = newTargetRefCardEnd.length;
    newTargetRefCardEnd.pop();

    this.setState({
      stackTargetCardEnd: newTargetRefCardEnd,
      targetRefCardEnd: newTargetRefCardEnd[lengthStackRefCardEnd - 2],
    });

    if (lengthStackRefCardEnd) {
      let newCards = this.state._cards;
      newCards.push(newCards.shift());
      this.setState({ _cards: newCards });
      this.updateViewList();
      this.state.targetRefCardFirst.movedSwipe(SCREEN_WIDTH);
      this.state.targetRefCardFirst.animatedBack();
    } else {
      ToastAndroid.show("Stack empty!", ToastAndroid.SHORT);
    }
  }

  rightSwipe() {
    this.setState({
      stackTargetCardEnd: [
        ...this.state.stackTargetCardEnd,
        this.state.targetRefCardFirst,
      ],
    });

    this.state.targetRefCardFirst.animatedSwipe(SCREEN_WIDTH, () => {
      let newCards = this.state._cards;
      newCards.unshift(newCards.pop());
      this.setState({ _cards: newCards });
      this.updateViewList();
      this.state.targetRefCardFirst.movedSwipe(0);
    });
  }

  resetSwipe() {
    this.state.targetRefCardFirst.animatedReset();
  }

  movedRightSwipe(gestureState) {
    this.state.targetRefCardFirst.movedSwipe(gestureState.dx);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Swipe
          leftSwipe={() => this.leftSwipe()}
          rightSwipe={() => this.rightSwipe()}
          resetSwipe={() => this.resetSwipe()}
          movedRightSwipe={x => this.movedRightSwipe(x)}
          sensitivitySwipe={this.props.sensitivitySwipe}
        >
          <View style={styles.stack}>{this.state.viewList}</View>
        </Swipe>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  stack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
