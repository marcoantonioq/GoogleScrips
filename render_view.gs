function view(data) {
    try {
        var Form = HtmlService.createTemplateFromFile('FormFinanceiro.html');
        Form.data = data;
        SpreadsheetApp.getUi().showModalDialog(Form.evaluate().setHeight(700),data.title);
    } catch (e) {
        Logger.log(e)
    }
}