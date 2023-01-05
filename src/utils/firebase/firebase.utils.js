import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDxJ_k-lJHxfrfA12w966jKt0fn2S5ndIk",
    authDomain: "crwn-clothing-db-7b878.firebaseapp.com",
    projectId: "crwn-clothing-db-7b878",
    storageBucket: "crwn-clothing-db-7b878.appspot.com",
    messagingSenderId: "888368713081",
    appId: "1:888368713081:web:759705ec1dec3b7a00f3a8"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef =doc(db, 'users', userAuth.uid );

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        }catch (error){
            console.log('error creating the user', error.message);
        };
    };

    return userDocRef;
};