import * as PIXI from 'pixi.js'
import gasp, { PixiPlugin, Power0 } from 'gsap/all'

// 注册插件
gasp.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const app = new PIXI.Application({ 
  width: window.innerWidth,
  height: window.innerHeight,
  autoDensity: true,
  autoResize: true,
  resolution: window.devicePixelRatio
})
document.body.appendChild(app.view)

window.addEventListener('resize', () => {
  console.log('resize...')
  app.renderer.resize(window.innerWidth, window.innerHeight)
})

// TODO:用独显测试 100000 
for (let i = 0; i < 10000; i++) {
  let x = ~~(window.innerWidth * Math.random())
  let y = ~~(window.innerHeight * Math.random())
  let colors = [0xFF9900, 0x0099ff, 0xffff00]

  const graphics = new PIXI.Graphics()
  graphics.x = x
  graphics.y = y
  
  // 正方形
  graphics.beginFill(colors[ i % colors.length])
  graphics.drawRect(0, 0, 100, 100)
  graphics.alpha = 0
  graphics.endFill()
  
  app.stage.addChild(graphics)
  
  gasp.timeline({
    repeat: -1,
    delay: Math.random() * 5
  })
  .to(graphics, 2, {
    pixi: { rotation: 180, alpha: 1},
    ease: Power0.easeNone,
  })
  .to(graphics, 2, {
    pixi: { rotation: 360, alpha: 0},
    ease: Power0.easeNone,
  })
}
