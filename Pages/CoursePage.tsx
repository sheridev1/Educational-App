import React, {useContext,useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import {AuthContext} from './Context/AuthContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ProgressBar from '../Assests/Components/ProgressBar';
import Global from './shared/Global';
const CoursePage = () => {
  const [chapter, setChapter] = useState([]);
  const [run, setRun] = useState(false);
  const navigation = useNavigation();
  const param = useRoute().params;
  const [selectedItem, setSelectedItem]=useState(null);
  const [progress,setProgress]=useState();
  const {userData, setUserData} = useContext(AuthContext);
  let ChapterRef;
  useEffect(() => {
    setProgress(0);
    setChapter(param.pageData.Content);
    
  }, []);

  const handleRun=()=>{
    if(run==true)
    {
      setRun(false)
    }
    else{
      setRun(true);
    }

  }
  const NextPage=(index)=>{
    const NewProgress=((index+1)/chapter.length)*100;
    setProgress(NewProgress);
    try{
    ChapterRef.scrollToIndex({animate:true,index:index+1})
    
    setRun(false);
    }catch(error)
    {
      const data={
        data:{
          uid:userData.customShortId,
          courseId:param.courseId,
          courseContentId:param.pageData.id
        }
      }
      Global.setCourseProgress(data).then(resp=>{
        navigation.navigate({
          name:'course-detail',
          params:{courseContentId:param.pageData.id},
          merge:true
        })
      })
      
    }
  }

  const item = () => {};
  return (
    <View style={{padding:0,flex:1}}>
    <View style={{padding: 20, paddingTop: 30,flex:1}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color={'black'} />
      </TouchableOpacity>
      <ProgressBar progress={progress}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow:1}}>
        <FlatList
          data={chapter}
          ref={ref => {
            ChapterRef = ref;

          }}
          horizontal={true}
          pagingEnabled
          renderItem={({item,index}) => (
            <View
              style={{
                width: Dimensions.get('screen').width * 0.85,
                padding: 10,
                marginRight: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {item.name}
              </Text>
              <Text>{item.description}</Text>
              {item.input != '' ? (
                <View>
                  <View
                    style={{
                      backgroundColor: 'black',
                      padding: 20,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: Colors.white}}>{item.input}</Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.primary,
                      width: 100,
                      padding: 5,
                      borderRadius: 5,
                      marginTop: 10,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      
                    }}
                    onPress={() => handleRun()}>
                    <Icon name="play-circle" size={30} color={'black'} />
                    <Text
                      style={{
                        textAlign: 'center',
                        marginLeft: 5,
                        color: Colors.white,
                      
                      }}>
                      Run
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {run ? (
                <View style={{marginTop: 15}}>
                  <Text style={{fontWeight: 'bold'}}>Output</Text>
                  <View
                    style={{
                      backgroundColor: 'black',
                      padding: 20,
                      borderRadius: 10,
                      marginTop: 10,
                      marginBottom:30
                    }}>
                    <Text style={{color: Colors.white}}>{item.output}</Text>
                  </View>
                </View>
              ) : null}
              {index+1!=chapter.length?<TouchableOpacity
                style={{
                  backgroundColor: Colors.primary,
                  padding: 10,
                  borderRadius: 7,
                  width: '60%',
                  zIndex: 1,
                  position: 'absolute',
                  bottom: 0,
                  left:70,
                  right:70
                }}
                onPress={()=>NextPage(index)}>
                <Text style={{textAlign: 'center', color: Colors.white}}>
                  Next
                </Text>
              </TouchableOpacity>:
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  padding: 10,
                  borderRadius: 7,
                  width: '60%',
                  zIndex: 1,
                  position: 'absolute',
                  bottom: 0,
                  left:70,
                  right:70
                }}
                onPress={()=>NextPage(index)}>
                <Text style={{textAlign: 'center', color: Colors.white}}>
                  Finish
                </Text>
              </TouchableOpacity>}
            </View>
          )}
        />
      </ScrollView>
    </View>
    </View>
  );
};

export default CoursePage;
