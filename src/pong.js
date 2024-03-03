//Cria a classe Pong que herda da Phaser.Scene
class Pong extends Phaser.Scene {
    constructor (){
        super({key: "Pong"})

        //Define os atributos da cena
        this.planetas;
        this.aleatorio;
        this.bola;
        this.placarAzul;
        this.placarRosa;
        this.playerAzul;
        this.playerRosa;
        this.pontosAzul = 0;
        this.pontosRosa = 0;
        this.teclado;
        this.velocidadeX = 350;
        this.velocidadeY;
        this.sentido;
    }

    preload(){
        //Carrega as imagens que vai ter nessa cena
        this.load.image("ceu", "./assets/pong/ceu.png");
        this.load.image("playerAzul", "./assets/pong/players/playerAzul.png");
        this.load.image("playerRosa", "./assets/pong/players/playerRosa.png");
        this.load.image("estrelaAzul", "./assets/pong/estrelas/estrelaAzul.png");
        this.load.image("estrelaRosa", "./assets/pong/estrelas/estrelaRosa.png");
        this.load.image("detritos", "./assets/pong/detritos.png");
        this.load.image("planetaAmarelo", "./assets/pong/planetas/planetaAmarelo.png");
        this.load.image("planetaAzul", "./assets/pong/planetas/planetaAzul.png");
        this.load.image("planetaBege", "./assets/pong/planetas/planetaBege.png");
        this.load.image("planetaRosa", "./assets/pong/planetas/planetaRosa.png");
        this.load.image("planetaTerra", "./assets/pong/planetas/planetaTerra.png");
        this.load.image("planetaVermelho", "./assets/pong/planetas/planetaVermelho.png");
        this.load.spritesheet('estrela','./assets/pong/moeda.png', {frameWidth: 66, frameHeight: 57});
    }


    create(){

        //cria a imagem do céu
        this.add.image(400, 300, "ceu");

        //cria a animação da estrela
        this.anims.create({
            //apelido da animação
            key: 'girar',
            //define quais frames apareceram nessa animação
            frames: this.anims.generateFrameNumbers('estrela', { start: 0, end: 5}),
            frameRate: 10, //quantidade de frames em 1 segundo
            repeat: -1 //-1 indica repetição contínua
        });

        //cria as estrelas na tela, usando o laço for para criar 20 estrelas
        for (var i = 0; i < 20; i++) {

            //define a posição da estrela
            var posicaoEstrelaX = Phaser.Math.RND.between(174, 676);
            var posicaoEstrelaY = Phaser.Math.RND.between(50, 550);

            //cria a estrela na tela
            this.estrela = this.physics.add.sprite(posicaoEstrelaX, posicaoEstrelaY, 'estrela').setScale(0.1);

            //anima a estrela
            this.estrela.anims.play('girar', true);
        }

        //adiciona os players na tela 
        this.playerAzul = this.physics.add.sprite(50, 300, "playerAzul").setScale(0.7);
        this.playerRosa = this.physics.add.sprite(750, 300, "playerRosa").setScale(0.7);

        //adiciona a colisão dos players com as bordas da tela
        this.playerAzul.setCollideWorldBounds(true);
        this.playerRosa.setCollideWorldBounds(true);

        //torna os players imoveis, para que a bola não faça com que ele se mecha ao colidir
        this.playerAzul.setImmovable(true);
        this.playerRosa.setImmovable(true);

        //adiciona as estrelas, que marcam a pontuação na tela
        this.add.image(200, 50, "estrelaAzul").setScale(0.8);
        this.add.image(600, 50, "estrelaRosa").setScale(0.8);

        //adiciona o placar de cada jogador na tela
        this.placarAzul = this.add.text(190, 35, this.pontosAzul, {fontSize: '35px', fill: '#ffffff'});
        this.placarRosa = this.add.text(590, 35, this.pontosRosa, {fontSize: '35px', fill: '#ffffff'});

        //adiciona a imagem dos detritos
        this.add.image(400, 300, "detritos");

        //cria uma array que armazena os nomes dos assets dos planetas
        this.planetas = ["planetaAmarelo", "planetaAzul", "planetaBege", "planetaRosa", "planetaTerra", "planetaVermelho"];
        
        //cria uma variavel que será usada para aleatorizar o planeta da bola
        this.aleatorio = Phaser.Math.RND.between(0, 5);

        //adiciona a bola na tela com um planeta aleatório
        this.bola = this.physics.add.sprite(400, 300, this.planetas[this.aleatorio]).setScale(0.5);

        //cria uma variavel que definira o sentido que a bola começará, se for -1 para a esquerda e 1 para a direita
        this.sentido = (Math.random()> 0.5)?1 :-1;

        //cria uma variavel que deixa a velocidade y da bola aleatória
        this.velocidadeY = Phaser.Math.RND.between(-350, 350);

        //define a velocidade da bola
        this.bola.setVelocity(this.sentido*this.velocidadeX, this.velocidadeY);

        //faz com que a bola bata e continue seu sentido, sendo uma colisão perfeitamente elastica
        this.bola.setBounce(1);

        //faz com que a bola colida com as bordas da tela
        this.bola.setCollideWorldBounds(true);

        //cria os cursores do teclado
        this.teclado = this.input.keyboard.createCursorKeys();

        //adiciona a colisão ente a bola e os players e chama o método trocarBola quando a colisão acontece
        this.physics.add.collider(this.bola, this.playerAzul, this.trocarBola, null, this);
        this.physics.add.collider(this.bola, this.playerRosa, this.trocarBola, null, this);

    }

