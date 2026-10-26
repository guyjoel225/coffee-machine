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

  
})