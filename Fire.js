import firebaseKeys from './firebase'
import firebase from 'firebase'
require('firebase/firestore')

class Fire {
    constructor() {
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseKeys)
        }
    }


    // componentDidMount(){
    //     const posts = firebase.database.ref('posts')
    //     posts.on('value',datasnap=>{
    //      console.log(datasnap.val)
    //     })
    //  }

    

    addFollower = () => {
        // note* update the newly followed user with your id as a follower
    }

    getUserById = (id) => {
        // console.log('id', id)
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
                image: remoteUri,
                comments: [],
                likes: 0
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
    
    //update user by id...query user...get user.id 
    // sending your following user.followers.push()

    createUser = async user => {
        let remoteUri = null;
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection("users").doc(this.uid);
            console.log(user)
            db.set({
                name: user.name,
                email: user.email,
                avatar: user.avatar || '',
                following: [],
                followers: [],
                uid: this.uid
            });

            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);

                db.set({ avatar: remoteUri }, { merge: true });
            }
        } catch (error) {
            // console.log("Error: ", error);
        }
    }

    signOut = () => {
        firebase.auth().signOut();
    }

    get firestore(){
        return firebase.firestore()
    }

    get uid() {
        let uid = firebase.auth().currentUser.uid;
        return uid;
    }

    get timestamp(){
        return Date.now()
    }
}

// export const db = firebase.firestore()

Fire.shared = new Fire()
export default Fire;