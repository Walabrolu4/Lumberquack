var player;
var size = 5;
var difference = 125;
var treeLogs = [];
var playerDir = "NONE";
var leftDone = false;
var rightDone = false;
var touchDone = false;
var gameOver = false;
var score = 0;
var spaceDone = false;
var additionalTime = 500;
class Scene1 extends Phaser.Scene {
  constructor() {
    super("Scene1");
  }

  _create() {
    this.add.image(400.0, 300.0, "textures", "Background");
    this.load.image("textures", "Player_Idle_0");
    this.load.image("textures", "Player_Cut_0");
    //this.load.image("textures" , "TimeToHitBarFrame" );
    //this.load.image("textures" ,  "TimeToHitBar");

    this.progressBar = this.add.image(110, 80, "textures", "TimeToHitBar");
    this.progressBarFrame = this.add.sprite(
      110,
      80,
      "textures",
      "TimeToHitBarFrame"
    );

    this.progressBar.setScale(3, 1);
    this.progressBarFrame.setScale(3, 1);

    this.input.addPointer();
    this.physics.world.setBounds(0, 0, 800 * 4, 600 * 4);

    player = this.add.player(320, 520, "textures", "Player_Idle_0");
    score = 0;
    //this.addBranch(420 , 545 , 'LEFT'); // 125 differnce
    treeLogs = [];
    this.initTree(difference, size, 545);
    this.scoreText = this.add.text(16, 16, "Score : 0", {
      fontSize: "32px",
      fill: "#000",
    });
    this.add.text(16, 90, "LEFT and RIGHT \narrows to chop \navoid branches", {
      fontSize: "20px",
      fill: "#000",
    });
    //this.gameOverText.visible = false;
    this.scoreText.setOrigin(0);

    this.load.audio("hitSound", "assets/sounds/WoodWak.wav");
    this.load.audio("deathSound", "assets/sounds/Dethh.wav");
    this.load.audio("gameMusic", "assets/sounds/gameMusic.wav");

    this.song = this.sound.add("gameMusic");
    this.hitSound = this.sound.add("hitSound");
    this.deadSound = this.sound.add("deathSound");
  }

  /* START-USER-CODE */

  create() {
    this._create();
    this.bindKeys();
    leftDone = false;
    rightDone = false;
    touchDone = false;
    gameOver = false;
    score = 0;
    spaceDone = false;
    this.timeToClick = this.time.now + additionalTime;
    this.firstMove = false;
    this.progressBar.setScale(3, 1);
    //this.timedEvent = this.time.delayedCall(3000 , this.PrintThingy,[],this);
  }

  PrintThingy() {
    //console.log("THAT N**** ALEEEX!");
    gameOver = true;
    if (!this.deadSound.isPlaying) {
      this.deadSound.play();
    }
  }

  update() {
    if (this.input.pointer1.isDown) {
      if (this.input.pointer1.x > this.cameras.main.centerX) {
        this.TouchDir = "RIGHT";
      }
      if (this.input.pointer1.x < this.cameras.main.centerX) {
        this.TouchDir = "LEFT";
      }
    }

    if (!gameOver) {
      this.movePlayer();
      if (this.timedEvent != null) {
        //console.log(this.timedEvent.getProgress());
        var newX = (1 - this.timedEvent.getProgress()) * 3;
        this.progressBar.setScale(newX, 1);
      }
      if (!this.song.isPlaying) {
        this.song.play();
      }
    } else {
      this.song.stop();
      this.RestartGame();
      this.progressBar.setScale(0, 1);
      this.gameOverText = this.add.text(
        400,
        300,
        "GAME OVER!!! 'DOWN' to restrart",
        { fontSize: "35px", fill: "#020" }
      );
      this.gameOverText.setOrigin(0.5);
    }
    //player.update();
  }

  bindKeys() {
    var cursors = this.input.keyboard.createCursorKeys();

    this.wasd = {
      jump: cursors.space,
      left: cursors.left,
      right: cursors.right,
      duck: cursors.down,
      up: cursors.up,
    };

    this.input.keyboard.addCapture(
      Phaser.Input.Keyboard.KeyCodes.SPACEBAR,
      Phaser.Input.Keyboard.KeyCodes.LEFT,
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
      Phaser.Input.Keyboard.KeyCodes.DOWN,
      Phaser.Input.Keyboard.KeyCodes.UP
    );
  }

