
var startTime;
var boolStart=true;
var marginForBtn = document.documentElement.clientWidth/2-75;
var counterName="Нет имени";
var counterLogger=[];
var t;
var jC=''
var mainCounter=0;
var boolEdit=false;
var cEdit=0;
$('.buttonHolder').css('margin-left', marginForBtn)
if(!localStorage.getItem('justCounter')){
	var jC='';
	//localStorage.setItem('justCounter', justCounter)
}else{
	var jC=localStorage.getItem('justCounter')
	jCarr=jC.split('/%/')
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
	console.log('Будем менть массив'+c)
	$('.appCounterName').html(jCarr[c].split(',')[0])

	window.mainCounter=jCarr[c].split(',').length-1
	console.log(mainCounter)
	$(".appConsole").find('p').text(mainCounter)
	//counter(reCounter)
	startTime=moment(parseInt(jCarr[c].split(',')[1]))
	$('.hStart').find('span').html(startTime.format("DD.MM <br> HH:mm:ss"))
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
		//counterLogger.push(counterName)
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




function timer(s){
	if(s){startTime=s}
	var delta=moment()-startTime;
	$('.hLong').find('span').html(moment(delta).format('mm:ss'))
	t=setTimeout(timer, 1000)
}
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
			counterLogger.push(new Date().getTime())
			if(s=='s'){
				if(boolEdit){
					newName=prompt('Желаете ли поменять название?', jCarr[cEdit].split(',')[0])
					counterLogger[0]=newName
					jCarr[cEdit]=counterLogger
					jC=jCarr.join("/%/")
					localStorage.setItem('justCounter', jC)
				}else{
					if(newName=prompt('Чтобы сохранить нажмите ОК и, при желании, введите название', counterName)){
					counterLogger[0]=newName
					jCarr.push(counterLogger)
					jC=jCarr.join("/%/")
					localStorage.setItem('justCounter', jC)
				}
				}
				
			}
		}