var h=document.documentElement.clientHeight;
//var h=500;
$('.way').css('height', h-10)
var pp=(h/100)

var arr=[1,2,3,4,5,7,10,12,15,36]
var l=arr[arr.length-1]-arr[0]
for(i in arr){
  if (i>0){
    var d=arr[i]-arr[parseInt(i)-1]
    console.log(d)
    $('.way').append('<div class="dot" style="margin-top:'+(d*pp)+'px">'+arr[i]+'</div>')
  }else{
    $('.way').append('<div class="dot">'+arr[i]+'</div>')
  }
  
}