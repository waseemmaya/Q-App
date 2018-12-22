import React from "react";

import { Text, Button, Icon, View, Subtitle, Title } from "@shoutem/ui";
import { Font, AppLoading } from "expo";

export default class HomeScreen extends React.Component {
  state = {
    loaded: false
  };
  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => this.setState({ loaded: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        <View
          style={{
            flex: 1
          }}
        >
          <Text>This App is used for making Que.</Text>
        </View>
        <View
          style={{
            flex: 1
          }}
        >
          <Button styleName="secondary" onPress={this.login}>
            <Icon name="facebook" />
            <Text style={{ fontSize: 19 }}>Login With Facebook</Text>
          </Button>
        </View>
        <View
          style={{
            flex: 1
          }}
        />
      </View>
    );
  }

  login = () => {
    this.props.navigation.navigate("DomainScreen");
  };

  async loadFonts() {
    await Font.loadAsync({
      "Rubik-Regular": require("../fonts/Rubik-Regular.ttf"),
      "rubicon-icon-font": require("../fonts/rubicon-icon-font.ttf")
    });
  }
}
