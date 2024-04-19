import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import Global from '../../Pages/shared/Global';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';

export const Slider = () => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = async () => {
    const result = (await Global.getSlider()).data;

    const resp = result.data.map((item) => ({
      id: item.id,
      name: item.attributes.text,
      image: item.attributes?.image?.data?.attributes?.url,
    }));
   
    setSlider(resp);
  };

  return (
    <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: Dimensions.get('screen').width }}>
        <FlatList
          data={slider}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: Dimensions.get('screen').width * 0.9,
                  height: 200,
                  borderRadius: 10,
                  marginRight: 13,
                  marginLeft:15
                }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};
