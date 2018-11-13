var _ = require('lodash');

export default class GoalProto {

  static MAIN_KEYS = [
    // Category. Category of goal
    'c',
    // Type. Classification of "EXP", "GRO", "CON"
    't',
    // Goal. The actual goal text
    'g',
    // Id. Unique identifier, usually creation timestamp
    'id',
  ];

  static ALL_KEYS = GoalProto.MAIN_KEYS.concat([
    // Cloud reference key, only if user data being stored
    'ref'
  ]);

  /**
   * Strict definition for goals.
   */
  constructor(g = null, t = null) {
    if (!g && !t) {
      throw new Error ("At least goal or type must be provided.");
    }

    if (g === null) {
      this.c = "Other";
      this.t = t;
      this.g = "";
      this.id = "";
      this.ref = "";
      return;
    }

    if (!GoalProto.isGoal(g)) {
      throw new Error("Invalid GoalProto");
    }

    this.c = g.c || "Other";
    this.t = g.t;
    this.g = g.g || "";
    this.id = g.id;
    if (g.hasOwnProperty('ref')) {
      this.ref = g.ref;
    } else {
      this.ref = "";
    }
  }

  static isGoal(g) {
    return _.difference(Object.keys(g), GoalProto.ALL_KEYS).length === 0
      && ["EXP","GRO","CON"].includes(g.t);
  }

  static copyOf(g) {
    return Object.assign({}, g);
  }
}