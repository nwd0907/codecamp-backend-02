function zzz(aaaaaa) {
  console.log("==============");
  console.log(aaaaaa);
  console.log("==============");
}

@zzz
class AppController {}

// public
class Aaa {
  constructor(public mypower) {
    this.mypower = mypower;
  }

  ggg() {
    console.log("안녕하세요~~");
  }
}
const aaa = new Aaa(50);
aaa.mypower = 5;

// private
class Bbb {
  constructor(private mypower) {}

  ggg() {
    this.mypower = 10;
    console.log("안녕하세요~~");
  }
}
const bbb = new Bbb(50);
bbb.mypower = 5;

// readonly
class Ccc {
  constructor(readonly mypower) {}

  ggg() {
    this.mypower = 10;
    console.log("안녕하세요~~");
  }
}
