window.onload = function() {
    //localStorage.clear();
    createLocalStorage();
    checkLogin();
    showMenu();
    showTitle();
    showProduct();
    activePagination();
    showCart();
    showSearch();
    showSignIn();
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



/* menu */
function showMenu() {
    var brand = JSON.parse(localStorage.getItem('brand'));
    var add = '<a href="index.html">Trang chủ</a>';

    for (var i = 0; i < brand.length; i++)
        add += '<a href="index.html?' +
        removeSpace(removeAccents(brand[i].toLowerCase())) +
        '&1">' +
        brand[i] +
        '</a>';

    add += '<label for="chk" class="hide-menu-btn"><i class="fas fa-times"></i></label>';

    document.getElementById('menu').innerHTML = add;
}


/* signin */
function showSignIn() {
    var signInBackground = document.getElementById('signin-background');
    var closeButton = signInBackground.getElementsByClassName('fa-times')[0];
    var i = document.getElementsByClassName('fa-user-alt')[0];
    i.addEventListener('click', function() {
        signInBackground.style.height = '100%';
        signInBackground.style.opacity = '1';
        document.getElementById('navbar').style.top = '-100px';
        document.body.classList.add('noscroll');
    });

    closeButton.addEventListener('click', function() {
        signInBackground.style.height = '0';
        signInBackground.style.opacity = '0';
        document.getElementById('navbar').style.top = '0';
        document.body.classList.remove('noscroll');
    });
}

function toggleSignup() {
    document.getElementById("login-toggle").style.backgroundColor = "#fff";
    document.getElementById("login-toggle").style.color = "#222";
    document.getElementById("signup-toggle").style.backgroundColor = "#57B846";
    document.getElementById("signup-toggle").style.color = "#fff";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}

function toggleLogin() {
    document.getElementById("login-toggle").style.backgroundColor = "#57B846";
    document.getElementById("login-toggle").style.color = "#fff";
    document.getElementById("signup-toggle").style.backgroundColor = "#fff";
    document.getElementById("signup-toggle").style.color = "#222";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

function checkValueSignUp() {
    var signUpForm = document.getElementById('signup-form').children[0];
    var fullname = signUpForm.children[0];
    var address = signUpForm.children[1];
    var phone = signUpForm.children[2];
    var username = signUpForm.children[3];
    var password = signUpForm.children[4];
    var password2 = signUpForm.children[5];
    var flag = true;
    if (!fullname.value) {
        alertify.error('Họ tên không được để trống !');
        flag = false
    }

    if (!address.value) {
        alertify.error('Ô địa chỉ còn trống !');
        flag = false;
    }

    var sdt_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (!phone.value) {
        alertify.error('Chưa điền số điện thoại !');
        flag = false;
    } else if (sdt_regex.test(phone.value) == false) {
        alertify.error('Số điện thoại không đúng định dạng!');
        phone.value = '';
        flag = false;
    }

    if (!username.value) {
        alertify.error('Tên đăng nhập còn trống !');
        flag = false;
    }

    if (!password.value) {
        alertify.error('Vui lòng điền mật khẩu !');
        flag = false;
    } else if (password.value.length < 8) {
        alertify.error('Mật khẩu phải trên 8 kí tự !');
        password.value = '';
        flag = false;
    }

    if (password2.value != password.value) {
        alertify.error('2 Mật khẩu không trùng khớp !');
        password2.value = '';
        flag = false;
    }

    if (flag == false) {
        return false;
    }

    var d = new Date();
    var time = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    var user = {
        username: username.value,
        password: password.value,
        fullname: fullname.value,
        address: address.value,
        phone: phone.value,
        date: time
    };
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (user.username == userArray[i].username) {
            alertify.error('Tên đăng nhập đã có người sử dụng !');
            username.value = '';
            return false;
        }
    }

    userArray.push(user);
    localStorage.setItem('user', JSON.stringify(userArray));
    alertify.success('Bạn đã đăng ký thành công !');
    toggleLogin();
}

function checkValueSignIn() {
    var loginForm = document.getElementById('login-form').children[0];
    var username = loginForm.children[0].value;
    var password = loginForm.children[1].value;
    var flag = true;

    if (!username) {
        alertify.error('Bạn chưa điền tên đăng nhập !');
        flag = false;
    }

    if (!password) {
        alertify.error('Bạn chưa điền mật khẩu !');
        flag = false;
    }

    if (flag == false) {
        return false;
    }

    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username && password == userArray[i].password) {
            localStorage.setItem('userLogin', JSON.stringify(userArray[i]));
            window.location.reload(true);
            return true;
        }
    }
    alertify.error('Sai thông tin đăng nhập !');
    return false;
}

