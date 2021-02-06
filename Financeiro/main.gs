// const DataSets
const DS = new DataSets();
// const Banco de Dados
const DB = new DataBase();


function getValuesDS(){
  return DS.getValues();
}

function save( values ){
  return DB.save( values );    
}

function saveAll( values ){
  return DB.saveAll( values );
}

