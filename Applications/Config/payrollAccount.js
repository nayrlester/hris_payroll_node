const _ = require('lodash');
const xl = require('excel4node');
const moment = require('moment')
const uc = require('upper-case')
const trim = require('trim')
const path = require('path');
const fs = require('fs')
const accounting = require('accounting')


exports.payroll = async function (req, res) {
  const {daterange} = req.query,
    menu = req.menu,
    loanTypes = await mysql.queryAsync(`SELECT * FROM _node_loan_type WHERE link != ?  `, ['']),
    client = await mysql.queryAsync(`SELECT * FROM _node_org_client`);
    adjusment = await mysql.queryAsync(`SELECT * FROM _node_adjustment`);
    
    var ex_contract = req.ex_contract;
    var notif = req.notif;
    var notif_details = req.notif_details;
    var ex_details = req.ex_details;
  res.render('payrollAccount/index.ejs',{menu ,adjusment, loanTypes , client, daterange,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details });
}