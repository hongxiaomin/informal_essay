var patt1 = new RegExp('e');
console.log(patt1.exec("The best things in life are free"));
//[ 'e', index: 2, input: 'The best things in life are free' ]
// 返回的结果是一个数组[array]，该数组的第一个元素是匹配的字符串，后面的元素则是表达式分组所捕获到的值，分组为1，则是该数组中的第一个元素，依次类推。若没有分组，该数组只包含一个元素。该数组还有另外3个属性，input，index和lastIndex。若没有匹配成功，则返回null。
var reg = /\w(o)\1\w/;
console.log(reg.exec("foodfood"));

function RegExpTest(){
    var src = "The quick brown for jumps over the lazy brown dog." ;
    var reg = /w+/g;
    var arr;
    console.log(reg.exec(src));
    while((arr=reg.exec(src))!=null){
        console.log(arr.index+"-"+arr.lastIndex+" ");
        console.log(arr);
    }
}
// RegExpTest();

function TestDemo(re,teststring){
    var found = re.test(teststring);
    var s ="";
    s+="'"+teststring+"'";
    if(found){
        s+=" contains ";
    }else{
        s+=" does not contain ";
    }
    s+="'"+re.source+"'";
    return s;
}
console.log(TestDemo(/\d([a-z])/,'1rdtt23556'));


//match demo
var src = "azcafAJAC";
var re = /[a-c]/gi;
var result = src.match(re);
// console.log(result);

var s = "The quick brown for jumps over the lazy  dog." ;
var re1 = /the/gi;
var result1 = s.replace(re1,"a");
// console.log(result1);

var re2 = /(\S+)(\s+)(\S+)/g;
var result2 = s.replace(re2,"$3$2$1");
console.log(result2);
var strArr= s.split('.')[0].split(/\s+/);
strArr=strArr.reverse();
var str2=strArr.join(" ")+'.';
console.log(str2);
