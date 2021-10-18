export default class Snake {
  element: HTMLElement
  head: HTMLElement
  body: HTMLCollection
  isLive: boolean = true

  constructor () {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.body = this.element.getElementsByTagName('div')
    this.x = Math.round(Math.random() * 29) * 10
    this.y = Math.round(Math.random() * 29) * 10
  }

  get x () {
    return this.head.offsetLeft
  }

  set x (value: number) {
    switch (true) {
      case this.x === value:
        break
      case value < 0 || value > 290:
        this.isLive = false
        break
      default:
        this.head.style.left = value + 'px'
    }
  }

  get y () {
    return this.head.offsetTop
  }

  set y (value: number) {
    switch (true) {
      case this.y === value:
        break
      case value < 0 || value > 290:
        this.isLive = false
        break
      default:
        this.head.style.top = value + 'px'
    }
  }

  addBody () {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }
}
