import * as PIXI from 'pixi.js'
import gasp, { TweenMax, TimelineLite, PixiPlugin, Power0 } from 'gsap/all'

// 注册插件
gasp.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const app = new PIXI.Application({ 
  autoDensity: true,
  resolution: window.devicePixelRatio
})
document.body.appendChild(app.view)

let x = app.renderer.width / (window.devicePixelRatio * 2)
let y = app.renderer.height / (window.devicePixelRatio * 2)

const graphics = new PIXI.Graphics()
graphics.x = x
graphics.y = y

// 正方形
graphics.beginFill(0xFF9900)
graphics.drawRect(0, 0, 100, 100)
graphics.endFill()

app.stage.addChild(graphics)

console.log(graphics)

function tick() {
  graphics.rotation = 0
  // TweenMax.to(graphics, 1, {
  //   pixi: { rotation: 180, alpha: 0},
  //   ease: Power0.easeNone,
  //   // repeat: -1,
  //   onComplete: () => {
  //     TweenMax.to(graphics, 1, {
  //       pixi: { rotation: 360, alpha: 1},
  //       ease: Power0.easeNone,
  //       // repeat: -1,
  //       onComplete: tick
  //     })
  //   }
  // })

  let tl = new TimelineLite()
  tl.to(graphics, 1, {
    pixi: { rotation: 180, alpha: 0},
    ease: Power0.easeNone,
  }).to(graphics, 1, {
    pixi: { rotation: 360, alpha: 1},
    ease: Power0.easeNone,
  })
}

tick()

// TweenMax.to(graphics, 1, {
//   x: 100,
//   delay: 3
// })