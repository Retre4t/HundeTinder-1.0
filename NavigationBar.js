import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "./components/TabBarIcon";
import TabBarText from "./components/TabBarText";

import AnimalCardScreen from "./views/AnimalCardScreen";
import SignUpScreen from "./views/SignUp";
import SignInScreen from "./views/SignIn";
import CategorySelect from "./views/CategorySelect";



import About from "./views/About";
import profileScreen from "./views/Profile";

// Opretter en stacknavigation til hovedskærmen.
const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="SignInScreen" component={SignInScreen} />
      <MainStack.Screen name="CategorySelect" component={CategorySelect} />
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <MainStack.Screen name="AnimalCards" component={AnimalCardScreen} />
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
            <TabBarText focused={focused} title="Find a friend" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-AnimalCardScreen"} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={profileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Profile" />
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

