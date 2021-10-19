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
    this.draw()
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

  draw () {
    let x = this.snake.x
    let y = this.snake.y

    // 判断移动方向
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

    // 判断是否吃到食物
    const eaten: boolean = x === this.food.x && y === this.food.y
    if (eaten) {
      do {
        this.food.change()
      } while (this.snake.isOnSnake(this.food.x, this.food.y))
      this.panel.addScore()
    }
    this.snake.move(x, y, eaten)

    // 判断蛇的生死
    if (this.snake.isLive) {
      // 继续绘制下一帧
      setTimeout(this.draw.bind(this), 300 - this.panel.level * 30)
    } else {
      // 游戏结束
      alert('游戏结束！')
    }
  }
}
