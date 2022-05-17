window.onload = function() {
  openProductInfo();
  closeProductInfo();
}

/* Scroll Hide Bar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}

/* productInfo */
$(document).ready(function() {
  $(".product-colors span").click(function() {
    $(".product-colors span").removeClass("active");
    $(this).addClass("active");
    $("#product-card-background").css("background", $(this).attr("data-color"));
    $(".product-price").css("color", $(this).attr("data-color"));
    $(".product-button").css("color", $(this).attr("data-color"));
    $(".product-pic").css("background-image", $(this).attr("data-pic"));
  })
})


/* open productInfo */
//javascript
function openProductInfo() {
  document.getElementsByClassName("p-detail")[0].addEventListener("click", function() {
    document.getElementById("product-card-background").style.height = "100%";
    document.getElementById("product-card-background").style.opacity = "1";
  });
}

//jquery
/*
$(document).ready(function() {
  $(".p-detail").click(function() {
    $("#product-card-background").css("height","100%");
    $("#product-card-background").css("opacity","1");
  })
})
*/

/* close productInfo */
//javascript

function closeProductInfo() {
  document.getElementsByClassName("fa-times")[1].addEventListener("click", function() {
    document.getElementById("product-card-background").style.height = "0";
    document.getElementById("product-card-background").style.opacity = "0";
  });
}

//jquery
/*
$(document).ready(function() {
  $(".fa-times").click(function() {
    $("#product-card-background").css("height", "0");
    $("#product-card-background").css("opacity", "0");
  })
})
*/
/* Pagination */
$(document).ready(function() {
  $('.pagination-inner a').on('click', function() {
    $(this).siblings().removeClass('pagination-active');
    $(this).addClass('pagination-active');
  })
})
