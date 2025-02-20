import { Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import NewsDetails from "../screens/NewsDetails";
import WelcomeScreen from "../screens/WelcomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreens from "../screens/SplashScreens";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import { useColorScheme } from "nativewind";

const android = Platform.OS === "android";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Inicio") {
              iconName = "home";
            } else if (route.name === "Calendario") {
              iconName = "compass-outline";
            } else if (route.name === "Guardado") {
              iconName = "bookmark-outline";
            } else if (route.name === "Buscar") {
              iconName = "search-outline";
            }

            const customizeSize = 25;

            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? "blue" : "gray"}
              />
            );
          },

          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "SpaceGroteskMedium",
            // paddingBottom: 10,
          },
          tabBarStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "white",
            // borderTopWidth: 0,
            // padding: 10,
            // height: 60,
          },
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Calendario" component={DiscoverScreen} />
        <Tab.Screen name="Guardado" component={SavedScreen} />
        <Tab.Screen name="Buscar" component={SearchScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashS"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashS" component={SplashScreens} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
