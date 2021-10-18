export default class Panel {
  score: number = 0
  level: number = 1
  maxLevel: number
  upScore: number
  scoreEle: HTMLElement
  levelEle: HTMLElement

  constructor (maxLevel: number = 9, upScore: number = 10) {
    this.maxLevel = maxLevel
    this.upScore = upScore
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
  }

  addScore () {
    this.scoreEle.textContent = ++this.score + ''
    this.score % this.upScore === 0 && this.levelup()
  }

  levelup () {
    this.level < this.maxLevel && (this.levelEle.textContent = ++this.level + '')
  }
}
