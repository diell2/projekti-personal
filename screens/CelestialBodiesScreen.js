
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const CelestialBodiesScreen = () => {
  const [bodies, setBodies] = useState([]);

  useEffect(() => {

    axios.get('https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY')
      .then(response => {
        setBodies(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Celestial Bodies</Text>
      <FlatList
        data={bodies}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CelestialBodiesScreen;
