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
      {/* Astronomy Picture of the Day */}
      {apod && (
        <View style={styles.card}>
          <Text style={styles.title}>Astronomy Picture of the Day</Text>
          <Image source={{ uri: apod.url }} style={styles.image} />
          <Text style={styles.description}>{apod.explanation}</Text>
        </View>
      )}

      {/* Latest Astronomy News */}
      <Text style={styles.newsTitle}>Latest Astronomy News</Text>
      {news.length > 0 ? (
        news.map((item, index) => (
          <View key={index} style={styles.newsItem}>
            <Text style={styles.newsText}>{item.title}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noNews}>No news available.</Text>
      )}

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('CelestialBodies')}>
          <Text style={styles.buttonText}>Go to Celestial Bodies</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('SpaceMissions')}>
          <Text style={styles.buttonText}>Go to Space Missions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.buttonText}>Go to Search</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  newsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
  },
  newsItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  newsText: {
    fontSize: 16,
    color: '#007bff',
  },
  noNews: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  navButtons: {
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
