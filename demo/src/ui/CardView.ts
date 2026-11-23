import Phaser from 'phaser'

import { CARD_CATALOG } from '../cards/catalog'
import type { CardKind } from '../combat/types'
import { cardDurationMs } from '../time/time'

const CARD_WIDTH = 196
const CARD_HEIGHT = 224

const CARD_COLORS: Record<CardKind, { fill: number; border: number }> = {
  attack: { fill: 0x401b22, border: 0xf06a5f },
  defend: { fill: 0x132f4a, border: 0x64b5df },
  timeScale: { fill: 0x2d2453, border: 0xb797ff },
}

export class CardView extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    kind: CardKind,
    discounted: boolean,
    onPlay: () => void,
  ) {
    super(scene, x, y)
    scene.add.existing(this)

    const definition = CARD_CATALOG[kind]
    const colors = CARD_COLORS[kind]
    const frame = scene.add.graphics()
    frame.fillStyle(0x030914, 0.42)
    frame.fillRoundedRect(-CARD_WIDTH / 2 + 7, -CARD_HEIGHT / 2 + 9, CARD_WIDTH, CARD_HEIGHT, 14)
    frame.fillStyle(colors.fill, 0.98)
    frame.fillRoundedRect(-CARD_WIDTH / 2, -CARD_HEIGHT / 2, CARD_WIDTH, CARD_HEIGHT, 14)
    frame.lineStyle(discounted ? 5 : 3, colors.border, 1)
    frame.strokeRoundedRect(-CARD_WIDTH / 2, -CARD_HEIGHT / 2, CARD_WIDTH, CARD_HEIGHT, 14)

    const title = scene.add
      .text(0, -78, definition.name, {
        fontFamily: 'Microsoft YaHei, sans-serif',
        fontSize: '25px',
        fontStyle: 'bold',
        color: '#fff8dd',
      })
      .setOrigin(0.5)

    const effect = scene.add
      .text(0, -4, definition.description, {
        fontFamily: 'Microsoft YaHei, sans-serif',
        fontSize: '17px',
        color: '#dce9f5',
        align: 'center',
        wordWrap: { width: 160, useAdvancedWrap: true },
        lineSpacing: 6,
      })
      .setOrigin(0.5)

    const duration = cardDurationMs(definition.durationMs, discounted)
    const time = scene.add
      .text(0, 82, `${(duration / 1000).toFixed(duration % 1000 === 0 ? 0 : 2)} 秒`, {
        fontFamily: 'Microsoft YaHei, sans-serif',
        fontSize: '20px',
        fontStyle: 'bold',
        color: discounted ? '#f2d6ff' : '#8ee9ff',
      })
      .setOrigin(0.5)

    const badge = scene.add
      .text(72, -91, kind === 'timeScale' ? '时' : kind === 'attack' ? '攻' : '守', {
        fontFamily: 'Microsoft YaHei, sans-serif',
        fontSize: '15px',
        color: '#08101d',
        backgroundColor: `#${colors.border.toString(16).padStart(6, '0')}`,
        padding: { x: 6, y: 3 },
      })
      .setOrigin(0.5)

    this.add([frame, title, effect, time, badge])
    this.setSize(CARD_WIDTH, CARD_HEIGHT)
    this.setInteractive({ useHandCursor: true })
    this.input!.cursor = 'pointer'
    this.on('pointerover', () => {
      this.setScale(1.035)
      this.setY(y - 8)
    })
    this.on('pointerout', () => {
      this.setScale(1)
      this.setY(y)
    })
    this.on('pointerdown', onPlay)
  }
}
