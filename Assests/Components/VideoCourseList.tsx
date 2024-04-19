import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import Global from '../../Pages/shared/Global';
import {useNavigation} from '@react-navigation/native';
import CoursePage from '../../Pages/CoursePage';

const VideoCourseList = () => {
  const navigation = useNavigation();

  const [VideoList, setVideoList] = useState([]);
  useEffect(() => {
    getVideoCourse();
  }, []);

  const pressVideo = (videoData) => {
    console.log(videoData)
    navigation.navigate('course-detail',{courseData:videoData,courseType:'video'})
  };

  const getVideoCourse = async () => {
    try {
      const resp = (await Global.getVideoCourse()).data;

      const result = resp.data.map(item => ({
        id: item.id,
        name: item.attributes.title,
        description: item.attributes.description,
        image: item.attributes.image?.data?.attributes?.url || '', // Provide a default value if 'url' is undefined
        Topic: item.attributes.VideoTopic,
      }));
      setVideoList(result);
    } catch (error) {
      console.error('Error fetching video courses:', error);
    }
  };

  return (
    <View>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: '800',
          marginBottom: 3,
          marginTop: 7,
        }}>
        Video Course
      </Text>

      <FlatList
        data={VideoList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => pressVideo(item)}>
            <Image
              source={{uri: item.image}}
              style={{
                width: 200,
                height: 100,
                borderRadius: 7,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default VideoCourseList;
