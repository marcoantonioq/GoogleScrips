function showAlertar(mensagem){
    Browser.msgBox("Alerta!", mensagem, Browser.Buttons.OK) 
    return false;
}

function showConfirm(mensagem){
    
    var ui = SpreadsheetApp.getUi();
    
    var response = ui.alert( 'Confirmar', mensagem, ui.ButtonSet.SIM_NÃO);

    if (response == ui.Button.SIM) {
        return true
    } else {
        return false
    }
}