import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
import React, { Component } from "react";

import {
  Image,
  Row,
  View,
  Subtitle,
  ScrollView,
  Button,
  Title,
  Caption,
  Icon,
  Touchable,
  Heading
} from "@shoutem/ui";
import { AppLoading } from "expo";

import fire from "../../config/fire";

export default class MyCompanies extends Component {
  constructor(props) {
    super(props);
    let uid = this.props.navigation.state.params;

    this.state = {
      obj: null,
      arr: [],
      testName: "start",
      color: "#1b1b1b",
      ref: fire.database().ref(`Comapnies/${uid}`)
    };
  }

  render() {
    const { arr } = this.state;
    if (arr.length === 0) {
      return <AppLoading />;
    }
    return <ScrollView>{this.renderCompanies()}</ScrollView>;
  }

  fetchData = () => {
    let ref = fire.database().ref("Test/-LUka6OraojA1HZH-uQT");
    ref.on("value", snap => {
      console.log("snap---->", snap.val().name);

      this.setState({
        obj: snap.val(),
        color: "red"
      });
      setTimeout(() => {
        this.setState({
          color: "#1b1b1b"
        });
      }, 900);
    });
  };

  renderView = () => {
    const { obj, color } = this.state;
    return (
      <View>
        <Title>{this.state.testName}</Title>
        <Title>Token No </Title>
        <Heading style={{ color: color }}>{obj && obj.tokens}</Heading>
      </View>
    );
  };

  componentDidMount() {
    const { arr, ref } = this.state;
    ref.on("child_added", snap => {
      arr.push({
        ...snap.val(),
        id: snap.key
      });
      this.setState({
        arr
      });
    });
  }

  componentWillUnmount = () => {
    this.state.ref.off();
  };

  renderCompanies = () => {
    const { arr } = this.state;

    return (
      <View>
        {arr.map((val, i) => {
          return (
            <Touchable
              key={i + "a"}
              onPress={() => {
                this.props.navigation.navigate("CompanyDetail", val);
              }}
            >
              <Row>
                <Image
                  styleName="small rounded-corners"
                  source={{ uri: val.downloadLinks[1] }}
                />
                <View styleName="vertical stretch space-between">
                  <Subtitle>{val.locationObj.name}</Subtitle>
                  <Caption style={{ fontSize: 11 }}>
                    Opens {val.startTime[0]}
                    {val.startTime[1]}
                    {val.startTime[6]}
                    {val.startTime[7]} To {val.endTime[0]}
                    {val.endTime[1]}
                    {val.endTime[6]}
                    {val.endTime[7]}
                  </Caption>
                </View>
              </Row>
            </Touchable>
          );
        })}
      </View>
    );
  };
}