    update(){

        //cria a movimentação do personagem azul
        //quando a tecla para cima estiver pressionada ele anda para cima
        if (this.teclado.up.isDown){
            this.playerAzul.setVelocityY(-this.velocidadeX);
        }// quando a tecla para baixo estiver pressionada ele anda para baixo
        else if (this.teclado.down.isDown){
            this.playerAzul.setVelocityY(this.velocidadeX);
        }// se nenhuma das duas teclas estiverem pressionadas ele fica parado
        else {
            this.playerAzul.setVelocity(0);
        }

        //Faz com que a bola não fique com uma velocidade superior a dos players
        if (this.bola.setVelocity > this.velocidadeX) {
            this.bola.setVelocity(this.velocidadeX);
        } 
        else if (this.bola.setVelocity < -this.velocidadeX) {
            this.bola.setVelocity(-this.velocidadeX);
        }

        //Chama os métodos pontuaçãoRosa e pontuaçãoAzul de acordo com que lado a bola colida.
        if (this.bola.body.x <= 0){
            this.pontuacaoRosa();
        }
        if (this.bola.body.x >= 745){
            this.pontuacaoAzul();
        }
        
        //Faz com que o playerRosa tenha a mesma velocidade Y da bola
        this.playerRosa.body.velocity.setTo(this.bola.body.velocity.y );

        //faz com que a velocidade X do playerRosa seja zero
        this.playerRosa.setVelocityX(0);
       
    }

    //Cria o método trocarBola, que é chamado quando a bola bate com os players
    trocarBola(){
        //define qual vai ser o próximo planeta a ser mostrado na tela
        this.aleatorio = Phaser.Math.RND.between(0, 5);

        //troca a textura da tela pela a do planeta recém selecionado
        this.bola.setTexture(this.planetas[this.aleatorio]);
    }

    //Cria o método pontuacaoRosa, que é chamado quando a bola bate com as borda esquerda da tela
    pontuacaoRosa(){

        //Cria uma condicional para aumentar apenas até 5 pontos
        if(this.pontosRosa < 5){
            
            //retona a bola para a posição central
            this.bola.setPosition(400, 300);

            //define a velocidade da bola no eixoY
            this.velocidadeY = Phaser.Math.RND.between(-350, 350);

            //define o sentido que a bola vai seguir
            this.sentido = (Math.random()> 0.5)?1 :-1;

            //modifica a velocidade da bola
            this.bola.setVelocity(this.sentido*this.velocidadeX, this.velocidadeY);

            //aumenta em um os pontosRosa
            this.pontosRosa += 1;

            //atualiza o placar na tela
            this.placarRosa.setText(this.pontosRosa);
        }
    
        //cria uma condicional para verificar se pontosRosa == 5, se o jogo acabou
        if (this.pontosRosa == 5){

            //cria a variavel resultado que será utilizado na próxima cena, informando se perdeu ou ganhou
            const resultado = "perdeu";

            //restaura os pontos rosa e azul para zero
            this.pontosRosa = 0;
            this.pontosAzul = 0;

            //altera a cena do jogo e passa o valor de resultado para ela
            this.scene.start('GameOver', { resultado: resultado}); 
        }
    }

    //Cria o método pontuacaoAzul, que é chamado quando a bola bate com as borda esquerda da tela
    pontuacaoAzul(){

        //Cria uma condicional para aumentar apenas até 5 pontos
        if(this.pontosAzul < 5){
            
            //retona a bola para a posição central
            this.bola.setPosition(400, 300);

            //define a velocidade da bola no eixoY
            this.velocidadeY = Phaser.Math.RND.between(-350, 350);

            //define o sentido que a bola vai seguir
            this.sentido = (Math.random()> 0.5)?1 :-1;

            //modifica a velocidade da bola
            this.bola.setVelocity(this.sentido*this.velocidadeX, this.velocidadeY);

            //aumenta em um os pontosAzul
            this.pontosAzul += 1;

            //atualiza o placar na tela
            this.placarAzul.setText(this.pontosAzul);
        }
    
        //cria uma condicional para verificar se pontosAzul == 5, se o jogo acabou
        if (this.pontosAzul == 5){

            //cria a variavel resultado que será utilizado na próxima cena, informando se perdeu ou ganhou
            const resultado = "ganhou";

            //restaura os pontos Azul e Rosa para zero
            this.pontosAzul = 0;
            this.pontosRosa = 0;

            //altera a cena do jogo e passa o valor de resultado para ela
            this.scene.start('GameOver', { resultado: resultado}); 
        }
    }
}