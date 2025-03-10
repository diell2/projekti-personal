import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NewsDetailScreen = ({ route }) => {
  const { article } = route.params; // Access the passed article data

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>{article.author}</Text>
        <Text style={styles.publishedAt}>{article.publishedAt}</Text>

        <Text style={styles.content}>{article.content}</Text>
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
    borderRadius: 10,
    padding: 20,
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
  author: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  publishedAt: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default NewsDetailScreen;
