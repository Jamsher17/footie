import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import { fireVenueToArena } from "../util/http";
import VenuesOutput from "../components/Venue/VenuesOutput";

function BookGame() {
  const db = firebase.firestore();
  const storageRef = firebase.storage().ref("venue-pictures");

  const [venues, setVenues] = useState();

  async function fetchVenues() {
    const snapshot = await db.collection("venues").get();
    return snapshot;
  }

  useEffect(() => {
    fetchVenues().then((snapshot) => {
      const temp = [];
      snapshot.forEach((venue) => {
        temp.push(fireVenueToArena(venue));
      });
      setVenues(temp);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {venues && <VenuesOutput venues={venues} />}
    </View>
  );
}

export default BookGame;
