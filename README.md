# GoogleScrips

Projetos desenvolvidos com GoogleScripts

## Web Apps

Exemplo de URL: https://script.google.com/.../exec?username=jsmith&age=21

```JS
function doGet(e){
  
  var Form = HtmlService.createTemplateFromFile("form.html")
    
  Form.title = "Titulo";
  return  Form.evaluate().setTitle("Titulo").addMetaTag('viewport', 'width=device-width, initial-scale=1')

}

```
[More...](./Eventos/)

## onEdit

```JS
const onEvents = {
    ...
}

function onEdit(event){  

  var ss = SpreadsheetApp.getActive();
    
  try 
  {    
    let sheetName = event.source.getSheetName()
    onEvents[sheetName](event)     
  } 
  catch(error) 
  {
    Logger.log(`Evento não encontrado: ${error} `)
  }
}
```
[More...](./Eventos/)

## CRUD

Crud GoogleSheet

```JS
class Sheets {
    constructor(TabName, ssID) {
        if(ssID) {
            var ssID="<ID>"
            this.sheet = SpreadsheetApp.openById(ssID)
            this.table = this.sheet.getSheetByName(TabName)
        } else {
            this.sheet = SpreadsheetApp.getActiveSpreadsheet()
            this.table = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TabName)
        }    
    }
    
    /**
     * Salva informações de um array
     * @param {array} data ["item1", "item2", ...]
     */
    save(data) { 
        try {
            
            let line
            try{
                line = parseInt(data[0])
                data[0] = '=ROW()'
            } catch(e){
                Logger.log("Erro ao converter linha: "+data[0])
            }      
            
            const atualizarLinha = _ => {
                this.table.getRange(line,1,1,data.length).setValues([data])
                return true
            }
            
            const adicionarLinha = _ => {
                this.table.appendRow( data )      
                return true
            }
            
            line > 0 && atualizarLinha() || adicionarLinha()
            
        } catch(e){ 
            Logger.log('Erro ao salvar: '+e);
            return false;
        }
        return true;
    }
    ...
    
}
```
[More...](./ClassSheets.gs)