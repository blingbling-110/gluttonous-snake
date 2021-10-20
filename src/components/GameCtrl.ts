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
    document.addEventListener('keydown', this.keyDownCb.bind(this))
    document.addEventListener('touchstart', this.touchStartCb.bind(this))
    this.reset()
  }

  keyDownCb (event: KeyboardEvent) {
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

  touchStartCb (event: TouchEvent) {
    const touch = event.touches[0]
    const touchX = touch.clientX
    const touchY = touch.clientY
    const {
      x,
      y
    } = this.snake.head.getBoundingClientRect()
    const headX = x + 5
    const headY = y + 5
    const iconWrapper = document.querySelector('#main .icon-wrapper')!
    const touchEle = document.elementFromPoint(touchX, touchY)

    if (iconWrapper.contains(touchEle)) {
      // 拦截图标上的事件
      return
    }

    // 计算斜率来判断该开始向哪个方向移动
    if (touchX !== headX) {
      const k = Math.abs((touchY - headY) / (touchX - headX))
      if (k > 1 && touchY < headY) {
        // 开始向上移动
        this.direction = 0
      } else if (k > 1 && touchY > headY) {
        // 开始向下移动
        this.direction = 2
      } else if (k < 1 && touchX < headX) {
        // 开始向左移动
        this.direction = 3
      } else if (k < 1 && touchX > headX) {
        // 开始向右移动
        this.direction = 1
      }
    } else {
      // 斜率无穷大
      if (touchY < headY) {
        this.direction = 0
      } else if (touchY > headY) {
        this.direction = 2
      }
    }
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
    const eaten = x === this.food.x && y === this.food.y
    if (eaten) {
      this.changeFood()
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
      this.reset()
    }
  }

  changeFood () {
    do {
      this.food.change()
    } while (this.snake.isOnSnake(this.food.x, this.food.y))
  }

  reset () {
    this.snake.reset()
    this.direction = -1
    this.changeFood()
    this.panel.setScore(0)
    this.panel.setLevel(1)
    this.draw()
  }
}
