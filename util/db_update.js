import { useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export function updateUserDoc() {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;

  const { fullName, nickname, position, image, age } = useSelector(
    (state) => state.userProfile.profile
  );

  db.collection("users").doc(currentUser).set({
    nickname: nickname,
    fullName: fullName,
    age: age,
    phoneNumber: phoneNumber,
    position: position,
    image: image,
  });
}
