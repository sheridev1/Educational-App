import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import Color from './shared/Color';
import useGoogleSignIn from '../Pages/config/firebase/GoogleSignIn';
const Login = () => {
  const [loading, setLoading] = useState(false); // Initialize loading state
  const screenWidth = Dimensions.get('window').width;
  const {_signInwithGoogle} = useGoogleSignIn();

  async function googleSignIn() {
    setLoading(true);
    _signInwithGoogle()
      .then(data => {
        if (!data) {
          console.warn('=> Error', 'No Data');
          return;
        }

        console.warn('=> Success', data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <Image
        style={{width: screenWidth, height: 200}}
        source={require('../Assests/Login.png')}
      />
      <View style={styles.textContainer}>
        <Text style={{fontSize: 38, textAlign: 'center', fontWeight: 'bold'}}>
          Welcome to Education App
        </Text>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginTop: 80,
            fontWeight: 'bold',
          }}>
          Login/Signup
        </Text>
        
          <GoogleSigninButton
            style={styles.btn}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => googleSignIn()}
          />
        

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    paddingTop: 40,
    marginTop: -25,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    
  },
  btn: {
    marginTop: 50,
    alignSelf:'center'

  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default Login;
