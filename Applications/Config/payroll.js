const _ = require('lodash');
const xl = require('excel4node');
const moment = require('moment')
const uc = require('upper-case')
const trim = require('trim')
const path = require('path');
const fs = require('fs')
const accounting = require('accounting')

 //jade
 exports.payrollRate = async function(req, res){
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    const menu = req.menu;
    const row = await mysql.queryAsync(`SELECT client_name,id FROM _node_org_client`);
    res.render('payroll_rate/index', { menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details,client_list:row});
  }

  exports.payrollRateList = async function(req, res){
     const { id } = req.query
     const tCompanyId = (id == "" ) ?   't3.company_id' :id
     console.log(tCompanyId) 
     const data = await mysql.queryAsync(`SELECT t4.job_title,t2.basic_sal,t3.cola,t3.sea,t3.ctpa,t3.ot,t3.nd,t3.ot_nd,t3.lh_rate,t3.lh_ot,t3.lh_nd,t3.sh_ot_nd
     FROM _node_candidate_info t1 
     INNER JOIN _node_user_information t2 ON t1.id = t2.candidate_id
     INNER JOIN _node_payroll_settings t3 ON t2.company_id = ${tCompanyId}
     INNER JOIN _node_job_title t4 ON t4.id = t3.job_id`)
 
     res.writeHead(200, {'Content-Type': 'application/json'});  
     res.end(JSON.stringify(data));
  }

  exports.payrollBenifits = async function(req, res){
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    const menu = req.menu,
    client = await mysql.queryAsync(`select id, client_name from _node_org_client`)
    res.render('payroll_benifits/index', { menu, client,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  }

  exports.payrollBenifitsSearch = async function(req, res){
    const  { pid, value, excell, datefrom, dateto } = req.query,
    whereDate = (excell == "export" && excell != "" || excell == "search") ? 'AND CAST(date_from as date) >= ? AND CAST(date_from as date) <= ?' : "",
    date_from = moment(new Date(trim(datefrom)).toISOString()).format().slice(0,10),
    date_to = moment(new Date(trim(dateto)).toISOString()).format().slice(0,10),
    filedate = moment().format('MM-DD-YYYY hmmssSS')
    switch (value) {
      case 'philhealth':
      var contributions = `t3.phil_health as employee,t3.e_philhealth as employer,t3.phil_health+t3.e_philhealth as net_total`
      break;
      case 'pagibig':
      var contributions = `t3.pag_ibig as employee,t3.e_pagibig as employer,t3.pag_ibig+t3.e_pagibig as net_total`
      break;
      case 'sss':
      var contributions = `t3.sss as employee,t3.e_sss as employer,t3.sss+t3.e_sss as net_total`
      break;
      case 'tax':
      var contributions = `t3.tax as employee,t3.add_tax as employer,t3.tax+t3.add_tax as net_total`
      break;
    }
    const row = await mysql.queryAsync(`SELECT t1.lname,t1.fname,t1.mname,t2.company_id,t2.basic_sal,${contributions}
    FROM _node_candidate_info t1 
    INNER JOIN _node_user_information t2 ON t1.id = t2.candidate_id 
    INNER JOIN _node_payroll t3 ON t2.emp_id = t3.user_id 
    WHERE t2.company_id = ? ${whereDate} `, (excell == "export" && excell != "" || excell == "search") ? [pid, date_from, date_to] : [pid]),
    clientName = await mysql.queryAsync(`SELECT client_name FROM _node_org_client WHERE id = ?`, [pid]),
    data = (row.length == 0) ? 0 : row
    if(excell != "" && row.length != 0 && excell == "export"){
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
      header = wb.createStyle({
        font: {
          size: 12,bold: true
        },
        alignment:{
          horizontal: ['center']
        } 
      }),
      numberFormat = { 
        font: {size: 12},
        numberFormat: '#,##0.00; (#,##0.00); -',
        alignment:{
          horizontal: ['center']
        } 
      },
      boldStyle = {
        font: {size: 12, bold: true, color: '#008000' }
      }
      ws.column(1).setWidth(80)
      ws.row(1).setHeight(30)
      ws.cell(1,1).string(`GREEN PASTURE RECRUITMENT AGENCY CORP.\n SUMMARY OF ${uc(value)} CONTRIBUTION-ALTA ${uc(clientName[0].client_name)} \n`).style(boldStyle)
      ws.column(1).setWidth(30)
      ws.column(2).setWidth(20)
      ws.column(3).setWidth(15)
      ws.column(4).setWidth(15)
      ws.column(5).setWidth(15)
      ws.cell(2,1).string('FULLNAME').style(header)
      ws.cell(2,2).string('BASIC SALARY').style(header)
      ws.cell(2,3).string('EMPLOYEE').style(header)
      ws.cell(2,4).string('EMPLOYER').style(header)
      ws.cell(2,5).string('TOTAL').style(header)

      var totalNet = 0,
      empTotal = 0,
      emprTotal = 0
      for (let i = 0; i < row.length; i++) {
        let p = row[i]
        totalNet = totalNet + p.net_total
        empTotal = empTotal + p.employee
        emprTotal = emprTotal + p.employer
        ws.cell(3+i,1).string(`${uc(p.lname)} ${uc(p.fname)} ${uc(p.mname)}`).style(myStyle)
        ws.cell(3+i,2).number(p.basic_sal).style(numberFormat)
        ws.cell(3+i,3).number(p.employee).style(numberFormat)
        ws.cell(3+i,4).number(p.employer).style(numberFormat)
        ws.cell(3+i,5).number(p.net_total).style(numberFormat)
        var cellTotal = 3 + i
      }
      
      ws.cell(cellTotal + 1 ,2).string('TOTAL:').style(header)
      ws.cell(cellTotal + 1 ,3).number(empTotal).style(numberFormat)
      ws.cell(cellTotal + 1 ,4).number(emprTotal).style(numberFormat)
      ws.cell(cellTotal + 1 ,5).number(totalNet).style(numberFormat)
      wb.write(`payroll-benifits-${filedate}.xlsx`,res);
    }else{
      res.writeHead(200, {'Content-Type': 'application/json'});  
      res.end(JSON.stringify({data}));
    }
  }


  exports.payrollRateExport = async function(req, res){
    const row = await mysql.queryAsync(`SELECT t4.job_title,t2.basic_sal,t3.cola,t3.sea,t3.ctpa,t3.ot,t3.nd,t3.ot_nd,t3.lh_rate,t3.lh_ot,t3.lh_nd,t3.sh_ot_nd
     FROM _node_candidate_info t1 
     INNER JOIN _node_user_information t2 ON t1.id = t2.candidate_id
     INNER JOIN _node_payroll_settings t3 ON t2.company_id = t3.company_id
     INNER JOIN _node_job_title t4 ON t4.id = t3.job_id`),
    filedate = moment().format('MM-DD-YYYY_hmmssSS')
     if(row.length != 0){
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
        numberFormat = { 
          font: {size: 12},
          numberFormat: '#,##0.00; (#,##0.00); -'
        },
        boldStyle = {
          font: {size: 12, bold: true, color: '#008000' }
        }
        ws.column(1).setWidth(100)
        ws.row(1).setHeight(30)
        ws.cell(1,1).string(`GREEN PASTURE RECRUITMENT AGENCY CORP.\n SUMMARY PAYROLL RATE`).style(boldStyle)
        ws.column(1).setWidth(25)
        ws.column(2).setWidth(15)
        ws.column(3).setWidth(15)
        ws.column(4).setWidth(15)
        ws.column(5).setWidth(15)
        ws.cell(2,1).string('Job Description').style(myStyle)
        ws.cell(2,2).string('Daily Rate').style(myStyle)
        ws.cell(2,3).string('Cola').style(myStyle)
        ws.cell(2,4).string('SEA').style(myStyle)
        ws.cell(2,5).string('CTPA').style(myStyle)
        ws.cell(2,5).string('Reg OT Rate').style(myStyle)
        ws.cell(2,5).string('Nigth Diff Rate').style(myStyle)
        for (let i = 0; i < row.length; i++) {
          let p = row[i]
          ws.cell(3+i,1).string(row[i].job_title).style(myStyle)
          ws.cell(3+i,2).number(row[i].basic_sal).style(numberFormat)
          ws.cell(3+i,3).number(row[i].cola).style(numberFormat)
          ws.cell(3+i,4).number(row[i].sea).style(numberFormat)
          ws.cell(3+i,5).number(row[i].ctpa).style(numberFormat)
          ws.cell(3+i,5).number(row[i].ot).style(numberFormat)
          ws.cell(3+i,5).number(row[i].nd).style(numberFormat)
        }
        wb.write(`payroll-rate-${filedate}.xlsx`,res);
      }
  }



  exports.payrollHistory = async function (req, res) {
   const menu = req.menu,
    ex_contract = req.ex_contract;
    notif = req.notif;
    notif_details = req.notif_details;
    ex_details = req.ex_details;
    client = await mysql.queryAsync(`select id, client_name from _node_org_client`),
    obj = req.query

  let daterange  =  '',
    clientId =  '',
    clientQuery = '',
    details = [],
    query = [],
    alpha = 0


  if (obj.hasOwnProperty('daterange')) {
    daterange = obj.daterange
    dateQuery = daterange.split(' - ')
  }

  if (obj.hasOwnProperty('alpha')) {
    if(obj.alpha == "on") alpha = 1
    else alpha = 0
  }

  if (obj.hasOwnProperty('clientId')) {
    clientId = obj.clientId;
    if(clientId) clientQuery = ` AND nui.company_id = ${clientId}`;
  }


  if (daterange.length > 0) {
    const addAlpha = (alpha == 1) ? ` LEFT JOIN _node_candidate_govt_id ncgi on ncgi.candidate_id = nci.id` : ``,
      addField = (alpha == 1) ? ` , ncgi.tin_id` : ``
    query = await mysql.queryAsync(`
      SELECT 
        np.*,
        CONCAT(nci.fname,' ',nci.mname,' ',nci.lname) AS name,
        DATE_FORMAT(np.date_from,'%m-%d-%Y') as d_from,
        DATE_FORMAT(np.date_to,'%m-%d-%Y') as d_to,
        noc.client_name,
        CONCAT( MONTHNAME(np.date_from), ' ', YEAR(np.date_from) ) as cuttoff ${addField}
      FROM _node_payroll np
      INNER JOIN _node_user_information nui on
      nui.emp_id = np.user_id
      INNER JOIN _node_candidate_info nci on
      nci.id = nui.candidate_id
      INNER JOIN _node_org_client noc on
      noc.id = nui.company_id
      ${addAlpha}
      where 
      DATE_FORMAT(np.date_from,'%m-%d-%Y') >= ? and  DATE_FORMAT(np.date_to,'%m-%d-%Y') <= ? ${clientQuery}` , [dateQuery[0], dateQuery[1]])
   
    _.each(query, function(obj, row) {
      query[row].net = accounting.formatMoney(query[row].net, "")
      query[row].gross = accounting.formatMoney(query[row].gross, "")
      query[row].rate = accounting.formatMoney(query[row].rate, "")

      query[row].tax = accounting.formatMoney(query[row].tax + query[row].add_tax , "")
      query[row].philhealth = accounting.formatMoney(query[row].phil_health + query[row].e_philhealth, "")
      query[row].pagibig = accounting.formatMoney(query[row].pag_ibig + query[row].e_pagibig, "") 
      query[row].sss = accounting.formatMoney(query[row].sss + query[row].e_sss, "") 
    });

  }
  const user = req.session.user
  res.render('payroll_history/index', { alpha, menu, client, ex_contract, notif, notif_details, ex_details, daterange, clientId, query, user });

  }
  
  exports.payrollHistoryPrint = async function (req, res) {
   const menu = req.menu,
    ex_contract = req.ex_contract;
    notif = req.notif;
    notif_details = req.notif_details;
    ex_details = req.ex_details;
    client = await mysql.queryAsync(`select id, client_name from _node_org_client`),
    obj = req.query
  let daterange  =  '',
    clientId =  '',
    clientQuery = '',
    details = [],
    query = [],
    alpha = 0


  if (obj.hasOwnProperty('alpha')) {
    if(obj.alpha == 1) alpha = 1
    else alpha = 0
  }

  if (obj.hasOwnProperty('daterange')) {
    daterange = obj.daterange
    dateQuery = daterange.split(' - ')
    console.log(dateQuery)
  }

  if (obj.hasOwnProperty('clientId')) {
    clientId = obj.clientId;
    if(clientId) clientQuery = `AND nui.company_id = ${clientId}`;
  }

  if (daterange.length > 0) {
    const addAlpha = (alpha == 1) ? ` LEFT JOIN _node_candidate_govt_id ncgi on ncgi.candidate_id = nci.id` : ``,
      addField = (alpha == 1) ? ` , ncgi.tin_id` : ``

    query = await mysql.queryAsync(`
      SELECT 
        np.*,
        CONCAT(nci.fname,' ',nci.mname,' ',nci.lname) AS name,
        DATE_FORMAT(np.date_from,'%m-%d-%Y') as d_from,
        DATE_FORMAT(np.date_to,'%m-%d-%Y') as d_to,
        noc.client_name,
        CONCAT( MONTHNAME(np.date_from), ' ', YEAR(np.date_from) ) as cuttoff ${addField}
      FROM _node_payroll np
      INNER JOIN _node_user_information nui on
      nui.emp_id = np.user_id
      INNER JOIN _node_candidate_info nci on
      nci.id = nui.candidate_id
      INNER JOIN _node_org_client noc on
      noc.id = nui.company_id
      ${addAlpha}
      where 
      DATE_FORMAT(np.date_from,'%m/%d/%Y') >= ? and  DATE_FORMAT(np.date_to,'%m/%d/%Y') <= ? ${clientQuery}` , [dateQuery[0], dateQuery[1]])
    
    _.each(query, function(obj, row) {
      query[row].net = accounting.formatMoney(query[row].net, "")
      query[row].gross = accounting.formatMoney(query[row].gross, "")
      query[row].rate = accounting.formatMoney(query[row].rate, "")

      query[row].tax = accounting.formatMoney(query[row].tax + query[row].add_tax , "")
      query[row].philhealth = accounting.formatMoney(query[row].phil_health + query[row].e_philhealth, "")
      query[row].pagibig = accounting.formatMoney(query[row].pag_ibig + query[row].e_pagibig, "") 
      query[row].sss = accounting.formatMoney(query[row].sss + query[row].e_sss, "") 
    });

  }

  res.render('payroll_history/print', { alpha, menu, client, ex_contract, notif, notif_details, ex_details, daterange, clientId, query });

  }

  exports.wageSalaryDetails = async function (req, res) {
    const menu = req.menu,
     ex_contract = req.ex_contract;
     notif = req.notif;
     notif_details = req.notif_details;
     ex_details = req.ex_details;
     client = await mysql.queryAsync(`select id, client_name from _node_org_client`),
     obj = req.query
     let daterange  =  '',
     clientId =  '',
     clientQuery = null,
     details = [],
     query = []
 
   if (obj.hasOwnProperty('daterange')) {
     daterange = obj.daterange
     dateQuery = daterange.split(' - ')
   }

   if (obj.hasOwnProperty('clientId')) {
    clientId = obj.clientId
    clientQuery = clientId
  }
  const user = req.session.user
   res.render('wage_salary_details/index', { menu, client, ex_contract, notif, notif_details, ex_details, daterange, clientId, user });
 
  }

  exports.payrollPrint = async function(req, res) {
    const obj = req.query

    let daterange  =  '',
     clientId =  '',
     clientQuery = '',
     details = [],
     query = [],
     rate = {
      ot: {
        text: 'Regular OT',
        hours: 0,
        amt: 0
      },
nd           :{
        text: 'Regular ND',
        hours: 0,
        amt: 0
      },
ot_nd        :{
        text: 'Regular OT-ND',
        hours: 0,
        amt: 0
      },
lh_rate      :{
        text: 'Legal Holiday',
        hours: 0,
        amt: 0
      },
lh_ot        :{
        text: 'Legal Holiday OT',
        hours: 0,
        amt: 0
      },
lh_nd        :{
        text: 'Legal Holiday ND',
        hours: 0,
        amt: 0
      },
lh_ot_nd     :{
        text: 'Legal Holiday OT-ND',
        hours: 0,
        amt: 0
      },
sh_rate      :{
        text: 'Special Holiday',
        hours: 0,
        amt: 0
      },
sh_ot        :{
        text: 'Special Holiday OT',
        hours: 0,
        amt: 0
      },
sh_nd        :{
        text: 'Special Holiday ND',
        hours: 0,
        amt: 0
      },
sh_ot_nd     :{
        text: 'Special Holiday ND-OT',
        hours: 0,
        amt: 0
      },
sh_rdot      :{
        text: 'SH RD OT',
        hours: 0,
        amt: 0
      },
lh_rdot      :{
        text: 'LH RD OT',
        hours: 0,
        amt: 0
      },
day_off :{
        text: 'Work DayOff',
        hours: 0,
        amt: 0
      }
      
    }
 
   if (obj.hasOwnProperty('daterange')) {
     daterange = obj.daterange
     dateQuery = daterange.split(' - ')
   }

   if (obj.hasOwnProperty('clientId')) {
    clientId = obj.clientId
    if(clientId.length > 0)clientQuery = ` AND nui.company_id = ${clientId}`
  }
  
  if (daterange.length > 0) {
    query = await mysql.queryAsync(`
      SELECT 
        np.*,
        nps.*,
        CONCAT(nci.fname,' ',nci.mname,' ',nci.lname) AS name,
        DATE_FORMAT(np.date_from,'%m-%d-%Y') as d_from,
        DATE_FORMAT(np.date_to,'%m-%d-%Y') as d_to,
        noc.client_name,
        CONCAT( MONTHNAME(np.date_from), ' ', YEAR(np.date_from) ) as cuttoff,
        np.id as payroll_id
      FROM _node_payroll np
      INNER JOIN _node_user_information nui on
      nui.emp_id = np.user_id
      INNER JOIN _node_candidate_info nci on
      nci.id = nui.candidate_id
      INNER JOIN _node_org_client noc on
      noc.id = nui.company_id
      INNER JOIN _node_payroll_settings nps on
      nps.id = np.payroll_settings
      where 
      DATE_FORMAT(np.date_from,'%m/%d/%Y') >= ? and  DATE_FORMAT(np.date_to,'%m/%d/%Y') <= ? ${clientQuery}` , [dateQuery[0], dateQuery[1]])
   
      for( let row = 0; row < query.length; row++) {
        let payrollDetails = await mysql.queryAsync(`SELECT * from _node_payroll_details where payroll_id = ?`, [query[row].payroll_id]),
          loanTotal = await mysql.queryAsync(`SELECT ifnull(sum(amount_paid), 0) as amount from _node_loan_details where payroll_id = ?` ,[query[row].id])
        
        query[row]["payroll_details"] = {}
        
        _.each(rate, function(obj, code) {
          const val = _.find(payrollDetails, {code})
          if (val) {
            query[row]["payroll_details"][code] = {
              hours: val.hours,
              amt: val.hours * query[row].rate * query[row][code]
            }
          } else {
            query[row]["payroll_details"][code] = {
              hours: 0,
              amt: 0
            }
          }
        })

        query[row].net = accounting.formatMoney(query[row].net, "")
        query[row].gross = accounting.formatMoney(query[row].gross, "")
        query[row].rate = accounting.formatMoney(query[row].rate, "")
        query[row].loan = loanTotal[0].amount
        query[row].tax = accounting.formatMoney(query[row].tax + query[row].add_tax , "")
        query[row].philhealth = accounting.formatMoney(query[row].phil_health + query[row].e_philhealth, "")
        query[row].pagibig = accounting.formatMoney(query[row].pag_ibig + query[row].e_pagibig, "") 
        query[row].sss = accounting.formatMoney(query[row].sss + query[row].e_sss, "") 

      }
    }
    //res.writeHead(200, {'Content-Type': 'application/json'});  
    //res.end(JSON.stringify(query));
    res.render('wage_salary_details/print', { query, rate, daterange });
 
  }

  