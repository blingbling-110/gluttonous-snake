import Food from './components/Food/Food'
import Panel from './components/Panel/Panel'

// 引入SCSS
import './main.scss'
import './components/Food/food.scss'
import './components/Panel/panel.scss'

// TODO 测试代码
const food = new Food()
food.change()
console.log(food.x, food.y)
const panel = new Panel()
Array(110).fill(0).forEach(() => panel.addScore())

// END 测试代码

