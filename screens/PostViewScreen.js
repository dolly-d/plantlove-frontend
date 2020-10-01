import React from "react";
import firebase from 'firebase'
import Fire from "../Fire";
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    Image, 
    ScrollView, 
    TouchableHighlight,
    TouchableOpacity, 
    SafeAreaView,
    TextInput
} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { ListItem } from 'react-native-elements'
import moment from 'moment'



export default class PostViewScreen extends React.Component {
    state = {
        usersArray: [],
        modalVisible: false,
        commentsArray: [],
        user: ""
    }
    
    componentDidMount(){
        const user = this.props.uid || Fire.shared.uid;
        const { navigation } = this.props;
        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data() });
            });
        this.fetchComments(); 
        this.fetchUsers();
        this.focusListener = navigation.addListener('didFocus', () => {
            this.fetchComments();
            this.fetchUsers();
        });
    }
    
    fetchComments =()=>{
        firebase.firestore()
        .collection('comments')
        .get()
        .then(snapshot => {
            let data = snapshot.docs.map((doc) => {
                let id = doc.id
                return (doc.data(),
                { ...doc.data(), ['id']: id })  
                
            })
           this.setState({ commentsArray: data })
            // console.log('MY DATA ===>', this.state.commentsArray)
        })
    }

    fetchUsers =()=>{
        firebase.firestore()
        .collection('users')
        .get()
        .then(snapshot => {
            let userData = snapshot.docs.map((doc) => {
                return doc.data();
            })
           this.setState({ usersArray: userData })
            // console.log('MY DATA ===>', this.state.usersArray)
        })
    }

  

    commentHandler = ()=>{ 
        return new Promise((res, rej) => {
            const comment = this.state.comment
            const uid = this.props.navigation.state.params.otherParam.id
            const userid = firebase.auth().currentUser.uid;
            const db = firebase.firestore();
            const timestamp = Date.now();
            const username = this.state.user.name
            db.collection("comments")
            .add({
                text: comment,
                uid: userid,
                timestamp: timestamp,
                postid: uid,
                name: username
            })
            .then(ref => {
                res(ref)
            })
            .then(this.fetchComments())
            .catch(error => {
                rej(error)
            })
        })
        
    }


    

    render() {
        const postid = this.props.navigation.state.params.otherParam.id
        // console.log(this.state.commentsArray)
        const comments = this.state.commentsArray.map((comment) => {
            if (postid === comment.postid ){
                return(
                <ListItem>
                      <ListItem.Content>
                <ListItem.Subtitle>{comment.name}- {moment(comment.timestamp).fromNow()}</ListItem.Subtitle>
                <ListItem.Title>{comment.text}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                )
            }

        })
        
        
        return(
            

            <SafeAreaView style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name='ios-undo' size={24} color='#567353'></Ionicons>
                    </TouchableOpacity>
                        
                </View>
        
                <ScrollView>
                {comments}
                </ScrollView>
              
                 
                <View style={{flexDirection:'row', alignItems: "flex-end"}}>
                <TextInput
                    style={styles.input}
                    clearButtonMode= 'while-editing'
                    placeholder={'Comment'}
                    onChangeText={(text) => this.setState({
                        comment: text
                    })}
                />
                    <TouchableOpacity onPress={() => {this.commentHandler()}} 
                    style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Post</Text>
                    </TouchableOpacity>
                </View>
                
                 
            </SafeAreaView>
        )  
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 20,
        elevation: 2
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row'
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16

    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    },
    container: {
        paddingTop: 23
     },
     input: {
        flex: 1,
        margin: 15,
        height: 40,
        borderColor: '#567353',
        borderWidth: 1
     },
     submitButton: {
        flex: 0,
        backgroundColor: '#567353',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 5
     },
     submitButtonText:{
        color: 'white'
     }
})