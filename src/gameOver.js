//Cria a classe GameOver que herda da Phaser.Scene
class GameOver extends Phaser.Scene {
    constructor (){
        //define o nome da classe como GameOver
        super({key: "GameOver"})
    }

    //pega o valor armazenada na data para utilizar nessa cena
    init(data) {
        //define qual o resultado
        this.resultado = data.resultado;
    }

    //carrega as imagens utilizadas nessa cena
    preload(){
        this.load.image("fundo", "./assets/pong/ceu.png");
        this.load.image("botaoRestart", "./assets/pong/restart.png");
    }

    create(){
        //adiciona a imagem de fundo na tela
        this.add.image(400, 300, "fundo");

        //adiciona o botão de restart na tela
        this.botaoRestart = this.add.image(400, 350, "botaoRestart");

        //define o botão de restart como interativo
        this.botaoRestart.setInteractive();

        //define que o formato do cursor do mouse séra de mãozinha quando estiver por cima do botão
        this.botaoRestart.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        //define que o formato do cursor do mouse séra de seta quando estiver fora do botão
        this.botaoRestart.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        //faz com que troque de cena quando o botão de play é clicado, indo para o jogo
        this.botaoRestart.on("pointerdown", () => {
            this.scene.start('Pong');
        });
        
        //define o texto que vai aparecer na tela de acordo com o resultado do jogo
        if (this.resultado === "ganhou"){
            //adiciona o texto você ganhou caso o resultado seja ganhou
            this.add.text(240, 250, "Você ganhou", {fontSize: '50px', fill: '#ffffff'});
        }
        if (this.resultado === "perdeu"){
            //adiciona o texto você perdeu caso o resultado seja perdeu
            this.add.text(240, 250, "Você perdeu", {fontSize: '50px', fill: '#ffffff'});
        }
    }
    
    update(){

    }
}