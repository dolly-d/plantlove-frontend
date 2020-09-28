import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import * as firebase from 'firebase'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    }
    state = {
        email: "",
        password: "",
        errorMessage: null
    };

    handleLogin = () =>{
        const {email, password} = this.state

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                // console.log('Auth Data', data)
            })
            .catch(error => this.setState({ errorMessage: error.message}))
    }
    
    render() {
        LayoutAnimation.easeInEaseOut()
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

                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation. goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
                </TouchableOpacity>


                <Text style={styles.greeting}>{`Hello friends!\nWelcome Back to plantbae`}</Text>
                
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email</Text>
                        <TextInput style={styles.input} 
                        autoCapitalize="none" 
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none"
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        
                        ></TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{ color: "#FFF", fontWeight: "500"}}>Log In !</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={{ alignSelf: "center", marginTop: 32}} 
                onPress={() => this.props.navigation.navigate("Registration")}>
                    <Text style={{ color: "#414959", fontSize: 20}}>
                        Not
                         a plantbae but want to be? <Text style={{ fontWeight: "500", color: "#1A4316"}}>Yes! </Text>
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
        marginBottom: 48,
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

    back: {
        position: 'absolute',
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(107, 142, 35, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    }
    

})