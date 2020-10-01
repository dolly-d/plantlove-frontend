import React from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import Fire from "../Fire";
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import { withNavigation } from 'react-navigation'
import firebaseKeys from '../firebase'
import firebase from 'firebase'
import {Ionicons} from '@expo/vector-icons'
require('firebase/firestore')

export default class ProfileScreen extends React.Component {
    state = {
        user: {},
        postsArray: []
    };


    componentDidMount() {
        const user = this.props.navigation.state.params.otherParam.uid
        const { navigation } = this.props;
        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data() });
            });
        
        this.fetchPost()
        this.focusListener = navigation.addListener('didFocus', () => {
            this.fetchPost();
            
        });
    }

    state = {
        user: {

            name: "",
            email: "",
            password: "",
            avatar: undefined,
            following: [],
            followers: []
        }
        
    };

    fetchPost =()=>{
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseKeys)
        }
        firebase.firestore()
        .collection('posts')
        .orderBy("timestamp", "desc")
        .get()
        .then(snapshot => {
            let data = snapshot.docs.map((doc) => {
                let id = doc.id
                return (doc.data(),
                { ...doc.data(), ['id']: id }
                )
                
                
            })
           this.setState({ postsArray: data.filter((post) => this.state.user.uid === post.uid)})
            // console.log('MY DATA ===>', this.state.postsArray)
        })
       

    }


    addFollows = (post) => {
        const db = firebase.firestore()
        let userId = firebase.auth().currentUser.uid
        let followingId = post.uid
        const followUserRef = db.collection('users').doc(userId)
        const followingRef =  db.collection('users').doc(followingId) 
        
        followUserRef.update({following: firebase.firestore.FieldValue.arrayUnion(followingId)})
        followingRef.update({followers: firebase.firestore.FieldValue.arrayUnion(userId)})

    }

    render() {
        // const uid = this.props.navigation.state.params.otherParam.uid
        const render = this.state.postsArray !== undefined ? (
             this.state.postsArray.map((post) => {
                // if (post.uid === uid){
                    return (
                        <>
                    <Image source={{ uri: post.image }} style={styles.photo} />
                    </>
                )
                // }
             })
        ): null

  

        return (
            // <View style={styles.header}>
            <View style={styles.container}>
                <View style={{ marginTop: 64, alignItems: "center" }}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                   
                    {firebase.auth().currentUser.uid === this.props.navigation.state.params.otherParam.uid ? null: <TouchableOpacity onPress={() => {this.addFollows
                        (this.props.navigation.state.params.otherParam)}}>
                         <Ionicons name='ios-person-add' size={24} color='#73788B' />
                       </TouchableOpacity>}
                    
                </View>
               
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                 <Text style={styles.statAmount}>{(this.state.postsArray && this.state.postsArray.length) ? this.state.postsArray.length : 0}</Text>
                        <Text style={styles.statTitle}>Posts</Text> 
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>{this.state.user.followers.length}</Text>
                        <Text style={styles.statTitle}>Followers</Text>
                    </View>
                    <View style={styles.stat}>
                <Text style={styles.statAmount}>{this.state.user.following.length}</Text>
                        <Text style={styles.statTitle}>Following</Text>
                        {/* </View> */}
                    </View>
                </View>

                    <ScrollView >
                        <View style={styles.itemContainer}>
                      {render}
                      </View>
                    </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'
        },
    profile: {
        marginTop: 30,
        alignItems: "center",
        height: 50,
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4,
        marginLeft: 15,
        marginTop: 20,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 68
    },
    photo: {
        width: 160,
        height: 160,
        borderRadius: 5,
        margin: 5
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "600"
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    statAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300"
    },
    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    },
      itemContainer: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        alignItems: 'center'
      }
});
