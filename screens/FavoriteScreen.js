import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import { SearchBar } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from 'firebase'


export default class FavoriteScreen extends Component {

    state = {
        user: [],
        plantsArray: []
    }

    componentDidMount(){
        const user = firebase.auth().currentUser.uid
        const { navigation } = this.props;
        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data() });
            });
    }

    fetchPlants =() => {
        fetch(`https://trefle.io/api/v1/plants/search?token=aYCdsl8fdCSxw9twFiFBvYnoZGaxFqSVD0lXApDWnnY&q=${this.state.search}&page=1&limit=5`)
        .then((response) => response.json())
        .then((json) => {
          this.setState({ 
            plantsArray: json.data});
        }) 
    }

//     render() {
     
//         return (
//             <View> 
//               <>
//             <ListItem bottomDivider>
//                 <Avatar source={{uri: plant.image_url === null ? 'https://cnet1.cbsistatic.com/img/KSgz75jjXU5AjvSuVkTIfOxi5WU=/940x0/2018/07/13/b5bb5e2c-daaa-4924-82f1-899a9507dc8d/smart-home-generic-6-6-18-0780.jpg' : plant.image_url }} />
//                 <ListItem.Content>
                
//                 <ListItem.Title>{plant.common_name}</ListItem.Title>
//                 <ListItem.Subtitle>{plant.scientific_name}</ListItem.Subtitle>               
//                 </ListItem.Content>
//                 <TouchableOpacity onPress={() => {this.checkHandler(plant.id)}} 
//                 style={styles.submitButton}>
//                     <Text style={styles.submitButtonText}>Add</Text>
//                 </TouchableOpacity>
                
//             </ListItem>
//             </>
//             </View>
//         )
//     }
}
