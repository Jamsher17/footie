import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function Player({ player, team }) {
  return (
    <View
      style={[
        styles.container,
        team == 2 ? { alignItems: "flex-end" } : {},
        player ? {} : { backgroundColor: "#b7e4c7" },
      ]}
    >
      <Text style={styles.textNickname}>
        {player ? "@Jamsher17" : "СВОБОДНО"}
      </Text>
      <Text style={[styles.textNickname, { fontFamily: "bold", fontSize: 12 }]}>
        {player ? "Jamsher Nigmatulloev" : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.secondary,
    borderRadius: 5,
  },
  textNickname: {
    fontFamily: "primary",
    fontSize: 16,
    color: GlobalStyles.colors.accent,
  },
});

export default Player;
