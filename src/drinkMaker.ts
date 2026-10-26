export type Order = {
  drink: 'tea' | 'coffee' | 'chocolate';
  sugar: number
}

const DRINK_CODE = {tea: 'T', coffee: 'C', chocolate: 'H'} as const


export function MakerOrder(order:Order): string{

  
 const code  = DRINK_CODE[order.drink]


 return `${code}::`;
}
