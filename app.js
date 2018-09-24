/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./Applications/Config')
  , user = require('./Applications/Config/user')
  , payroll = require('./Applications/Config/payroll')
  , payrollAccount = require('./Applications/Config/payrollAccount')
  , atm = require('./Applications/Config/atm')
  , http = require('http')
  , path = require('path')
  , dateFormat = require('dateformat')
  , promise = require('bluebird');
var session = require('express-session')
var app = express();
var bodyParser=require("body-parser");
var connection = require('./Applications/Config/config');


connection.connect();
global.db = connection;
global.mysql = promise.promisifyAll(connection)
global.dateFormat = dateFormat;
global.working_days = 22;
global.working_hours = 8;
global.direxe = __dirname+'/excell'
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/Applications/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.set('trust proxy', 1);
app.use(session({
              secret: 'xxxaXXXXbyyycYYYdzzzZZZ',
              resave: false,
              saveUninitialized: true,
              cookie: { 
                        /*maxAge: 60000 */  
                      }
            }))

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  global.userId = req.session.userId;
  next();
});

//--------------------------------------------------------------------------------------------
  function sess_data(req,res,next){
    var sql="SELECT t2.fname,t2.mname,t2.lname FROM _node_users t1 INNER JOIN _node_user_information t3 ON t3. emp_id= t1.emp_id INNER JOIN _node_candidate_info t2 ON  t3.candidate_id = t2.id INNER JOIN _node_user_role t4 ON t4.id = t1.user_role WHERE t1.id ='"+userId+"' ";
    db.query(sql, function(error,rows){
         req.menu = rows;
         return next();
    });
  }  
//-----------------------------------------------client_data----------------------------------------------
function client_data(req,res,next){
  var sql="select * from _node_org_client";
  db.query(sql, function(error,rows){
       req.client = rows;
       return next();
  });
}  
//-----------------------------------------------job_title_data----------------------------------------------
function job_title_data(req,res,next){

  var sql="select * from _node_job_title";
  db.query(sql, function(error,rows){

       req.job_title = rows;
       return next();
  });
}  
//-----------------------------------------------region_data----------------------------------------------
function region_data(req,res,next){

  var sql="select * from _node_region";
  db.query(sql, function(error,rows){

       req.region = rows;
       return next();
  });
}  
//-----------------------------------------------shift_data----------------------------------------------
function shift_data(req,res,next){

  var sql="select * from _node_job_work_shift";
  db.query(sql, function(error,rows){

       req.shift = rows;
       return next();
  });
}  
//-----------------------------------------------dept----------------------------------------------
function dept(req,res,next){  

  var sql="select * from _node_org_dept";
  db.query(sql, function(error,rows){

       req.dept = rows;
       return next();
  });
}  
//-----------------------------------------------status----------------------------------------------
function status(req,res,next){  

  var sql="select * from _node_job_employment_stat";
  db.query(sql, function(error,rows){

       req.status = rows;
       return next();
  });
}  
//-----------------------------------------------candidate_educ----------------------------------------------
  function candidate_educ(req,res,next){

    var id = req.query.id;
    var sql="Select * from _node_candidate_educ WHERE candidate_id='"+id+"' ";
    db.query(sql, function(error,rows){

         req.educ = rows;
         return next();
    });
  } 
//-----------------------------------------------candidate_work_exp----------------------------------------------
  function candidate_work_exp(req,res,next){

    var id = req.query.id;
    var sql="Select * from _node_candidate_exp WHERE candidate_id='"+id+"' ";
    db.query(sql, function(error,rows){

         req.exp = rows;
         return next();
    });
  } 
//-----------------------------------------------candidate_skills----------------------------------------------
  function candidate_skills(req,res,next){

    var id = req.query.id;
    var sql="Select * from _node_candidate_skills WHERE candidate_id='"+id+"' ";
    db.query(sql, function(error,rows){

         req.skills = rows;
         return next();
    });
  }
