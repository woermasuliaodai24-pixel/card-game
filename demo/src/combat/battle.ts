import {
  BOSS_ATTACK_DAMAGE,
  BOSS_STARTING_HP,
  CARD_CATALOG,
  HAND_SIZE,
  PLAYER_STARTING_HP,
  ROUND_DURATION_MS,
  createInitialDeck,
} from '../cards/catalog'
import { drawCards, shuffle } from '../deck/deck'
import { cardDurationMs } from '../time/time'
import type { BattleState, RandomSource } from './types'

function resolveBossAttack(
  state: BattleState,
  random: RandomSource,
): BattleState {
  const damageTaken = Math.max(0, BOSS_ATTACK_DAMAGE - state.playerBlock)
  const playerHp = Math.max(0, state.playerHp - damageTaken)
  const discardPile = [...state.discardPile, ...state.hand]
  const afterAttack: BattleState = {
    ...state,
    playerHp,
    playerBlock: 0,
    hand: [],
    discardPile,
    message: `毁灭者造成 ${damageTaken} 点伤害。`,
  }

  if (playerHp === 0) {
    return { ...afterAttack, phase: 'defeat' }
  }

  return drawCards(
    {
      ...afterAttack,
      timeRemainingMs: ROUND_DURATION_MS,
      round: state.round + 1,
    },
    HAND_SIZE,
    random,
  )
}

export function createInitialBattle(
  random: RandomSource = Math.random,
): BattleState {
  const initial: BattleState = {
    playerHp: PLAYER_STARTING_HP,
    playerBlock: 0,
    bossHp: BOSS_STARTING_HP,
    timeRemainingMs: ROUND_DURATION_MS,
    drawPile: shuffle(createInitialDeck(), random),
    hand: [],
    discardPile: [],
    timeScaleArmed: false,
    phase: 'playing',
    message: '时间开始流动。选择一张牌。',
    round: 1,
  }

  return drawCards(initial, HAND_SIZE, random)
}

export function playCard(
  state: BattleState,
  handIndex: number,
  random: RandomSource = Math.random,
): BattleState {
  if (
    state.phase !== 'playing' ||
    !Number.isInteger(handIndex) ||
    handIndex < 0 ||
    handIndex >= state.hand.length
  ) {
    return state
  }

  const kind = state.hand[handIndex]
  const definition = CARD_CATALOG[kind]
  const discounted = state.timeScaleArmed && kind !== 'timeScale'
  const durationMs = cardDurationMs(definition.durationMs, discounted)
  const hand = state.hand.filter((_, index) => index !== handIndex)

  let next: BattleState = {
    ...state,
    hand,
    discardPile: [...state.discardPile, kind],
    timeRemainingMs: Math.max(0, state.timeRemainingMs - durationMs),
    timeScaleArmed: kind === 'timeScale' ? true : false,
  }

  if (kind === 'attack') {
    next = {
      ...next,
      bossHp: Math.max(0, next.bossHp - (definition.damage ?? 0)),
      message: `攻击造成 ${definition.damage ?? 0} 点伤害。`,
    }
  } else if (kind === 'defend') {
    next = {
      ...next,
      playerBlock: next.playerBlock + (definition.block ?? 0),
      message: `获得 ${definition.block ?? 0} 点格挡。`,
    }
  } else {
    next = { ...next, message: '时间缩放已生效。' }
  }

  if (next.bossHp === 0) {
    return { ...next, phase: 'victory', message: '毁灭者已被击败。' }
  }

  if (next.timeRemainingMs === 0 || next.hand.length === 0) {
    return resolveBossAttack(next, random)
  }

  return next
}

export function restartBattle(random: RandomSource = Math.random): BattleState {
  return createInitialBattle(random)
}
