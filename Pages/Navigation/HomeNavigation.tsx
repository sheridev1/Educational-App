import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../Home';
import CourseDetail from '../CourseDetail';
import CoursePage from '../CoursePage';
import { PlayVideo } from '../PlayVideo';
const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name="course-detail" component={CourseDetail}/>
        <Stack.Screen name="course-chapter" component={CoursePage}/>
        <Stack.Screen name="play-video" component={PlayVideo}/>
      </Stack.Navigator>
   
  );
};

export default HomeNavigation;

