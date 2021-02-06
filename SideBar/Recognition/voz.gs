/**
 * @OnlyCurrentDoc
 */

const sitentizador = ({texto, cmd})=> {
    
    if(!validations.isWhite(texto)){
    
        let sheet = SpreadsheetApp.getActive().getSheetByName('Atualizar')
        
        var obj = {
            texto: texto,
            cmd: cmd,
            range: sheet.getActiveRange(),
            set: function(){
              return (
                !validations.isWhite(this.texto) && 
                this.range.setValue(this.texto)
              )? true : false
            },
            insert: function(){
                let values = this.range.getValues()
                let isValuesWhite = values.every(el=> el.every(validations.isWhite))
                if(isValuesWhite){
                  return this.set()
                } else {
                  return false;
                }
                
            },
            update: function(){
                console.log("Ok ok, valor atualizado: ", this.texto);
                return this.set()
            },
        }
        
        try {
            // Se coluna 1, converte para inteiro
            if(obj.range.getColumn() == 1) {
                let texto = obj.texto;
                let num = +texto.replace(/\D+/g,"")
                
                console.log("Numero: ", num)
                
                if(validations.isInteger(num) && num > 10000 ){
                    obj.texto = +num
                } else {
                    throw "Numero inválido! :/";
                }
            }
            
            console.log(obj.texto, typeof obj.texto)
            
            if(obj[obj.cmd]()){
              // Adicionar linha automaticamente
              setAutoLine(sheet, 3)
              setAtualizarA2(obj.texto)
              // Se está inserindo, continua a celular A3
              if(obj.range.getColumn() == 1 && obj.range.getRow() == 3){
                sheet.getRange('A3').activate();
              }
              return {msg: "Ok", status: true};
            } else {
              throw "Erro ao salvar :/<br>Tente: \"Atualizar "+obj.texto+"\"";
            }

        } catch (e) {
            console.log("Status: ",e)
            return {msg: e, status: false};
        } 
    }
}
