import type { BattleState, CardKind, RandomSource } from '../combat/types'

export function shuffle(
  cards: readonly CardKind[],
  random: RandomSource = Math.random,
): CardKind[] {
  const result = [...cards]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }

  return result
}

export function drawCards(
  state: BattleState,
  count: number,
  random: RandomSource = Math.random,
): BattleState {
  const drawPile = [...state.drawPile]
  const discardPile = [...state.discardPile]
  const hand = [...state.hand]

  for (let drawn = 0; drawn < count; drawn += 1) {
    if (drawPile.length === 0 && discardPile.length > 0) {
      drawPile.push(...shuffle(discardPile, random))
      discardPile.length = 0
    }

    const card = drawPile.pop()
    if (card === undefined) {
      break
    }
    hand.push(card)
  }

  return { ...state, drawPile, discardPile, hand }
}
