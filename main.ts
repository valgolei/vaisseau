controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . 
        . 2 . 
        . 2 . 
        . 2 . 
        . 2 . 
        . . . 
        `, vaisseau, 0, -100)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    pause(100)
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -34
    otherSprite.destroy()
})
let ennemi_b: Sprite = null
let ennemi_a: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let vaisseau: Sprite = null
vaisseau = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 2 . . . . 2 . . . . . 
    . . . . 2 5 2 . . 2 5 2 . . . . 
    . . . . . 7 . . . . 7 . . . . . 
    . . . . . 7 . . . . 7 . . . . . 
    . . . . . 7 . . . . 7 . . . . . 
    . . . . f 9 9 f f 9 9 f . . . . 
    . . . . f 9 9 f f 9 9 f . . . . 
    . . . . f 9 9 f f 9 9 f . . . . 
    . . . . f f f f f f f f . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(vaisseau)
vaisseau.setStayInScreen(true)
statusbar = statusbars.create(15, 4, StatusBarKind.Energy)
statusbar.attachToSprite(vaisseau, -20, 0)
game.onUpdateInterval(5000, function () {
    ennemi_a = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . 2 . f . . . . . . . . 
        . . . . . 2 f 9 f 2 . . . . . . 
        . . . . . . . f . 2 . . . . . . 
        . . . . . . 2 2 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 74)
    ennemi_a.x = randint(5, 155)
    ennemi_a.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(5000, function () {
    ennemi_b = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . 9 . f . 9 . . . . . . 
        . . . . . 9 . . . 9 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 2)
    ennemi_b.x = randint(5, 155)
    ennemi_b.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(1000, function () {
    statusbar.value += 1
})
