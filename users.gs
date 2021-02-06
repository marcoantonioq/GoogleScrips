function getListUsers(){
  let spreadsheet = SpreadsheetApp.getActive();
  let targetSheet = spreadsheet.getSheetByName("Usuários");
  return targetSheet.getRange(2, 1, 500, 5).getValues()
}


function getUserEmail(){
//  Logger.log(Session.getActiveUser().getEmail())
  return Session.getEffectiveUser().getEmail();
  
}