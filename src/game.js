//Define as configurações do jogo
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    //Define as cenas do jogo
    scene: [TelaInicial, Pong, GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: false },
            debug: false
        }
    }
};
//Cria o jogo
var game = new Phaser.Game(config);