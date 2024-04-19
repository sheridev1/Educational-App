import React, {useContext} from 'react';
import {Image, Text, View, useColorScheme} from 'react-native';
import {AuthContext} from '../../Pages/Context/AuthContext';
import {StyleSheet} from 'react-native';

const WelcomeHeader = () => {
  const {userData, setUserData} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={{display: 'flex'}}>
        <Text>Hello</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold',color:'black'}}>
          {userData?.user?.name}
        </Text>
      </View>
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 50,
          justifyContent: 'flex-end',
        }}
        source={{uri: userData.user.photo}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default WelcomeHeader;