//-----------------------------------------------candidate_id----------------------------------------------
function candidate_ids(req,res,next){

  var id = req.query.id;
  var sql="Select * from _node_candidate_govt_id WHERE candidate_id='"+id+"' ";
  db.query(sql, function(error,rows){

       req.govt_id = rows;
       return next();
  });
}
//-----------------------------------------------candidate_ref----------------------------------------------
  function candidate_ref(req,res,next){

    var id = req.query.id;
    var sql="Select * from _node_candidate_ref WHERE candidate_id='"+id+"' ";
    db.query(sql, function(error,rows){

         req.ref = rows;
         return next();
    });
  } 
//-----------------------------------------------user role----------------------------------------------
function user_role(req,res,next){

  var sql="Select * from _node_user_role ";
  db.query(sql, function(error,rows){

       req.role = rows;
       return next();
  });
} 

//-----------------------------------------------sub link----------------------------------------------
function sub_link(req,res,next){

  var sql="SELECT * FROM _node_main_link WHERE sub_link != 0";
  db.query(sql, function(error,rows){

       req.sub_link = rows;
       return next();
  });
} 
//-----------------------------------------------total_employee----------------------------------------------
function total_emp(req,res,next){
  var id = req.query.id;
  var sql="SELECT COUNT(id) AS total_emp FROM _node_user_information";
  db.query(sql, function(error,rows){
      req.total_emp = rows;
      return next();
  });
} 
//-----------------------------------------------total_vacancy----------------------------------------------
  function total_vacancy(req,res,next){

    var id = req.query.id;
    var sql="SELECT COUNT(id) AS total_vacancy FROM _node_vacancy";
    db.query(sql, function(error,rows){

         req.total_vacancy = rows;
         return next();
    });
  }
//-----------------------------------------------total_vacancy----------------------------------------------
  function total_clients(req,res,next){

    var id = req.query.id;
    var sql="SELECT COUNT(id) AS total_clients FROM _node_org_client";
    db.query(sql, function(error,rows){

         req.total_clients = rows;
         return next();
    });
  }
//----------------------------------------------------check-session------------------------------------------------
function checkLogin(req, res, next) {
  const userId = req.session.userId;
  if (userId == null){
    res.redirect("/login");
    return;
  } else next()

}
 //-----------------------------------------------ex_contract----------------------------------------------
  function ex_contract(req,res,next){

    var sql="SELECT COUNT(*) AS ex_contract FROM _node_org_client WHERE contract_end BETWEEN CURRENT_DATE() AND DATE_ADD(CURDATE(),INTERVAL 3 MONTH)";
    db.query(sql, function(error,rows){

         req.ex_contract = rows;
         return next();
    });
  }
//-----------------------------------------------ex_details----------------------------------------------
  function ex_details(req,res,next){

    var sql="SELECT * FROM _node_org_client WHERE contract_end BETWEEN CURRENT_DATE() AND DATE_ADD(CURDATE(),INTERVAL 3 MONTH)";
    db.query(sql, function(error,rows){

         req.ex_details = rows;
         return next();
    });
  }
//-----------------------------------------------notif----------------------------------------------
  function notif(req,res,next){

    var sql="SELECT COUNT(t2.bday) AS notif FROM _node_user_information t1 INNER JOIN _node_candidate_info t2 ON t1.candidate_id=t2.id WHERE STR_TO_DATE( CONCAT(YEAR(CURDATE()), '-', MONTH(t2.bday), '-', DAY(t2.bday) ), '%Y-%m-%d' ) = DATE_ADD(CURDATE(), INTERVAL 2 DAY)  AND employment_stat_update != 1";
    db.query(sql, function(error,rows){

         req.notif = rows;
         return next();
    });
  }
//-----------------------------------------------notif_details----------------------------------------------
  function notif_details(req,res,next){

    var sql="SELECT concat(t2.fname,' ',t2.mname,' ',t2.lname) as fullname,DATE_FORMAT(t2.bday, '%M %d') AS birthday FROM _node_user_information t1 INNER JOIN _node_candidate_info t2 ON t1.candidate_id=t2.id WHERE STR_TO_DATE( CONCAT(YEAR(CURDATE()), '-', MONTH(t2.bday), '-', DAY(t2.bday) ), '%Y-%m-%d' ) = DATE_ADD(CURDATE(), INTERVAL 2 DAY) AND employment_stat_update != 1";
    db.query(sql, function(error,rows){

         req.notif_details = rows;
         return next();
    });
  }
