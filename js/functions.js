/**
 *  Joins arguments args = string | number(make plus) | array
 */
function joinArgs()
{
    try {
        if( arguments.length < 1) {
            throw "no arguments";
        }
    } catch(e) {
        console.warn(e);
        return null;
    }

    var currentType = typeof arguments[0], //type
    result, //returning value
    i; //counter for arguments

    console.log( currentType );

    try {
        for( i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            // check type consistency
            if( typeof arg !== currentType )
                throw "different types";

            switch(currentType){
                case 'string':
                    if( result === undefined)
                        result = '';
                    result+= arg;
                break;
                case 'number':
                    if( result === undefined)
                        result = 0;
                    result+= arg;
                break;
                default:
                    if( Array.isArray(arg) ) {
                        if( result === undefined)
                            result = [];
                        result = result.concat(arg);
                    }
                    else
                        throw "not supported type";
                break;

            }
        }
    } catch(e) {
        console.warn(e);
        return null;
    }
    
    return result;

}


function formatNumber(num)
{
    num = parseFloat(num);
    var strNum = num.toString();
    var minusSymbol = '';
    var arrNum = [];
    var intTile = '';
    var decimalTile = '';
    var newIntTile = '';
    var result;
    // only 2 numbers after dot
    if( strNum.indexOf('.') > -1 ) {
        num = parseFloat(num.toFixed(2) ) + 0;
        strNum = num.toString();
    }


    if( strNum.indexOf('-') > -1 ) {
        minusSymbol = '-';
        strNum = strNum.replace('-','');
    }

    arrNum = strNum.split('.');
    intTile = arrNum[0];
    if( arrNum[1] !== undefined )
        decimalTile = ',' + arrNum[1]; 
    newIntTile = intTile;

    // may be just "for" is better idea, but its funny. And I use "do...while" in javascript first time in life
    do {
        intTile = newIntTile;
        newIntTile = intTile.replace(/([0-9]+)([0-9]{3})/gi, '$1 $2'); // split by 3 symbols and return them "(" ")"
    } while (intTile !== newIntTile);

    result = intTile;
    result = minusSymbol +  result.trim() + decimalTile;
    return(result);
}

/**
 *  Search substring in each element of array 
 */
function substrInArray( arr, sbstr )
{
    try{
        if( !Array.isArray(arr) )
            throw "array expected as first parameter";
    }catch(e){
        console.warn(e);
        return null;
    }

    var rx = new RegExp( sbstr.toString(), 'gi' );
    var val, i; 
    
    for( i in arr ){
        val = arr[i].toString();
        if( rx.test(val) )
            return true;
    }

    return false;
}