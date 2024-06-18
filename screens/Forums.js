import React from 'react';
import { useState } from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, Text, Image, TextInput } from 'react-native';
import { post } from '../api/forumsAPI';
import { useNavigation } from '@react-navigation/native';
import Montserrat from '../components/fontloader/FontLoader';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Forums() {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [expandedPosts, setExpandedPosts] = useState(new Set());

    const toggleExpand = (id) => {
        const newExpandedPosts = new Set(expandedPosts);
        if (newExpandedPosts.has(id)) {
            newExpandedPosts.delete(id);
        } else {
            newExpandedPosts.add(id);
        }
        setExpandedPosts(newExpandedPosts);
    };

    const renderPost = ({ item }) => {
        const isExpanded = expandedPosts.has(item.id);
        const words = item.fullText.split(' ');
        const truncatedText = words.slice(0, 10).join(' ');

        return (
            <TouchableOpacity onPress={() => navigation.navigate('PostContent', { post: item })}>
                <View style={styles.postContainer}>
                    <View style={styles.header}>
                        <View style={styles.imageandname}>
                            <Image source={{ uri: item.author.profile }} style={styles.profileImage} />
                            <View>
                                <Text style={styles.username}>{item.author.username}</Text>
                                <Text style={styles.dateposted}>
                                    {item.datePosted.split(',')[0].trim()}
                                </Text>
                            </View>
                        </View>
                        <Entypo style={styles.threedots} name="dots-three-vertical" size={12} color="#555a54" />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.fullText}>
                        {isExpanded ? item.fullText : (
                            <>
                                {truncatedText} 
                                {words.length > 10 && (
                                    <Text style={styles.seeMore} onPress={() => toggleExpand(item.id)}>
                                        ...see more
                                    </Text>
                                )}
                            </>
                        )}
                    </Text>
                    <Image source={{ uri: item.image }} style={styles.imagepost} />
                    <View style={styles.stats}>
                        <Text>  <Ionicons name='heart-outline' size={20} color='#555a54' /> {item.likeCount}</Text>
                        <Text>     <Ionicons name='chatbubble-ellipses-outline' size={20} color='#555a54' /> {item.replyCount}</Text>
                        <Text>     <Ionicons name='share-social-outline' size={20} color='#555a54' /> {item.shareCount}</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableOpacity>
        );
    };

    const filteredPosts = post.filter((item) =>
        item.fullText.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearchSubmit = () => {
        // Add a function if user submits the search, for now it filters all posts in real-time
    };

    return (
        <Montserrat>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.searchContainer}>
                    <Feather name="search" size={24} color="white" />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'white'}
                        placeholder="Search..."
                        fontSize={16}
                        onChangeText={(text) => setSearchText(text)}
                        value={searchText}
                        onSubmitEditing={handleSearchSubmit} // Call handleSearchSubmit on submit editing
                    />
                </View>
                <FlatList
                    data={filteredPosts.slice(0, 10)} // Use filtered posts instead of all posts
                    keyExtractor={(item) => item.id}
                    renderItem={renderPost}
                    ListHeaderComponentStyle={{ backgroundColor: '#ccc' }}
                    
                />
            </SafeAreaView>
        </Montserrat>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        margin: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#cccccc',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    input: {
        marginLeft: 10,
        color: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
    },
    postContainer: {
        marginBottom: 10,
        marginHorizontal: 25,
    },
    imageandname: {
        flexDirection: 'row',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    profileImage: {
        backgroundColor: 'gray',
        width: 30,
        height: 30,
        borderRadius: 25,
        marginRight: 10,
    },
    username: {
        fontWeight: '550',
    },
    dateposted: {
        color: 'gray',
        fontSize: 12,
    },
    threedots: {},
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#274428',
        marginBottom: 5,
    },
    fullText: {
        fontSize: 12,
        
    },
    seeMore: {
        color: 'gray',
        fontSize: 12,
        
    },
    imagepost:{
        marginTop: 10,
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'gray',
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'flex-start',
        marginBottom: 10,
        color: '#555a54'
    },
});
