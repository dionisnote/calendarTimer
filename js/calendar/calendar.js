var Calendar = (function(){
    
    function CalendarClass(){
        this.date;

    }
    
    CalendarClass.prototype.setDate = function( year, month )
    {
        try{
            if( parseInt(year).toString() !== year.toString() || isNaN(year) )
                throw "Set year. Function expect setDate( year, month)";
            if( parseInt(month).toString() !== month.toString() || isNaN(month) )
                throw "Set moth please. Function expect setDate( year, month)";
        }catch(e){
            console.warn(e);
            return false;
        }
        this.date = new Date( year, month );
        this.renderMonth();

    }

    CalendarClass.prototype.renderDay = function( num, active, today )
    {
        var res = '';
        var classNames = 'calendar__day';
        
        if( active )
            classNames+= ' calendar__day_actual';
        else
            classNames+= ' calendar__day_disabled';

        if( today )
            classNames+= ' calendar__day_today';

        res+='<td class="' + classNames + '">' + num + '</td>';

        return res;  
    };

    CalendarClass.prototype.renderMonth = function()
    {
        var html ='', i, maxi, isActive, isToday;
        var startDate = new Date( this.date );
        var beforeDays = startDate.getDay() - 1
        beforeDays = (beforeDays > -1)?(beforeDays):(6);

        startDate.setDate(  startDate.getDate() - beforeDays );

        // render table
        html = '<caption>'  + this.monthNames[this.date.getMonth()].toUpperCase() + ' ' + this.date.getFullYear() + '</caption>';
        html+= '<tr>';

        maxi = 42;
        for( i = 0; i < maxi; i++ ) {
            var displayDate = new Date(startDate);
            displayDate.setDate( displayDate.getDate() + i );

             isActive = displayDate.getMonth() === this.date.getMonth();
             isToday = this.isTodayCheck( displayDate );

             if( i > maxi - 8 && !isActive && displayDate.getDay() == 1 ) {
                maxi-= 7;
                continue;
             } 

             html+= this.renderDay( displayDate.getDate(), isActive, isToday );

             if( (i+1) % 7 === 0 ) {
                 html+= '</tr><tr>';
             } 
             

        }

        html+= '<tr>';

        document.getElementById('calendar').innerHTML = html;
    }

    CalendarClass.prototype.isTodayCheck = function( dt )
    {
        var now = new Date();

        return dt.getFullYear() === now.getFullYear() && dt.getMonth() === now.getMonth() && dt.getDate() === now.getDate();
    }

    CalendarClass.prototype.initControls = function( monthId, yearId, setterId)
    {
        var monthControl = document.getElementById( monthId );
        var yearControl = document.getElementById( yearId );
        var setControl = document.getElementById( setterId );
        var that = this;

        setControl.addEventListener('click', function(){
            var yearNum = parseInt( yearControl.value );
            var monthNum = parseInt( monthControl.value );

            that.setDate( yearNum, monthNum )
        })


    }

    CalendarClass.prototype.monthNames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

    return CalendarClass;
})();