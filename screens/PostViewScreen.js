import React from "react";
import firebase from 'firebase'

import { 
    View, 
    Text, 
    TextInput,
    StyleSheet, 
    Button, 
    Image, 
    ScrollView, 
    TouchableOpacity, 
    SafeAreaView} from "react-native";
import {Ionicons} from '@expo/vector-icons'


export default class PostViewScreen extends React.Component {
    state = {
        usersArray: [],
        modalVisible: false,
        commentsArray: [],
    }
    
    componentDidMount(){
        const { navigation } = this.props;
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

    

    render() {
        const postid = this.props.navigation.state.params.otherParam.id
        // console.log(this.state.commentsArray)
        const comments = this.state.commentsArray.map((comment) => {
            if (postid === comment.postid ){
                return(
                    <>
                <Text>{comment.text}</Text>
                {/* <Text>{comment.uid}</Text> */}
                </>
                )
            }

        })
        
        
        return(
            <SafeAreaView style={styles.container}>
                 
                 <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name='md-arrow-back' size={24} color='#D8D9DB'></Ionicons>
                    </TouchableOpacity>
                        <Text style={{fontWeight: '500'}}> Comments </Text>
                </View>
        
                {comments}
                 
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
    }
})