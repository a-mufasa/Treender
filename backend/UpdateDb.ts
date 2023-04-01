import { doc, getDoc, setDoc } from "firebase/firestore"; 
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

export async function getUserInfo(): Promise<Map<string, string>> {
    const docRef = doc(db, "users", auth.currentUser?.uid!)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const info = docSnap.data()
        const returnMap = new Map();

        returnMap.set('fName', info['fName']);
        returnMap.set('lName', info['lName']);
        returnMap.set('about', info['about']);
        returnMap.set('state', info['state']);
        returnMap.set('city', info['city']);
        returnMap.set('eyes', info['eyes']);
        returnMap.set('trees', info['trees']);

        return returnMap
    } else {
        return new Map();
    }
}