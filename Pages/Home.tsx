import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import services from '../Pages/shared/services';
import {AuthContext} from './Context/AuthContext';
import useGoogleSignIn from '../Pages/config/firebase/GoogleSignIn';
import WelcomeHeader from '../Assests/Components/WelcomeHeader';
import SearchBar from '../Assests/Components/SearchBar';
import Global from './shared/Global';
import VideoCourseList from '../Assests/Components/VideoCourseList';
import { Slider } from '../Assests/Components/Slider';
import CourseList from '../Assests/Components/CourseList';
const Home = () => {
  const {userData, setUserData} = useContext(AuthContext);
  const {signOut} = useGoogleSignIn();
  
  
  return (
    <ScrollView style={{padding:15}}>
      <WelcomeHeader/>
      <SearchBar/>
      <Slider/>
      <VideoCourseList/>
      <CourseList type={'advance'}/>
      <CourseList type={'basic'}/>

      
      <TouchableOpacity
      style={{padding:20}}
        onPress={() => {
          signOut();
          services.Logout();
          setUserData(null);
        }}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Home;
