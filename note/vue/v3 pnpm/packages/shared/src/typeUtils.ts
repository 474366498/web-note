




export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

// make keys required but keep undefined values   //使键是必需的，但保留未定义的值
export type LooseRequired<T> = { [P in string & keyof T]: T[P] }

// If the the type T accepts type "any", output type Y, otherwise output type N.   如果类型T接受任何类型的输出类型Y，否则输出类型N
// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N 