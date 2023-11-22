import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Login from './Pages/Login';
import {AuthContext} from './Pages/Context/AuthContext';
import Home from './Pages/Home';
import services from './Pages/shared/services';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import HomeNavigation from './Pages/Navigation/HomeNavigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  GoogleSignin.configure({
    offlineAccess: false,
    webClientId:
      '856311741151-cesmhlt9luiui2l1ggjjdgr338aq53j7.apps.googleusercontent.com',
    
  });
  

  const generateCustomShortId = (id) => {
    // Custom logic to generate a short ID based on the user's name
    const shortId = id.slice(0, 1) // Example logic
  
    return shortId;
  };
  
  const [userData, setUserData] = useState();
  
  useEffect(() => {
    services.getUserAuth().then(resp => {
      console.log(resp);
      if (resp&& resp.user.id) {
        const customShortId = generateCustomShortId(resp.user.id);
        setUserData({ ...resp, customShortId });
      } else {
        setUserData(null);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <AuthContext.Provider value={{userData, setUserData}}>
        {userData ? <NavigationContainer>
          <HomeNavigation/>
        </NavigationContainer> : <Login />}
      </AuthContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
