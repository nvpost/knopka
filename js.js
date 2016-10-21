var mainCounter=0;
var startTime;
var boolStart=true;
var marginForBtn = document.documentElement.clientWidth/2-75;
var counterName="Нет имени";
var counterLogger=[];
var t;

if(!localStorage.getItem('justCounter')){
	var jC='';
	//localStorage.setItem('justCounter', justCounter)
}else{
	var jC=localStorage.getItem('justCounter')
}

$('.buttonHolder').css('margin-left', marginForBtn)

$('.tick').on('mousedown', function(){
	counter()
	if(boolStart){
		sTime()
		counterLogger.push(counterName)
 		counterLogger.push(moment())
 		timer()
	}
	boolStart=false;
	
	logger()
})

function counter(){
	mainCounter++;
	$(".appConsole").find('p').text(mainCounter)
}
function sTime(){
	startTime=moment()
	$('.hStart').find('span').html(startTime.format("DD.MM <br> HH:mm:ss"))
	return startTime;
}
function timer(){
	var delta=moment()-startTime;
	$('.hLong').find('span').html(moment(delta).format('mm:ss'))
	t=setTimeout(timer, 1000)
}
//название
$('.hName').on('click', function(){
	counterName=prompt('Введите название')
	counterLogger[0]=counterName
	$('.hName').find('span').text(counterName)
})
//конец названия
//Стоп машина
$('.hLong').on('click', function(){
	logger('s') //записываем конец
	// функция записи кудато, возможно в локальное хранилище

	
	mainCounter=0
	startTime=0
	clearTimeout(t)
	boolStart=true;
	counterName="Нет имени";
	counterLogger=[];
	$('.hStart').find('span').html("для старта нажмите +1")
	$(".appConsole").addClass('stopCounter')
})
//Конец стопа 
function logger(s){
	counterLogger.push(moment())
	if(s=='s'){
		if(newName=prompt('Чтобы сохранить нажмите ОК и, при желании, введите название', counterName)){
			counterLogger[0]=newName
			jC=jC+"/%/"+counterLogger
			localStorage.setItem('justCounter', jC)
		}
		
	}
}
