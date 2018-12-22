import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./main/Screens/HomeScreen";
import DomainScreen from "./main/Screens/DomainScreen";
import { Dimensions } from "react-native";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Home`,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "#f4511e"
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
        backgroundColor: "#f4511e"
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
