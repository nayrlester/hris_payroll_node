const _ = require('lodash');
const company_name = "GREEN PASTURE RECRUITMENT AGENCY CORP.";
const PDFDocument = require('pdfkit');
const xl = require('excel4node');
const moment = require('moment')
const uc = require('upper-case')
const path = require('path');
const fs = require('fs')

//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
  req.session.destroy(function(err) {
     req.session = null ;
     res.redirect("/login");
  })
};
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
  message = '';
  if(req.method == "POST"){
     var post  = req.body;
     var uname= post.uname;
     var pass= post.pass;
     var fname= post.fname;
     var mname= post.mname;
     var lname= post.lname;
     var date=  new Date('yyyy-mm-dd');

     var sql = "INSERT INTO `_node_users`(`username`, `password`,`fname`,`mname`,`lname`,`date_created`) VALUES ('" + uname + "','" + pass + "','" + fname + "','" + mname + "','" + lname + "','" + date + "')";

     var query = db.query(sql, function(err, result) {

        message = "Succesfully! Your account has been created.";
        res.render('sign_up/index.ejs',{message: message});
     });

  } else {
     res.render('sign_up/index.ejs');
  }
};

//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
  var message = '';
  var sess = req.session; 

  if(req.method == "POST"){
     var post  = req.body;
     var name= post.uname;
     var pass= post.pass;
     var sql="SELECT * FROM `_node_users` WHERE `username`='"+name+"' and password = '"+pass+"'";                           
     db.query(sql, function(err, results){     
        if(results.length){
           req.session.userId = results[0].id;
           req.session.user = results[0];
           res.redirect('/home/dashboard');
        }
        else{
           message = 'Wrong Credentials.';
           res.render('login/index.ejs',{message: message});
        }
                
     });
  } else {
     res.render('login/index.ejs',{message: message});
  }
          
};       
//--------------------------------render menu by ID--------------------------------
exports.menu = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }

 var sql="SELECT t2.* FROM _node_users t1 INNER JOIN _node_flow_mngt t4 ON t4.role_id = t1. user_role LEFT JOIN _node_main_link t2 ON t2.id = t4.link_id  WHERE t1.id='"+userId+"' Order By t4.id";
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};


//----------------------------------------------- rd page functionality----------------------------------------------
          
exports.dashboard = function(req, res, next){
          
  var data =  req.session.user,
  userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT t1.*,t2.* FROM _node_users t1 INNER JOIN _node_flow_mngt t4 ON t4.role_id = t1. user_role LEFT JOIN _node_main_link t2 ON t2.id = t4.link_id  WHERE t1.id='"+userId+"' ";
  db.query(sql, function(err, results){  
     var menu = req.menu;
     var total_emp = req.total_emp;
      var total_vacancy = req.total_vacancy;
      var total_clients = req.total_clients;
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
      res.render('home/index.ejs', {data:results,total_clients:total_clients,total_vacancy:total_vacancy,total_emp:total_emp,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details}); 
  });       
};

