import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import GamesOutput from "../components/Game/GamesOutput";
import { GlobalStyles } from "../constants/Styles";
import { Ionicons } from "@expo/vector-icons";

import { getCurrentDate, getFormattedDate } from "../util/date";
import { firestoreToArena } from "../util/http";

function AllGames({ navigation }) {
  const db = firebase.firestore();
  const [games, setGames] = useState([]);

  const [dayDiff, setDayDiff] = useState(0);
  const currentDate = getFormattedDate(getCurrentDate(dayDiff));

  async function fetchGames() {
    const snapshot = await db.collection("games").get();
    return snapshot;
  }

  useEffect(() => {
    fetchGames().then((snapshot) => {
      const tempArr = [];
      snapshot.forEach((game) => {
        tempArr.push(firestoreToArena(game));
      });
      setGames(tempArr);
    });
  }, []);

  if (games) {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "center",
            height: "8%",
            width: "80%",
            flexDirection: "row",
          }}
        >
          <Ionicons
            name="md-caret-back-outline"
            size={45}
            color="black"
            disabled={dayDiff == 0 ? true : false}
            onPress={() => setDayDiff(dayDiff - 1)}
            style={{ opacity: dayDiff == 0 ? 0.4 : 1 }}
          />
          <Pressable>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "bold",
                color: GlobalStyles.colors.accent,
              }}
            >
              {currentDate}
            </Text>
          </Pressable>
          <Ionicons
            name="md-caret-forward-outline"
            size={45}
            color="black"
            disabled={dayDiff == 7 ? true : false}
            onPress={() => setDayDiff(dayDiff + 1)}
            style={{ opacity: dayDiff == 7 ? 0.4 : 1 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <GamesOutput
            games={games.filter(
              (game) => getFormattedDate(game.day_time) === currentDate
            )}
          />
        </View>
        <View style={{ width: "100%", height: "100%", position: "absolute" }}>
          <Pressable
            onPress={() => {
              navigation.jumpTo("Забронировать");
            }}
            style={{
              padding: 10,
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Ionicons name="checkmark-circle-outline" size={60} color="black" />
          </Pressable>
        </View>
      </View>
    );
  }
}

export default AllGames;
