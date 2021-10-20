export default class Snake {
  element: HTMLElement
  head: HTMLElement
  headAndBody: HTMLCollection
  isLive: boolean = true
  bodyArr: number[] = []

  constructor () {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div')!
    this.headAndBody = this.element.getElementsByTagName('div')
  }

  get x () {
    return this.head.offsetLeft
  }

  set x (value: number) {
    if (this.x === value) {
      return
    }
    if (this.bodyArr[0] && (this.headAndBody[this.bodyArr[0]] as HTMLElement).offsetLeft === value) {
      value = value > this.x ? this.x - 10 : this.x + 10
    }
    // 判断是否撞墙或撞身体
    if (value < 0 || value > 290 || this.isOnSnake(value, this.y, false)) {
      this.isLive = false
      return
    }
    this.moveBody()
    this.head.style.left = value + 'px'
  }

  get y () {
    return this.head.offsetTop
  }

  set y (value: number) {
    if (this.y === value) {
      return
    }
    if (this.bodyArr[0] && (this.headAndBody[this.bodyArr[0]] as HTMLElement).offsetTop === value) {
      value = value > this.y ? this.y - 10 : this.y + 10
    }
    // 判断是否撞墙或撞身体
    if (value < 0 || value > 290 || this.isOnSnake(this.x, value, false)) {
      this.isLive = false
      return
    }
    this.moveBody()
    this.head.style.top = value + 'px'
  }

  addBody () {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
    if (this.bodyArr.length < 1) {
      this.bodyArr.push(1)
    } else {
      this.bodyArr.push(this.headAndBody.length - 1)
    }
  }

  moveBody () {
    const length = this.bodyArr.length
    if (length < 1) {
      return
    }

    const moveIndex = this.bodyArr.pop()!
    this.bodyArr.unshift(moveIndex)
    const last = this.headAndBody[moveIndex] as HTMLElement
    last.style.left = this.x + 'px'
    last.style.top = this.y + 'px'
  }

  move (x: number, y: number, eaten: boolean = false) {
    if (eaten) {
      this.addBody()
    }
    this.x = x
    this.y = y
  }

  isOnSnake (x: number, y: number, includeHead: boolean = true) {
    return Array.from(this.headAndBody).some((ele, index) => {
      if (index === 0 && !includeHead) {
        return false
      } else {
        return (ele as HTMLElement).offsetLeft === x && (ele as HTMLElement).offsetTop === y
      }
    })
  }

  reset () {
    Array.from(this.headAndBody).filter(ele => ele !== this.head).forEach(ele => ele.remove())
    this.isLive = true
    this.bodyArr = []
    this.x = Math.round(Math.random() * 29) * 10
    this.y = Math.round(Math.random() * 29) * 10
  }
}
