/**
 *
 */

class TreeBranch extends Phaser.GameObjects.Sprite 
{


	constructor(scene, x, y, texture, frame , dir , isPhysics) 
 	{
		super(scene, x, y - 120, texture, frame);

		this.initX = x;
		this.initY = y;
	this.scene.tweens.add({
        targets: this,
        y: y,
        duration: 100,
        ease: 'Power2',
        yoyo: false,
        delay: 0
    });
		
		if(isPhysics)
		{
			
			this.scene.physics.add.existing(this);
			
			this.body.setSize(0, 0);
			this.body.setOffset(0, 0);
		
			this.body.gravity.y = 30;
			//var block = scene.physics.add.staticImage(400, 450, 'block');
			//var phyBody  = scene.physics.add.image(this)         .setBounce(1, 1)
        //.setVelocityX(300);
			//scene.physics.add.collider(phyBody , block);
			if(dir == 'RIGHT')
			{
				//phyBody.setVelocity(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400));
				this.body.setVelocity(Phaser.Math.Between(200, 400), -300)
			}
			else
			{
				//phyBody.setVelocity(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400));
				this.body.setVelocity(Phaser.Math.Between(-200, -400), -200)
			}
		}

		//console.log(dir);	
		//this.body.setSize(4,4);
		if(!isPhysics)
		{
			if(dir == "RIGHT")
		{
			this.setScale(-4, 4);
			
		}
		else
		{
			this.setScale(4, 4);
		}	
		}
		
		
		//this.body.setOffset(37, 29);
		this.scene = scene;
		this.myDirection = dir;
		//this.body.gravity.y = 0;
	}
	
	GetDirection()
	{
		return this.myDirection;
	}
	setPos(xD,yD)
	{
		this.scene.tweens.add({
        targets: this,
        y: yD,
        duration: 100,
        ease: 'Power2',
        yoyo: false,
        delay: 0
    });
	//this.setPosition(xD,yD);
	}
	destroyMe()
	{
		this.destroy();
	}
	
}

Phaser.GameObjects.GameObjectFactory.register("treelog", function(x, y, texture, frame , dir , isphy) 
{	
	var sprite = new TreeBranch(this.scene, x, y, texture, frame , dir , isphy);

	this.scene.sys.displayList.add(sprite);
	this.scene.sys.updateList.add(sprite);

	return sprite;
});

