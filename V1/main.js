
window.addEventListener('load', function() 
{

	var game = new Phaser.Game
	({
    	"title": "LumberQuack",
    	"width": 800,
    	"height": 600,
		"physics":
		{
				default: 'arcade',
				arcade: 
				{
					gravity:{y:300},
					debug: false
				}
		},
    	"type": Phaser.AUTO,
    	"backgroundColor": "#000",
    	"parent": "game-container",
    	"scale": 
	{
        "mode": Phaser.Scale.FIT,
        "autoCenter": Phaser.Scale.CENTER_BOTH
    }
	});
	game.scene.add("Boot", Boot, true);
	
});

class Boot extends Phaser.Scene 
{

	preload() 
	{
		this.load.pack("pack", "assets/pack.json");
		this.load.audio("mainMenuSong" , "assets/sounds/MenuMusic.wav");
		this.load.audio("hitSound" , "assets/sounds/WoodWak.wav");
		this.load.audio("deathSound" , "assets/sounds/Dethh.wav");
		this.load.audio("gameMusic" , "assets/sounds/gameMusic.wav");
	}

	create()
	{
		this.scene.start("startScreen");
	}
}
