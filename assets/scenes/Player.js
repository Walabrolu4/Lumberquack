/**
 *
 */
class Player extends Phaser.GameObjects.Sprite 
{


	constructor(scene, x, y, texture, frame) 
	{
		super(scene, x, y, texture, frame);

		this.initX = x;
		this.initY = y;

		//this.scene.physics.add.existing(this);

		this.setScale(5, 5);
		//this.body.setOffset(37, 29);
		
		//this.body.gravity.y = 0;
		this.kind = "player";
	}
	
	setPos(key)
	{
		if(key == 'LEFT')
		{
			this.setTexture('textures' , 'Player_Cut_0');
			this.setScale(5,5);
			this.setPosition(300,520,1,1);
		}
		if(key == 'RIGHT')
		{
			this.setTexture('textures' , 'Player_Cut_0');
			this.setScale(-5,5);
			this.setPosition(540,520,1,1);
		}		
	}
	
	gameOver()
	{
		this.delete();
	}


}

Phaser.GameObjects.GameObjectFactory.register("player", function(x, y, texture, frame) 
{	
	var sprite = new Player(this.scene, x, y, texture, frame);

	this.scene.sys.displayList.add(sprite);
	this.scene.sys.updateList.add(sprite);

	return sprite;
});

