var app = app || {}

app.GridView = Backbone.View.extend({
	
	initialize: function(args){
		args.input.change(this.checkAnswer.bind(this))
	},
	
	render: function () {
		
		this.generateCellDivs()
		this.setRestartEvents()
		
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
				
				cell.set({isActive:false, isOpen:false})
				cell.stopBlinking()
				cell.save()
			})
			
			this.checkAnswer()
			
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
					pic: this.options.pic})
				
				cellView.render()
				
			}, this)
		}
	},
	
	checkAnswer: function(evt){
		
		var active = this.collection.getActiveCell()
		
		if(active == null){
			this.deactivateAxis()
			this.collection.changeActiveCell(null)
		}else{
			if(evt != null){
				
				var x = active.id[0]
				var y = active.id[1]
				
				if(x * y == evt.target.value){
					this.deactivateAxis()
					this.collection.changeActiveCell(active)
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
	}
})
