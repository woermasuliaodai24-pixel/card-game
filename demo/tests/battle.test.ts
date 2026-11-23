import { describe, expect, it } from 'vitest'

import { createInitialBattle, playCard, restartBattle } from '../src/combat/battle'
import type { BattleState, CardKind } from '../src/combat/types'
import { drawCards } from '../src/deck/deck'

const fixedRandom = () => 0.42

function stateWithHand(
  hand: CardKind[],
  overrides: Partial<BattleState> = {},
): BattleState {
  return {
    playerHp: 50,
    playerBlock: 0,
    bossHp: 64,
    timeRemainingMs: 3000,
    drawPile: ['defend', 'defend', 'attack', 'attack', 'timeScale'],
    hand,
    discardPile: [],
    timeScaleArmed: false,
    phase: 'playing',
    message: '测试状态',
    round: 1,
    ...overrides,
  }
}

describe('battle initialization', () => {
  it('starts with the approved health, time, hand and deck counts', () => {
    const state = createInitialBattle(fixedRandom)
    const cards = [...state.drawPile, ...state.hand, ...state.discardPile]

    expect(state.playerHp).toBe(50)
    expect(state.bossHp).toBe(64)
    expect(state.timeRemainingMs).toBe(3000)
    expect(state.hand).toHaveLength(5)
    expect(cards.filter((card) => card === 'attack')).toHaveLength(5)
    expect(cards.filter((card) => card === 'defend')).toHaveLength(4)
    expect(cards.filter((card) => card === 'timeScale')).toHaveLength(1)
  })
})

describe('card resolution', () => {
  it('resolves Attack immediately for 8 damage and 900 ms', () => {
    const next = playCard(
      stateWithHand(['attack', 'defend', 'defend', 'defend', 'defend']),
      0,
      fixedRandom,
    )

    expect(next.bossHp).toBe(56)
    expect(next.timeRemainingMs).toBe(2100)
    expect(next.hand).toHaveLength(4)
    expect(next.discardPile).toContain('attack')
  })

  it('resolves Defend immediately for 5 block and 600 ms', () => {
    const next = playCard(
      stateWithHand(['defend', 'attack', 'attack', 'attack', 'attack']),
      0,
      fixedRandom,
    )

    expect(next.playerBlock).toBe(5)
    expect(next.timeRemainingMs).toBe(2400)
  })

  it('arms Time Scale for 300 ms', () => {
    const next = playCard(
      stateWithHand(['timeScale', 'attack', 'attack', 'attack', 'attack']),
      0,
      fixedRandom,
    )

    expect(next.timeScaleArmed).toBe(true)
    expect(next.timeRemainingMs).toBe(2700)
  })

  it('halves exactly one subsequent non-Time-Scale card', () => {
    const scaled = playCard(
      stateWithHand(['attack', 'attack', 'defend', 'defend', 'defend'], {
        timeScaleArmed: true,
      }),
      0,
      fixedRandom,
    )
    const normal = playCard(scaled, 0, fixedRandom)

    expect(scaled.timeRemainingMs).toBe(2550)
    expect(scaled.timeScaleArmed).toBe(false)
    expect(normal.timeRemainingMs).toBe(1650)
  })
})

describe('automatic Boss resolution', () => {
  it('resolves an overrun card before the Boss attacks', () => {
    const next = playCard(
      stateWithHand(['attack', 'defend', 'defend', 'defend', 'defend'], {
        timeRemainingMs: 500,
      }),
      0,
      fixedRandom,
    )

    expect(next.bossHp).toBe(56)
    expect(next.playerHp).toBe(40)
    expect(next.round).toBe(2)
    expect(next.timeRemainingMs).toBe(3000)
    expect(next.hand).toHaveLength(5)
  })

  it('attacks automatically when the played card empties the hand', () => {
    const next = playCard(
      stateWithHand(['attack'], { timeRemainingMs: 3000 }),
      0,
      fixedRandom,
    )

    expect(next.bossHp).toBe(56)
    expect(next.playerHp).toBe(40)
    expect(next.round).toBe(2)
  })

  it('lets block absorb damage and clears block afterward', () => {
    const next = playCard(
      stateWithHand(['attack'], {
        playerBlock: 5,
        timeRemainingMs: 500,
      }),
      0,
      fixedRandom,
    )

    expect(next.playerHp).toBe(45)
    expect(next.playerBlock).toBe(0)
  })

  it('does not counterattack after a lethal card', () => {
    const next = playCard(
      stateWithHand(['attack'], { bossHp: 8, timeRemainingMs: 500 }),
      0,
      fixedRandom,
    )

    expect(next.bossHp).toBe(0)
    expect(next.playerHp).toBe(50)
    expect(next.phase).toBe('victory')
    expect(next.round).toBe(1)
  })

  it('locks play after the player is defeated', () => {
    const defeated = playCard(
      stateWithHand(['attack'], { playerHp: 5, timeRemainingMs: 500 }),
      0,
      fixedRandom,
    )
    const afterClick = playCard(defeated, 0, fixedRandom)

    expect(defeated.playerHp).toBe(0)
    expect(defeated.phase).toBe('defeat')
    expect(afterClick).toBe(defeated)
  })
})

describe('deck lifecycle', () => {
  it('reshuffles the discard pile when the draw pile is exhausted', () => {
    const state = stateWithHand([], {
      drawPile: [],
      discardPile: ['attack', 'attack', 'defend', 'defend', 'timeScale'],
    })

    const next = drawCards(state, 5, fixedRandom)

    expect(next.hand).toHaveLength(5)
    expect(next.drawPile).toHaveLength(0)
    expect(next.discardPile).toHaveLength(0)
  })

  it('restart restores all approved initial values', () => {
    const state = restartBattle(fixedRandom)

    expect(state.playerHp).toBe(50)
    expect(state.playerBlock).toBe(0)
    expect(state.bossHp).toBe(64)
    expect(state.timeRemainingMs).toBe(3000)
    expect(state.hand).toHaveLength(5)
    expect(state.round).toBe(1)
    expect(state.phase).toBe('playing')
  })
})

describe('balance baseline', () => {
  it('wins in 3–4 rounds with about 5 health lost under a fixed attack-first strategy', () => {
    let state = createInitialBattle(fixedRandom)

    for (let playCount = 0; playCount < 30 && state.phase === 'playing'; playCount += 1) {
      const attackIndex = state.hand.indexOf('attack')
      const scaleIndex = state.hand.indexOf('timeScale')
      const cardIndex =
        scaleIndex >= 0 && !state.timeScaleArmed
          ? scaleIndex
          : attackIndex >= 0
            ? attackIndex
            : 0
      state = playCard(state, cardIndex, fixedRandom)
    }

    expect(state.phase).toBe('victory')
    expect(state.round).toBeGreaterThanOrEqual(3)
    expect(state.round).toBeLessThanOrEqual(4)
    expect(state.playerHp).toBe(45)
  })
})
