import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Image,TouchableOpacity} from 'react-native';
import Global from '../../Pages/shared/Global';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';

const CourseList = ({type}) => {
  const [courseList, setCourseList] = useState([]);
  const navigation=useNavigation();
  useEffect(() => {
    getCourseList();
  }, []);

  const getCourseList = async () => {
    try {
      const resp = (await Global.getCourseList(type)).data;
      const result = resp.data.map(item => ({
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        image: item.attributes.image?.data?.attributes?.url,
        Topic: item.attributes.Topic,
      }));
      setCourseList(result);
    } catch (error) {
      console.error('Error fetching Advance courses:', error);
    }
  };
  const PressCourse=((course)=>{
   
   navigation.navigate('course-detail',{courseData:course,courseType:'text'})
  })
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '800',
          marginBottom: 3,
          marginTop: 10,
          color:'black',
          textTransform:'capitalize'
        }}>
        {type} Courses
      </Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
         <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              marginRight: 10,
               marginBottom:10,
              borderRadius: 7,
              elevation:2,
              
            }}
            onPress={()=>PressCourse(item)}>
            <Image
              source={{uri: item.image}}
              style={{
                width: 200,
                height: 110,
                borderRadius: 7,
                marginRight: 10,
              
              }}
            />
            <View style={{padding:10}}>
              <Text style={{color:'black',fontSize:16, fontWeight:'bold'}}>{item.name}</Text>
              <Text style={{color:Colors.gray,fontWeight:'300'}}>{item.Topic?.length} Lessons</Text>
            </View>
          
          </TouchableOpacity>
        )}
      />
    </View>
    
  );
};

export default CourseList;
