import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./app/config/context";
// splash screen
import Splash from "./app/screens/splash";
// auth screen
import signin from "./app/screens/auth/signin";
import signup from "./app/screens/auth/signup";
// app screen
import listNote from "./app/screens/app/listNote";
import addNote from "./app/screens/app/addNote";
import viewNote from "./app/screens/app/viewNote";
import profile from "./app/screens/app/profile";

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthScreen = () => (
  <AuthStack.Navigator headerMode='none'>
    <AuthStack.Screen name="signIn" component={signin} />
    <AuthStack.Screen name="signUp" component={signup} />
  </AuthStack.Navigator>
);

const AppScreen = () => (
  <AppStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <AppStack.Screen name="listNote" component={listNote} />
    <AppStack.Screen name="addNote" component={addNote} />
    <AppStack.Screen name="viewNote" component={viewNote} />
    <AppStack.Screen name="profile" component={profile} />
  </AppStack.Navigator>
);

const RootScreen = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{
    headerShown: false
  }}>
    {userToken ? (
      <RootStack.Screen name="app" component={AppScreen} options={{
        animationEnabled: false
      }} />
    ) : (
        <RootStack.Screen name="auth" component={AuthScreen} options={{
          animationEnabled: false
        }} />
      )}
  </RootStack.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: async () => {
        setIsLoading(false);
        var token = await AsyncStorage.getItem('token')
        setUserToken(token);
      },
      signUp: () => {
        setIsLoading(false);
      },
      signOut: async () => {
        setIsLoading(false);
        setUserToken(null);
        await AsyncStorage.removeItem('token');
      }
    }
  }, []);

  const getToken = async () => {
    let token = await AsyncStorage.getItem('token');
    token ? setUserToken(token) : setUserToken(null);
  }

  React.useEffect(() => {
    getToken()
    setTimeout(() => { setIsLoading(false) }, 2000);
  }, [])

  if (isLoading) {
    return <Splash />
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
