import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//local imports
import { GlobalStyles } from "../../constants/Styles";
import { getCurrentDate, getFormattedDate } from "../../util/date";

import { Ionicons } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;

function Game({ game }) {
  const navigation = useNavigation();

  function gamePressHandler() {
    navigation.navigate("Детали Игры", { gameId: game.id });
  }

  return (
    <Pressable onPress={gamePressHandler}>
      <View style={styles.gameContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("C:/Users/nodir/Desktop/footie/footie/assets/images/stadium-4.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.leftColumnText}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="timer-outline" size={20} color="black" />
              <Text style={styles.text}>
                {getFormattedDate(game.day_time) == getCurrentDate()
                  ? "Сегодня"
                  : getFormattedDate(game.day_time)}{" "}
                {game.day_time.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                / {game.duration} часа
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="md-location-outline" size={20} color="black" />
              <Text style={styles.text}>{game.venue}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="md-information-circle-outline"
                size={20}
                color="black"
              />
              <Text style={styles.text}>{game.format}</Text>
            </View>
          </View>
          <View style={styles.rightColumnText}>
            <Text
              style={{
                fontSize: 20,
                color: GlobalStyles.colors.accent2,
                fontFamily: "bold",
              }}
            >
              {game.price} сум
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    backgroundColor: "#e5e5e5",
    //--margins--
    marginVertical: 10,
    marginHorizontal: 20,
    //--shadow props--
    elevation: 5,
    shadowColor: GlobalStyles.colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    //--border props--
    borderRadius: 20,
    borderColor: GlobalStyles.colors.accenta,
    borderWidth: 1,
    overflow: "hidden",
    //--dimensions--
    height: windowHeight * 0.3,
  },
  textContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  leftColumnText: {
    flex: 1,
    width: "100%",
    height: "100%",
    // borderWidth: 1,
    justifyContent: "space-evenly",
  },
  rightColumnText: {
    flex: 1,
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    maxWidth: "35%",
  },
  imageContainer: {
    flex: 4,
    flexDirection: "row",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
    elevation: 5,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  text: {
    fontFamily: "primary",
    fontSize: 14,
    color: GlobalStyles.colors.accent,
    paddingHorizontal: 5,
  },
});

export default Game;
