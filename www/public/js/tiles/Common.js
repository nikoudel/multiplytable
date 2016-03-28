var app = app || {}

app.images = "/public/images/tiles/"
app.iconBackground = app.images + "water.jpg"
app.question = app.images + "question.png"
app.restart_up = app.images + "restart.png"
app.restart_down = app.images + "restart_pressed.png"
app.activeAxis = "activeAxis"
app.happySmile = app.images + "happy.png"
app.sadSmile = app.images + "sad.png"
app.multiply = app.images + "multiply.png"
app.plus = app.images + "plus.png"

app.getIcons = function(){
	
	//http://www.iconarchive.com/show/shrek-icons-by-majdi-khawaja.html
	//http://www.iconarchive.com/show/rio-icons-by-majdi-khawaja.html
	//http://www.iconarchive.com/show/ice-age-icons-by-majdi-khawaja.html
	//http://www.iconarchive.com/show/kung-fu-panda-icons-by-majdi-khawaja.html
	//http://www.iconarchive.com/show/madagascar-icons-by-majdi-khawaja.html
	
	var iconFiles = ["Alex-2-icon.png","Alex-3-icon.png","Alex-and-Marty-2-icon.png","Alex-and-Marty-icon.png",
		"Alex-icon.png","Blue-2-icon.png","Blue-3-icon.png","Blue-icon.png","Blue-young-icon.png","Buck-icon.png",
		"Crane-icon.png","Crash-and-Eddie-icon.png","Diego-2-icon.png","Diego-icon.png","Donkey-2-icon.png",
		"Donkey-3-icon.png","Donkey-icon.png","Fiona-2-icon.png","Fiona-3-icon.png","Fiona-icon.png","Gloria-2-icon.png",
		"Gloria-and-Melman-icon.png","Gloria-icon.png","Jewel-icon.png","King-Julian-icon.png","Luiz-icon.png",
		"Manny-icon.png","Mantis-icon.png","Marty-2-icon.png","Marty-icon.png","Master-Shifu-2-icon.png","Master-Shifu-3-icon.png",
		"Master-Shifu-icon.png","Master-Storming-Ox-icon.png","Master-Thundering-Rhino-icon.png","Melman-2-icon.png",
		"Melman-3-icon.png","Melman-and-Gloria-icon.png","Melman-icon.png","Nico-and-Pedro-icon.png","Nigel-2-icon.png",
		"Nigel-icon.png","Peaches-icon.png","Penguins-icon.png","Po-2-icon.png","Po-3-icon.png","Po-4-icon.png","Po-5-icon.png",
		"Po-icon.png","Puss-2-icon.png","Puss-3-icon.png","Puss-icon.png","Rafael-icon.png","Scrat-2-icon.png","Scrat-3-icon.png",
		"Scrat-icon.png","Scratte-icon.png","Shrek-2-icon.png","Shrek-3-icon.png","Shrek-4-icon.png","Shrek-5-icon.png",
		"Shrek-and-Donkey-and-Puss-2-icon.png","Shrek-and-Donkey-and-Puss-icon.png","Shrek-and-Fiona-icon.png","Shrek-icon.png",
		"Sid-icon.png","Skipper-icon.png","Tai-Lung-2-icon.png","Tai-Lung-icon.png","The-Gorillas-icon.png","Tigress-2-icon.png",
		"Tigress-3-icon.png","Tigress-icon.png","Viper-icon.png","Wolf-and-Pigs-icon.png","Wolf-Boss-icon.png"]
	
	var icons = []
	
	for(var i in iconFiles){
		icons.push({file: iconFiles[i], isUsed: false})
	}
	
	return icons
}

app.generateCellIDs = function(){
	
	var ids = []
	
	for(var y = 1; y < 10; y++){
		
		for(var x = 1; x < 10; x++){
			
			if(y == 1 && x > 1){
				
				ids.push("x" + x)
				
			}else if(x == 1 && y > 1){
				
				ids.push("y" + y)
				
			}else if(x > 1 || y > 1){
				
				ids.push(x.toString() + y.toString())
				
			} else {
				
				ids.push("zero")
			}
		}
	}
	
	return ids
}

app.isIconCell = function(id){
	return id != "zero" && id[0] != "x" && id[0] != "y"
}

app.randomInt = function(from, to){
	return Math.floor(Math.random()*(to-from+1)+from)
}

app.randomElement = function(arr){
	return arr[app.randomInt(0, arr.length - 1)]
}