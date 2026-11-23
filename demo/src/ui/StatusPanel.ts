import Phaser from 'phaser'

import { PLAYER_STARTING_HP, ROUND_DURATION_MS } from '../cards/catalog'
import type { BattleState } from '../combat/types'

export class StatusPanel {
  private readonly playerText: Phaser.GameObjects.Text
  private readonly deckText: Phaser.GameObjects.Text
  private readonly roundText: Phaser.GameObjects.Text
  private readonly messageText: Phaser.GameObjects.Text
  private readonly scaleText: Phaser.GameObjects.Text
  private readonly timeGraphics: Phaser.GameObjects.Graphics
  private readonly timeLabel: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene) {
    const common = {
      fontFamily: 'Microsoft YaHei, sans-serif',
      color: '#eaf5ff',
    }

    this.playerText = scene.add.text(42, 358, '', { ...common, fontSize: '22px', fontStyle: 'bold' })
    this.deckText = scene.add.text(1238, 358, '', { ...common, fontSize: '18px', align: 'right' }).setOrigin(1, 0)
    this.roundText = scene.add.text(42, 44, '', { ...common, fontSize: '18px', color: '#8fb7d5' })
    this.messageText = scene.add
      .text(640, 392, '', { ...common, fontSize: '19px', color: '#f7e8ba', align: 'center' })
      .setOrigin(0.5)
    this.scaleText = scene.add
      .text(1080, 405, '', { ...common, fontSize: '17px', color: '#d8b7ff' })
      .setOrigin(0.5)
    this.timeGraphics = scene.add.graphics()
    this.timeLabel = scene.add
      .text(640, 361, '', { ...common, fontSize: '19px', fontStyle: 'bold' })
      .setOrigin(0.5)
  }

  update(state: BattleState): void {
    this.playerText.setText(`玩家  HP ${state.playerHp}/${PLAYER_STARTING_HP}   格挡 ${state.playerBlock}`)
    this.deckText.setText(`抽牌堆 ${state.drawPile.length}   弃牌堆 ${state.discardPile.length}`)
    this.roundText.setText(`第 ${state.round} 轮`)
    this.messageText.setText(state.message)
    this.scaleText.setText(state.timeScaleArmed ? '◈ 时间缩放：下一张牌耗时减半' : '')
    this.timeLabel.setText(`剩余 ${(state.timeRemainingMs / 1000).toFixed(1)} 秒`)

    const ratio = Phaser.Math.Clamp(state.timeRemainingMs / ROUND_DURATION_MS, 0, 1)
    this.timeGraphics.clear()
    this.timeGraphics.fillStyle(0x020711, 0.9)
    this.timeGraphics.fillRoundedRect(390, 338, 500, 15, 7)
    this.timeGraphics.fillStyle(ratio < 0.25 ? 0xff6a57 : 0x63d9f4, 1)
    this.timeGraphics.fillRoundedRect(393, 341, 494 * ratio, 9, 5)
  }
}
