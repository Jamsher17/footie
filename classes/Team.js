import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export class Team {
  constructor({
    id = () => {
      const docRef = firebase.firestore().collection("teams").doc();
      return docRef.id;
    },
    name,
    creator,
    captain,
    playersCount,
    stats,
    level,
    imageURLs,
    players,
  }) {
    this.id = id;
    this.name = name;
    this.creator = creator;
    this.captain = captain;
    this.playersCount = playersCount;
    this.stats = stats;
    this.level = level;
    this.imageURLs = imageURLs;
    this.players = players;
  }
}
