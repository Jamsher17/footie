import GamesOutput from "../components/Game/GamesOutput";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { firestoreToArena } from "../util/http";

function Favorites({ navigation }) {
  const dispatch = useDispatch();
  const myGamesIds = useSelector((state) => state.myGames.ids);

  const [myGames, setMyGames] = useState([]);
  navigation.setOptions({
    tabBarBadge: () => {},
  });

  const db = firebase.firestore();

  async function fetchGames() {
    if (myGamesIds.length > 0) {
      const snapshot = await db
        .collection("games")
        .where(firebase.firestore.FieldPath.documentId(), "in", myGamesIds)
        .get();

      return snapshot;
    }
  }
  useEffect(() => {
    const temp = [];
    fetchGames().then((snapshot) => {
      if (myGamesIds.length > 0) {
        snapshot.forEach((game) => {
          temp.push(firestoreToArena(game));
        });
      }
      setMyGames(temp);
    });
  }, [myGamesIds]);

  return <GamesOutput games={myGames} />;
}

export default Favorites;
