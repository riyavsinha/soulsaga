export default class EventProto {
  constructor(e = null) {
    if (e == null) {
      this.category_ = "Other";
      this.title_ = "";
      this.desc_ = "";
      this.year_ = "";
      this.month_ = "";
      this.day_ = "";
      this.img_ = "";
      this.id_ = "";
    } else {
      this.category_ = e.category;
      this.title_ = e.title;
      this.desc_ = e.desc;
      this.year_ = e.year;
      this.month_ = e.month;
      this.day_ = e.day;
      this.img_ = e.img;
      this.id_ = e.id;
    }
  }

  static copyOf(e) {
    return Object.assign({}, e);
  }

  /////////////////////
  // CATEGORY
  /////////////////////

  get category() {
    return this.category_
  }

  set category(cat) {
    this.category_ = cat;
  }

  /////////////////////
  // TITLE
  /////////////////////

  get title() {
    return this.title_
  }

  set title(t) {
    this.title_ = t;
  }

  /////////////////////
  // DESCRIPTION
  /////////////////////

  get desc() {
    return this.desc_
  }

  set desc(d) {
    this.desc_ = d;
  }

  /////////////////////
  // YEAR
  /////////////////////

  get year() {
    return this.year_
  }

  set year(y) {
    this.year_ = y;
  }

  /////////////////////
  // MONTH
  /////////////////////

  get month() {
    return this.month_
  }

  set month(m) {
    this.month_ = m;
  }

  /////////////////////
  // DAY
  /////////////////////

  get day() {
    return this.day_
  }

  set day(d) {
    this.day_ = d;
  }

  /////////////////////
  // IMAGE
  /////////////////////

  get img() {
    return this.img_
  }

  set img(i) {
    this.img_ = i;
  }

  /////////////////////
  // ID
  /////////////////////

  get id() {
    return this.id_
  }

  set id(id) {
    this.id_ = id;
  }
}