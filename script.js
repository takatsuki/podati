"use strict";

var timer;
var timerCurrent;
var timerFinish;
var timerSeconds;
var timer =  20;

//var win = require('nw.gui').Window.get();


function get2D(num) {
    if (num.toString().length < 2) {// Integer of less than two digits
        return ("0" + num); // Prepend a zero!
    }
    return (num.toString()); // return string for consistency
}

function drawTimer(percent, time) {
    var displaySec = 0, displayMin = 0, deg = 0;

    deg = 360 / 100 * percent;

    displaySec = (time % 60).toFixed(0);
    if (displaySec == 60) {
        displayMin = (Math.floor((time / 60)) + 1).toFixed(0);
        displaySec = 0;
    } else {
        displayMin = Math.floor((time / 60)).toFixed(0);
    }

    $('.percent').html(get2D(displayMin) + ':' + get2D(displaySec));

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = 35;
    var startAngle = 1.5 * Math.PI;
    var endAngle = deg * Math.PI/180 + 1.5 * Math.PI;
    var counterClockwise = false;

    context.clearRect(0, 0, canvas.width, canvas.height);


/*
    context.beginPath();
    context.beginPath();
    context.arc(x, y, radius + 7, 0, 2 * Math.PI , counterClockwise);
    context.lineWidth = 1;
    context.strokeStyle = '#123456';
    context.stroke();    

    context.beginPath();
    context.beginPath();
    context.arc(x, y, radius - 5, 0, 2 * Math.PI , counterClockwise);
    context.lineWidth = 1;
    context.strokeStyle = '#123456';
    context.stroke();    
    

    context.beginPath();
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI , counterClockwise);
    context.lineWidth = 1;
    context.fillStyle = 'rgba(83, 156, 229, 0.18)';
    context.fill();
    context.strokeStyle = 'rgba(83, 156, 229, 0.18)';
    context.stroke();  
*/
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 10;

    context.font = "20px Arial";
    context.fillText(get2D(displayMin) + ':' + get2D(displaySec), 25, 58);

    // line color
    context.strokeStyle = '#198212';
    context.stroke();

}

function stopWatch() {

    var seconds = 0, percent = 0, a_window;

    seconds = (timerFinish - (new Date().getTime())) / 1000;

    if (seconds <= 0) {

        drawTimer(100, timer);

        clearInterval(timer);

        $('span#watch')[0].setAttribute("class", 'fa fa-play-circle fa-lg startstop');        
        $('span#watch')[0].setAttribute("value", 'Start');

        a_window = window.open('popup.html', {
                "position": "center",
                "focus": true,
                "toolbar": false,
                "frame": true,
                "width": 901,
                "height": 127
        });

    } else {
        percent = 100 - ((seconds / timerSeconds) * 100);
        drawTimer(percent, seconds);
    }


    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

    var weekNumber = (new Date()).getWeek();

    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var now = new Date();
    $('#toto').html(dayNames[now.getDay()] + " W" + weekNumber + "</br>" + now);    
    
}

$(document).ready(function () {

/*    win.setAlwaysOnTop(true);
    win.setTransparent(0.8);
*/
    console.log($('span#watch')[0].getAttribute("value"));
    console.log($('input[type=button]#watch'));

    $('span#watch').click(function (e) {
        e.preventDefault();
        if ($('span#watch')[0].getAttribute("value") === 'Start') {
            $('span#watch')[0].setAttribute("value", 'Stop');
            $('span#watch')[0].setAttribute("class", 'fa fa-stop-circle fa-lg startstop');
            timerSeconds = timer;
            timerCurrent = 0;
            timerFinish = new Date().getTime() + (timerSeconds * 1000);
            timer = setInterval('stopWatch()', 50);
        } else {
            $('span#watch')[0].setAttribute("value", 'Start');
            $('span#watch')[0].setAttribute("class", 'fa fa-play-circle fa-lg startstop');
            clearInterval(timer);
        }
    });

    $('span#watch').click();
    
    drawTimer(0, timer);
    
    
    
    
    $('span#calendar').click(function(){
        $('.datetime').stop().animate({
                right: 0    
            }, 200);
        $('.pomodoro').stop().animate({
                right: '-150px'    
            }, 200); 
    });
    
    $('span#pomodoro').click(function(){
        $('.datetime').stop().animate({
            right: '-150px'
        }, 200);
        $('.pomodoro').stop().animate({
            right: 0
        }, 200); 
    });
    
    
    
    
});
