import GamesOutput from "../components/Game/GamesOutput";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { firestoreToArena } from "../util/http";

function MyGames() {
  return (
    <View>
      <Text>NOTHING YET</Text>
    </View>
  );
}

export default MyGames;
