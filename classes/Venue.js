import { Availability } from "./Availability";

export class Venue {
  constructor({
    id,
    name,
    address,
    location = "",
    opens,
    closes,
    recFormat = capacity / 2,
    capacity,
    imageURLs = new Array(),
    next7dayAvailability = new Array(7).fill(new Availability()),
    reservations = new Array(),
    contactName = "",
    contactNumber = "",
  }) {
    this.id, (this.name = name);
    this.address = address;
    this.location = location;
    //hours
    this.opens = opens;
    this.closes = closes;
    //format and capacity
    this.recFormat = recFormat;
    this.capacity = capacity;
    //images
    this.imageURLs = imageURLs;
    //availability and reservations
    this.next7dayAvailability = next7dayAvailability;
    this.reservations = reservations;
    //contacts
    this.contactName = contactName;
    this.contactNumber = contactNumber;
  }

  addReservation(day) {
    this.next7dayAvailability[day].book();
    this.reservations.push(new Reservation());
  }
}

//firestore converter
export const venueConverter = {
  toFirestore: function (venue) {
    return {
      name: venue.name,
      address: venue.address,
      location: venue.location,
      recFormat: venue.recFormat,
      capacity: venue.capacity,
      opens: venue.opens,
      closes: venue.closes,
      imageURLs: venue.imageURLs,
      next7dayAvailability: venue.next7dayAvailability,
      reservations: venue.reservations,
      contactName: venue.contactName,
      contactNumber: venue.contactNumber,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Venue({
      id: snapshot.uid,
      name: data.name,
      address: data.address,
      location: data.location,
      opens: data.opens,
      closes: data.closes,
      recFormat: data.recFormat,
      capacity: data.capacity,
      imageURLs: data.imageURLs,
      next7dayAvailability: data.next7dayAvailability,
      reservations: data.reservations,
      contactName: data.contactName,
      contactNumber: data.contactNumber,
    });
  },
};
