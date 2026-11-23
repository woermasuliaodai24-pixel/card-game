import Phaser from 'phaser'

import { BOSS_ATTACK_DAMAGE, BOSS_STARTING_HP } from '../cards/catalog'
import { createInitialBattle, playCard, restartBattle } from '../combat/battle'
import type { BattleState } from '../combat/types'
import { CardView } from '../ui/CardView'
import { StatusPanel } from '../ui/StatusPanel'

const BOSS_ART_URL = new URL(
  '../../../assets/concepts/bosses/boss-destroyer.png',
  import.meta.url,
).href

export class BattleScene extends Phaser.Scene {
  private battle = createInitialBattle()
  private statusPanel!: StatusPanel
  private bossHpText!: Phaser.GameObjects.Text
  private cardViews: CardView[] = []
  private restartButton?: Phaser.GameObjects.Text
  private resultText?: Phaser.GameObjects.Text
  private inputLocked = false

  constructor() {
    super('BattleScene')
  }

  preload(): void {
    this.load.image('boss-destroyer', BOSS_ART_URL)
  }

  create(): void {
    this.drawBackdrop()
    this.drawBoss()
    this.statusPanel = new StatusPanel(this)
    this.renderBattle()
  }

  private drawBackdrop(): void {
    const background = this.add.graphics()
    background.fillStyle(0x071426, 1)
    background.fillRect(0, 0, 1280, 720)
    background.fillStyle(0x102c47, 0.55)
    background.fillCircle(640, 170, 330)
    background.fillStyle(0x6b2433, 0.12)
    background.fillCircle(640, 130, 205)
    background.lineStyle(1, 0x75cbe0, 0.16)
    for (let x = 40; x < 1280; x += 80) background.lineBetween(x, 0, x, 720)
  }

  private drawBoss(): void {
    if (this.textures.exists('boss-destroyer')) {
      this.add.image(640, 170, 'boss-destroyer').setDisplaySize(470, 300).setCrop(170, 0, 1196, 900)
    } else {
      const silhouette = this.add.graphics()
      silhouette.fillStyle(0x0c0814, 0.96)
      silhouette.fillCircle(640, 162, 94)
      silhouette.fillTriangle(546, 152, 468, 75, 582, 118)
      silhouette.fillTriangle(734, 152, 812, 75, 698, 118)
      silhouette.fillStyle(0xff4d32, 1)
      silhouette.fillCircle(612, 151, 8)
      silhouette.fillCircle(668, 151, 8)
    }

    this.add
      .text(640, 24, '毁灭者', {
        fontFamily: 'Microsoft YaHei, sans-serif',
        fontSize: '31px',
        fontStyle: 'bold',
        color: '#ffd6c8',
      })
      .setOrigin(0.5)
    this.bossHpText = this.add
      .text(640, 294, '', {
        fontFamily: 'Microsoft YaHei, sans-serif',
        fontSize: '22px',
        color: '#ffb0a3',
        backgroundColor: '#190c15cc',
        padding: { x: 14, y: 6 },
      })
      .setOrigin(0.5)
    this.add
      .text(850, 86, `意图：造成 ${BOSS_ATTACK_DAMAGE} 点伤害`, {
        fontFamily: 'Microsoft YaHei, sans-serif',
        fontSize: '18px',
        color: '#ffb59f',
      })
      .setOrigin(0.5)
  }

  private renderBattle(): void {
    this.statusPanel.update(this.battle)
    this.bossHpText.setText(`HP ${this.battle.bossHp}/${BOSS_STARTING_HP}`)
    this.cardViews.forEach((card) => card.destroy())
    this.cardViews = []

    this.battle.hand.forEach((kind, index) => {
      const discounted = this.battle.timeScaleArmed && kind !== 'timeScale'
      const x = 202 + index * 219
      const card = new CardView(this, x, 570, kind, discounted, () => this.handleCard(index))
      if (this.battle.phase !== 'playing') card.disableInteractive()
      this.cardViews.push(card)
    })

    this.renderTerminalState()
  }

  private handleCard(handIndex: number): void {
    if (this.inputLocked || this.battle.phase !== 'playing') return
    this.inputLocked = true
    this.cardViews.forEach((card) => {
      if (card.input) card.input.enabled = false
    })
    this.battle = playCard(this.battle, handIndex)
    this.renderBattle()
    this.time.delayedCall(90, () => {
      this.inputLocked = false
      if (this.battle.phase === 'playing') {
        this.cardViews.forEach((card) => {
          if (card.input) card.input.enabled = true
        })
      }
    })
  }

  private renderTerminalState(): void {
    this.restartButton?.destroy()
    this.resultText?.destroy()
    this.restartButton = undefined
    this.resultText = undefined

    if (this.battle.phase === 'playing') return

    const victory = this.battle.phase === 'victory'
    this.resultText = this.add
      .text(640, 378, victory ? '时间线稳定 · 胜利' : '时间线崩塌 · 失败', {
        fontFamily: 'Microsoft YaHei, sans-serif',
        fontSize: '34px',
        fontStyle: 'bold',
        color: victory ? '#9ff5d4' : '#ff9a8c',
        backgroundColor: '#020711e8',
        padding: { x: 28, y: 12 },
      })
      .setOrigin(0.5)

    this.restartButton = this.add
      .text(640, 442, '重新开始', {
        fontFamily: 'Microsoft YaHei, sans-serif',
        fontSize: '23px',
        fontStyle: 'bold',
        color: '#071426',
        backgroundColor: '#8ee9ff',
        padding: { x: 22, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.battle = restartBattle()
        this.renderBattle()
      })
  }
}
