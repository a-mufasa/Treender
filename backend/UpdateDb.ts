import { doc, setDoc } from "firebase/firestore"; 
import { db, auth } from "../firebaseConfig"

export async function setUserInfo(userInfo: Map<string, string>) {
    try {
        await setDoc(doc(db, "users", auth.currentUser?.uid!), {
            fName: userInfo.get('fName'),
            lName: userInfo.get('lName'),
            about: userInfo.get('about'),
            state: userInfo.get('state'),
            city: userInfo.get('city'),
            eyes: userInfo.get('eyes'),
            trees: userInfo.get('trees')
        })
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}