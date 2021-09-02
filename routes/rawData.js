const mysql =require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'petani',
    multipleStatements: true
});

const getJenisSensor  = (resultArr) =>{
    // console.log(resultArr[0][0]['title']);
    // console.log(resultArr[0].length);
    const sensor = []

    for (let i = 0; i < resultArr[0].length; i+=1) {
        
        if (sensor.find(item => item == resultArr[0][i]['title'])) {
            // console.log("sensor name is same");
        }
        else{
            sensor.push(resultArr[0][i]['title'])
        }
        
    }

    
    return sensor;

    
}
const processingSensor = async (req, res) => {



    let seeDataQuery = `select * from notifikasi_text`;
  
    // get the client
    const promisePool = pool.promise();
    // query database using promises
    const seeData = await promisePool.query(seeDataQuery);
    const sensor = getJenisSensor(seeData)
    console.log(seeData[0]);
    res.status(200).json(sensor);
    
    
  }

  const processingEditData = async (req, res) => {

    let id = req.params.id
    let data = []

    let seeDataQuery = `select * from notifikasi_text`;
    let selectDataQuery = `select * from notifikasi_text where id_notifikasi_text = ?`;

  
    // get the client
    const promisePool = pool.promise();
    // query database using promises
    
    const selectData = await promisePool.query(selectDataQuery, [id]);
    const seeData = await promisePool.query(seeDataQuery);

    // console.log(selectData[0]);
    const sensor = getJenisSensor(seeData)


    data.push({
        editable : selectData[0],
        jenisSensor : sensor
    })
    res.status(200).json(data);


    
  }

  
  module.exports = {processingSensor, processingEditData};


