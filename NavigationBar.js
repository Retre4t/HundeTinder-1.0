import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "./components/TabBarIcon";
import TabBarText from "./components/TabBarText";

import AnimalCardScreen from "./views/AnimalCardScreen";
import signUpScreen from "./views/signUp";
import About from "./views/About";
import profileScreen from "./views/Profile";
import Signup from "./views/signUp";


// Opret en staknavigation til hovedskærmen.
const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="signUpScreen" component={signUpScreen} />
    </MainStack.Navigator>
  );
};

// Opret en bundfanenavigation til hovedskærmen.
const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* Disse skærme er faner i bundnavigationen. */}
      <Tabs.Screen
        name="AnimalCardScreen"
        component={AnimalCardScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="AnimalCardScreen" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-AnimalCardScreen"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profileScreen"
        component={profileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="profileScreen" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} />
          ),
        }}
      />
      <Tabs.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="About" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"ios-information-circle"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Sign Up"
        component={Signup}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Sign up" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"ios-information-circle"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
