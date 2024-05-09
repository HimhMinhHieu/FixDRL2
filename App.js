import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";
import { StyleSheet } from "react-native";
import Home from "./components/Home/Home";
import userReducer from "./Reducer/userReducer/userReducer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserContext from "./Context/userContext/userContext";
import Login from "./components/Login/Login";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigation, PaperProvider, Text } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Logout from "./components/Logout/Logout";
import Signup from "./components/Signup/Signup";

const Tab = createBottomTabNavigator();

// const Login = () => <Text>Login</Text>;

export default function App() {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <PaperProvider>
      <UserContext.Provider value={[user, dispatch]}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
              <BottomNavigation.Bar
                navigationState={state}
                safeAreaInsets={insets}
                onTabPress={({ route, preventDefault }) => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (event.defaultPrevented) {
                    preventDefault();
                  } else {
                    navigation.dispatch({
                      ...CommonActions.navigate(route.name, route.params),
                      target: state.key,
                    });
                  }
                }}
                renderIcon={({ route, focused, color }) => {
                  const { options } = descriptors[route.key];
                  if (options.tabBarIcon) {
                    return options.tabBarIcon({ focused, color, size: 24 });
                  }

                  return null;
                }}
                getLabelText={({ route }) => {
                  const { options } = descriptors[route.key];
                  const label =
                    options.tabBarLabel !== undefined
                      ? options.tabBarLabel
                      : options.title !== undefined
                      ? options.title
                      : route.title;

                  return label;
                }}
              />
            )}
          >
            {user === null ? (
              <>
                <Tab.Screen
                  name="Login"
                  component={Login}
                  options={{
                    tabBarLabel: "Login",
                    tabBarIcon: ({ color, size }) => {
                      return <Icon name="login" size={size} color={color} />;
                    },
                  }}
                />
                <Tab.Screen name="Signup" component={Signup} options={{
                    tabBarLabel: "Signup",
                    tabBarIcon: ({ color, size }) => {
                      return <Icon name="account-plus-outline" size={size} color={color} />;
                    },
                  }}/>
              </>
            ) : (
              <>
                <Tab.Screen
                  name="Home"
                  component={Home}
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => {
                      return <Icon name="home" size={size} color={color} />;
                    },
                  }}
                />
              </>
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
