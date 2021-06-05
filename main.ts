namespace SpriteKind {
    export const tir_ami = SpriteKind.create()
    export const ennemi_vivant = SpriteKind.create()
    export const projectil_de_la_mort = SpriteKind.create()
    export const tir_ennemi = SpriteKind.create()
    export const fruit = SpriteKind.create()
    export const big_boss = SpriteKind.create()
    export const tir_big_boss = SpriteKind.create()
}
namespace StatusBarKind {
    export const big_bosshealt = StatusBarKind.create()
}
statusbars.onZero(StatusBarKind.big_bosshealt, function (status) {
    status.spriteAttachedTo().destroy(effects.confetti, 100)
    magie.value += 40
    xp += 3
})
sprites.onOverlap(SpriteKind.tir_ami, SpriteKind.ennemi_vivant, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -34
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.tir_ennemi, function (sprite, otherSprite) {
    otherSprite.destroy()
    vie.value += -15
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.fruit, function (sprite, otherSprite) {
    otherSprite.destroy()
    energie.value += 40
})
sprites.onOverlap(SpriteKind.projectil_de_la_mort, SpriteKind.ennemi_vivant, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -200
})
sprites.onOverlap(SpriteKind.tir_ami, SpriteKind.big_boss, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.big_bosshealt, otherSprite).value += -12
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (energie.value != 0) {
        tir_joueur = sprites.createProjectileFromSprite(img`
            . . . 
            . 2 . 
            . 2 . 
            . 2 . 
            . 2 . 
            . . . 
            `, vaisseau, 0, -100)
        tir_joueur.setKind(SpriteKind.tir_ami)
        energie.value += -3
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy(effects.confetti, 100)
    magie.value += 17
    xp += 1
})
sprites.onOverlap(SpriteKind.projectil_de_la_mort, SpriteKind.big_boss, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.big_bosshealt, otherSprite).value += -72
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    pause(100)
    game.over(false)
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
    vie.value += -34
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.big_boss, function (sprite, otherSprite) {
    otherSprite.destroy()
    vie.value += -66
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    vie.value += -34
    otherSprite.destroy()
})
let pomme: Sprite = null
let ennemi_a: Sprite = null
let tir_big_boss: Sprite = null
let ennemi_b: Sprite = null
let projectile_ennemi: Sprite = null
let vie_ennemi: StatusBarSprite = null
let ennemi_c: Sprite = null
let projectile_de_la_mort_ami: Sprite = null
let tir_joueur: Sprite = null
let energie: StatusBarSprite = null
let magie: StatusBarSprite = null
let vie: StatusBarSprite = null
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
vie = statusbars.create(12, 3, StatusBarKind.Health)
vie.attachToSprite(vaisseau, -18, 0)
magie = statusbars.create(25, 4, StatusBarKind.Magic)
magie.setPosition(16, 6)
energie = statusbars.create(20, 4, StatusBarKind.Energy)
energie.setPosition(12, 115)
let xp = 0
game.onUpdateInterval(15000, function () {
    if (xp > 4 && xp < 75) {
        ennemi_c = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 6 . . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . 8 8 8 . . . . . . . 
            . . . . . 8 8 8 8 8 . . . . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . . . 9 8 8 8 8 8 9 . . . . . 
            . . . . 9 . 8 8 8 . 9 . . . . . 
            . . . . 2 . . 2 . . 2 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0, 5)
        ennemi_c.x = randint(5, 155)
        ennemi_c.setKind(SpriteKind.big_boss)
        vie_ennemi = statusbars.create(10, 1, StatusBarKind.big_bosshealt)
        vie_ennemi.attachToSprite(ennemi_c, -2, 0)
    }
})
game.onUpdateInterval(2000, function () {
    if (energie.value == 0) {
        vie.value += -4
    }
    if (energie.value > 50) {
        vie.value += 2
    }
    if (energie.value == 100) {
        vie.value += 4
    }
})
game.onUpdateInterval(1000, function () {
    for (let xp of sprites.allOfKind(SpriteKind.ennemi_vivant)) {
        if (Math.percentChance(50)) {
            projectile_ennemi = sprites.createProjectileFromSprite(img`
                . . . 
                . 2 . 
                . 2 . 
                . 2 . 
                . 2 . 
                . . . 
                `, ennemi_b, 0, 60)
            projectile_ennemi.setKind(SpriteKind.tir_ennemi)
        }
    }
})
game.onUpdateInterval(1000, function () {
    for (let ennemi_c of sprites.allOfKind(SpriteKind.big_boss)) {
        if (Math.percentChance(60)) {
            tir_big_boss = sprites.createProjectileFromSprite(img`
                . . . 
                . 2 . 
                . 2 . 
                . 2 . 
                . 2 . 
                . . . 
                `, ennemi_c, 0, 55)
            tir_big_boss.setKind(SpriteKind.tir_ennemi)
            if (Math.percentChance(50)) {
                tir_big_boss.x += 2
            }
            if (Math.percentChance(50)) {
                tir_big_boss.x += -2
            }
        }
    }
})
game.onUpdateInterval(6000, function () {
    if (xp < 75) {
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
        vie_ennemi = statusbars.create(8, 1, StatusBarKind.EnemyHealth)
        vie_ennemi.attachToSprite(ennemi_b, -2, 0)
    }
})
game.onUpdateInterval(10000, function () {
    pomme = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . 7 . . . . . . 
        . . . . . . . 7 . . . . . . . 
        . . . . . . 2 2 2 . . . . . . 
        . . . . . 2 2 1 2 2 . . . . . 
        . . . . . 2 2 2 1 2 . . . . . 
        . . . . . 2 2 2 2 2 . . . . . 
        . . . . . . 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `, 0, 60)
    pomme.x = randint(5, 155)
    pomme.setKind(SpriteKind.fruit)
})
