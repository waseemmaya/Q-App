import React, { Component } from "react";

import {
  Image,
  Row,
  View,
  Text,
  InlineGallery,
  Title,
  Touchable
} from "@shoutem/ui";

export default class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: []
    };
  }

  render() {
    return (
      <View>
        <Title style={{ alignSelf: "center", marginTop: 20 }}>
          {this.props.navigation.state.params.locationObj.name}
        </Title>
        <InlineGallery styleName="large-wide" data={this.state.arr} />
      </View>
    );
  }

  componentDidMount() {
    let { downloadLinks } = this.props.navigation.state.params;

    let { arr } = this.state;
    for (let i = 0; i < downloadLinks.length; i++) {
      let obj = {
        source: {
          uri: downloadLinks[i]
        }
      };
      arr.push(obj);
      this.setState({
        arr
      });
    }
  }
}
