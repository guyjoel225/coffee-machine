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
  {order:{drink: 'orange', sugar: 0}, command:'O::'},
] satisfies{order:Order, command:string} [])("$order.drink avec $order.sugar sucre(s) donne $command", ({order, command})=>{
  

    expect(drinkMakerOrde(order)).toBe(command);
  
})

it.each([
  { order: { drink: 'tea', sugar: 0, extraHot: true }, command: 'Th::' },
  { order: { drink: 'coffee', sugar: 2, extraHot: true }, command: 'Ch:2:0' },
  { order: { drink: 'chocolate', sugar: 1, extraHot: true }, command: 'Hh:1:0' },
  { order: { drink: 'tea', sugar: 0, extraHot: false }, command: 'T::' },
] satisfies { order: Order; command: string }[])(
  '$order.drink extra chaud = $order.extraHot avec $order.sugar sucre(s) donne $command',
  ({ order, command }) => {
    expect(drinkMakerOrde(order)).toBe(command)
  },
)

it('transmet un message au client', () => {
  expect(toDrinkMakerMessage("Pas assez d'argent")).toBe("M:Pas assez d'argent")
})


})


describe("payer avant de commander", ()=>{

  it.each([
    { order: { drink: 'tea', sugar: 0 }, money: 40, command: 'T::' },
    { order: { drink: 'tea', sugar: 0 }, money: 10, command: 'M:Il manque 30 centimes' },
    { order: { drink: 'tea', sugar: 0 }, money: 70, command: 'M:Montant exact requis: 40 centimes'},
    { order: { drink: 'coffee', sugar: 0 }, money: 60, command: 'C::'},
    { order: { drink: 'coffee', sugar: 0 }, money: 20, command: 'M:Il manque 40 centimes' },
    { order: { drink: 'coffee', sugar: 0 }, money: 80, command: 'M:Montant exact requis: 60 centimes' },
    { order: { drink: 'chocolate', sugar: 0 }, money: 50, command: 'H::'},
    { order: { drink: 'chocolate', sugar: 0 }, money: 30, command: 'M:Il manque 20 centimes' },

    {order: {drink: 'tea', sugar: 1}, money: 40, command:'T:1:0'},
    {order: {drink: 'tea', sugar: 2}, money: 40, command:'T:2:0'},
    {order: {drink: 'coffee', sugar: 1}, money: 60, command:'C:1:0'},
    {order: {drink: 'orange', sugar:0}, money:60, command: 'O::'},
    {order: {drink: 'orange', sugar:0}, money:40, command: 'M:Il manque 20 centimes'},

  ] satisfies {order:Order, command:string, money: number}[])("$order.drink avec $money centimes $order.sugar sucre(s) donne $command",({order,command, money})=>{
   expect(serve(order, money)).toBe(command);
   
  })

  it.each([
  { order: { drink: 'tea', sugar: 0, extraHot: true }, money: 40, command: 'Th::' },
  { order: { drink: 'orange', sugar: 0, extraHot: true }, money: 60, command: "M:Le jus d'orange ne peut pas être servi chaud" },
  { order: { drink: 'orange', sugar: 0, extraHot: true }, money: 10, command: "M:Le jus d'orange ne peut pas être servi chaud" },
] satisfies { order: Order; money: number; command: string }[])(
  '$order.drink extra chaud = $order.extraHot avec $money centimes donne $command',
  ({ order, money, command }) => {
    expect(serve(order, money)).toBe(command)
  },
)
})