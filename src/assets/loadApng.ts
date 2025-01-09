import { AnimatedSprite, Application, BufferImageSource, Sprite, Texture } from 'pixi.js';

// Await can only be used inside an async function
async function init()
{
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Load a texture from a URL
    // const png = await fetch('/imgs/sun.png')
    const png = await fetch('/imgs/sun.webp')

    // @ts-ignore
    const imageDecoder = new ImageDecoder({
        type: 'image/webp',
        // type: 'image/png',
        data: png.body
    })

    // Wait for the tracks to be ready
    await imageDecoder.tracks.ready
    // 获取帧数
    const { frameCount } = imageDecoder.tracks.selectedTrack
    // 添加一个集合 用于保存 每一帧的图片
    const frames = []

    for (let i = 0; i < frameCount; i++) {
        let buffer = await imageDecoder.decode({frameIndex: i})

        frames.push(BufferImageSource.from(buffer.image))
    }

    const texture = BufferImageSource.from((await imageDecoder.decode({frameIndex: 1})).image);
    const oneSun = Sprite.from(texture);
    
    oneSun.x = app.screen.width / 2;
    oneSun.y = app.screen.height / 2;
    app.stage.addChild(oneSun);

    // @ts-ignore
    const anim =  AnimatedSprite.fromImages(frames)

    anim.x = app.screen.width / 3
    anim.y = app.screen.height / 2
    anim.animationSpeed = .5
    anim.play()

    app.stage.addChild(anim);
}

// Call that async function
init();
