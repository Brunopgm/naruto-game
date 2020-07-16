new Vue({
    el: "#app",
    data:{
        larguraNaruto: 100,
        larguraSasuke: 100,
        narutoVenceu: false,
        sasukeVenceu: false,
        empate: false,
        rodadaFinalizada: false,
        jogoIniciado: false,
        linha: [],
        cura: false,
       
    },
    computed:{
        alterarCorNaruto(){ //readonly
            return this.alteraCor(this.larguraNaruto)
        },
        alterarCorSasuke(){
            return this.alteraCor(this.larguraSasuke)
        },
    },
    watch:{
        narutoVenceu(){
            if(this.narutoVenceu == true && this.sasukeVenceu == true){
                this.narutoVenceu = false
                this.sasukeVenceu = false
                this.empate = true
                this.rodadaFinalizada = true
                
            }
        },
        larguraNaruto(novoValor, antigoValor){
            
            if(!this.cura) {this.adicionarArrayLinha("SASUKE ATINGIU COM", antigoValor - novoValor )}
   
        },
        larguraSasuke(novoValor, antigoValor){
            if(!this.cura) {this.adicionarArrayLinha("NARUTO ATINGIU COM", antigoValor - novoValor )}
        }
    },
        
    methods:{
        atacar(){
            return this.calculaAtaque(3, 1)
        },

        ataqueEspecial(){
            return this.calculaAtaque(6, 3)
        },
        curar(){
            let numero = this.gerarNumero()
            let diferenca = this.gerarDiferenca()
            this.cura = true
            let fraseNaruto = 'NARUTO GANHOU FORCA DE' 
            let fraseSascuke = "SASUKE ATACOU COM"
            

            if(diferenca >= 5){
                this.adicionarArrayLinha(fraseNaruto, numero + diferenca)
                this.adicionarArrayLinha(fraseSascuke, numero)

                this.larguraNaruto = parseInt(this.larguraNaruto + (numero + diferenca))
                this.larguraNaruto = parseInt(this.larguraNaruto - numero)
            }else if(diferenca >= 2 || diferenca < 4){
                this.adicionarArrayLinha(fraseNaruto, numero)
                this.adicionarArrayLinha(fraseSascuke, numero + diferenca)

                this.larguraNaruto = parseInt(this.larguraNaruto + numero)
                this.larguraNaruto = parseInt(this.larguraNaruto - (numero + diferenca))
            }else{
                this.adicionarArrayLinha(fraseNaruto, numero)
                this.adicionarArrayLinha(fraseSascuke, numero)

                this.larguraNaruto = parseInt(this.larguraNaruto + numero)
                this.larguraNaruto = parseInt(this.larguraNaruto - numero)
            }

           
            this.larguraNaruto > 100 ? this.larguraNaruto = 100 : this.larguraNaruto
            this.larguraNaruto <= 0 ? this.finalizarNaruto(): this.larguraNaruto 
            this.larguraSasuke <= 0 ? this.finalizarSasuke(): this.larguraSasuke 
        },

        gerarNumero(){
            let numero = Math.floor(Math.random() * 15) + 1
            return numero
        },
        gerarDiferenca(){
            let numeroDiferenca = Math.floor(Math.random() * 6) + 1 
            return numeroDiferenca  
        },
        finalizarNaruto(){
            this.larguraNaruto = 0
            this.sasukeVenceu = true  
            this.rodadaFinalizada = true
        },
        finalizarSasuke(){
            this.larguraSasuke = 0
            this.narutoVenceu = true
            this.rodadaFinalizada = true
        },
        desistir(){
            this.larguraSasuke = 100
            this.larguraNaruto = 100
            this.narutoVenceu = false
            this.sasukeVenceu = false
            this.empate = false
            this.rodadaFinalizada = false
            this.jogoIniciado = false
            this.cura = true
            this.linha = []
          
        },
        iniciarJogo(){
            
           return this.jogoIniciado = true
        },
        alteraCor(vidaJogador){
            if(vidaJogador <= 25){
                return {background: "#e03f3f"}
            }
        },
        
        adicionarArrayLinha(jogador, valor){
            
            let valorDeAtaque = `${jogador} ${valor}` 
            this.linha.push(valorDeAtaque)            
        }, 
        calculaAtaque(valorCasoVitoriaSasuke, valorVitoriaNaruto){
            let numero = this.gerarNumero()
            let diferenca = this.gerarDiferenca()
            this.cura = false


            if(diferenca >= valorCasoVitoriaSasuke){
                this.larguraNaruto = parseInt(this.larguraNaruto - (numero + diferenca))
                this.larguraSasuke = parseInt(this.larguraSasuke - numero)
            
            }else if(diferenca >= valorVitoriaNaruto){
                this.larguraNaruto = parseInt(this.larguraNaruto - numero)
                this.larguraSasuke = parseInt(this.larguraSasuke - (numero + diferenca))
            }else{
                this.larguraNaruto = parseInt(this.larguraNaruto - numero)
                this.larguraSasuke = parseInt(this.larguraSasuke - numero)
            }
 
            this.larguraNaruto <= 0 ? this.finalizarNaruto(): this.larguraNaruto 
            this.larguraSasuke <= 0 ? this.finalizarSasuke(): this.larguraSasuke 
        }
    }
})




