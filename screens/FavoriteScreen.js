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

  render (){
    return (
      <View style={styles.container}>
        <Text>
          Whas poppin
        </Text>
      </View>
    )
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