// development only
//get
app.get('/', sess_data,routes.index);//call for main index page
app.get('/signup', sess_data,user.signup);//call for signup page
app.get('/login', sess_data,routes.index);//call for login page
app.get('/payroll-client-history', sess_data, checkLogin, ex_contract,ex_details,notif,notif_details, payroll.payrollHistory);
app.get('/print-client-history', sess_data, checkLogin, ex_contract,ex_details,notif,notif_details, payroll.payrollHistoryPrint);
app.get('/payroll-history-detail', sess_data, checkLogin, ex_contract,ex_details,notif,notif_details, payroll.wageSalaryDetails);
app.get('/payroll-print-details', sess_data, checkLogin, ex_contract,ex_details,notif,notif_details, payroll.payrollPrint);

app.get('/home/dashboard', sess_data,total_emp,total_vacancy,total_clients,ex_contract,ex_details,notif,notif_details, user.dashboard);//call for dashboard page after login
app.get('/userList', sess_data,user_role,ex_contract,ex_details,notif,notif_details, user.userList);//call for userList
app.get('/userRole', sess_data,ex_contract,ex_details,notif,notif_details, user.userRole);//call for userRole
app.get('/contact', sess_data,ex_contract,ex_details,notif,notif_details, user.contact);//call for contact
app.get('/home/logout', sess_data,user.logout);//call for logout
app.get('/org', sess_data,ex_contract,ex_details,notif,notif_details, user.org);//call for org page get
app.get('/org_client/(:id)',ex_contract,ex_details,notif,notif_details, sess_data, user.org_client);//call for org client page get
app.get('/org_dept', sess_data,ex_contract,ex_details,notif,notif_details, user.org_dept);//call for org dept page get
app.get('/region', sess_data,ex_contract,ex_details,notif,notif_details, user.region);//call for region page get
app.get('/job_allowance', sess_data, ex_contract,ex_details,notif,notif_details,user.job_allowance);//call for job allowance page get
app.get('/job_employment_stat',ex_contract,ex_details,notif,notif_details, sess_data, user.job_employment_stat);//call for employment stat page get
app.get('/job_title', sess_data,ex_contract,ex_details,notif,notif_details, user.job_title);//call for job title page get
app.get('/job_pay_grade', sess_data,ex_contract,ex_details,notif,notif_details, user.job_pay_grade);//call for pay grade page get
app.get('/job_shift', sess_data,ex_contract,ex_details,notif,notif_details, user.job_shift);//call for work shif page get
app.get('/rec_candidate', sess_data,ex_contract,ex_details,notif,notif_details, user.rec_candidate);//call for candidate_page page get
app.get('/vacancies', sess_data, client_data, job_title_data, region_data , shift_data, dept,ex_contract,ex_details,notif,notif_details, user.vacancies);//call for vacancies page get
app.get('/change_stat', sess_data, status,ex_contract,ex_details,notif,notif_details, user.change_stat);//call for change_stat page get
app.get('/discipline', sess_data,dept,ex_contract,ex_details,notif,notif_details, user.discipline);//call for discipline page get
app.get('/search_emp' , user.search_emp);//call for search_emp page get
app.get('/list_vacancy_candidate/(:id)' , sess_data,ex_contract,ex_details,notif,notif_details,user.list_vacancy_candidate);//call for vacancy list page get
app.get('/rec_candidate_info', sess_data, candidate_ids,candidate_educ, candidate_work_exp, candidate_skills, candidate_ref,ex_contract,ex_details,notif,notif_details, user.rec_candidate_info);//call for candidate_info page get
app.get('/addCandidate', sess_data,ex_contract,ex_details,notif,notif_details, user.addCandidate);//call for candidate_page page get
app.get('/sil', sess_data,ex_contract,ex_details,notif,notif_details, dept, user.sil);//call for sil page get
app.get('/sss', sess_data,ex_contract,ex_details,notif,notif_details, user.sss);//call for sss page get
app.get('/pagibig', sess_data,ex_contract,ex_details,notif,notif_details, user.pagibig);//call for pagibig page get
app.get('/sal_loan', sess_data,ex_contract,ex_details,notif,notif_details, user.sal_loan);//call for sal_loan page get
app.get('/cal_loan', sess_data,ex_contract,ex_details,notif,notif_details, user.cal_loan);//call for cal_loan page get
app.get('/cash_advance' ,sess_data,ex_contract,ex_details,notif,notif_details, user.cash_advance);//call for cash_advance page get
app.get('/maternity' , sess_data,ex_contract,ex_details,notif,notif_details, user.maternity);//call for maternity page get
app.get('/addRole', sess_data,ex_contract,ex_details,notif,notif_details, sub_link,user.addRole);//call for candidate_page page get
app.get('/wage_settings/(:id)', sess_data,ex_contract,ex_details,notif,notif_details, sub_link,job_title_data,user.wage_settings);//call for candidate_page page get
app.get('/addCompetency/(:id)', sess_data,ex_contract,ex_details,notif,notif_details, sub_link,user.addCompetency);//call for candidate_page page get
app.get('/getJobCount' , sess_data,ex_contract,ex_details,notif,notif_details, user.getJobCount);//call for maternity page get
app.get('/getAppliedCount' , sess_data,ex_contract,ex_details,notif,notif_details, user.getAppliedCount);//call for maternity page get
app.get('/new-loan/(:loan_type)' , sess_data,ex_contract,ex_details,notif,notif_details, checkLogin, user.newLoan);
//payroll jade added
app.get('/payroll' , checkLogin,ex_contract,ex_details,notif,notif_details, sess_data, user.payroll);//call for maternity page get
app.get('/payroll-rate' , checkLogin,ex_contract,ex_details,notif,notif_details, sess_data, payroll.payrollRate);//call for maternity page get
app.get('/payroll-rate-list' , payroll.payrollRateList);//call for maternity page get
app.get('/payroll-benifits' , sess_data,ex_contract,ex_details,notif,notif_details, payroll.payrollBenifits);//call for maternity page get
app.get('/payroll-benifits-search' , payroll.payrollBenifitsSearch);//call for maternity page get
// app.get('/payroll-benifits-report', payroll.payrollBenifitsReport)
app.get('/payroll-payrollRateExport' , payroll.payrollRateExport);//call for maternity page get

