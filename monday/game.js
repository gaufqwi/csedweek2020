//var config = { width: 1000, height: 600 };
//var game = new Phaser.Game(config);

/* General configuration (if needed)
 *
 */

const title = 'Platformer 1'
const tileSize = 64;

/* Phaser configuration and setup
 *
 * This is where you set most of the options for your game and use them to create the Phaser game
 * object that basically runs the whole game
 */

const config = {
    type: Phaser.AUTO,
    title: title,
    width: 12*tileSize,
    height: 8*tileSize,
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

/* Global variables
 *
 * This is where you define your global variables. A global variable should be used for any game object
 * or data that might be changed in the update function.
 *
 * (Actually, it's usually a bad idea to use global variables and there are other ways to organize our
 * code that are probably better, but for small and fairly simple games using globals is easier.)
 */

let hopper;
let platforms;

function preload () {
    //this.load.setBaseURL('');

    this.load.image('ground', 'assets/PNG/Tiles/platformPack_tile001.png')
    this.load.image('platform', 'assets/PNG/Tiles/platformPack_tile025.png')
    this.load.image('hopper', 'assets/PNG/Characters/platformChar_idle.png');
}

function create () {
    this.physics.world.gravity.y = 100;

    platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 12; i++) {
        platforms.create(32 + i*tileSize, 32 + 7 * tileSize, 'ground');
    }

    hopper = this.physics.add.sprite(100, 100, 'hopper');

    this.physics.add.collider(hopper, platforms);
    hopper.setCollideWorldBounds(true);
}

function update () {

}
