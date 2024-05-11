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
import UserDetail from "./components/userDetail/userDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HoatDongDetail from "./components/ActivityDetail/ActivityDetail";
import HomeRoute from "./Route/HomeRoute/HomeRoute";
import MyFAB from "./components/MyFAB/MyFAB";
import LikeContext from "./Context/LikeContext/LikeContext";
import Api, { endpoints } from "./ApisService/Api";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const Login = () => <Text>Login</Text>;

function HomeTabs() {
  const [user, dispatch] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={[user, dispatch]}>
      
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
              screenOptions={{ headerShown: true }}
              options={{
                tabBarLabel: "Login",
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="login" size={size} color={color} />;
                },
                title: "Login",
              }}
            />
            <Tab.Screen
              name="Signup"
              component={Signup}
              options={{
                tabBarLabel: "Signup",
                tabBarIcon: ({ color, size }) => {
                  return (
                    <Icon
                      name="account-plus-outline"
                      size={size}
                      color={color}
                    />
                  );
                },
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Home"
              component={Home}
              screenOptions={{ headerShown: true }}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="home" size={size} color={color} />;
                },
                title: "Home",
              }}
            />
            <Tab.Screen
              name="UserDetail"
              component={UserDetail}
              screenOptions={{ headerShown: true }}
              options={{
                tabBarLabel: "User Detail",
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="home-account" size={size} color={color} />;
                },
              }}
            />
            {/* <Stack.Screen name="User Detail" component={UserDetail} /> */}
          </>
        )}
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

const countLike = async () => {
  const res = await Api.get(endpoints["hoatdongs"]);

}

export default function App() {
  const [user, dispatch] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={[user, dispatch]}>
      {/* <LikeContext.Provider value={} > */}
      <PaperProvider>
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
                  screenOptions={{ headerShown: true }}
                  options={{
                    tabBarLabel: "Login",
                    tabBarIcon: ({ color, size }) => {
                      return <Icon name="login" size={size} color={color} />;
                    },
                    title: "Login",
                  }}
                />
                <Tab.Screen
                  name="Signup"
                  component={Signup}
                  screenOptions={{ headerShown: true }}
                  options={{
                    tabBarLabel: "Signup",
                    tabBarIcon: ({ color, size }) => {
                      return (
                        <Icon
                          name="account-plus-outline"
                          size={size}
                          color={color}
                        />
                      );
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Tab.Screen
                  name="Home Route"
                  component={HomeRoute}
                  screenOptions={{ headerShown: false }}
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => {
                      return <Icon name="home" size={size} color={color} />;
                    },
                    title: "Home",
                  }}
                />
                {/* <Tab.Screen
                  name="UserDetail"
                  component={UserDetail}
                  screenOptions={{ headerShown: true }}
                  options={{
                    tabBarLabel: "User Detail",
                    tabBarIcon: ({ color, size }) => {
                      return (
                        <Icon name="home-account" size={size} color={color} />
                      );
                    },
                  }}
                /> */}
                {/* <Stack.Screen name="User Detail" component={UserDetail} /> */}
              </>
            )}
          </Tab.Navigator>
          
        </NavigationContainer>
        
      </PaperProvider>
      {/* </LikeContext.Provider> */}
    </UserContext.Provider>
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