app.get('/atm-list' , sess_data,ex_contract,ex_details,notif,notif_details, atm.atmList);//call for maternity page get
app.get('/atm-employee-search' ,  sess_data,ex_contract,ex_details,notif,notif_details, atm.atmEmpSearch);//call for maternity page get
app.get('/atm-employee-info' ,  sess_data,ex_contract,ex_details,notif,notif_details, atm.atmEmpInfo);//call for maternity page get
app.post('/atm-employee-add' ,  sess_data,ex_contract,ex_details,notif,notif_details, atm.atmEmpAdd);//call for maternity page get
app.post('/atm-employee-update' ,  sess_data,ex_contract,ex_details,notif,notif_details, atm.atmEmpUpdate);//call for maternity page get
app.post('/atm-employee-delete', sess_data,ex_contract,ex_details,notif,notif_details, atm.atmEmpDelete);
app.get('/atm-employee-report', sess_data,ex_contract,ex_details,notif,notif_details, atm.atmReport);
//end jade add

//get by ID
app.get('/user_list_by_id', sess_data,ex_contract,ex_details,notif,notif_details, user.user_list_by_id);
app.get('/user_role_by_id', sess_data,ex_contract,ex_details,notif,notif_details, user.user_role_by_id);
app.get('/allowance_by_id', sess_data,ex_contract,ex_details,notif,notif_details, user.allowance_by_id);
app.get('/employment_stat_by_id', sess_data,ex_contract,ex_details,notif,notif_details, user.employment_stat_by_id);
app.get('/job_title_by_id', sess_data,ex_contract,ex_details,notif,notif_details, user.job_title_by_id);
app.get('/pay_grade_by_id', sess_data,ex_contract,ex_details,notif,notif_details, user.pay_grade_by_id);
app.get('/work_shift_by_id', sess_data,ex_contract,ex_details,notif,notif_details, user.work_shift_by_id);
app.get('/rec_candidate_info', sess_data,ex_contract,ex_details,notif,notif_details, user.rec_candidate_info);
app.get('/region_by_id', sess_data,ex_contract,ex_details,notif,notif_details, user.region_by_id);
app.get('/vacancy_by_id', sess_data,ex_contract,ex_details,notif,notif_details, user.vacancy_by_id);
app.get('/department_by_id', sess_data,ex_contract,ex_details,notif,notif_details, user.department_by_id);
app.get('/menu', sess_data,ex_contract,ex_details,notif,notif_details, user.menu);
app.get('/loan_by_id/(:id)', sess_data,ex_contract,ex_details,notif,notif_details, user.loan_by_id);
app.get('/loan-details/(:id)', sess_data,ex_contract,ex_details,notif,notif_details, user.loanDetails);

