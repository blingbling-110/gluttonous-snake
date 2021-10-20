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
    this.setScore(this.score + 1)
    this.score % this.upScore === 0 && this.levelup()
  }

  levelup () {
    this.level < this.maxLevel && this.setLevel(this.level + 1)
  }

  setScore (value: number) {
    this.score = value
    this.scoreEle.textContent = value + ''
  }

  setLevel (value: number) {
    this.level = value
    this.levelEle.textContent = value + ''
  }
}
