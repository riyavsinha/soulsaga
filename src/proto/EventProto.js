var _ = require('lodash');

export default class EventProto {

  static MAIN_KEYS = [
    // Category. Type of event
    'c',
    // Title. Short summary
    't',
    // Description. Long description
    'de',
    // Tags. Short user-generated event identifiers.
    'tg',
    // Year. Year of event
    'y',
    // Month. Month of event
    'm',
    // Day. Day of event
    'd',
    // Image. Img associated, stored in Storage, not Database
    'i',
    // Has Image. Helps tell whether to fetch Image from Storage.
    'hi',
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
      this.t = [];
      this.de = "";
      this.tg = "";
      this.y = "";
      this.m = "";
      this.d = "";
      this.i = "";
      this.hi = false;
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
    this.tg = typeof(e.tg) === "string" ? (e.tg.length ? e.tg.split(',') : []) : e.tg;
    this.y = e.y;
    this.m = e.m;
    this.d = e.d;
    this.i = e.i || "";
    this.hi = e.hi || false;
    this.id = e.id;
    this.ms = e.ms;
    if (e.hasOwnProperty('ref')) {
      this.ref = e.ref;
    } else {
      this.ref = "";
    }
  }

  static isEvent(e) {
    return _.difference(Object.keys(e), EventProto.ALL_KEYS).length === 0;
  }

  static copyOf(e) {
    return Object.assign({}, e);
  }
}