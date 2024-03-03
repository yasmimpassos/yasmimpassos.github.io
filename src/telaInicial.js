//Cria a classe TelaInicial que herda da classe Phaser.Scene
class TelaInicial extends Phaser.Scene {
    constructor (){
        //Define o nome da cena
        super({key: "TelaInicial"})
    }

    //carrega as imagens utilizadas na cena
    preload(){
        this.load.image("fundo", "./assets/pong/ceu.png");
        this.load.image("botaoPlay", "./assets/pong/play.png");
    }

    create(){
        //adiciona a imagem de fundo na tela
        this.add.image(400, 300, "fundo");

        //adiciona o nome do jogo na tela
        this.add.text(190, 170, "Pong Galáctico", {fontSize: '50px', fill: '#ffffff'});
        
        //adiciona as instruções do jogo na tela
        this.add.text(70, 250, "Para jogar utilize as setas verticais, \n" + 
        "movimentando o personagem azul para cima e para baixo. \n" +
        "O jogo acaba quando algum player tiver feito 5 pontos, \n" +
    	"para pontuar, o adversário precisa deixar \n" +
        "a bola passar por ele.", {fontSize: '20px', fill: '#ffffff'})

        //adiciona o botao de play na tela
        this.botaoPlay = this.add.image(400, 400, "botaoPlay");

        //define o botao de play como interetivo
        this.botaoPlay.setInteractive();

        //define que o formato do cursor do mouse séra de mãozinha quando estiver por cima do botão
        this.botaoPlay.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        //define que o formato do cursor do mouse séra de seta quando estiver fora do botão
        this.botaoPlay.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        //faz com que troque de cena quando o botão de play é clicado, indo para o jogo
        this.botaoPlay.on("pointerdown", () => {
            this.scene.start('Pong');
        });
    }

    update(){

    }
}