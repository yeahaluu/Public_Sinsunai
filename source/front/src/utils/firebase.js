import * as firebase from "firebase";
import "firebase/firestore";
import config from "../../firebase.json";
import { storeData, getData } from "../utils/asyncstorage";

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

const Auth = app.auth();

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

const uploadImage = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("네트워크 요청 실패 ㅠㅠ"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const user = Auth.currentUser;
  const ref = app.storage().ref(`/profile/${user.uid}/photo.png`);
  const snapshot = await ref.put(blob, { contentType: "image/png" });

  // const storage = getStorage();
  // const storageRef = ref(storage, `/profile/${user.uid}/photo.png`);
  // await uploadBytes(storageRef, blob);

  blob.close();
  // return await getDownloadURL(storageRef);
  return await snapshot.ref.getDownloadURL();
};

export const signup = async ({ email, password, name, photoUrl }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  const storageUrl = photoUrl.startsWith("https")
    ? photoUrl
    : await uploadImage(photoUrl);
  await user.updateProfile({
    displayName: name,
    photoURL: storageUrl,
  });
  const userId = user.uid;
  const DB = firebase.firestore();
  const newUserRef = DB.collection("users").doc();
  const newUser = {
    email,
    userId,
    storageUrl,
  };
  await newUserRef.set(newUser);
  return user;
};

export const logout = async () => {
  storeData("token", "0");
  return await Auth.signOut();
};

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = Auth.currentUser;
  return { uid, name: displayName, email, photoUrl: photoURL };
};

export const updateUserPhoto = async (photoUrl) => {
  const user = Auth.currentUser;
  const storageUrl = photoUrl.startsWith("https")
    ? photoUrl
    : await uploadImage(photoUrl);
  await user.updateProfile({
    photoURL: storageUrl,
  });
  return { name: user.displayName, email: user.email, photoUrl: user.photoURL };
};

// export const DB = getFirestore();

// export const createChannel = async ({ title }) => {
//   const db = getFirestore();
//   // console.log(db instanceof Firestore); // true
//   const docRef = await addDoc(collection(db, "channels"), {
//     title,
//     createdAt: Date.now(),
//   });
//   const id = docRef.id;
//   return id;
// };

export const DB = firebase.firestore();

export const createChannel = async (title) => {
  const newChannelRef = DB.collection("channels").doc();
  const id = newChannelRef.id;
  const date = Date.now();
  const user = Auth.currentUser;
  const userId = user.uid;
  const newChannel = {
    id,
    title,
    createdAt: date,
    member: [userId],
  };
  await newChannelRef.set(newChannel);
  return id;
};

export const createMessage = async ({ channelId, message }) => {
  return await DB.collection("channels")
    .doc(channelId)
    .collection("messages")
    .doc(message._id)
    .set({
      ...message,
      createdAt: Date.now(),
    });
};

export const getChatList = async () => {
  const memeberRef = DB.collection("channels");
  const user = Auth.currentUser;
  const chatList = memeberRef.where("member", "array-contains", user.uid);
  console.log(chatList);
  return await chatList;
};

export const addChatUser = async (title) => {
  const { uid } = getCurrentUser();
  const channelRef = DB.collection("channels");
  // const temp = { id: 0, title: "" };
  let ids = 0;
  const changeId = (id) => {
    ids = id;
  };
  const a = async () =>
    channelRef
      .where("title", "==", title)
      .get()
      .then((docs) => {
        // console.log(docs);
        docs.forEach((doc) => {
          // console.log(doc.data());
          const { id } = doc.data();
          channelRef.doc(id).update({
            member: firebase.firestore.FieldValue.arrayUnion(uid),
          });
          // temp.id = id;
          changeId(id);
          console.log("내부 아이디 : " + id);
          return id;
        });
      });
  console.log("함수 에이 : " + (await a()));
  console.log("아이디" + ids);
  return { id: ids, title };
  // channelRef.doc("yJTEAm1atQrLwkSDTlj0").update({
  //   member: firebase.firestore.FieldValue.arrayUnion(uid),
  // });
};
