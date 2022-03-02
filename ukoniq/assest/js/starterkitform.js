(function ($) {
    'use strict';
    jQuery(document).ready(function ($) {

        
        function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  console.log("Basic " + hash);
  return "Basic " + hash;
}
        $("#starterkit-submit").submit(function(e) {
            e.preventDefault();
            $(".load-submit").css("display", "block");
            $(".thankmsg").css("display", "none");
            $(".form-errmsg").html("");
            var fail = false;
        var fail_log = '';
        var name;
        $('#starterkit-submit').find( 'select, textarea, input' ).each(function(){
            if(! $(this).prop('required')) {

            } else {
                if (! $(this).val()) {
                    fail = true;
                    name = $(this).attr('name');
                    fail_log += name + " is required \n";
                }

            }
        });

        //submit if fail never got set to true
        if (! fail) {
            //process form here.
            //Ajax Function to send a get request
            var username = 'ukoniq';
            var password = 'tVUm(5kx/z&*_U%"BM/}!+A*3epjLvL6';
				  $.ajax({
				    type: 'POST',
          dataType: 'json',
         // cors: true ,
         // contentType:'application/json',
         // secure: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          //beforeSend: function (xhr) { xhr.setRequestHeader ("Authorization", "Basic " + btoa(username+':'+password)); },
          url: 'patient/formdata.php',
				    data: $("#starterkit-submit").serialize(),
				    //beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', make_base_auth(username, password)); },
				    success: function(response){
				        //if request if made successfully then the response represent the data
				        //$("#result").empty().append(response);
				        $(".load-submit").css("display", "none");
				        if (response.success) {
				        		$(".thankmsg").css("display", "block");
				        }else{
				        		$('.form-errmsg').html('Form not successfully submitted. Please try again later');
				        }
				    },
				    error: function (jqXHR, textStatus, errorThrown) {
				    	 $(".load-submit").css("display", "none");alert('Error: ' + textStatus + ' => ' + errorThrown); 
				    	 $('.form-errmsg').html('Form not successfully submitted. Please try again later');
				    	 }
				  });
        } else {
				$(".load-submit").css("display", "none");
            //$(".thankmsg").css("display", "block");
            $('.form-errmsg').html('Form not successfully submitted. Please try again later');
            alert(fail_log);
        }
            /* setTimeout(function(){
                $(".load-submit").css("display", "none");
                $(".thankmsg").css("display", "block");
            }, 1000); */
        });
      
       
       

    });

})(jQuery);

