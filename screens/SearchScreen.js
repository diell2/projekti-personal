import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [allResults, setAllResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    axios
      .get('https://api.le-systeme-solaire.net/rest/bodies')
      .then((response) => {
        setAllResults(response.data.bodies || []);
        setFilteredResults(response.data.bodies || []);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch results');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data on mount
  }, []);

  const searchHandler = () => {
    if (!query) {
      setFilteredResults(allResults);
    } else {
      const filtered = allResults.filter(item =>
        (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
        (item.englishName && item.englishName.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredResults(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for Celestial Bodies or Missions"
          onChangeText={setQuery}
          value={query}
        />
        <Button title="Search" onPress={searchHandler} color="#007AFF" />

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={styles.centered} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : filteredResults.length > 0 ? (
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <FlatList
              data={filteredResults}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('SearchDetail', { item })}
                  style={styles.resultCard}
                >
                  <Text style={styles.resultName}>{item.englishName || item.name}</Text>
                  <Text style={styles.resultDetails}>
                    {item.description || 'No description available.'}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
            />
          </ScrollView>
        ) : (
          <Text style={styles.noResults}>No results found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  resultCard: {
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
  resultName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultDetails: {
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
  scrollViewContainer: {
    paddingBottom: 20,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
