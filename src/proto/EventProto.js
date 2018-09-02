export default class EventProto {
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
    } else {
      this.category = e.category;
      this.title = e.title;
      this.desc = e.desc;
      this.year = e.year;
      this.month = e.month;
      this.day = e.day;
      this.img = e.img;
      this.id = e.id;
      this.ref = e.ref;
      this.ms = e.ms;
    }
  }

  static copyOf(e) {
    return Object.assign({}, e);
  }
}