import React from "react";
import AppNavigator from "./NavigationBar";
import { ThemeProvider } from "react-native-rapi-ui";
export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}