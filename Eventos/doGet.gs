/**
 * @OnlyCurrentDoc
 */

function doGet(e){
  
  var Form = HtmlService.createTemplateFromFile("form.html")
    
  Form.title = "Titulo";
  return  Form.evaluate().setTitle("Titulo").addMetaTag('viewport', 'width=device-width, initial-scale=1')

}