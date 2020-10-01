import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Fire from "../Fire";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import { withNavigation } from "react-navigation";
import firebaseKeys from "../firebase";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
require("firebase/firestore");

export default class FavoriteScreen extends Component {
  state = {
    plantsArray: [],
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.fetchPlants()
    this.focusListener = navigation.addListener('didFocus', () => {
    this.fetchPlants()
    })
  }

  fetchPlants =()=>{
    firebase
      .firestore()
      .collection("plants")
      .get()
      .then((snapshot) => {
        let plantsData = snapshot.docs.map((doc) => {
          return doc.data();
        });
        this.setState({ plantsArray: plantsData });
      });
  }

  render() {
    const uid = firebase.auth().currentUser.uid;
    const plants = this.state.plantsArray.map((plant) => {
      if (plant.uid === uid) {
        return (
          <>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate("plantModal",
            {otherParam: plant.plant}
            )}}>
              <Image
                source={{
                  uri:
                    plant.plant.image_url === null
                      ? "https://cnet1.cbsistatic.com/img/KSgz75jjXU5AjvSuVkTIfOxi5WU=/940x0/2018/07/13/b5bb5e2c-daaa-4924-82f1-899a9507dc8d/smart-home-generic-6-6-18-0780.jpg"
                      : plant.plant.image_url,
                }}
                style={styles.photo}
              />
            </TouchableOpacity>
          </>
        );
      }
    });

    return (
        <>
          <View style={styles.header}>
                        <Text style={styles.headerTitle} > Favorites </Text>
                </View>
        <ScrollView>
          <View style={styles.itemContainer}>{plants}</View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
},
headerTitle: {
    fontSize: 20,
    color: '#567353'
},
  profile: {
    flexDirection: "row",
    alignItems: "stretch",
    marginLeft: 15,
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 30,
    shadowOpacity: 0.4,
    marginLeft: 15,
    marginTop: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 68,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 5,
    margin: 5,
  },
  name: {
    marginTop: 24,
    marginLeft: 15,
    fontSize: 16,
    color: "#1A4316",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#4F566D",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  edit: {
    marginLeft: 310,
  },
});
