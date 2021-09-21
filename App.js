import React, { useState, useEffect, useRef } from 'react';
import { LogBox, View } from 'react-native';

LogBox.ignoreAllLogs(true)

import { APPProvider } from './src/providers/AppProvider'

// //PACKAGES
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

//SCREENS
import {
  SelectLanguage,
  Splash,
  SignIn,
  Home,
  ReadBook,
  Detail,
  Libray,
  Discover,
  Summary,
  Notification,
  Search,
  Category,
  TreadingBooks,
  AuthorsBooks,
  Subscription,
  ReferFriend,
  EditProfile,
  MySubscription,
  MyReview,
  AllCategory,
  AllAuthors,
  NotificationDetails
} from '../screens'

//TABBAR
import { Tabbar } from './src/components'

const { Navigator, Screen } = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <Tabbar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Libray" component={Libray} />
      <Tab.Screen name="Summary" component={Summary} />
    </Tab.Navigator >
  )
}

const AppStack = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={"Splash"} >
    <Screen name='Splash' component={Splash} />
    <Screen name='SelectLanguage' component={SelectLanguage} />
    <Screen name='Home' component={BottomBar} />
    <Screen name='Detail' component={Detail} />
    <Screen name='Summary' component={Summary} />
    <Screen name='ReadBook' component={ReadBook} />
    <Screen name='Notification' component={Notification} />
    <Screen name='Search' component={Search} />
    <Screen name='Category' component={Category} />
    <Screen name='TreadingBooks' component={TreadingBooks} />
    <Screen name='AuthorsBooks' component={AuthorsBooks} />
    <Screen name='ReferFriend' component={ReferFriend} />
    <Screen name='EditProfile' component={EditProfile} />
    <Screen name='Subscription' component={Subscription} />
    <Screen name='MySubscription' component={MySubscription} />
    <Screen name='MyReview' component={MyReview} />
    <Screen name='AllCategory' component={AllCategory} />
    <Screen name='AllAuthors' component={AllAuthors} />
    <Screen name='NotificationDetails' component={NotificationDetails} />
  </Navigator >
);

const AuthStack = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={"Splash"} >
    <Screen name='Splash' component={Splash} />
    <Screen name='SelectLanguage' component={SelectLanguage} />
    <Screen name='SignIn' component={SignIn} />
  </Navigator>
);

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <APPProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </APPProvider>
    );
  }

  return (
    <APPProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </APPProvider>
  );
}

export default App;
