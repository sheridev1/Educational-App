import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import YoutubeIframe from 'react-native-youtube-iframe';

export const PlayVideo = () => {
  const navigation = useNavigation();
  const param = useRoute().params;
  const [videoChapter, setVideoChapter] = useState([]);
  const [playing,setplaying]=useState(false);
  const [videoId, setVideoId] = useState('');
 
  useEffect(() => {
    console.log(param.pageData.VideoUrl)
      setVideoChapter(param.pageData);
      Videourl();
    }, [param.pageData]);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      
    }
    
  }, []);


  const Videourl=()=>{

    if (param.pageData?.VideoUrl) {
      const extractedVideoId = param.pageData?.VideoUrl.split('/').pop();
      setVideoId(extractedVideoId); 

    } else {
      console.log('Video URL is undefined or does not exist in param.pageData');
    }

  }
  return (
    <View style={{padding: 20, marginTop: 25}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color={'black'} />
      </TouchableOpacity>
      {videoChapter ? (
        <View>
          <Text style={{marginBottom: 10, fontSize: 20, fontWeight: '900'}}>
            {videoChapter.name}
          </Text>
          <YoutubeIframe height={300} play={playing} videoId={videoId} onChangeState={onStateChange} />
          <Text style={{marginBottom: 10, fontWeight: '900'}}>Description</Text>
          <Text style={{lineHeight: 20}}>{videoChapter.description}</Text>
        </View>
      ) : null}
      <Text>video course</Text>
    </View>
  );
};
