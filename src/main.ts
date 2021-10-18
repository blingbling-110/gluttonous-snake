import './main.scss'

class Food {
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

// TODO 测试代码
const food = new Food()
console.log(food.x, food.y)
food.change()
console.log(food.x, food.y)
// END 测试代码
