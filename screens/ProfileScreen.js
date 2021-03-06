import React from "react";
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
import Fire from "../Fire";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import { withNavigation } from "react-navigation";
import firebaseKeys from "../firebase";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import IGStoryCircle from "react-native-instagram-story-circle";
require("firebase/firestore");


export default class ProfileScreen extends React.Component {
  state = {
    user: {},
    postsArray: [],
    plantsArray: []
  };

  unsubscribe = null;


  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;
    const { navigation } = this.props;
    this.unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        this.setState({ user: doc.data() });
      });

    this.fetchPost();
    this.focusListener = navigation.addListener("didFocus", () => {
      this.fetchPost();
    });
    this.fetchPlants()
    this.focusListener = navigation.addListener('didFocus', () => {
    this.fetchPlants()
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
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

  state = {
    user: {
      name: "",
      email: "",
      password: "",
      avatar: undefined,
      following: [],
      followers: [],
    },
    errorMessage: false,
  };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  fetchPost = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseKeys);
    }
    firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          let id = doc.id;
          return doc.data(), { ...doc.data(), ["id"]: id };
        });
        this.setState({ postsArray: data.filter((post) => this.state.user.uid === post.uid) });
      });
  };

  postHandler = (post) => {
    const id = post.id;
    const db = firebase.firestore();
    db.collection("posts").doc(id).delete(); 
    this.fetchPost();
  };

  render() {
    const render =
      this.state.postsArray !== undefined
        ? this.state.postsArray.map((post) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      this.postHandler(post);
                    }}
                  >
                    <Ionicons name="ios-close" size={20} color="D8D9DB">
                    </Ionicons>
                    <Image source={{ uri: post.image }} style={styles.photo} />
                  </TouchableOpacity>
                </>
              );
          })
        : null;
        const uid = firebase.auth().currentUser.uid;
        const plants = this.state.plantsArray !== undefined
        ? this.state.plantsArray.map((plant) => {
          if (plant.uid === uid) {
            return (
              <>
             
                <TouchableOpacity onPress={() => {this.props.navigation.navigate("plantModal",
                {otherParam: plant.plant}
                )}}>
                  <Image
                  style={styles.favavatar}
                    source={{
                      uri:
                        plant.plant.image_url === null
                          ? "https://cnet1.cbsistatic.com/img/KSgz75jjXU5AjvSuVkTIfOxi5WU=/940x0/2018/07/13/b5bb5e2c-daaa-4924-82f1-899a9507dc8d/smart-home-generic-6-6-18-0780.jpg"
                          : plant.plant.image_url,
                    }}
                  />
                </TouchableOpacity>
              </>
            );
          }
        }) : null;

        return (

        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('editModal',
               { otherParam: this.state.user}
                )}>
                    <Ionicons name='ios-cog' size={30} color='#567353'></Ionicons>
                </TouchableOpacity>

            </View>
        <View style={styles.profile}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: this.state.user.avatar }}
              style={styles.avatar}
            />
          </View>
        <View style={{flexDirection: "column"}}>
          <Text style={styles.name}>{this.state.user.name}</Text>
          <Text style={{marginLeft: 18, marginTop: 10, maxWidth: 230}}>{this.state.user.bio}</Text>
        </View>
        </View>
         

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
        <Text style={styles.statAmount}>{(this.state.postsArray && this.state.postsArray.length) ? this.state.postsArray.length : 0}</Text>
            <Text style={styles.statTitle}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>
              {this.state.user.followers.length}
            </Text>
            <Text style={styles.statTitle}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>
              {this.state.user.following.length}
            </Text>
            <Text style={styles.statTitle}>Following</Text>
          </View>
        </View>
          <View style={styles.container}>
        <ScrollView horizontal={true}
        showsHorizontalScrollIndicator={false}
        >
          {plants}
          </ScrollView>
          </View>

        <ScrollView>
          <View style={styles.itemContainer}>{render}</View>
        </ScrollView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   borderBottomColor: '#D8D9DB',
   borderBottomWidth: 1,
   borderTopColor: '#D8D9DB',
   borderTopWidth: 1,
   paddingLeft: 15
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D9DB'
    },
  profile: {
    flexDirection: "row",
    alignItems: 'stretch',
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
    width: 160,
    height: 160,
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
  },
  edit: {
    marginLeft: 310
  },
  favavatar: {
    width: 50,
    height: 50,
    borderRadius: 68,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10
  }
});
