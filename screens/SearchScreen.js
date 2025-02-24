import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchHandler = () => {
    // Call API to search celestial bodies or missions based on the query
    // For example, you can call a specific search API endpoint of NASA
    console.log('Search query:', query);
    // Update results after the API call
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for Celestial Bodies or Missions"
        onChangeText={setQuery}
        value={query}
      />
      <Button title="Search" onPress={searchHandler} />
      
      {results.length > 0 ? (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No results found</Text>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default SearchScreen;
