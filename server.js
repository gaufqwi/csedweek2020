const express = require('express');
const path = require('path');

const port = 7777;
const app = express();

const rootdir = process.argv[2] || 'tuesday';
const rootpath = path.join(__dirname, rootdir);
const phaser = path.join(__dirname, 'node_modules/phaser/dist/phaser.js');

app.get('/phaser*.js', (req, res) => {
    res.sendFile(phaser);
});
app.use('/assets', express.static(path.join(__dirname, 'docs/assets')));
app.use(express.static(rootpath))

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`Serving from path ${rootpath}`)
})
