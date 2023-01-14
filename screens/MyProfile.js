import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import * as ImagePicker from "expo-image-picker";
import { GlobalStyles } from "../constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

import { setProfile } from "../store/userProfileSlice";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const width = Dimensions.get("screen").width;

function MyProfile({ navigation }) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;

  const [backgroundImage, setBackgroundImage] = useState();
  const [profileImage, setProfileImage] = useState();
  const [nickname, setNickname] = useState();
  const [fullName, setFullName] = useState();
  const [age, setAge] = useState();
  const [position, setPosition] = useState();

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("p");
    db.collection("users")
      .doc(currentUser)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setFullName(doc.data().fullName);
          setNickname(doc.data().nickname);
          setPosition(doc.data().position);
          setAge(doc.data().age);
          setProfileImage(doc.data().image);

          dispatch(
            setProfile({
              fullName: fullName,
              nickname: nickname,
              position: position,
              age: age,
              image: profileImage,
            })
          );
        }
      });
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.colors.primary }}>
      <View style={{ flex: 3 }}>
        <Image
          source={
            backgroundImage
              ? { uri: backgroundImage }
              : require("../assets/images/pitch-background.jpg")
          }
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <View
          style={{
            position: "absolute",
            flex: 1,
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "flex-end",
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              position: "absolute",
              height: width * 0.3 + 20,
              width: "100%",
            }}
          >
            <LinearGradient
              colors={[
                "transparent",
                "rgba(0,0,0,0.6)",
                "rgba(0,0,0,0.6)",
                "transparent",
              ]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ height: width * 0.3, width: "100%" }}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              pressed ? { opacity: 0.5 } : {},
              {
                borderRadius: width * 0.3 * 0.5,
                shadowColor: "black",
                shadowOpacity: 0.8,
                shadowOffset: { width: 0, height: 5 },
                shadowRadius: 2,
                marginLeft: 30,
              },
            ]}
            onPress={() => {
              ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0,
                aspect: [16, 9],
                allowsEditing: true,
              })
                .then((image) => {
                  if (!image.canceled) {
                    setProfileImage(image.assets[0].uri);
                    db.collection("users").doc(currentUser).update({
                      image: image.assets[0].uri,
                    });
                  }
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }}
          >
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../assets/images/default-profile-pic.jpg")
              }
              style={{
                width: width * 0.3,
                height: width * 0.3,
                borderRadius: width * 0.35 * 0.5,
              }}
            />
          </Pressable>
          <View
            style={{
              flex: 1,
              height: width * 0.3,
              justifyContent: "center",
              padding: 25,
            }}
          >
            <Text style={styles.profileText}>
              {nickname ? nickname : "______"}
            </Text>
            <Text style={styles.profileText}>
              {fullName && age ? `${fullName}, ${age}г.` : "______"}
            </Text>
            <Text style={[styles.profileText, { fontFamily: "bold" }]}>
              {position ? position : "______"}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1.5, alignItems: "center", padding: 20 }}>
        <Text style={{ fontFamily: "bold", fontSize: 20 }}>Статистика</Text>
        <View
          style={{
            flex: 1,
            width: "100%",
            borderWidth: 1,
            borderColor: GlobalStyles.colors.accent,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: GlobalStyles.colors.primary,
            marginTop: 10,
          }}
        >
          <View style={{ alignItems: "center", width: "30%" }}>
            <Text style={{ fontSize: 42, fontFamily: "bold" }}>17</Text>
            <Text
              style={[
                styles.profileText,
                { color: GlobalStyles.colors.accent2 },
              ]}
            >
              голов
            </Text>
          </View>
          <View style={{ alignItems: "center", width: "30%" }}>
            <Text style={{ fontSize: 42, fontFamily: "bold" }}>15</Text>
            <Text
              style={[
                styles.profileText,
                { color: GlobalStyles.colors.accent2 },
              ]}
            >
              игр сыграно
            </Text>
          </View>
          <View style={{ alignItems: "center", width: "30%" }}>
            <Text style={{ fontSize: 42, fontFamily: "bold" }}>11</Text>
            <Text
              style={[
                styles.profileText,
                { color: GlobalStyles.colors.accent2 },
              ]}
            >
              ассистов
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 3.5 }}>
        <View
          style={{
            flex: 1,
            margin: 20,
            borderWidth: 1,
            borderRadius: 5,
            justifyContent: "space-around",
            paddingVertical: 30,
          }}
        >
          <Pressable
            style={({ pressed }) => [
              pressed ? { backgroundColor: GlobalStyles.colors.secondary } : {},
              styles.button,
            ]}
            onPress={() => {
              navigation.navigate("Profile Info");
            }}
          >
            <View>
              <Text style={styles.buttonText}>Персональные Данные</Text>
            </View>
          </Pressable>
          <Divider inset={true} insetType="middle" />
          <Pressable
            style={({ pressed }) => [
              pressed ? { backgroundColor: GlobalStyles.colors.secondary } : {},
              styles.button,
            ]}
          >
            <Text style={styles.buttonText}>Друзья</Text>
          </Pressable>
          <Divider inset={true} insetType="middle" />
          <Pressable
            style={({ pressed }) => [
              pressed ? { backgroundColor: GlobalStyles.colors.secondary } : {},
              styles.button,
            ]}
          >
            <Text style={styles.buttonText}>Формы оплаты</Text>
          </Pressable>
          <Divider inset={true} insetType="middle" />
          <Pressable
            style={({ pressed }) => [
              pressed ? { backgroundColor: GlobalStyles.colors.secondary } : {},
              styles.button,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: GlobalStyles.colors.accent2 },
              ]}
            >
              Выйти
            </Text>
          </Pressable>
        </View>
      </View>
      <SafeAreaView
        style={{
          width: "100%",
          position: "absolute",
          paddingHorizontal: 20,
          alignItems: "flex-end",
        }}
      >
        <Pressable
          style={({ pressed }) => [
            pressed ? { backgroundColor: GlobalStyles.colors.secondary } : {},
            {
              marginTop: 20,
              borderColor: GlobalStyles.colors.primary,
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
            },
          ]}
          onPress={() => {
            ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0,
              aspect: [16, 9],
              allowsEditing: true,
            })
              .then((image) => {
                if (!image.canceled) setBackgroundImage(image.assets[0].uri);
              })
              .catch((error) => {
                Alert.alert(error.message);
              });
          }}
        >
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 16,
              color: GlobalStyles.colors.primary,
            }}
          >
            Изменить фон
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileText: {
    color: "white",
    fontFamily: "primary",
    fontSize: 18,
  },
  buttonText: {
    fontSize: 28,
    fontFamily: "primary",
  },
  button: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyProfile;
