declare class Point {
    x: number;
    y: number;
}
declare const pt: Point;
declare class GoodGreeter {
    name: string;
    constructor();
}
declare class Greeter {
    readonly name: string;
    constructor(otherName?: string);
}
declare const g: Greeter;
declare class Point2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
}
declare class Point3 {
    constructor(x: number, y: number);
    constructor(s: string);
}
declare class Base {
    k: number;
}
declare class Derived extends Base {
    constructor();
}
declare class Point4 {
    x: number;
    y: number;
    scale(n: number): void;
}
declare class C {
    _length: number;
    get length(): number;
    set length(value: number);
}
declare class Thing {
    _size: number;
    get size(): string | number | boolean;
    set size(value: string | number | boolean);
}
declare class MyClass {
    [s: string]: boolean | ((s: string) => boolean);
    check(s: string): boolean;
}
interface Pingable {
    ping(): void;
}
declare class Sonar implements Pingable {
    ping(): void;
}
interface Checkable {
    check(name: string): boolean;
}
declare class NameChecker implements Checkable {
    check(s: string): boolean;
}
interface A {
    x: number;
    y?: number;
}
declare class C1 implements A {
    x: number;
}
declare const c: C1;
declare class Animal {
    move(): void;
}
declare class Dog extends Animal {
    woof(times: number): void;
}
declare const d: Dog;
declare class Base1 {
    greet(): void;
}
declare class Derived1 extends Base1 {
    greet(name?: string): void;
}
declare const d1: Derived1;
declare const b: Base1;
interface Animal1 {
    dateOfBirth: any;
}
interface Dog1 extends Animal1 {
    breed: any;
}
declare class AnimalHouse {
    resident: Animal1;
    constructor(animal: Animal1);
}
declare class DogHouse extends AnimalHouse {
    resident: Dog1;
    constructor(dog: Dog1);
}
declare class Base2 {
    name: string;
    constructor();
}
declare class Derived2 extends Base2 {
    name: string;
}
declare const d2: Derived2;
declare class MsgError extends Error {
    constructor(m: string);
    sayHello(): string;
}
declare class Greeter1 {
    greet(): void;
}
declare const g1: Greeter1;
declare class Greeter2 {
    greet(): void;
    protected getName(): string;
}
declare class SpecialGreeter2 extends Greeter2 {
    howdy(): void;
}
declare const g2: SpecialGreeter2;
declare class Base3 {
    protected m: number;
}
declare class Derived3 extends Base3 {
    m: number;
}
declare const d3: Derived3;
declare class Base4 {
    protected x: number;
}
declare class Derived41 extends Base4 {
    protected x: number;
}
declare class Derived42 extends Base4 {
    f2(other: Derived42): void;
}
declare class Base5 {
    private x;
}
declare const b5: Base5;
declare class Derived5 extends Base5 {
    showX(): void;
}
declare class A1 {
    private x;
    sameAs(other: A1): boolean;
}
declare class MySafe {
    private secretkey;
}
declare const s: MySafe;
declare class Dog2 {
    #private;
    personality: string;
    constructor();
}
declare class MyClass1 {
    static x: number;
    static printX(): void;
}
declare class MyClass2 {
    private static x;
    static printX(): void;
}
declare class Base6 {
    static getGreeting(): string;
}
declare class Derived6 extends Base6 {
    myGreeting: string;
}
declare class MyStaticClass {
    static doSomething(): void;
}
declare function doSomething(): void;
declare const MyHelperObject: {
    doSomething(): void;
};
declare function loadLastInstances(): any[];
declare class Foo {
    #private;
    get count(): number;
}
declare class Box<Type> {
    contents: Type;
    constructor(value: Type);
}
declare const b6: Box<string>;
declare class MyClass3 {
    name: string;
    getName(): string;
}
declare const c1: MyClass3;
declare const obj: {
    name: string;
    getName: () => string;
};
declare class MyClass4 {
    name: string;
    getName: () => string;
}
declare const c2: MyClass4;
declare const obj2: {
    name: string;
    getName: () => string;
};
declare function fn(this: object, x: number): void;
declare class MyClass5 {
    name: string;
    getName(this: MyClass5): string;
}
declare const c3: MyClass5;
declare const g3: (this: MyClass5) => string;
declare class Box3 {
    contents: string;
    set(value: string): this;
}
declare class ClearableBox3 extends Box3 {
    clear(): void;
}
declare const cb31: ClearableBox3;
declare const cb32: ClearableBox3;
declare class Box4 {
    content: string;
    sameAs(other: this): boolean;
}
declare class DerivedBox4 extends Box4 {
    otherContent: string;
}
declare const db41: Box4;
declare const db42: DerivedBox4;
declare class FileSystemObject {
    path: string;
    private networked;
    isFile(): this is FileRep;
    isDirectory(): this is Directory;
    isNetworked(): this is Networked & this;
    constructor(path: string, networked: boolean);
}
declare class FileRep extends FileSystemObject {
    content: string;
    constructor(path: string, content: string);
}
declare class Directory extends FileSystemObject {
    children: FileSystemObject[];
}
interface Networked {
    host: string;
}
declare const fso: FileSystemObject;
declare class Box5<T> {
    value?: T;
    hasValue(): this is {
        value: T;
    };
}
declare const box5: Box5<string>;
declare class Params {
    readonly x: number;
    protected y: number;
    private z;
    constructor(x: number, y: number, z: number);
}
declare const p: Params;
declare const someClass: {
    new <Type>(value: Type): {
        content: Type;
    };
};
declare const m: {
    content: string;
};
declare class Point5 {
    createdAt: number;
    x: number;
    y: number;
    constructor(x: number, y: number);
}
type PointInstance = InstanceType<typeof Point5>;
declare function moveRight(point: PointInstance): void;
declare const point5: Point5;
declare abstract class Base7 {
    abstract getName(): string;
    printName(): void;
}
declare class Derived7 extends Base7 {
    getName(): string;
}
declare const d7: Derived7;
declare function greet(ctor: new () => Base7): void;
declare class Point131 {
    x: number;
    y: number;
}
declare class Point132 {
    x: number;
    y: number;
}
declare const p131: Point131;
declare class Person131 {
    name: string;
    age: number;
}
declare class Employee {
    name: string;
    age: number;
    salary: number;
}
declare const p132: Person131;
declare class Empty {
}
declare function fn131(x: Empty): void;
