// 旋转示例
// 单个元素在中心旋转

import * as PIXI from 'pixi.js'
import logo from 'url:/assets/img/bunny.png'

const app = new PIXI.Application({ transparent: true })

// 追加画布到页面
document.body.appendChild(app.view)

app.loader.add('bunny', logo)
  .load((loader, resources) => {
    // 创建图像纹理
    const bunny = new PIXI.Sprite(resources.bunny.texture)

    // 定位图像
    bunny.x = app.renderer.width /2
    bunny.y = app.renderer.height /2
    // 设置图片的旋转中心为图像的中心
    bunny.anchor.x = 0.5 // x 轴中心
    bunny.anchor.y = 0.5 // y 轴中心

    app.stage.addChild(bunny)

    app.ticker.add((delta) => {
      // 角度每次加 0.01
      bunny.rotation += 0.01 * delta
    })
  })