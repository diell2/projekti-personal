import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {  
  const [news, setNews] = useState([]);
  const [apod, setApod] = useState(null);

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=S3i1iFitAIMjtribxDs7KcMysu8rREtm2NXeCN3Q`)
      .then(response => setApod(response.data));

    axios.get(`https://api.nasa.gov/planetary/earth/assets?api_key=S3i1iFitAIMjtribxDs7KcMysu8rREtm2NXeCN3Q`)
      .then(response => setNews(response.data));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {apod && (
        <View>
          <Text style={styles.title}>Astronomy Picture of the Day</Text>
          <Image source={{ uri: apod.url }} style={styles.image} />
          <Text>{apod.explanation}</Text>
        </View>
      )}

      <Text style={styles.title}>Latest Astronomy News</Text>
      {news.length > 0 ? (
        news.map((item, index) => (
          <View key={index}>
            <Text>{item.title}</Text>
          </View>
        ))
      ) : (
        <Text>No news available.</Text>
      )}

      {/* Add buttons to navigate to the other screens */}
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('CelestialBodies')}>
          <Text style={styles.button}>Go to Celestial Bodies</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SpaceMissions')}>
          <Text style={styles.button}>Go to Space Missions</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text style={styles.button}>Go to Search</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  navButtons: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: 10,
    marginVertical: 5,
    textAlign: 'center',
    borderRadius: 5,
  }
});

export default HomeScreen;
