/** General configuration (if needed)
 *
 */

const title = 'My game'

/** Phaser configuration and setup
 *
 * This is where you set most of the options for your game and use them to create the Phaser game
 * object that basically runs the whole game
 */

const config = {
    type: Phaser.AUTO,
    title: title,
    width: 800,
    height: 600,
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


/** Main Phaser functions
 *
 * These three functions do most of the work of running the game
 */

/**
 * This function runs first. It is responsible for downloading the graphics and sounds our game needs
 * from the server.
 */
function preload () {
    this.load.setBaseURL('https://gaufqwi.github.io/csedweek2020/assets/');

}

/**
 * This function is responsible for setting up the game. It needs to create the objects in the game
 * world and assign them to variables. It often also needs to set up other variables (like a score
 * or number of lives remaining).
 */
function create () {

}

/**
 * This function is the game's "main loop". It runs many times a second and is responsible for
 * waiting for user input and responding in ways that reflect the game rules.
 */
function update () {
}

/** Helper functions
 *
 * Extra functions to make our code easier to write and understand
 */

