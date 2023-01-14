import { FlatList, View, StyleSheet } from "react-native";
import Game from "./Game";

function renderGame(itemGame) {
  return <Game game={itemGame.item} />;
}

function GamesOutput({ games }) {
  return (
    <View style={styles.screen}>
      <FlatList
        data={games}
        renderItem={renderGame}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});

export default GamesOutput;
