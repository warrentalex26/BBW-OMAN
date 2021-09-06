
(function () {

    let botonSiguiente = document.querySelector('.text-loading');
    botonSiguiente.style.display = 'none';

    let textLoading = document.querySelector('.text-loading-pin');
    textLoading.style.display = 'none';

    e = document.querySelectorAll('[lng-a]');

    for (var i = 0; i < this.e.length; i++) {
        this.e[i].classList.toggle('visible');
    }

    params();

})();

const id_uudi = get_uuid;
const endPoint = 'https://api.playplace.mobi/v1/?mclient=1005&mcountry=OM&mversion=1';
const url_id = 10534;
const offer_id = 4320;
const country = "968";

let msisdn;
let pincode;
let flag;
let flagFunction;
let operator;
let pinLength;
let sub_id_api;
let urlTrackCPA = getUrlTrack();
let transaction_id;

function validar(e) {

    let msisdnValue = document.getElementById('mobile').value;
    let pinValue = document.getElementById('pin').value;

    tecla = (document.all) ? e.keyCode : e.which;
    patron = /\d/;
    te = String.fromCharCode(tecla);

    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        if (msisdnValue != "" && flag === undefined) {
            btnNext1();
        }
        if (pinValue != "" && flag === true) {
            btnNext2();
        }
    }

    return patron.test(te)
}

function setInputEnd(id) {
    var el = document.getElementById(id);
    el.selectionStart = el.selectionEnd = el.value.length;
    el.focus();
}

function btnLng() {

    lng_select = document.getElementById('lng_select');
    mobile = document.getElementById('mobile');
    pincode = document.getElementById('pin');

    textloading = document.getElementById('textloading');
    textloadingPin = document.getElementById('text-loading-pin');

    mobile.placeholder = 'التليفون المحمول';
    pincode.placeholder = 'دبوس';

    lng_select.addEventListener('click', () => {
        if (mobile.placeholder == 'mobile' || pincode.placeholder == 'pin') {
            mobile.placeholder = 'التليفون المحمول';
            pincode.placeholder = 'دبوس';
        } else {
            mobile.placeholder = 'mobile';
            pincode.placeholder = 'pin';
        }
    })

    lngA = document.querySelectorAll('[lng-a]');
    for (var i = 0; i < this.lngA.length; i++) {
        this.lngA[i].classList.toggle('visible');
    }
    lngB = document.querySelectorAll('[lng-b]');
    for (var i = 0; i < this.lngB.length; i++) {
        this.lngB[i].classList.toggle('visible');

    }

    if (textloading.textContent == "Loading") {
        textloading.innerHTML = "ذرا رکیں"
    }else{
        textloading.innerHTML = "Loading"
    }

    if (textloadingPin.textContent == "Loading") {
        textloadingPin.innerHTML = "ذرا رکیں"
    }else{
        textloadingPin.innerHTML = "Loading"
    }


}

function btnNext1() {

    if (flagFunction === false) {
        return;
    }

    msisdn = document.getElementById('mobile').value;

    if (msisdn.length === 8) {
        msisdn = `968${msisdn}`
    }

    let numero = msisdn.substring(3, 6);
    let country = msisdn.substring(0, 3);

    if (msisdn.length === 11) {
        sendNumber(numero, country);
    } else {
        return alert('invalid phone number');
    }

}

function btnNext2() {

    if (flagFunction === false) {
        return;
    }

    pincode = document.getElementById('pin');
    let pintrim = pincode.value.trim();
    let parseEnt = parseInt(pincode.value);

    if (pincode.value == parseEnt) {
        if (pincode.value == null || pincode.value == "" || pintrim == "" || pincode.value.length < 4 || Number.isNaN(parseEnt)) {
            return alert('Invalid Pin');
        } else {
            pincode = pincode.value
            getPinVerification();
        }
    } else {
        return alert('Invalid Pin');
    }
}

