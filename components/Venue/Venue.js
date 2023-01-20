import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const availability = {
  "8:00": true,
  "8:30": true,
  "9:00": true,
  "9:30": true,
  "10:00": true,
  "10:30": true,
  "11:00": true,
  "11:30": true,
  "12:00": true,
  "12:30": true,
  "13:00": true,
  "13:30": true,
  "14:00": true,
  "14:30": true,
  "15:00": true,
  "15:30": true,
  "16:00": true,
  "16:30": true,
  "17:00": true,
  "17:30": true,
  "18:00": true,
  "18:30": true,
  "19:00": true,
  "19:30": true,
  "20:00": true,
  "20:30": true,
  "21:00": true,
  "21:30": true,
  "22:00": true,
  "22:30": true,
  "23:00": true,
  "23:30": true,
  "00:00": true,
  "00:30": true,
  "1:00": true,
};

function Venue({ venue }) {
  const db = firebase.firestore();
  const storageRef = firebase.storage().ref("venue-pictures");
  const [image, setImage] = useState();

  useEffect(() => {
    storageRef
      .child(`${venue.name.toLowerCase()}.jpg`)
      .getDownloadURL()
      .then((url) => {
        db.collection("venues")
          .doc(venue.id)
          .update({ availability: availability })
          .then(() => {
            console.log("Availability Uploaded");
          });
        setImage(url);
        console.log("GOT URL");
      });
  }, [image]);

  return (
    <View style={styles.component}>
      {image && (
        <View>
          <Image
            source={{
              uri: image,
            }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
          <View style={styles.tintContainer} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{venue.name}</Text>
            {/* <Text style={styles.address}>
              ул.Навои, напротив ресторана "Milliy Taomlar"
            </Text> */}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 10,
    height: screenHeight * 0.2,
    width: screenWidth * 0.9,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.secondary,
  },
  text: {
    fontSize: 25,
    color: "white",
    fontFamily: "primary",
  },
  address: {
    fontSize: 16,
    color: "white",
    fontFamily: "primary",
    opacity: 0.9,
    fontStyle: "italic",
  },
  textContainer: {
    position: "absolute",
    height: screenHeight * 0.2,
    width: screenWidth * 0.9,
    padding: 15,
  },
  tintContainer: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
    height: screenHeight * 0.2,
    width: screenWidth * 0.9,
  },
});

export default Venue;
