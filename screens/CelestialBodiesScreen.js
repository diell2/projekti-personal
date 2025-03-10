import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const CelestialBodiesScreen = () => {
  const [bodies, setBodies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.le-systeme-solaire.net/rest/bodies/')
      .then(response => {
        setBodies(response.data.bodies); // "bodies" contains the list of celestial objects
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Celestial Bodies</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={bodies}
          keyExtractor={(item) => item.id} // Unique ID for each celestial body
          renderItem={({ item }) => (
            <View style={styles.bodyCard}>
              <Text style={styles.bodyName}>{item.englishName || item.name}</Text>
              <Text>Type: {item.bodyType}</Text>
              <Text>Gravity: {item.gravity} m/s²</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  bodyCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bodyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CelestialBodiesScreen;
