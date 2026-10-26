import {describe, expect, it} from 'vitest'
import {toDrinkMakerMessage,drinkMakerOrde, type Order, serve} from '../src/drinkMaker';


describe("Commande envoyée au Drink Maker", ()=>{

  //test commande gratuite
it.each([
  {order:{drink: 'tea', sugar:0}, command: 'T::'},
  {order: {drink: 'coffee', sugar: 0}, command: 'C::'},
  {order: {drink: 'chocolate',sugar:0}, command: 'H::'},
  { order: { drink: 'tea', sugar: 1 }, command: 'T:1:0' },
  { order: { drink: 'coffee', sugar: 2 }, command: 'C:2:0' },
] satisfies{order:Order, command:string} [])("$order.drink avec $order.sugar sucre(s) donne $command", ({order, command})=>{
  

    expect(drinkMakerOrde(order)).toBe(command);
  
})

it('transmet un message au client', () => {
  expect(toDrinkMakerMessage("Pas assez d'argent")).toBe("M:Pas assez d'argent")
})


})





describe("payer avant de commander", ()=>{

  it.each([
    {order: {drink: 'tea', sugar: 0},command: 'T::', money: 40}
  ] satisfies {order:Order, command:string, money: number}[])("$order.drink avec $money centimes donne $command",({order,command, money})=>{

   expect(serve(order, money)).toBe(command);

  })
})