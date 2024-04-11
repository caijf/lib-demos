"use strict";
// https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Dog2_barkAmount, _a, _Foo_count;
// 1. Class Members
// 1.1 Fields
class Point {
    constructor() {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
}
const pt = new Point();
console.log(`${pt.x}, ${pt.y}`);
// --strictPropertyInitialization
class GoodGreeter {
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'hello';
    }
}
// 1.2 readonly
class Greeter {
    constructor(otherName) {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'world'
        });
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }
}
const g = new Greeter();
// g.name = '12'
// 1.3 Constructors
class Point2 {
    constructor(x = 0, y = 0) {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.x = x;
        this.y = y;
    }
}
class Point3 {
    constructor(xs, y) {
        // TBD
    }
}
// Super Calls
class Base {
    constructor() {
        Object.defineProperty(this, "k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
    }
}
class Derived extends Base {
    constructor() {
        super();
        console.log(this.k);
    }
}
// 1.4 Methods
class Point4 {
    constructor() {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
    }
    scale(n) {
        this.x *= n;
        this.y *= n;
    }
}
// 1.5 Getters / Setters
class C {
    constructor() {
        Object.defineProperty(this, "_length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
    }
}
class Thing {
    constructor() {
        Object.defineProperty(this, "_size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
    get size() {
        return this._size;
    }
    set size(value) {
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
    check(s) {
        return this[s];
    }
}
class Sonar {
    ping() {
        console.log('ping!');
    }
}
class NameChecker {
    check(s) {
        return s.toLowerCase() === 'ok';
    }
}
class C1 {
    constructor() {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
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
    woof(times) {
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
    greet(name) {
        if (name === undefined) {
            super.greet();
        }
        else {
            console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
}
const d1 = new Derived1();
d1.greet();
d1.greet('reader');
const b = d1;
b.greet();
class AnimalHouse {
    constructor(animal) {
        Object.defineProperty(this, "resident", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.resident = animal;
    }
}
class DogHouse extends AnimalHouse {
    constructor(dog) {
        super(dog);
    }
}
// initialization Order
class Base2 {
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'base'
        });
        console.log('My name is ' + this.name);
    }
}
class Derived2 extends Base2 {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'derived'
        });
    }
}
const d2 = new Derived2(); // My name is base
// Inheriting Built-in Types
class MsgError extends Error {
    constructor(m) {
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
    greet() {
        console.log('hi!');
    }
}
const g1 = new Greeter1();
g1.greet();
// 3.2 protected
class Greeter2 {
    greet() {
        console.log('Hello, ' + this.getName());
    }
    getName() {
        return 'hi';
    }
}
class SpecialGreeter2 extends Greeter2 {
    howdy() {
        console.log('Howdy, ' + this.getName());
    }
}
const g2 = new SpecialGreeter2();
g2.greet();
// g2.getName();
// Exposure of protected members
class Base3 {
    constructor() {
        Object.defineProperty(this, "m", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
    }
}
class Derived3 extends Base3 {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "m", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 15
        });
    }
}
const d3 = new Derived3();
console.log(d3.m); // 15
// Cross-hierarchy proteched access
class Base4 {
    constructor() {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
    }
}
class Derived41 extends Base4 {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 5
        });
    }
}
class Derived42 extends Base4 {
    // f1(other: Derived41) {
    //   other.x = 10;
    // }
    f2(other) {
        other.x = 10;
    }
}
// 3.3 private
class Base5 {
    constructor() {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
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
    constructor() {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
    }
    sameAs(other) {
        return other.x === this.x;
    }
}
// Caveats
class MySafe {
    constructor() {
        Object.defineProperty(this, "secretkey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 12345
        });
    }
}
const s = new MySafe();
// console.log(s.secretkey);
// OK
console.log(s['secretkey']);
class Dog2 {
    constructor() {
        _Dog2_barkAmount.set(this, 0);
        Object.defineProperty(this, "personality", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'happy'
        });
    }
}
_Dog2_barkAmount = new WeakMap();
// 4. Static Members
class MyClass1 {
    static printX() {
        console.log(MyClass1.x);
    }
}
Object.defineProperty(MyClass1, "x", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 0
});
console.log(MyClass1.x);
MyClass1.printX();
class MyClass2 {
    static printX() {
        console.log(MyClass2.x);
    }
}
Object.defineProperty(MyClass2, "x", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 0
});
// console.log(MyClass2.x);
// Static members are also inherited:
class Base6 {
    static getGreeting() {
        return 'Hello world';
    }
}
class Derived6 extends Base6 {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "myGreeting", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Derived6.getGreeting()
        });
    }
}
// 4.1 Special Static Names
// class S {
//   static name = 'S!';
// }
// 4.2 Why No Static Classes?
// Unnecessary "static" class
class MyStaticClass {
    static doSomething() { }
}
// Preferred (alternative 1)
function doSomething() { }
// Preferred (alternative 2)
const MyHelperObject = {
    doSomething() { },
};
class Foo {
    get count() {
        return __classPrivateFieldGet(_a, _a, "f", _Foo_count);
    }
}
_a = Foo;
_Foo_count = { value: 0 };
(() => {
    var _b;
    try {
        const lastInstances = loadLastInstances();
        __classPrivateFieldSet(_b = _a, _a, __classPrivateFieldGet(_b, _a, "f", _Foo_count) + lastInstances.length, "f", _Foo_count);
    }
    catch (_c) { }
})();
// 6. Generic Classes
class Box {
    constructor(value) {
        Object.defineProperty(this, "contents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'MyClass'
        });
    }
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
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'MyClass'
        });
        Object.defineProperty(this, "getName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.name;
            }
        });
    }
}
const c2 = new MyClass4();
const obj2 = {
    name: 'obj',
    getName: c2.getName,
};
console.log(obj2.getName()); // MyClass
// 7.2 this parameters
// TypeScript input with 'this' parameter
function fn(x) { }
// output
// function fn(x) {}
class MyClass5 {
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'MyClass'
        });
    }
    getName() {
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
    constructor() {
        Object.defineProperty(this, "contents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
    }
    set(value) {
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
    constructor() {
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
    }
    sameAs(other) {
        return other.content === this.content;
    }
}
class DerivedBox4 extends Box4 {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "otherContent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '?'
        });
    }
}
const db41 = new Box4();
const db42 = new DerivedBox4();
// db42.sameAs(db41);
db41.sameAs(db42);
// 8.1 this - based type guards
class FileSystemObject {
    isFile() {
        return this instanceof FileRep;
    }
    isDirectory() {
        return this instanceof Directory;
    }
    isNetworked() {
        return this.networked;
    }
    constructor(path, networked) {
        Object.defineProperty(this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: path
        });
        Object.defineProperty(this, "networked", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: networked
        });
    }
}
class FileRep extends FileSystemObject {
    constructor(path, content) {
        super(path, false);
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: content
        });
    }
}
class Directory extends FileSystemObject {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "children", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
const fso = new FileRep('foo/bar.txt', 'foo');
if (fso.isFile()) {
    fso.content;
}
else if (fso.isDirectory()) {
    fso.children;
}
else if (fso.isNetworked()) {
    fso.host;
}
class Box5 {
    constructor() {
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    hasValue() {
        return this.value !== undefined;
    }
}
const box5 = new Box5();
box5.value = 'Gamebody';
box5.value;
if (box5.hasValue()) {
    box5.value;
}
// 9. Parameter properties
class Params {
    constructor(x, y, z) {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: x
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: y
        });
        Object.defineProperty(this, "z", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: z
        });
    }
}
const p = new Params(1, 2, 3);
console.log(p.x);
// console.log(p.y);
// console.log(p.z);
// 10. Class Expressions
const someClass = class {
    constructor(value) {
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.content = value;
    }
};
const m = new someClass('Hello, world');
// 11. Constructor Signatures
class Point5 {
    constructor(x, y) {
        Object.defineProperty(this, "createdAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.createdAt = Date.now();
        this.x = x;
        this.y = y;
    }
}
function moveRight(point) {
    point.x += 5;
}
const point5 = new Point5(3, 4);
moveRight(point5);
point5.x; // 8
// 12. abstract Classes and Members
class Base7 {
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
function greet(ctor) {
    const instance = new ctor();
    instance.printName();
}
greet(Derived7);
// greet(Base7); // Error: 无法将抽象构造函数类型分配给非抽象构造函数类型。
// 13. Relationships Between Classes
class Point131 {
    constructor() {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
}
class Point132 {
    constructor() {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
}
// OK
const p131 = new Point132();
class Person131 {
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "age", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
class Employee {
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "age", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "salary", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
// OK
const p132 = new Employee();
class Empty {
}
function fn131(x) { }
// All OK!
fn131(Window);
fn131({});
fn131(fn);
