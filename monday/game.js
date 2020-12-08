//var config = { width: 1000, height: 600 };
//var game = new Phaser.Game(config);
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
    width: tileSize*gridWidth,
    height: tileSize*gridHeight,
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

/** Main Phaser functions
 *
 * These three functions do most of the work of running the game
 */

/**
 * This function runs first. It is responsible for downloading the graphics and sounds our game needs
 * from the server.
 */
function preload () {
    this.load.setBaseURL('https://gaufqwi.github.io/csedweek2020/');
    this.load.image('tm', 'assets/PNG/Characters/idle.png');
    this.load.image('ground', 'assets/PNG/Tiles/tile001.png');

}

/**
 * This function is responsible for setting up the game. It needs to create the objects in the game
 * world and assign them to variables. It often also needs to set up other variables (like a score
 * or number of lives remaining).
 */
function create () {
    tm = this.physics.add.sprite(100, 100, 'tm');
    tm.setDisplaySize(64, 64);
    tm.refreshBody();
    tm.setCollideWorldBounds(true);

    platforms = this.physics.add.staticGroup();
    //platforms.create(32, 8*64+32, 'ground');
    //platforms.create(32 + 64, 8*64+32, 'ground');
    for (let i = 0; i < gridWidth; i++) {
        platforms.create(32 + i*64, 8*64+32, 'ground');
    }

    this.physics.add.collider(tm, platforms);
    this.physics.world.gravity.y = 200;

    controls = this.input.keyboard.createCursorKeys();
}
