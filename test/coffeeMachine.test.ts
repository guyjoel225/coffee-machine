import { describe, expect, it } from 'vitest'
import { CoffeeMachine } from '../src/coffeeMachine'

describe('Rapport des ventes', () => {

  it("une machine neuve n'a rien vendu", () => {
    const machine = new CoffeeMachine()

    expect(machine.report()).toEqual({
      sold: { tea: 0, coffee: 0, chocolate: 0, orange: 0 },
      total: 0,
    })
  });

  it('compte un thé servi', () => {
  const machine = new CoffeeMachine()

  machine.order({ drink: 'tea', sugar: 0 }, 40)

  expect(machine.report()).toEqual({
    sold: { tea: 1, coffee: 0, chocolate: 0, orange: 0 },
    total: 40,
  })

  it('cumule plusieurs ventes', () => {
  const machine = new CoffeeMachine()

  machine.order({ drink: 'tea', sugar: 0 }, 40)
  machine.order({ drink: 'tea', sugar: 1 }, 40)
  machine.order({ drink: 'coffee', sugar: 0 }, 60)

  expect(machine.report()).toEqual({
    sold: { tea: 2, coffee: 1, chocolate: 0, orange: 0 },
    total: 140,
  })

 it("ne compte pas une commande refusée faute d'argent", () => {
  const machine = new CoffeeMachine()

  machine.order({ drink: 'tea', sugar: 0 }, 10)

  expect(machine.report()).toEqual({
    sold: { tea: 0, coffee: 0, chocolate: 0, orange: 0 },
    total: 0,
  })
})  
})
})
})