export type Order = {
  drink: 'tea' | 'coffee' | 'chocolate' | 'orange';
  sugar: number
}

const DRINK_CODES = {tea: 'T', coffee: 'C', chocolate: 'H', 'orange': 'O'} as const
const DRINK_PRICES = {tea: 40, coffee: 60, chocolate: 50, orange: 60}  as const

export function drinkMakerOrde(order:Order): string{

  
 const code  = DRINK_CODES[order.drink]
 
 
 return  order.sugar > 0 ? `${code}:${order.sugar}:0`:`${code}::`;
}



export function toDrinkMakerMessage(message:string):string{

  return `M:${message}`;
}


export function serve(order:Order, money: number): string{
  
  const price = DRINK_PRICES[order.drink];

   if(money < price){

    return toDrinkMakerMessage(`Il manque ${price - money} centimes`);
   }
   if(money > price){
    return toDrinkMakerMessage(`Montant exact requis: ${price} centimes`)
   }
   return drinkMakerOrde(order);
  }