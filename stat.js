

var starArr=localStorage.getItem('justCounter').split('/%/')
$('#vsegoZapisey').html(starArr.length)
var table="<table class='table table-bordered'> <thead><tr><th>Re</th><th>Дата</th><th>Название</th><th>Кол-во</th></tr> </thead>"
for(i in starArr){
	var nArr=starArr[i].split(',')
 	table=table+"<tr data-row="+i+"><td class='notStat'><img id='rep"+i+"' src='img/return.png' width='30'></td><td>"+moment(nArr[1]).format('DD.MM, HH:mm')+"</td><td>"+nArr[0]+"</td><td>"+(nArr.length-1)+"</td></tr>"
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
	
	//тестовый массив
		var nn=starArr[a].split(',')
		
		var wayHead=nn[0]
		$('.wayModalHeader').html(nn[0])
		nn.shift()
		nn.shift()
		console.log(nn)

		//конец тестового массива
		var l=nn[nn.length-1]-nn[0]
		$('.wayModalHeader').html(wayHead+' ('+getDuration(l)+')')
		var pp=((h-30*nn.length)/l)
		console.log(pp)
		console.log(l)
		var allMargin=0
		for(i in nn){
		  if (i>0){
		    var d=(nn[i]-nn[parseInt(i)-1]);
		    console.log("margin: "+d*pp)
		    allMargin=allMargin+d*pp
		    var durationStr=getDuration(parseInt(nn[i])-parseInt(nn[parseInt(i)-1]))+" ("+getDuration(parseInt(nn[i])-parseInt(nn[0]))+")" 
		    $('.wayModalBody').append('<div class="dotHolder" style="margin-top:'+(d*pp)+'px"><div class="dot"><p>'+(parseInt(i)+1)+'</p></div><div class="dotLabel">+'+durationStr+'</div></div>')
		  }else{
		    $('.wayModalBody').append('<div class="dotHolder"><div class="dot"><p>'+(parseInt(i)+1)+'</p></div><div class="dotLabel">'+moment(parseInt(nn[i])).format('DD.MM - HH:mm:ss')+'</div></div>')
		  } 
		}
}

$('.statHover').click(function(){
	$('.statHover, .wayModal').fadeOut()
})
function getDuration(l){
	if(l<60000){
		return(moment(l).format('ss.SSS сек.'))
	}
	if(60000<l<3600000){
		return(moment(l).format('mm мин., ss сек.'))
	}
	if(3600000<l<3600000*24){
		return(moment(l).format('HH ч., mm мин., ss сек.'))
	}
	if(3600000*24*365<l){
		return(moment(l).format('DD д., HH ч., mm мин., ss сек.'))
	}
}
$.mobile.loading().hide();

