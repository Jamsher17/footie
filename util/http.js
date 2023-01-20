export function firestoreToArena(game) {
  return {
    ...game.data(),
    id: game.id,
    day_time: game.data().day_time.toDate(),
  };
}

export function fireVenueToArena(venue) {
  return {
    ...venue.data(),
    id: venue.id,
  };
}
