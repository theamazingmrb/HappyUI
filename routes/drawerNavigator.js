import { createDrawerNavigator } from "@react-navigation/drawer";
import { createAppContainer } from "react-navigation";
import Landing from "../screens/landingScreen";
import Home from "../screens/home";
import About from "../screens/about";
import LandingScreen from "../screens/landingScreen";

const Drawer = createDrawerNavigator();

const RootDrawerNavigator = createDrawerNavigator({
  Landing: {
    screen: LandingScreen,
  },
  Home: {
    screen: Home,
  },
  About: {
    screen: About,
  },
});

export default createAppContainer(RootDrawerNavigator);
