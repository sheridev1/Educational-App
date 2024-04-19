import React, {useEffect, useState,useContext} from 'react';
import {View, Text,Image,TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from './shared/Color';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CourseContent from '../Assests/Components/CourseContent';
import Global from './shared/Global';
import {AuthContext} from './Context/AuthContext';


const CourseDetail = () => {
  const param = useRoute().params;
  
  const [course, setCourse] = useState([]);
  const navigation=useNavigation();
  const {userData, setUserData} = useContext(AuthContext);
  const [userProgress,setUserProgress]=useState([]);
  useEffect(() => {
    setCourse(param?.courseData);
    
    param?.courseData.id?getCourseProgress():null;
  },[param?.courseContentId]);

  const getCourseProgress=()=>{
    
     
     Global.getCourseProgress(userData.customShortId,param?.courseData.id).then(resp=>{
      if(resp.data.data)
      {
        const result=resp.data.data.map(item=>({
          id:item.id,
          "courseId":item.attributes.courseId,
          "courseContentId":item.attributes.courseContentId,
          
        }))
        
        
        setUserProgress(result);
      }
       
      
     })
  }
  return (
    <View style={{padding: 20, paddingTop:30}}>
     <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Icon name="arrow-back" size={30} color={'black'} />
      </TouchableOpacity>
      <View>
        <Text style={{fontSize: 20, fontWeight: '900', marginTop:10}}>{course.name}</Text>
        <Text style={{color:Colors.gray}}>By Developer</Text>
        <Image source={{uri:course.image}}
        style={{height:150,marginTop:10,borderRadius:10}}/>
        <Text style={{marginTop:10,fontSize:16,fontWeight:'900'}}>About Course</Text>
        <Text numberOfLines={4} style={{color:Colors.gray}}>{course.description}</Text>
      </View>
      <CourseContent course={course} userProgress={userProgress} courseType={param?.courseType}/>
    </View>
  );
};

export default CourseDetail;
