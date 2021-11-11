// Класс родитель для салатов и напитков в меню
class Food {
  constructor(item) {
    this.item = item;
  }
  // Узнать стоимость одной позиции салата или напитка в меню
  get calculatePrice() {
    return this.item.price;
  }
  // Узнать калорийность одной позиции салата или напитка в меню
  get calculateCalories() {
    return this.item.calories;
  }
}

// Класс гамбургера
class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
  }
  // Размеры, виды начинок
  static get SIZE_SMALL() {
    return { price: 50, calories: 20, name: "SIZE_SMALL" };
  }
  static get SIZE_LARGE() {
    return { price: 100, calories: 40, name: "SIZE_LARGE" };
  }
  static get STUFFING_CHEESE() {
    return { price: 10, calories: 20, name: "STUFFING_CHEESE" };
  }
  static get STUFFING_SALAD() {
    return { price: 20, calories: 5, name: "STUFFING_SALAD" };
  }
  static get STUFFING_POTATO() {
    return { price: 15, calories: 10, name: "STUFFING_POTATO" };
  }
  // Узнать размер гамбургера
  get getSize() {
    return this.size.name;
  }
  // Узнать начинку гамбургера
  get getStuffing() {
    return this.stuffing.name;
  }
  // Узнать цену гамбургера
  get calculatePriceSize() {
    return this.size.price;
  }
  // Узнать калорийность гамбургера
  get calculateCaloriesSize() {
    return this.size.calories;
  }
  // Узнать цену начинки гамбургера
  get calculatePriceStuffing() {
    return this.stuffing.price;
  }
  // Узнать калорийность начинки гамбургера
  get calculateCaloriesStuffing() {
    return this.stuffing.calories;
  }
  // Узнать общую цену гамбургера и начинки
  get calculatePrice() {
    return this.size.price + this.stuffing.price;
  }
  // Узнать общую калорийность гамбургера и начинки
  get calculateCalories() {
    return this.size.calories + this.stuffing.calories;
  }
}
// Класс салата
class Salad extends Food {
  constructor(item) {
    super(item);
  }
  // салат цезарь
  static get CAESAR() {
    return { price: 100, calories: 20, name: "CAESAR" };
  }
  // салат оливье
  static get OLIVIE() {
    return { price: 50, calories: 80, name: "OLIVIE" };
  }
}
// Класс напитка
class Drink extends Food {
  constructor(item) {
    super(item);
  }
  // напиток Кока-кола
  static get COLA() {
    return { price: 50, calories: 40, name: "COLA" };
  }
  // напиток кофе
  static get COFFEE() {
    return { price: 80, calories: 20, name: "COFFEE" };
  }
}
// Класс заказа
class Order {
  constructor() {
    this.items = [];
  }
  // метод добавления объекта позиции в меню (позиция, количество - в случае с салатами 100г принимать за единицу позиции, соответственно далее 150 грамм = 1.5, 270 грамм = 2.7)
  addItem(item, amount) {
    if (Number.isInteger(amount)) {
      for (let i = 0; i < amount; i++) {
        this.items.push(item);
      }
    } else {
      for (let key in item) {
        if (
          item[key].hasOwnProperty("price") &&
          item[key].hasOwnProperty("calories")
        ) {
          item[key].price = item[key].price * amount;
          item[key].calories = item[key].calories * amount;
        }
      }
      this.items.push(item);
    }
  }
  // метод удаления позиции из заказа (позиция, количество)
  deleteItem(item, amount) {
    for (let i = 0; i < amount; i++) {
      let idx = this.items.indexOf(item);
      if (idx >= 0) {
        this.items.splice(idx, 1);
      }
    }
    return this.items;
  }
  // метод расчета общей стоимости заказа
  calculatePrice() {
    let count = 0;
    let data;
    for (let i = 0; i < this.items.length; i++) {
      console.log();
      for (let key in this.items[i]) {
        count += this.items[i][key].price;
      }
    }
    return count;
  }
  // метод расчета общей калорийности заказа
  calculateCalories() {
    let count = 0;
    let data;
    for (let i = 0; i < this.items.length; i++) {
      console.log();
      for (let key in this.items[i]) {
        count += this.items[i][key].calories;
      }
    }
    return count;
  }
  // метод оплаты заказа, после вызова которого, редактирование заказа невозможно
  pay() {
    Object.freeze(this.items);
    throw new TypeError(
      "После оплаты заказа ничего добавить или удалить из него больше нельзя!"
    );
  }
}
