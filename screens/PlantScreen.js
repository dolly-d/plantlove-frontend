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
                <View style={styles.header}> 
                <Text style={styles.moreInfo} color='#567353'> More Info </Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name='ios-undo' size={24} color='#567353'></Ionicons>
                    </TouchableOpacity>
                    </View>
                
                
            <View style={styles.plantsContainer}>

            <View style={styles.plant}>     
                <Image
                        style={styles.photo}
                        source={{uri: this.props.navigation.state.params.otherParam.image_url }}/> 
            <Text style={styles.plantStat}> Name: </Text> 
                <Text style={styles.plantInfo}>{this.props.navigation.state.params.otherParam.common_name}</Text>
                
                <Text style={styles.plantStat}> Scientific Name </Text> 
                <Text style={styles.plantInfo}>{this.props.navigation.state.params.otherParam.scientific_name}</Text>
                <Text style={styles.plantStat}> Genus: </Text> 
                <Text style={styles.plantInfo}>{this.props.navigation.state.params.otherParam.genus}</Text>
                <Text style={styles.plantStat}> Family: </Text> 
                <Text style={styles.plantInfo}>{this.props.navigation.state.params.otherParam.family}</Text>

                </View>
                </View>
                
            </SafeAreaView>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
     
    },
    header: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      paddingHorizontal: 32,
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#D8D9DB'
    },
    plantsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32,
      },
      plant: {
        alignItems: "center",
        flex: 1,
      },
      plantStat: {
        color: "#567353",
        fontSize: 30,
        fontWeight: "300",
      },
      plantInfo: {
        color: "#1A4316",
        fontSize: 20,
        fontWeight: "500",
        marginTop: 4,
        paddingBottom: 20
      },
      photo: {
        width: 160,
        height: 160,
        borderRadius: 5,
        margin: 5,
        marginBottom: 10
      },
      moreInfo: {
        color: "#1A4316",
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 4,
      },





})