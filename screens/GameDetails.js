import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux store functions
import { addToMyGames, removeFromMyGames } from "../store/myGamesSlice";

//additional
import PagerView from "react-native-pager-view";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

//custom components and functions
import { getFormattedDate } from "../util/date";
import { firestoreToArena } from "../util/http";
import { GlobalStyles } from "../constants/Styles";
import Button from "../components/UI/Button";
import LineUp from "../components/Lineup/Lineup";

function GameDetails({ route, navigation }) {
  const gameId = route.params.gameId;

  const dispatch = useDispatch();
  const myGames = useSelector((state) => state.myGames.ids);

  function isFavorite() {
    return myGames.includes(gameId);
  }

  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;

  const pgvRef = useRef();

  const [game, setGame] = useState();
  const [favorite, setFavorite] = useState(isFavorite);

  async function fetchGame() {
    const snapshot = await db.collection("games").doc(gameId).get();
    return snapshot;
  }

  useEffect(() => {
    fetchGame().then((snapshot) => {
      setGame(firestoreToArena(snapshot));
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          onPress={handlePressFavorite}
          name={favorite ? "favorite" : "favorite-border"}
          size={32}
          color={GlobalStyles.colors.accent}
        />
      ),
    });
  });

  const [enrolled, setEnrolled] = useState(false);

  function handlePressFavorite() {
    console.log(myGames);
    setFavorite(!favorite);
    if (favorite) {
      dispatch(removeFromMyGames(gameId));
    } else {
      dispatch(addToMyGames(gameId));
    }
  }

  if (game) {
    return (
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <Image
            source={require("C:/Users/nodir/Desktop/footie/footie/assets/images/stadium-4.jpg")}
            style={styles.image}
          />
        </View>
        <PagerView
          ref={pgvRef}
          pageMargin={24}
          style={{ flex: 1 }}
          initialPage={0}
        >
          <View style={styles.infoContainer} key="1">
            <View
              style={{
                flex: 5,
                maxHeight: "90%",
                // borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "bold",
                  color: GlobalStyles.colors.accent,
                }}
              >
                Об Игре
              </Text>
              <View style={styles.bullets}>
                <View style={styles.leftColumnText}>
                  <View style={styles.bulletPoint}>
                    <Ionicons
                      name="md-location-outline"
                      size={20}
                      color="black"
                    />

                    <Text style={styles.text}>{game.venue}</Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <MaterialCommunityIcons
                      name="soccer-field"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.text}>{game.format}</Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <MaterialCommunityIcons
                      name="whistle-outline"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.text}>Бутсы без шипов</Text>
                  </View>
                </View>
                <View style={styles.rightColumnText}>
                  <View style={styles.bulletPoint}>
                    <MaterialCommunityIcons
                      name="timetable"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.text}>
                      {getFormattedDate(game.day_time)}
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <MaterialCommunityIcons
                      name="timer-sand-complete"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.text}>{game.duration} часа</Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <MaterialIcons
                      name="attach-money"
                      size={20}
                      color={GlobalStyles.colors.accent2}
                    />
                    <Text
                      style={[
                        styles.text,
                        { color: GlobalStyles.colors.accent2 },
                      ]}
                    >
                      {game.price} сум
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.divider}></View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "bold",
                  color: GlobalStyles.colors.accent,
                }}
              >
                Удобства
              </Text>
              <View style={styles.bullets}>
                <View style={styles.leftColumnText}>
                  <Text style={styles.text}>• Манишки</Text>
                  <Text style={styles.text}>• Вода / Перекус</Text>
                </View>
                <View style={styles.rightColumnText}>
                  <Text style={styles.text}>• Табло для счета</Text>
                  <Text style={styles.text}>• Видео / Фото отчет</Text>
                </View>
              </View>
              <View style={styles.divider}></View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "bold",
                  color: GlobalStyles.colors.accent,
                }}
              >
                Ориентир
              </Text>
              <Text
                style={{
                  fontFamily: "primary",
                  fontSize: 16,
                  color: GlobalStyles.colors.accent,
                  paddingVertical: 5,
                  marginLeft: 10,
                }}
              >
                Напротив ресторана “Бахор”. До стадиона можно добраться на
                автобусе №252 или на ЯндексTaxi.
              </Text>
            </View>
            <Pressable
              onPress={() => pgvRef.current.setPage(1)}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "primary",
                    color: GlobalStyles.colors.accent2,
                    fontSize: 18,
                  }}
                >
                  Посмотреть составы
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "primary",
                  }}
                >
                  Осталось мест: 6
                </Text>
              </View>
              <Ionicons
                name="md-chevron-forward-sharp"
                size={42}
                color="black"
              />
            </Pressable>
          </View>
          <View style={styles.infoContainer} key="2">
            <View
              style={{
                flex: 5,
                // borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                marginTop: 10,
              }}
            >
              <LineUp players={["hasd;k", "asdkjh"]} />
            </View>
            <Pressable
              onPress={() => pgvRef.current.setPage(0)}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="md-chevron-back-sharp" size={42} color="black" />
              <View>
                <Text
                  style={{
                    fontFamily: "primary",
                    color: GlobalStyles.colors.accent2,
                    fontSize: 18,
                  }}
                >
                  Иформация об игре
                </Text>
              </View>
            </Pressable>
          </View>
        </PagerView>
        <View style={styles.actionsContainer}>
          <Button
            label="ИГРАЮ"
            onPress={() => {
              navigation.navigate("Оплатить");
            }}
            style={{
              borderColor: GlobalStyles.colors.green,
              backgroundColor: GlobalStyles.colors.green,
              width: "90%",
              height: "50%",
            }}
            textStyle={{ color: GlobalStyles.colors.primary }}
          />
          {/* <Button
            style={{
              width: "15%",
              height: "50%", // backgroundColor: favorite
              //   ? GlobalStyles.colors.green
              //   : GlobalStyles.colors.accent,
              // borderColor: favorite
              //   ? GlobalStyles.colors.green
              //   : GlobalStyles.colors.accent,
              borderColor: "transparent",
            }}
            onPress={handlePressFavorite}
            icon={
              <MaterialIcons
                name={favorite ? "favorite" : "favorite-border"}
                size={50}
                color={GlobalStyles.colors.accent}
              />
            }
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    height: "25%",
    // flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "white",
    borderWidth: 2,
    elevation: 5,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    // flex: 1,
  },
  bullets: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  actionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    flex: 0.3,
    // paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rightColumnText: {
    marginLeft: "15%",
  },
  text: {
    fontSize: 16,
    fontFamily: "primary",
    paddingLeft: 5,
    color: GlobalStyles.colors.accent,
  },
  bulletPoint: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  divider: {
    margin: 20,
    alignSelf: "center",
    height: 1,
    width: 200,
    backgroundColor: GlobalStyles.colors.accent,
  },
});

export default GameDetails;
