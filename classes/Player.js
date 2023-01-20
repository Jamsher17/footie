import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Team } from "./Team";

export class Player {
  constructor(
    id = () => {
      const docRef = firebase.firestore().collection("users").doc();
      return docRef.id;
    },
    name,
    nickname,
    position,
    teams = new Array(),
    stats,
    imageURLs = new Array(),
    level = 1,
    paymentOptions = new Array(),
    friends = new Array()
  ) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.position = position;
    this.teams = teams;
    this.stats = stats;
    this.imageURLs = imageURLs;
    this.level = level;
    this.paymentOptions = paymentOptions;
    this.friends = friends;
  }

  createTeam(name, image, level) {
    this.teams.push(
      new Team({
        name: name,
        creator: this.id,
        captain: this.id,
        imageURLs: new Array().push(image),
        level: level,
        players: new Array().push(this.id),
        playersCount: 1,
      }).id
    );
  }
  addPlayerToTeam(teamId, playerId) {
    this.teams[tei].addPlayer(playerId);
  }
}
