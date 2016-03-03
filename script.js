/*jslint browser: true*/
/*global $, jQuery, alert*/

var timer;
var timer2;

var timerCurrent;
var timerFinish;
var timerSeconds;

var pomodoriTime   =   20; //5* 60;
var shortBreakTime =   5; // * 60;
var longBreakTime  =  15; // * 60;

var pomodoriNb        = 7;
var pomodoriMaxNb     = 8;
var pomodoriLongBreak = 4;
var currentPomodori   = 1;
var bool = false;

function updatePomodori() {
    'use strict';
    var i;
    
    for (i = 1; i <= pomodoriNb; i = i + 1) {
        $('span.pomodori' + i)[0].style.visibility = 'visible';
        if (i < currentPomodori) {
            $('span.pomodori' + i).removeClass("fa-circle-o").addClass("fa-circle");
        } else {
            $('span.pomodori' + i).removeClass("fa-circle").addClass("fa-circle-o");
        }
    }

    for (i = pomodoriNb + 1; i <= pomodoriMaxNb; i = i + 1) {
        $('span.pomodori' + i)[0].style.visibility = 'hidden';
    }

    if (currentPomodori > pomodoriNb) {
        currentPomodori = 0;
    }
}

function pomodoriEnd() {
    'use strict';
    var canvas = document.getElementById('myCanvas'),
        context = canvas.getContext('2d'),
        x = canvas.width / 2,
        y = canvas.height / 2,
        radius = 26,
        startAngle = 1.5 * Math.PI,
        endAngle = 360 * Math.PI / 180 + 1.5 * Math.PI,
        counterClockwise = false;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 8;

    // line color
    if (bool === true) {
        context.strokeStyle = '#d81818';
        bool = false;
    } else {
        context.strokeStyle = '#18d83d';
        bool = true;
    }
    context.stroke();
}

function get2D(num) {
    'use strict';
    if (num.toString().length < 2) {// Integer of less than two digits
        return ("0" + num); // Prepend a zero!
    }
    return (num.toString()); // return string for consistency
}

function drawTimer(percent, time) {
    'use strict';
    var displaySec = 0,
        displayMin = 0,
        deg = 360 / 100 * percent,
        canvas  = document.getElementById('myCanvas'),
        context = canvas.getContext('2d'),
        x = canvas.width / 2,
        y = canvas.height / 2,
        radius = 25,
        startAngle = 1.5 * Math.PI,
        endAngle = deg * Math.PI / 180 + 1.5 * Math.PI,
        counterClockwise = false;

    displaySec = (time % 60).toFixed(0);

    if (displaySec === 60) {
        displayMin = (Math.floor((time / 60)) + 1).toFixed(0);
        displaySec = 0;
    } else {
        displayMin = Math.floor((time / 60)).toFixed(0);
    }

    $('.percent').html(get2D(displayMin) + ':' + get2D(displaySec));

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 7;

    // line color
    context.strokeStyle = '#d81818';

    context.stroke();

    canvas  = document.getElementById('myCanvas2');
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = "50px Arial";
    context.fillText(get2D(displayMin) + ':' + get2D(displaySec), 0, 55);

    // line color
    context.strokeStyle = '#198212';
    context.stroke();
    
}

function stopWatch() {
    'use strict';
    var seconds = 0, percent = 0, a_window;

    seconds = (timerFinish - (new Date().getTime())) / 1000;

    if (seconds <= 0) {

        //drawTimer(100, pomodoriTime);

        clearInterval(timer);

        $('span#watch')[0].setAttribute("class", 'fa fa-play-circle startstop fa-4x');
        $('span#watch')[0].setAttribute("value", 'Start');

        timer2 = setInterval(function () {
            pomodoriEnd();
        }, 500);

        currentPomodori = currentPomodori + 1;
        updatePomodori();
    } else {
        percent = 100 - ((seconds / timerSeconds) * 100);
        drawTimer(percent, seconds);
    }
}

$(document).ready(function () {
    'use strict';

    $('span#watch').click(function (e) {
        e.preventDefault();
        if ($('span#watch')[0].getAttribute("value") === 'Start') {
            $('span#watch')[0].setAttribute("value", 'Stop');
            $('span#watch')[0].setAttribute("class", 'fa fa-stop-circle-o startstop fa-4x');
            timerSeconds = pomodoriTime;
            timerCurrent = 0;
            timerFinish = new Date().getTime() + (timerSeconds * 1000);
            timer = setInterval(function () {
                stopWatch();
            }, 50);

            clearInterval(timer2);
            drawTimer(0, pomodoriTime);
        } else if ($('span#watch')[0].getAttribute("value") === 'Stop') {
            $('span#watch')[0].setAttribute("value", 'Start');
            $('span#watch')[0].setAttribute("class", 'fa fa-play-circle-o fa-4x startstop fa-4x');
            clearInterval(timer);
        } else if ($('span#watch')[0].getAttribute("value") === 'Pause') {
            $('span#watch')[0].setAttribute("value", 'Stop');
            $('span#watch')[0].setAttribute("class", 'fa fa-stop-circle-o fa-4x startstop fa-4x');
            timer = setInterval(function () {
                stopWatch();
            }, 50);
        }
    });

    $('span#watch').dblclick(function (e) {
    });

    $('span#watch').contextmenu(function (e) {
        if ($('span#watch')[0].getAttribute("value") === 'Stop') {
            $('span#watch')[0].setAttribute("value", 'Pause');
            $('span#watch')[0].setAttribute("class", 'fa fa-pause-circle-o fa-4x startstop fa-4x');
            
            clearInterval(timer);
            
        }
    });
    
    $('span#calendar').click(function () {
        $('.datetime').stop().animate({
            right: 0
        }, 200);
        $('.pomodoro').stop().animate({
            right: '-200px'
        }, 200);
    });
    
    $('span#pomodoro').click(function () {
        $('.datetime').stop().animate({
            right: '-200px'
        }, 200);
        $('.pomodoro').stop().animate({
            right: 0
        }, 200);
    });
    
    
    $('span#watch').click();
    
    drawTimer(0, pomodoriTime);

    //var win = require('nw.gui').Window.get();
    //win.setAlwaysOnTop(true);
    updatePomodori();
});


/*
    Date.prototype.getWeek = function () {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };

    var weekNumber = (new Date()).getWeek();

    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var now = new Date();
    $('#toto').html(dayNames[now.getDay()] + " W" + weekNumber + "</br>" + now);

*/

/*
a_window = window.open('popup.html', {
        "position": "center",
        "focus": true,
        "toolbar": false,
        "frame": true,
        "width": 901,
        "height": 127
});
*/