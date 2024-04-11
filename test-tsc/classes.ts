// https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses

// 1. Class Members
// 1.1 Fields
class Point {
  x = 0;
  y = 0;
}
const pt = new Point();
console.log(`${pt.x}, ${pt.y}`);

// --strictPropertyInitialization
class GoodGreeter {
  name: string;
  constructor() {
    this.name = 'hello';
  }
}

// 1.2 readonly
class Greeter {
  readonly name: string = 'world';
  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }

  // err(){
  //   this.name = '123'
  // }
}

const g = new Greeter();
// g.name = '12'

// 1.3 Constructors
class Point2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Point3 {
  // Overloads
  constructor(x: number, y: number);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}

// Super Calls

class Base {
  k = 4;
}

class Derived extends Base {
  constructor() {
    super();
    console.log(this.k);
  }
}

// 1.4 Methods
class Point4 {
  x = 10;
  y = 10;
  scale(n: number) {
    this.x *= n;
    this.y *= n;
  }
}

// 1.5 Getters / Setters
class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}

class Thing {
  _size = 0;
  get size() {
    return this._size;
  }
  set size(value: string | number | boolean) {
    let num = Number(value);
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }
    this._size = num;
  }
}

// 1.6 Index Signatures
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}

// 2. Class Heritage
// 2.1 implements Clauses
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log('ping!');
  }
}

// class Ball implements Pingable {
//   pong(){
//     console.log('pong!');
//   }
// }

interface Checkable {
  check(name: string): boolean;
}

class NameChecker implements Checkable {
  check(s: string) {
    return s.toLowerCase() === 'ok';
  }
}

interface A {
  x: number;
  y?: number;
}

class C1 implements A {
  x = 0;
}

const c = new C1();
// c.y = 10;

// 2.2 extends Clauses
class Animal {
  move() {
    console.log('moving along!');
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log('woof!');
    }
  }
}
const d = new Dog();
d.move();
d.woof(3);

// Overriding Methods
class Base1 {
  greet() {
    console.log('hello, world!');
  }
}

class Derived1 extends Base1 {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

const d1 = new Derived1();
d1.greet();
d1.greet('reader');

const b: Base1 = d1;
b.greet();

// Type-only Field Declarations
interface Animal1 {
  dateOfBirth: any;
}
interface Dog1 extends Animal1 {
  breed: any;
}

class AnimalHouse {
  resident: Animal1;
  constructor(animal: Animal1) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  declare resident: Dog1;
  constructor(dog: Dog1) {
    super(dog);
  }
}

// initialization Order
class Base2 {
  name = 'base';
  constructor() {
    console.log('My name is ' + this.name);
  }
}

class Derived2 extends Base2 {
  name = 'derived';
}

const d2 = new Derived2(); // My name is base

// Inheriting Built-in Types
class MsgError extends Error {
  constructor(m: string) {
    super(m);

    Object.setPrototypeOf(this, MsgError.prototype);
  }
  sayHello() {
    return 'hello ' + this.message;
  }
}

// 3. Member Visibility
// 3.1 public
class Greeter1 {
  public greet() {
    console.log('hi!');
  }
}
const g1 = new Greeter1();
g1.greet();

// 3.2 protected
class Greeter2 {
  public greet() {
    console.log('Hello, ' + this.getName());
  }
  protected getName() {
    return 'hi';
  }
}

class SpecialGreeter2 extends Greeter2 {
  public howdy() {
    console.log('Howdy, ' + this.getName());
  }
}
const g2 = new SpecialGreeter2();
g2.greet();
// g2.getName();

// Exposure of protected members
class Base3 {
  protected m = 10;
}

class Derived3 extends Base3 {
  m = 15;
}

const d3 = new Derived3();
console.log(d3.m); // 15

// Cross-hierarchy proteched access
class Base4 {
  protected x: number = 1;
}
class Derived41 extends Base4 {
  protected x: number = 5;
}
class Derived42 extends Base4 {
  // f1(other: Derived41) {
  //   other.x = 10;
  // }

  f2(other: Derived42) {
    other.x = 10;
  }
}

// 3.3 private
class Base5 {
  private x = 0;
}
const b5 = new Base5();
// console.log(b5.x);

class Derived5 extends Base5 {
  showX() {
    // console.log(this.x);
  }
}

// class Derived52 extends Base5 {
//   x = 1;
// }

// Cross-instance private access
class A1 {
  private x = 10;

  public sameAs(other: A1) {
    return other.x === this.x;
  }
}

// Caveats
class MySafe {
  private secretkey = 12345;
}
const s = new MySafe();
// console.log(s.secretkey);

// OK
console.log(s['secretkey']);

class Dog2 {
  #barkAmount = 0;
  personality = 'happy';

