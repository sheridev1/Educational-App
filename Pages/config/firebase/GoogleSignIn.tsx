import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import services from '../../shared/services';

const useGoogleSignIn = () => {
  const {setUserData} = useContext(AuthContext);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      try {
        await GoogleSignin.configure({
          offlineAccess: false,
          webClientId: '856311741151-cesmhlt9luiui2l1ggjjdgr338aq53j7.apps.googleusercontent.com',
         
        });
        setIsInitialized(true);
      } catch (error) {
        console.warn('Error configuring Google Sign-In', error);
        setIsInitialized(false);
      }
    };

    configureGoogleSignIn();
  }, []);


  const _signInwithGoogle = async () => {
    try {
      console.log('Starting Google Sign-In');
    

      await GoogleSignin.hasPlayServices();
      console.log('Play Services are available');

      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      const idToken = userInfo.idToken;
      console.log('ID Token:', idToken);

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('Google Credential:', googleCredential);

      await auth().signInWithCredential(googleCredential);
      console.log('Signed in with Google Credential');

      setUserData(userInfo);
      await services.setUserAuth(userInfo);
      return userInfo;
    } catch (error) {
      console.warn('Google Sign In Error', error);
      return null;
    }
  };
  const signOut = async () => {
    try {
      if(isInitialized)
      {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      }
      else{
        console.warn('Google Sign-In is not initialized. Call configure first.');
      }
      setUserData(null);
    } catch (error) {
      console.warn('Error Signing Out from Google', error);
    }
   
  };
  return {_signInwithGoogle, signOut};
};

export default useGoogleSignIn;
