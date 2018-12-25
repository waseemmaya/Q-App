import React, { Component } from "react";

import {
  Image,
  Row,
  View,
  Title,
  Subtitle,
  Text,
  Button,
  Caption,
  Touchable
} from "@shoutem/ui";
import { AppLoading } from "expo";

import fire from "../config/fire";
import { Image as Img, ScrollView } from "react-native";

export default class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: []
    };
  }

  render() {
    const { arr } = this.state;
    if (arr.length === 0) {
      return <AppLoading />;
    }
    return (
      <ScrollView>
        <View>
          <Title style={{ alignSelf: "center", marginTop: 20 }}>
            Companies
          </Title>
          {this.renderCompanies()}
        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
    const { arr } = this.state;
    let ref = fire.database().ref("Comapnies");
    ref.on("child_added", snap => {
      arr.push({
        ...snap.val(),
        id: snap.key
      });
      this.setState({
        arr
      });
      // console.log("snap===>", snap.val());
    });
  }

  renderCompanies = () => {
    const { arr } = this.state;
    return (
      <View>
        {arr.map((val, i) => {
          if (val.locationObj.categories) {
            let a = `${val.locationObj.categories[0].icon.prefix}bg_32${
              val.locationObj.categories[0].icon.suffix
            }`;
            console.log("a===>", a);
          }

          return (
            <Row key={i + "a"}>
              <Touchable
                onPress={() => {
                  this.props.navigation.navigate("CompanyDetail", val);
                }}
              >
                <Image
                  style={{ marginRight: 8 }}
                  styleName="medium rounded-corners"
                  source={{
                    uri: val.downloadLinks[1]
                  }}
                />
              </Touchable>
              <View styleName="vertical stretch space-between">
                <Touchable
                  onPress={() => {
                    this.props.navigation.navigate("CompanyDetail", val);
                  }}
                >
                  <Subtitle>{val.locationObj.name}</Subtitle>
                </Touchable>

                <View styleName="horizontal space-between">
                  <Caption style={{ fontSize: 11 }}>
                    {val.locationObj.categories
                      ? val.locationObj.categories[0].name
                      : "Work"}
                  </Caption>
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate("MapView", val);
                    }}
                  >
                    <Caption style={{ fontSize: 14 }}>View on Map</Caption>
                    {/* <Text>View on Map</Text> */}
                  </Button>
                </View>
              </View>
            </Row>
          );
        })}
      </View>
    );
  };
}
