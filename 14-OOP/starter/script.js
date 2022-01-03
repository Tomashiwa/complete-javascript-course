'use strict';

// Constructor function

// Calling this function with a new keyword returns a new instance of the "class". This
// instance will contain the properties declared in the constructor, the methods and properties
// declared in the cosntructor's prototype.

// When a constructor function is executed:
// 1) New {} is created
// 2) Set the function's this to {} from 1)
//      -> Allow the function to set properties to the object
// 3) Set the object's __proto__ property to the function's prototype
//      -> Giving the object's access to the prototype's methods and properties
// 4) Return the object from the constructor function

// Note.
// Capital letter as convention
// Must have access to this keyword (ie. function declaration or functional expression)
/*
const Person = function (firstName, birthYear) {
  // Values can differ between instances
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this, Slow as every instance of Person has to create this function
  //   this.calcAge = function () {
  //     console.log(2021 - this.birthYear);
  //   };
};
const bracer = new Person('Estelle', 1058);
const doggo = 'zeit';
console.log(bracer);
console.log(bracer instanceof Person);
console.log(doggo instanceof Person);

// Prototypes
// the prototype that will be used as prototype of all its instances
console.log(Person.prototype);
// Setting methods and properties through prototype
Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};
Person.prototype.affiliation = 'Citizen'; // Same value for all instances

bracer.calcAge();
console.log(bracer.affiliation, bracer.enigma);

// Prototypal inheritance
// Since prototype themselves are objects, they can have nested prototype as well
//
// This allow us to chain a series of prototype to inherit methods and properties from the
// more basic prototypes
//
// Methods and properties that cannot be found in current object will be search against
// that object's prototype and nested prototypes until it hits null
console.log(bracer.__proto__); // Person.prototype
console.log(bracer.__proto__.__proto__); // Object.prototype
console.log(bracer.__proto__.__proto__.__proto__); // null

// Static method
Person.hey = function () {
  console.log('Person: Hey there');
};
Person.hey();
*/

///////////////////////////////////////////////////////////////////

// Coding Challenge #1
/*
// 1
const Car = function (maker, speed) {
  this.maker = maker;
  this.speed = speed;
};

// 2
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`The ${this.maker} car is now going at ${this.speed} km/h`);
};

// 3
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The ${this.maker} car is now going at ${this.speed} km/h`);
};

// 4
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.brake();
bmw.brake();

mercedes.brake();
mercedes.brake();
mercedes.brake();
mercedes.brake();
mercedes.accelerate();
*/

//////////////////////////////////////////////////////////////////////////////

// ES6 Classes
// Just syntatic sugar over the prototypes and constructor functions
// --> Classes are NOT hoisted
// --> Classes are first-class citizens (Can be passed around)
// --> Classes always runs in strict mode

// Class expression
// const PersonCl = class {};

// Class declaration
/*
class PersonCl {
  // Must have (Same as regular constructor function)
  constructor(fullName, birthYear) {
    // Setter for fullName was used here, so _fullName is set here instead of fullName
    this.fullName = fullName;

    this.birthYear = birthYear;
  }

  // Anything not written in constructor will be stored in the .prototype
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  // Getters and Settings in ES6 Classes
  // Can be accessed like a variable (eg. INSTANCE.GETTER_SETTER_NAME = ...)
  // Allow direct data validation when setting a property
  get age() {
    return 2022 - this.birthYear;
  }
  // Pattern for implementing setter of properties that already exist
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a fullName`);
  }
  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log(`PersonCl: Hey there`);
  }
}

const person1 = new PersonCl('Lloyd Bannings', 1856);
console.log(person1);
console.log(person1.__proto__);
console.log(PersonCl.prototype);

person1.calcAge();
console.log(person1.fullName); // Actually access ._fullName at the background

PersonCl.hey();
*/

// Object create
// Create an empty object that uses a specific object as its prototype
// Note. No constructor function will be involved
/*
const PersonProto = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const john = Object.create(PersonProto);
john.init('John', 1972);
console.log(john);
john.calcAge();
*/

/////////////////////////////////////////////////////////////////////////////////////
// Coding challenge #2
/*
// 1
class CarCl {
  constructor(maker, speed) {
    this.maker = maker;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.maker} is now going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.maker} is now going at ${this.speed} km/h`);
  }

  // 2
  get speedUS() {
    return this.speed / 1.6;
  }

  // 3
  set speedUS(newSpeed) {
    this.speed = newSpeed * 1.6;
  }
}

const bmw = new CarCl('BMW', 120);
const mercedes = new CarCl('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.brake();

mercedes.accelerate();
mercedes.brake();
mercedes.brake();
mercedes.brake();
mercedes.accelerate();

// 4
const ford = new CarCl('Ford', 120);

ford.brake();
ford.brake();
ford.accelerate();
ford.accelerate();
ford.brake();

console.log(ford.speed, ford.speedUS);
ford.speedUS = 100;
console.log(ford.speed, ford.speedUS);
*/

/////////////////////////////////////////////////////////////////////////////////////
Student.prototype.constructor = Student;
// "Class" inheritance - Constructor function
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // Inherit the properties of Person
  // (Set Student's properties to the properties in Person)
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Inherit the methods of Person
// (Set Student's prototype to an empty object that inherit Person's prototype as its prototype)
Student.prototype = Object.create(Person.prototype);

