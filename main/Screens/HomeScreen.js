import React from "react";

import { Text, Button, Icon, View, Title } from "@shoutem/ui";
import { Font, AppLoading } from "expo";

import fire from "../config/fire";

const APP_ID = "354264045362356";

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
          <Title style={{ alignSelf: "center", marginTop: 20 }}>
            This App is used for making Que.
          </Title>
        </View>
        <View
          style={{
            flex: 1
          }}
        >
          <Button
            styleName="secondary"
            onPress={() => {
              this.props.navigation.navigate("DomainScreen");
            }}
          >
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

  login = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
        permissions: ["public_profile", "user_gender", "user_photos"]
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        fetch(`https://graph.facebook.com/me?access_token=${token}`)
          .then(res => res.json())
          .then(val => {
            let obj = {
              name: val.name,
              id: val.id
            };

            let userRef2 = fire.database().ref(`QUsers/${val.id}`);
            userRef2.set(obj).then(() => {
              this.props.navigation.navigate("DomainScreen");
            });
          });

        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  async loadFonts() {
    await Font.loadAsync({
      "Rubik-Regular": require("../fonts/Rubik-Regular.ttf"),
      "Rubik-Medium": require("../fonts/Rubik-Medium.ttf"),
      "rubicon-icon-font": require("../fonts/rubicon-icon-font.ttf")
    });
  }
}
