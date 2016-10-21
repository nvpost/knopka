var starArr=localStorage.getItem('justCounter').split('/%/')
starArr.shift()
$('.appHeader').find('span').html(starArr.length)
