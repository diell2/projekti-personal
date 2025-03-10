import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {  
  const [news, setNews] = useState([]);
  const [apod, setApod] = useState(null);

  useEffect(() => {
    // Fetching Astronomy Picture of the Day (APOD)
    axios.get('https://api.nasa.gov/planetary/apod?api_key=S3i1iFitAIMjtribxDs7KcMysu8rREtm2NXeCN3Q')
      .then(response => setApod(response.data));

    // Fetching Latest Astronomy News (using NewsAPI)
    axios.get('https://newsapi.org/v2/everything?q=astronomy&apiKey=323bda68daff41c68b936824aed550c4')
      .then(response => setNews(response.data.articles.slice(0, 6)));  // Only the first 6 articles
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Astronomy Picture of the Day */}
      {apod && (
        <View style={styles.apodContainer}>
          <Text style={styles.apodTitle}>Astronomy Picture of the Day</Text>
          <View style={styles.apodImageContainer}>
            <Image source={{ uri: apod.url }} style={styles.apodImage} />
          </View>
          <View style={styles.apodDescriptionContainer}>
            <Text style={styles.apodDescription}>{apod.explanation}</Text>
          </View>
        </View>
      )}

      {/* Latest Astronomy News */}
      <Text style={styles.newsTitle}>Latest Astronomy News</Text>
      <FlatList
        data={news}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('NewsDetail', { article: item })}>
            <View style={styles.newsItem}>
              <Text style={styles.newsText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll bar
      />

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
  apodContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '80%',
    alignSelf: 'center',
  },
  apodTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  apodImageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#f2f2f2',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden',
  },
  apodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  apodDescriptionContainer: {
    padding: 20,
  },
  apodDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
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
    marginRight: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minWidth: 200,
  },
  newsText: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center', 
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