function checkLogin() {
    var add = '';
    var loginNameDiv = document.getElementById('login-name');
    var customerDiv = document.getElementsByClassName('customer')[0];
    var iLogout = customerDiv.children[0];
    var iLogin = customerDiv.children[1];
    if (localStorage.getItem('userLogin') != null) {
        var user = JSON.parse(localStorage.getItem('userLogin'));
        add = 'Xin chào, ' + user.fullname;

        iLogout.style.display = 'initial';
        iLogin.style.display = 'none';
    } else {
        iLogout.style.display = 'none';
        iLogin.style.display = 'initial';
        add = '';
    }

    loginNameDiv.innerHTML = add;
}

function logout() {
    localStorage.removeItem('userLogin');
    localStorage.setItem('cart', '[]');
    window.location.reload(true);
}

/* bill */

function createBill() {
    if (localStorage.getItem('userLogin') == null) {
        alertify.alert("Bạn phải đăng nhập để tiếp tục mua hàng !");
        return false;
    }

    var cartArray = JSON.parse(localStorage.getItem('cart'));
    var info = '';
    var quantityDiv = document.getElementsByClassName('cart-item-quantity');

    for (var i = 0; i < cartArray.length; i++) {
        var quantity = quantityDiv[i].children[0].value;
        info += quantity + ' x ' + 'Giày ' + getAccentBrand(cartArray[i].brand) + ' ' + cartArray[i].name + ', Màu: ' + cartArray[i].color + ', Size ' + cartArray[i].size + '</br>';
    }
    var cardTotal = document.getElementById('cart-total');
    var totalPrice = cardTotal.innerHTML;

    var customer = JSON.parse(localStorage.getItem('userlogin'));
    var date = new Date();
    var time = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    var billArray = JSON.parse(localStorage.getItem('bill'));
    var bill = {
        id: billArray.length + 1,
        info: info,
        totalPrice: totalPrice,
        //customer: customer,
        date: time,
        status: 'Chưa xử lý'
    };
    billArray.unshift(bill);
    localStorage.setItem('bill', JSON.stringify(billArray));
    localStorage.setItem('cart', '[]');
    showCartItem();
    recalculateCart();
    showBill();
}

function showBill() {
    var add = '';
    var billArray = JSON.parse(localStorage.getItem('bill'));
    for (var i = 0; i < billArray.length; i++)
        add += '<div class="bill-item">' +
        '<div class="bill-item-info">' + billArray[i].info + '</div>' +
        '<div class="bill-item-total">' + billArray[i].totalPrice + '</div>' +
        '<div class="bill-item-time">' + billArray[i].date + '</div>' +
        '<div class="bill-item-status">' + billArray[i].status + '</div>' +
        '</div>'

    document.getElementById('bill-wrapper').innerHTML = add;
}

/* cart */
function showCart() {
    var cartBackground = document.getElementById('cart-background');
    var closeButton = cartBackground.getElementsByClassName('fa-times')[0];
    var i = document.getElementsByClassName('fa-shopping-cart')[0];
    i.addEventListener('click', function() {
        cartBackground.style.height = '100%';
        cartBackground.style.opacity = '1';
        document.getElementById('navbar').style.top = '-100px';
        document.body.classList.add('noscroll');

        showCartItem();
        recalculateCart();
        $('.cart-item-quantity input').change(function() {
            updateQuantity(this);
        });

        $('.remove-item').click(function() {
            removeItem(this);
        });
    });

    closeButton.addEventListener('click', function() {
        cartBackground.style.height = '0';
        cartBackground.style.opacity = '0';
        document.getElementById('navbar').style.top = '0';
        document.body.classList.remove('noscroll');
    });
}

