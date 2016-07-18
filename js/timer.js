var Timer = ( function(){
    
    function timerClass() {
        this.fromDate;
        this.toDate;
        this.diffTimeDate;
        this.Sec;
        this.Min;
        this.Hour;
        this.Days;
        this.Month;
        this.Yesr;
        this.intervalObj;
    }

    timerClass.prototype.setFromDate = function( Dt ) {
        this.fromDate = Dt;
        return this;
    }

    timerClass.prototype.setToDate = function( Dt ) {
        this.toDate = Dt;
        return this;
    }

    timerClass.prototype.getDiffTimeDate = function( ) {
        var diffMSec = this.toDate - this.fromDate;
        this.diffTimeDate = new Date(diffMSec);
    }

    timerClass.prototype.getTimerVals = function( ) {
        this.getDiffTimeDate();

        this.Sec = this.diffTimeDate.getUTCSeconds();
        this.Min = this.diffTimeDate.getUTCMinutes();
        this.Hours = this.diffTimeDate.getUTCHours();
        this.Days = parseInt( this.diffTimeDate.getUTCDate() ) - 1; // counting of days begin from 1
        this.Months = this.diffTimeDate.getUTCMonth();
        this.Years = parseInt (this.diffTimeDate.getUTCFullYear() ) - 1970; // counting of years starts from 1970
        return this.renderTimer();
    }

    timerClass.prototype.renderTimer = function() {
        document.getElementById( 'timerYears' ).innerHTML = this.Years + ' ' + this.correctWords( this.Years, this.yearsWords );
        document.getElementById( 'timerMonths' ).innerHTML =  this.Months + ' ' + this.correctWords( this.Months, this.monthsWords );
        document.getElementById( 'timerDays' ).innerHTML = this.Days  + ' ' + this.correctWords( this.Days, this.daysWords );
        document.getElementById( 'timerHours' ).innerHTML = this.Hours  + ' ' + this.correctWords( this.Hours, this.hoursWords );
        document.getElementById( 'timerMin' ).innerHTML =  this.Min  + ' ' + this.correctWords( this.Min, this.minutesWords );
        document.getElementById( 'timerSec' ).innerHTML =  this.Sec  + ' ' + this.correctWords( this.Sec, this.secondsWords );
        return this;
    }

    timerClass.prototype.contDownStart = function() {
        var that = this;
        that.getTimerVals();
        this.intervalObj = setInterval(function(){
            that.setFromDate( new Date() ); // from NOW to  15 07 2018 00:00
            that.getTimerVals();
        }, 1000);
    }


    timerClass.prototype.correctWords = function( val, words ) {
        val = val % 100;
        if ( val > 4 && val < 21 || val % 10 > 4 || val % 10 === 0 )
            return words.gt4;
        if ( val % 10  < 5 && val % 10 > 1 )
        	return words.lt5;
        return words.default;
    }

    timerClass.prototype.yearsWords = {
        default : 'год',
        lt5 : 'года',
        gt4: 'лет' 
    };

    timerClass.prototype.monthsWords = {
        default : 'месяц',
        lt5 : 'месяца',
        gt4: 'месяцев' 
    };

    timerClass.prototype.daysWords = {
        default : 'день',
        lt5 : 'дня',
        gt4: 'дней' 
    };

    timerClass.prototype.hoursWords = {
        default : 'час',
        lt5 : 'часа',
        gt4: 'часов' 
    };

    timerClass.prototype.minutesWords = {
        default : 'минута',
        lt5 : 'минуты',
        gt4: 'минут' 
    };

    timerClass.prototype.secondsWords = {
        default : 'секунда',
        lt5 : 'секунды',
        gt4: 'секунд' 
    };

    return timerClass;
} )();

var T = new Timer();
T.setFromDate( new Date() ).setToDate( new Date(2018, 6, 15) ); // from NOW to  15 07 2018 00:00
T.contDownStart();
