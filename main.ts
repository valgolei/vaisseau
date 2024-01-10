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
    export const titre = SpriteKind.create()
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
sprites.onOverlap(SpriteKind.tir_ami, SpriteKind.ennemi_vivant, function (sprite, otherSprite) {
    music.smallCrash.play()
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -50
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BOSS, function (sprite, otherSprite) {
    vie.value += -1
    touché()
})
function touché () {
    scene.setBackgroundColor(2)
    pause(50)
    scene.setBackgroundColor(0)
}
statusbars.onZero(StatusBarKind.BOSSHEALT, function (status) {
    effects.blizzard.endScreenEffect()
    sprites.destroy(Vie_boss)
    sprites.destroy(vie)
    sprites.destroy(energie)
    sprites.destroy(magie)
    BOSS2.startEffect(effects.spray)
    BOSS2.startEffect(effects.fire)
    BOSS2.startEffect(effects.halo)
    BOSS2.destroy(effects.disintegrate, 2000)
    scene.setBackgroundColor(7)
    pause(50)
    scene.setBackgroundColor(0)
    pause(2500)
    scene.setBackgroundColor(6)
    effects.confetti.startScreenEffect()
    pause(3000)
    if (challenge == 1.3) {
        game.showLongText("Bien joué !", DialogLayout.Bottom)
        game.showLongText("Tu as réussis l'impossible en terminant ce jeu en mode extrême !", DialogLayout.Bottom)
        game.showLongText("BRAVO !", DialogLayout.Bottom)
        game.setGameOverMessage(true, "Victoire !")
        pause(300)
        scene.setBackgroundColor(2)
        pause(300)
        scene.setBackgroundColor(3)
        pause(300)
        scene.setBackgroundColor(4)
        pause(300)
        scene.setBackgroundColor(5)
        pause(300)
        scene.setBackgroundColor(6)
        pause(300)
        scene.setBackgroundColor(7)
        pause(300)
        scene.setBackgroundColor(8)
        pause(300)
        scene.setBackgroundColor(9)
        pause(300)
        scene.setBackgroundColor(10)
        pause(300)
        scene.setBackgroundColor(11)
        pause(300)
        scene.setBackgroundColor(12)
        pause(300)
        scene.setBackgroundColor(13)
        pause(300)
        scene.setBackgroundColor(14)
        pause(300)
        scene.setBackgroundColor(1)
        pause(1000)
    }
    game.over(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.tir_ennemi, function (sprite, otherSprite) {
    otherSprite.destroy()
    vie.value += -15
    music.smallCrash.play()
    touché()
})
function Difficilté (difficulté: string) {
    if (classique == 1) {
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
function mode (mode2: string) {
    if (mode2 == "infini") {
        classique = 0
    } else {
        classique = 1
    }
}
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
    if (challenge != 0) {
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
    touché()
    pause(3000)
    game.over(false)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (challenge != 0) {
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
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ennemi_vivant, function (sprite, otherSprite) {
    vie.value += -34
    otherSprite.destroy()
    music.bigCrash.play()
    touché()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.big_boss, function (sprite, otherSprite) {
    otherSprite.destroy()
    vie.value += -66
    music.bigCrash.play()
    touché()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    vie.value += -34
    otherSprite.destroy()
    music.bigCrash.play()
    touché()
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
let classique = 0
let challenge = 0
let BOSS2: Sprite = null
let Vie_boss: StatusBarSprite = null
let energie: StatusBarSprite = null
let magie: StatusBarSprite = null
let vie: StatusBarSprite = null
let vaisseau: Sprite = null
let mySprite = sprites.create(img`
    .........................................
    .........................................
    .........................................
    ...888.888.888.888.888...888.8.8.8.888...
    ...8...8.8.8.8.8...8.....8...8.8.8.8.8...
    ...888.888.888.8...88....888.888.8.888...
    .....8.8...8.8.8...8.......8.8.8.8.8.....
    ...888.8...8.8.888.888...888.8.8.8.8.....
    .........................................
    .........................................
    .........................................
    `, SpriteKind.titre)
pause(2000)
sprites.destroy(mySprite)
pause(1000)
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
mode("classique")
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
game.onUpdateInterval(1000, function () {
    for (let ennemi_b3 of sprites.allOfKind(SpriteKind.ennemi_vivant)) {
        if (Math.percentChance(50)) {
            projectile_ennemi = sprites.createProjectileFromSprite(img`
                . . . 
                . 1 . 
                . 1 . 
                . 1 . 
                . 1 . 
                . . . 
                `, ennemi_b3, 0, 60 * challenge)
            projectile_ennemi.setKind(SpriteKind.tir_ennemi)
        }
    }
    for (let ennemi_c3 of sprites.allOfKind(SpriteKind.big_boss)) {
        if (Math.percentChance(60)) {
            tir_big_boss2 = sprites.createProjectileFromSprite(img`
                . . . 
                . 8 . 
                . 8 . 
                . 8 . 
                . 8 . 
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
    if (classique == 1) {
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
        if (jauge_de_tirreur_de_direction > 20000 - info.score() * 80 && (info.score() > 29 && info.score() < 60)) {
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
    } else {
        if (Jauge_de_terreur > 7000 - Math.sqrt(info.score()) * 400) {
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
        if (jauge_de_shuriken > 6000 - Math.sqrt(info.score()) * 400) {
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
        if (Jauge_de_big_boss > 24000 - Math.sqrt(info.score()) * 1000 && info.score() > 9) {
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
        if (jauge_de_tirreur_de_direction > 20000 - Math.sqrt(info.score()) * 800 && info.score() > 29) {
            jauge_de_tirreur_de_direction = 0
            ennemi_d = sprites.createProjectileFromSide(assets.image`a`, 0, 5)
            ennemi_d.x = randint(5, 155)
            ennemi_d.setKind(SpriteKind.tirreur_de_direction)
        }
    }
    for (let ennemi_c22 of sprites.allOfKind(SpriteKind.big_boss)) {
        if (ennemi_c22.y > 125) {
            music.buzzer.play()
            ennemi_c22.destroy()
            vie.value += -60
            touché()
        }
    }
    for (let ennemi_b22 of sprites.allOfKind(SpriteKind.ennemi_vivant)) {
        if (ennemi_b22.y > 125) {
            music.buzzer.play()
            ennemi_b22.destroy()
            vie.value += -30
            touché()
        }
    }
})
forever(function () {
    music.play(music.stringPlayable("C E G E C5 E G E ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C F A F C5 F A F ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C E G E C5 E G E ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("D C E C D G G G ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C E G E C5 E G E ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C F A F C5 F A F ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C E G E C5 E G E ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("D F E C D E C C ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C5 B C5 A C5 G C5 F ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C5 E C5 D C5 C C5 C ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("G G G G G G G G ", (200 + info.score()) * challenge * 2), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("G G G G G G G G ", (200 + info.score()) * challenge * 2), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C D E F G A B C5 ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("E F G E A G F D ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("G F E D C E D A ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("F B A G F G E A ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("E F A G D D E F ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("A G F E G F E D ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("F E D C E D C D ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C5 B A G F E D C ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("B C5 A B G A F G ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("E F D E C D G C ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C5 A F D F A C5 G ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("E C E G C5 F A G ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("G A A B B C5 C5 C5 ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("- - - - - - - - ", (200 + info.score()) * challenge), music.PlaybackMode.UntilDone)
})
forever(function () {
    pause(2000)
    if (energie.value == 0) {
        vie.value += -4
        energie.setColor(5, 2)
        pause(50)
        energie.setColor(5, 11)
    }
    if (energie.value > 50) {
        vie.value += 2 * (vie.max / 100)
    }
    if (energie.value == 100) {
        vie.value += 2 * (vie.max / 100)
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
            . a . 
            2 1 2 
            . 1 . 
            2 1 2 
            . a . 
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
                . 5 . 
                5 5 5 
                . 5 . 
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
