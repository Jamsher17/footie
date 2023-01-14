import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/Styles";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { setProfile } from "../store/userProfileSlice";

const width = Dimensions.get("screen").width;

function ProfileInfo({ navigation }) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;

  const { fullName, image, nickname, position, age } = useSelector(
    (state) => state.userProfile.profile
  );
  const [allInfo, setAllInfo] = useState({
    nFullName: "...",
    nNickname: "...",
    nAge: "...",
    nPosition: "...",
    nImage: null,
  });

  const dispatch = useDispatch();
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    setAllInfo({
      nFullName: fullName,
      nNickname: nickname,
      nPosition: position,
      nAge: age,
      nImage: image,
    });
  }, [fullName, image, nickname, position, age]);

  const main = (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Pressable style={{}}>
          <Ionicons
            name="ios-arrow-back"
            size={45}
            color={GlobalStyles.colors.accent}
            onPress={() => {
              navigation.navigate("Моя Карточка");
            }}
          />
        </Pressable>
      </View>
      <KeyboardAvoidingView style={{ flex: 12 }} behavior="padding" enabled>
        <ScrollView style={{}}>
          <Pressable
            style={({ pressed }) => [
              pressed ? { opacity: 0.5 } : {},
              {
                alignSelf: "center",
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
                    setAllInfo({ ...allInfo, nImage: image.assets[0].uri });
                    db.collection("users").doc(currentUser).update({
                      image: image.assets[0].uri,
                    });
                    setChanges(true);
                  }
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }}
          >
            <View
              style={{
                width: width * 0.4,
                borderRadius: width * 0.2,
                shadowOffset: { width: 1, height: 2 },
                shadowColor: "black",
                shadowOpacity: 0.8,
                shadowRadius: 10,
                marginTop: 20,
              }}
            >
              <Image
                source={{
                  uri: allInfo.nImage,
                }}
                defaultSource={require("../assets/images/default-profile-pic.jpg")}
                style={{
                  width: width * 0.4,
                  height: width * 0.4,
                  borderRadius: width * 0.2,
                }}
              />
            </View>
            <Text
              style={{
                alignSelf: "center",
                marginTop: 10,
                fontFamily: "bold",
                fontSize: 18,
                color: GlobalStyles.colors.accent2,
              }}
            >
              Изменить фото
            </Text>
          </Pressable>

          <View style={{ padding: 20 }}>
            <Input
              label="Псевдоним:"
              textInputConfig={{
                value: allInfo.nNickname,
                onChangeText: (value) => {
                  setAllInfo({ ...allInfo, nNickname: value });
                  setChanges(true);
                },
              }}
            />
            <Input
              label="Полное имя:"
              textInputConfig={{
                value: allInfo.nFullName,
                onChangeText: (value) => {
                  setAllInfo({ ...allInfo, nFullName: value });
                  setChanges(true);
                },
              }}
            />
            <Input
              label="Позиция:"
              textInputConfig={{
                value: allInfo.nPosition,
                onChangeText: (value) => {
                  setAllInfo({ ...allInfo, nPosition: value });
                  setChanges(true);
                },
              }}
            />
            <Input
              label="Возраст:"
              textInputConfig={{
                value: allInfo.nAge,
                keyboardType: "numeric",
                onChangeText: (value) => {
                  setAllInfo({ ...allInfo, nAge: value });
                  setChanges(true);
                },
              }}
            />
            <Button
              label="Подтвердить изменения"
              style={[changes ? {} : { opacity: 0.5 }, styles.confirmButton]}
              textStyle={{ color: GlobalStyles.colors.primary }}
              onPress={() => {
                dispatch(
                  setProfile({
                    fullName: allInfo.nFullName,
                    nickname: allInfo.nNickname,
                    position: allInfo.nPosition,
                    age: allInfo.nAge,
                    image: allInfo.nImage,
                  })
                );
                db.collection("users")
                  .doc(currentUser)
                  .set({
                    fullName: allInfo.nFullName,
                    nickname: allInfo.nNickname,
                    image: allInfo.nImage,
                    position: allInfo.nPosition,
                    age: allInfo.nAge.toString(),
                  })
                  .then(() => setChanges(false));
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  return main;
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 10,
  },
  confirmButton: {
    width: "100%",
    backgroundColor: GlobalStyles.colors.accent,
    marginTop: 20,
    alignSelf: "center",
  },
});

export default ProfileInfo;
