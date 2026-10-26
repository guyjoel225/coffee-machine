export type Order = {
  drink: 'tea' | 'coffee' | 'chocolate';
  sugar: number
}



export function toDrinkMakerOrder(order:Order): string{
 if(order.drink === 'coffee') return "C::";

  return "T::";
}