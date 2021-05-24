namespace SpriteKind {
    export const tir_ami = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    tir_joueur = sprites.createProjectileFromSprite(img`
        . . . 
        . 2 . 
        . 2 . 
        . 2 . 
        . 2 . 
        . . . 
        `, vaisseau, 0, -100)
    tir_joueur.setKind(SpriteKind.tir_ami)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy(effects.confetti, 100)
})
sprites.onOverlap(SpriteKind.tir_ami, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -34
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    pause(100)
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -34
    otherSprite.destroy()
})
let ennemi_a: Sprite = null
let statusbar2: StatusBarSprite = null
let ennemi_b: Sprite = null
let tir_joueur: Sprite = null
let statusbar: StatusBarSprite = null
let vaisseau: Sprite = null
effects.starField.startScreenEffect()
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
statusbar = statusbars.create(12, 3, StatusBarKind.Energy)
statusbar.attachToSprite(vaisseau, -18, 0)
game.onUpdateInterval(5000, function () {
    ennemi_b = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 1 . . . . 1 . . . . . 
        . . . . . d d d d d d . . . . . 
        . . . . . d . 9 9 . d . . . . . 
        . . . . . d . . . . d . . . . . 
        . . . . . 2 . . . . 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 5)
    ennemi_b.x = randint(5, 155)
    ennemi_b.setKind(SpriteKind.Enemy)
    statusbar2 = statusbars.create(10, 2, StatusBarKind.EnemyHealth)
    statusbar2.attachToSprite(ennemi_b, -2, 0)
})
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
game.onUpdateInterval(1000, function () {
    statusbar.value += 1
})
