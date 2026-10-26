export type Order = {
  drink: 'tea' | 'coffee' | 'chocolate';
  sugar: number
}

const DRINK_CODES = {tea: 'T', coffee: 'C', chocolate: 'H'} as const
const DRINK_MONEY = {tea: 40, coffee: 60, chocolate: 50}  as const

export function drinkMakerOrde(order:Order): string{

  
 const code  = DRINK_CODES[order.drink]
 
 
 return  order.sugar > 0 ? `${code}:${order.sugar}:0`:`${code}::`;
}



export function toDrinkMakerMessage(message:string):string{

  return `M:${message}`;
}


export function serve(order:Order, money: number): string{
  
  const price = DRINK_MONEY[order.drink];

   return money === price ? drinkMakerOrde(order): toDrinkMakerMessage(`Il manque ${price -  money} centimes`);
}

