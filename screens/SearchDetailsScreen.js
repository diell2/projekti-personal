import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SearchDetailScreen = ({ route }) => {
  const { item } = route.params; // Get the selected item

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{item.englishName || item.name}</Text>
        <Text style={styles.description}>
          {item.description || 'No description available.'}
        </Text>

        {item.discoveredBy && <Text style={styles.infoText}>Discovered By: {item.discoveredBy}</Text>}
        {item.discoveryDate && <Text style={styles.infoText}>Discovery Date: {item.discoveryDate}</Text>}
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
  detailContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
});

export default SearchDetailScreen;
