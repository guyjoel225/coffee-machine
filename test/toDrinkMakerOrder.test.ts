import {describe, expect, it} from 'vitest'
import {toDrinkMakerOrder, type Order} from '../src/drinkMaker';


describe.each([
  {order:{drink: 'tea', sugar:0}, command: 'T::'},
  // {order: {drink: 'chocolate',sugar:0}, command: 'H::'},
  // {order: {drink: 'coffee', sugar: 0}, command: 'C::'}
] satisfies{order:Order, command:string} [])("La commade $order.drink ($command) envoyée au Drink maker", ({order, command})=>{
   
  it('Envoi de la commnde',()=>{

    expect(toDrinkMakerOrder(order)).toBe(command);
  })

})