function sendNumber(numero) {

    let slicemsisdn = msisdn.substring(3, msisdn.length);
    msisdn = `${country}${slicemsisdn}`;

    console.log(msisdn)

    let numberOperators = [
        {
            number: ['71', '72', '901', '902', '903', '904', '905', '906', '907', '908', '909', '91', '92', '93', '98', '99'],
            operator: 'OM_Omantel',
        },
        {
            number: ['78', '79', '94', '95', '96', '97'],
            operator: 'OM_Ooredoo',
        },
    ];

    let numberFound = numberOperators.find(data => data.number.find(number => {
        let numberOmantel = numero.substring(0, 2);
        if (number === numero) {
            return number;
        } else if (number === numberOmantel) {
            return number;
        }
    }));

    if (numberFound != undefined) {
        if (msisdn.length === 11) {
            operator = numberFound.operator; //Set Operator Name
            return getPinGeneration();
        } else {
            return alert('Invalid Phone Number');
        }
    } else {
        return alert('Invalid Phone Number');
    }
}

function getPinGeneration() {

    flagFunction = false;

    let botonesBox = document.querySelectorAll('.text-btn11');
    let botonSiguiente = document.querySelector('.text-loading');

    botonSiguiente.style.display = 'inline-block';

    for (let index = 0; index < botonesBox.length; index++) {
        botonesBox[index].style.display = "none";
    }

    var req = new XMLHttpRequest();

    req.open('POST', endPoint, true);

    req.send(JSON.stringify({
        method: 'send_pin',
        "msisdn": msisdn,
        "clickid": id_uudi,
        "country": country,
        "operator": operator
    }));

    req.onreadystatechange = function () {

        if (req.status == 200 && req.readyState == 4) {
            flagFunction = true;

            let data = JSON.parse(req.response);
            sub_id_api = data.response.sub_id;

            if (sub_id_api) {

                flag = true;

                //Send Lead
                gtag('event', 'conversion', { 'send_to': 'AW-590224479/viYzCJ6BmN4BEN-4uJkC' });
                //End Lead

                let mobile_box = document.getElementById('mobile_box')
                let pin_box = document.getElementById('pin_box');

                mobile_box.style.display = 'none';
                pin_box.style.display = 'block';

                botonSiguiente.style.display = 'none';

                for (let index = 0; index < botonesBox.length; index++) {
                    if (botonesBox[index].classList.contains('visible')) {
                        botonesBox[index].style.display = "inline-block";
                    }
                }

                transactionId();
                getTransactionIdGago();

            } else {
                alert(`error status = ${req.status}`);
                
                botonSiguiente.style.display = 'none';

                for (let index = 0; index < botonesBox.length; index++) {
                    if (botonesBox[index].classList.contains('visible')) {
                        botonesBox[index].style.display = "inline-block";
                    }
                };
            }
        }else if(req.status == 500 && req.readyState == 4){
            flagFunction = true;
            alert(`error status = ${req.status}`)
            botonSiguiente.style.display = 'none';

                for (let index = 0; index < botonesBox.length; index++) {
                    if (botonesBox[index].classList.contains('visible')) {
                        botonesBox[index].style.display = "inline-block";
                    }
                };
        }else if(req.status == 406 && req.readyState == 4){
            getRedirect();
        };
    }
}

function getPinVerification() {

    flagFunction = false;

    let textLoading = document.querySelector('.text-loading-pin');
    let botonesBox = document.querySelectorAll('.text-btn12');

    for (let index = 0; index < botonesBox.length; index++) {
        botonesBox[index].style.display = "none";
    }

    textLoading.style.display = 'inline-block';

    var req = new XMLHttpRequest();

    req.open('POST', endPoint, true);

    req.send(JSON.stringify({
        method: 'confirm_pin',
        "msisdn": msisdn,
        "pin": pincode,
        "sub_id": sub_id_api,
        "clickid": id_uudi,
        "country": country,
        "operator": operator
    }));

    req.onreadystatechange = function () {

        if (req.status == 200 && req.readyState == 4) {
                flagFunction = true;

                let pin_box = document.getElementById('pin_box');
                let resultado = document.getElementById('resultado')

                resultado.style.display = 'block';
                pin_box.style.display = 'none';

                for (let index = 0; index < botonesBox.length; index++) {
                    if (botonesBox[index].classList.contains('visible')) {
                        botonesBox[index].style.display = "inline-block";
                    }
                }

                getPixel();

        }else if(req.status == 500 && req.readyState == 4){
            alert(`error status = ${req.status}`)
            textLoading.style.display = 'none';

                for (let index = 0; index < botonesBox.length; index++) {
                    if (botonesBox[index].classList.contains('visible')) {
                        botonesBox[index].style.display = "inline-block";
                    }
                }
        };
    }
}

