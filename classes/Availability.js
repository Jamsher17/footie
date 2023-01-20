export class Availability {
  constructor(opens, closes) {
    this.opens = parseInt(opens);
    this.closes = parseInt(closes);
    this.availabilityArray = this.#buildAvailabilityArray();
  }

  //builds availability array true/false type for every available/unavailable 30min slot
  #buildAvailabilityArray() {
    var diff = this.closes - this.opens;
    diff = this.opens > this.closes ? diff + 2400 : diff;
    const slots =
      diff % 100 > 0
        ? Math.floor(diff / 100) * 2 + 1
        : Math.floor(diff / 100) * 2;
    return new Array(slots).fill(true);
  }

  getAvailableSlots() {
    const slots = this.availabilityArray.map((slot, index) => {
      if (slot) return index;
    });
    const times = slots.map((value) => {
      if (slots.includes(value + 1)) {
        return this.slotToString(value);
      }
    });
    return times.filter((value) => value);
  }

  getAvaiableDurations(timeIndex) {
    const durations = new Array(3).fill(false);

    return durations
      .map((duration, index) => {
        if (
          timeIndex + index + 1 < this.availabilityArray.length &&
          this.availabilityArray[timeIndex + index + 1]
        ) {
          return (index + 2) * 0.5;
        }
      })
      .filter((duration) => duration);
  }

  book(timeIndex, duration) {
    this.availabilityArray.fill(
      false,
      timeIndex,
      timeIndex + duration / 0.5 - 1
    );
  }

  slotToString(index) {
    const diff = Math.floor(index / 2);
    const half = index % 2;
    const time = this.opens + 100 * diff + 30 * half;
    var temp =
      time > 2400
        ? (time - 2400).toString()
        : time == 2400
        ? "0000"
        : time.toString();
    return [temp.slice(0, -2) + ":" + temp.slice(-2), index];
  }

  toString() {
    return this.availabilityArray.map((time, index) => {
      return {
        time_slot: `${this.slotToString(index)[0]} - ${
          this.slotToString(index + 1)[0]
        }`,
        available: time ? true : false,
      };
    });
  }
}

const t = new Availability("800", "0000");
