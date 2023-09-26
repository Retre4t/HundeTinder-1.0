import React from "react";
import AppNavigator from "./NavigationBar";
import { ThemeProvider } from "react-native-rapi-ui";

// Dette er din hovedapp-komponent.
export default function App() {
  return (
    // Jeg indpakker hele appen i ThemeProvider fra "react-native-rapi-ui".
    <ThemeProvider>
      {/* AppNavigator er ansvarlig for navigationen i appen. */}
      <AppNavigator />
    </ThemeProvider>
  );
}
