export type Order = {
  drink: 'tea' | 'coffee' | 'chocolate' | 'orange'
  sugar: number
  extraHot?: boolean
}

type Drink = Order['drink']

const DRINK_CODES: Record<Drink, string> = { tea: 'T', coffee: 'C', chocolate: 'H', orange: 'O' }
const DRINK_PRICES: Record<Drink, number> = { tea: 40, coffee: 60, chocolate: 50, orange: 60 }

export function drinkMakerOrde(order: Order): string {
  const code = `${DRINK_CODES[order.drink]}${order.extraHot ? 'h' : ''}`
  return order.sugar > 0 ? `${code}:${order.sugar}:0` : `${code}::`
}

export function toDrinkMakerMessage(message: string): string {
  return `M:${message}`
}

export function serve(order: Order, money: number): string {
  if (order.drink === 'orange' && order.extraHot) {
    return toDrinkMakerMessage("Le jus d'orange ne peut pas être servi chaud")
  }

  const price = DRINK_PRICES[order.drink]

  if (money < price) {
    return toDrinkMakerMessage(`Il manque ${price - money} centimes`)
  }
  if (money > price) {
    return toDrinkMakerMessage(`Montant exact requis: ${price} centimes`)
  }
  return drinkMakerOrde(order)
}