import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./main/Screens/HomeScreen";
import DomainScreen from "./main/Screens/DomainScreen";
import Companies from "./main/Screens/Companies";
import CompanyDetail from "./main/Screens/CompanyDetail";
import CreateCompany from "./main/Screens/Create/CreateCompany";
import CreateUser from "./main/Screens/Create/CreateUser";
import { Dimensions } from "react-native";
import MapView from "./main/Screens/MapView";

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
  Companies: {
    screen: Companies,
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
