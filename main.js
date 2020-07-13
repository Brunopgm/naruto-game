new Vue({
    el: "#app",
    data:{
        larguraJogador: 100,
        larguraMonstro: 100,
        jogoFinalizado: false,
        desabilitar: ""
    },
    watch:{
        jogoFinalizado(){
        let button = document.querySelectorAll(".butao-rodada")
        button.forEach((botao)=>{
            botao.setAttribute("disabled", true)
        })}
        },
    methods:{
        atacar(){
            let numero = this.gerarNumero()
            let diferenca = this.gerarDiferenca()

            if(diferenca >= 2){
                this.larguraJogador = parseInt(this.larguraJogador - (numero + diferenca))
                this.larguraMonstro = parseInt(this.larguraMonstro - numero)
            
            }else if(diferenca == 1){
                this.larguraJogador = parseInt(this.larguraJogador - numero)
                this.larguraMonstro = parseInt(this.larguraMonstro - (numero + diferenca))
            }else{
                this.larguraJogador = parseInt(this.larguraJogador - numero)
                this.larguraMonstro = parseInt(this.larguraMonstro - numero)
            }
            
            this.larguraJogador < 0 ? this.finalizarJogador(): this.larguraJogador 
            this.larguraMonstro < 0 ? this.finalizarMonstro(): this.larguraMonstro 
        },

        ataqueEspecial(){
            let numero = this.gerarNumero()
            let diferenca = this.gerarDiferenca()

            if(diferenca > 4){
                this.larguraJogador = parseInt(this.larguraJogador - (numero + diferenca))
                this.larguraMonstro = parseInt(this.larguraMonstro - numero)
            
            }else if(diferenca >= 1 && diferenca <= 4){
                this.larguraJogador = parseInt(this.larguraJogador - numero)
                this.larguraMonstro = parseInt(this.larguraMonstro - (numero + diferenca))
            }else{
                this.larguraJogador = parseInt(this.larguraJogador - numero)
                this.larguraMonstro = parseInt(this.larguraMonstro - numero)
            }
            
            this.larguraJogador < 0 ? this.finalizarJogador(): this.larguraJogador 
            this.larguraMonstro < 0 ? this.finalizarMonstro(): this.larguraMonstro 
        },

        gerarNumero(){
            let numero = Math.floor(Math.random() * 15) + 1
            return numero
        },
        gerarDiferenca(){
            let numeroDiferenca = Math.floor(Math.random() * 5) + 1 
            return numeroDiferenca  
        },
        finalizarJogador(){
            this.larguraJogador = 0
            this.jogoFinalizado = true
        },
        finalizarMonstro(){
            this.larguraMonstro = 0
            this.jogoFinalizado = true
        }

    }
})

