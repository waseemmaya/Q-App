import React from "react";

import { Text, Button, Icon, View, Title } from "@shoutem/ui";

export default class CreateUser extends React.Component {
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
            flex: 1
          }}
        />
        <View
          style={{
            flex: 1
          }}
        >
          <Title>Create User</Title>
        </View>
        <View
          style={{
            flex: 1
          }}
        />
      </View>
    );
  }
}
