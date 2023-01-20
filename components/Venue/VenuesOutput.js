import { View, FlatList, StyleSheet, Text } from "react-native";
import Venue from "./Venue";

function renderVenue(venue) {
  return <Venue venue={venue.item} />;
}

function VenuesOutput({ venues }) {
  return (
    <View style={styles.screen}>
      <FlatList
        data={venues}
        renderItem={renderVenue}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});

export default VenuesOutput;