//post  
app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);//call for signup post 
app.post('/updateUsers', user.updateUsers);//call for update user list post
app.post('/updateUserRole', user.updateUserRole);//call for update user role post
app.post('/deleteUserRole', user.deleteUserRole);//call for update user role post
app.post('/updateDept', user.updateDept);//call for update dept post
app.post('/deleteDept', user.deleteDept);//call for delete dept post
app.post('/addDept', user.addDept);//call for add dept post
app.post('/updateRegion', user.updateRegion);//call for update region post
app.post('/deleteRegion', user.deleteRegion);//call for delete region post
app.post('/addRegion', user.addRegion);//call for add region post
app.post('/addAllowance', user.addAllowance);//call for add Allowance post
app.post('/updateAllowance', user.updateAllowance);//call for add Allowance post
app.post('/deleteAllowance', user.deleteAllowance);//call for add Allowance post
app.post('/addEmploymentStat', user.addEmploymentStat);//call for add EmploymentStat post
app.post('/updateEmploymentStat', user.updateEmploymentStat);//call for add EmploymentStat post
app.post('/deleteEmploymentStat', user.deleteEmploymentStat);//call for add EmploymentStat post
app.post('/addPayGrade', user.addPayGrade);//call for add PayGrade post
app.post('/updatePayGrade', user.updatePayGrade);//call for add PayGrade post
app.post('/deletePayGrade', user.deletePayGrade);//call for add PayGrade post
app.post('/addWorkShift', user.addWorkShift);//call for add WorkShift post
app.post('/updateWorkShift', user.updateWorkShift);//call for add WorkShift post
app.post('/deleteWorkShift', user.deleteWorkShift);//call for add WorkShift post
app.post('/addVacancy', user.addVacancy);//call for add Vacancy post
app.post('/updateVacancy', user.updateVacancy);//call for update Vacancy post
app.post('/deleteVacancy', user.deleteVacancy);//call for add Vacancy post
app.post('/addJobTitle', user.addJobTitle);//call for add JobTitle post
app.post('/updateJobTitle', user.updateJobTitle);//call for update JobTitle post
app.post('/deleteJobTitle', user.deleteJobTitle);//call for add JobTitle post
app.post('/updateChangeStat', user.updateChangeStat);//call for update Vacancy post
app.post('/addDiscipline', user.addDiscipline);//call for add Vacancy post
app.post('/updateDiscipline', user.updateDiscipline);//call for update Vacancy post
app.post('/deleteDiscipline', user.deleteDiscipline);//call for update Vacancy post
app.post('/addUser', user.addUser);//call for add Users post
app.post('/new_RoleMngt', user.new_RoleMngt);//call for add Users post
app.post('/new_FlowMngt', user.new_FlowMngt);//call for add Users post
app.post('/updateCompCandidateInterview', user.updateCompCandidateInterview);//call for update user list post
app.post('/updateCompCandidateJob', user.updateCompCandidateJob);//call for update user list post
app.post('/addCompCandidate', user.addCompCandidate);//call for add Users post
app.post('/deleteCompetency', user.deleteCompetency);//call for delete region post
app.post('/updateclientInfo', user.updateclientInfo);//call for update user list post
app.post('/addClient', user.addClient);//call for add dept post
app.post('/add-loan', user.addLoan);

app.get('/org-client-by-id/(:id)', user.orgClientPerId);
app.get('/wage-employee-details/(:id)', user.wageEmployeeDetails);

