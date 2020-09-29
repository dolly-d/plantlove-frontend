import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    TextInput
} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { ListItem, Avatar } from 'react-native-elements'
import firebase from 'firebase'




export default class MessageScreen extends React.Component {
    state = {
        search: "Maple",
        plantsArray: [],
        favorites: []
      };

      componentDidMount() {
        this.fetchPlants()
      }

      updateSearch = () => {
        this.fetchPlants()
      };

      fetchPlants =() => {
        fetch(`https://trefle.io/api/v1/plants/search?token=aYCdsl8fdCSxw9twFiFBvYnoZGaxFqSVD0lXApDWnnY&q=${this.state.search}&page=1&limit=5`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ 
          plantsArray: json.data});
      }) 
        }

    checkHandler = (id)=>{
        this.setState({
        favorites: [...this.state.favorites, id]
        })
    }

    postFavorites= () => {
        const uid = firebase.auth().currentUser.uid
        const db = firebase.firestore();
        db.collection('users').doc(uid).update({
            favorites: this.state.favorites
        })
        this.setState({favorites: []})
    }

    render() {
        const { search } = this.state;
        console.log(this.state.favorites)
        const plant = this.state.plantsArray.map(plant=> {
            return(
            <>
            <ListItem bottomDivider>
                <Avatar source={{uri: plant.image_url === null ? 'https://cnet1.cbsistatic.com/img/KSgz75jjXU5AjvSuVkTIfOxi5WU=/940x0/2018/07/13/b5bb5e2c-daaa-4924-82f1-899a9507dc8d/smart-home-generic-6-6-18-0780.jpg' : plant.image_url }} />
                <ListItem.Content>
                
                <ListItem.Title>{plant.common_name}</ListItem.Title>
                <ListItem.Subtitle>{plant.scientific_name}</ListItem.Subtitle>               
                </ListItem.Content>
                <TouchableOpacity onPress={() => {this.checkHandler(plant.id)}} 
                style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Add</Text>
                </TouchableOpacity>
                
            </ListItem>
            </>
            )
        })
        return(
            <SafeAreaView>
            <View style={{flexDirection:'row', alignItems: "flex-end"}}>
            <TextInput
                style={styles.input}
                label="Search"
                onChangeText={(text) => this.setState({
                    search: text
                })}
            />
                <TouchableOpacity onPress={() => {this.updateSearch()}} 
                style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
            {plant}
            </ScrollView>
            {this.state.favorites.length > 0 ? 
            <Button title = "submit" onPress={()=>{this.postFavorites()}}></Button>
         : null}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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