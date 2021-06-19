import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import About from "../screens/about";
import Test from "../screens/test";

const screens = {
  About: {
    screen: About,
    navigationOptions: {
      title: "About",
    },
  },
  Test: {
    screen: Test,
    navigationOptions: {
      title: "Test",
    },
  },
};

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    HeaderTintColor: "#444",
    headerStyle: { backGroundColor: "#eee", height: 60 },
  },
});

export default AboutStack;
