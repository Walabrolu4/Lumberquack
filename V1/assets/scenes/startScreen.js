var me;
class startScreen extends Phaser.Scene {
  constructor() {
    super("startScreen");
  }

  create() {
    me = this;
    this.menuAnim0000 = this.add.sprite(
      400.06027,
      227.5873,
      "MenuAtals",
      "menuAnim0000"
    );
    this.menuAnim0000.setScale(0.99989796, 0.74822295);
    this.menuAnim0000.anims.play("lmenuAnim");
    this.menuAnim0000.anims.setRepeat(-1);
    this.load.audio("mainMenuSong", "assets/sounds/WoodWak.wav");
    this.song = this.sound.add("mainMenuSong");
    this.song.play();
    //this.input.keyboard.on('keydown' , function(e){this.restart();});
    //this.input.keyboard.on('keydown' ,function(e){this.restart(e);});
    this.bindKey = false;
  }

  update() {
    if (!this.bindKey) {
      this.input.keyboard.on("keydown", function (event) {
        me.song.stop();
        me.scene.start("Scene1");
        console.log("ALex!");
      });
      this.bindKey = true;
    }

    if (!this.song.isPlaying) {
      this.song.play();
    }
  }
}