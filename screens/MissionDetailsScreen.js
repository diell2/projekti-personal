import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

const MissionDetailsScreen = ({ route }) => {
  const { mission } = route.params; // Access the passed mission data

  const handleOpenLink = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.missionName}>{mission.name}</Text>

      {/* Launch Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Launch Date</Text>
        <Text style={styles.launchDate}>{new Date(mission.date_utc).toLocaleString()}</Text>
      </View>

      {/* Mission Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mission Details</Text>
        <Text style={styles.details}>
          {mission.details ? mission.details : 'No details available for this mission.'}
        </Text>
      </View>

      {/* Rocket Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rocket</Text>
        <Text style={styles.details}>
          {mission.rocket ? mission.rocket.name : 'No rocket information available.'}
        </Text>
      </View>

      {/* Links to Mission and Website */}
      {mission.links && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Links</Text>
          {mission.links.website && (
            <TouchableOpacity onPress={() => handleOpenLink(mission.links.website)}>
              <Text style={styles.link}>Official Website</Text>
            </TouchableOpacity>
          )}
          {mission.links.article && (
            <TouchableOpacity onPress={() => handleOpenLink(mission.links.article)}>
              <Text style={styles.link}>Related Article</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  missionName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 5,
  },
  launchDate: {
    fontSize: 16,
    color: '#555',
  },
  details: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default MissionDetailsScreen;