function showCartItem() {
    var add = '';
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cartArray.length; i++)
        add += '<div class="cart-item">' +
        '<div class="cart-item-pic"></div>' +
        '<div class="cart-item-detail">' +
        '<div class="cart-item-name">' + cartArray[i].name + '</div>' +
        '<div class="cart-item-description">' +
        'Màu: ' + capitalize(cartArray[i].color) + '</br>' +
        'Size: ' + cartArray[i].size +
        '</div>' +
        '</div>' +
        '<div class="cart-item-price">' + money(cartArray[i].price) + '</div>' +
        '<div class="cart-item-quantity">' +
        '<input type="number" value="1" min="1">' +
        '</div>' +
        '<div class="remove-item">' +
        '<button>Xoá</button>' +
        '</div>' +
        '<div class="cart-item-price-total">' + money(cartArray[i].price) + '</div>' +
        '</div>';

    document.getElementById('cart-wrapper').innerHTML = add;
    var divPic = document.getElementsByClassName('cart-item-pic');
    for (var i = 0; i < cartArray.length; i++) {
        divPic[i].style.background = cartArray[i].img;
    }
}

/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 20000;
var fadeTime = 300;

/* Recalculate cart */
function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    $('.cart-item').each(function() {
        subtotal += parseFloat($(this).children('.cart-item-price-total').text().replace(/,/g, ''));
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        $('#cart-subtotal').html(money(subtotal));
        $('#cart-tax').html(money(tax));
        $('#cart-shipping').html(money(shipping));
        $('#cart-total').html(money(total));
        if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
            $('.totals').fadeOut(fadeTime);
        } else {
            $('.totals').fadeIn(fadeTime);
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.cart-item-price').text().replace(/,/g, ''));
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.cart-item-price-total').each(function() {
        $(this).fadeOut(fadeTime, function() {
            $(this).text(money(linePrice));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent();
    var index = productRow.index();
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    cartArray.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartArray));

    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
    });
}

/* search */
function showSearch() {
    var searchBackground = document.getElementById('search-background');
    var closeButton = searchBackground.getElementsByClassName('fa-times')[0];
    var i = document.getElementsByClassName('fa-search')[0];
    i.addEventListener('click', function() {
        searchBackground.style.height = '100%';
        searchBackground.style.opacity = '1';
        document.getElementById('navbar').style.top = '-100px';
        document.body.classList.add('noscroll');
    });

    closeButton.addEventListener('click', function() {
        searchBackground.style.height = '0';
        searchBackground.style.opacity = '0';
        document.getElementById('navbar').style.top = '0';
        document.body.classList.remove('noscroll');
    });
}

function search() {
    var extendButton = document.getElementById('searchextend');
    var add = '';
    var src = 'images/product/';
    var productArray = JSON.parse(localStorage.getItem('product'));
    var searchValue = document.getElementById('search').value.toLowerCase();

    var productPerPage = 8;
    var curentPage = 1;

    var brand = document.getElementById('brandsearch').value;
    var priceForm = document.getElementById('priceform').value;
    var pricetTo = document.getElementById('priceto').value;
    if (searchValue != '')
        productArray = productArray.filter(product => product.name.toLowerCase().search(searchValue) != -1);

    if (extendButton.className != '' && brand != 'all')
        productArray = productArray.filter(product => product.brand == brand && product.price >= priceForm && product.price <= priceTo);

    var numPages = Math.ceil(productArray.length / productPerPage);

    for (var i = (curentPage - 1) * productPerPage; i < (curentPage * productPerPage) && i < productArray.length; i++)
        add +=
        '<div class="item">' +
        '<div class="p-img"><img src="' + src + productArray[i].brand + '/' + productArray[i].id + '/' + productArray[i].id + '1.jpg' + '" /></div>' +
        '<div class="p-description">' +
        '<h2 title="' + productArray[i].name + '">' + productArray[i].name + '</h2>' +
        '<p>' + money(productArray[i].price) + '</p>' +
        '</div>' +
        '<button class="p-detail" onclick="showProductCard(' + productArray[i].id + ')">Chi Tiết</button></div>';

    document.getElementById('product-result').innerHTML = add;

    return brand;
}

