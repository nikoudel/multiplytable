var app = app || {}

app.Cell = Backbone.Model.extend({
	
	defaults: {
		isActive: false,
		isOpen: false,
		smile: "none",
		errors: 0
	},
	
	initialize: function(args){
		this.isBlinking = false
	},
	
	stopBlinking: function(){
		
		if(this.isBlinking){
			clearInterval(this.isBlinking)
			this.isBlinking = false
		}
	}
})

app.Cells = Backbone.Collection.extend({

	model: app.Cell,
	
	localStorage: new Backbone.LocalStorage("Cells"),
	
	createMissingCells: function(){
		
		var ids = app.generateCellIDs()
		
		var newCells = false
		
		for(var i in ids){
			
			var id = ids[i]
			
			if(app.isIconCell(id) && this.get(ids[i]) == null){
				
				this.create({id: id})
				
				newCells = true
			}
		}
		
		if(newCells){
			this.resetIcons()
		}
	},
	
	resetIcons : function(){
		
		var icons = app.getIcons()
		
		this.each(function(cell){
			
			var i = 0
				
			do{
				var icon = app.randomElement(icons)
				
				if(++i > 10000){
					alert("error")
					throw("infinite loop in updateIcons")
				}
			}while(icon.isUsed)
			
			icon.isUsed = true
			
			cell.set({iconFile: icon.file})
			cell.save()
		})
	},
	
	getActiveCell: function(){
		
		var activeCells = this.where({isActive: true})
		
		if(activeCells.length > 1){
			
			alert("error")
			throw("multiple active cells")
			
		}else if(activeCells.length == 0){
			
			return null
			
		}else{
			return activeCells[0]
		}
	},
	
	changeActiveCell: function(currentActiveCell){
		
		if(currentActiveCell != null){
			
			currentActiveCell.save({isActive: false, isOpen: true})
		}
		
		var closedCells = this.filter(function(model){
			
			var x = model.id[0]
			var cb = $("#cb" + x)
			
			return model.attributes.isOpen == false && cb.is(':checked')
		})
		
		if(closedCells.length == 0){
			return
		}
		
		var randomCell = app.randomElement(closedCells)
		
		randomCell.save({isActive: true})
	}
})

app.CellView = Backbone.View.extend({
	
	initialize: function(){
		
		this.model.on('change', this.render, this)
		
		this.$el.hover(this.showPic.bind(this), this.hidePic.bind(this))
		
		this.iconFile = app.images + this.model.attributes.iconFile
		
		this.img = $("<img>", {height:70, width:70, src: this.iconFile})
	},
	
	render: function(){
		
		var m = this.model.attributes
		
		if(m.isOpen){
			this.$el.html(this.img)
		}else{
			this.$el.html('')
		}
		
		this.activateAxis(m.isActive)

		this.showErrors()
		
		this.blink()
	},
	
	showPic: function(){
		
		if(this.model.attributes.isOpen){
		
			this.options.pic.html($("<img>", {src: this.iconFile}))
		}
	},
	
	hidePic: function(){
		
		this.options.pic.html("")
	},
	
	activateAxis: function(isActive){
		
		var x = this.model.id[0]
		var y = this.model.id[1]
				
		if(isActive){
			$("#x" + x).addClass(app.activeAxis)
			$("#y" + y).addClass(app.activeAxis)
		}
	},
	
	blink: function(){
		
		this.model.stopBlinking()
		
		if(this.model.attributes.smile == "happy"){
			
			this.smile(app.happySmile)
			
		}else if(this.model.attributes.smile == "sad"){
			
			this.smile(app.sadSmile)
			
		}else if(this.model.attributes.isActive){
			
			this.model.isBlinking = setInterval(function(){
				
				if(this.$el.html() == ''){
					this.$el.html('<img src="' + app.question + '"/>')
				}else{
					this.$el.html('')
				}
			}.bind(this), 1000)
		}
	},
	
	smile: function(smileFile){
		
		this.$el.html('<img src="' + smileFile + '"/>')
		
		setTimeout(function(){
				
			this.model.save({smile: "none"})
			
		}.bind(this), 2000)
	},

	showErrors: function(){

		errors = this.options.calculateErrors()

		if(errors == 0){
			color = "green"
		}else{
			color = "red"
		}
		
		this.options.errors.html('<h1 style="color:' + color + ';">' + errors + '</h1>')
	}
})
