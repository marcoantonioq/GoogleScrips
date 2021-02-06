Date.prototype.getData = function(lang = "pt-BR") {
    let [dd, mm, yyyy] = this.toLocaleDateString().split('/')
    return (lang === 'en') ?
    `${yyyy}-${mm}-${dd}` :
    `${dd}/${mm}/${yyyy}`
};

Date.prototype.getDataHora = function(lang = "pt-BR") {
    return `${this.getData(lang)} ${this.toLocaleTimeString()}`
};

Date.prototype.addMeses = function(meses){
    this.setMonth(this.getMonth() + meses)
};

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
    
    /**
     * Salva informações de vários arrays
     * @param {array} data [["item1", "item2", ...], ...]
     */
    saveAll(DataTable) {
        
        Logger.log("SaveAll",DataTable)
        
        const salvarLinha = linha => this.save(linha)
        
        DataTable.forEach(salvarLinha)
        
        return true;
    }
   
    /**
     * 
     * @param {string} tabela Nome da tabela 
     * @param linha
     * @param coluna 
     * @param novo 
     */
    setHistórico(tabela, linha, coluna, novo){
        // Histórico de alterações do Bando de Dados
        
        let historico = this.sheet.getSheetByName('Histórico')
        
        let values = [ 
            new Date().toLocaleString('pt-BR'), 
            Session.getEffectiveUser().getEmail(), 
            tabela,
            linha, 
            coluna, 
            novo
        ]
        
        historico.appendRow(values)
        
    }
    getColValues(col){
        return this.table.getRange(28, col, this.table.getLastRow())
        .getValues()
        .filter(item => item != '')
        .reduce((itens, item) => {
            itens['data'][item] = null
            return itens
        }, {data:{},minLength:0})
    }
}
