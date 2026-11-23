export type CardKind = 'attack' | 'defend' | 'timeScale'

export type BattlePhase = 'playing' | 'victory' | 'defeat'

export type RandomSource = () => number

export interface BattleState {
  playerHp: number
  playerBlock: number
  bossHp: number
  timeRemainingMs: number
  drawPile: CardKind[]
  hand: CardKind[]
  discardPile: CardKind[]
  timeScaleArmed: boolean
  phase: BattlePhase
  message: string
  round: number
}
