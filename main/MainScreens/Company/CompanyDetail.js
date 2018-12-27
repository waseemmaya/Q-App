import React, { Component } from "react";

import {
  Card,
  View,
  Subtitle,
  Icon,
  Text,
  Caption,
  Image,
  Title,
  Heading,
  Row,
  Button,
  InlineGallery,
  Divider
} from "@shoutem/ui";
import { ScrollView } from "react-native";
import moment from "moment";
import { AppLoading } from "expo";
import fire from "../../config/fire";

export default class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyOBJ: null,
      arr: [],
      a: "",
      color: "#1b1b1b"
    };
  }

  render() {
    const { companyOBJ, arr, color } = this.state;
    console.log("arr==>", arr);

    if (!companyOBJ) {
      return <AppLoading />;
    }
    return (
      <ScrollView>
        <InlineGallery styleName="large-banner" data={arr} />
        <Row>
          <View styleName="vertical stretch space-between">
            <Subtitle style={{ fontSize: 22 }}>
              {companyOBJ.locationObj.name}
            </Subtitle>
            <Caption>{moment(companyOBJ.momentDate).fromNow()}</Caption>
          </View>
          <Button
            styleName="right-icon"
            onPress={() => {
              this.props.navigation.navigate("MapView", companyOBJ);
            }}
          >
            <Icon name="address" />
          </Button>
        </Row>
        <Divider styleName="line" />
        <Row>
          <View styleName="vertical stretch space-between">
            <Subtitle style={{ fontSize: 18 }}>Running Token</Subtitle>
            <Caption>Next Available Token : {companyOBJ.tokens + 1}</Caption>
          </View>
          <Button
            styleName="right-icon"
            style={{ marginRight: 8, color: color }}
          >
            <Heading>{companyOBJ.tokens}</Heading>
          </Button>
        </Row>
        <Button styleName="secondary">
          <Icon name="add-friend" />
          <Text>Get My Token</Text>
        </Button>
      </ScrollView>
    );
  }

  getCompany = () => {
    let { arr } = this.state;

    let { id, postedBy } = this.props.navigation.state.params;
    // console.log("postID===>", id);
    // console.log("UID===>", postedBy);

    let ref = fire.database().ref(`Comapnies/${postedBy}/${id}`);
    ref.on("value", snap => {
      let imgArr = snap.val().downloadLinks;
      // console.log("imgArr---->", imgArr);

      for (let i = 0; i < imgArr.length; i++) {
        console.log(imgArr[i]);

        let obj = {
          source: {
            uri: imgArr[i]
          }
        };
        arr.push(obj);
        this.setState({
          arr
        });
      }

      this.setState({
        companyOBJ: snap.val(),
        color: "red"
      });
      setTimeout(() => {
        this.setState({
          color: "#1b1b1b"
        });
      }, 900);
    });
  };

  componentDidMount() {
    this.getCompany();
  }
}
