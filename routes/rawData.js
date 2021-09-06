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

  const processingUpdateData = async (req, res) => {
    let id = req.params.id
    const data = {
        "id_notifikasi_text": req.body.id_notifikasi_text,
        "id_jenis_sensor": req.body.id_jenis_sensor,
        "title" : req.body.title,
        "text_kekurangan": req.body.text_kekurangan,
        "text_kelebihan": req.body.text_kelebihan
    }

    let updateDataQuery = `update notifikasi_text
     set id_jenis_sensor = ?,  title = ?,  text_kekurangan = ?, text_kelebihan = ?
      where id_notifikasi_text = ? `;

    const promisePool = pool.promise();
    // query database using promises
    
    const update = await promisePool.query(updateDataQuery, [data.id_jenis_sensor, data.title, data.text_kekurangan, data.text_kelebihan, id]);
    console.log(selectData[0]);
    res.status(200).json({
        "Message" : "Sukses mengubah data"
    });


    
  }

  const processingNewData = async (req, res) => {
    let id = req.params.id
    const data = {
        "id_notifikasi_text": req.body.id_notifikasi_text,
        "id_jenis_sensor": req.body.id_jenis_sensor,
        "title" : req.body.title,
        "text_kekurangan": req.body.text_kekurangan,
        "text_kelebihan": req.body.text_kelebihan
    }

    let NewDaraWuery = `INSERT INTO notifikasi_text ( id_notifikasi_text, id_jenis_sensor,title,text_kekurangan,text_kelebihan  )
     VALUES
      (?,?,?,?,? );`;

    const promisePool = pool.promise();
    // query database using promises
    
    const newData = await promisePool.query(NewDaraWuery, [data.id_notifikasi_text, data.id_jenis_sensor, data.title, data.text_kekurangan, data.text_kelebihan, id]);
    res.status(200).json({
        "Message" : "Sukses mengubah data"
    });


    
  }

  const processingDeleteData = async (req, res) => {
    let id = req.params.id

    let DeleteQuery = `DELETE FROM notifikasi_text WHERE id_notifikasi_text=?;`;

    const promisePool = pool.promise();
    // query database using promises
    
    const deleteData = await promisePool.query(DeleteQuery, [id]);
    res.status(200).json({
        "Message" : "Sukses mengubah data"
    });


    
  }

  
  module.exports = {processingSensor, processingEditData, processingUpdateData, processingNewData, processingDeleteData};


