  window.history.forward();
  function noBack() { window.history.forward(); }
  $("#prev").hide();
  $(function () {
      $(document).keydown(function (e) {
          return (e.which || e.keyCode) != 116;
      });
  });
  // window.onbeforeunload = function(){return false;}
  function next(){
    $('#progress-bar').removeClass('bar-20').addClass('bar-40');
    $('#progress-bar').css("width", "40%");
    $("#next").attr("onclick","next1()");
    $("#personal_info").removeClass("active in");
    $("#education").addClass("active in");
    $("#active-tab").removeClass("active");
    $("#link-tab1").addClass("active");
    $("#link-tab1").attr("data-toggle","tab");
    $("#active-tab").removeAttr("data-toggle");
    $("#prev").show();
    $("#prev").attr("onclick","prev1()");




  }

  function next1(){
    $('#progress-bar').removeClass('bar-40').addClass('bar-60');
    $('#progress-bar').css("width", "60%");
    $("#next").attr("onclick","next2()");
    $("#education").removeClass("active in");
    $("#work").addClass("active in");
    $("#active-tab").removeClass("active");
    $("#link-tab1").removeClass("active");
    $("#link-tab2").addClass("active");
    $("#link-tab2").attr("data-toggle","tab");
    $("#link-tab1").removeAttr("data-toggle");
    $("#prev").show();
    $("#prev").attr("onclick","prev2()");
  }

  function next2(){
    $('#progress-bar').removeClass('bar-60').addClass('bar-80');
    $('#progress-bar').css("width", "80%");
    $("#next").attr("onclick","next3()");
    $("#work").removeClass("active in");
    $("#skill").addClass("active in");
    $("#active-tab").removeClass("active");
    $("#link-tab2").removeClass("active");
    $("#link-tab3").addClass("active");
    $("#link-tab3").attr("data-toggle","tab");
    $("#link-tab2").removeAttr("data-toggle");
    $("#prev").show();
    $("#prev").attr("onclick","prev3()");
  }

  function next3(){
    $('#progress-bar').removeClass('bar-80').addClass('bar-100');
    $('#progress-bar').css("width", "100%");
    $("#next").attr("onclick","submit()");
    $("#next").html("Submit");
    $("#skill").removeClass("active in");
    $("#referrence").addClass("active in");
    $("#active-tab").removeClass("active");
    $("#link-tab3").removeClass("active");
    $("#link-tab4").addClass("active");
    $("#link-tab4").attr("data-toggle","tab");
    $("#link-tab3").removeAttr("data-toggle");
    $("#prev").show();
    $("#prev").attr("onclick","prev4()");
  }

  function prev1(){
    $('#progress-bar').removeClass('bar-40').addClass('bar-20');
    $('#progress-bar').css("width", "20%");
    $("#prev").hide();
    $("#prev").attr("onclick","prev()");
    $("#next").attr("onclick","next()");
    $("#personal_info").addClass("active in");
    $("#education").removeClass("active in");
    $("#active-tab").addClass("active");
    $("#link-tab1").removeClass("active");
    $("#link-tab1").removeAttr("data-toggle");
  }

  function prev2(){
    $('#progress-bar').removeClass('bar-60').addClass('bar-40');
    $('#progress-bar').css("width", "40%");
    $("#prev").show();
    $("#prev").attr("onclick","prev1()");
    $("#next").attr("onclick","next1()");
    $("#education").addClass("active in");
    $("#work").removeClass("active in");
    $("#link-tab1").addClass("active");
    $("#link-tab2").removeClass("active");
    $("#link-tab2").removeAttr("data-toggle");
  }

  function prev3(){
    $('#progress-bar').removeClass('bar-80').addClass('bar-60');
    $('#progress-bar').css("width", "60%");
    $("#prev").show();
    $("#prev").attr("onclick","prev2()");
    $("#next").attr("onclick","next2()");
    $("#work").addClass("active in");
    $("#skill").removeClass("active in");
    $("#link-tab2").addClass("active");
    $("#link-tab3").removeClass("active");
    $("#link-tab3").removeAttr("data-toggle");
    $("#next").html("Next");
  }

  function prev4(){
    $('#progress-bar').removeClass('bar-100').addClass('bar-80');
    $('#progress-bar').css("width", "80%");
    $("#prev").show();
    $("#prev").attr("onclick","prev3()");
    $("#next").attr("onclick","next3()");
    $("#skill").addClass("active in");
    $("#referrence").removeClass("active in");
    $("#link-tab3").addClass("active");
    $("#link-tab4").removeClass("active");
    $("#link-tab4").removeAttr("data-toggle");
    $("#next").html("Next");
  }


  function add_educ(){
      $("#educ").append('<div class="form-body"><div class="row col-md-12 col-lg-12" ><div class="form-group"><div class="col-md-3 col-lg-3"> <label for="projectinput1">Education</label><select class="form-control" name="educational_attainment[]" id="educational_attainment"> '+ 
      '<option disabled selected>Select Educational Attainment</option><option value="Primary">Primary</option><option value="Secondary">Secondary</option><option value="Tertiary">Tertiary</option><option value="Vocational">Vocational</option><option value="Masteral">Masteral</option><option value="Doctorate">Doctorate</option></select></div>'+
      '<div class="col-md-3 col-lg-3"><label for="projectinput1">Address</label><input type="text" class="form-control" name="add[]" id="add[]" placeholder="Address"  ></div>'+
      '<div class="col-md-3 col-lg-3"><label for="projectinput1">Date Graduated</label><input type="date" class="form-control" name="grad_date[]" id="grad_date[]" placeholder="Date Graduated" > </div>'+
      '<div class="col-md-3 col-lg-3"><label for="projectinput1">School/Institution</label><input type="text" class="form-control" name="school_name[]" id="school_name" placeholder="School" > </div></div></div></div>');
  }

  function add_exp(){
      $("#experience").append('<div class="form-body"><div class="row col-md-12 col-lg-12" ><div class="form-group"><div class="col-md-3 col-lg-3">  <label for="projectinput1">Company</label><input type="text" class="form-control" name="comp_name[]" id="comp_name" placeholder="Company" > </div>'+
      '<div class="col-md-3 col-lg-3"><label for="projectinput1">Position</label><input type="text" class="form-control" name="position[]" id="position" placeholder="Address"  ></div>'+
      '<div class="col-md-3 col-lg-2"><label for="projectinput1">From *Note:(year)</label><input type="text" class="form-control" name="from[]" id="from" placeholder="From" > </div>'+
      '<div class="col-md-3 col-lg-2"><label for="projectinput1">To *Note:(year)</label><input type="text" class="form-control" name="to[]" id="to" placeholder="To" >  </div>'+
      '<div class="col-md-3 col-lg-2"><label for="projectinput1">Reason for leaving</label><input type="text" class="form-control" name="reason[]" id="reason" placeholder="Reason for Leaving" >  </div></div></div></div>');
  }

  function add_skills(){
      $("#skills").append('<div class="form-body"><div class="row col-md-12 col-lg-12" ><div class="form-group"><div class="col-md-3 col-lg-3">  <label for="projectinput1">Skills</label><input type="text" class="form-control" name="skill[]" id="skill" placeholder="Skills" > </div></div></div></div>');
  }

  function add_ref(){
      $("#referrence").append('<div class="form-body"><div class="row col-md-12 col-lg-12" ><div class="form-group"><div class="col-md-3 col-lg-3">   <label for="projectinput1">Name</label><input type="text" class="form-control" name="rfname[]" id="rfname" placeholder="Company" > </div>'+
      '<div class="col-md-3 col-lg-3"><label for="projectinput1">Position</label><input type="text" class="form-control" name="rposition[]" id="rposition" placeholder="Name" > </div>'+
      '<div class="col-md-3 col-lg-3"><label for="projectinput1">Company</label><input type="text" class="form-control" name="rcomp[]" id="rcomp" placeholder="Company" ></div>'+
      '<div class="col-md-3 col-lg-3"><label for="projectinput1">Contact Number</label> <input type="text" class="form-control" name="rcontact[]" id="rcontact" placeholder="Contact Number" >   </div></div></div></div>');
  }

  function submit(){

    var options = $("select[name='educational_attainment[]']");
    var values = $.map(options ,function(option) {
        return option.value;
    });

    var add = $("input[name='add[]']").map(function(){return $(this).val();}).get();
    var grad_date = $("input[name='grad_date[]']").map(function(){return $(this).val();}).get();
    var school_name = $("input[name='school_name[]']").map(function(){return $(this).val();}).get();
    var rfname = $("input[name='rfname[]']").map(function(){return $(this).val();}).get();
    var rposition = $("input[name='rposition[]']").map(function(){return $(this).val();}).get();
    var rcomp = $("input[name='rcomp[]']").map(function(){return $(this).val();}).get();
    var rcontact = $("input[name='rcontact[]']").map(function(){return $(this).val();}).get();
    var skill = $("input[name='skill[]']").map(function(){return $(this).val();}).get();
    
    var comp_name = $("input[name='comp_name[]']").map(function(){return $(this).val();}).get();
    var position = $("input[name='position[]']").map(function(){return $(this).val();}).get();
    var from = $("input[name='from[]']").map(function(){return $(this).val();}).get();
    var to = $("input[name='to[]']").map(function(){return $(this).val();}).get();
    var reason = $("input[name='reason[]']").map(function(){return $(this).val();}).get();

    var fname = $('#fname').val();
    var mname = $('#mname').val();
    var lname = $('#lname').val();
    var gender = $('#gender').val();
    var email = $('#email').val();
    var ethnic = $('#ethnic').val();
    var marital_status = $('#marital_status').val();
    var contact_num = $('#contact_num').val();
    var age = $('#age').val();
    var bdate = $('#bdate').val();
    var address = $('#address').val();
    var city = $('#city').val();
    var country = $('#country').val();
    var zipcode = $('#zipcode').val();
    var image = $('#image').val().split('\\').pop();
    image=image.split('.')[0];

    var info ={ fname:fname, mname:mname, lname:lname, gender:gender, email:email, ethnic:ethnic, marital_status:marital_status, contact_num:contact_num,
    age:age, bdate:bdate, address:address, city:city, country:country, zipcode:zipcode, image:image,educational_attainment: values,add:add, grad_date:grad_date, school_name,rfname:rfname, rposition:rposition, rcomp:rcomp, rcontact:rcontact,comp_name:comp_name ,position:position, from:from, to:to, reason:reason,skill:skill};

    var formData = new FormData();
    var output = $('input[type=file]')[0].files[0];
    formData.append('image', output);

      $.ajax({
        type: "POST",
        url: "/upload_image",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(result){
         if (result== 'success'){
            $.ajax({
              type: "POST",
              url: "/newCandidate",
              data: info,
              cache:false,
              contentType: undefined,
              success: function(result){
                Swal({
                    title: 'Success!',
                    text: 'Candidate Added Successfully',
                    type: 'success',
                }).then(function() {
                    window.location.href =
                    "http://" +
                    window.location.host +"/rec_candidate";
                })
              }
            });
          }
        }
      });
  }


  var loadFile = function(event) {
    var output = document.getElementById('imgid');
    output.src = URL.createObjectURL(event.target.files[0]);
  };