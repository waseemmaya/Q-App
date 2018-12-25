import React, { Component } from "react";
import {
  Text,
  Button,
  Icon,
  View,
  Title,
  Subtitle,
  TouchableOpacity
} from "@shoutem/ui";

export default class DomainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
            marginTop: 50,
            flex: 1
          }}
        >
          <Button
            styleName="secondary"
            onPress={() => {
              this.props.navigation.navigate("Companies");
            }}
          >
            <Icon name="web" />
            <Text style={{ fontSize: 20 }}>Companies</Text>
          </Button>
          <TouchableOpacity onPress={this.gotoCreateCompany}>
            <Subtitle style={{ marginTop: 10, fontSize: 16, color: "#757575" }}>
              Create Company Account
            </Subtitle>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1
          }}
        >
          <Button styleName="secondary">
            <Icon name="user-profile" />
            <Text style={{ fontSize: 20 }}>User</Text>
          </Button>
        </View>
      </View>
    );
  }

  gotoCreateCompany = () => {
    this.props.navigation.navigate("CreateCompany");
  };

  gotoCreateUser = () => {
    this.props.navigation.navigate("CreateUser");
  };
}
