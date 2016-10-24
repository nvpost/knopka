var starArr=localStorage.getItem('justCounter').split('/%/')
starArr.shift()
$('#vsegoZapisey').html(starArr.length)
var table="<table class='table table-bordered'> <thead><tr><th>Дата</th><th>Название</th><th>Кол-во</th></tr> </thead>"
for(i in starArr){
	var nArr=starArr[i].split(',')
 	table=table+"<tr data-row="+i+"><td>"+moment(nArr[1]).format('DD.MM, HH:mm')+"</td><td>"+nArr[0]+"</td><td>"+(nArr.length-3)+"</td></tr>"
}
table=table+"<table>"
var arrIndex=0;
$('.tablePlace').html(table)
$('td').on('click', function(){
	arrIndex=$(this).parent().data('row')
	console.log(arrIndex)
	document.location.href='way.html'
})

$('.wayModal').css('left', document.documentElement.clientWidth/2-100)

