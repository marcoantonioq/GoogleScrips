// Class DataSets
class DataSets extends Sheets {
    constructor(name) {
        super("DataSets")
        this.values = {}
        this.updateValues()
    }
    updateValues(){
        const arr = {
            escola: 2,
            titular: 3,
            tupo: 4,
            disc: 5,
            local_movimento: 6,
            valor: 7,
            forma_pagamento: 8,
            obs: 9,     
        }
        
        this.values.escola = this.getColValues(2);
        this.values.titular = this.getColValues(3);   
        
        this.values.tipo = this.getColValues(4);
        this.values.disc = this.getColValues(5);
        this.values.local_movimento = this.getColValues(6);
        this.values.valor = this.getColValues(7);
        this.values.forma_pagamento = this.getColValues(8);
        this.values.obs = this.getColValues(9); 
    }
    getValues(){    
        return this.values;
    }
}

// Banco de Dados
class DataBase extends Sheets {
    constructor(values) {
        super("Banco de Dados", "<ID>")
    }
    updateValues(){
        this.row = null
    }
    save(data)
    {  
        try {
            super.setHistórico('Banco de Dados', 'All', 'Pagamento', data.toString())
        }catch(e){
            Logger.log("Erro ao salvar histórico", e)
        }
        return super.save(data)
    }
    
    getValues(idrow){    
        return this.values;
    }
    
    getFullRowID(idrow=null){ // (id:selectRow) :getValues
        try{
            if(idrow === null){
                // procurar por linha selecionada pelo usuário
                let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
                let selection = sheet.getSelection();
                let rowSel = selection.getActiveRange().getRow()
                let lastCol = sheet.getLastColumn()
                
                if(rowSel > 10){ // area inválida
                    var range = sheet.getRange(rowSel,1,1,6);
                    sheet.setActiveRange(range);
                    Logger.log("log1: "+sheet.getActiveRange().getValues() );
                    
                    idrow = parseInt(sheet.getActiveRange().getValues()[0]);
                }        
            }
            if( Number.isInteger(idrow) && !Number.isNaN(idrow) ){      
                //      showAlertar("Vamos pegar "+idrow+"!")
                Logger.log("Valores de "+idrow+": "+ this.table.getRange(idrow,1,1,this.table.getLastColumn() ).getValues()  )
                return this.table.getRange(idrow,1,1,this.table.getLastColumn() ).getValues()
            } else {
                showAlertar(":( Marque uma linha válida entre 11 e 250!")        
            }
        }catch(e){
            showAlertar(":( Marque uma linha válida entre 11 e 250! "+e)
        }
        return {'id':0,'error':'nenhum valor encontrado'}
    }
}