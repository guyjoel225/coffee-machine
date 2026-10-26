import {describe, expect, it} from 'vitest'
import {drinkMakerOrde, type Order} from '../src/drinkMaker';


describe("Commande envoyée au Drink Maker", ()=>{
it.each([
  {order:{drink: 'tea', sugar:0}, command: 'T::'},
  {order: {drink: 'coffee', sugar: 0}, command: 'C::'},
  {order: {drink: 'chocolate',sugar:0}, command: 'H::'},
  { order: { drink: 'tea', sugar: 1 }, command: 'T:1:0' },
] satisfies{order:Order, command:string} [])("$order.drink avec $order.sugar sucre(s) donne $command", ({order, command})=>{


    expect(drinkMakerOrde(order)).toBe(command);
  

})
})