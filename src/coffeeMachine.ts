import type { Drink } from './drinkMaker'

export type SalesReport = {
  sold: Record<Drink, number>
  total: number
}

export class CoffeeMachine {
  report(): SalesReport {
    return {
      sold: { tea: 0, coffee: 0, chocolate: 0, orange: 0 },
      total: 0,
    }
  }
}

