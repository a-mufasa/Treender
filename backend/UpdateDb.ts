import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"; 
import { db, auth } from "../firebaseConfig"
import { DataT } from "../types";

export let curState = ''
export let curCity = ''

export async function setUserInfo(userInfo: Map<string, string>) {
    curState = userInfo.get('state')!
    curCity = userInfo.get('city')!
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

// ONLY FOR SETTING INITIAL DB TO ENSURE CONSISTENTCY
export async function setTreeInfo() {
    try {
        await setDoc(doc(db, "trees", "Eastern Red Cedar"), {
            state: "AR",
            height: "45",
            width: "14",
            bio: "Hi there, I'm an Eastern Red Cedar! I may not be your typical date, but I have a lot to offer. I'm a slow-growing evergreen tree that can live up to 800 years! I'm also known for my pleasant fragrance and my ability to attract wildlife. If you're looking for a long-term commitment, I'm your tree!",
            image: ""
        })
    } catch (error) {}
}

export async function getTreeInfo(tree: string) {
    const docRef = doc(db, "trees", tree)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const info = docSnap.data()
        const returnMap = new Map();

        returnMap.set('image', info['fName']);

        return returnMap
    } else {
        return new Map();
    }
}

export async function getTreeByState(state: string): Promise<DataT[]> {
    const trees: DataT[] = []
    const q = query(collection(db, "trees"), where("state", "==", state))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const entry: DataT = {
            name: doc.id,
            description: doc.data().get('bio'),
            image: doc.data().get('image')
        }
        trees.push(entry)
      });
      return trees
}