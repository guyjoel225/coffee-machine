export type Order = {
  drink: 'tea' | 'coffee' | 'chocolate';
  sugar: number
}

const DRINK_CODES = {tea: 'T', coffee: 'C', chocolate: 'H'} as const


export function drinkMakerOrde(order:Order): string{

  
 const code  = DRINK_CODES[order.drink]
 
 
 return  order.sugar > 0 ? `${code}:${order.sugar}:0`:`${code}::`;
}
