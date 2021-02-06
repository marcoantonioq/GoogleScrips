/**
 * Prorotypes
 */
Array.prototype.str = function(){
  return this.toString().replace(/,/g,'\n')    
}

/**
* Função para adicionar dados no banco de dados
* @param {array} data Dados inseridos na tabela 
* @param {string} table Nome da tabela
* @returns {bool} Retorna boleano
*/
function appendRow(data = null, table='LOG' ){
  let ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(table);
  return sheet.appendRow(data);
}

/**
Pega valor do banco de dados
* @param {string} table Nome da tabela
* @param {string} range Intervalo
* @returns {array} Retorna array de valores
*/
function getValues(table=null, range = "A:A" ){
  let ss = SpreadsheetApp.getActive();
  let arr = ss.getSheetByName(table).getRange(range)
    .getValues()
    .filter(el => el[0])
  return arr
}

/**
Função criar um ContentOutPut
* @param {object} e Request params
* @returns {object} TextOutputs
*/
function createTextOutput(strjson) {
  return ContentService
      .createTextOutput(strjson)
}

/**
Função GET GoogleWeb
* @param {object} e Request params
* @returns {object} TextOutputs
*/
function doGet(e){

  const services = {
    allow: (e)=>{
      // Tabela de liberados
      let list = getValues("ALLOW").str() 
      return createTextOutput(list);
    },
    deny: (e)=>{
      // Tabela de negados
      let list = getValues("DENY").str()
      return createTextOutput(list);
    },
    info: (e) => {
      var myJSON = JSON.stringify({
        params: e.parameter 
      })
      return createTextOutput(myJSON)
        .setMimeType(ContentService.MimeType.JSON)
    }
  }
  try {
    return services[e.parameter.action](e)
  }catch(err){
    return services.info(e)
  }
}

/**
* Função POST GoogleWeb
* Ex comand via roteador: curl -X POST -H "Content-Type: application/json" -d '{name:"Nome", ...}' 
* @param {object} e Request params
* @returns {object} TextOutputs
*/
function doPost(e) {
  let body = JSON.parse(
    decodeURI(e.postData.getDataAsString())
  )
  let pass = decodeURI(body.pass).split("%3b")
  let values = {
    ...body,
    cpf: pass[0],
    ip: pass[1],
  }
  let status = appendRow([
    new Date(),
    values.name, 
    values.mac,,
    values.ip
  ])

  sendEmails({
    message: `
    Dispositivo cadastrado:
    
    Nome: ${values.name}
    MAC: ${values.mac}
    CPF: ${values.cpf}
    IP:  ${values.ip}`
  })
  
  return createTextOutput({body:values, status: status})
    .setMimeType(ContentService.MimeType.JSON);
}