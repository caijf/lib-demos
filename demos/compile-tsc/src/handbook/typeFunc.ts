/* eslint-disable */
// ref: https://zhuanlan.zhihu.com/p/489407052

enum ShapeType {
  Square = 1,
  Circle = 2
}
interface Square {
  size: number;
}
interface Circle {
  radius: number;
}

// 写法一：联合类型，不推荐
// type Shape = {
//   type: ShapeType;
//   data: Square | Circle;
// };

// const shape: Shape = {
//   type: ShapeType.Square,
//   data: {
//     // 即使 type 指定了 Sqare，这里仍允许出现 radius，而我们往往希望只允许出现 size
//     size: 5,
//     radius: 5
//   },
// };

// 写法二：借助 in 关键字，根据实际值推断类型
// type Shape = {
//   [Type in ShapeType]: {
//     type: Type,
//     data: Type extends ShapeType.Square ? Square : Type extends ShapeType.Circle ? Circle : never;
//   };
// }[ShapeType];

// const shape: Shape = {
//   type: ShapeType.Square,
//   data: {
//     // 只允许出现 size
//     size: 5,
//     // radius: 5
//   },
// };

// 核心是 {[Type in ShapeType]: {}}[ShapeType] 这个写法，其中的 Type 类似我们函数中的「形参」，通过它，我们拿到了「实际值」的可能，并根据这个可能，去推断 data 的类型。

// 写法三：写法二改造
// type Shape = {
//   [Type in ShapeType]: {
//     type: Type,
//     data: {
//       [ShapeType.Square]: Square;
//       [ShapeType.Circle]: Circle;
//     }[Type];
//   };
// }[ShapeType];

// const shape: Shape = {
//   type: ShapeType.Square,
//   data: {
//     // 只允许出现 size
//     size: 5,
//     // radius: 5
//   },
// };

// 改为和 shape.type 同级的字段，也根据 type 不同而不同
// type Shape = {
//   [Type in ShapeType]: {
//     type: Type,
//   } & {
//     [ShapeType.Square]: Square;
//     [ShapeType.Circle]: Circle;
//   }[Type];
// }[ShapeType];

// const shape: Shape = {
//   type: ShapeType.Square,
//   // 当 type 为 Square 时，希望这里允许出现 size，不允许出现 radius
//   size: 5,
//   // radius: 5
// };

// 封装高级类型
// 如果上面的场景非常多，可以将其中相同部分抽取出来变成一个高级类型，就和内置的 Partial、Omit 等等类似，我们称为 MutableRecord
type MutableRecord<U> = {
  [SubType in keyof U]: {
    type: SubType;
    data: U[SubType];
  };
}[keyof U];

type Shape = MutableRecord<{
  [ShapeType.Square]: Square;
  [ShapeType.Circle]: Circle;
}>;

const shape: Shape = {
  type: ShapeType.Square,
  data: {
    // 允许出现 size 而不允许出现 radius
    size: 5
    // radius: 5
  }
};
