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
        modalVisible: false,
        comment: "",
        pickPost: []
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
    }

    commentHandler = ()=>{ 
        const { modalVisible } = this.state;
        this.setModalVisible(!modalVisible);

        return new Promise((res, rej) => {
            const comment = this.state.comment
            const uid = this.state.pickPost.id;
            const userid = firebase.auth().currentUser.uid;
            const db = firebase.firestore();
            const timestamp = Date.now();
            db.collection("comments")
            .add({
                text: comment,
                uid: userid,
                timestamp: timestamp,
                postid: uid,
            })
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error)
            })
        })
    }



    
    setModalVisible = (visible, post) => {
        this.setState({ modalVisible: visible, 
        pickPost: post
        });
    

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

                    <TouchableOpacity onPress={() => this.likesHandler(post)}>
                        <Ionicons name='ios-heart' size={24} color='#73788B' style={{marginRight: 16}} />
                        
                    </TouchableOpacity>   

                    <TouchableOpacity onPress={() => {this.setModalVisible(true, post);}}> 
                        <Ionicons name='ios-chatboxes' size={24} color='#73788B' />
                    </TouchableOpacity>
                    <Button title='comments' onPress={() => this.props.navigation.navigate('commentsModal',
                    {otherParam: post}
                    )}/>
                    </View>
               </View>
            </View>
        )
    }
    
    render() {
        const { modalVisible } = this.state;
        return(
            <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feed</Text>
                    
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
            
            <View style={styles.centeredView}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.modalText}>Post a Comment</Text>
                <Button title="Close"  onPress={() => {
                    this.setModalVisible(!modalVisible);
                    }}></Button>
                <TextInput
                    style={{  flexDirection: 'row',
                    alignSelf: 'stretch',
                     flex: 0}}
                    label="Comment"
                    onChangeText={(text) => this.setState({
                        comment: text
                    })}
                />
                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                    this.commentHandler()
                    }}
                >
                    <Text style={styles.textStyle}>Post Comment</Text>
                </TouchableHighlight>
                </View>
            </View>
            </Modal>
            </View>
            </>
            
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
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        shadowColor: "#000",
        width: 350,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 20,
        elevation: 2
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