app.post('/process-payroll', user.processPayroll);
//app.get('/payroll-history', sess_data,user.payrollList);
app.get('/payroll-history' , checkLogin, sess_data,ex_contract,ex_details,notif,notif_details, user.payrollList);//call for maternity page get
app.get('/search-payroll',ex_contract,ex_details,notif,notif_details, user.payEmployeeLists);//call for maternity page get
app.get('/view-payroll-details/(:id)',ex_contract,ex_details,notif,notif_details, user.viewSalary);
app.get('/print-excel',ex_contract,ex_details,notif,notif_details, user.payrollExcel)
app.get('/thirtheen-month' ,ex_contract,ex_details,notif,notif_details,checkLogin, sess_data, user.thirtheenMonth)
app.get('/13-month-pay',ex_contract,ex_details,notif,notif_details, sess_data, user.thirthMonthPay)
app.get('/generate_pay',ex_contract,ex_details,notif,notif_details, sess_data, user.generate_pay)

app.get('/job_offer', sess_data,ex_contract,ex_details,notif,notif_details, user.job_offer);//call for add dept post
app.get('/contract-details/(:id)', sess_data,ex_contract,ex_details,notif,notif_details, user.contractDetails);
app.get('/benefits', sess_data,ex_contract,ex_details,notif,notif_details, user.benefits);//call for add dept post
app.post('/addWageSettings', user.addWageSettings);//call for add dept post
app.get('/contract', sess_data,ex_contract,ex_details,notif,notif_details, user.contract);//call for add dept post
app.get('/contractInfo/(:id)', sess_data,ex_contract,ex_details,notif,notif_details, user.contractInfo);
app.get('/contractPrint/(:id)', sess_data,ex_contract,ex_details,notif,notif_details, user.contractPrint);
app.get('/employee', sess_data,ex_contract,ex_details,notif,notif_details, user.employee);//call for add dept post
app.get('/getWageDetails/(:id)', user.getWageDetails);
app.get('/sss', sess_data,ex_contract,ex_details,notif,notif_details,user.sss);
app.get('/pagibig', sess_data,ex_contract,ex_details,notif,notif_details,user.pagibig);
app.get('/taxtable', sess_data,ex_contract,ex_details,notif,notif_details,user.taxtable);
app.get('/philhealth', sess_data,ex_contract,ex_details,notif,notif_details,user.philhealth);
app.get('/sidebarmenu', user.sidebarmenu);
app.get('/submenu/(:id)',  user.submenu);
app.get('/sssDetails/(:id)',  user.sssDetails);
app.get('/pagibigDetails/(:id)',  user.pagibigDetails);
app.get('/taxDetails/(:id)',  user.taxDetails);
app.get('/philhealthDetails/(:id)',  user.philhealthDetails);
app.get('/GovtIDDetails/(:id)',  user.GovtIDDetails);

app.post('/newEmployee', user.newEmployee);//call for add dept post
app.post('/newCandidate', user.newCandidate);//call for add dept post
app.post('/upload_image', user.upload_image);//call for add dept post
app.post('/updateWage', user.updateWage);
app.post('/addSSS', user.addSSS);
app.post('/updateSSS', user.updateSSS);
app.post('/deleteSSS', user.deleteSSS);
app.post('/addpagibig', user.addpagibig);
app.post('/updatePagIbigData', user.updatePagIbigData);
app.post('/deletepagibig', user.deletepagibig);
app.post('/addtax', user.addtax);
app.post('/updatetaxData', user.updatetaxData);
app.post('/deletetax', user.deletetax);
app.post('/addphilhealth', user.addphilhealth);
app.post('/updatephilhealthData', user.updatephilhealthData);
app.post('/deletephilhealth', user.deletephilhealth);
app.post('/deleteWage', user.deleteWage);
app.post('/addGovtID', user.addGovtID);
app.post('/deleteGovtID', user.deleteGovtID);
app.post('/updateGovtIDData', user.updateGovtIDData);


//new_payroll
app.get('/payrolNew', sess_data,ex_contract,ex_details,notif,notif_details, payrollAccount.payroll);//call for add dept post


//Middleware
app.listen(8080);