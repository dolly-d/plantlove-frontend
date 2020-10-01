import React from 'react'
// import Fire from '../Fire'
// import {db} from '../Fire'
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TouchableHighlight, Button} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { TextInput } from 'react-native-paper'
import moment from 'moment'
import firebaseKeys from '../firebase'
import firebase from 'firebase'
import { withNavigation } from 'react-navigation'
import { render } from 'react-dom'
require('firebase/firestore')


// posts = [ 
//     {
//         id: '1',
//         name: 'Jane',
//         text: 'Hello? Is this working?',
//         timestamp: 1569109273726,
//         avatar: require('../assets/tempAvatar.jpg'),
//         image: require('../assets/tempImage1.jpg')
//     },
//     {
//         id: '2',
//         name: 'Lisa',
//         text: 'Shit! I hope so',
//         timestamp: 1569109273726,
//         avatar: require('../assets/tempAvatar.jpg'),
//         image: require('../assets/tempImage2.jpg')
//     },
//     {
//         id: '3',
//         name: 'Kathy',
//         text: 'Well...is it working?',
//         timestamp: 1569109273726,
//         avatar: require('../assets/tempAvatar.jpg'),
//         image: require('../assets/tempImage4.jpg')
//     }


// ]

export default class HomeScreen extends React.Component {

    state = {
        postsArray: [],
        usersArray: [],
        comment: "",
        pickPost: [],
        clicked: false
    }
    
    componentDidMount(){
        const { navigation } = this.props;
        this.fetchUser()
        this.fetchPost();
        this.focusListener = navigation.addListener('didFocus', () => {
            this.fetchPost();
            
        });
    }
    
    fetchUser =()=>{
        firebase.firestore()
        .collection('users')
        .get()
        .then(snapshot => {
            let userData = snapshot.docs.map((doc) => {
                return doc.data();
            })
           this.setState({ usersArray: userData })
        })
    }

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
           this.setState({ postsArray: data })
            // console.log('MY DATA ===>', this.state.postsArray)
        })
       

    }  

    likesHandler = (post)=>{ 
       const uid = post.id
        const db = firebase.firestore();
        db.collection('posts').doc(uid).update({
            likes: post.likes += 1     
        })
        this.setState({clicked: true})
        this.fetchPost()
    }

    
    renderPost = post => {
        const userAvatar = this.state.usersArray.map((user) => {
            if(user.uid == post.uid){
                return (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('profileModal', {otherParam: post})}> 
                        <Image source={{uri: user.avatar}} style={styles.avatar} />
                    </TouchableOpacity>
                    
                )
            }
        })

        const userName = this.state.usersArray.map((user) => {
            if(user.uid == post.uid){
                return (
                    <Text style={styles.name}>{user.name} </Text>
                )
            }
        })

        return(
        
            <View style={styles.feedItem}>
               {userAvatar}
               <View style={{flex: 1}}>
                   <View style={{flexDirection: 'row', justifyContent:"space-between", alignItems: 'center'}}>
                       <View>
                            {userName}
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                       </View>
                   </View>
                   

                    <Text style={styles.posts}>{post.text}</Text>

                    <Image source={{uri: post.image}} style={styles.postImage} resizeMode="cover"/>
               
                    <View style={{flexDirection: 'row'}}>
                    <Text style={styles.posts}>{post.likes} {''}</Text>
                    <TouchableOpacity onPress={() => this.likesHandler(post)}>
                     <Ionicons name='ios-heart' size={24} color='#73788B' style={{marginRight: 16}} />
                        
                    </TouchableOpacity>   

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('commentsModal',
                    {otherParam: post})}> 
                        <Ionicons name='ios-chatbubbles' size={25} color='#73788B' />
                    </TouchableOpacity>
                    </View>
               </View>
            </View>
        )
    }
    
    render() {
        return(
        
            <View style={styles.container}>
                <View style={styles.header}>
                    
                    <Text style={styles.headerTitle} >Plantbaes</Text>
                    
                </View>

                <FlatList 
                style={styles.feed} 
                data={this.state.postsArray} 
                renderItem={ ({item}) => this.renderPost(item)} 
                renderUser={({item}) => this.fetchUser(item)} 
                keyExtractor={item =>item.id} 
                showsVerticalScrollIndicator={false}
                />
            </View>
            
            
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
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
        color: '#567353'
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
        height: 200,
        borderRadius: 5,
        marginVertical: 16

    },centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 30
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})