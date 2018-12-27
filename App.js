import { createStackNavigator, createAppContainer } from "react-navigation";
import { Dimensions } from "react-native";

// Main Outside
import HomeScreen from "./main/MainScreens/HomeScreen";
import DomainScreen from "./main/MainScreens/DomainScreen";
import MapView from "./main/MainScreens/MapView";

// User
import CreateUser from "./main/MainScreens/User/CreateUser";

// Company
import MyCompanies from "./main/MainScreens/Company/MyCompanies";
import CompanyDetail from "./main/MainScreens/Company/CompanyDetail";
import CreateCompany from "./main/MainScreens/Company/CreateCompany";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Home`,
      headerBackTitle: "Hello",
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        width: Dimensions.get("window").width
      }
    })
  },
  DomainScreen: {
    screen: DomainScreen,
    navigationOptions: () => ({
      title: `Select Domain`,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        width: Dimensions.get("window").width
      }
    })
  },
  CreateCompany: {
    screen: CreateCompany,
    navigationOptions: () => ({
      title: `Create Company`,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        width: Dimensions.get("window").width
      }
    })
  },
  CreateUser: {
    screen: CreateUser,
    navigationOptions: () => ({
      title: `Select User`,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        width: Dimensions.get("window").width
      }
    })
  },
  MyCompanies: {
    screen: MyCompanies,
    navigationOptions: () => ({
      title: `Comapanies`,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        width: Dimensions.get("window").width
      }
    })
  },
  CompanyDetail: {
    screen: CompanyDetail,
    navigationOptions: () => ({
      title: `CompanyDetail`,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        width: Dimensions.get("window").width
      }
    })
  },
  MapView: {
    screen: MapView,
    navigationOptions: () => ({
      title: `MapView`,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        width: Dimensions.get("window").width
      }
    })
  }
});

const App = createAppContainer(AppNavigator);

export default App;

// this.props.navigation.navigate('Home')
