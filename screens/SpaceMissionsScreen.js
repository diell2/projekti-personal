
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const SpaceMissionsScreen = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/missions?api_key=S3i1iFitAIMjtribxDs7KcMysu8rREtm2NXeCN3Q')
      .then(response => setMissions(response.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Space Missions</Text>
      <FlatList
        data={missions}
        renderItem={({ item }) => (
          <View style={styles.missionCard}>
            <Text>{item.name}</Text>
            <Text>{item.details}</Text>
            <Button title="Learn More" onPress={() => {}} />
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
  missionCard: {
    padding: 10,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default SpaceMissionsScreen;
