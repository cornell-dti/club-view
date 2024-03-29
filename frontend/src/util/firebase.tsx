import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { TokenContext } from '../context/TokenContext';
import { useContext } from 'react';
import axios from 'axios';

const firebaseConfig = {
  apiKey: 'AIzaSyC7qOZ_v2ECEaOahK3hrbCrN_2S3c-pE9U',
  authDomain: 'club-view.firebaseapp.com',
  projectId: 'club-view',
  storageBucket: 'club-view.appspot.com',
  messagingSenderId: '887040673815',
  appId: '1:887040673815:web:25592006260a829646b452',
  measurementId: 'G-JBRHXTNM4L',
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  hd: 'cornell.edu',
});
provider.addScope('email');
provider.addScope('profile');

const authRequestHeader = {
  headers: {
    Authorization: 'Bearer ',
    //replace with auth context with ID token below,
  },
};

const SignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(user);
      axios.post('http://localhost:8000/students/register', user);
      user.getIdToken().then((id_token) => {});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      console.log(errorCode, errorMessage, email);
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

const currentUser = async () => {
  try {
    const user = getAuth().currentUser;
    return user;
  } catch {
    SignIn();
  }
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log('sign out complete');
    })
    .catch((error) => {
      console.log(error);
    });
};

const uploadImage = async (image: File, clubName: string) => {
  const clubNameParsed = clubName.replace(' ', '_');
  const storageRef = ref(storage, `${clubNameParsed}/${uuidv4()}`);
  const snapshot = await uploadBytes(storageRef, image);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export {
  SignIn as signIn,
  signOutUser as signOut,
  uploadImage,
  authRequestHeader,
  currentUser,
};
