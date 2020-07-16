new Vue({
    el: "#app",
    data:{
        barraDeVidaNaruto: 100,
        barraDeVidaSasuke: 100,
        narutoVenceu: false,
        sasukeVenceu: false,
        empate: false,
        rodadaFinalizada: false,
        jogoIniciado: false,
        arrayLinhasDoPlacar: [],
        cura: false,
       
    },
    computed:{
        alertaPoucaVidaNaruto(){ //readonly
            return this.alteraCor(this.barraDeVidaNaruto)
        },
        alertaPoucaVidaSasuke(){
            return this.alteraCor(this.barraDeVidaSasuke)
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
        barraDeVidaNaruto(novoValor, antigoValor){
            
            if(!this.cura) {this.adicionarArrayLinha("SASUKE ATINGIU COM", antigoValor - novoValor )}
   
        },
        barraDeVidaSasuke(novoValor, antigoValor){
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
        calculaAtaque(valorCasoVitoriaSasuke, valorVitoriaNaruto){
            let numero = this.gerarNumero()
            let diferenca = this.gerarDiferenca()
            this.cura = false


            if(diferenca >= valorCasoVitoriaSasuke){
                this.barraDeVidaNaruto = this.barraDeVidaNaruto - (numero + diferenca)
                this.barraDeVidaSasuke = this.barraDeVidaSasuke - numero
            
            }else if(diferenca >= valorVitoriaNaruto){
                this.barraDeVidaNaruto = this.barraDeVidaNaruto - numero
                this.barraDeVidaSasuke = this.barraDeVidaSasuke - (numero + diferenca)
            }else{
                this.barraDeVidaNaruto = this.barraDeVidaNaruto - numero
                this.barraDeVidaSasuke = this.barraDeVidaSasuke - numero
            }
 
            this.barraDeVidaNaruto <= 0 ? this.finalizarNaruto(): this.barraDeVidaNaruto 
            this.barraDeVidaSasuke <= 0 ? this.finalizarSasuke(): this.barraDeVidaSasuke 
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

                this.barraDeVidaNaruto = this.barraDeVidaNaruto + (numero + diferenca)
                this.barraDeVidaNaruto = this.barraDeVidaNaruto - numero
            }else if(diferenca >= 2 || diferenca < 4){
                this.adicionarArrayLinha(fraseNaruto, numero)
                this.adicionarArrayLinha(fraseSascuke, numero + diferenca)

                this.barraDeVidaNaruto = this.barraDeVidaNaruto + numero
                this.barraDeVidaNaruto = this.barraDeVidaNaruto - (numero + diferenca)
            }else{
                this.adicionarArrayLinha(fraseNaruto, numero)
                this.adicionarArrayLinha(fraseSascuke, numero)

                this.barraDeVidaNaruto = this.barraDeVidaNaruto + numero
                this.barraDeVidaNaruto = this.barraDeVidaNaruto - numero
            }

           
            this.barraDeVidaNaruto > 100 ? this.barraDeVidaNaruto = 100 : this.barraDeVidaNaruto
            this.barraDeVidaNaruto <= 0 ? this.finalizarNaruto(): this.barraDeVidaNaruto 
            this.barraDeVidaSasuke <= 0 ? this.finalizarSasuke(): this.barraDeVidaSasuke 
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
            this.barraDeVidaNaruto = 0
            this.sasukeVenceu = true  
            this.rodadaFinalizada = true
        },
        finalizarSasuke(){
            this.barraDeVidaSasuke = 0
            this.narutoVenceu = true
            this.rodadaFinalizada = true
        },
        desistir(){
            this.barraDeVidaSasuke = 100
            this.barraDeVidaNaruto = 100
            this.narutoVenceu = false
            this.sasukeVenceu = false
            this.empate = false
            this.rodadaFinalizada = false
            this.jogoIniciado = false
            this.cura = true
            this.arrayLinhasDoPlacar = []
          
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
            this.arrayLinhasDoPlacar.push(valorDeAtaque)            
        }
    }
})




