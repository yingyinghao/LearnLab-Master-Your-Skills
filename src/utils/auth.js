import {auth, googleProvider} from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

export const signInWithGoogle = async() => {
  try {
    await signInWithPopup(auth,googleProvider)
  } catch (error) {
    console.log(error)
  }
}



export const logout = async() => {
    try {
      await signOut(auth);
    } catch (error) {
    console.log(error)
      }
    }



let email, password;
export const emailLogIn = async() => {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
     } catch (error) {
      console.log(error)
       }
     }