export default class Food {
  element: HTMLElement

  constructor () {
    this.element = document.getElementById('food')!
  }

  get x () {
    return this.element.offsetLeft
  }

  get y () {
    return this.element.offsetTop
  }

  change () {
    this.element.style.left = Math.round(Math.random() * 29) * 10 + 'px'
    this.element.style.top = Math.round(Math.random() * 29) * 10 + 'px'
  }
}