function search2() {
    var productsearch = document.getElementById('search').value.toLowerCase();
    var productArray = JSON.parse(localStorage.getItem('product'));
    var s = '';
    if (document.getElementById('searchextend').className == '') {
        for (var i = 0; i < productArray.length; i++) {
            if ((productArray[i].name.toLowerCase().search(productsearch) != -1 || productArray[i].brand.toLowerCase().search(productsearch) != -1) && productsearch != '') {
                s += '<div class="card">' +
                    '<img src="' + productArray[i].img + '">' +
                    '<p>' + productArray[i].name + '</p>' +
                    '<p> Giá: ' + currency(productArray[i].price) + '</p>' +
                    '<button class="btn" onClick="showProductInfo(' + productArray[i].productId + ')">Chi tiết</button></div>';
            }
        }
    } else {
        var brandsearch = document.getElementById('brandsearch').value;
        var priceform = document.getElementById('priceform').value;
        var priceto = document.getElementById('priceto').value;
        if (brandsearch == 'all') {
            for (var i = 0; i < productArray.length; i++) {
                if (productArray[i].name.toLowerCase().search(productsearch) != -1 && productArray[i].price >= priceform && productArray[i].price <= priceto) {
                    s += '<div class="card">' +
                        '<img src="' + productArray[i].img + '">' +
                        '<p>' + productArray[i].name + '</p>' +
                        '<p> Giá: ' + currency(productArray[i].price) + '</p>' +
                        '<button class="btn" onClick="showProductInfo(' + productArray[i].productId + ')">Chi tiết</button></div>';
                }
            }
        } else {
            for (var i = 0; i < productArray.length; i++) {
                if (productArray[i].name.toLowerCase().search(productsearch) != -1 && productArray[i].brand == brandsearch && productArray[i].price >= priceform && productArray[i].price <= priceto) {
                    s += '<div class="card">' +
                        '<img src="' + productArray[i].img + '">' +
                        '<p>' + productArray[i].name + '</p>' +
                        '<p> Giá: ' + currency(productArray[i].price) + '</p>' +
                        '<button class="btn" onClick="showProductInfo(' + productArray[i].productId + ')">Chi tiết</button></div>';
                }
            }
        }

    }
    document.getElementById('searchresult').innerHTML = s;
}

function showextend() {
    if (document.getElementById('searchextend').className == '') {
        document.getElementById('searchextend').classList.add('active')
        document.querySelector('#search-background .searchbox button img').src = 'images/icon/arrow2.svg';
    } else {
        document.getElementById('searchextend').classList.remove('active');
        document.querySelector('#search-background .searchbox button img').src = 'images/icon/arrow.svg';
        var priceform = document.getElementById('priceform').value = "";
        var priceto = document.getElementById('priceto').value = "";
    }
}

function showextend2() {
    if (document.getElementById('searchextend').className == '') {
        document.getElementById('searchextend').classList.add('active')
        document.querySelector('#search-background .searchbox button img').src = '../images/icon/arrow2.svg';
    } else {
        document.getElementById('searchextend').classList.remove('active');
        document.querySelector('#search-background .searchbox button img').src = '../images/icon/arrow.svg';
        var priceform = document.getElementById('priceform').value = "";
        var priceto = document.getElementById('priceto').value = "";
    }
}

/* title */
function getAccentBrand(brand) {
    var brandArray = JSON.parse(localStorage.getItem('brand'));

    return brandArray.find(Accentbrand => removeSpace(removeAccents(Accentbrand.toLowerCase())) == brand);
}

function showTitle() {
    var currentBrand = getCurrentBrand();
    var add = '';

    if (removeSpace(removeAccents(currentBrand.toLowerCase())) == currentBrand)
        add = 'Giày ' + getAccentBrand(currentBrand);

    if (currentBrand == 'all')
        add = 'Tất cả';

    document.getElementById('title').innerHTML = add;
}

