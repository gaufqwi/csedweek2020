/** General configuration (if needed)
 *
 */

const title = 'My Game';
const tileSize = 64;
const gridWidth = 12;
const gridHeight = 9;

/** Phaser configuration and setup
 *
 * This is where you set most of the options for your game and use them to create the Phaser game
 * object that basically runs the whole game
 */

const config = {
    type: Phaser.AUTO,
    title: title,
    width: gridWidth * tileSize,
    height: gridHeight * tileSize,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

/** Global variables
 *
 * This is where you define your global variables. A global variable should be used for any game object
 * or data that might be changed in the update function.
 *
 * (Actually, it's usually a bad idea to use global variables and there are other ways to organize our
 * code that are probably better, but for small and fairly simple games using globals is easier.)
 */
let tm;
let platforms;
let controls;
let collectibles;
let pickupSound;

/** Main Phaser functions
 *
 * These three functions do most of the work of running the game
 */

/**
 * This function runs first. It is responsible for downloading the graphics and sounds our game needs
 * from the server.
 */
function preload () {
    //this.load.setBaseURL('https://gaufqwi.github.io/csedweek2020/');
    //this.load.image('tm', 'assets/PNG/Characters/idle.png');
    this.load.spritesheet('tm', 'assets/Tilesheet/character.png', {frameWidth: 96, frameHeight: 96});
    this.load.image('ground', 'assets/PNG/Tiles/tile001.png');
    this.load.image('bridge', 'assets/PNG/Tiles/tile039.png');
    this.load.image('yellowdiamond', 'assets/PNG/Items/item008.png');
    this.load.audio('pickup', 'assets/Sounds/highUp.mp3');
}

/**
 * This function is responsible for setting up the game. It needs to create the objects in the game
 * world and assign them to variables. It often also needs to set up other variables (like a score
 * or number of lives remaining).
 */
function create () {
    tm = this.physics.add.sprite(100, 100, 'tm');
    tm.setCollideWorldBounds(true);
    tm.setDisplaySize(64, 64);
    tm.refreshBody();

    this.anims.create({
        key: 'idle',
        frames: [{key: 'tm', frame: 0}],
        frameRate: 10
    });
    this.anims.create({
        key: 'jump',
        frames: [{key: 'tm', frame: 1}],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'walk',
        frames: [{key: 'tm', frame: 2}, {key: 'tm', frame: 3}],
        frameRate: 6,
        repeat: -1
    });

    platforms = this.physics.add.staticGroup();
    collectibles = this.physics.add.staticGroup();

    //platforms.create(32, 8*64 + 32, 'ground');
    //platforms.create(32 + 1*64, 8*64 + 32, 'ground');
    // for (let i = 0; i < gridWidth; i++) {
    //     platforms.create(32 + i*64, 8*64 + 32, 'ground');
    // }
    makePlatform('ground', 0, 12, 8);
    makePlatform('bridge', 0, 3, 4);
    makePlatform('bridge', 4, 4, 1);
    makePlatform('bridge', 8, 4, 6);
    makePlatform('bridge', 5, 2, 5);

    //collectibles.create(tileSize/2 + 6*tileSize, tileSize/2 + 4*tileSize, 'yellowdiamond');
    makeCollectible('yellowdiamond',6, 4);
    makeCollectible('yellowdiamond',5, 0);
    makeCollectible('yellowdiamond', 10, 3);
    makeCollectible('yellowdiamond', 11, 7);

    this.physics.add.collider(tm, platforms);
    this.physics.add.collider(tm, collectibles, collectDiamond);
    this.physics.world.gravity.y = 200;

    controls = this.input.keyboard.createCursorKeys();

    pickupSound = this.sound.add('pickup');
}

/**
 * This function is the game's "main loop". It runs many times a second and is responsible for
 * waiting for user input and responding in ways that reflect the game rules.
 */
function update () {
    if (controls.right.isDown) {
        tm.setVelocityX(160);
        tm.setFlipX(false);
        tm.anims.play('walk', true);
        // if (tm.body.touching.down) {
        //     tm.anims.play('walk', true);
        // }
    } else if (controls.left.isDown) {
        tm.setVelocityX(-160);
        tm.setFlipX(true);
        tm.anims.play('walk', true);
        // if (tm.body.touching.down) {
        //     tm.anims.play('walk', true);
        // }
    } else {
        tm.setVelocityX(0);
        tm.anims.play('idle', true);
        // if (tm.body.touching.down) {
        //     tm.anims.play('idle', true);
        // }
    }

    if (controls.up.isDown && tm.body.touching.down) {
        tm.setVelocityY(-300);
        //tm.anims.play('jump', true);
    }

    if (!tm.body.touching.down) {
        tm.anims.play('jump', true);
    }
}

/** Helper functions
 *
 * Extra functions to make our code easier to write and understand
 */

function makePlatform (key, startx, length, y) {
    for (let i = startx; i < startx + length; i++) {
        platforms.create(tileSize/2 + i*tileSize, tileSize/2 + y*tileSize, key);
    }
}

function makeCollectible (key, x, y) {
    collectibles.create(tileSize/2 + x*tileSize, tileSize/2 + y*tileSize, key);
}

function collectDiamond (tm, diamond) {
    pickupSound.play();
    diamond.destroy();
}
