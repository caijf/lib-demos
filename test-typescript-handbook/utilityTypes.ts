// ref: https://www.typescriptlang.org/docs/handbook/utility-types.html

// ----- Partial<Type>
// 构造一个所有属性都Type设置为optional的类型。该实用程序将返回一个表示给定类型的所有子集的类型。

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return {
    ...todo,
    ...fieldsToUpdate
  }
}

// ----- Required<Type>
// 构造一个类型，该类型由Type的所有属性设置为required。与之相反Partial。

interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5 };

// ----- Readonly<Type>
// 构造一个所有属性都Type设置为的类型readonly，这意味着无法重新分配所构造类型的属性。

interface Todo2 {
  title: string;
}
const todo2: Readonly<Todo2> = {
  title: "Delete inactive users"
}

todo2.title = "Hello";

// ----- Record<Keys, Type>
// 构造一个对象类型，其属性键为Keys，属性值为Type。该实用程序可用于将一个类型的属性映射到另一个类型。

interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 10, breed: "Maine Coon" },
  mordred: { age: 10, breed: "British Shorthair" }
}

cats.boris;

// ----- Pick<Type, Keys>
// 通过Keys从中选择一组属性（字符串文字或字符串文字并集）来构造类型Type。

interface Todo3 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview3 = Pick<Todo3, "title" | "completed">;

const todo3: TodoPreview3 = {
  title: "Clean room",
  completed: false
}

todo3;

// ----- Omit<Type, Keys>
// 通过从中选择所有属性Type然后删除Keys（字符串文字或字符串文字的并集）来构造类型。

interface Todo4 {
  title: string;
  description: string;
  completed: boolean;
  createAt: number;
}

type TodoPreview4 = Omit<Todo4, "description">;

const todo4: TodoPreview4 = {
  title: "Clean room",
  completed: false,
  createAt: Date.now()
}

// ----- Exclude<Type, ExcludedUnion>
// 通过从Type可分配给的所有联合成员中排除来构造类型ExcludedUnion。

type T0 = Exclude<"a" | "b" | "c", "a">;

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;

type T2 = Exclude<string | number | (() => void), Function>;

// ----- Extract<Type, Union>
// 通过从Type可分配给的所有联合成员中提取来构造类型Union。

type T3 = Extract<"a" | "b" | "c", "a" | "f">;

type T4 = Extract<string | number | (() => void), Function>;

// ----- NonNullable<Type>
// 通过从Type中排除null和undefined构造一个类型。

type T5 = NonNullable<string | number | undefined>;

type T6 = NonNullable<string[] | null | undefined>;

// ----- Parameters<Type>
// 从函数类型的参数中使用的类型构造一个元组类型Type。

declare function f1(arg: { a: number; b: string }): any;

type T7 = Parameters<() => string>;

type T8 = Parameters<(s: string) => void>;

type T9 =  Parameters<<T>(arg: T)=>T>;

type T10 = Parameters<typeof f1>;

type T11 = Parameters<any>;

type T12 = Parameters<never>;

type T13 = Parameters<string>;

type T14 = Parameters<Function>;

// ----- ConstructorParameters<Type>
// 从构造函数类型的类型构造元组或数组类型。它将生成具有所有参数类型的元组类型（never如果Type不是函数，则为类型）。

type T15 = ConstructorParameters<ErrorConstructor>;

type T16 = ConstructorParameters<FunctionConstructor>;

type T17 = ConstructorParameters<RegExpConstructor>;

type T18 = ConstructorParameters<any>;

type T19 = ConstructorParameters<Function>;

// ----- ReturnType<Type>
// 构造一个由函数的返回类型组成的类型Type。

declare function f2():{a: number;b:string;};

type T20 = ReturnType<()=>string>;

type T21 = ReturnType<(s:string)=>void>;

type T22 = ReturnType<<T>()=>T>;

type T23 = ReturnType<typeof f2>;

type T24 = ReturnType<any>;

type T25 = ReturnType<never>;

type T26 = ReturnType<string>;

type T27 = ReturnType<Function>;

// ----- InstanceType<Type>
// 构造一个类型，该类型由中的构造函数的实例类型组成Type。

class C {
  x=0;
  y=0;
}

type T28 = InstanceType<typeof C>;

type T29 = InstanceType<any>;

type T30 = InstanceType<never>;

type T31 = InstanceType<string>;

type T32 = InstanceType<Function>;

// ----- ThisParameterType<Type>
// 提取函数类型的this参数的类型，如果函数类型没有此参数则未知。

function toHex(this: Number){
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>){
    return toHex.apply(n);
}

// ----- OmitThisParameter<Type>
// 从“类型”中移除该参数。如果Type没有显式声明此参数，则结果仅为Type。否则，将从type创建一个没有此参数的新函数类型。将擦除泛型，并且只将最后一个重载签名传播到新函数类型中。

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);

console.log(fiveToHex());

// ----- ThisType<Type>
// 此实用程序不返回转换后的类型。相反，它作为上下文此类类型的标记。注意，必须启用——noImplicitThis标志才能使用该实用程序。

type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return {...data, ...methods} as D & M;
}

let obj3 = makeObject({
  data: {x: 0, y: 0},
  methods: {
    moveBy(dx: number, dy: number){
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    }
  }
});

obj3.x = 10;
obj3.y = 20;
obj3.moveBy(5,5);

// ----- Intrinsic String Manipulation Types
// 内在字符串操作类型

type T33 = Uppercase<'a'>; // 大写

type T34 = Uppercase<'aB_032,aA'>;

type T35 = Lowercase<'A'>; // 小写

type T36 = Capitalize<'aB'>; // 首字母大写

type T37 = Capitalize<'Ab'>;

type T38 = Uncapitalize<'aB'>; // 首字母小写

type T39 = Uncapitalize<'Ab'>;