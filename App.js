import React, {useState, useEffect} from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

let currentPhoto;

function HomeScreen({ navigation }) {
  const [imgs, setImgs] = useState([]);
  
  useEffect(() => {
    fetch('https://api.unsplash.com/photos/?client_id=Hqdv80bsjO1TypufSbdM4yXLlK15b9kJv01qkyDNrUk')
      .then(response => response.json())
      .then(data => setImgs(data));
  }, []);

  return (
    <View>
      <View>
        <FlatList 
          data={imgs}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => { 
                currentPhoto = item.urls.full;
                navigation.navigate('Photo')}}>
              <Image
                style={styles.img}
                source={{ uri: item.urls.thumb }}
              />

              <View style={styles.textContainer}>
                <Text  style={styles.name}>{item.user.id}</Text>
                <Text style={styles.username}>{ `${item.user.username}`}</Text>
              </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

function PhotoScreen({ navigation, fullPhoto }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={styles.imgBig}
        source={{ uri: currentPhoto }} />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  img: {
    width: 100,
    height:100,
  },

  imgBig: {
    width: '100%',
    height: '100%',
  },

  listItem: {
    flexDirection: 'row',
    padding: 10,
  },

  name: {
    fontSize: 20,
  },

  username: {
    color: 'gray',
  },

  textContainer: {
    paddingLeft: 15,
  }

});