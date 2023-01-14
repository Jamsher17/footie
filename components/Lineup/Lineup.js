import { FlatList, View, StyleSheet } from "react-native";
import Player from "./Player";

function renderPlayer(itemPlayer, team) {
  return <Player player={itemPlayer.item} team={team} />;
}

function fillArray(capacity, players) {
  const diff = capacity - players.length;
  return players.concat(new Array(diff));
}

function LineUp({ players }) {
  return (
    <View style={styles.screen}>
      <FlatList
        data={fillArray(7, players)}
        renderItem={(item) => renderPlayer(item, 1)}
        // keyExtractor={(item) => item.id}
      />
      <View
        style={{
          height: "100%",
          width: 1,
          backgroundColor: "black",
          alignSelf: "center",
          opacity: 0.2,
        }}
      ></View>
      <FlatList
        data={fillArray(7, players)}
        renderItem={(item) => renderPlayer(item, 2)}
        // keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "row",
  },
});

export default LineUp;
