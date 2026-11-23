import type { CardKind } from '../combat/types'

export interface CardDefinition {
  kind: CardKind
  name: string
  durationMs: number
  damage?: number
  block?: number
  description: string
}

export const PLAYER_STARTING_HP = 50
export const BOSS_STARTING_HP = 64
export const BOSS_ATTACK_DAMAGE = 10
export const ROUND_DURATION_MS = 3000
export const HAND_SIZE = 5

export const CARD_CATALOG: Record<CardKind, CardDefinition> = {
  attack: {
    kind: 'attack',
    name: '攻击',
    durationMs: 900,
    damage: 8,
    description: '对毁灭者造成 8 点伤害',
  },
  defend: {
    kind: 'defend',
    name: '防御',
    durationMs: 600,
    block: 5,
    description: '获得 5 点格挡',
  },
  timeScale: {
    kind: 'timeScale',
    name: '时间缩放',
    durationMs: 300,
    description: '下一张非时间缩放牌耗时减半',
  },
}

export const INITIAL_CARD_COUNTS: Readonly<Record<CardKind, number>> = {
  attack: 5,
  defend: 4,
  timeScale: 1,
}

export function createInitialDeck(): CardKind[] {
  return (Object.entries(INITIAL_CARD_COUNTS) as [CardKind, number][]).flatMap(
    ([kind, count]) => Array<CardKind>(count).fill(kind),
  )
}
