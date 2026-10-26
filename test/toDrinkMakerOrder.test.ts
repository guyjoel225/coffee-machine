import {describe, expect, it} from 'vitest'
import {MakerOrder, type Order} from '../src/drinkMaker';


describe.each([
  {order:{drink: 'tea', sugar:0}, command: 'T::'},
  {order: {drink: 'coffee', sugar: 0}, command: 'C::'},
  {order: {drink: 'chocolate',sugar:0}, command: 'H::'},
  { order: { drink: 'tea', sugar: 1 }, command: 'T:1:0' },
] satisfies{order:Order, command:string} [])("La commade $order.drink ($command) envoyée au Drink maker", ({order, command})=>{
   
  it(`commande de ${order.drink} validée`,()=>{

    expect(MakerOrder(order)).toBe(command);
  })

})