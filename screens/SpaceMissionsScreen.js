import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';

const SpaceMissionsScreen = ({ navigation }) => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://api.spacexdata.com/v4/launches')
      .then((response) => {
        setMissions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to load missions.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Text style={styles.title}>Space Missions</Text>
      <FlatList
        data={missions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.missionCard}>
            <Text style={styles.missionName}>{item.name}</Text>
            <Text style={styles.missionDetails}>
              {item.details ? item.details : 'No details available.'}
            </Text>
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() => navigation.navigate('MissionDetails', { mission: item })}
            >
              <Text style={styles.buttonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2} 
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1, 
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  missionCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    flex: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  missionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  missionDetails: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  learnMoreButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default SpaceMissionsScreen;
