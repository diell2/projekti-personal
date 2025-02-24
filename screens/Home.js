import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchData("https://randomuser.me/api/?results=20");
    }, []);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json.results);        // Set data from API response
            setFilteredData(json.results); // Set the initial filtered data as the full dataset 
        } catch (error) {
            console.error(error);
        }
    };

    // Filter the data based on search input
    const searchFilterFunction = (text) => {
        setSearchText(text);
        if (text) {
            const newData = data.filter((item) => {
                const itemData = (item.name.first + " " + item.name.last).toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1; // Filters by both first and last name
            });
            setFilteredData(newData);
        } else {
            // Reset to the original data if no search text
            setFilteredData(data);
        }
    };

    return (
        <ScrollView>
            <Text style={styles.textFriends}>Friends</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Search Friends"
                value={searchText}
                onChangeText={searchFilterFunction} // Trigger filter on text change
            />

            {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Image source={{ uri: item.picture.large }} style={styles.image} />
                        <View>
                            <Text style={styles.textName}>
                                {item.name.first} {item.name.last}
                            </Text>
                            <Text style={styles.textEmail}>{item.login.username}</Text>
                        </View>
                    </View>
                ))
            ) : (
                <Text>No results found.</Text>
            )}
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    textFriends: {
        fontSize: 20,
        textAlign: "left",
        marginLeft: 10,
        fontWeight: "bold",
        marginTop: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: "600",
    },
    textEmail: {
        fontSize: 14,
        marginLeft: 10,
        color: "grey",
    },
});
