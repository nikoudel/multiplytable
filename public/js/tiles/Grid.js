var app = app || {}

app.GridView = Backbone.View.extend({
	
	initialize: function(args){
		args.input.keypress(this.checkAnswer.bind(this)),
		this.multiply = true
	},
	
	render: function () {
		
		this.generateCellDivs()
		this.setRestartEvents()
		this.setMultiplyEvents()
		
		return this
	},
	
	generateCellDivs: function(){
		
		var ids = app.generateCellIDs()
			
		for(var i in ids){
			
			var id = ids[i]
			var div = $("<div/>").attr("id", id)
			
			if(app.isIconCell(id)){
				
				div.css('background', "url('" + app.iconBackground + "')")
				
			}else{
				
				div.addClass("axis")
				
				if(id != "zero"){
					div.html(id[1])
				}
			}
			
			this.$el.append(div)
		}
		
		this.addCheckBoxes()
	},
	
	addCheckBoxes: function(){
		
		var cbDiv = $("#restartDiv")
		
		for(var i = 2; i < 10; i++){
			//<div>9<input type="checkbox"/></div>
			
			var input = '<input id="cb' + i + '" type="checkbox" checked="checked"/>'
			var div = $("<div/>").append(i).append(input)
			
			div.click(function(evt){
				this.renderCells()
				this.options.input.focus()
			}.bind(this))
			
			cbDiv.append(div)
		}
	},
	
	setRestartEvents: function(){
		
		this.options.restart.attr("src", app.restart_up)
		
		this.options.restart.mousedown(function(evt){
			$(evt.currentTarget).attr("src", app.restart_down)
		})
		
		this.options.restart.mouseup(function(evt){
			$(evt.currentTarget).attr("src", app.restart_up)
		})
		
		this.options.restart.mouseout(function(evt){
			$(evt.currentTarget).attr("src", app.restart_up)
		})
		
		this.options.restart.click(function(evt){
			
			this.collection.each(function(cell){
				
				cell.set({isActive:false, isOpen:false, smile: "none", errors: 0})
				cell.stopBlinking()
				cell.save()
			})
			
			this.checkAnswer()
			
		}.bind(this))
	},
	
	setMultiplyEvents: function(){
		
		this.options.multiply.attr("src", app.multiply)
		
		this.options.multiply.click(function(evt){
			
			if(this.options.multiply.attr("src") == app.multiply){
				this.options.multiply.attr("src", app.plus)
				this.multiply = false
			}else{
				this.options.multiply.attr("src", app.multiply)
				this.multiply = true
			}
			
			this.options.input.focus()
			
		}.bind(this))
	},
	
	renderCells: function(){
					
		var isInDebugMode = true
		
		if (isInDebugMode) {
			
			this.collection.createMissingCells()
			
			if(this.collection.getActiveCell() == null){
				this.collection.changeActiveCell(null)
			}
			
			this.collection.each(function(cell){
				
				var cellView = new app.CellView({
					el: $("#" + cell.id),
					model: cell,
					pic: this.options.pic,
					errors: this.options.errors,
					calculateErrors: this.calculateErrors.bind(this)
				})
				
				cellView.render()
				
			}, this)
		}
	},
	
	checkAnswer: function(evt){
		
		if(evt != null && evt.keyCode != 13){
			return //IE workaround instead of 'change' event
		}
		
		if(evt.target.value === ""){
			return
		}
		
		var active = this.collection.getActiveCell()

		this.deactivateAxis()
		
		if(active == null){
			
			this.collection.changeActiveCell(null)
			
		}else{
			if(evt != null){
				
				var x = parseInt(active.id[0])
				var y = parseInt(active.id[1])
				
				if((this.multiply && x * y == evt.target.value)
					|| (!this.multiply && x + y == evt.target.value)){
					
					active.set({smile: "happy", isActive: false})
					
					this.collection.changeActiveCell(active)
					
				} else {
					errors = active.get("errors")
					active.set({smile: "sad", errors: errors + 1})
				}
				
				evt.target.value = ""
			}
		}
		
		this.options.input.focus()
	},
	
	deactivateAxis: function(){
		
		for(var i = 2; i < 10; i++){
			
			$("#x" + i).removeClass(app.activeAxis)
			$("#y" + i).removeClass(app.activeAxis)
		}
	},

	calculateErrors: function(){

		errors = 0

		this.collection.each(function(cell){
			errors += cell.get("errors")
		}, this)

		return errors
	}
})
