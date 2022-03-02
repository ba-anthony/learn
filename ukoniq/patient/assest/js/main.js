(function ($) {
    'use strict';
    jQuery(document).ready(function ($) {

    

        if (window.location.hash) {
            $(window.location.hash).modal('show');
        }

        if (localStorage.getItem('modalOverlay') != 'shown') {
            $('#modalOverlay').show();
        }

        $("#modalOverlay .buttonStyle").on('click', function () {
            $("#modalOverlay").css("display", "none");
            localStorage.setItem('modalOverlay', 'shown');
        });

        
        if(localStorage.getItem('modalCookies') != 'shown'){
            $('#myModal1').show();
            //localStorage.setItem('modalCookies','shown');
        }
        $(".modal .modal-header .accept_cookie").on('click', function () {
            $("#myModal1").css("display", "none");
            localStorage.setItem('modalCookies','shown');
            if($(window).width() < 767){
                var headerHeight = $('header').height();
                $('body').css('padding-top',headerHeight)
              }
        });
        $(".modal .modal-header .close i").on('click', function () {
            $("#myModal1").css("display", "none");
        });


        if(localStorage.getItem('warningOverlay') != 'shown'){
            $('.warning').show();
            //localStorage.setItem('modalCookies','shown');
        }

        function closeWarning(){
            $(".warning").css("display", "none");
            localStorage.setItem('warningOverlay','shown');
        }
     
        $(".warning .close").on('click', function () {
            closeWarning()
        });

        $('a').click(function(){
            
            if ($(this).attr('href') != '' && $(this).attr('href') != 'javascript:void(0)' && $(this).attr('href')  != '#') { 
                localStorage.setItem('pageChange',"true");
            } 
        })

        if(localStorage.getItem('pageChange') == 'true'){
            closeWarning()
        }


        window.onbeforeunload = function () {
            localStorage.removeItem("warningOverlay");
        }
       

       $(window).scroll(function(){
            if($(window).scrollTop() > 100){
                closeWarning()
            }
       })


       $(document).ready(function(){
            if($(window).width() < 767){
            var headerHeight = $('header').height();
            $('body').css('padding-top',headerHeight)
            }
        })

       var clickCount = 0;
       $('.safety_info').click(function(){
            clickCount++;
            if(clickCount%2 ==1){
                $(this).addClass('active');
                
                var window_height1 = $(window).height();
                var headerHeight = $('header').innerHeight()
                $(this).animate({
                    // top:headerHeight,
                    height: window_height1 - headerHeight
                }, 100)
                $('body').css('overflow','hidden')
                $('body').addClass('trayopen')
            }else{
                $('.safety_info').removeClass('active')
                // $(this).animate({
                //     top:'82.5%',
                //   }, 100)

                if($(window).width() > 767){
                    $(this).animate({
                        // top:'none',
                        height: 130
                    }, 100)
                }else{
                    $(this).animate({
                        // top:'none',
                        height: 95
                    }, 100)
                }
                  $('body').css('overflow-y','scroll')
                  $('body').removeClass('trayopen')
            }
           
       })
        $('.safety_content').click(function(e){
            e.stopPropagation()
        })

        
        function check_if_in_view() {
            var $window =  $(window);
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height);
          
              var $element = $("#isi");
              var element_height = $element.outerHeight();
              var element_top_position = $element.offset().top;
              var element_bottom_position = (element_top_position + element_height);
          
              //check to see if this current container is within viewport
              if($(window).width() > 767){
                if ((element_bottom_position >= window_top_position - 100) &&
                    (element_top_position <= window_bottom_position - 100) || $(window).scrollTop() + $(window).height() == $(document).height()) {
                $('.safety_info').addClass('disappear');
                } else {
                $('.safety_info').removeClass('disappear');
                }
              }else{
                if ((element_bottom_position >= window_top_position - 50) &&
                    (element_top_position <= window_bottom_position - 50) || $(window).scrollTop() + $(window).height() + 100 >= $(document).height()) {
                $('.safety_info').addClass('disappear');
                } else {
                $('.safety_info').removeClass('disappear');
                }

              }
          }

          $(window).scroll(function(){
            check_if_in_view()
          })




        $(".navbar-toggler").on('click', function () {
            $("body").toggleClass("menuopen");
            if ($(".header-content-main").hasClass("menuactive")) {
                $(".header-content-main").removeClass("menuactive");
            } else {
                $(".header-content-main").addClass("menuactive");
            }
        });
        function make_base_auth(user, password) {
            var tok = user + ':' + password;
            var hash = btoa(tok);
            console.log("Basic " + hash);
            return "Basic " + hash;
        }
        $("#form-submit").submit(function(e) {
            e.preventDefault();
            $(".load-submit").css("display", "block");
            $(".thankmsg").css("display", "none");
            $(".form-errmsg").html("");
            var fail = false;
        var fail_log = '';
        var name;
        $('#form-submit').find( 'select, textarea, input' ).each(function(){
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
          url: '/formdata.php',
				    data: $("#form-submit").serialize(),
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
        $(".popup-content2 .box-close").on('click', function () {
            $(".popup-content2 .form-group input").val("");

        });
        // $(".click-show").on('click', function () {
        //     $(".box-text").slideToggle();
        // });
        $(".box-text.v2 p a").click(function () {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $("#isi").offset().top - 140
            }, 300);
        });

        /*Leaving modal for external link start*/
        $(document).on('click', '.returnModal', function () {
            var href = $(this).attr('href');
            var target = $(this).attr('target');
            $('#confirm_continue_new').attr('href', href);
            if (target != '') {
                $('#confirm_continue_new').attr('target', '_blank');
            }
            $('#confirm_popup').show();
            return false;
        });
        $(document).on('click', '.closereturn', function () {
            $('#confirm_popup').hide();
            $('#confirm_continue_new').attr('href', '');
            $('#confirm_continue_new').removeAttr('target');
        });

        $(document).on('click', function (e) {
            if ($(e.target).closest(".popup_inner").length === 0) {
                $('#confirm_popup').hide();
            }
        });
        /*Leaving modal for external link end*/

    });

})(jQuery);


$(document).ready(function (e) {
    var getheaderheight = $("header" ).height();
    if ($(window).scrollTop() >= 30) {
        if ($(window).width() > 0) {
            $('.header-content-main').addClass('active');
        }
        else {
            $('.header-content-main').removeClass('active');
        }
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 30) {
            $('.header-content-main').addClass('active');
        }
        else {
            $('.header-content-main').removeClass('active');
        }
    });
});


var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
         create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            /*when an item is clicked, update the original select box,
             and the selected item:*/
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
         and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
     except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
document.addEventListener("click", closeAllSelect);

//START Sub - Menu link for parent items

function myFunction(x) {
    if (x.matches) { // If media query matches
        $(".dropdown-toggle").attr("data-bs-toggle","none");
    } else {
        $(".dropdown-toggle").attr("data-bs-toggle","dropdown");
    }
  }
  
  var x = window.matchMedia("(min-width: 1200px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes

  //END - Menu link for parent items



  $(window).resize(function()
  {
  var $theWindowSize = $(this).width();
  if($theWindowSize > 991)
      {
          $("body").removeClass("menuopen");
          $(".header-content-main").removeClass("menuactive");
      } 
  });

