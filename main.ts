namespace SpriteKind {
    export const tir_ami = SpriteKind.create()
    export const ennemi_vivant = SpriteKind.create()
    export const projectil_de_la_mort = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.tir_ami, SpriteKind.ennemi_vivant, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -34
})
sprites.onOverlap(SpriteKind.projectil_de_la_mort, SpriteKind.ennemi_vivant, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -200
})
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
    magie.value += 17
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (magie.value == 100) {
        projectile_de_la_mort_ami = sprites.createProjectileFromSprite(img`
            . . 4 4 . . 
            . 4 2 2 4 . 
            4 2 5 5 2 4 
            4 2 5 5 2 4 
            . 4 2 2 4 . 
            . . 4 4 . . 
            `, vaisseau, 0, -200)
        projectile_de_la_mort_ami.startEffect(effects.fire)
        projectile_de_la_mort_ami.setKind(SpriteKind.projectil_de_la_mort)
        magie.value += -100
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ennemi_vivant, function (sprite, otherSprite) {
    statusbar.value += -34
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    pause(100)
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -34
    otherSprite.destroy()
})
let projectile_ennemi: Sprite = null
let statusbar2: StatusBarSprite = null
let ennemi_b: Sprite = null
let ennemi_a: Sprite = null
let projectile_de_la_mort_ami: Sprite = null
let tir_joueur: Sprite = null
let magie: StatusBarSprite = null
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
magie = statusbars.create(25, 4, StatusBarKind.Magic)
magie.setPosition(16, 6)
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
    ennemi_b.setKind(SpriteKind.ennemi_vivant)
    statusbar2 = statusbars.create(8, 1, StatusBarKind.EnemyHealth)
    statusbar2.attachToSprite(ennemi_b, -2, 0)
})
game.onUpdateInterval(500, function () {
    for (let valeur of sprites.allOfKind(SpriteKind.ennemi_vivant)) {
        if (Math.percentChance(50)) {
            projectile_ennemi = sprites.createProjectileFromSprite(img`
                . . . 
                . 2 . 
                . 2 . 
                . 2 . 
                . 2 . 
                . . . 
                `, valeur, 0, 70)
        }
    }
})
game.onUpdateInterval(10000, function () {
    statusbar.value += 10
})
