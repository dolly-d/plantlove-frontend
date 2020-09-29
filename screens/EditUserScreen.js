import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import Fire from '../Fire'
import firebase from 'firebase'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'
import { shadow } from 'react-native-paper';

export default class EditUserScreen extends React.Component {

    state = {
        user: {
            name: this.props.navigation.state.params.otherParam.name,
            bio: this.props.navigation.state.params.otherParam.bio,
            avatar: this.props.navigation.state.params.otherParam.avatar
        }
    };

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing :true,
            aspect: [4, 3]
        })
       
        if (!result.cancelled){
            this.setState({user: {...this.state.user, avatar: result.uri} })
        }
    }    

    handleSignUp = () =>{
        const uid = this.props.navigation.state.params.otherParam.uid
        const db = firebase.firestore();
        db.collection('users').doc(uid).update({
            name: this.state.user.name,
            bio: this.state.user.bio,
            avatar: this.state.user.avatar   
        })
        this.props.navigation.goBack()
    }  

    

    render() {
        
        return(
       
            <View style={styles.container}>
            
            <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{uri: this.state.user.avatar}} style={styles.avatar}/>
                        <Ionicons 
                        name='ios-add' 
                        size={40} 
                        color='#FFF' 
                        style={{ marginTop: 6, marginLeft: 2}}>         
                        </Ionicons>
                </TouchableOpacity>
                    
        

                <View style={styles.form}> 
                    <View>
                        <Text style={styles.inputTitle}> Name</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={name => this.setState({ user: {...this.state.user, name} })}
                                value={this.state.user.name}
                            
                            ></TextInput>  
    
                        <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Bio</Text>
                        <TextInput style={styles.input} 
                            autoCapitalize="none" 
                            onChangeText={bio => this.setState({ user: {...this.state.user, bio} })}
                            value={this.state.user.bio}
                        ></TextInput>
              

                    </View>           
                    </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500"}}>Confirm Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {
                        Fire.shared.signOut();
                    }}>
                    <Text style={{ color: "red", fontWeight: "500"}}>Sign Out</Text>
                </TouchableOpacity>

        

            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },

    greeting: {
        margin: 32,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#414959"
    },

    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },

    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
        
    },

    form: {
        marginBottom: 20,
        marginHorizontal: 30
    },

    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"

    },

    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
       
    },

    button: {
        marginHorizontal: 30,
        backgroundColor: "#567353", 
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },

    avatarPlaceholder: {
        // position: 'absolute',
        alignItems: "center",
        width: 80,
        height: 80,
        backgroundColor: '#E1B3A2',
        borderRadius: 50,
        marginTop: 100,
        marginLeft: 153,
        justifyContent: 'center',
        alignItems: 'center'
    },

    avatar: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        
        
    }
})