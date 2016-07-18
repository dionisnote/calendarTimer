var toFormatEl = document.getElementById('format');
var formatedEl = document.getElementById('formatedNum');

toFormatEl.addEventListener('keyup', function(e){
    var val = this.value;
    var formated = formatNumber(val);
    formatedEl.innerHTML = formated;
});