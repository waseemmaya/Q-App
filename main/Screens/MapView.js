import React, { Component } from "react";
import { View, Text } from "react-native";
import { AppLoading } from "expo";
import { MapView as Map, Marker } from "expo";

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: null,
      coords: null
    };
  }

  render() {
    const { obj } = this.state;
    if (!obj) {
      return <AppLoading />;
    }
    return (
      <Map
        style={{ flex: 1 }}
        region={{
          latitude: obj.lat,
          longitude: obj.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Map.Marker
          coordinate={this.state.coords}
          title={this.props.navigation.state.params.locationObj.name}
        />
      </Map>
    );
  }

  componentDidMount() {
    console.log(
      "props",
      this.props.navigation.state.params.locationObj.location
    );
    const {
      lat,
      lng
    } = this.props.navigation.state.params.locationObj.location;
    let obj = {
      lat: lat,
      lng: lng
    };

    let newObj = {
      latitude: lat,
      longitude: lng
    };
    this.setState({
      obj,
      coords: newObj
    });
  }
}
