import React from 'react'
import firebaseKeys from './firebase'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegistrationScreen from './screens/RegistrationScreen'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import EditUserScreen from './screens/EditUserScreen'
import PostScreen from './screens/PostScreen'
import ProfileScreen from './screens/ProfileScreen'
import FavoriteScreen from './screens/FavoriteScreen'
import { AppRegistry } from "react-native"
import App from "./App"
import { name as appName } from "./app.json"  
import PostViewScreen from './screens/PostViewScreen'
import UserScreen from './screens/UserScreen'
import PlantScreen from './screens/PlantScreen'

AppRegistry.registerComponent(appName, () => App)



 const AppContainer = createStackNavigator({
        default: createBottomTabNavigator({

            Home: {
                screen: HomeScreen,
                navigationOptions: {
                    tabBarIcon: ({ tintColor}) => <Ionicons 
                    name="ios-home" 
                    size={24} 
                    color={tintColor} 
                    /> 
   
                }
            },
        
            Search: {
                screen: SearchScreen,
                navigationOptions: {
                    tabBarIcon: ({ tintColor}) => <Ionicons 
                    name="ios-search" 
                    size={24} 
                    color={tintColor} /> 
        
                }
            },
        
            Post: {
                screen: PostScreen,
                navigationOptions: {
                    tabBarIcon: ({ tintColor}) => 
                    <Ionicons 
                    name="ios-add-circle" 
                    size={35} 
                    color='#567353' 
                    style={{
                        shadowColor: '#567353', 
                        shadowOffset: {width: 0, height: 0},
                        shadowRadius: 10, 
                        shadowOpacity: 0.3
                        
                    }} /> 
            
                }
                },
        
            Favorites: {
                screen: FavoriteScreen,
                navigationOptions: {
                    tabBarIcon: ({ tintColor}) => 
                    <Ionicons 
                    name="ios-heart" 
                    size={24} 
                    color={tintColor} /> 

                }
                },

                Profile: {
                    screen: ProfileScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor}) => <Ionicons 
                        name="ios-person" 
                        size={24} 
                        color={tintColor} /> 
        
                        
                    }
                }
        },
        {
            tabBarOptions: {
                activeTintColor: '#567353',
                inactiveTintColor: '#B8BBc4',
                showLabel: false
            },
            
            initialRouteName: 'Home'
        },
        {   
                defaultNavigationOptions: {
                    tabBarOnPress: ({ navigation, defaultHandler}) => {
                        if (navigation.state.key === "Post") {
                            navigation.navigate('postModal')
                        } else {
                            defaultHandler()
                        }
                    }
                }


        }

        
        ),

        postModal: {
            screen: PostScreen
        },
        commentsModal: {
            screen: PostViewScreen
        },
        profileModal: {
            screen: UserScreen   
        },
        editModal: {
            screen: EditUserScreen
        },
        plantModal: {
            screen: PlantScreen
        }

    },
    {
        mode: 'modal',
        headerMode: 'none'
        
    }
 )


 const AuthStack = createStackNavigator ({
     Registration: RegistrationScreen,
     Login: LoginScreen,
 },{
     initialRouteName: 'Registration'
 })

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppContainer,
            Auth: AuthStack,
        },
        {
            initialRouteName: "Loading"
        }
    )
)




