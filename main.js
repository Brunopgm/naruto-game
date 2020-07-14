new Vue({
    el: "#app",
    data:{
        larguraNaruto: 100,
        larguraSasuke: 100,
        narutoVenceu: false,
        sasukeVenceu: false,
        empate: false,
        rodadaFinalizada: false,
        jogoIniciado: false
    },
    computed:{
         

        alterarCorNaruto(){
            return this.alteraCor(this.larguraNaruto)
        },
        alterarCorSasuke(){
            return this.alteraCor(this.larguraSasuke)
        }
    },
    watch:{

        rodadaFinalizada(){
            if(this.rodadaFinalizada == true){

                let button = document.querySelectorAll("#botao-rodada")
                button.forEach((botao)=>{
                    botao.setAttribute("disabled", true)
                    
                })
            }
        },
        narutoVenceu(){
            if(this.narutoVenceu == true && this.sasukeVenceu == true){
                this.narutoVenceu = false
                this.sasukeVenceu = false
                this.empate = true
                this.rodadaFinalizada = true
                
            }
        }
    },
        
    methods:{
        atacar(){
            let numero = this.gerarNumero()
            let diferenca = this.gerarDiferenca()

            if(diferenca >= 2){
                this.larguraNaruto = parseInt(this.larguraNaruto - (numero + diferenca))
                this.larguraSasuke = parseInt(this.larguraSasuke - numero)
            
            }else if(diferenca == 1){
                this.larguraNaruto = parseInt(this.larguraNaruto - numero)
                this.larguraSasuke = parseInt(this.larguraSasuke - (numero + diferenca))
            }else{
                this.larguraNaruto = parseInt(this.larguraNaruto - numero)
                this.larguraSasuke = parseInt(this.larguraSasuke - numero)
            }
            
            this.larguraNaruto <= 0 ? this.finalizarNaruto(): this.larguraNaruto 
            this.larguraSasuke <= 0 ? this.finalizarSasuke(): this.larguraSasuke 
        },

        ataqueEspecial(){
            let numero = this.gerarNumero()
            let diferenca = this.gerarDiferenca()

            if(diferenca > 4){
                this.larguraNaruto = parseInt(this.larguraNaruto - (numero + diferenca))
                this.larguraSasuke = parseInt(this.larguraSasuke - numero)
            
            }else if(diferenca >= 1 && diferenca <= 4){
                this.larguraNaruto = parseInt(this.larguraNaruto - numero)
                this.larguraSasuke = parseInt(this.larguraSasuke - (numero + diferenca))
            }else{
                this.larguraNaruto = parseInt(this.larguraNaruto - numero)
                this.larguraSasuke = parseInt(this.larguraSasuke - numero)
            }
            
            this.larguraNaruto <= 0 ? this.finalizarNaruto(): this.larguraNaruto 
            this.larguraSasuke <= 0 ? this.finalizarSasuke(): this.larguraSasuke 
        },
        curar(){
            let numero = this.gerarNumero()
            let diferenca = this.gerarDiferenca()

            if(diferenca >= 5){
                this.larguraNaruto = parseInt(this.larguraNaruto + (numero + diferenca))
                this.larguraNaruto = parseInt(this.larguraNaruto - numero)
            
            }else if(diferenca >= 2 || diferenca < 4){
                this.larguraNaruto = parseInt(this.larguraNaruto + numero)
                this.larguraNaruto = parseInt(this.larguraNaruto - (numero + diferenca))
            }else{
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
            let numeroDiferenca = Math.floor(Math.random() * 5) + 1 
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

            let button = document.querySelectorAll("#botao-rodada")
            button.forEach((botao)=>{    
            botao.removeAttribute("disabled")
        })
        },
        iniciarJogo(){
            return this.jogoIniciado = true
        },
        alteraCor(jogador){
            if(jogador <= 25){
                return {background: "#e03f3f"}
            }
        },
       
    }
})




