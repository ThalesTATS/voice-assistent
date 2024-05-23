const { createApp, ref } = Vue

  createApp({
    data(){
        return {
            falas: []
        }
    },
    created(){
        window.addEventListener("onSpeakingEvent", this.onSpeaking);
    },
    methods: {
        onSpeaking(dados){
            let obj = {
                date: getDataHoraAtualFormatada(),
                transcript: dados.detail,
                formated: this.formatSpeach(dados.detail),
                commandExist: false
            };

            if(this.executeCommands(obj)){
                obj.commandExist = true;
            }

            this.falas.push(obj);
            
        },
        formatSpeach(text){
            return text.trim().toLowerCase()
        },
        executeCommands(obj){
            let command = obj.formated;
            if(this.setCodes(command)){
                return true;
            }
            return false;
        },  
        setCodes(command){
            let commands = {
                'zerar registros': this.zerarRegistros,
                'limpar registros': this.zerarRegistros,
                'limpar histórico': this.zerarRegistros,
                'abrir youtube no canal': this.abrirYoutubeCanal,
                'abrir youtube': this.abrirYoutube,
                'abrir o youtube': this.abrirYoutube,
                'pesquisar no youtube': this.pesquisarYoutube,
                'assistir no youtube': this.pesquisarYoutube,
                'pesquisar': this.pesquisarGoogle,
                'enviar mensagem para': this.enviarMensagemPara
            };

            for(let commandKey in commands){
                if(command.startsWith(commandKey)){
                    let parameter = command.replace(commandKey, '');
                    parameter = parameter.trim();
                    commands[commandKey](parameter);
                    return true;
                }
            }
            return false;
        },
        zerarRegistros(code){
            this.falas = [];
        },
        pesquisarGoogle(text){
            let searchArray = text.split(" ");
            let searchString = searchArray.join('+')
            let url = 'https://www.google.com/search?q='+searchString;
            window.open(url, "_blank");
        },
        abrirYoutube(){
            window.open('https://www.youtube.com/', "_blank");
        },
        abrirYoutubeCanal(text){
            let chanel = text.split(" ");
            chanel = chanel.join('');
            window.open('https://www.youtube.com/@'+chanel, "_blank");
        },
        pesquisarYoutube(text){
            let searchArray = text.split(" ");
            let searchString = searchArray.join('+')
            let url = 'https://www.youtube.com/results?search_query='+searchString;
            window.open(url, "_blank");
        },
        enviarMensagemPara(text){
            let contatos = {
                'nome exemplo': '99999999999',
            }

            for(let contatoKey in contatos){
                if(text.startsWith(contatoKey)){
                    let message = text.replace(contatoKey, '');
                    message = message.replace(" ", "+");
                    let url = 'https://web.whatsapp.com/send/?phone='+contatos[contatoKey]+'&text='+message;
                    window.open(url, "_blank");
                    return true;
                }
            }
            return false;
        }
    },
  }).mount('#app')