// Re-set the constructor back to the Student function
// (By changing the prototype to Person via Object.create(...), the constructor was replaced
// and thus, needs update)
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const estelle = new Student('Estelle', 1996, 'Computer Science');
console.log(estelle);
estelle.introduce();
estelle.calcAge();

// Chrome doesn't log this correctly, read this on Firefox
console.log(estelle.__proto__); // Student
console.log(estelle.__proto__.__proto__); // Person
console.log(estelle.__proto__.__proto__.__proto__); // Object
console.log(estelle.__proto__.__proto__.__proto__.__proto__); // Null

console.log(estelle instanceof Student);
console.log(estelle instanceof Person);
console.log(estelle instanceof Object);
*/

/////////////////////////////////////////////////////////////////////////////////////

// Coding Challenge #3
/*
// 1
const Car = function (maker, speed) {
  this.maker = maker;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`The ${this.maker} car is now going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The ${this.maker} car is now going at ${this.speed} km/h`);
};

const Ev = function (maker, speed, charge) {
  Car.call(this, maker, speed);
  this.charge = charge;
};
Ev.prototype = Object.create(Car.prototype);
Ev.prototype.constructor = Ev;

// 2
Ev.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// 3
Ev.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.maker} going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

// 4
const ev = new Ev('Tesla', 120, 23);
console.log(ev);
ev.accelerate();
ev.brake();
ev.chargeBattery(90);
console.log(ev);
*/

/////////////////////////////////////////////////////////////////////////////////////
// "Class" inheritance - ES6 classes
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2022 - this.birthYear);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a fullName`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log(`PersonCl: Hey there`);
  }
}

// "extends" helps to link the prototype, inheriting Person's methods into Student
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Calls the Person constructor with Student's this (Need to happen first), inheriting
    // Person's properties into Student
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm totally ${2022 - this.birthYear - 5} instead of ${
        2022 - this.birthYear
      }`
    );
  }
}

const estelle = new StudentCl('Estelle Bright', 2002, 'Bracer 101');
console.log(estelle);
estelle.introduce();
estelle.calcAge();
*/

// "Class" inheritance - Object.create
/*
// No need for new keyword or constructor function
const PersonProto = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Links StudentProto's prototype to PersonProto, inheriting the methods from PersonProto
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`I'm ${this.firstName} and I'm studying ${this.course}`);
};

const estelle = Object.create(StudentProto);
estelle.init('Estelle', 1996, 'Bracer 101');
console.log(estelle);
estelle.introduce();
*/

// More on ES6 classes
// Current way of encapsulation - Just following a convention to warn accessibility
/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // Can be independent of the parameters that are passed into the constructor
    this.locale = navigator.language;

    // CONVENTION: Having "_" before a property's name to indicated that it is protected
    // Just a convention to signify that it shouldn't be used but technically still accessible
    this._pin = pin;
    this._movements = [];
  }

  // Provide access to protected variables via public get/set methods
  getMovements() {
    return this._movements;
  }

  deposit(amt) {
    this._movements.push(amt);
  }

  withdraw(amt) {
    this._movements.push(-amt);
  }

  // The same convention can be used in naming function to indicate its accessibility
  _isLoanApproved(amt) {
    return true;
  }

  requestLoan(amt) {
    if (this.isLoanApproved(amt)) {
      this.deposit(amt);
      console.log(`Loan of $${amt} has been approved`);
    }
  }
}
*/

// Future way of encapsulation - Class Fields (Pending for implementation)
// Allow the following: Public fields, Private fields, Public methods, Private methods
// Static verion of the above 4 are also available
/*
class Account {
  // Public fields
  locale = navigator.language;

  // Private fields
  #pin; // Default to undefined
  #movements = [];

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; // Fields can be accessed like properties
  }

  // Public methods
  getMovements() {
    return this.#movements;
  }
  // return this at the end of these methods to allow chaining
  deposit(amt) {
    this.#movements.push(amt);
    return this;
  }
  withdraw(amt) {
    this.#movements.push(-amt);
    return this;
  } 
  requestLoan(amt) {
    if (this.#isLoanApproved(amt)) {
      this.deposit(amt);
      console.log(`Loan of $${amt} has been approved`);
      return this;
    }
  }

  // Private methods - Not implemented in browsers yet
  #isLoanApproved(amt) {
    return true;
  }

  // Static methods
  static ping() {
    console.log('ping');
  }
}

const acc = new Account('Estelle', 'EUR', 1111);
acc.deposit(500);
console.log(acc);
// console.log(acc.#pin); // Error - Private field
Account.ping();

// Chaining methods
acc
  .withdraw(499)
  .deposit(100)
  .withdraw(1)
  .deposit(200)
  .withdraw(100)
  .requestLoan(800);
console.log(acc);
*/

/////////////////////////////////////////////////////////////////////////////////////
// Coding challenge #4
/*
// 1
class CarCl {
  constructor(maker, speed) {
    this.maker = maker;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.maker} is now going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.maker} is now going at ${this.speed} km/h`);

    // 3
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(newSpeed) {
    this.speed = newSpeed * 1.6;
  }
}

class EVCl extends CarCl {
  // 2
  #charge;

  constructor(maker, speed, charge) {
    super(maker, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    // 3
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.maker} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }%`
    );
    // 3
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.chargeBattery(100).accelerate().brake();
*/