/* product */
function getCurrentPage() {
    var temp = window.location.href.split("?");

    if (temp[1] == null)
        return 1;

    return (temp[1].split("&")[1]) >> 0;
}

function getCurrentBrand() {
    var temp = window.location.href.split("?");

    if (temp[1] == null)
        return 'all';

    return temp[1].split("&")[0];
}

function showProduct() {
    var add = '';
    var src = 'images/product/';
    var productArray = JSON.parse(localStorage.getItem('product'));

    var productPerPage = 8;
    var curentPage = getCurrentPage();

    var brand = getCurrentBrand();
    if (brand != 'all')
        var productArray = productArray.filter(product => product.brand == brand);

    var numPages = Math.ceil(productArray.length / productPerPage);

    for (var i = (curentPage - 1) * productPerPage; i < (curentPage * productPerPage) && i < productArray.length; i++)
        add +=
        '<div class="item">' +
        '<div class="p-img"><img src="' + src + productArray[i].brand + '/' + productArray[i].id + '/' + productArray[i].id + '1.jpg' + '" /></div>' +
        '<div class="p-description">' +
        '<h2 title="' + productArray[i].name + '">' + productArray[i].name + '</h2>' +
        '<p>' + money(productArray[i].price) + '</p>' +
        '</div>' +
        '<button class="p-detail" onclick="showProductCard(' + productArray[i].id + ')">Chi Tiết</button></div>';

    document.getElementById('product').innerHTML = add;

    showNumPages(numPages);
    showPaginationPrevNext(numPages);
}

/* productInfo */
function showProductCard(currentId) {
    var productCardBackground = document.getElementById('product-card-background');
    var i = productCardBackground.getElementsByClassName('fas fa-times')[0];
    var h1 = document.getElementById('product-brand');
    var p = document.getElementById('product-name');
    var divPic = document.getElementById('product-pic');
    var divColor = document.getElementById('product-colors');
    var spanColor = divColor.children;
    var divSize = document.getElementById('product-size');
    var spanSize = divSize.children;
    var divPrice = document.getElementById('product-price');
    var aButton = document.getElementById('product-button');

    var add = '';

    //Hiển thị Background
    productCardBackground.style.height = "100%";
    productCardBackground.style.opacity = "1";
    document.body.classList.add('noscroll');

    //Ẩn Background
    i.addEventListener('click', function() {
        productCardBackground.style.height = "0";
        productCardBackground.style.opacity = "0";
        document.body.classList.remove('noscroll');
    });

    var productArray = JSON.parse(localStorage.getItem('product'));
    var currentProduct = productArray.find(product => product.id == currentId);
    var colorObject = JSON.parse(localStorage.getItem('color'));

    // Mặc định khi hiển thị sản phẩm
    h1.innerHTML = getAccentBrand(currentProduct.brand);
    p.innerHTML = currentProduct.name;
    var url = 'url(images/product/' + currentProduct.brand + '/' + currentProduct.id + '/' + currentProduct.id + 1 + '.jpg)';
    divPic.style.background = url + ' center';
    divPic.style.backgroundSize = 'cover';

    for (var i = 0; i < currentProduct.color.length; i++) {
        var currentColor = removeSpace(removeAccents(currentProduct.color[i]));
        add += '<span style="background: ' + colorObject[currentColor] + '"></span>'
    }
    divColor.innerHTML = add;
    spanColor[0].classList.add('active');

    add = '';
    var minSize = 36,
        maxSize = 40;
    for (var i = minSize; i <= maxSize; i++) {
        add += '<span>' + i + '</span>';
    }
    divSize.innerHTML = add;
    spanSize[0].classList.add('active');
    divPrice.innerHTML = money(currentProduct.price);
    var currentColor = removeSpace(removeAccents(currentProduct.color[0]));
    divPrice.style.color = colorObject[currentColor];
    aButton.style.color = colorObject[currentColor];
    productCardBackground.style.background = colorObject[currentColor];

    // activeProductColor
    for (var i = 0; i < spanColor.length; i++) {
        spanColor[i].addEventListener('click', function() {
            var currentSpan = divColor.getElementsByClassName('active');
            currentSpan[0].classList.remove('active');

            this.classList.add('active');

            // Không lấy được index từ var i nên mới lấy kiểu này
            var index = Array.prototype.indexOf.call(this.parentNode.children, this);
            var url = 'url(images/product/' + currentProduct.brand + '/' + currentProduct.id + '/' + currentProduct.id + (index + 1) + '.jpg)';
            divPic.style.background = url + ' center';
            divPic.style.backgroundSize = 'cover';
            var currentColor = removeSpace(removeAccents(currentProduct.color[index]));
            divPrice.style.color = colorObject[currentColor];
            aButton.style.color = colorObject[currentColor];
            productCardBackground.style.background = colorObject[currentColor];
        });
    }

    //activeProductSize
    for (var i = 0; i < spanSize.length; i++) {
        spanSize[i].addEventListener('click', function() {
            var currentSize = divSize.getElementsByClassName('active');
            currentSize[0].classList.remove('active');

            this.classList.add('active');
        });
    }

    aButton.onclick = function() {
        currentProduct.img = divPic.style.background;
        addToCart(currentProduct);
        productCardBackground.style.height = "0";
        productCardBackground.style.opacity = "0";
        document.body.classList.remove('noscroll');
    }
}

