import Food from './Food/Food'
import Snake from './Snake/Snake'
import Panel from './Panel/Panel'

const DIRECTION: [string, string, string, string][] = [
  ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'],
  ['Up', 'Right', 'Down', 'Left'],
  ['w', 'd', 's', 'a'],
  ['W', 'D', 'S', 'A']
]

export default class GameCtrl {
  snake: Snake
  food: Food
  panel: Panel
  // 控制方向：0上、1右、2下、3左
  direction: number = -1

  constructor () {
    this.snake = new Snake()
    this.food = new Food()
    this.panel = new Panel()
  }

  init () {
    document.addEventListener('keydown', this.keydownCb.bind(this))
    this.runSnake()
  }

  keydownCb (event: KeyboardEvent) {
    DIRECTION.some(tuple => {
      const index = tuple.findIndex(direction => event.key === direction)
      if (index !== -1) {
        this.direction = index
        return true
      } else {
        return false
      }
    })
  }

  runSnake () {
    let x = this.snake.x
    let y = this.snake.y

    switch (this.direction) {
      case 0:
        y -= 10
        break
      case 1:
        x += 10
        break
      case 2:
        y += 10
        break
      case 3:
        x -= 10
        break
    }

    this.snake.x = x
    this.snake.y = y
    this.check(x, y)

    if (this.snake.isLive) {
      setTimeout(this.runSnake.bind(this), 300 - this.panel.level * 30)
    } else {
      alert('Game Over!')
    }
  }

  check (x: number, y: number) {
    if (x === this.food.x && y === this.food.y) {
      this.food.change()
      this.panel.addScore()
      this.snake.addBody()
    }
  }
}
