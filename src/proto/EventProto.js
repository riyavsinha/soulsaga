export default class EventProto {

  static MAIN_KEYS = [
    // Type of event
    'category',
    // Short summary
    'title',
    // Long description
    'desc',
    // Year of event
    'year',
    // Month of event
    'month',
    // Day of event
    'day',
    // Img associated
    'img',
    // Unique identifier, usually creation timestamp
    'id',
    // Millisecond date of event, using Y/M/D
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
      this.category = "Other";
      this.title = "";
      this.desc = "";
      this.year = "";
      this.month = "";
      this.day = "";
      this.img = "";
      this.id = "";
      this.ref = "";
      this.ms = 0;
      return;
    }

    if (!EventProto.isEvent(e)) {
      throw new Error("Invalid EventProto");
    }

    this.category = e.category;
    this.title = e.title;
    this.desc = e.desc;
    this.year = e.year;
    this.month = e.month;
    this.day = e.day;
    this.img = e.img;
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