/* cart */
function addToCart(currentProduct) {
    var divSize = document.getElementById('product-size');
    var currentSize = divSize.getElementsByClassName('active')[0].innerHTML;
    currentProduct.size = currentSize;

    var divColor = document.getElementById('product-colors');
    var currentColor = divColor.getElementsByClassName('active')[0];
    var index = Array.prototype.indexOf.call(divColor.children, currentColor);
    currentProduct.color = currentProduct.color[index];


    var cartArray = JSON.parse(localStorage.getItem('cart'));
    cartArray.unshift(currentProduct);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    alertify.success('Đã thêm vào giỏ hàng !');
}

function deleteCart() {
    localStorage.removeItem('cart');
}

/* Pagination */

function showNumPages(numPages) {
    var brand = getCurrentBrand();
    var add = '';
    for (var i = 1; i <= numPages; i++)
        add += '<a href="index.html?' + brand + '&' + i + '">' + i + '</a>';

    document.getElementById('pagination-inner').innerHTML = add;
}

function showPaginationPrevNext(numPages) {
    var btnPrev = document.getElementById('pagination-older');
    var btnNext = document.getElementById('pagination-newer');
    var curentPage = getCurrentPage();
    var brand = getCurrentBrand();

    if (curentPage == 1)
        btnPrev.style.visibility = "hidden";
    else {
        btnPrev.style.visibility = "visible";
        btnPrev.href = 'index.html?' + brand + '&' + (curentPage - 1);
    }
    if (curentPage == numPages || numPages == 0)
        btnNext.style.visibility = "hidden";
    else {
        btnNext.style.visibility = "visible";
        btnNext.href = 'index.html?' + brand + '&' + (curentPage + 1);
    }
}

function activePagination() {
    var a = document.getElementById('pagination-inner').children;
    var curentPage = getCurrentPage();

    a[curentPage - 1].classList.add('pagination-active');
}

/* testimonial-contents */
$(document).ready(function() {
    $('.testimonial-pics img').click(function() {
        $(".testimonial-pics img").removeClass("active");
        $(this).addClass("active");

        $(".testimonial").removeClass("active");
        $("#" + $(this).attr("alt")).addClass("active");
    })
})