  constructor() {}
}

// 4. Static Members
class MyClass1 {
  static x = 0;
  static printX() {
    console.log(MyClass1.x);
  }
}

console.log(MyClass1.x);
MyClass1.printX();

class MyClass2 {
  private static x = 0;
  static printX() {
    console.log(MyClass2.x);
  }
}
// console.log(MyClass2.x);

// Static members are also inherited:
class Base6 {
  static getGreeting() {
    return 'Hello world';
  }
}
class Derived6 extends Base6 {
  myGreeting = Derived6.getGreeting();
}

// 4.1 Special Static Names

// class S {
//   static name = 'S!';
// }

// 4.2 Why No Static Classes?

// Unnecessary "static" class
class MyStaticClass {
  static doSomething() {}
}

// Preferred (alternative 1)
function doSomething() {}

// Preferred (alternative 2)
const MyHelperObject = {
  doSomething() {},
};

// 5. static Blocks in Classes
declare function loadLastInstances(): any[];
class Foo {
  static #count = 0;
  get count() {
    return Foo.#count;
  }

  static {
    try {
      const lastInstances = loadLastInstances();
      Foo.#count += lastInstances.length;
    } catch {}
  }
}

// 6. Generic Classes
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
const b6 = new Box('hello!');

// 6.1 Type Parameters in Static Members
// class Box2<Type>{
//   static defaultValue: Type;
// }

// 7. this at Runtime in Classes
class MyClass3 {
  name = 'MyClass';
  getName() {
    return this.name;
  }
}
const c1 = new MyClass3();
const obj = {
  name: 'obj',
  getName: c1.getName,
};

console.log(obj.getName()); // obj

// 7.1 Arrow Functions
class MyClass4 {
  name = 'MyClass';
  getName = () => {
    return this.name;
  };
}
const c2 = new MyClass4();
const obj2 = {
  name: 'obj',
  getName: c2.getName,
};
console.log(obj2.getName()); // MyClass

// 7.2 this parameters
// TypeScript input with 'this' parameter
function fn(this: object, x: number) {}

// output
// function fn(x) {}

class MyClass5 {
  name = 'MyClass';
  getName(this: MyClass5) {
    return this.name;
  }
}
const c3 = new MyClass5();
// OK
c3.getName();

const g3 = c3.getName;
// console.log(g3()); // Error: 类型为“void”的 "this" 上下文不能分配给类型为“MyClass5”的方法的 "this"。

// 8. this Type
class Box3 {
  contents: string = '';
  set(value: string) {
    this.contents = value;
    return this;
  }
}

class ClearableBox3 extends Box3 {
  clear() {
    this.contents = '';
  }
}

const cb31 = new ClearableBox3();
const cb32 = cb31.set('hello');

class Box4 {
  content: string = '';
  sameAs(other: this) {
    return other.content === this.content;
  }
}

class DerivedBox4 extends Box4 {
  otherContent: string = '?';
}

const db41 = new Box4();
const db42 = new DerivedBox4();
// db42.sameAs(db41);
db41.sameAs(db42);

// 8.1 this - based type guards
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}

class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}

class Directory extends FileSystemObject {
  children: FileSystemObject[];
}

interface Networked {
  host: string;
}

const fso: FileSystemObject = new FileRep('foo/bar.txt', 'foo');
if (fso.isFile()) {
  fso.content;
} else if (fso.isDirectory()) {
  fso.children;
} else if (fso.isNetworked()) {
  fso.host;
}

class Box5<T> {
  value?: T;

  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}
const box5 = new Box5<string>();
box5.value = 'Gamebody';
box5.value;

if (box5.hasValue()) {
  box5.value;
}

// 9. Parameter properties
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {}
}
const p = new Params(1, 2, 3);
console.log(p.x);
// console.log(p.y);
// console.log(p.z);

// 10. Class Expressions
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};
const m = new someClass('Hello, world');

// 11. Constructor Signatures
class Point5 {
  createdAt: number;
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.createdAt = Date.now();
    this.x = x;
    this.y = y;
  }
}

type PointInstance = InstanceType<typeof Point5>;

function moveRight(point: PointInstance) {
  point.x += 5;
}

const point5 = new Point5(3, 4);
moveRight(point5);
point5.x; // 8

// 12. abstract Classes and Members
abstract class Base7 {
  abstract getName(): string;
  printName() {
    console.log('Hello, ' + this.getName());
  }
}
// const b7 = new Base7(); // Error: 无法创建抽象类的实例。

class Derived7 extends Base7 {
  getName() {
    return 'world';
  }
}

const d7 = new Derived7();
d7.printName();

// 12.1 Abstract Contruct Signatures

// function greet(ctor: typeof Base7){
//   const instance = new ctor(); // Error: 无法创建抽象类的实例。
//   instance.printName();
// }
// greet(Base7)

function greet(ctor: new () => Base7) {
  const instance = new ctor();
  instance.printName();
}
greet(Derived7);
// greet(Base7); // Error: 无法将抽象构造函数类型分配给非抽象构造函数类型。

// 13. Relationships Between Classes
class Point131 {
  x = 0;
  y = 0;
}
class Point132 {
  x = 0;
  y = 0;
}
// OK
const p131: Point131 = new Point132();

class Person131 {
  name: string;
  age: number;
}
class Employee {
  name: string;
  age: number;
  salary: number;
}
// OK
const p132: Person131 = new Employee();

class Empty {}

function fn131(x: Empty) {}

// All OK!
fn131(Window);
fn131({});
fn131(fn);
