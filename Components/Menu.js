import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import { Icon } from "expo";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU",
      }),
    updateName: (name) =>
      dispatch({
        type: "UPDATE_NAME",
        name,
      }),
    updateAvatar: (avatar) =>
      dispatch({
        type: "UPDATE_AVATAR",
        avatar,
      }),
  };
}

const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight),
  };

  componentDidMount() {
    this.toggleMenu();
  }
  componentDidUpdate() {
    this.toggleMenu();
  }
  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, {
        toValue: 54,
        useNativeDriver: false,
      }).start();
    }
    if (this.props.action == "closeMenu") {
      alert("rwached");
      Animated.spring(this.state.top, {
        toValue: screenHeight,
        useNativeDriver: false,
      }).start();
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require("../assets/background8.jpg")} />
          <Title>Sid</Title>
          <Subtitle>Phone number-verified</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.props.closeMenu}
          style={{
            position: "absolute",
            top: 120,
            left: "50%",
            marginLeft: -22,
            zIndex: 1,
          }}
        >
          <CloseView>
            {/* <Closeimg source={require("../assets/close.svg")} /> */}
            <Image source={require("../assets/happyeater.png")} />
            {/* <Icon.Ionicons name="ios-close" size={44} color="#546bfb" /> */}
          </CloseView>
        </TouchableOpacity>
        <Content>
          {items.map((item, index) => (
            <MenuItem
              key={index}
              pic={item.pic}
              title={item.title}
              text={item.text}
            />
          ))}
          <MenuItem />
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const Closeimg = styled.Image``;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  height: ${screenHeight};

  background: #f0f3f5;
`;
const items = [
  {
    title: "Account",
    text: "settings",
  },
  {
    title: "Billing",
    text: "payments",
  },
  {
    title: "Learn React",
    text: "start course",
  },
  {
    title: "Log out",
    text: "see you soon!",
  },
];
