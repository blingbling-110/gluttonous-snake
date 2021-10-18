// 引入SCSS
import './main.scss'
import './components/Food/food.scss'
import './components/Panel/panel.scss'
import './components/Snake/snake.scss'

import GameCtrl from './components/GameCtrl'

const gameCtrl = new GameCtrl()
gameCtrl.init()