  movePlayer() {
    if (this.wasd.left.isDown && !this.wasd.right.isDown) {
      this.firstMove = true;

      player.setPos("LEFT");
      if (!leftDone) {
        //Handle event

        this.handleLogic("LEFT");
        ///.log("leftbrooda");
      }

      leftDone = true;
    }
    if (this.wasd.left.isUp) {
      leftDone = false;
    }

    if (this.wasd.right.isDown && !this.wasd.left.isDown) {
      this.firstMove = true;
      player.setPos("RIGHT");
      if (!rightDone) {
        this.handleLogic("RIGHT");
        //console.log("ROOOOIT");
      }

      rightDone = true;
    }
    if (this.wasd.right.isUp) {
      rightDone = false;
    }

    if (this.input.pointer1.isDown) {
      if (!touchDone) {
        if (this.TouchDir == "RIGHT") {
          this.handleLogic("RIGHT");
        }
        if (this.TouchDir == "LEFT") {
          this.handleLogic("LEFT");
        }
      }
      touchDone = true;
    }

    if (this.input.pointer1.isUp) {
      touchDone = false;
    }
  }

  RestartGame() {
    if (this.wasd.duck.isDown) {
      if (spaceDone == false) {
        this.registry.destroy();
        this.events.off();
        this.scene.restart();
        spaceDone = true;
      }
    }
    if (this.wasd.duck.isUp) {
      spaceDone = false;
    }

    if (this.input.pointer1.isDown) {
      if (touchDone == false) {
        this.registry.destroy();
        this.events.off();
        this.scene.restart();
        touchDone = true;
      }
    }
    if (this.input.pointer1.isUp) {
      touchDone = false;
    }
  }

  addBranch(x, y, dir, isPhy) {
    if (dir == "LEFT") {
      return this.add.treelog(x, y, "textures", "Branch", "LEFT", isPhy);
    }
    if (dir == "RIGHT") {
      return this.add.treelog(x, y, "textures", "Branch", "RIGHT", isPhy);
    }
    if (dir == "NONE") {
      return this.add.treelog(x, y, "textures", "Log", "NONE", isPhy);
    }
    //var block = this.physics.add.staticImage(400, 450, 'block');
    //var phyBody  = this.physics.add.sprite(420 , 545 , 'textures', 'Branch');
    //block.setVelocity(Phaser.Math.Between(10, 40), Phaser.Math.Between(20, 40));
    //block.setBounce(1).setCollideWorldBounds(true);
    //scene.physics.add.collider(phyBody , block);
  }

  initTree(difference, size, logYInit) {
    var logX = 420;
    var logY = logYInit;
    var logYDelta = 0;
    var dir = "NONE";
    var rander = Math.floor(Math.random() * 3);
    for (var i = 0; i < size; i++) {
      treeLogs.push(this.addBranch(logX, logY + logYDelta, dir, false));

      //logY += logYDelta;
      //this.add.treelog(logX , logY, "textures" , "Branch" , dir);
      if (rander == 0) {
        dir = "NONE";
      } else if (rander == 1) {
        dir = "RIGHT";
      } else if (rander == 2) {
        dir = "LEFT";
      }
      rander = Math.floor(Math.random() * 3);
      logYDelta -= difference;
      //console.log(treeLogs[i].GetDirection());
    }
  }

  handleLogic(playerDir) {
    if (playerDir == treeLogs[1].GetDirection()) {
      gameOver = true;
      console.log("FUCK YOU");
      player.setTexture("textures", "Player_Dead_0");
      this.addTree();
      this.deadSound.play();
    } else {
      score++;
      this.scoreText.setText("Score: " + score);
      //console.log("SCORE:" + score);
      if (this.timedEvent != null) {
        this.timedEvent.reset();
      }
      this.timedEvent = this.time.delayedCall(500, this.PrintThingy, [], this);
      this.addTree();
      this.hitSound.play();
    }
  }

  addTree() {
    treeLogs[0].destroyMe();
    treeLogs.shift();
    var logX = 420;
    var logY = 545;
    var logYDelta = 0;
    for (var i = 0; i < size - 1; i++) {
      treeLogs[i].setPos(logX, logY + logYDelta);
      logYDelta -= difference;
    }
    var rander = Math.floor(Math.random() * 3);
    if (rander == 0) {
      var dir = "NONE";
    } else if (rander == 1) {
      var dir = "RIGHT";
    } else if (rander == 2) {
      var dir = "LEFT";
    }
    treeLogs.push(this.addBranch(logX, logY + logYDelta, dir, false));
    this.addBranch(420, 585, dir, true);
  }
  /* END-USER-CODE */
}