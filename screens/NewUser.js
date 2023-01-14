import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Keyboard,
  Alert,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/Styles";
import { Divider } from "@rneui/themed";
import Button from "../components/UI/Button";

function NewUser({ navigation, route }) {
  const phoneNumber = route.params.phoneNumber;
  const uid = route.params.uid;

  const db = firebase.firestore();

  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [position, setPosition] = useState(null);

  const [profileCreating, setProfileCreating] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    if (name && position && age && nickname && image) {
      setProfileComplete(true);
    } else {
      setProfileComplete(false);
    }
  }, [name, position, age, nickname, image]);

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.screen}>
        <Pressable
          style={({ pressed }) => [
            pressed ? { opacity: 0.5 } : {},
            { paddingHorizontal: 20 },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="md-arrow-back"
            size={36}
            color={GlobalStyles.colors.accent}
          />
        </Pressable>
        <Text style={{ fontFamily: "logo", fontSize: 36, alignSelf: "center" }}>
          arena
        </Text>
        <Divider
          width={2}
          color={GlobalStyles.colors.accent2}
          style={{ width: 90, alignSelf: "center" }}
        />
        <Pressable
          style={styles.selectProfilePicSection}
          onPress={() => {
            ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0,
              allowsEditing: true,
            })
              .then((image) => {
                setImage(image.uri);
              })
              .catch((error) => {
                Alert.alert(error.message);
              });
          }}
        >
          <View
            style={[
              styles.profilePicContainer,
              { backgroundColor: image ? "" : "white" },
            ]}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.profilePic} />
            ) : (
              <Ionicons
                name="person"
                size={100}
                color={GlobalStyles.colors.accent}
              />
            )}
          </View>
          <Text style={[styles.text, { color: GlobalStyles.colors.accent2 }]}>
            Выбрать фото
          </Text>
        </Pressable>
        <View style={styles.infoInputContainer}>
          <TextInput
            style={styles.inputIOS}
            placeholder="Псевдоним"
            value={nickname}
            onChangeText={(nickname) => {
              setNickname(nickname);
            }}
          />
          <TextInput
            style={styles.inputIOS}
            placeholder="Полное имя"
            value={name}
            onChangeText={(name) => {
              setName(name);
            }}
          />
          <TextInput
            style={styles.inputIOS}
            placeholder="Возраст"
            keyboardType="numeric"
            value={age}
            onChangeText={(age) => {
              setAge(age);
            }}
            maxLength={2}
          />
          <RNPickerSelect
            style={styles}
            value={position}
            onValueChange={(value) => {
              setPosition(value);
            }}
            placeholder={{
              label: "Выбрать позицию...",
              color: GlobalStyles.colors.accent2,
            }}
            items={[
              { label: "Вратарь", value: "Вратарь" },
              { label: "Защитник", value: "Защитник" },
              { label: "Полузащитник", value: "Полузащитник" },
              { label: "Нападающий", value: "Нападающий" },
            ]}
          />

          <Button
            label="Поехали"
            style={styles.button}
            textStyle={{ color: GlobalStyles.colors.primary }}
            onPress={() => {
              if (profileComplete) {
                setProfileCreating(true);
                db.collection("users").doc(uid).set({
                  nickname: nickname,
                  fullName: name,
                  age: age,
                  phoneNumber: phoneNumber,
                  position: position,
                  image: image,
                });

                setProfileCreating(false);
                navigation.replace("Games Overview");
              } else {
                Alert.alert("Загрузите фото и аполните все поля");
              }
            }}
          />
        </View>
      </SafeAreaView>
      {profileCreating && (
        <View style={styles.overlay}>
          <Text style={{ fontSize: 60, color: "white", fontFamily: "primary" }}>
            Ждемс....
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },

  selectProfilePicSection: {
    marginTop: 20,
    alignSelf: "center",
  },

  profilePicContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },

  infoInputContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  inputIOS: {
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 40,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.accent,
    borderRadius: 3,
    fontFamily: "primary",
    fontSize: 20,
  },
  inputAndroid: {
    // paddingHorizontal: 10,
    // marginVertical: 10,
    // height: 40,
    // borderWidth: 1,
    // borderColor: GlobalStyles.colors.accent,
    // borderRadius: 3,
    // fontFamily: "primary",
    // fontSize: 20,
  },
  text: {
    fontFamily: "bold",
    fontSize: 20,
  },
  button: {
    alignSelf: "center",
    backgroundColor: GlobalStyles.colors.accent,
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default NewUser;
