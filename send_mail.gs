
/**
* Função sendEmails
* @param {object} obj{emailAddress, subject, message}
* @returns {bool} Retorna boleano
*/
function sendEmails({
  emailAddress='destino@gmail.com', 
  subject='Assunto', 
  message
}){
  MailApp.sendEmail(emailAddress, subject, message);
}