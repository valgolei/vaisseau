namespace SpriteKind {
    export const tir_ami = SpriteKind.create()
    export const ennemi_vivant = SpriteKind.create()
    export const projectil_de_la_mort = SpriteKind.create()
    export const tir_ennemi = SpriteKind.create()
    export const fruit = SpriteKind.create()
    export const big_boss = SpriteKind.create()
    export const tir_big_boss = SpriteKind.create()
    export const tirreur_de_direction = SpriteKind.create()
    export const BOSS = SpriteKind.create()
}
namespace StatusBarKind {
    export const big_bosshealt = StatusBarKind.create()
    export const t_d_vie = StatusBarKind.create()
    export const BOSSHEALT = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.tir_ami, SpriteKind.BOSS, function (sprite, otherSprite) {
    music.smallCrash.play()
    sprite.destroy()
    Vie_boss.value += -1
})
statusbars.onZero(StatusBarKind.big_bosshealt, function (status) {
    status.spriteAttachedTo().destroy()
    magie.value += 40
    info.changeScoreBy(3)
})
sprites.onDestroyed(SpriteKind.BOSS, function (sprite) {
    game.over(true)
})
sprites.onOverlap(SpriteKind.tir_ami, SpriteKind.ennemi_vivant, function (sprite, otherSprite) {
    music.smallCrash.play()
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -50
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BOSS, function (sprite, otherSprite) {
    vie.value += -1
})
statusbars.onZero(StatusBarKind.BOSSHEALT, function (status) {
    BOSS2.startEffect(effects.spray)
    BOSS2.startEffect(effects.fire)
    BOSS2.startEffect(effects.halo)
    BOSS2.destroy(effects.spray, 2000)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.tir_ennemi, function (sprite, otherSprite) {
    otherSprite.destroy()
    vie.value += -15
    music.smallCrash.play()
})
function Difficilté (difficulté: string) {
    if (difficulté == "facile") {
        vie = statusbars.create(12, 4, StatusBarKind.Health)
        vie.max = 150
        vie.value = 150
        challenge = 0.8
    } else if (difficulté == "difficile") {
        vie = statusbars.create(12, 2, StatusBarKind.Health)
        vie.max = 50
        vie.value = 50
        challenge = 1.2
    } else if (difficulté == "extrême") {
        vie = statusbars.create(0, 0, StatusBarKind.Health)
        vie.max = 1
        vie.value = 1
        challenge = 1.3
    } else {
        vie = statusbars.create(12, 3, StatusBarKind.Health)
        vie.max = 100
        vie.value = 100
        challenge = 1
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.fruit, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.baDing.play()
    energie.value += 40
})
sprites.onOverlap(SpriteKind.projectil_de_la_mort, SpriteKind.ennemi_vivant, function (sprite, otherSprite) {
    music.bigCrash.play()
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -200
})
sprites.onOverlap(SpriteKind.tir_ami, SpriteKind.big_boss, function (sprite, otherSprite) {
    music.smallCrash.play()
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.big_bosshealt, otherSprite).value += -18
})
info.onCountdownEnd(function () {
    BOSS2 = sprites.create(assets.image`BOSS`, SpriteKind.BOSS)
    BOSS2.setPosition(80, 45)
    Vie_boss = statusbars.create(100, 5, StatusBarKind.BOSSHEALT)
    Vie_boss.setPosition(80, 5)
    Vie_boss.setColor(2, 11)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (energie.value != 0) {
        music.knock.play()
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
    status.spriteAttachedTo().destroy()
    magie.value += 17
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.projectil_de_la_mort, SpriteKind.BOSS, function (sprite, otherSprite) {
    music.bigCrash.play()
    sprite.destroy()
    Vie_boss.value += -6
})
sprites.onOverlap(SpriteKind.projectil_de_la_mort, SpriteKind.big_boss, function (sprite, otherSprite) {
    music.bigCrash.play()
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.big_bosshealt, otherSprite).value += -72
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    energie.value = 0
    vie.value = 0
    magie.value = 0
    sprites.destroy(vie)
    sprites.destroy(energie)
    sprites.destroy(magie)
    vaisseau.startEffect(effects.fire)
    music.beamUp.play()
    sprites.destroy(vaisseau)
    pause(3000)
    game.over(false)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (magie.value == 100) {
        music.thump.play()
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
    music.bigCrash.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.big_boss, function (sprite, otherSprite) {
    otherSprite.destroy()
    vie.value += -66
    music.bigCrash.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    vie.value += -34
    otherSprite.destroy()
    music.bigCrash.play()
})
let pomme: Sprite = null
let t_d_BOSS: Sprite = null
let tir_de_direction: Sprite = null
let vitesse = 0
let dy = 0
let dx = 0
let TIRBOSS: Sprite = null
let ennemi_d: Sprite = null
let ennemi_c: Sprite = null
let ennemi_a: Sprite = null
let vie_ennemi: StatusBarSprite = null
let ennemi_b: Sprite = null
let tir_big_boss2: Sprite = null
let projectile_ennemi: Sprite = null
let projectile_de_la_mort_ami: Sprite = null
let tir_joueur: Sprite = null
let challenge = 0
let BOSS2: Sprite = null
let Vie_boss: StatusBarSprite = null
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
controller.moveSprite(vaisseau, 85, 85)
vaisseau.setStayInScreen(true)
Difficilté("normal")
vie.attachToSprite(vaisseau, -17, 0)
magie = statusbars.create(25, 4, StatusBarKind.Magic)
magie.setPosition(16, 6)
energie = statusbars.create(20, 4, StatusBarKind.Energy)
energie.setPosition(12, 115)
info.setScore(0)
let Jauge_de_terreur = 5000
let Jauge_de_big_boss = 0
let jauge_de_tirreur_de_direction = 0
let jauge_de_shuriken = 5000
game.onUpdate(function () {
    for (let ennemi_c22 of sprites.allOfKind(SpriteKind.big_boss)) {
        if (ennemi_c22.y > 125) {
            ennemi_c22.destroy()
            vie.value += -60
        }
    }
})
game.onUpdate(function () {
    for (let ennemi_b22 of sprites.allOfKind(SpriteKind.ennemi_vivant)) {
        if (ennemi_b22.y > 125) {
            ennemi_b22.destroy()
            vie.value += -30
        }
    }
})
game.onUpdateInterval(2000, function () {
    if (energie.value == 0) {
        vie.value += -4
    }
    if (energie.value > 50) {
        vie.value += 2 * (vie.max / 100)
    }
    if (energie.value == 100) {
        vie.value += 2 * (vie.max / 100)
    }
})
game.onUpdateInterval(1000, function () {
    for (let ennemi_b3 of sprites.allOfKind(SpriteKind.ennemi_vivant)) {
        if (Math.percentChance(50)) {
            projectile_ennemi = sprites.createProjectileFromSprite(img`
                . . . 
                . 2 . 
                . 2 . 
                . 2 . 
                . 2 . 
                . . . 
                `, ennemi_b3, 0, 60 * challenge)
            projectile_ennemi.setKind(SpriteKind.tir_ennemi)
        }
    }
})
game.onUpdateInterval(1000, function () {
    for (let ennemi_c3 of sprites.allOfKind(SpriteKind.big_boss)) {
        if (Math.percentChance(60)) {
            tir_big_boss2 = sprites.createProjectileFromSprite(img`
                . . . 
                . 2 . 
                . 2 . 
                . 2 . 
                . 2 . 
                . . . 
                `, ennemi_c3, 0, 50 * challenge)
            tir_big_boss2.setKind(SpriteKind.tir_ennemi)
            if (Math.percentChance(50)) {
                tir_big_boss2.x += 2
            }
            if (Math.percentChance(50)) {
                tir_big_boss2.x += -2
            }
        }
    }
})
forever(function () {
    if (Jauge_de_terreur > 7000 - info.score() * 40 && info.score() < 60) {
        Jauge_de_terreur = 0
        ennemi_b = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 1 . . . . 1 . . . . . 
            . . . . . d d d d d d . . . . . 
            . . . . . d . 9 9 . d f . . . . 
            . . . . . d . . . . d . . . . . 
            . . . . . 2 . . . . 2 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0, 5)
        ennemi_b.x = randint(6, 154)
        ennemi_b.setKind(SpriteKind.ennemi_vivant)
        vie_ennemi = statusbars.create(8, 1, StatusBarKind.EnemyHealth)
        vie_ennemi.attachToSprite(ennemi_b, -2, 0)
    }
    if (jauge_de_shuriken > 6000 - info.score() * 40 && info.score() < 60) {
        jauge_de_shuriken = 0
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
    }
    if (Jauge_de_big_boss > 24000 - info.score() * 100 && (info.score() > 9 && info.score() < 60)) {
        Jauge_de_big_boss = 0
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
            . . . . 8 8 8 8 8 8 8 f . . . . 
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
    if (jauge_de_tirreur_de_direction > 20000 - info.score() * 80 && (info.score() > 30 && info.score() < 60)) {
        jauge_de_tirreur_de_direction = 0
        ennemi_d = sprites.createProjectileFromSide(assets.image`a`, 0, 5)
        ennemi_d.x = randint(5, 155)
        ennemi_d.setKind(SpriteKind.tirreur_de_direction)
    }
    if (info.score() > 59 && info.score() < 63) {
        info.setScore(100)
        for (let ennemi_a2 of sprites.allOfKind(SpriteKind.Enemy)) {
            ennemi_a2.destroy()
        }
        for (let ennemi_b2 of sprites.allOfKind(SpriteKind.ennemi_vivant)) {
            ennemi_b2.destroy()
        }
        for (let ennemi_c2 of sprites.allOfKind(SpriteKind.big_boss)) {
            ennemi_c2.destroy()
        }
        for (let ennemi_d2 of sprites.allOfKind(SpriteKind.tirreur_de_direction)) {
            ennemi_d2.destroy()
        }
        info.startCountdown(2)
    }
})
game.onUpdateInterval(100, function () {
    Jauge_de_terreur += 100 * challenge
    Jauge_de_big_boss += 100 * challenge
    jauge_de_shuriken += 100 * challenge
    jauge_de_tirreur_de_direction += 100 * challenge
})
game.onUpdateInterval(300, function () {
    for (let BOSS3 of sprites.allOfKind(SpriteKind.BOSS)) {
        TIRBOSS = sprites.createProjectileFromSprite(img`
            . 2 . 
            2 2 2 
            . 2 . 
            2 2 2 
            . 2 . 
            . . . 
            `, BOSS3, 0, 100 * challenge)
        TIRBOSS.setKind(SpriteKind.tir_ennemi)
        TIRBOSS.setPosition(randint(0, 160), randint(0, 60))
    }
})
game.onUpdateInterval(3000, function () {
    for (let ennemi_d22 of sprites.allOfKind(SpriteKind.tirreur_de_direction)) {
        if (Math.percentChance(60)) {
            dx = ennemi_d22.x - vaisseau.x
            dy = ennemi_d22.y - vaisseau.y
            vitesse = 50 * challenge / Math.sqrt(dx * dx + dy * dy)
            tir_de_direction = sprites.createProjectileFromSprite(img`
                . 2 . 
                2 2 2 
                . 2 . 
                `, ennemi_d22, (vaisseau.x - ennemi_d22.x) * vitesse, (vaisseau.y - ennemi_d22.y) * vitesse)
            tir_de_direction.setKind(SpriteKind.tir_ennemi)
        }
    }
})
game.onUpdateInterval(3000, function () {
    for (let BOSS2 of sprites.allOfKind(SpriteKind.BOSS)) {
        if (Math.percentChance(60)) {
            dx = BOSS2.x - vaisseau.x
            dy = BOSS2.y - vaisseau.y
            vitesse = 50 * challenge / Math.sqrt(dx * dx + dy * dy)
            t_d_BOSS = sprites.createProjectileFromSprite(img`
                . . d . . 
                . d d d . 
                d d d d d 
                . d d d . 
                . . d . . 
                `, BOSS2, (vaisseau.x - BOSS2.x) * vitesse, (vaisseau.y - BOSS2.y) * vitesse)
            t_d_BOSS.setKind(SpriteKind.Enemy)
        }
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
