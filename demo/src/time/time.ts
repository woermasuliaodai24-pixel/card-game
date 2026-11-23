export function cardDurationMs(baseMs: number, discounted: boolean): number {
  return discounted ? Math.round(baseMs / 2) : baseMs
}
