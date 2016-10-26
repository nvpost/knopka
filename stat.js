

var starArr=localStorage.getItem('justCounter').split('/%/')
$('#vsegoZapisey').html(starArr.length)
var table="<table class='table table-bordered'> <thead><tr><th>Re</th><th>Дата</th><th>Название</th><th>Кол-во</th></tr> </thead>"
for(i in starArr){
	var nArr=starArr[i].split(',')
 	table=table+"<tr data-row="+i+"><td class='notStat'><img id='rep"+i+"' src='img/return.png' width='30'></td><td>"+moment(parseInt(nArr[1])).format('DD.MM, HH:mm')+"</td><td>"+nArr[0]+"</td><td>"+(nArr.length-1)+"</td></tr>"
}
table=table+"<table>"
var arrIndex=0;
$('.tablePlace').html(table)
$('td:not(.notStat)').on('click', function(e){
	arrIndex=$(this).parent().data('row')
	modalWay(arrIndex)
})


$('td').on('swipe', function(){
	console.log($(this).parent().data('row'))
	deleteRow($(this).parent())
})
function deleteRow(tr){
	e=tr.data('row')
	if(confirm('Удалить запись '+starArr[e].split(',')[0]+' от '+moment(starArr[e].split(',')[1]).format("DD.MM.YY HH:mm:ss")+'?')){
		console.log('удаляем '+starArr[e][0]+'')
		starArr.splice(e, 1)
		tr.hide()
		/*Удалем переменную счетчика из локального хранилища*/
		var newStr='';
		for(var i in starArr)
			{
				newStr=newStr+"/%/"+starArr[i]
			}
		localStorage.removeItem('justCounter')	
		localStorage.setItem('justCounter', newStr)	
		/*Удалем переменную счетчика из локального хранилища*/
	}
}

$('img').click(function(){
	var tmpId=this.id
	var idToChange=tmpId.slice(3, tmpId.length)
	console.log("Поправим массив "+idToChange)
	localStorage.setItem('idToChange', idToChange)
	document.location.href="screen1.html"
})

//модальное окно
function modalWay(a){
	$('.wayModalBody').html('')
	$('.statHover, .wayModal').fadeIn()
	$('.wayModal').css('left', document.documentElement.clientWidth/2-150)
	var h=document.documentElement.clientHeight-80;
	$('.way').css('height', h)


console.log(a)
	
		var nn=starArr[a].split(',')
		var wayHead=nn[0]
		$('.wayModalHeader').html(nn[0])
		nn.shift()
		//console.log(nn)

		//конец тестового массива
		var l=nn[nn.length-1]-nn[0]
		$('.wayModalHeader').html(wayHead+' ('+getDuration(l)+')')
		var pp=((h-30*nn.length)/l)
		//console.log(pp)
		if(pp<0.004){pp=0.004}

		var allMargin=0
		for(i in nn){
		  if (i>0){
		    var d=(nn[i]-nn[parseInt(i)-1]);

		    if(d>10000){d=10000;}

		    allMargin=allMargin+d*pp
		    var durationStr=getDuration(parseInt(nn[i])-parseInt(nn[parseInt(i)-1]), 'short')+" ("+getDuration(parseInt(nn[i])-parseInt(nn[0]))+")" 
		    $('.wayModalBody').append('<div class="dotHolder" style="margin-top:'+(d*pp)+'px"><div class="dot"><p>'+(parseInt(i)+1)+'</p></div><div class="dotLabel">+'+durationStr+'</div></div>')
		  }else{
		    $('.wayModalBody').append('<div class="dotHolder"><div class="dot"><p>'+(parseInt(i)+1)+'</p></div><div class="dotLabel">'+moment(parseInt(nn[i])).format('DD.MM - HH:mm:ss')+'</div></div>')
		  } 
		}

}

$('.statHover').click(function(){
	$('.statHover, .wayModal').fadeOut()
})
function getDuration(l, short){
	//console.log(l)
	var s=Math.floor(l/1000);
	var ms=l-s*1000
	var min=Math.floor(s/60)
	s=s-min*60;
	var h=Math.floor(min/60)
	min=min-h*60;
	var d=Math.floor(h/24)
	h=h-d*24
	dArr=[d,h,min,s,ms]
	var str=''
	

	function ch(v, z){ //Записываем строку с разницей дат + проверяем на соответсвие милисекунды
		if (v>0){
			if(z=='c'&&v.toString().length<3){
				v=msCh(v)
			}
			return v+z;
		}
		else{return ''}
	}
	if(short=='short'){str=ch(d, 'д. ')+ch(h, ':')+ch(min, ':')+ch(s, '.')+ch(ms, 'c')}
		else{str=ch(d, 'дней, ')+ch(h, 'ч: ')+ch(min, 'м: ')+ch(s, '.')+ch(ms, 'с')}

	if(str.length<5&&(str.indexOf('.')==-1)){
		str="0."+str;
	}
	return str;
}

function msCh(ms){
	var z=ms.toString()
	console.log(z)
	switch (z.length){
		case 2:
			return '0'+z;
			break;
		case 1:
			return '00'+z;
			break;	
	}
		
}


$.mobile.loading().hide();

