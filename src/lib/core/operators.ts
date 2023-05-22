export const plus = (x: number, y: number): number => x + y
export const minus = (x: number, y: number): number => x - y
export const mul = (x: number, y: number): number => x * y
export const div = (x: number, y: number): number => x / y
export const mod = (x: number, y: number): number => x % y
export const pow = (x: number, y: number): number => x ** y

export const not = (x: boolean): boolean => !x
export const bool = (x: unknown): boolean => !!x
export const inc = (x: number): number => x + 1
export const dec = (x: number): number => x - 1
export const neg = (x: number): number => -x

export const squared = (x: number): number => x * x
export const isOdd = (x: number): boolean => x % 2 !== 0
export const isEven = (x: number): boolean => x % 2 === 0
