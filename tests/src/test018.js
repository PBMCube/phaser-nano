var game = new PhaserNano.Game(800, 600, 'canvas', '', { preload: preload, create: create, update: update, render: render });

function preload () {

    game.pixelArt = true;

    game.load.path = 'assets/';

    game.load.image('sky2');
    game.load.atlas('atlas_hash_no_trim');
    game.load.atlas('atlas_hash_trim');

}

var blitTexture;
var pool = [];
var cy = 0;
var cd = 0;

function create() {

    game.add.sprite(0, 0, 'sky2');

    // blitTexture = new PhaserNano.Texture(game.cache.getTexture('atlas_hash_no_trim'), 'oz_pov_melting_disk');

    blitTexture = new PhaserNano.Texture(game.cache.getTexture('atlas_hash_trim'), 'oz_pov_melting_disk');

    blitTexture.cropHeight = 0;

    //  Our Blit pool
    for (var i = 0; i < 100; i++)
    {
        var x = Math.random() * game.width;
        var y = Math.random() * game.height;
        pool.push( { x: x, y: y, r: 2 + Math.random() * 6 });
    }

}

function update() {

    if (cd === 0)
    {
        blitTexture.cropHeight++;

        if (blitTexture.cropHeight === blitTexture.frame.height)
        {
            cd = 1;
        }
    }
    else
    {
        blitTexture.cropHeight--;

        if (blitTexture.cropHeight === 0)
        {
            cd = 0;
        }
    }

}

function render() {

    var x;

    for (var i = 0; i < pool.length; i++)
    {
        x = pool[i].x;

        game.renderer.blit(x, pool[i].y, blitTexture);

        x += pool[i].r;

        if (x > 800)
        {
            x = -32;
        }
        
        pool[i].x = x;
    }

}
