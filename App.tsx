import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { useFonts } from "expo-font";
import { Icon, PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_LOCAL_STORAGE, user } from "./models/globals";
import { useEffect, useState } from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessQRScreen } from "./screens/MessQRScreen";
import { NotificationScreen } from "./screens/NotificationScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { MessMenuScreen } from "./screens/MessMenuScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeStack } from "./stacks/HomeStack";
import { BusScreen } from "./screens/BusScreen";
import { MapScreen } from "./screens/MapScreen";
import { MiscScreen } from "./screens/MiscScreen";
import { OutletScreen } from "./screens/OutletScreen";
import { SplashScreen } from "./screens/SplashScreen";
import { MessStack } from "./stacks/MessStack";
import { OutletStack } from "./stacks/OutletStack";
import { MiscStack } from "./stacks/MiscStack";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      barStyle={{ backgroundColor: "#fffbfe" }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: "home",
        }}
      />
      <Tab.Screen
        name="MessTab"
        component={MessStack}
        options={{ tabBarLabel: "Mess", tabBarIcon: "silverware-fork-knife" }}
      />
      <Tab.Screen
        name="OutletsTab"
        component={OutletStack}
        options={{ tabBarLabel: "Outlets", tabBarIcon: "food" }}
      />
      {/* <Tab.Screen
        name="BusTab"
        component={BusScreen}
        options={{ tabBarLabel: "Bus", tabBarIcon: "bus" }}
      /> */}
      <Tab.Screen
        name="MiscTab"
        component={MiscStack}
        options={{ tabBarLabel: "More", tabBarIcon: "dots-horizontal" }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [loaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  // if (!loaded) {
  //   return null;
  // }

  const [page, setPage] = useState<string>("Welcome");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USER_LOCAL_STORAGE).then((data) => {
      if (data) {
        setPage("TabNav");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <PaperProvider>
        <View style={styles.container}>
          <Stack.Navigator initialRouteName={page}>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TabNav"
              component={TabNav}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar style="dark" />
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
