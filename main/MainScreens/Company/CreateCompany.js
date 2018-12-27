import React from "react";

import {
  Image,
  Button,
  Icon,
  View,
  FormGroup,
  Text,
  DropDownMenu,
  TextInput,
  Subtitle,
  TouchableOpacity,
  Caption
} from "@shoutem/ui";

import { StyleSheet } from "react-native";

import { ImagePicker, Constants, Location, Permissions } from "expo";
import Autocomplete from "react-native-autocomplete-input";

import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import AwesomeAlert from "react-native-awesome-alerts";

import fire from "../../config/fire";

export default class CreateCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      since: "",
      address: "",
      uri1: null,
      uri2: null,
      uri3: null,
      timeArr: [],
      startTime: "",
      endTime: "",
      showAlert: false,
      downloadLinks: [],
      location: null,
      lat: "24.887389",
      long: "67.068363",
      mainArr: [],
      selectedLocation: "",
      searchArr: [],
      locationObj: null
    };
  }

  render() {
    const {
      startTime,
      endTime,
      showAlert,
      searchArr,
      mainArr,
      locationObj
    } = this.state;

    return (
      <ScrollView>
        <View
          style={{
            flex: 1
          }}
        >
          <FormGroup styleName="stretch">
            <Subtitle style={{ marginLeft: 12, marginTop: 10, color: "gray" }}>
              Company Name
            </Subtitle>

            <TextInput
              placeholder="i.e Panacloud"
              style={{
                borderBottomColor: "#E0E0E0",
                borderBottomWidth: 1,
                margin: 5
              }}
              onChangeText={name => this.setState({ name: name })}
            />
            <Subtitle style={{ marginLeft: 12, color: "gray" }}>Since</Subtitle>

            <TextInput
              placeholder="i.e 1996"
              style={{
                borderBottomColor: "#E0E0E0",
                borderBottomWidth: 1,
                margin: 5
              }}
              onChangeText={since => this.setState({ since: since })}
            />
            <Subtitle style={{ marginLeft: 12, color: "gray" }}>
              Address
            </Subtitle>
            {this.renderAutoComplete()}
            <Subtitle
              style={{ alignSelf: "center", marginTop: 8, color: "gray" }}
            >
              * Upload 3 Certificates Images
            </Subtitle>
            {this.renderUploadView()}
            <Subtitle style={{ marginLeft: 12, marginTop: 5, color: "gray" }}>
              Opening Time
            </Subtitle>
            {this.renderStartTime()}
            <Subtitle style={{ marginLeft: 12, marginTop: 5, color: "gray" }}>
              Closing Time
            </Subtitle>
            {this.renderEndTime()}
            <Caption
              style={{ alignSelf: "center", marginTop: 8, color: "gray" }}
            >
              {startTime &&
                endTime &&
                `Timings :    ${startTime.brand}  TO  ${endTime.brand}`}
            </Caption>

            <Button
              styleName="full-width secondary"
              onPress={this.uploadLoop}
              style={{
                marginTop: 8,
                marginBottom: 500
              }}
            >
              <Text>Create</Text>
            </Button>
          </FormGroup>
          <AwesomeAlert
            show={showAlert}
            showProgress={true}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            cancelText="No, cancel"
            confirmText="Yes, delete it"
            confirmButtonColor="#DD6B55"
          />
        </View>
      </ScrollView>
    );
  }

  renderAutoComplete = () => {
    const { searchArr } = this.state;
    return (
      <View style={{ flex: 1, paddingTop: 25 }}>
        <Autocomplete
          containerStyle={{ marginLeft: 10, marginRight: 10 }}
          data={searchArr}
          placeholder="Search your address "
          defaultValue={this.state.selectedLocation}
          onChangeText={searchKey => {
            this.searchLocation(searchKey);
          }}
          renderItem={item => (
            <TouchableOpacity onPress={() => this.selectLocation(item)}>
              <Text
                style={{
                  fontSize: 15,
                  margin: 5,
                  marginTop: 8,
                  marginBottom: 8
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  selectLocation = selectedLocation => {
    const { mainArr } = this.state;
    for (let i = 0; i < mainArr.length; i++) {
      if (mainArr[i].name === selectedLocation) {
        this.setState({
          locationObj: mainArr[i]
        });
      }
    }
    this.setState({
      selectedLocation: selectedLocation,
      searchArr: []
    });
  };

  searchLocation = searchKey => {
    this.setState({
      selectedLocation: searchKey,
      searchArr: [],
      mainArr: []
    });

    const { searchArr, mainArr } = this.state;
    let url = `https://api.foursquare.com/v2/venues/search?client_id=ES4PK425E5FW4JM5MKTCWBHL31XGER1LM5MMTOIQ3OQHW30F&client_secret=3HSB3BMHL3FMOFB4BKNA4JA4JU3JO44WH5NMB5FBVM50S31L&query=${searchKey}&near=karachi&v=20181225&limit=5`;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(val => {
        let { venues } = val.response;

        venues.map((val, i) => {
          searchArr.push(val.name);
          mainArr.push(val);
          this.setState({
            searchArr,
            mainArr
          });
          if (!this.state.selectedLocation.length) {
            this.setState({
              searchArr: []
            });
          }
          return;
        });
      });
  };

  saveData = () => {
    const {
      name,
      since,
      startTime,
      lat,
      long,
      locationObj,
      uid,
      selectedLocation,
      endTime,
      downloadLinks
    } = this.state;

    let createdAt = new Date();

    let obj = {
      name,
      since,
      lat,
      long,
      locationObj,
      downloadLinks,
      selectedLocation,
      startTime: startTime.brand,
      endTime: endTime.brand,
      momentDate: moment().format(),
      createdAt: createdAt,
      date: new Date().toLocaleString(),
      estimatedTokenTime: "05",
      tokens: 0
    };

    let comapnyRef = fire.database().ref(`Comapnies/${uid}`);
    comapnyRef
      .push()
      .set(obj)
      .then(() => {
        console.log("pushed");
        this.props.navigation.navigate("MyCompanies");
        this.setState({
          showAlert: false
        });
      })
      .catch(err => {
        this.setState({
          showAlert: false
        });
      });
  };

  uploadLoop = () => {
    this.setState({
      showAlert: true
    });
    const {
      uri1,
      uri2,
      uri3,
      name,
      since,
      startTime,
      endTime,
      locationObj
    } = this.state;
    if (
      uri1 &&
      uri2 &&
      uri3 &&
      name &&
      since &&
      locationObj &&
      startTime &&
      endTime
    ) {
      const imgArr = [uri1, uri2, uri3];
      for (let i = 0; i < imgArr.length; i++) {
        this.uploadImageAsync(imgArr[i]);
      }
    } else {
      this.setState({
        showAlert: false
      });
      console.log("UploadLoop ====> Fill out all Fields");
    }
  };

  uploadImageAsync = async uri => {
    const { downloadLinks } = this.state;
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    var filename = Math.floor(100444234000 + Math.random() * 9032012000);

    const ref = fire.storage().ref(`Pics/${filename}`);
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL().then(downloadURL => {
      console.log("downloadURL----->", downloadURL);
      downloadLinks.push(downloadURL);
      this.setState({
        downloadLinks
      });
      if (this.state.downloadLinks.length === 3) {
        this.saveData();
      }
    });
  };

  componentDidMount() {
    let uid = this.props.navigation.state.params;
    this.setState({
      uid: uid
    });
    this.makeList();
  }

  makeList = () => {
    const { timeArr } = this.state;

    for (let i = 1; i < 13; i++) {
      let n = i.toString();
      timeArr.push({
        brand: `${n.length > 1 ? `${n}:00 AM` : `0${n}:00 AM`}`,
        opt: n
      });
      this.setState({
        timeArr
      });
    }

    for (let i = 1; i < 13; i++) {
      let n = i.toString();
      timeArr.push({
        brand: `${n.length > 1 ? `${n}:00 PM` : `0${n}:00 PM`}`,
        opt: n
      });
      this.setState({
        timeArr
      });
    }
  };

  renderStartTime = () => {
    const startTime = this.state.startTime || this.state.timeArr[2];
    return (
      <DropDownMenu
        styleName="horizontal h-center"
        options={this.state.timeArr}
        selectedOption={startTime ? startTime : this.state.timeArr[0]}
        onOptionSelected={val => this.setState({ startTime: val })}
        titleProperty="brand"
        valueProperty="timeArr.opt"
      />
    );
  };

  renderEndTime = () => {
    const endTime = this.state.endTime || this.state.timeArr[7];
    return (
      <DropDownMenu
        styleName="horizontal h-center"
        options={this.state.timeArr}
        selectedOption={endTime ? endTime : this.state.timeArr[0]}
        onOptionSelected={val => this.setState({ endTime: val })}
        titleProperty="brand"
        valueProperty="timeArr.opt"
      />
    );
  };

  renderUploadView = () => {
    const { uri1, uri2, uri3 } = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View style={{ padding: 4 }}>
          {!uri1 ? (
            <Button
              onPress={this.selectUri1}
              styleName="clear"
              style={{
                color: "gray",
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: "center"
              }}
            >
              <Icon name="photo" />
              <Subtitle style={{ color: "gray" }}>Image 1</Subtitle>
            </Button>
          ) : (
            <TouchableOpacity onPress={this.selectUri1}>
              <Image
                styleName="medium"
                source={{
                  uri: uri1
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ padding: 4 }}>
          {!uri2 ? (
            <Button
              onPress={this.selectUri2}
              styleName="clear"
              style={{
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: "center"
              }}
            >
              <Icon name="photo" />
              <Subtitle style={{ color: "gray" }}>Image 2</Subtitle>
            </Button>
          ) : (
            <TouchableOpacity onPress={this.selectUri2}>
              <Image
                styleName="medium"
                source={{
                  uri: uri2
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ padding: 4 }}>
          {!uri3 ? (
            <Button
              onPress={this.selectUri3}
              styleName="clear"
              style={{
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: "center"
              }}
            >
              <Icon name="photo" />
              <Subtitle style={{ color: "gray" }}>Image 3</Subtitle>
            </Button>
          ) : (
            <TouchableOpacity onPress={this.selectUri3}>
              <Image
                styleName="medium"
                source={{
                  uri: uri3
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  selectUri1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ uri1: result.uri });
    }
  };

  selectUri2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ uri2: result.uri });
    }
  };

  selectUri3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ uri3: result.uri });
    }
  };
}
