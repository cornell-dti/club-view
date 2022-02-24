import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { TokenContext } from '../context/TokenContext';
import { useContext } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyC7qOZ_v2ECEaOahK3hrbCrN_2S3c-pE9U',
  authDomain: 'club-view.firebaseapp.com',
  projectId: 'club-view',
  storageBucket: 'club-view.appspot.com',
  messagingSenderId: '887040673815',
  appId: '1:887040673815:web:25592006260a829646b452',
  measurementId: 'G-JBRHXTNM4L',
};

initializeApp(firebaseConfig);

const auth = getAuth();
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

  const {setToken} = useContext(TokenContext);

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      user.getIdToken().then((id_token) => {
        setToken(id_token);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      console.log(errorCode, errorMessage, email);
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log('sign out complete');
    })
    .catch((error) => {
      console.log(error);
    });
};

export { SignIn as signIn, signOutUser as signOut, authRequestHeader };
