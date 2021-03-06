import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import Fire from '../Fire'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'
import { shadow } from 'react-native-paper';

export default class RegistrationScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    }
    state = {
        user: {

            name: "",
            bio: "",
            email: "",
            password: "",
            avatar: undefined
        },
        errorMessage: false
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
        Fire.shared.createUser(this.state.user)
    }  

    render() {
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content"> </StatusBar>
                <Image 
                source={require("../assets/plantbae1.png")} 
                style={{marginTop: 76, marginRight: 20, alignItems: "center", width: "60%", height: "10%"}}
                ></Image>
                
                <Image 
                source={require('../assets/authFooter.png')} 
                style={{position: 'absolute', bottom: -325, right: -225}}
                ></Image>

                <View style={{ position: "absolute", top: 154, alignItems: "center", width: "100%", flex: 1 }}>
                    <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>
                    
                </View>
                
                <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{uri: this.state.user.avatar}} style={styles.avatar}/>
                        <Ionicons 
                        name='ios-add' 
                        size={40} 
                        color='#FFF' 
                        style={{ marginTop: 6, marginLeft: 2}}>         
                        </Ionicons>
                </TouchableOpacity>
                    
                
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}> 
                    <View>
                        <Text style={styles.inputTitle}> Full Name</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={name => this.setState({ user: {...this.state.user, name} })}
                                value={this.state.user.name}
                            
                            ></TextInput>                      
                    </View>
                

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email</Text>
                        <TextInput style={styles.input} 
                        autoCapitalize="none" 
                        onChangeText={email => this.setState({ user: {...this.state.user, email} })}
                        value={this.state.user.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none"
                        onChangeText={password => this.setState({ user: {...this.state.user, password}})}
                        value={this.state.user.password}
                        
                        ></TextInput>
                    </View>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500"}}>Sign Up!</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={{ alignSelf: "center", marginTop: 32}} 
                onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={{ color: "#414959", fontSize: 20}}>
                       Already a plantbae? <Text style={{ fontWeight: "500", color: "#1A4316"}}>Log In! </Text>
                    </Text>
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
        justifyContent: "center"
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