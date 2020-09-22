import React from 'react'
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import moment from 'moment'

posts = [ 
    {
        id: '1',
        name: 'Jane',
        text: 'Hello? Is this working?',
        timestamp: 1569109273726,
        avatar: require('../assets/tempAvatar.jpg'),
        image: require('../assets/tempImage1.jpg')
    },
    {
        id: '2',
        name: 'Lisa',
        text: 'Shit! I hope so',
        timestamp: 1569109273726,
        avatar: require('../assets/tempAvatar.jpg'),
        image: require('../assets/tempImage2.jpg')
    },
    {
        id: '3',
        name: 'Kathy',
        text: 'Well...is it working?',
        timestamp: 1569109273726,
        avatar: require('../assets/tempAvatar.jpg'),
        image: require('../assets/tempImage4.jpg')
    }


]

export default class HomeScreen extends React.Component {
    renderPost = post => {
        return(
            <View style={styles.feedItem}>
               <Image source={post.avatar} style={styles.avatar} />
               <View style={{flex: 1}}>
                   <View style={{flexDirection: 'row', justifyContent:"space-between", alignItems: 'center'}}>
                       <View>
                            <Text style={styles.name}>{post.name} </Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                       </View>

                       <Ionicons name='ios-more' size={24} color='#73788B' />
                   </View>

                    <Text style={styles.posts}>{post.text}</Text>

                    <Image source={post.image} style={styles.postImage} resizeMode="cover" />
               
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name='ios-heart-empty' size={24} color='#73788B' style={{marginRight: 16}} />
                        <Ionicons name='ios-chatboxes' size={24} color='#73788B' />

                    </View>
               </View>
            </View>
        )
    }
    
    render() {
        
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feed</Text>

                    <TouchableOpacity style={{ marginTop: 32 }} 
                    onPress={() => {this.signOutUser; this.props.navigation.navigate("Registration")}}>
                    <Text>Logout</Text>
                    </TouchableOpacity>

                </View>

                <FlatList 
                style={styles.feed} 
                data={posts} 
                renderItem={ ({item}) => this.renderPost(item)} 
                keyExtractor={item =>item.id} 
                showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EBECF4',
        shadowColor: '#454D65',
        shadowOffset: {height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500'
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: '#454D65'
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899'
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16

    }
    


})