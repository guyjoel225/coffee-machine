import { priceOf, serve, type Drink, type Order } from './drinkMaker'

export type SalesReport = {
  sold: Record<Drink, number>
  total: number
}

export class CoffeeMachine {
  private sold: Record<Drink, number> = { tea: 0, coffee: 0, chocolate: 0, orange: 0 }
  private total = 0

  order(order: Order, money: number): string {
    this.sold[order.drink] += 1
    this.total += priceOf(order.drink)
    return serve(order, money)
  }

  report(): SalesReport {
    return { sold: { ...this.sold }, total: this.total }
  }
}