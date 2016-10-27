moment.locale('ru');
$.event.special.swipe.horizontalDistanceThreshold=30
var startTime;
var boolStart=true;
var marginForBtn = document.documentElement.clientWidth/2-100;
var counterName="Название";
var counterLogger=[];
var t;
var jC=''
var jCarr=[]
var mainCounter=0;
var boolEdit=false;
var cEdit=0;
var sound=true;
$('.buttonHolder').css('margin-left', marginForBtn)
if(!localStorage.getItem('justCounter')){
	var jC='';
	//localStorage.setItem('justCounter', justCounter)
}else{
	var jC=localStorage.getItem('justCounter')
	jCarr=jC.split('/%/')
	jCarr.shift()
	}

var idToChange = localStorage.getItem('idToChange')
localStorage.removeItem('idToChange')
if(idToChange){
	addCounter(idToChange)
}else{
	start()

	}


function start(){

		//название
		$('.hName').on('click', function(){
			counterName=prompt('Введите название')
			counterLogger[0]=counterName
			$('.hName').find('span').text(counterName)
		})
		//конец названия
		//Стоп машина


}


function addCounter(c){

	$('.appCounterName').html("Счетчик: "+jCarr[c].split(',')[0])

	window.mainCounter=jCarr[c].split(',').length-1
	console.log(mainCounter)
	$(".appConsole").find('p').text(mainCounter)
	//counter(reCounter)
	startTime=moment(parseInt(jCarr[c].split(',')[1]))
	$('.hStart').find('span').html(startTime.format("DD.MM - HH:mm:ss"))
	console.log(mainCounter)
	window.boolEdit=true
	cEdit=c

	for(var i=1; i<jCarr[c].split(',').length; i++){
		counterLogger.push(jCarr[c].split(',')[i])
	}
	//timer(startTime)

}


$('.tick').on('mousedown', function(){
	counter()
	if(boolStart){
		sTime()
		$(".appConsole").removeClass('stopCounter')
		timer()
		}
	boolStart=false;
	logger()
	if(sound){mp3()}
})





function counter(){
		mainCounter++;
		$(".appConsole").find('p').text(mainCounter)

	}
function sTime(){
	startTime=moment()
	$('.hStart').find('span').html(startTime.format("DD.MM - HH:mm:ss"))
	return startTime;
}




function timer(s){
	if(s){startTime=s}
	var delta=moment()-startTime;
	$('.hLong').find('span').html(moment(delta).format('mm:ss'))
	t=setTimeout(timer, 1000)
}
		$('.hLong').on('click', stop)
		//Конец стопа 
		function logger(s){
			counterLogger.push(new Date().getTime())
			if(s=='s'){
				if(boolEdit){
					newName=prompt('Желаете ли поменять название?', jCarr[cEdit].split(',')[0])
					counterLogger[0]=newName
					jCarr[cEdit]=counterLogger
					jC=jCarr.join("/%/")
					localStorage.setItem('justCounter', "/%/"+jC)
				}else{
					if(newName=prompt('Чтобы сохранить нажмите ОК и, при желании, введите название', counterName)){
					counterLogger[0]=newName
					jCarr.push(counterLogger)
					jC=jCarr.join("/%/")
					localStorage.setItem('justCounter', "/%/"+jC)
				}
				}
				
			}
		}
$('body').on('swipeleft', function(){
	if(confirm("Перейти в статистику "+wo())){
		document.location.href="stat.html"
	}
})
function wo(){
	if(!boolStart){
		return "без сохранения"
	}else{
		return ''
	}
}

$('body').on('swiperight', function(){
	if(!boolStart){
		if(confirm('Остановить счет?')){
		stop()
	}
	}

})


function stop(){
	logger('s') //записываем конец
			// функция записи кудато, возможно в локальное хранилище
			mainCounter=0
			startTime=0
			clearTimeout(t)
			boolStart=true;
			counterName="Нет имени";
			counterLogger=[];
			$('.hStart').find('span').html("нажмите&nbsp;+1")
			$(".appConsole").addClass('stopCounter')
}


if(localStorage.getItem('learnJQ')!=='s1'){
	learnShow()
}
function learnShow(){
	$('.learnHover').fadeIn()
	$('.learn1').fadeIn()	
}
function learnClose(){
	$('.learnHover').fadeOut()
	$('.learn1').fadeOut()	
}

$('.learnClose, .learnHover').click(function(){
	learnClose()
	localStorage.setItem('learnJQ', 's1')
})
$('.help').click(learnShow)


function mp3(){
	var audio = new Audio();
    audio.src = 'click.mp3';
    audio.autoplay = true;
}
$('.sound').click(function(){
	if(sound){$('.sound').find('img').attr('src', 'img/sOff.png'); sound=false}
	else{$('.sound').find('img').attr('src', 'img/sOn.png'); sound=true}
})

$.mobile.loading().hide();		