function getRedirect() {
    let urlUGZ = 'https://unlimitedgamez.com/';
    setTimeout(() => {
        return window.location.href = urlUGZ;
    }, 3000);
}

function transactionId(){

    $.ajax({
        type: "POST",
        url: "http://movilenjoy.com/tools/pixel_airg/request.php",
        data: { uuid: id_uudi, url_tracking: urlTrackCPA},
        success: function (data) {
        }
        });

}

function getTransactionIdGago(){

    var req = new XMLHttpRequest();

    req.open('POST', endPoint, true);

    const { aff_id, aff_sub, aff_sub2, aff_sub3, aff_sub4, aff_sub5, placement, creative } = this.setSub_Id;

    req.onreadystatechange = function () {

        if (req.status === 200 && req.readyState === 4) {

            let data = JSON.parse(req.response);
            return transaction_id = data.response.data.transaction_id;
        }
    };

    req.send(JSON.stringify({
        "method": "transaction_id",
        "offer_id": offer_id,
        "aff_id": aff_id,
        "aff_sub": aff_sub,
        "url_id": url_id,
        "aff_sub2": aff_sub2,
        "aff_sub3": aff_sub3,
        "aff_sub4": aff_sub4,
        "aff_sub5": aff_sub5,
        "placement": placement,
        "creative": creative,
    }))

}

function getPixel() {
    var req = new XMLHttpRequest();

    req.open('POST', endPoint, true);

    req.onreadystatechange = function () {

        if (req.status == 200 && req.readyState == 4) {

            getRedirect();
        }
    };

    req.send(JSON.stringify({
        "method": "pixel_id",
        "offer_id": offer_id,
        "transaction_id": transaction_id,
        "msisdn": msisdn,
        "operador": operator,
        "uuid": id_uudi
    }))
}


function getUrlTrack(){
    var req = new XMLHttpRequest();

    req.open('POST', endPoint, true);

    const { aff_id, aff_sub, aff_sub2, aff_sub3, aff_sub4, aff_sub5, placement, creative } = this.setSub_Id;

    req.onreadystatechange = function () {

        if (req.status === 200 && req.readyState === 4) {
            let data = JSON.parse(req.response)
            urlTrackCPA = data.response;
        }
    };

    req.send(JSON.stringify({
        "method": "urlTrack",
        "offer_id": offer_id,
        "aff_id": aff_id,
        "aff_sub": aff_sub,
        "url_id": url_id,
        "aff_sub2": aff_sub2,
        "aff_sub3": aff_sub3,
        "aff_sub4": aff_sub4,
        "aff_sub5": aff_sub5,
        "placement": placement,
        "creative": creative,
    }))
}

function params() {
    let queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let aff_id = urlParams.get('aff_id');
    let aff_sub = urlParams.get('aff_sub');
    let aff_sub2 = urlParams.get('aff_sub2');
    let aff_sub3 = urlParams.get('aff_sub3');
    let aff_sub4 = urlParams.get('aff_sub4');
    let aff_sub5 = urlParams.get('aff_sub5');
    let gclid = urlParams.get('gclid');
    let placement = urlParams.get('placement');
    let creative = urlParams.get('creative');

    if (aff_id === null) {
        aff_id = 1;
    }

    if (!gclid) {
        aff_sub = ""
    } else {
        aff_sub = gclid;
    }

    this.setSub_Id = {
        aff_id,
        sub_source: aff_id,
        source_id: aff_id,
        aff_sub,
        aff_sub2,
        aff_sub3,
        aff_sub4,
        aff_sub5,
        placement,
        creative
    }

}