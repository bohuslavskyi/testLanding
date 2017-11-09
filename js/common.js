var email = document.getElementById('email')
var firstName = document.getElementById('firstName')
var lastName = document.getElementById('lastName')
var area = document.getElementById('area');
var iconFName = document.getElementsByClassName("fName");
var iconLName = document.getElementsByClassName("lName");
var iconEName = document.getElementsByClassName("eName");
var updated = document.getElementById('updated');
var disclaimer = document.getElementById('disclaimer');
var USD = document.getElementById('USD');
var GBP = document.getElementById('GBP');
var EUR = document.getElementById('EUR');

firstName.onkeyup = handleFirstName;
lastName.onkeyup = handleLastName;
email.onkeyup = handleEmail;


function removeClass(obj, cls) {
    var classes = obj[0].className.split(' ');

    for (var i = 0; i < classes.length; i++) {
        if (classes[i] == cls) {
            classes.splice(i, 1); // удалить класс
            i--; // (*)
        }
    }
    obj[0].className = classes.join(' ');

}

function toRemove(tipe) {
    removeClass(tipe, 'fa-check-circle');
    removeClass(tipe, 'fa-times-circle');
}


//Set Form Icon Class
function check(id, classVal) {
    if (id == "firstName") {
        toRemove(iconFName);
        iconFName[0].className = iconFName[0].className + classVal;
    } else if (id == "lastName") {
        toRemove(iconLName);
        iconLName[0].className = iconLName[0].className + classVal;
    } else if (id == "email") {
        toRemove(iconEName);
        iconEName[0].className = iconEName[0].className + classVal;
    }
}

// Function to check letters and numbers
function alphanumeric(inputtxt) {
    var letterNumber = /^[a-zA-Z]+$/;
    if ((inputtxt.value.match(letterNumber))) {
        check(inputtxt.id, " fa-check-circle")
        return true;
    }
    else {
        check(inputtxt.id, " fa-times-circle")
        return false;
    }
}

// If the length of the element's string is 0 then display helper message
function required(inputtx) {
    if (inputtx.value.length == 0) {
        return false;
    }
    return true;
}

// Function to check validate email
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        check(email.id, " fa-check-circle")
        return (true)
    }
    // alert("You have entered an invalid email address!")
    check(email.id, " fa-times-circle")
    return (false)
}


function redirect(param) {

    if(param != "logo"){
        if (required(firstName) && required(lastName) && required(email) && validateEmail(email) && alphanumeric(firstName) && alphanumeric(lastName)) {
            window.location.href = "http://www.test.com?param=" + param;
        } else {
            if (!required(firstName)) {
                console.log("Empty field 'First Name");
            }
            if (!required(lastName)) {
                console.log("Empty field: 'Last Name");
            }
            if (!required(email)) {
                console.log("Empty field: 'Email");
            }
            if (!validateEmail(email)) {
                console.log("You have entered an invalid email address!");
            }
            if (!alphanumeric(firstName)) {
                console.log("'First Name': Please input alphabet characters only");
            }
            if (!alphanumeric(lastName)) {
                console.log("'Last Name': Please input alphabet characters only");
            }

        }
    }else {
        window.location.href = "http://www.test.com?param=" + param;
    }


}



//onkeyup func for firstName
function handleFirstName(e) {
    alphanumeric(firstName);
}
//onkeyup func for lastName
function handleLastName(e) {
    alphanumeric(lastName);
}
//onkeyup func for email
function handleEmail(e) {
    validateEmail(email);
}



// Load rate API
function loadXMLDoc() {

    window.setInterval(httpRequest, 30000)

    
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var val = JSON.parse(xmlhttp.responseText)

                updated.innerHTML = val.time.updated;
                disclaimer.innerHTML = val.disclaimer;
                USD.innerHTML = val.bpi.USD.rate;
                GBP.innerHTML = val.bpi.GBP.rate;
                EUR.innerHTML = val.bpi.EUR.rate;

                console.log(xmlhttp.responseText);
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    
    function httpRequest() {
        xmlhttp.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json", true);
        xmlhttp.send();
    }
    httpRequest()

}
document.addEventListener("DOMContentLoaded", loadXMLDoc);


//Scroll button
$('.slide[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

$(window).load(function () {

    $(".loader_inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");



});
