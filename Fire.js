import firebaseKeys from './firebase'
import firebase from 'firebase'
require('firebase/firestore')

class Fire {
    constructor() {
        if(!firebase.apps.length){
        firebase.initializeApp(firebaseKeys)
        }
    }

    addFollows = (data) => {
        console.log("data", data);
        // note* this is the user the current user will follow
        // push selected user uid to current users follows array
        
    }

    addFollower = () => {
        // note* update the newly followed user with your id as a follower
    }

    getUserById = (id) => {
        console.log('id', id)
        // 1. query firebase db
        // 2. return user by uid            
    }

    getAllFollowers = () => {

        // returns array of all users followers
    }

    addPost = async ({text, localUri}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`)

        return new Promise((res, rej) => {
            this.firestore
            .collection("posts")
            .add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri
            })
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error)
            })
        })
    }

    uploadPhotoAsync = async (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase
            .storage()
            .ref(filename)
            .put(file)

            upload.on('state_changed', snapshot => {}, err => {
                rej(err)
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL()
                res(url)
            }
            )
        })
    }

    createUser = async user => {
        let remoteUri = null;
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection("users").doc(this.uid);
            db.set({
                name: user.name,
                email: user.email,
                avatar: ''
            });

            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);

                db.set({ avatar: remoteUri }, { merge: true });
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    signOut = () => {
        firebase.auth().signOut();
    }

    get firestore(){
        return firebase.firestore()
    }

    get uid() {
        // let uid = (firebase.auth().updateCurrentUser || {}).uid;
        let uid = firebase.auth().currentUser.uid;
        return uid;
    }

    get timestamp(){
        return Date.now()
    }
}

Fire.shared = new Fire()
export default Fire;