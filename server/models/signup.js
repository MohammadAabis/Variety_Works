const dbConnection = require("../db-config").db
let user = {}

const AddUserMod = async (req, res) => {  
    let resp = {}
    try{                  
      resp = await dbConnection.query('SELECT email from users');
      const emailExists = resp.rows.some(row => row.email === req.body.email);
      if(emailExists){
        return (response = {
          status: 200,
          msg: `Email is already registered!`,
        })
      }
      else{
        await dbConnection.query(`
          INSERT INTO users (first_name, last_name, email, address, phone, password)           
          VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.address}', '${req.body.phone}','${req.body.password}')      
      `)

      return (response = {
      status: 200,
      msg: `User registered successfully!`,
    })

      }
    } 
    catch (e) {
      console.error(e.message);
    }
  }


  module.exports = {AddUserMod}