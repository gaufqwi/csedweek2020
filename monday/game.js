//var config = { width: 1000, height: 600 };
//var game = new Phaser.Game(config);

/** General configuration (if needed)
 *
 */

const title = 'Platformer 1'
const tileSize = 64;
const gridWidth = 12;
const gridHeight = 8;

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

let tm;                     // The sprite representing the player
let platforms;                  // All of the individual tiles that the player can stand on

let controls;                   // An object that represents the keyboard controls

/** Main Phaser functions
 *
 * These three functions do most of the work of running the game
 */

/**
 * This function runs first. It is responsible for downloading the graphics and sounds our game needs
 * from the server.
 */
function preload () {
    //this.load.setBaseURL('');

    this.load.image('ground', 'assets/PNG/Tiles/platformPack_tile001.png')
    this.load.image('platform', 'assets/PNG/Tiles/platformPack_tile025.png')
    this.load.image('tm', 'assets/PNG/Characters/platformChar_idle.png');
}

/**
 * This function is responsible for setting up the game. It needs to create the objects in the game
 * world and assign them to variables. It often also needs to set up other variables (like a score
 * or number of lives remaining).
 */
function create () {
    this.physics.world.gravity.y = 200;

    platforms = this.physics.add.staticGroup();

    // for (let i = 0; i < gridWidth; i++) {
    //     platforms.create(32 + i * tileSize, 32 + 7 * tileSize, 'ground');
    // }
    makePlatform(7, 0, 11, 'ground');
    makePlatform(4, 0, 3, 'platform');
    makePlatform(2, 6, 11, 'platform');

    tm = this.physics.add.sprite(32, 32 + 5 * tileSize, 'tm');
    tm.setDisplaySize(64, 64);
    tm.refreshBody();
    //tm.setSize(64, 64);

    controls = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(tm, platforms);
    tm.setCollideWorldBounds(true);
}

/**
 * This function is the game's "main loop". It runs many times a second and is responsible for
 * waiting for user input and responding in ways that reflect the game rules.
 */
function update () {
    if (controls.left.isDown) {
        tm.setVelocityX(-160);

        //tm.anims.play('left', true);
    } else if (controls.right.isDown) {
        tm.setVelocityX(160);

        //tm.anims.play('right', true);
    } else {
        tm.setVelocityX(0);

        //tm.anims.play('turn');
    }

    if (controls.up.isDown && tm.body.touching.down) {
        tm.setVelocityY(-330);
    }
}

/** Helper functions
 *
 * Extra functions to make our code easier to write and understand
 */
function makePlatform (y, startx, endx, terrain) {
    for (let x = startx; x <= endx; x++) {
        platforms.create(32 + x * tileSize, 32 + y * tileSize, terrain);
    }
}
