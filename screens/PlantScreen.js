import React from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import Fire from "../Fire";
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import { withNavigation } from 'react-navigation'
import firebaseKeys from '../firebase'
import firebase from 'firebase'
import {Ionicons} from '@expo/vector-icons'
require('firebase/firestore')

export default class PlantScreen extends React.Component {
    render(){
        return(
            <SafeAreaView>
            <Text>{this.props.navigation.state.params.otherParam.common_name}</Text>
            </SafeAreaView>
        )
    }
}