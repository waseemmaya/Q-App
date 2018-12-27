import React from "react";

import { Text, Button, Icon, View, Title } from "@shoutem/ui";
import { Font, AppLoading } from "expo";

import fire from "../config/fire";

const APP_ID = "354264045362356";
import { AsyncStorage } from "react-native";

export default class HomeScreen extends React.Component {
  state = {
    loaded: false,
    uid: ""
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
          <Button styleName="secondary" onPress={this.login}>
            <Icon name="facebook" />
            <Text style={{ fontSize: 19 }}>Login With Facebook</Text>
          </Button>
          <Button styleName="secondary" onPress={this._storeData}>
            <Icon name="facebook" />
            <Text style={{ fontSize: 19 }}>Save Data</Text>
          </Button>
          <Button styleName="secondary" onPress={this._removeData}>
            <Icon name="facebook" />
            <Text style={{ fontSize: 19 }}>Remove Data</Text>
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

  _storeData = async uid => {
    try {
      await AsyncStorage.setItem("uid", uid).then(() => {
        this.props.navigation.navigate("DomainScreen", uid);
      });
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("uid");
      if (value !== null) {
        this.props.navigation.replace("MyCompanies", value);
      } else {
        console.log("no value found");
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _removeData = async () => {
    try {
      await AsyncStorage.removeItem("uid");
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidMount() {
    this._retrieveData();
  }

  checkUser = () => {};

  login = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
        permissions: ["public_profile"]
      });
      if (type === "success") {
        fetch(`https://graph.facebook.com/me?access_token=${token}`)
          .then(res => res.json())
          .then(val => {
            let obj = {
              name: val.name,
              id: val.id
            };

            this.setState({
              uid: val.id
            });

            let userRef2 = fire.database().ref(`Users/${val.id}`);
            userRef2.set(obj).then(() => {
              this._storeData(this.state.uid);
            });
          });

        // Alert.alert("Logged isn!", `Hi ${(await response.json()).name}!`);
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