//--------------------------------render userList--------------------------------
exports.userList = function(req, res){
  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT t1.*,t2.fname,t2.mname,t2.lname,t4.description FROM _node_users t1 INNER JOIN _node_user_information t3 ON t3. emp_id= t1.emp_id INNER JOIN _node_candidate_info t2 ON  t3.candidate_id = t2.id INNER JOIN _node_user_role t4 ON t4.id = t1.user_role where t2.id != 1";          
  db.query(sql, function(err, result){  
     var role  = req.role;
     var menu = req.menu;
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('user/index.ejs',{data:result,role:role,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render userRole--------------------------------
exports.userRole = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_user_role`";          
  db.query(sql, function(err, result){  
     var menu = req.menu;
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('user_role/index.ejs',{data:result,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render org--------------------------------
exports.org = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_org_client`";          
  db.query(sql, function(err, result){  
     var menu = req.menu;
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('org/client/index.ejs',{data:result,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};

//--------------------------------render org_client--------------------------------
exports.org_client = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
  const menu = req.menu,
  data_id = req.params.id,

    data = await mysql.queryAsync(`SELECT * FROM _node_org_client where id = ?`, [data_id]),
    sss = await mysql.queryAsync(`SELECT * FROM _node_sss_deduc_include where company_id = ?`, [data_id]);
    ph = await mysql.queryAsync(`SELECT * FROM _node_ph_deduc_include where company_id = ?`, [data_id]);

      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('org/client_details/index.ejs', { menu, data, data_id,sss,ph,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}
//--------------------------------render org dept--------------------------------
exports.org_dept = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_org_dept`";          
  db.query(sql, function(err, result){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('org/department/index.ejs',{data:result,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render department by ID--------------------------------
exports.department_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.query.id;
 var sql="SELECT * FROM `_node_org_dept` where id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render region--------------------------------
exports.region = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_region`";          
  db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('region/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render region by ID--------------------------------
exports.region_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.query.id;
 var sql="SELECT * FROM `_node_region` where id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render job_allowance--------------------------------
exports.job_allowance = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_job_allowance`";          
  db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('job_module/allowance/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render allowance by ID--------------------------------
exports.allowance_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.query.id;
 var sql="SELECT * FROM `_node_job_allowance` where id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render job_employment_stat--------------------------------
exports.job_employment_stat = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_job_employment_stat`";          
  db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('job_module/employment_stat/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render employment_stat by ID--------------------------------
exports.employment_stat_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.query.id;
 var sql="SELECT * FROM `_node_job_employment_stat` where id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render job_title--------------------------------
exports.job_title = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_job_title`";          
  db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('job_module/job_title/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render job_title by ID--------------------------------
exports.job_title_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.query.id;
 var sql="SELECT * FROM `_node_job_title` where id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render job_pay_grade--------------------------------
exports.job_pay_grade = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_job_pay_grade`";          
  db.query(sql, function(err, results){  
   var menu = req.menu;
   var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('job_module/pay_grade/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render pay_grade by ID--------------------------------
exports.pay_grade_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.query.id;
 var sql="SELECT * FROM `_node_job_pay_grade` where id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render job_shift--------------------------------
exports.job_shift = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_job_work_shift`";          
  db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('job_module/work_shift/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render work shift by ID--------------------------------
exports.work_shift_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.query.id;
 var sql="SELECT * FROM `_node_job_work_shift` where id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render rec_candidate--------------------------------
exports.rec_candidate = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_candidate_info` where employment_stat_update = 1";          
  db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('recruitment/candidates/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render rec_candidate_info--------------------------------
exports.rec_candidate_info = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var id = req.query.id;
  var sql="SELECT * FROM `_node_candidate_info` where id = '"+id+"' ";  

  db.query(sql, function(err, results){  
   var menu = req.menu;
     res.render('recruitment/candidates/candidate_info.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render vacancies--------------------------------
exports.vacancies = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }
  var sql="SELECT  t1.id,t1.total_position,t1.range_from,t1.range_to,t2.client_name,t3.job_title,t4.description AS dept,t5.description AS region,t6.shift_name,t6.shift_from,t6.shift_to,t6.shift_type FROM _node_vacancy t1 INNER JOIN _node_org_client t2 ON t2.id = t1.comp_id INNER JOIN _node_job_title t3 ON t3.id = t1.job_id INNER JOIN _node_org_dept t4 ON t4.id = t1.dept_id INNER JOIN _node_region t5 ON t5.id = t1.region_id INNER JOIN _node_job_work_shift t6 ON t6.id = t1.work_shift";          
  db.query(sql, function(err, results){  
     var menu = req.menu;
     var client_data = req.client;
     var job_title = req.job_title;
     var region = req.region;
     var work_shift = req.shift;
     var dept = req.dept;
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('recruitment/vacancy/index.ejs',{data:results,client:client_data,job:job_title,region_data:region,shift_data:work_shift,dept_data:dept,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});

  });
};
//--------------------------------render vacancy by ID--------------------------------
exports.vacancy_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.query.id;
 var sql="SELECT  t1.id,t1.total_position,t1.range_from,t1.range_to,t2.client_name,t3.job_title,t4.description AS dept,t5.description AS region,t6.* FROM _node_vacancy t1 INNER JOIN _node_org_client t2 ON t2.id = t1.comp_id INNER JOIN _node_job_title t3 ON t3.id = t1.job_id INNER JOIN _node_org_dept t4 ON t4.id = t1.dept_id INNER JOIN _node_region t5 ON t5.id = t1.region_id INNER JOIN _node_job_work_shift t6 ON t6.id = t1.work_shift where t1.id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render change_stat--------------------------------
exports.change_stat = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT t1.id,t1.emp_id,t2.fname,t2.mname,t2.lname,t3.description,t1.contract_start,t1.contract_end FROM _node_user_information t1 INNER JOIN _node_candidate_info t2 ON t1. candidate_id = t2.id INNER JOIN _node_job_employment_stat t3 ON t3.id = t1.emp_status";          
  db.query(sql, function(err, results){  
   var menu = req.menu;
     var stat = req.status;
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('recruitment/change_stat/index.ejs',{data:results,stat:stat,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render discipline--------------------------------
exports.discipline = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT t1.*,CONCAT(t2.fname,' ',t2.mname,' ',t2.lname) AS NAME,t3.description AS department FROM _node_discipline t1 INNER JOIN _node_user_information t6 ON t1.emp_id = t6.emp_id INNER JOIN _node_candidate_info t2 ON t2.id = t6.candidate_id INNER JOIN _node_org_dept t3 ON t3.id = t1.assignment";          
  db.query(sql, function(err, results){  
   var menu = req.menu;
     var dept = req.dept;
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('recruitment/discipline/index.ejs',{data:results,dept:dept,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render sil--------------------------------
exports.sil = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }

 var sql="SELECT t1.emp_id,t1.contract_start,t1.contract_end,t2.fname,t2.mname,t2.lname FROM _node_user_information t1 INNER JOIN _node_candidate_info t2 ON t1.candidate_id = t2.id WHERE t1.emp_status != 1 AND t1.emp_status != 6";          
 db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    res.render('sil/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
 });
};
//--------------------------------render sss--------------------------------
exports.sss = async function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }

 var sql='SELECT t1.id, t1.date_created, t1.loan_status, t1.months_to_pay,t1.term, t1.monthly_payment, t1.emp_id,t1.loan_amount,SUM(t1.amount_paid) AS total_dep,MAX(t1.loan_status) AS stat,CONCAT(t2.fname," ",t2.mname," ",t2.lname) AS fullname FROM _node_loans t1 INNER JOIN _node_user_information t3 ON t3.emp_id=t1.emp_id INNER JOIN _node_candidate_info t2 ON t3.candidate_id = t2.id INNER JOIN _node_loan_type t5 ON t5.id = t1.loan_type_id  WHERE t1.loan_type_id= 1';        
 sql = 'select * from _node_users';
 let results = await mysql.queryAsync(sql)
   users = await mysql.queryAsync('SELECT CONCAT(fname, " ", mname, " ", lname) as full_name, id from _node_candidate_info'),
   menu = req.menu;
  results = [];
  var ex_contract = req.ex_contract;
  var notif = req.notif;
  var notif_details = req.notif_details;
  var ex_details = req.ex_details;
 res.render('loan/sss/index.ejs',{data:results, menu:menu, users,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
};
//--------------------------------render pagibig--------------------------------
exports.pagibig = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }

 var sql='SELECT t1.id,t1.date_created,t1.loan_status,t1.months_to_pay,t1.term,t1.monthly_payment,t1.emp_id,t1.loan_amount,SUM(t1.amount_paid) AS total_dep,MAX(t1.loan_status) AS stat,CONCAT(t2.fname," ",t2.mname," ",t2.lname) AS fullname FROM _node_loans t1 INNER JOIN _node_user_information t3 ON t3.emp_id=t1.emp_id INNER JOIN _node_candidate_info t2 ON t3.candidate_id = t2.id INNER JOIN _node_loan_type t5 ON t5.id = t1.loan_type_id  WHERE t1.loan_type_id= 2';          
 db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    res.render('loan/pagibig/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
 });
};
//--------------------------------render sal_loan--------------------------------
exports.sal_loan = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }

 var sql='SELECT t1.id,t1.date_created,t1.loan_status,t1.months_to_pay,t1.term,t1.monthly_payment,t1.emp_id,t1.loan_amount,SUM(t1.amount_paid) AS total_dep,MAX(t1.loan_status) AS stat,CONCAT(t2.fname," ",t2.mname," ",t2.lname) AS fullname FROM _node_loans t1 INNER JOIN _node_user_information t3 ON t3.emp_id=t1.emp_id INNER JOIN _node_candidate_info t2 ON t3.candidate_id = t2.id INNER JOIN _node_loan_type t5 ON t5.id = t1.loan_type_id  WHERE t1.loan_type_id= 3';          
 db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    res.render('loan/sal_loan/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
 });
};
//--------------------------------render cal_loan--------------------------------
exports.cal_loan = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }

 var sql='SELECT t1.id,t1.date_created,t1.loan_status,t1.months_to_pay,t1.term,t1.monthly_payment,t1.emp_id,t1.loan_amount,SUM(t1.amount_paid) AS total_dep,MAX(t1.loan_status) AS stat,CONCAT(t2.fname," ",t2.mname," ",t2.lname) AS fullname FROM _node_loans t1 INNER JOIN _node_user_information t3 ON t3.emp_id=t1.emp_id INNER JOIN _node_candidate_info t2 ON t3.candidate_id = t2.id INNER JOIN _node_loan_type t5 ON t5.id = t1.loan_type_id  WHERE t1.loan_type_id= 4';          
 db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    res.render('loan/cal_loan/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
 });
};
//------------------------------- -render cash_advance --------------------------------
exports.cash_advance = function(req, res){

 var userId = req.session.userId; 
 if(userId == null){
    res.redirect("/login");
    return;
 }

 var sql='SELECT t1.id,t1.date_created,t1.loan_status,t1.months_to_pay,t1.term,t1.monthly_payment,t1.emp_id,t1.loan_amount,SUM(t1.amount_paid) AS total_dep,MAX(t1.loan_status) AS stat,CONCAT(t2.fname," ",t2.mname," ",t2.lname) AS fullname FROM _node_loans t1 INNER JOIN _node_user_information t3 ON t3.emp_id=t1.emp_id INNER JOIN _node_candidate_info t2 ON t3.candidate_id = t2.id INNER JOIN _node_loan_type t5 ON t5.id = t1.loan_type_id  WHERE t1.loan_type_id= 5';          
 db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    res.render('loan/cash_advance/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
 });
};
//--------------------------------render maternity--------------------------------
exports.maternity = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }

 var sql='SELECT t1.id,t1.date_created,t1.loan_status,t1.months_to_pay,t1.term,t1.monthly_payment,t1.emp_id,t1.loan_amount,SUM(t1.amount_paid) AS total_dep,MAX(t1.loan_status) AS stat,CONCAT(t2.fname," ",t2.mname," ",t2.lname) AS fullname FROM _node_loans t1 INNER JOIN _node_user_information t3 ON t3.emp_id=t1.emp_id INNER JOIN _node_candidate_info t2 ON t3.candidate_id = t2.id INNER JOIN _node_loan_type t5 ON t5.id = t1.loan_type_id  WHERE t1.loan_type_id= 6';          
 db.query(sql, function(err, results){  
   var menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    res.render('loan/maternity/index.ejs',{data:results,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
 });
};
//--------------------------------render contact--------------------------------
exports.contact = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_users` WHERE `id`='"+userId+"'";          
  db.query(sql, function(err, results){  
     res.render('contact/index.ejs',{data:results});
  });
};


// *************************************************************************** POST AREA ************************************************************************************************

//--------------------------------render update user list--------------------------------
exports.updateUsers = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var uname= post.uname;
     var pass= post.pass;
     var role= post.role;
     var date=  new Date();

     var sql = "Update `_node_users` set `username`='" + uname + "' , `password` ='" + pass + "' ,`user_role`='" + role + "',`date_created`='" + date + "'  where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('userList');
     });

  } else {
     res.render('user/index.ejs');
  }
};
//--------------------------------render update user role--------------------------------
exports.updateUserRole = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var desc= post.desc;

     var sql = "Update `_node_user_role` set `description`='" + desc + "' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('userRole');
     });

  } else {
     res.render('user_role/index.ejs');
  }
};
//--------------------------------render delete user role--------------------------------
exports.deleteUserRole = function(req, res){
  if(req.method == "POST"){
     var post   = req.body;
     var row_id = post.rowid_del;

     var sql = "DELETE FROM `_node_user_role` WHERE id='" + row_id + "'";

     var query = db.query(sql, function(err, result) {
        if (err) throw err;
        res.redirect('userRole');
     });

  } else {
     res.render('user_role/index.ejs');
  }
};
//--------------------------------render update department--------------------------------
exports.updateDept = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var desc= post.desc;

     var sql = "Update `_node_org_dept` set `description`='" + desc + "' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('org_dept');
     });

  } else {
     res.render('org/department/index.ejs');
  }
};
//--------------------------------render delete department--------------------------------
exports.deleteDept = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid_del;

     var sql = "Delete from `_node_org_dept` where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('org_dept');
     });

  } else {
     res.render('org/department/index.ejs');
  }
};
//--------------------------------render add department--------------------------------
exports.addDept = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var desc= post.desc;

     var sql = "Insert into `_node_org_dept` (`description`) values ('"+ desc +"') ";

     var query = db.query(sql, function(err, result) {

        res.redirect('org_dept');
     });
  } else {
     res.render('org/department/index.ejs');
  }
};
//--------------------------------render update region--------------------------------
exports.updateRegion = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var reg_code= post.reg_code;
     var desc= post.desc;

     var sql = "Update `_node_region` set `region_code`='" + reg_code + "', `description`= '"+ desc +"' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('region');
     });

  } else {
     res.render('region/index.ejs');
  }
};
//--------------------------------render delete region--------------------------------
exports.deleteRegion = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid_del;

     var sql = "Delete from `_node_region` where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('region');
     });

  } else {
     res.render('region/index.ejs');
  }
};
//--------------------------------render add region--------------------------------
exports.addRegion = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var desc= post.desc;
     var reg_code= post.reg_code;

     var sql = "Insert into `_node_region` (`region_code`,`description`) values ('"+ reg_code +"','"+ desc +"') ";

     var query = db.query(sql, function(err, result) {

        res.redirect('region');
     });

  } else {
     res.render('region/index.ejs');
  }
};
//--------------------------------render update Allowance--------------------------------
exports.updateAllowance = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var allowance_name= post.allowance_name;
     var amount= post.amount;

     var sql = "Update `_node_job_allowance` set `description`='" + allowance_name + "', `amount`= '"+ amount +"' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_allowance');
     });

  } else {
     res.render('job_module/allowance/index.ejs');
  }
};
//--------------------------------render delete Allowance--------------------------------
exports.deleteAllowance = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid_del;

     var sql = "Delete from `_node_job_allowance` where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_allowance');
     });

  } else {
     res.render('job_module/allowance/index.ejs');
  }
};
//--------------------------------render add Allowance--------------------------------
exports.addAllowance = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var amount= post.amount;
     var allowance_name= post.allowance_name;

     var sql = "Insert into `_node_job_allowance` (`description`,`amount`) values ('"+ allowance_name +"','"+ amount +"') ";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_allowance');
     });

  } else {
     res.render('job_module/allowance/index.ejs');
  }
};
//--------------------------------render update EmploymentStat--------------------------------
exports.updateEmploymentStat = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var EmploymentStat= post.EmploymentStat;
     var amount= post.amount;

     var sql = "Update `_node_job_employment_stat` set `description`='" + EmploymentStat + "' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_employment_stat');
     });

  } else {
     res.render('job_module/allowance/index.ejs');
  }
};
//--------------------------------render delete EmploymentStat--------------------------------
exports.deleteEmploymentStat = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid_del;

     var sql = "Delete from `_node_job_employment_stat` where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_employment_stat');
     });

  } else {
     res.render('job_module/allowance/index.ejs');
  }
};
//--------------------------------render add EmploymentStat--------------------------------
exports.addEmploymentStat = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var amount= post.amount;
     var EmploymentStat= post.EmploymentStat;

     var sql = "Insert into `_node_job_employment_stat` (`description`) values ('"+ EmploymentStat +"') ";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_employment_stat');
     });

  } else {
     res.render('job_module/allowance/index.ejs');
  }
};
//--------------------------------render update PayGrade--------------------------------
exports.updatePayGrade = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var PayGrade= post.PayGrade;
     var min_sal= post.min_sal;
     var max_sal= post.max_sal;

     var sql = "Update `_node_job_pay_grade` set `pay_grade`='" + PayGrade + "',`min_sal`='" + min_sal + "',`max_sal`='" + max_sal + "' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_pay_grade');
     });

  } else {
     res.render('job_module/allowance/index.ejs');
  }
};
//--------------------------------render delete PayGrade--------------------------------
exports.deletePayGrade = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid_del;

     var sql = "Delete from `_node_job_pay_grade` where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_pay_grade');
     });

  } else {
     res.render('job_module/allowance/index.ejs');
  }
};
//--------------------------------render add PayGrade--------------------------------
exports.addPayGrade = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var PayGrade= post.PayGrade;
     var min_sal= post.min_sal;
     var max_sal= post.max_sal;

     var sql = "Insert into `_node_job_pay_grade` (`pay_grade`,`min_sal`,`max_sal`) values ('"+ PayGrade +"','"+ min_sal +"','"+ max_sal +"') ";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_pay_grade');
     });

  } else {
     res.render('job_module/allowance/index.ejs');
  }
};
//--------------------------------render update WorkShift--------------------------------
exports.updateWorkShift = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var WorkShift= post.WorkShift;
     var starttime= post.starttime;
     var endtime= post.endtime;
     var shift_type= post.shift_type;

     var sql = "Update `_node_job_work_shift` set `shift_name`='" + WorkShift + "',`shift_from`='" + starttime + "',`shift_to`='" + endtime + "',`shift_type`='" + shift_type + "' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_shift');
     });

  } else {
     res.render('job_module/work_shift/index.ejs');
  }
};
//--------------------------------render delete WorkShift--------------------------------
exports.deleteWorkShift = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid_del;

     var sql = "Delete from `_node_job_work_shift` where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_shift');
     });

  } else {
     res.render('job_module/work_shift/index.ejs');
  }
};
//--------------------------------render add WorkShift--------------------------------
exports.addWorkShift = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var WorkShift= post.WorkShift;
     var starttime= post.starttime;
     var endtime= post.endtime;
     var shift_type= post.shift_type;

     var sql = "Insert into `_node_job_work_shift` (`shift_name`,`shift_from`,`shift_to`,shift_type) values ('"+ WorkShift +"','"+ starttime +"','"+ endtime +"','"+ shift_type +"') ";
     var query = db.query(sql, function(err, result) {

        res.redirect('job_shift');
     });

  } else {
     res.render('job_module/work_shift/index.ejs');
  }
};

//--------------------------------render add Vacancy--------------------------------
exports.addVacancy = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var client= post.client;
     var job_title= post.job_title;
     var shift= post.shift;
     var region= post.region;
     var dept= post.dept;
     var total= post.total_position;
     var date = new Date();
     var range_from= post.range_from;
     var range_to= post.range_to;

     var sql = "Insert into `_node_vacancy` (`comp_id`,`job_id`,`dept_id`,total_position,region_id,range_from,range_to,work_shift,date_created) values ('"+ client +"','"+ job_title +"','"+ dept +"','"+ total +"','"+ region +"','"+ range_from +"','"+ range_to +"','"+ shift +"','"+ date.toLocaleString() +"') ";

     var query = db.query(sql, function(err, result) {

        res.redirect('vacancies');
     });

  } else {
     res.render('recruitment/vacancy/index.ejs');
  }  
};
//--------------------------------render update Vacancy--------------------------------
exports.updateVacancy = function(req, res){
  if(req.method == "POST"){
     var post = req.body;
     var id = post.rowid;
     var client= post.client;
     var job_title= post.job_title;
     var shift= post.shift;
     var region= post.region;
     var dept= post.dept;
     var total= post.total_position;
     var date = new Date();
     var range_from= post.range_from;
     var range_to= post.range_to;


     var sql = "UPDATE `_node_vacancy` SET `comp_id`='" + client + "',`job_id`='" + job_title + "',`dept_id`='" + dept + "',`total_position`='" + total + "',`region_id`='" + region + "',`range_from`='" + range_from + "',`range_to`='" + range_to + "',`work_shift`='" + shift + "',`date_created`='" + date.toLocaleString() + "' WHERE `id`='" + id + "'";
     var query = db.query(sql, function(err, result) {

         if (err) throw err;
         res.redirect('vacancies');
     });

  } else {
     res.render('recruitment/vacancy/index.ejs');
  }
};
//--------------------------------render delete WorkShift--------------------------------
exports.deleteVacancy = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;   
     var id= post.rowid_del;

     var sql = "Delete from `_node_vacancy` where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {
        
        res.redirect('vacancies');

     });

  } else {
    res.render('recruitment/vacancy/index.ejs');
  }
};
//--------------------------------render update JobTitle--------------------------------
exports.updateJobTitle = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var JobTitle   = post.JobTitle;
     var JobDesc    = post.JobDesc;
     var JobDetails = post.JobDetails;

     var sql = "Update `_node_job_title` set `job_title`='" + JobTitle + "', `description`= '"+ JobDesc +"', `details`= '"+ JobDetails +"' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_title');
     });

  } else {
     res.render('job_module/job_title/index.ejs');
  }
};
//--------------------------------render delete JobTitle--------------------------------
exports.deleteJobTitle = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid_del;

     var sql = "Delete from `_node_job_title` where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_title');
     });

  } else {
     res.render('job_module/job_title/index.ejs');
  }
};
//--------------------------------render add JobTitle--------------------------------
exports.addJobTitle = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var JobTitle   = post.JobTitle;
     var JobDesc    = post.JobDesc;
     var JobDetails = post.JobDetails;

     var sql = "Insert into `_node_job_title` (`job_title`,`description`,`details`) values ('"+ JobTitle +"','"+ JobDesc +"','"+ JobDetails +"') ";

     var query = db.query(sql, function(err, result) {

        res.redirect('job_title');
     });

  } else {
     res.render('job_module/job_title/index.ejs');
  }
};
//--------------------------------render update Status--------------------------------
exports.updateChangeStat = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var description = post.description;

     var sql = "Update `_node_user_information` set `emp_status`='" + description + "' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('change_stat');
     });

  } else {
     res.render('recruitment/change_stat/index.ejs');
  }
};
//--------------------------------render add Vacancy--------------------------------
exports.addDiscipline = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var search   = post.emp_id;
     var violation    = post.violation;
     var description = post.description;
     var dept = post.dept;
     var offense = post.offense;
     var suspension = post.suspension;
     var note = post.note;
     var sanction = post.sanction;
     var date = new Date();

     var sql = "Insert into `_node_discipline` (`emp_id`,`violation`,`assignment`,`description`,`offense`,`suspension`,`sanction`,`required`,`date_created`) values ('"+ search +"','"+ violation +"','"+ dept +"','"+ description +"','"+ offense +"','"+ suspension +"','"+ sanction +"','"+ note +"','"+ date.toLocaleString() +"') ";

     var query = db.query(sql, function(err, result) {

        res.redirect('discipline');
     });

  } else {
     res.render('recruitment/discipline/index.ejs');
  }
};
//--------------------------------render update Discipline--------------------------------
exports.updateDiscipline = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var decision = post.decision;

     var sql = "Update `_node_discipline` set `descision`='" + decision + "' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('discipline');
     });

  } else {
     res.render('recruitment/discipline/index.ejs');
  }
};
//--------------------------------render delete Discipline--------------------------------
exports.deleteDiscipline = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid_del;

     var sql = "Delete from `_node_discipline` where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

        res.redirect('discipline');
     });

  } else {
    res.render('recruitment/discipline/index.ejs');
  }
};
//--------------------------------render rec_candidate_info--------------------------------
exports.rec_candidate_info = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var id = req.query.id;
  var sql="SELECT * FROM `_node_candidate_info` where id = '"+id+"' ";          
  db.query(sql, function(err, results){  
     var menu = req.menu
     var education = req.educ;
     var work = req.exp;
     var skill = req.skills;
     var govt_id = req.govt_id;
     var referrence = req.ref;
     var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('recruitment/candidates/candidate_info.ejs',{govt_id:govt_id,data:results,educ:education,work_exp:work,refs:referrence,skills:skill,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render addCandidate--------------------------------
exports.addCandidate = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT * FROM `_node_users`";          
  db.query(sql, function(err, result){  
     
     var menu = req.menu
     var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('recruitment/new_candidate/new_candidate.ejs',{data:result,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render user list by ID--------------------------------
exports.user_list_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.query.id;
 var sql="SELECT t1.*,t2.fname,t2.mname,t2.lname FROM _node_users t1 , _node_user_information t3, _node_candidate_info t2 where t1.id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};

//--------------------------------render user role by ID--------------------------------
exports.user_role_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.query.id;
 var sql="SELECT * FROM `_node_user_role` where id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render search_emp--------------------------------
exports.search_emp = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }

 var name = req.query.query;
 var sql='SELECT t1.emp_id,concat(t1.emp_id," - ",t2.fname," ",t2.mname," ",t2.lname)as fullname,concat(t2.fname," ",t2.mname," ",t2.lname)as name,t2.fname,t2.mname,t2.lname FROM _node_user_information t1 INNER JOIN _node_candidate_info  t2 ON t1.candidate_id = t2.id WHERE t2.fname LIKE "%'+name+'%" OR t2.mname LIKE "%'+name+'%" OR t2.lname LIKE "%'+name+'%" AND t1.emp_status !=1';          
 db.query(sql, function(err, rows,fields){ 
  if (err) {
    console.log(err);
    return
  } 
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(rows));
});
};

//--------------------------------render list_vacancy_candidate--------------------------------
exports.list_vacancy_candidate = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }

var id = req.params.id;
 var sql="SELECT u.fname,u.mname,u.lname,c.* FROM _node_competency_list c INNER JOIN _node_vacancy v ON v.id = c.vacancy_id INNER JOIN _node_candidate_info u ON u.id = c.candidate_id WHERE c.vacancy_id = '"+id+"'";          
 db.query(sql, function(err, results){  
var data_id = req.params.id;
var menu = req.menu;
 var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    res.render('recruitment/competency/index.ejs',{data:results,data_id:data_id,menu:menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
 });
};
//--------------------------------render add USer--------------------------------
exports.addUser = function(req, res){
 if(req.method == "POST"){
    var post  = req.body;
    var emp_id   = post.emp_id;
    var uname   = post.uname;
    var pass    = post.pass;
    var role = post.role;
    var date = new Date();

    var sql = "Insert into `_node_users` (`emp_id`,`username`,`password`,`user_role`,`date_created`) values ('"+ emp_id +"','"+ uname +"','"+ pass +"','"+ role+"','"+ date.toLocaleString() +"') ";
     
    var query = db.query(sql, function(err, result) {

       res.redirect('userList');
    });

 } else {
    res.render('user/index.ejs');
 }
};
//--------------------------------render addRole--------------------------------
exports.addRole = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }

  var sql="SELECT id,link_title FROM _node_main_link WHERE sub_link = 0";          
  db.query(sql, function(err, result){  
     
     var menu = req.menu
     var sub_link = req.sub_link
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('user_role/new_role.ejs',{data:result,menu:menu,sub_link:sub_link,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render new_RoleMngt--------------------------------
exports.new_RoleMngt = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 if(req.method == "POST"){
   var post  = req.body;
   var desc   = post.desc;
   var sql = "Insert into `_node_user_role` (`description`) values ('"+ desc +"')";
       db.query(sql, function(err, result,fields){ 
     if (err) {
       console.log(err);
       return
     } 
     res.writeHead(200, {'Content-Type': 'application/json'});
     res.end(JSON.stringify(result.insertId));
   });
 }
};
//--------------------------------render new_FlowMngt--------------------------------
exports.new_FlowMngt = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 if(req.method == "POST"){
   var post  = req.body;
   var id   = post.id;
   var data   = post.data;
   var sql = "Insert into `_node_flow_mngt` (`role_id`,`link_id`) values ('"+ id +"','"+ data +"')";
    db.query(sql, function(err, result,fields){ 
     if (err) {
       console.log(err);
       return
     } 
     res.writeHead(200, {'Content-Type': 'application/json'});
     res.end(JSON.stringify(result ));
    });
 }
};
//--------------------------------render wage_settings--------------------------------
exports.wage_settings = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }

  const menu = req.menu,
  job = req.job_title,
  data_id = req.params.id;

    data = await mysql.queryAsync(`SELECT t2.client_name,t3.job_title,t1.* FROM _node_payroll_settings t1 INNER JOIN _node_org_client t2 ON t1.company_id = t2.id INNER JOIN _node_job_title t3 ON t1.job_id = t3.id where company_id = ?`, [data_id]),
    ot_set = await mysql.queryAsync(`SELECT * FROM _node_ot_settings`);
    
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('org/wage_settings/index.ejs', { menu, data, ot_set,data_id,job,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}
//--------------------------------render update CandidateInterview--------------------------------
exports.updateCompCandidateInterview = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.rowid;
     var v_id= post.v_id;
     var status= post.status;
     var date_interview= post.date_interview;

     var sql = "Update `_node_competency_list` set `interview_stat`='" + status + "', `interview_date`= '"+ date_interview +"' where `id`='" + id + "'";

     var query = db.query(sql, function(err, result) {

      res.redirect('list_vacancy_candidate/'+v_id);
     });

  } else {
     res.render('vacancies/index.ejs');
  }
};
//--------------------------------render update CandidateInterview--------------------------------
exports.updateCompCandidateJob = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var id= post.n_rowid;
     var vacant_id= post.vacant_id;
     var j_status= post.j_status;
     var date_hired= post.date_hired;



     var sql = "Update `_node_competency_list` set `final_stat`='" + j_status + "', `job_offer_date`= '"+ date_hired +"' where `id`='" + id + "'";
     var sql1 ="Update _node_vacancy set `total_position`= total_position - 1 where id ='"+ vacant_id +"' ";
     var query = db.query(sql, function(err, result) {
        
        if (j_status == 'Hired') {

            db.query(sql1,function(err,result){
              res.redirect('list_vacancy_candidate/'+vacant_id);
            });
        
        }else{
        
            res.redirect('list_vacancy_candidate/'+vacant_id);
        }
       
     });

  } else {
     res.render('recruitment/vacancy/index.ejs');
  }
};
//--------------------------------render delete user role--------------------------------
exports.deleteCompetency = function(req, res){
  if(req.method == "POST"){
     var post   = req.body;
     var row_id = post.rowid_del;
     var row_vacant_id= post.row_vacant_id;

     var sql = "DELETE FROM `_node_competency_list` WHERE id='" + row_id + "'";

     var query = db.query(sql, function(err, result) {
        if (err) throw err;
        res.redirect('list_vacancy_candidate/'+row_vacant_id);
     });

  } else {
     res.render('recruitment/vacancy/index.ejs');
  }
};
//--------------------------------render addCompetency--------------------------------
exports.addCompetency = function(req, res){

  var userId = req.session.userId;
  if(userId == null){
     res.redirect("/login");
     return;
  }
  
  var sql="Select * from _node_candidate_info where employment_stat_update = 1";          
  db.query(sql, function(err, result){  
     
    var data_id = req.params.id;
    var menu = req.menu;
    var sub_link = req.sub_link;
     var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
     res.render('recruitment/competency/addComp.ejs',{data:result,menu:menu,sub_link:sub_link,data_id:data_id,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
  });
};
//--------------------------------render addCompCandidate--------------------------------
exports.addCompCandidate = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var rowid   = post.rowid;
     var c_id   = post.c_id;
 
     var sql = "Insert into `_node_competency_list` (`vacancy_id`,`candidate_id`) values ('"+ c_id +"','"+ rowid +"') ";
      
     var query = db.query(sql, function(err, result) {
 
        res.redirect('addCompetency/'+c_id);
     });
 
  } else {
     res.render('vacancy/index.ejs');
  }
 };
//--------------------------------render update clientInfo--------------------------------
exports.updateclientInfo= async function(req, res){
  try{

    let { client_id, company, contact_person, position, contact_num, contract_start, contract_end, _add, statutory_sched, sss_deduc_basis,
      ph_deduc_basis, wtax_sched, wtax_deduc_basis, sss_cola, sss_sea, sss_ctpa, ph_cola, ph_sea, ph_ctpa} = req.body

    let result = await mysql.queryAsync(`UPDATE _node_org_client set client_name = "${company}", _add = "${_add}", contact_name = "${contact_person}", contact_position = "${position}", contact_no = "${contact_num}",
      contract_start = "${contract_start}", contract_end = "${contract_end}", statury_deduc_sched = ${statutory_sched}, sss_deduc_basis = ${sss_deduc_basis}, philhealth_deduc_basis = ${ph_deduc_basis}, Wtax_sched = ${wtax_sched},
      Wtax_deduc_basis = ${wtax_deduc_basis} where id = ${client_id}`);

    sss = await mysql.queryAsync(`SELECT * from _node_sss_deduc_include where company_id = ?`,[client_id]);
    ph = await mysql.queryAsync(`SELECT * from _node_ph_deduc_include where company_id = ?`,[client_id]);
    
      if(sss != null){
      
        await mysql.queryAsync(`UPDATE _node_sss_deduc_include set company_id = "${client_id}", cola = "${sss_cola}", sea = "${sss_sea}", ctpa = "${sss_ctpa}" where company_id = ${client_id}`);
        
      }else {

        await mysql.queryAsync(`INSERT INTO _node_sss_deduc_include (company_id,cola,sea,ctpa) VALUES(?, ?, ?, ?)`,[client_id,sss_cola,sss_sea,sss_ctpa]);
      
      }

      if(ph != null){

         await mysql.queryAsync(`UPDATE _node_ph_deduc_include set company_id = "${client_id}", cola = "${sss_cola}", sea = "${sss_sea}", ctpa = "${sss_ctpa}" where company_id = ${client_id}`);
      
      }else {
         
         await mysql.queryAsync(`INSERT INTO _node_ph_deduc_include (company_id,cola,sea,ctpa) VALUES(?, ?, ?, ?)`,[client_id,ph_cola,ph_sea,ph_ctpa]);
      }

    res.end("success");

  } catch (error) {
      console.log(error)
      res.end('Something Wrong in server')
  }
};
//--------------------------------render loan by ID--------------------------------
exports.loan_by_id = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var id = req.params.id;
 var sql="SELECT t1.date_from,t1.date_to,t2.monthly_payment,t1.amount_paid FROM _node_loan_details t1 INNER JOIN _node_loans t2 ON t1.loan_id = t2.id WHERE loan_id = '"+id+"'";          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render getJobCount--------------------------------
exports.getJobCount = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var sql=`SELECT SUM(t1.deploy) AS total, DATE_FORMAT(date_created,"%b") AS _month
FROM _node_vacancy t1 
INNER JOIN _node_job_title t2 ON t1.job_id = t2.id 
GROUP BY t1.date_created`;          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};

//--------------------------------render getAppliedCount--------------------------------
exports.getAppliedCount = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var sql=`SELECT DATE_FORMAT(date_created, '%b')AS _date,COUNT(*) AS total
FROM _node_candidate_info GROUP BY date_created`;          
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};
//--------------------------------render add Client--------------------------------
exports.addClient = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var desc= post.desc;

     var sql = "Insert into `_node_org_client` (`client_name`) values ('"+ desc +"') ";

     var query = db.query(sql, function(err, result) {

        res.redirect('org');
     });
  } else {
     res.render('org/client/index.ejs');
  }
};

//render all loans 
exports.newLoan = async function(req, res){
  const loanType = req.params.loan_type;
  
  let loanDetails = await mysql.queryAsync('SELECT * from _node_loan_type where link = ?', [loanType])
  if (!loanDetails) {
    res.redirect('/home/dashboard')  
  }
  loanDetails = loanDetails[0];
  const sql=`
    select 
      nlr.date_added ,
      nlr.emp_id, 
      nlt.description, 
      nlr.term, 
      FORMAT(nlr.amount, 2) as amount, 
      FORMAT(nlr.amount / nlr.months_to_pay, 2) as monthly_payment,
      nlr.months_to_pay, 
      nlr.id, 
      CONCAT(nci.fname, " ", nci.mname, " ", nci.lname) as full_name,
      format(ifnull(sum(amount_paid),0),2) as total_amount 
    from _node_loan_type nlt 
    inner join _node_loan_request nlr on 
      nlr.loan_type = nlt.id 
    inner join  _node_user_information nui on 
      nui.emp_id = nlr.emp_id 
    inner join _node_candidate_info nci on 
      nui.candidate_id = nci.id 
    left join _node_loan_details nld on 
      nld.loan_id = nlr.id 
    where nlt.id = ?
    group by 
      nlr.date_added ,
      nlr.emp_id, 
      nlt.description, 
      nlr.term, 
      amount, 
      nlr.months_to_pay, 
      nlr.id, 
      full_name`,
    results = await mysql.queryAsync(sql, [loanDetails.id])
    users = await mysql.queryAsync('SELECT t3.emp_id ,CONCAT(t2.fname," ",t2.mname, " ",t2.lname) as full_name FROM _node_user_information t3 INNER JOIN _node_candidate_info t2 ON  t3.candidate_id = t2.id '),
    menu = req.menu;
    var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('loan_types/index.ejs',{data:results, menu, users, loanType,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details });
 };

exports.addLoan = async function(req, res) {
  const { emp_id, months_to_pay, term, amount, loanType } = req.body;

  const loanDetails = await mysql.queryAsync('SELECT * from _node_loan_type where link = ?', [loanType])

  if(loanDetails) {
    const loan = loanDetails[0];
    
    await mysql.queryAsync('INSERT INTO _node_loan_request (emp_id, loan_type, months_to_pay, amount, term) values (?, ?, ?, ?, ?)', [emp_id, loan.id, months_to_pay, amount, term])
  }
  res.redirect(`/new-loan/${loanType}`)
}

exports.loanDetails = async function(req, res) {
  const loanId = req.params.id,
    data = await mysql.queryAsync(`
        SELECT  
          _node_loan_details.*, 
          nlr.amount,
          DATE_FORMAT(np.date_from,'%m-%d-%Y') as date_from,
          DATE_FORMAT(np.date_to,'%m-%d-%Y') as date_to
        from _node_loan_details
          INNER JOIN _node_payroll np on np.id = _node_loan_details.payroll_id 
          INNER JOIN _node_loan_request nlr on nlr.id = _node_loan_details.loan_id
        where loan_id = ?`, [loanId])
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(data));
}

//jade
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
  res.render('payroll/index.ejs',{menu ,adjusment, loanTypes , client, daterange,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details });
}

exports.orgClientPerId = async function(req, res){
  
  const id = req.params.id,
    sql=`select nui.emp_id, CONCAT(nci.fname, ' ', nci.mname , ' ', nci.lname) as full_name, nui.basic_sal, nui.company_id, nui.job_id, nui.dept_id, nui.pay_grade_id, njt.job_title from _node_user_information nui inner join _node_candidate_info nci on nci.id = nui.candidate_id inner join _node_payroll_settings nps on nps.id = nui.pay_grade_id inner join _node_job_title njt on njt.id = nui.job_id where nui.company_id = ?`,
    data = await mysql.queryAsync(sql, [id]);
    
  res.writeHead(200, {'Content-Type': 'application/json'});  
  res.end(JSON.stringify(data));

};

exports.wageEmployeeDetails = async function(req, res) {
  const id = req.params.id
    userWage = await mysql.queryAsync(`SELECT * from _node_user_information where emp_id = ? limit 1`, [id]);
    if(userWage) {
      let details = userWage[0];
        const retData = await payrollPerEmployee(details, id);
        res.writeHead(200, {'Content-Type': 'application/json'});  
        res.end(JSON.stringify(retData));
    } else {res.writeHead(200, {'Content-Type': 'application/json'});  
    res.end(JSON.stringify({}));}
}

async function payrollPerEmployee(details, id) {
  let companySettings = await mysql.queryAsync(`SELECT * FROM _node_org_client where id = ?`, [details.company_id]),
    basic_sal = details.basic_sal,
        wagePerMonth = parseFloat((basic_sal * working_days).toFixed(2)),
        sss = await mysql.queryAsync(`select * From _node_gov_sss where start <= ? and end >= ? limit 1`, [wagePerMonth, wagePerMonth]),
        pagibig = await mysql.queryAsync(`select * from _node_gov_pagibig where start <= ? and end >= ? limit 1`, [wagePerMonth, wagePerMonth])
        philhealth = await mysql.queryAsync(`select * From _node_gov_philhealth where start <= ? and end >= ? limit 1`, [wagePerMonth, wagePerMonth]),
        loanRequest = await mysql.queryAsync(`select _node_loan_request.id, _node_loan_request.term, _node_loan_details.payroll_id, _node_loan_request.amount, (amount/months_to_pay) as payable, ifnull(sum(_node_loan_details.amount_paid),0) as total_paid, CONCAT('loan-type-', _node_loan_request.loan_type) as loan_type from _node_loan_request left join _node_loan_details on _node_loan_details.loan_id = _node_loan_request.id where emp_id = ?  group by id, amount, loan_type, payable, _node_loan_request.term, _node_loan_details.payroll_id having ifnull(sum(_node_loan_details.amount_paid),0) < _node_loan_request.amount`, [id]),
        salaryDetails = await mysql.queryAsync(`select * from _node_payroll_settings where job_id = ? and company_id = ?`, [details.job_id, details.company_id]),
        lastPayroll = await mysql.queryAsync(`select * from _node_payroll where user_id = ? order by id desc limit 1`, [details.emp_id])

        if(lastPayroll.length > 0) {
          lastPayroll = lastPayroll[0]
        } else {
          lastPayroll.e_philhealth = 0;
          lastPayroll.e_sss = 0;
          lastPayroll.tax = 0;
        }

        pagibig = pagibig[0];
        pagibig.employee = pagibig.contribution;
       
        companySettings = companySettings[0];
        
        if(pagibig.employee < 1) {
          pagibig.employee = wagePerMonth * pagibig.employee / 2;
          pagibig.employer = wagePerMonth * pagibig.employer / 2;
        }
        
        sss = sss[0];
        philhealth = philhealth[0];
        salaryDetails = salaryDetails[0];
        let employeeDeduc = pagibig.employee + sss.employee + philhealth.employee,
          taxable = wagePerMonth - employeeDeduc,
          salaryPerYr = taxable * 12,
          tax = await mysql.queryAsync(`SELECT * FROM _node_tax_table where start <= ? and end >= ?`, [salaryPerYr, salaryPerYr]);
          tax = tax[0];
        
        tax.employer = 0;
        tax.employee = ((tax.excess * (salaryPerYr - tax.over)) + tax.add_ons) / 12
        tax.employee = parseFloat((tax.employee).toFixed(2));
        
       
        if (companySettings.Wtax_deduc_basis == 2) {
          tax.employee = tax.employee / 2;
        } else {
          if (lastPayroll.tax === 0) {
            tax.employee = tax.employee;
          } else {
            tax.employee = 0
          }
        }

        if (companySettings.sss_deduc_basis == 2) {
          sss.employee = sss.employee/2;
          sss.employer = sss.employer/2;
        } else {
          if (lastPayroll.e_sss == 0 ) {
            sss.employee = sss.employee
            sss.employer = sss.employer
          } else {
            sss.employee = 0;
            sss.employer = 0
          }
        }

        for(let i = 0; i < loanRequest.length; i++) {
          let checkRequest = loanRequest[i].term
            if(checkRequest == "Semi-Monthly") {
              loanRequest[i].payable = loanRequest[i].payable / 2
            } else {
              if(loanRequest[i].payroll_id != null) {
                const checkPayroll = await mysql.queryAsync(`Select * from _node_payroll where user_id = ? and id > ?`, [details.emp_id, loanRequest[i].payroll_id])
                if(checkPayroll.length % 2 != 0) {
                  loanRequest[i].payable = 0;
                }
              }
            }
        }
        

        if (companySettings.sss_deduc_basis == 2) {
          sss.employee = sss.employee/2;
          sss.employer = sss.employer/2;
          pagibig.employee = pagibig.employee/2;
          pagibig.employer = pagibig.employer/2;
        } else {
          if (lastPayroll.e_sss == 0 ) {
            sss.employee = sss.employee
            sss.employer = sss.employer
            pagibig.employer = pagibig.employer;
            pagibig.employee = pagibig.employee;
          } else {
            sss.employee = 0;
            sss.employer = 0;
            pagibig.employer = 0;
            pagibig.employee = 0;
          }
        }

        if (companySettings.philhealth_deduc_basis == 2) {  
          philhealth.employee = philhealth.employee/2;
          philhealth.employer = philhealth.employer/2;
        } else {
          if (lastPayroll.e_philhealth == 0 ) {
            philhealth.employee = philhealth.employee;
            philhealth.employer = philhealth.employer;
          } else {
            philhealth.employee = 0;
            philhealth.employer = 0;
          }
        }

        salaryDetails.wagePerMonth = wagePerMonth
        salaryDetails.wagePerDay = basic_sal;
        salaryDetails.perHour = basic_sal / working_hours;
        
        return {pagibig, sss, philhealth, tax, loanRequest, salaryDetails};
}

function formatDate (input) {
  var datePart = input.split("-"),
  year = datePart[2], // get only two digits
  month = datePart[1], day = datePart[0];

  return year+'-'+month+'-'+day;
}

exports.processPayroll = async function(req, res) {
  const {client, dt1, dt2, paymonth, details} = req.body,
    arr = {client, dt1, dt2, paymonth, details};

  let employee = JSON.parse(details),
    date_from = formatDate(dt1),
    date_to =formatDate(dt2);
    
    for (var x = 0; x < employee.length; x++) {
    let salary = JSON.parse(employee[x]);

    let 
      loan = salary["loan"],
      work_hours = salary["work_hours"],
      payment_type = salary["payment_type"],
      emp_id = salary["emp_id"],
      net = salary["net"],
      basic_rate = salary["basic_rate"],
      gross = salary["gross"];

    const emp_employee = salary["employee"];
    const emp_employer = salary["employer"];
    const emp_details = await mysql.queryAsync(`select pay_grade_id from _node_user_information where emp_id = ?`, [emp_id]);
    const empDet = (emp_details.length > 0) ? emp_details[0] : 0;
    let new_salary = _.assign({}, salary);
      delete new_salary["loan"];
      delete new_salary["work_hours"];
      delete new_salary["payment_type"];
      delete new_salary["emp_id"];
      delete new_salary["net"];
      delete new_salary["employee"];
      delete new_salary["employer"];
      delete new_salary["basic_rate"];
      delete new_salary["gross"];
      delete new_salary["employer"];
      delete new_salary["loan_details"];
      const row = await mysql.queryAsync(`
        INSERT into _node_payroll 
        (
          user_id,
          phil_health,
          sss,
          pag_ibig,
          tax,
          date_from,
          date_to,
          payroll_settings,
          e_philhealth,
          e_sss,
          e_pagibig,
          add_tax,
          work_hours,
          payment_id,
          net,
          gross,
          rate,
          payout_month
        )
        values
        (
          ?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?, ?
        )
      `, [
        emp_id,
        emp_employee.philhealth,
        emp_employee.sss,
        emp_employee.pagibig,
        emp_employee.tax,
        date_from,
        date_to,
        empDet.pay_grade_id,
        emp_employer.philhealth,
        emp_employer.sss,
        emp_employer.pagibig,
        emp_employee.add_tax,
        work_hours,
        payment_type, 
        net,
        gross,
        basic_rate,
        paymonth
      ]);
      let payrollId = row.insertId,
        loanDetails = [],
        payrollDetails = [];

      await _.each(new_salary, (value, key) => {
         payrollDetails.push(mysql.queryAsync(`INSERT into _node_payroll_details (
          code,
          hours,
          payroll_id
        )
          values
          (
            ?,?,?
          )
        `, [key, value, payrollId]));
      })

      for (const key of Object.keys(loan)) {
        let value = loan[key],
          request = await mysql.queryAsync(`SELECT id from _node_loan_request where emp_id = ? and loan_type = ?`, [emp_id, key]);

        if(request.length > 0) {
          const row = request[0];
          loanDetails.push(mysql.queryAsync(`
            INSERT INTO 
            _node_loan_details (loan_id, loan_type, amount_paid, payroll_id)
            values
            (?,?,?, ?)`,[row.id, key, value, payrollId]));
        }
    }

      if(payrollDetails.length > 0) await Promise.all(payrollDetails);
      if(loanDetails.length > 0) await Promise.all(loanDetails);
  }
 

  res.writeHead(200, {'Content-Type': 'application/json'});  
  res.end(JSON.stringify(arr));
}

exports.payrollList = async function(req, res) {
  const dateRange = await mysql.queryAsync(`select DATE_FORMAT(date_from,'%m-%d-%Y') as date_from, DATE_FORMAT(date_to,'%m-%d-%Y') as date_to from _node_payroll group by date_from, date_to`),
    client = await mysql.queryAsync(`select id, client_name from _node_org_client`),
    menu = req.menu
     var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    res.render('paylist/index.ejs', {dateRange, client, menu,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.payEmployeeLists = async function(req, res) {
  const {date_from , date_to, client, payment} = req.query,
    payment_query = (payment) ? ` AND np.payment_id = ${payment}` : '',
    data = await mysql.queryAsync(`select np.*, CONCAT(nci.fname, ' ', nci.mname, ' ', nci.lname) as full_name, 
    CASE
    WHEN np.payment_id = 1 THEN "ATM"
    ELSE "Cash"
    END as payment_type from _node_payroll np inner join _node_user_information nui on nui.emp_id = np.user_id inner join _node_candidate_info nci on nci.id = nui.candidate_id inner join _node_payroll_settings nps on nps.id = np.payroll_settings where DATE_FORMAT(np.date_from,'%m-%d-%Y') >= ? and DATE_FORMAT(np.date_to,'%m-%d-%Y') <= ? and nps.company_id = ? ${payment_query}`, [date_from, date_to, client]);

    res.writeHead(200, {'Content-Type': 'application/json'});  
    res.end(JSON.stringify(data));
  }

  exports.viewSalary = async function(req, res) {
    const doc = new PDFDocument();
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/pdf');
    //res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Content-disposition', 'attachment; filename=Untitled.pdf');
    doc.pipe(res);

    const payroll_id = req.params.id;
    let payroll = await mysql.queryAsync(`SELECT _node_payroll.* FROM _node_payroll where id = ?`, [payroll_id]);
    payroll = (payroll) ? payroll[0] : [],
    total_ot = 0;
    let total_deductions =0,
      other_deductions =0, 
      candidate_info = [],
      rate = {
        daily_rate: {
          text: 'Daily Rate',
          hours: 0,
          amt: 0
        },
        hourly_rate: {
          text: 'Hourly Rate',
          hours: 0,
          amt: 0
        },
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
        
      },
      benefitsAndTaxes = [
        {
          name: 'sss',
          emp: 50,
          company: 50,
          total: 100
        },
        {
          name: 'sss',
          emp: 50,
          company: 50,
          total: 100
        }
      ],
      loans = [
        {
          name: 'sss',
          amt: 100
        },
        {
          name: 'sss',
          amt: 100
        }
      ],
      total_earnings= [
        {
          name: 'Total Earnings: ',
          amt: 0
        },
        {
          name: 'Total Earnings: ',
          amt: 0
        }
      ],
      salaryDet = [
        {
          name: 'Basic Salary',
          amt: 0
        },
        {
          name: 'Net Salary',
          amt: 0
        },
        {
          name: 'Gross Salary',
          amt: 0
        }
      ]
    if (!payroll) return true;
      candidate_info = await mysql.queryAsync(`
      
        SELECT 
          _node_candidate_info.*, 
          _node_job_title.job_title, 
          _node_org_client.client_name,
          _node_payroll_settings.*,
          _node_payroll.rate
        FROM _node_candidate_info 
        INNER JOIN _node_user_information ON
        _node_user_information.candidate_id = _node_candidate_info.id
        INNER JOIN _node_org_client ON
        _node_org_client.id = _node_user_information.company_id
        INNER JOIN _node_job_title ON
        _node_job_title.id = _node_user_information.job_id
        INNER JOIN _node_payroll ON 
        _node_payroll.user_id = _node_user_information.emp_id
        INNER JOIN _node_payroll_settings ON 
        _node_payroll_settings.id = _node_payroll.payroll_settings
        where 
        _node_user_information.emp_id = ? and _node_payroll.id = ?`, [payroll.user_id, payroll_id]),
      loadDetails = await mysql.queryAsync(`select _node_loan_type.description, _node_loan_details.* from _node_loan_type inner join _node_loan_details on _node_loan_details.loan_id = _node_loan_type.id where _node_loan_details.payroll_id = ?`, [payroll_id]),
      company_info = await mysql.queryAsync(`SELECT * FROM _node_candidate_info where id = (select candidate_id from _node_user_information where emp_id = ?)`, [payroll.user_id]),
        _node_payroll_details = await mysql.queryAsync(`SELECT * FROM _node_payroll_details where payroll_id = ?`, [payroll_id]);

      if(!candidate_info) return true;
       candidate_info =  candidate_info[0];
       const per_hour = candidate_info.rate/working_hours
      
    await _.each(rate, function(obj){
      obj.percentage = 0; 
      obj.total = 0;
    });

    await _.each(_node_payroll_details, function(obj){
      let key = obj.code;
      rate[key]['hours'] = obj.hours;
      rate[key]['percentage'] = candidate_info[key]
      rate[key]['total'] = (per_hour * rate[key]['percentage']) * obj.hours;
    });


    let emp_name = `${candidate_info.fname} ${candidate_info.mname} ${candidate_info.lname}`,
      job_title = candidate_info.job_title,
      client_name = candidate_info.client_name
      
      benefitsAndTaxes = [
        {
          name: 'SSS',
          emp: payroll.sss,
          company: payroll.e_sss.formatMoney(2),
          total: (payroll.sss + payroll.e_sss).formatMoney(2)
        },
        {
          name: 'PAG-IBIG',
          emp: payroll.pag_ibig,
          company: payroll.e_pagibig.formatMoney(2),
          total: (payroll.pag_ibig + payroll.e_pagibig).formatMoney(2)
        },
        {
          name: 'Philhealth',
          emp: payroll.phil_health,
          company: payroll.e_philhealth.formatMoney(2),
          total: (payroll.phil_health + payroll.e_philhealth).formatMoney(2)
        },
        {
          name: 'Tax',
          emp: payroll.tax,
          company: 0,
          total: (payroll.tax).formatMoney(2)
        },
        {
          name: 'Add-Tax',
          emp: payroll.add_tax,
          company: 0,
          total: (payroll.add_tax).formatMoney(2)
        }
      ]

      _.each(benefitsAndTaxes, (obj) => {
        if(obj.name != "Add-Tax") {
          total_deductions = total_deductions + obj.emp
  
        } else {
          other_deductions = other_deductions + obj.emp
        }
        obj.emp = format(obj.emp)
      })

      doc.font('Helvetica-Bold')
        .fillColor('green')
        .text(company_name, 50, 50) 
      
      doc.fillColor('black')
      
      doc.text('Name:', 50, 80) 
      doc.text('Position:', 50, 120) 
      doc.text('Company:', 50, 100) 

      let start = 180;
      doc.font('Helvetica')

      doc.text(emp_name.split(' ')
      .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(' '), 120, 80) 
      doc.text(job_title, 120, 120) 
      doc.text(client_name, 120, 100) 
      const align = {align: 'right', width: 120}
      doc.font('Helvetica-Bold')
        .fillColor('red')
        .text(`EARNINGS`, 50, start - 20) 
  
      doc.fillColor('black')
      _.each(rate, function(obj, key) {
        doc.text(`${obj.text}:`, 50, start)
        start= start + 20;
      })

      start = 180;
      doc.font('Helvetica')
      rate['daily_rate']['amt'] = candidate_info.rate;
      rate['daily_rate']['hours'] = working_hours;
      rate['daily_rate']['total'] = (candidate_info.rate);
      rate['daily_rate']['pecentage'] = 1;
      rate['hourly_rate']['amt'] = candidate_info.rate;
      rate['hourly_rate']['hours'] = working_hours;
      rate['hourly_rate']['total'] = per_hour;
      rate['daily_rate']['pecentage'] = 1;

      _.each(rate, (obj, key) => {
        const total = format(obj.total)
        doc.text(`${total}`, 180, start, align) 
        start= start + 20;
        if(key != 'daily_rate' && key != 'hourly_rate')
        {
          total_ot = total_ot + obj.total
        }
      })
      
      doc.font('Helvetica-Bold')
      .fillColor('red')
      .text(`ALLOWANCE`, 320, 160) 

      doc.fillColor('black')

      doc.font('Helvetica-Bold')
      doc.text('COLA:', 320, 180) 
      doc.text('SEA:', 320, 200) 
      doc.text('CTPA:', 320, 220) 
      
      doc.font('Helvetica')
      doc.text(candidate_info.cola.formatMoney(2), 380, 180) 
      doc.text(candidate_info.sea.formatMoney(2), 380, 200) 
      doc.text(candidate_info.ctpa.formatMoney(2), 380, 220) 

      doc.font('Helvetica-Bold')
      .fillColor('red')
      .text(`BENEFITS AND TAXES`, 320, 240) 

      doc.fillColor('black')
      doc.text(`NAME`, 320, 260) 
      doc.text(`EMP`, 400, 260) 
      doc.text(`COMP`, 440, 260) 
      doc.text(`TOTAL`, 500, 260) 

      start = 280;
      doc.font('Helvetica');
      let bna = {
        width: 50,
        align:'right'
      }

      _.each(benefitsAndTaxes, function (obj) {
        doc.text(obj.name, 320, start) 
        doc.text(obj.emp, 380, start, bna) 
        doc.text(obj.company, 420, start, bna) 
        doc.text(obj.total, 480, start, bna)
        start = start +20;
      })

      doc.font('Helvetica-Bold')
      .fillColor('red')
      .text(`LOANS`, 320, start) 
      start = start + 20
      doc.fillColor('black')
      doc.text(`NAME`, 320, start) 
      doc.text(`AMT`, 440, start) 
      
      start = start + 20
      doc.font('Helvetica');
      _.each(loadDetails, (obj) => {
        doc.text(obj.description, 320, start) 
        doc.text(format(obj.amount_paid), 440, start) 
        start = start +20;
        other_deductions = other_deductions + obj.amount_paid
      })

      doc.font('Helvetica-Bold')
      .fillColor('red')
      .text(`TOTAL DEDUCTIONS`, 320, start) 
      start = start + 20
      doc.fillColor('black')
      doc.text(`NAME`, 320, start) 
      doc.text(`AMT`, 440, start) 
      start = start + 20
      let deductions_all = [
        {
          name: 'Total Deductions',
          amt: format(total_deductions)
        },
        {
          name: 'Other Deductions',
          amt: format(other_deductions)
        },
        {
          name: 'Total Income',
          amt: format(payroll.net)
        },
        {
          name: 'Payment Type',
          amt: (candidate_info.payment_id == 1) ? 'Cash' : 'ATM'
        }
      ]
      
      doc.font('Helvetica');
      _.each(deductions_all, function (obj) {
        doc.text(obj.name, 320, start) 
        doc.text(obj.amt, 440, start) 
        start = start +20;
      })

      total_earnings = [
        {
          name: 'Basic Salary',
          amt: format(per_hour * payroll.work_hours)
        },
        {
          name: 'Net Salary',
          amt: format(payroll.net)
        },
        {
          name: 'Gross Salary',
          amt: format(payroll.gross)
        }
      ]

      await _.each(total_earnings, function(obj, key) {
        doc.font('Helvetica-Bold')
        doc.text(`${obj.name}:`, 50, start) 
        doc.font('Helvetica')
        doc.text(`${obj.amt}`, 200, start, {align: 'right', width: 100}) 
        start= start + 20;
      })
      
      doc.end();
  }

  Number.prototype.formatMoney = function(c, d, t){
    var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

 function format(n) {
   return n.formatMoney(2)
 }

 exports.payrollExcel = async function(req, res) {
  const {date_from , date_to, client, payment} = req.query,
  payment_query = (payment) ? ` AND np.payment_id = ${payment}` : '',
  data = await mysql.queryAsync(`select np.*, CONCAT(nci.fname, ' ', nci.mname, ' ', nci.lname) as full_name, 
  CASE
  WHEN np.payment_id = 1 THEN "ATM"
  ELSE "Cash"
  END as payment_type from _node_payroll np inner join _node_user_information nui on nui.emp_id = np.user_id inner join _node_candidate_info nci on nci.id = nui.candidate_id inner join _node_payroll_settings nps on nps.id = np.payment_id where DATE_FORMAT(np.date_from,'%m-%d-%Y') >= ? and DATE_FORMAT(np.date_to,'%m-%d-%Y') <= ? and nps.company_id = ? ${payment_query}`, [date_from, date_to, client]),
  company= await mysql.queryAsync(`SELECT * FROM _node_org_client where id = ?`, [client]);
  let wb = new xl.Workbook(),
          style = wb.createStyle({
            font: {
              color: '#FF0800',
              size: 12
            },
            numberFormat: '#,##0.00; (#,##0.00); -'
        }),
        boldStyle = wb.createStyle({
            font: {
              color: '#FF0800',  
              size: 12,
              bold: true
            },
            numberFormat: '#,##0.00; (#,##0.00); -'
        }),
        normal = {font: {size: 12}},
        numberFormat = { 
          font: {size: 12},
          numberFormat: '#,##0.00; (#,##0.00); -'
        },
        numberFormatBold = { 
          font: {size: 12, bold: true},
          numberFormat: '#,##0.00; (#,##0.00); -'
        },
        companyTitle = { 
          font: {size: 12, bold: true, color: '#008000' },
          numberFormat: '#,##0.00; (#,##0.00); -'
        },
        numberFourFormat = { 
          font: {size: 12},
          numberFormat: '#,##0.0000; (#,##0.0000); -'},
        index = 0,
        ws = wb.addWorksheet('All Employee')
        ws.cell(index + 1,1).string(`${company_name}-${company[0].client_name}`).style(companyTitle);
        index = 1
        ws.cell(index + 1,1).string('CASH REPORT').style(companyTitle);
       index = 2
       ws.cell(index + 1,1).string(`CUT OFF REPORT: ${date_from} - ${date_to}`).style(companyTitle);
          index = 3
        ws.cell(index + 1,1).string("Name").style(numberFormatBold);
        ws.cell(index + 1,2).string("Net").style(numberFormatBold);
        ws.cell(index + 1,3).string("Print Name").style(numberFormatBold);
        ws.cell(index + 1,4).string("Signature").style(numberFormatBold);
        ws.cell(index + 1,5).string("Date").style(numberFormatBold);
       


        await _.each(data, (obj) => {
          index++;
          ws.cell(index + 1,1).string(obj.full_name).style(normal);
          ws.cell(index + 1,2).string(obj.net.toLocaleString()).style(normal);
          ws.cell(index + 1,3).string(obj.payment_type).style(normal);
        })

        wb.write(`${company[0].client_name}-${date_from}-${date_to}.xlsx`, res);
}

exports.thirtheenMonth = async function(req, res) {
  var userId = req.session.userId;

  const year = await mysql.queryAsync("select distinct(YEAR(date_from)) as year from _node_payroll"),
    client = await mysql.queryAsync("SELECt * FROM _node_org_client"),    
    menu = req.menu
     var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
    res.render('thirtheen_month/index.ejs',{menu, year, client,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details });
}

exports.thirthMonthPay = async function(req, res){ 
  const {year, client} = req.query,
    addQuery = (client) ? ` AND nog.id = ${client}` : '',
    data = await mysql.queryAsync(`select nog.client_name, sum(gross) as gross from _node_org_client nog inner join _node_payroll_settings nps on nps.company_id = nog.id inner join _node_payroll np on np.payroll_settings = nps.id where DATE_FORMAT(np.date_from, '%Y') = ? ${addQuery} group by nog.client_name`, [year])
    //console.log(data)
    res.writeHead(200, {'Content-Type': 'application/json'});  
    res.end(JSON.stringify(data));
}

exports.generate_pay = async function(req, res){ 
  const {year, client} = req.query,
    addQuery = (client.length > 0) ? ` AND nog.company_id = ${client}` : '',
    data = await mysql.queryAsync(`select nog.id, nog.client_name, sum(gross) as gross from _node_org_client nog inner join _node_payroll_settings nps on nps.company_id = nog.id inner join _node_payroll np on np.payroll_settings = nps.id where DATE_FORMAT(np.date_from, '%Y') = ? ${addQuery} group by nog.id, nog.client_name`, [year])
    
  let wb = new xl.Workbook(),
          style = wb.createStyle({
            font: {
              color: '#FF0800',
              size: 12
            },
            numberFormat: '#,##0.00; (#,##0.00); -'
        }),
        boldStyle = wb.createStyle({
            font: {
              color: '#FF0800',  
              size: 12,
              bold: true
            },
            numberFormat: '#,##0.00; (#,##0.00); -'
        }),
        normal = {font: {size: 12}},
        numberFormat = { 
          font: {size: 12},
          numberFormat: '#,##0.00; (#,##0.00); -'
        },
        numberFormatBold = { 
          font: {size: 12, bold: true},
          numberFormat: '#,##0.00; (#,##0.00); -'
        },
        companyTitle = { 
          font: {size: 12, bold: true, color: '#008000' },
          numberFormat: '#,##0.00; (#,##0.00); -'
        },
        numberFourFormat = { 
          font: {size: 12},
          numberFormat: '#,##0.0000; (#,##0.0000); -'},
        index = 0,
        ws = wb.addWorksheet('All ClientS')
        ws.cell(index + 1,1).string(`13TH MONTH MONITORING ( MANILA ACCOUNT )`).style(companyTitle);
        index = 1
        ws.cell(index + 1,1).string('CLIENT NAME').style(companyTitle);
        ws.cell(index + 1,2).string('13th MONTH ').style(companyTitle);
        ws.cell(index + 1,3).string('AS OF DATE').style(companyTitle);
        
        await _.each(data, (obj) => {
          index++;
          ws.cell(index + 1,1).string(obj.client_name).style(normal);
          ws.cell(index + 1,2).string(obj.gross.toLocaleString()).style(normal);
        })

      const perClient = await mysql.queryAsync(`
      select nog.id, CONCAT(nci.fname,' ',nci.mname,' ',nci.lname) as full_name, nog.client_name, (gross) as gross, CONCAT(DATE_FORMAT(np.date_from, '%m-%d-%Y'),' - ', DATE_FORMAT(np.date_to, '%m-%d-%Y')) as date from _node_org_client nog inner join _node_payroll_settings nps on nps.company_id = nog.id inner join _node_payroll np on np.payroll_settings = nps.id inner join _node_user_information nui on nui.emp_id = np.user_id inner join _node_candidate_info nci on nci.id = nui.candidate_id where DATE_FORMAT(np.date_from, '%Y') = ? ${addQuery}`, [year]),
        companyNames = _.uniq(_.map( perClient, "client_name"))
      
        for(let i = 0; i < companyNames.length; i++) {
          let val = await _.filter(perClient, function(item) {
              return _.includes(item.client_name, companyNames[i])
            }),
            date_range = _.uniq(_.map( val, "date")),
            names = _.uniq(_.map( val, "full_name")),
          
           ws = wb.addWorksheet(companyNames[i])
           let ind = 1
           ws.cell(ind ,1).string(`${company_name}`).style(companyTitle);
           ind++
           ws.cell(ind , 1).string(`13TH MONTH PAY AS OF ${year}`).style(numberFormatBold)
           ws.cell(ind , 2).string(companyNames[i]).style(numberFormatBold)
           ind++
           ws.cell(ind , 1).string(`NO: `).style(numberFormatBold)
           ws.cell(ind , 2).string(`FULL NAME`).style(numberFormatBold)
           ws.cell(ind , 3).string(`Total 13 Month`).style(numberFormatBold)
           ws.cell(ind , 4).string(`As To Date`).style(numberFormatBold)
           let total_gross = 0,
            total_13 = 0,
            dates_gross = {}  
          await _.each(date_range, (obj, pos) => {
            ws.cell(ind , pos + 5).string(obj).style(numberFormatBold)
            dates_gross[obj] = 0
          })

         
          await _.each(names, (obj, pos) => {
            let nameDetails = _.filter(perClient, function(item) {
              return _.includes(item.full_name, obj)
            })

            ind++
            let total_emp = 0
            ws.cell(ind , 1).string((pos+1).toLocaleString()).style(normal)
         
            _.each(nameDetails, (obj, pos) => {
              total_emp = total_emp + obj.gross
              dates_gross[obj.date] =  dates_gross[obj.date] + obj.gross
              ws.cell(ind , 2).string(obj.full_name).style(normal)
              ws.cell(ind , 4).string(total_emp.toLocaleString()).style(normal)
              ws.cell(ind , pos + 5).string(obj.gross.toLocaleString()).style(normal)
            })
            const _13 = (total_emp / 12)
            ws.cell(ind , 3).string(_13.toLocaleString()).style(normal)
            total_13 = total_13 + _13
            total_gross = total_gross + total_emp
          })
          ind++
          ind++
          ws.cell(ind , 2).string('TOTAL:').style(numberFormatBold)
          ws.cell(ind , 3).string(total_13.toLocaleString()).style(normal)
          ws.cell(ind , 4).string(total_gross.toLocaleString()).style(normal)
          let no = 1
          _.each(dates_gross, (obj, pos) => {
            no++
            ws.cell(ind , no + 3).string(obj.toLocaleString()).style(normal)
          })
      }

        wb.write(`13_month_of_${year}.xlsx`, res);
}

exports.upload_image =  function(req, res){
  var formidable = require('formidable')
  , fs = require('fs');
  var image = req.file;
  var body = req.body;
    
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var newpath = '/home/nayrlester/payroll-green-pasture/uploads/' + files.image.name;
      var oldpath = files.image.path;
      fs.rename(oldpath,newpath, function (err) {
        if (err) throw err;
        console.log(err)
        res.end('success');
      });
    });
};

exports.newCandidate = async function (req,res){
    try {
        let { fname, mname, lname, gender, email, ethnic, marital_status, contact_num, age, bdate, address, city, country, zipcode,image} = req.body

        var image_name = image +'.jpg';

        var date=  new Date('yyyy-mm-dd');
        var date_created = Date.now();
        let data = await mysql.queryAsync(`INSERT INTO _node_candidate_info
        (fname,mname,lname,contact_num,email,age,bday,street,city,zipcode,country,sex,marital_status,religion,img_url,employment_stat_update)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?)`,[fname, mname, lname, contact_num, email, age, bdate, address, city, zipcode, country, gender, marital_status,ethnic,image_name,1])

        var id = data.insertId;
        var educational_attainment = req.body["educational_attainment[]"];
        var add = req.body["add[]"];
        var grad_date = req.body["grad_date[]"];
        var school_name = req.body["school_name[]"];
        var count_educ = Object.keys(educational_attainment).length;

        var rfname = req.body["rfname[]"];
        var rposition = req.body["rposition[]"];
        var rcomp = req.body["rcomp[]"];
        var rcontact = req.body["rcontact[]"];
        var count_ref = Object.keys(rfname).length;

        var comp_name = req.body["comp_name[]"];
        var position = req.body["position[]"];
        var from = req.body["from[]"];
        var to = req.body["to[]"];
        var reason = req.body["reason[]"];
        var count_exp = Object.keys(comp_name).length;

        var skill = req.body["skill[]"];
        var count_skill = Object.keys(skill).length;

        if(educational_attainment != ''){
          for (var i = 0; i < count_educ; i++) {
            
            let education = await mysql.queryAsync(`INSERT INTO _node_candidate_educ (candidate_id,attainment,school_name,address,year_grad)
              VALUES(?, ?, ?, ?, ?)`,[id,educational_attainment[i],school_name[i],add[i],grad_date[i]])
          }
        }else{
          res.end("No record");
        }

        if(skill != ''){
          for (var c = 0; c < count_skill; c++) {
          
           let skills =  await mysql.queryAsync(`INSERT INTO _node_candidate_skills (candidate_id,skill)
              VALUES(?, ?)`,[id,skill[c]])
          }
        }else{
          res.end("No record");
        }

        if (rfname != '') {
          for (var a = 0; a < count_ref; a++) {
            
           let referrence =  await mysql.queryAsync(`INSERT INTO _node_candidate_ref (candidate_id,name,rposition,company,contact_num)
              VALUES(?, ?, ?, ?, ?)`,[id,rfname[a],rposition[a],rcomp[a],rcontact[a]])
          }
        }else{
          res.end("No record");
        }

        if(comp_name != ''){
          for (var b = 0; b < count_exp; b++) {
          
           let experience =  await mysql.queryAsync(`INSERT INTO _node_candidate_exp (candidate_id,employer,position,_from,_to,reason_for_leaving)
              VALUES(?, ?, ?, ?, ?, ?)`,[id,comp_name[b],position[b],from[b],to[b],reason[b]])
          }
        }else{
          res.end("No record");
        }

        res.end('success');

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.job_offer = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
  const menu = req.menu,
    row = await mysql.queryAsync(`SELECT t1.id,t1.candidate_id,t3.comp_id,t3.job_id,t3.dept_id,t3.region_id,t3.work_shift,CONCAT(t2.fname,' ',t2.mname,' ',t2.lname)AS fullname,t5.client_name,t4.job_title,
          t6.description,t7.shift_name
          FROM _node_competency_list t1 
          INNER JOIN _node_candidate_info t2 ON t1.candidate_id = t2.id 
          INNER JOIN _node_vacancy t3 ON t3.id =t1.vacancy_id 
          INNER JOIN _node_job_title t4 ON t4.id= t3.job_id 
          INNER JOIN _node_org_client t5 ON t5.id = t3.comp_id 
          INNER JOIN _node_org_dept t6 ON t6.id = t3.dept_id
          INNER JOIN _node_job_work_shift t7 ON t7.id = t3.work_shift
          WHERE t1.final_stat = 'Hired'`);
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('job_offer/index.ejs', { menu, row,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.contractDetails = async function (req, res) {
    var userId = req.session.userId;
    if(userId == null){
      res.redirect("/login");
      return;
    }
    const menu = req.menu,
    competencyID = req.params.id
    
    let result = await mysql.queryAsync(`SELECT t1.id,t1.candidate_id,t3.id AS vacancy_id,t3.comp_id,t3.job_id,t3.dept_id,t3.region_id,t3.work_shift,CONCAT(t2.fname,' ',t2.mname,' ',t2.lname)AS fullname,t5.client_name,t4.job_title,
          t6.description,t7.shift_name
          FROM _node_competency_list t1 
          INNER JOIN _node_candidate_info t2 ON t1.candidate_id = t2.id 
          INNER JOIN _node_vacancy t3 ON t3.id =t1.vacancy_id 
          INNER JOIN _node_job_title t4 ON t4.id= t3.job_id 
          INNER JOIN _node_org_client t5 ON t5.id = t3.comp_id 
          INNER JOIN _node_org_dept t6 ON t6.id = t3.dept_id
          INNER JOIN _node_job_work_shift t7 ON t7.id = t3.work_shift
          WHERE t1.id = ?`, [competencyID]);
      
     result = (result)?result[0]:[];
     console.log(result.job_id)
     rate = await mysql.queryAsync(`SELECT rate FROM _node_payroll_settings where company_id = ? and job_id = ?`, [result.comp_id, result.job_id]);
     status_job = await mysql.queryAsync(`SELECT * FROM _node_job_employment_stat`);

      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('job_offer/contract_details.ejs', { menu, result,status_job, ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.benefits = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var sql="SELECT * FROM _node_benefits";
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};


exports.newEmployee = async function (req,res){
    try {
        var date = new Date().toISOString().replace('T', ' ').substr(0, 19);
        let { comp_id, job_id, dept_id, work_shift, region_id, rate, cstart, cend, candidate_id, cid, emp_stat,emp_num,vacancy_id } = req.body
        let data = await mysql.queryAsync(`INSERT INTO _node_user_information
        (emp_id,vacancy_id,candidate_id,company_id,job_id,dept_id,region_id,pay_grade_id,basic_sal,work_shift_id,contract_start,contract_end,emp_status,date_update,print_contract)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,[emp_num, vacancy_id, candidate_id, comp_id, job_id, dept_id, region_id, comp_id, rate, work_shift, cstart, cend, emp_stat,date,1])

        var id = data.insertId;
        var benefits = req.body["benefits[]"];
        var count_benefits = Object.keys(benefits).length;

        if(benefits != ''){
          for (var i = 0; i < count_benefits; i++) {
            
            let education = await mysql.queryAsync(`INSERT INTO _node_emp_benefits (emp_num,user_info_id,benefit_id)
              VALUES(?, ?, ?)`,[emp_num,id,benefits[i]])
            

          }

          await mysql.queryAsync(`DELETE FROM _node_competency_list where id = ?`, [cid]);
          const deployVacancy = 'deploy + 1 ';
          await mysql.queryAsync(`Update _node_vacancy set deploy = deploy + `+parseInt(1)+` where id = ${vacancy_id}`);
          await mysql.queryAsync(`Update _node_candidate_info set employment_stat_update = ${emp_stat}  where id = ${candidate_id}`);
          
          res.end("success");
          console.log(data)
        }else{
          res.end("Error! Contact Admin");
        }

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.addWageSettings = async function (req,res){
    try {

        let { comp_id, job, rate, cola, sea, ctpa, ot, nd, otnd, lh, lhot,lhnd,lhotnd, sh, shot, shnd, shotnd, rd, lhrdot, shrdot} = req.body

        let data = await mysql.queryAsync(`INSERT INTO _node_payroll_settings
        (company_id,job_id,cola,sea,ctpa,rate,ot,nd,ot_nd,lh_rate,lh_ot,lh_nd,lh_ot_nd,sh_rate,sh_ot,sh_nd,sh_ot_nd,sh_rdot,lh_rdot,day_off)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[comp_id, job, cola, sea, ctpa,rate, ot, nd, otnd, lh, lhot, lhnd,lhotnd, sh, shot, shnd,shotnd, lhrdot, shrdot, rd ])
          
          res.end("success");

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.contract = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
  const menu = req.menu,
    row = await mysql.queryAsync(`SELECT t1.id,CONCAT(t2.fname,' ',t2.mname,' ',t2.lname)AS fullname,t5.client_name,t4.job_title,
          t6.description,t7.shift_name
          FROM _node_user_information t1
          INNER JOIN _node_candidate_info t2
          ON t2.id = t1.candidate_id
          INNER JOIN _node_org_client t5 
          ON t5.id = t1.company_id
          INNER JOIN _node_job_title t4
          ON t4.id = t1.job_id
          INNER JOIN _node_org_dept t6
          ON t6.id = t1.dept_id
          INNER JOIN _node_job_work_shift t7
          ON t7.id = t1.work_shift_id WHERE t1.print_contract = 1`);
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('contract/index.ejs', { menu, row,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.contractInfo= async function (req, res) {
    var userId = req.session.userId;
    if(userId == null){
      res.redirect("/login");
      return;
    }
    const menu = req.menu,
    empID = req.params.id
    
    let result = await mysql.queryAsync(`SELECT t1.id,t1.company_id,t1.job_id,t1.contract_start,t2.job_title,CONCAT(t3.fname,' ',mname,' ',lname) AS fullname,
          CONCAT(t3.street,' ',t3.city,' ',t3.country,' ',t3.zipcode) AS address
          FROM _node_user_information t1
          INNER JOIN _node_job_title t2
          ON t2.id = t1.job_id
          INNER JOIN _node_candidate_info t3
          ON t3.id = t1.candidate_id
          WHERE t1.id = ?`, [empID]);
      
     data = (result)?result[0]:[];
     rate = await mysql.queryAsync(`SELECT rate FROM _node_payroll_settings where company_id = ? and job_id = ?`, [data.company_id, data.job_id]);
     benefits = await mysql.queryAsync(`SELECT t2.benefits FROM _node_user_information t1
            INNER JOIN _node_emp_benefits t3 
            ON t3.user_info_id = t1.id
            INNER JOIN _node_benefits t2
            ON t2. id = t3.benefit_id 
            WHERE t1.id = ?`,[empID]);
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('contract/contractInfo.ejs', { menu, result, rate, benefits, ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.contractPrint= async function (req, res) {
    var userId = req.session.userId;
    if(userId == null){
      res.redirect("/login");
      return;
    }
    const menu = req.menu,
    empID = req.params.id
    
    let result = await mysql.queryAsync(`SELECT t1.id,t1.company_id,t1.job_id,t1.contract_start,t2.job_title,CONCAT(t3.fname,' ',mname,' ',lname) AS fullname,
          CONCAT(t3.street,' ',t3.city,' ',t3.country,' ',t3.zipcode) AS address
          FROM _node_user_information t1
          INNER JOIN _node_job_title t2
          ON t2.id = t1.job_id
          INNER JOIN _node_candidate_info t3
          ON t3.id = t1.candidate_id
          WHERE t1.id = ?`, [empID]);
      
     data = (result)?result[0]:[];
     rate = await mysql.queryAsync(`SELECT rate FROM _node_payroll_settings where company_id = ? and job_id = ?`, [data.company_id, data.job_id]);
     benefits = await mysql.queryAsync(`SELECT t2.benefits FROM _node_user_information t1
            INNER JOIN _node_emp_benefits t3 
            ON t3.user_info_id = t1.id
            INNER JOIN _node_benefits t2
            ON t2. id = t3.benefit_id 
            WHERE t1.id = ?`,[empID]);
     await mysql.queryAsync(`UPDATE _node_user_information set print_contract = 2 where id = ?`, [empID]);

      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('contract/contract.ejs', { menu, result, rate, benefits, ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.employee = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
  const menu = req.menu,
    row = await mysql.queryAsync(`SELECT t1.candidate_id,CONCAT(t2.fname,' ',t2.mname,' ',t2.lname)AS fullname,t5.client_name,t4.job_title,
          t6.description,t7.shift_name
          FROM _node_user_information t1
          INNER JOIN _node_candidate_info t2
          ON t2.id = t1.candidate_id
          INNER JOIN _node_org_client t5 
          ON t5.id = t1.company_id
          INNER JOIN _node_job_title t4
          ON t4.id = t1.job_id
          INNER JOIN _node_org_dept t6
          ON t6.id = t1.dept_id
          INNER JOIN _node_job_work_shift t7
          ON t7.id = t1.work_shift_id`);
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('employee/index.ejs', { menu, row,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.getWageDetails = async function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }

 const menu = req.menu,
    empID = req.params.id

  let result = await mysql.queryAsync(`Select * from _node_payroll_settings where id = ?`, [empID])
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(result));
}

exports.updateWage = async function (req,res){
    try {

        let { rowid, rate, cola, sea, ctpa} = req.body

        let data = await mysql.queryAsync(`UPDATE _node_payroll_settings set rate = ${rate}, cola = ${cola}, sea = ${sea} , ctpa = ${ctpa} where id = ?`,[rowid])
        res.end("success");

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.sss = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
  const menu = req.menu,
    row = await mysql.queryAsync(`SELECT * FROM _node_gov_sss`);
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('sss/index.ejs', { menu, row,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}


exports.pagibig = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
  const menu = req.menu,
    row = await mysql.queryAsync(`SELECT * FROM _node_gov_pagibig`);
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('pagibig/index.ejs', { menu, row,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.taxtable = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
  const menu = req.menu,
    row = await mysql.queryAsync(`SELECT * FROM _node_tax_table`);
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('taxtable/index.ejs', { menu, row,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.philhealth = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
  const menu = req.menu,
    row = await mysql.queryAsync(`SELECT * FROM _node_gov_philhealth`);
      var ex_contract = req.ex_contract;
      var notif = req.notif;
      var notif_details = req.notif_details;
      var ex_details = req.ex_details;
  res.render('philhealth/index.ejs', { menu, row,ex_contract:ex_contract,notif:notif,notif_details:notif_details,ex_details:ex_details});
}

exports.sidebarmenu = function(req, res){

 var userId = req.session.userId;
 if(userId == null){
    res.redirect("/login");
    return;
 }
 var sql="SELECT t2.* FROM _node_users t1 INNER JOIN _node_flow_mngt t4 ON t4.role_id = t1. user_role INNER JOIN _node_menu t2 ON t2.id = t4.link_id WHERE t1.id='"+userId+"' Order By t4.id";
 db.query(sql, function(err, rows,fields){ 
   if (err) {
     console.log(err);
     return
   } 
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(rows));
 });
};


exports.submenu = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
    const id = req.params.id
    rows = await mysql.queryAsync(`SELECT * FROM _node_sub_menu WHERE menu_id = ?`,[id]);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(rows));
}

exports.addSSS = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var start_sal= post.start_sal;
     var end_sal= post.end_sal;
     var monthly_sal= post.monthly_sal;
     var employer= post.employer;
     var employee= post.employee;
     var total= post.total;
     var ecc= post.ecc;

     var sql = "Insert into _node_gov_sss (start,end,salary,employer,employee,total,ecc) values ('"+ start_sal +"','"+ end_sal +"','"+ monthly_sal +"','"+ employer +"','"+ employee +"','"+ total +"','"+ ecc +"') ";

     var query = db.query(sql, function(err, result) {

        res.end("success");
     });
  } else {
     res.render('sss/index.ejs');
  }
};

exports.updateSSS = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var rowid = post.rowid;
     var start_sal= post.start_sal;
     var end_sal= post.end_sal;
     var monthly_sal= post.monthly_sal;
     var employer= post.employer;
     var employee= post.employee;
     var total= post.total;
     var ecc= post.ecc;

     var sql = "Update _node_gov_sss set start='"+ start_sal +"',end='"+ end_sal +"',salary='"+ monthly_sal +"',employer='"+ employer +"',employee='"+ employee +"',total='"+ total +"',ecc='"+ ecc +"' where id = '"+rowid+"'";

     var query = db.query(sql, function(err, result) {

        res.end("success");
     });
  } else {
     res.render('sss/index.ejs');
  }
};

exports.sssDetails = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
    const id = req.params.id
    rows = await mysql.queryAsync(`SELECT * FROM _node_gov_sss WHERE id = ?`,[id]);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(rows));
}

exports.deleteSSS = async function (req,res){
    try {

        let { id } = req.body

        let data = await mysql.queryAsync(`Delete from _node_gov_sss where id = ?`,[id])
        res.end("success");

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.addpagibig = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var start_sal= post.start_sal;
     var end_sal= post.end_sal;
     var employer= post.employer;
     var employee= post.employee;

     var sql = "Insert into _node_gov_pagibig (start,end,contribution,employer) values ('"+ start_sal +"','"+ end_sal +"','"+ employee +"','"+ employer +"') ";

     var query = db.query(sql, function(err, result) {

        res.end("success");
     });
  } else {
     res.render('pagibig/index.ejs');
  }
};

exports.pagibigDetails = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
    const id = req.params.id
    rows = await mysql.queryAsync(`SELECT * FROM _node_gov_pagibig WHERE id = ?`,[id]);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(rows));
}

exports.updatePagIbigData = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var rowid = post.rowid;
     var start_sal= post.start_sal;
     var end_sal= post.end_sal;
     var employer= post.employer;
     var employee= post.employee;

     var sql = "Update _node_gov_pagibig set start='"+ start_sal +"',end='"+ end_sal +"', employer='"+ employer +"', contribution='"+ employee +"' where id = '"+rowid+"'";

     var query = db.query(sql, function(err, result) {
        res.end("success");
     });
  } else {
     res.render('pagibig/index.ejs');
  }
}

exports.deletepagibig = async function (req,res){
    try {

        let { id } = req.body

        let data = await mysql.queryAsync(`Delete from _node_gov_pagibig where id = ?`,[id])
        res.end("success");

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.addtax = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var start_sal= post.start_sal;
     var end_sal= post.end_sal;
     var excess= post.excess;
     var add_ons= post.add_ons;
     var over= post.over;

     var sql = "Insert into _node_tax_table (start,end,excess,add_ons,over) values ('"+ start_sal +"','"+ end_sal +"','"+ excess +"','"+ add_ons +"','"+ over +"') ";

     var query = db.query(sql, function(err, result) {

        res.end("success");
     });
  } else {
     res.render('taxtable/index.ejs');
  }
}

exports.updatetaxData = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var rowid = post.rowid;
     var start_sal= post.start_sal;
     var end_sal= post.end_sal;
     var excess= post.excess;
     var add_ons= post.add_ons;
     var over= post.over;

     var sql = "Update _node_tax_table set start='"+ start_sal +"', end='"+ end_sal +"', excess='"+ excess +"', add_ons='"+ add_ons +"', over='"+ over +"' where id = '"+rowid+"'";

     var query = db.query(sql, function(err, result) {
        res.end("success");
     });
  } else {
     res.render('taxtable/index.ejs');
  }
}

exports.taxDetails = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
    const id = req.params.id
    rows = await mysql.queryAsync(`SELECT * FROM _node_tax_table WHERE id = ?`,[id]);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(rows));
}

exports.deletetax = async function (req,res){
    try {

        let { id } = req.body

        let data = await mysql.queryAsync(`Delete from _node_tax_table where id = ?`,[id])
        res.end("success");

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.addphilhealth = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var start_sal= post.start_sal;
     var end_sal= post.end_sal;
     var base_sal= post.base_sal;
     var employer= post.employer;
     var employee= post.employee;

     var sql = "Insert into _node_gov_philhealth (salary_base,start,end,employee,employer) values ('"+ base_sal +"','"+ start_sal +"','"+ end_sal +"','"+ employee +"','"+ employer +"') ";

     var query = db.query(sql, function(err, result) {
        res.end("success");
     });
  } else {
     res.render('philhealth/index.ejs');
  }
};

exports.philhealthDetails = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
    const id = req.params.id
    rows = await mysql.queryAsync(`SELECT * FROM _node_gov_philhealth WHERE id = ?`,[id]);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(rows));
}

exports.updatephilhealthData = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var rowid = post.rowid;
     var start_sal= post.start_sal;
     var end_sal= post.end_sal;
     var base_sal= post.base_sal;
     var employer= post.employer;
     var employee= post.employee;

     var sql = "Update _node_gov_philhealth set start='"+ start_sal +"',end='"+ end_sal +"', employer='"+ employer +"', employee='"+ employee +"', salary_base='"+ base_sal +"' where id = '"+rowid+"'";

     var query = db.query(sql, function(err, result) {
        console.log(err)
        res.end("success");
     });
  } else {
     res.render('philhealth/index.ejs');
  }
}

exports.deletephilhealth = async function (req,res){
    try {

        let { id } = req.body

        let data = await mysql.queryAsync(`Delete from _node_gov_philhealth where id = ?`,[id])
        res.end("success");

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.deleteWage = async function (req,res){
    try {

        let { id } = req.body

        let data = await mysql.queryAsync(`Delete from _node_payroll_settings where id = ?`,[id])
        res.end("success");

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.addGovtID = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var rowid = post.rowid;
     var sss= post.sss;
     var tin= post.tin;
     var philhealth= post.philhealth;
     var driver= post.driver;
     var prc= post.prc;
     var postal= post.postal;

     var sql = "Insert into _node_candidate_govt_id (candidate_id,sss_gsis,tin_id,philhealth_id,driver_liscense,prc_liscense,postal_id) values ('"+ rowid +"','"+ sss +"','"+ tin +"','"+ philhealth +"','"+ driver +"','"+ prc +"','"+ postal +"') ";

     var query = db.query(sql, function(err, result) {
        res.end("success");
     });
  } else {
     res.render('recruitment/candidates/candidate_info.ejs');
  }
}

exports.deleteGovtID = async function (req,res){
    try {

        let { id } = req.body

        let data = await mysql.queryAsync(`Delete from _node_candidate_govt_id where id = ?`,[id])
        res.end("success");

    } catch (error) {
        console.log(error)
        res.end('Something Wrong in server')
    }
}

exports.GovtIDDetails = async function (req, res) {
  var userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
    const id = req.params.id
    rows = await mysql.queryAsync(`SELECT * FROM _node_candidate_govt_id WHERE id = ?`,[id]);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(rows));
}

exports.updateGovtIDData = function(req, res){
  if(req.method == "POST"){
     var post  = req.body;
     var rowid = post.rowid;
     var sss= post.sss;
     var tin= post.tin;
     var philhealth= post.philhealth;
     var driver= post.driver;
     var prc= post.prc;
     var postal= post.postal;

     var sql = "Update _node_candidate_govt_id set sss_gsis='"+ sss +"',tin_id='"+ tin +"', philhealth_id='"+ philhealth +"', prc_liscense='"+ prc +"', driver_liscense='"+ driver +"', postal_id='"+ postal +"' where id = '"+rowid+"'";

     var query = db.query(sql, function(err, result) {
        console.log(err)
        res.end("success");
     });
  } else {
     res.render('recruitment/candidates/candidate_info.ejs');
  }
}