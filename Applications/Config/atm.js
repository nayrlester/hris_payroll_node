const _ = require('lodash');
const xl = require('excel4node');
const moment = require('moment')
const uc = require('upper-case')

exports.atmList = async function (req, res){
     var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    const menu = req.menu,
    data = await mysql.queryAsync(`SELECT 
    CONCAT(t1.fname, " ", t1.mname, " ", t1.lname) as full_name, t2.atm_number,t2.canditate_id,t2.id
    FROM _node_candidate_info t1 INNER JOIN _node_atm_list t2 ON t1.id = t2.canditate_id`)
    res.render('atm/index', { menu, data,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.atmEmpSearch = async function(req, res){
    let { value } = req.query
    if(value != ""){
        let row = await mysql.queryAsync(`
            SELECT t1.emp_id,t2.id,CONCAT(t2.fname, " ", t2.mname, " ", t2.lname) as full_name
            FROM _node_user_information t1 INNER JOIN _node_candidate_info t2 ON t1.candidate_id = t2.id 
            WHERE CONCAT(t2.fname,  t2.mname,  t2.lname)  LIKE '%${value}%'
        `)
        res.writeHead(200, {'Content-Type': 'application/json'});  
        res.end(JSON.stringify(row));
    }
}

exports.atmEmpInfo = async function(req, res){
    let { id } = req.query
    if(id != ""){
        let row = await mysql.queryAsync(`SELECT id,CONCAT(fname, " ", mname, " ", lname) as full_name 
        FROM _node_candidate_info WHERE id = ${id}`)
        res.writeHead(200, {'Content-Type': 'application/json'});  
        res.end(JSON.stringify(row));
    }
}

exports.atmEmpAdd = async function (req,res){
    try {
        let { emp_id, atm_numer} = req.body
        let result = await mysql.queryAsync(`INSERT INTO _node_atm_list 
        (canditate_id,atm_number) VALUES (?, ?)`,[emp_id, atm_numer])
        res.redirect('/atm-list')
    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.atmEmpUpdate = async function (req,res){
    try {
        let { emp_id, atm_numer} = req.body
        let result = await mysql.queryAsync(`UPDATE _node_atm_list SET atm_number = ? WHERE canditate_id = ?`,[atm_numer, emp_id])
        res.redirect('/atm-list')
    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.atmEmpDelete = async function (req,res){
    try {
        let { rowid_del } = req.body
        let result = await mysql.queryAsync(`DELETE FROM _node_atm_list WHERE id = ? `,[rowid_del])
        res.redirect('/atm-list')
    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.atmReport = async function (req,res){
    const row = await mysql.queryAsync(`SELECT 
    CONCAT(t1.fname, " ", t1.mname, " ", t1.lname) as full_name, t2.atm_number,t2.canditate_id,t2.id
    FROM _node_candidate_info t1 INNER JOIN _node_atm_list t2 ON t1.id = t2.canditate_id`)
    const wb = new xl.Workbook(),
    ws = wb.addWorksheet('Payroll Contribution'),
    myStyle = wb.createStyle({
      font: {
        size: 12,
      },
      alignment:{
        horizontal: ['center']
      } 
    }),
    boldStyle = {
      font: {
        color: '#237964',  
        size: 12,
        bold: true,
        underline: true
      },
        font: {size: 12, bold: true, color: '#008000' }
    }
    ws.column(1).setWidth(100)
    ws.row(1).setHeight(30)
    ws.cell(1,1).string(`GREEN PASTURE RECRUITMENT AGENCY CORP.\n SUMMARY ATM NUMBER`).style(boldStyle)
    
    ws.column(1).setWidth(30)
    ws.column(2).setWidth(20)
    ws.cell(2,1).string('FULLNAME').style(myStyle)
    ws.cell(2,2).string('ATM NUMBER').style(myStyle)
    for (let i = 0; i < row.length; i++) {
        let p = row[i]
        ws.cell(3+i,1).string(p.full_name).style(myStyle)
        ws.cell(3+i,2).string(p.atm_number).style(myStyle)
    }
    wb.write(`atm-employee-list.xlsx`,res);
}