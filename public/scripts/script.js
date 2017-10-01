/* global $ */

// the responsive menu starts here

$(function(){{
    $(window).resize(function(){
        if($(window).width() < 990){
            $('.rightNavSection').hide();
        } else if($(window).width() > 990){
            $('.rightNavSection').show();
        }
    });
    $('.menu-btn').click(function(){
        $(this).parent('.leftNavSection').siblings('.rightNavSection').slideToggle();
    });
}});

// the responsive menu ends here


//the blogNew page starts here
$(function(){
$('.BlogInputSpacing').on('click', function(){
    $(this).find('.textArea').addClass('makeVisible');
    $(this).find('.addParagraphIcon').addClass('makeInvinsible');
});
});

$(function(){
    $('.deleteTrigger').click(function(){
        $('.deleteBlogForm').show();
    });
    $('#deleteFormClose').click(function(){
        $(this).parent().hide();
    });
});


//the blogNew page ends here

// the side bar toggle mobile view functionality starts here
$(function(){
    $('button.openSideBar').click(function(){
        $('.side-bar').toggleClass('show');
    });
});
// the side bar toggle mobile view functionality ends here

// the home page starts here

// the sticky nav bar starts here
$(function(){
var yourNavigation = $(".topMenu2");
var   stickyDiv = "sticky";
var    yourHeader = $('.topMenu').height();

$(window).scroll(function() {
  if( $(this).scrollTop() > yourHeader ) {
    yourNavigation.addClass(stickyDiv);
  } else {
    yourNavigation.removeClass(stickyDiv);
  }
});

});

// the sticky nav bar ends here
// the process section animation starts here
//to open steps
$(function(){
var processIcon = $('.process-icon');
    processIcon.click(function(){
        $(this).siblings('.process-textbox').addClass('open');
        $(this).siblings('.process-textbox').find('.close').addClass('open');
        $(this).addClass('display-none');
        $(this).siblings('.visible-process-header').addClass('display-none');
    });
    //to close steps
     $('.close').click(function(){
        $(this).parents('.process-textbox').removeClass('open');
        $(this).removeClass('open');
        $(this).parents('.process-textbox').siblings('.process-icon').removeClass('display-none');
        $(this).parents('.process-textbox').siblings('.visible-process-header').removeClass('display-none');
    });

});


// the process section animation ends here

// the home page ends here

// the faq page starts here

// javascript filter functionality
$(function(){
    var searchbar = document.getElementById('searchbar');
    var question = document.getElementsByClassName('question');

  searchbar.addEventListener('keyup', function(){
      for (var i= 0; i<question.length; i++){
        //   question[i].innerHTML.toUpperCase().search(searchbar.value.toUpperCase())
          if(question[i].innerHTML.toUpperCase().search(searchbar.value.toUpperCase()) > -1){
              question[i].parentNode.style.display='block';
            //  question[i].style.display='block'; 
            //  question[i].parentNode.childNodes[3].style.display='block';
            //  question[i].parentNode.childNodes[5].style.display='block';
            //  question[i].parentNode.childNodes[7].style.display='block';
          } else if (question[i].innerHTML.toUpperCase().search(searchbar.value.toUpperCase()) === -1){
              question[i].parentNode.style.display='none';
            //   question[i].style.display='none';
            //   question[i].parentNode.childNodes[3].style.display='none';
            //  question[i].parentNode.childNodes[5].style.display='none';
            //  question[i].parentNode.childNodes[7].style.display='none';
          }
      }
  });
  
});

// $(function(){
//     $('#searchbar').keyup(function(){
//         if ($(this).val().toUpperCase().indexOf($('.question').html().toUpperCase()) > -1){
//             $('.question').css('display','inherit');
//         } else{
//             $('.question').css('display', 'none');
//         }
//     });
// });
// the faq page ends here

// $(function(){
//     //configuration
//     var width=720;
//     var animationSpeed = 1000;
//     var pause = 5000;
//     var currentSlide = 1;
//     //cache DOM
//     var $slider = $('.slideshow-wrapper');
//     var $slideContainer = $slider.find('.slideshow-container');
//     var $slides = $slideContainer.find('.slidebox');
//     var interval;
    
//     function startSlider(){
//         interval = setInterval(function(){
//           $slideContainer.animate({marginLeft: '-=' + width}, animationSpeed, 'linear', function(){
//               currentSlide++;
//               if(currentSlide === $slides.length){
//                   currentSlide = 1;
//                   $slideContainer.css('margin-left', '0');
//               } 
//           });
//         }, pause);
//     }
    
//     function stopSlider(){
//         clearInterval(interval);
//     }
//     $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
//     startSlider();
// });

