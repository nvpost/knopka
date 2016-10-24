var h=document.documentElement.clientHeight-80;
//var h=500;
$('.way').css('height', h)


console.log(arrIndex)
	
	//тестовый массив
		var arr=[1,2,3,4,5,7,10,12,15,36]
		var nn=starArr[arrIndex].split(',')
		nn.shift()
		nn.shift()
		console.log(nn)
		//конец тестового массива
		var l=nn[nn.length-1]-nn[0]
		var pp=((h-30*nn.length)/l)
		console.log(pp)
		console.log(l)
		var allMargin=0
		for(i in nn){
		  if (i>0){
		    var d=(nn[i]-nn[parseInt(i)-1]);
		    console.log("margin: "+d*pp)
		    allMargin=allMargin+d*pp
		    $('.way').append('<div class="dot" style="margin-top:'+(d*pp)+'px">'+moment(parseInt(nn[i])).format('mm:ss')+'</div>')
		  }else{
		    $('.way').append('<div class="dot">'+moment(parseInt(nn[i])).format('mm:ss')+'</div>')
		  } 
		}


