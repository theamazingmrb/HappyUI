import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import About from "../screens/about";

const screens = {
  About: {
    screen: About,
    navigationOptions: {
      title: "About",
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
