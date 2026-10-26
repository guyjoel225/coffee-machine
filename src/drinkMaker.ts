export type Order = {
  drink: 'tea' | 'coffee' | 'chocolate' | 'orange'
  sugar: number
  extraHot?: boolean
}

export type Drink = Order['drink']

export type Outcome = { served: boolean; command: string }

const DRINK_CODES: Record<Drink, string> = { tea: 'T', coffee: 'C', chocolate: 'H', orange: 'O' }
const DRINK_PRICES: Record<Drink, number> = { tea: 40, coffee: 60, chocolate: 50, orange: 60 }

export function drinkMakerOrde(order: Order): string {
  const code = `${DRINK_CODES[order.drink]}${order.extraHot ? 'h' : ''}`
  return order.sugar > 0 ? `${code}:${order.sugar}:0` : `${code}::`
}

export function toDrinkMakerMessage(message: string): string {
  return `M:${message}`
}

export function priceOf(drink: Drink): number {
  return DRINK_PRICES[drink]
}

export function evaluate(order: Order, money: number): Outcome {
  if (order.drink === 'orange' && order.extraHot) {
    return { served: false, command: toDrinkMakerMessage("Le jus d'orange ne peut pas être servi chaud") }
  }

  const price = DRINK_PRICES[order.drink]

  if (money < price) {
    return { served: false, command: toDrinkMakerMessage(`Il manque ${price - money} centimes`) }
  }
  if (money > price) {
    return { served: false, command: toDrinkMakerMessage(`Montant exact requis: ${price} centimes`) }
  }
  return { served: true, command: drinkMakerOrde(order) }
}

export function serve(order: Order, money: number): string {
  return evaluate(order, money).command
}