import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Color from '../../Pages/shared/Color';

const CourseContent = ({course, userProgress, courseType}) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('userProgress', userProgress);
  });

  const checkUserProgress = contentId => {
    console.log('CheckUserProgress:', contentId);
    return userProgress.find(item => item.courseContentId == contentId);
  };

  const onChapterPress = pageData => {
    if (courseType == 'text') {
      navigation.navigate('course-chapter', {
        pageData: pageData,
        courseId: course.id,
      });
    } else {
      navigation.navigate('play-video', {
        pageData: pageData,
        courseId: course.id,
      });
    }
  };

  return (
    <View style={{marginTop: 10}}>
      <Text style={{fontWeight: '900', fontSize: 16}}>Content</Text>
      <FlatList
        style={{marginTop: 10}}
        data={course?.Topic}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onChapterPress(item)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: Colors.white,
              marginBottom: 10,
              alignItems: 'center',
              borderRadius: 5,
              padding: 13,
            }}>
            {checkUserProgress(item.id) ? (
              <Icon name="check-circle" size={24} color={Colors.green} />
            ) : (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: Colors.gray,
                  marginRight: 20,
                }}>
                0{index + 1}
              </Text>
            )}
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              {item.Topic ? item.Topic : item.name}
            </Text>
            <Icon
              style={{position: 'absolute', right: 10}}
              name="play-circle"
              size={30}
              color={Colors.primary}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseContent;
