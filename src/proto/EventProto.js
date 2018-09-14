export default class EventProto {

  static MAIN_KEYS = [
    // Category. Type of event
    'c',
    // Title. Short summary
    't',
    // Description. Long description
    'de',
    // Year. Year of event
    'y',
    // Month. Month of event
    'm',
    // Day. Day of event
    'd',
    // Image. Img associated
    'i',
    // Id. Unique identifier, usually creation timestamp
    'id',
    // Ms. Millisecond date of event, using Y/M/D
    'ms'
  ];

  static ALL_KEYS = EventProto.MAIN_KEYS.concat([
    // Cloud reference key, only if user data being stored
    'ref'
  ]);

  /**
   * Strict definition for timeline events.
   */
  constructor(e = null) {
    if (e === null) {
      this.c = "Other";
      this.t = "";
      this.de = "";
      this.y = "";
      this.m = "";
      this.d = "";
      this.i = "";
      this.id = "";
      this.ref = "";
      this.ms = 0;
      return;
    }

    if (!EventProto.isEvent(e)) {
      throw new Error("Invalid EventProto");
    }

    this.c = e.c;
    this.t = e.t;
    this.de = e.de;
    this.y = e.y;
    this.m = e.m;
    this.d = e.d;
    this.i = e.i;
    this.id = e.id;
    this.ms = e.ms;
    if (e.hasOwnProperty('ref')) {
      this.ref = e.ref;
    } else {
      this.ref = "";
    }
  }

  static isEvent(e) {
    let eString = Object.keys(e).sort().join();
    return eString === EventProto.MAIN_KEYS.sort().join() ||
        eString === EventProto.ALL_KEYS.sort().join();
  }

  static copyOf(e) {
    return Object.assign({}, e);
  }
}