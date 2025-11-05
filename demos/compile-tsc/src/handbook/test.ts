/* eslint-disable */
// 交换字段名
type ExchangeFieldNames<D extends any, F extends Record<string, keyof D>> = Omit<D, F[keyof F]> & {
  [P in keyof F]: D[F[P]];
};

// 交换字段名，支持嵌套
// 先排除子级字段名，再交换字段名，然后加上子级字段名，再替换一次。
type TransformFieldNames<
  D extends any,
  F extends Record<string, any>,
  C extends string
> = (C extends keyof D
  ? ExchangeFieldNames<Omit<D, C> & Record<C, TransformFieldNames<D, F, C>>, F>
  : ExchangeFieldNames<D, F>)[];

// 测试
// function transformFieldNames<D extends any, F extends Record<string, keyof D>, C extends string>(data: D[], fieldNames: F, childrenField?: C): TransformFieldNames<D, F, C> {
//   // console.log(data, fieldNames, childrenField);
//   return [];
// }

// 转换字段名方法
// function transformFieldNames<D extends any, F extends Record<string, keyof D>, C extends string>(data: D[], fieldNames: F, childrenField?: C) {
//   console.log(data, fieldNames, childrenField);

//   type Option = C extends keyof D ? ExchangeFieldNames<Omit<D, C> & Record<C, Option[]>, F> : ExchangeFieldNames<D, F>;
//   const r: Option[] = [];
//   return r;
// }

// const options = [{ code: '1', name: 'one' }, { code: '2', name: 'two', children: [{ code: '2-1', name: 'two-one' }] }];

// const t1 = transformFieldNames(options, { label: 'code', child: 'children' }, 'children');
// console.log(t1[1]);
// console.log(t1[0].child?.[0].code);

// const t2 = transformFieldNames(options, { label: 'code', child: 'children' }, 'children');
// console.log(t2[0].child[0]);
// console.log(t2[0].child[0].child[0].label);

// // 判断字段是否包含在对象中
// function contain<T extends object, S extends string>(obj: T, str: S): S extends keyof T ? string : number {
//   return (str in obj ? '1' : 1) as any;
// }
// var x = contain({ a: 1 }, 'a'); // string
// var y = contain({ b: 1 }, 'a'); // number

// 用于标识字段必填，但是值可以为undefined
type RequiredKey<T> = {
  [P in keyof T]: T[P] | undefined;
};
// 测试 RequiredKey
type TestRequiredKey = RequiredKey<{ a: number; b: string }>;