/* local Storage */
function createLocalStorage() {
    if (localStorage.getItem('product') === null) {
        var productArray = [
            { id: 407, brand: 'sneaker', name: 'Juno Active - Mix Mesh', price: 220000, color: ['đỏ', 'đen', 'xanh'] },
            { id: 406, brand: 'sneaker', name: 'Juno Fashion - Oxford Style', price: 150000, color: ['đen'] },
            { id: 405, brand: 'sneaker', name: 'Juno Active - Mesh Basic', price: 300000, color: ['đỏ', 'xám', 'đen', 'tím'] },
            { id: 404, brand: 'sneaker', name: 'Juno Soft - Knit Basic', price: 490000, color: ['xanh dương', 'hồng', 'xanh', 'xám', 'đen'] },
            { id: 403, brand: 'sneaker', name: 'Juno Active - Mesh Basic', price: 220000, color: ['vàng', 'xanh rêu', 'đen', 'tím', 'hồng', 'nâu'] },
            { id: 402, brand: 'sneaker', name: 'Juno Fashion - Mix Ribbon', price: 150000, color: ['đen', 'xám'] },
            { id: 401, brand: 'sneaker', name: 'Juno Active Stater 2', price: 555000, color: ['hồng', 'xanh rêu', 'xanh dương'] },
            { id: 310, brand: 'sandal', name: 'Chiến binh cổ cao', price: 210000, color: ['trắng', 'đen', 'kem đậm'] },
            { id: 309, brand: 'sandal', name: 'Gót trụ 5cm phối khóa trang trí', price: 260000, color: ['đen', 'hồng', 'da'] },
            { id: 308, brand: 'sandal', name: 'Gót trụ 9cm quai chéo', price: 110000, color: ['xanh nhạt', 'đen', 'cam nhạt'] },
            { id: 307, brand: 'sandal', name: 'Gót trụ 9cm', price: 150000, color: ['nâu', 'kem', 'đen'] },
            { id: 306, brand: 'sandal', name: 'Gót vuông 5cm quai ngang', price: 230000, color: ['đen', 'trắng', 'kem đậm'] },
            { id: 305, brand: 'sandal', name: 'Hở mũi có dây cổ chân', price: 260000, color: ['vàng đất', 'kem đậm', 'đen'] },
            { id: 304, brand: 'sandal', name: 'Quai ngang gót vuông', price: 170000, color: ['kem nhạt', 'trắng ngà', 'đen'] },
            { id: 303, brand: 'sandal', name: 'T-strap khóa trang trí', price: 290000, color: ['đen', 'xanh đậm', 'trắng'] },
            { id: 302, brand: 'sandal', name: 'Đế bệt quai mảnh phối nơ', price: 260000, color: ['đen', 'xanh nhạt', 'kem'] },
            { id: 301, brand: 'sandal', name: 'Đế thể thao cắt laser', price: 270000, color: ['đen', 'kem', 'kem đậm'] },
            { id: 210, brand: 'caogot', name: 'Gót 5cm hở mũi phong cách Art Deco', price: 190000, color: ['đỏ huyết', 'kem nhạt', 'đen'] },
            { id: 209, brand: 'caogot', name: 'Gót hở gót', price: 170000, color: ['kem nhạt', 'đen', 'lục đậm'] },
            { id: 208, brand: 'caogot', name: 'Gót mũi nhọn có viền', price: 230000, color: ['trắng', 'kem đậm', 'xanh đen'] },
            { id: 207, brand: 'caogot', name: 'Gót mũi nhọn khoét gót', price: 250000, color: ['đỏ đô', 'kem', 'đen'] },
            { id: 206, brand: 'caogot', name: 'Gót mũi nhọn trang trí nơ', price: 260000, color: ['xanh ngọc', 'kem', 'đen'] },
            { id: 205, brand: 'caogot', name: 'Gót si bóng mũi nhọn', price: 390000, color: ['đen', 'da', 'xanh đậm'] },
            { id: 204, brand: 'caogot', name: 'Gót sling back mũi nhọn', price: 290000, color: ['kem nhạt', 'đen', 'kem đậm'] },
            { id: 203, brand: 'caogot', name: 'Gót slingback gót cách điệu', price: 220000, color: ['đỏ huyết', 'kem đậm', 'đen'] },
            { id: 202, brand: 'caogot', name: 'Gót slingback mũi nhọn gót thanh', price: 180000, color: ['đen', 'trắng', 'kem'] },
            { id: 201, brand: 'caogot', name: 'Gót slingback', price: 260000, color: ['đen', 'kem', 'kem tái'] },
            { id: 111, brand: 'bupbe', name: 'Cut-out nơ', price: 250000, color: ['kem tái', 'đen', 'đỏ huyết'] },
            { id: 110, brand: 'bupbe', name: 'Cut-out', price: 570000, color: ['xanh đậm', 'trắng', 'chanh'] },
            { id: 109, brand: 'bupbe', name: 'Dây chéo', price: 210000, color: ['hồng đậm', 'xanh rêu', 'đen'] },
            { id: 108, brand: 'bupbe', name: 'Guốc mules', price: 303000, color: ['kem tái', 'đen', 'kem nhạt'] },
            { id: 107, brand: 'bupbe', name: 'Khoét v', price: 184550, color: ['lục', 'đen', 'cam tái'] },
            { id: 106, brand: 'bupbe', name: 'Mules mũi nhọn', price: 150000, color: ['kem', 'đen', 'kem đậm'] },
            { id: 105, brand: 'bupbe', name: 'Mules', price: 150000, color: ['trắng', 'kem tái', 'đen'] },
            { id: 104, brand: 'bupbe', name: 'Mũi bầu', price: 300000, color: ['da', 'trắng', 'đen'] },
            { id: 103, brand: 'bupbe', name: 'Mũi nhọn viền', price: 250000, color: ['hồng', 'đen', 'xanh đậm'] },
            { id: 102, brand: 'bupbe', name: 'Mũi nhọn', price: 230000, color: ['đen', 'hồng nhạt', 'kem đậm'] },
            { id: 101, brand: 'bupbe', name: 'Slingback', price: 240000, color: ['xanh ngọc', 'đen', 'kem nhạt'] }
        ];
        localStorage.setItem('product', JSON.stringify(productArray));
    }

    //if(localStorage.getItem('brand')===null)
    var brandArray = ['búp bê', 'cao gót', 'sandal', 'sneaker', 'đồ ngốc'];
    localStorage.setItem('brand', JSON.stringify(brandArray));

    //if (localStorage.getItem('color') === null)
    var colorObject = {
        xanh: '#A6CFD3',
        xam: '#B6BBBE',
        den: '#141414',
        do: '#71292D',
        tim: '#403345',
        timca: '#621C38',
        hong: '#E6A39B',
        hongnhat: '#F7E0CE',
        vang: '#E1CA89',
        xanhreu: '#777A45',
        xanhreudam: '#173631',
        xanhduong: '#30738F',
        xanhduongdam: '#1C2D41',
        xanhlacaydam: '#5A603E',
        xanhngoc: '#02404B',
        nau: '#4A4448',
        naunhat: '#9F9281',
        da: '#E6D2AF',
        cam: '#BA7D50',
        trang: '#FFFFFF',
        vang: '#E6C635',
        camnhat: '#d29671',
        xanhnhat: '#c0cbcd',
        da: '#cac0b7',
        kem: '#f6f2e7',
        nau: '#817066',
        kemdam: '#ab8872',
        vangdat: '#e09f43',
        kemnhat: '#dea172',
        trangnga: '#e9c3c0',
        xanhdam: '#364958',
        xannhat: '#b6d8e4',
        dohuyet: '#641d21',
        lucdam: '#1e3d38',
        xanhden: '#32363f',
        dodo: '#910f2b',
        kemtai: '#c4c2b6',
        chanh: '#e8c837',
        hongdam: '#ce797c',
        xanhreu: '#666c46',
        luc: '#939f9f',
        camtai: '#a4663f',
        xanhngoc: '#a6c6bb',
    };
    localStorage.setItem('color', JSON.stringify(colorObject));

    if (localStorage.getItem('cart') === null)
        localStorage.setItem('cart', '[]');

    if (localStorage.getItem('bill') === null)
        localStorage.setItem('bill', '[]');

    if (localStorage.getItem('user') === null)
        localStorage.setItem('user', '[]');
}





/* Định dạng sang chuỗi tiền */
function money(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫';
}

/* Xoá dấu */
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

/* Xóa khoảng trắng */
function removeSpace(str) {
    return str.replace(/\s+/g, '');
}

/* In hoa chữ đầu */
function capitalize(str) {
    return str && str[0].toUpperCase() + str.slice(1);
}