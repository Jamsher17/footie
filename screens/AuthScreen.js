import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";
import { Divider } from "@rneui/themed";

// -- FIREBASE --
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// -- ADDITIONAL COMPS --
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/Styles";
import Button from "../components/UI/Button";
import { Alert } from "react-native";

function AuthScreen({ navigation }) {
  const db = firebase.firestore();

  const [phAccepted, setPhAccepted] = useState(null);
  const [isLoading, setIsLoading] = useState();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    firebase
      .auth()
      .signInWithPhoneNumber(
        // "+998" +
        // phoneNumber.replace(/[\D]/g, "")
        // "+1" + phoneNumber,
        "+16503389211",
        recaptchaVerifier.current
      )
      .then((confirmationResult) => {
        setVerificationId(confirmationResult);
      })
      .catch((error) => {
        if (
          error.message ==
          "Firebase: Invalid format. (auth/invalid-phone-number)."
        ) {
          setPhAccepted(false);
          Alert.alert("Введите правильный номер");
        }
      });
  };

  const confirmCode = () => {
    verificationId
      // .confirm(code)
      .confirm("123456")
      .then((result) => {
        db.collection("users")
          .doc(result.user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              navigation.replace("Games Overview");
            } else {
              navigation.navigate("New User", {
                phoneNumber: phoneNumber,
                uid: result.user.uid,
              });
            }
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //handling phone input
  function onChangeTextHandler(text) {
    if (text.length == 2 && text.charAt(0) != "(") {
      setPhoneNumber(`(${text}) `);
    } else if (text.length == 3) {
      if (text.charAt(0) == "(") {
        setPhoneNumber(text.slice(1));
      } else {
        setPhoneNumber(`(${text.slice(0, 2)}) ${text.slice(2)}`);
      }
    } else if (text.length == 9) {
      if (text.charAt(8) == "-") {
        setPhoneNumber(text.slice(0, 8));
      } else {
        setPhoneNumber(`${text.slice(0, 8)}-${text.slice(8)}`);
      }
    } else if (text.length == 12) {
      if (text.charAt(11) == "-") {
        setPhoneNumber(text.slice(0, 11));
      } else {
        setPhoneNumber(`${text.slice(0, 11)}-${text.slice(11)}`);
      }
    } else {
      setPhoneNumber(text);
    }
  }

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        cancelLabel="Закрыть"
        title="Пахнет роботом?!"
        attemptInvisibleVerification={true | false}
      />
      <SafeAreaView style={styles.screen}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.logoText}>arena</Text>
        </View>
        <Divider
          inset={true}
          insetType="middle"
          width={2}
          color={GlobalStyles.colors.accent2}
        />
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={[styles.text, { fontFamily: "primary", fontSize: 26 }]}>
            только реальная игра
          </Text>
        </View>
        <View style={styles.infoSection}>
          <View
            pointerEvents={phAccepted ? "none" : "auto"}
            style={{ opacity: phAccepted ? 0.3 : 1 }}
          >
            <Text style={styles.text}>Введите ваш номер телефона:</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ios-call"
                  size={34}
                  color={GlobalStyles.colors.accent2}
                />
              </View>
              <View
                style={[
                  styles.input,
                  phAccepted == false
                    ? {
                        borderWidth: 1,
                        borderColor: GlobalStyles.colors.accent2,
                      }
                    : {},
                ]}
              >
                <TextInput
                  style={{ fontFamily: "primary", fontSize: 20 }}
                  keyboardType="phone-pad"
                  placeholder="напр. 91 244 11 44"
                  onChangeText={(value) =>
                    // onChangeTextHandler(value)
                    setPhoneNumber(value)
                  }
                  value={phoneNumber}
                  maxLength={14}
                />
              </View>
            </View>
            <Button
              style={{ alignSelf: "center" }}
              onPress={() => {
                setPhAccepted(true);
                sendVerification();
              }}
              label="Отправить код"
            />
          </View>
          <Divider
            width={2}
            color={GlobalStyles.colors.accent2}
            style={{ marginVertical: 30 }}
          />
          <View
            pointerEvents={phAccepted ? "auto" : "none"}
            style={{ opacity: phAccepted ? 1 : 0.3 }}
          >
            <Text style={styles.text}>Введите код подтверждения:</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="chatbubble"
                  size={34}
                  color={GlobalStyles.colors.accent2}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  style={{ fontFamily: "primary", fontSize: 20 }}
                  keyboardType="number-pad"
                  placeholder="напр. 542322"
                  onChangeText={(value) => setCode(value)}
                  value={code}
                  maxLength={6}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                onPress={() => {
                  setPhAccepted(false);
                  setCode("");
                }}
                label="Другой номер"
              />
              <Button
                style={{ backgroundColor: GlobalStyles.colors.accent }}
                onPress={() => {
                  setIsLoading(true);
                  confirmCode();
                }}
                textStyle={{ color: GlobalStyles.colors.primary }}
                label="Подтвердить"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      {isLoading && (
        <View
          style={{
            opacity: 0.75,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
        >
          <Image
            source={require("../assets/images/Stopwatch.gif")}
            resizeMode="center"
          />
          <Text style={{ fontSize: 20, fontFamily: "primary" }}>
            Авторизация...
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
  logoText: {
    fontFamily: "logo",
    fontSize: 110,
    color: GlobalStyles.colors.accent,
  },
  infoSection: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  phoneRequestSection: {},
  iconContainer: {
    backgroundColor: "white",
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: "row",
  },
  input: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  text: {
    fontFamily: "bold",
    fontSize: 20,
    color: GlobalStyles.colors.accent,
  },
});

export default AuthScreen;
