knockout_table_vm = function( options ) {
	var self = this;
	self.options = {
		'id':'',
		'slideRate': 200,
		'url':''
	};
		//UI value that controls how much data is being displayed.
	self.pageSize = ko.observable(10);
		//UI value that controls which page is being displayed.
	self.pageIndex = ko.observable(0);

	self.slider = null;
	self.sliderTimer = null;
		//How much the slider should slide
	self.slideAmount = 0;
	self.startSlide = function() {
		self.slide();
		self.slideTimer = setInterval( self.slide, self.options.slideRate );
	}

	self.stopSlide = function() {
		clearInterval( self.slideTimer );
		if( self.slider != null ) {
			self.slider.slider('setValue',0);
		}
	}

	self.slide = function() {		
		var newIndex = parseInt( self.pageIndex() + self.slideAmount );
		self.setCurrentPage( newIndex );
	}

		//Data set
	self.data = ko.observableArray([]);
	//self.tmp = [];

		//Array of observable boolean values which control the visibility of columns.
	// self.visibleColumns = [];
		//Array of custom sort functions to sort each column. 
	// self.sortColumns = [];

		//Value used to filter the table contents.
	// self.filter = ko.observable('');
	// self.columnFilters = ko.observableArray('');

		//Return an array of page numbers.
	self.pages = ko.computed( function() {
		return ko.utils.range( 0, self.data().length-1 );
	}, this );

		//Return an integer representing the current page number
	self.currentPageIndex = ko.computed( function() {
		return self.pageIndex();
	}, this );

		//Return an array of objects to be shown in the UI.
	self.getCurrentPage = ko.computed( function() {
		return self.data().slice( self.pageIndex(), (self.pageIndex() + self.pageSize() ) );
	}, this ).extend( { 
		notify: 'always', 
		rateLimit: { timeout: 50, method: "notifyWhenChangesStop" } 
	});

		//Set the current display page to start with item i.
	self.setCurrentPage = function( i ) {
		if( i >  self.data().length - (self.pageSize() ) ) {
			self.pageIndex( self.data().length - self.pageSize() );
		} else {
			self.pageIndex( i < 0 ? 0 : i );
		}

	};

		//Move the display to the last page.
	self.gotoLastPage = ko.computed( function() {
		self.setCurrentPage( self.data().length - self.pageSize() );
	}, this );

		//Move the display to the first page.
	self.gotoFirstPage = ko.computed( function() {
		self.setCurrentPage( 0 );
	}, this );

	self.numRows = ko.computed( function() {
		return self.data().length;
	}, this );


	self.nextPage = function() {
		self.setCurrentPage( self.pageIndex() + 1 );
	}

	self.prevPage = function() {
		self.setCurrentPage( self.pageIndex() - 1 );
	}

	self.setData = function( data ) {
		if( typeof self.options.model == 'function' ) {
			self.data.removeAll();
			for( var i=0; i < data.DATA.length; i++ ) {
				self.data.push( new self.options.model( data.DATA[i] ) );
			}
		} else {
			self.data( data.DATA );
		}		
		return self;
	}

	self.getData = function( url ) {
		self.options.url = typeof url == 'undefined' ? self.options.url : url
		return $.getJSON( self.options.url ,{}, self.setData );
	}

		//Build the knockout model from the table. Specifically this is needed for 
		//rendering the table headers correctly.
	self.init = function( options ) {
		//Object initialization
		if( typeof options != 'object' ) {
			throw("Initialization object is required: { 'id': 'Table ID', 'model': myModel_vm )");
		}

		if( typeof options.id != 'string' || options.id == '' ) {
			throw("A table is ID is required: variable.init( { 'id': 'Table ID' )");
		}
		self.options.id = options.id;

		if( typeof options.model != 'function' ) {
			throw( "The model has to be set. { 'model': myModel_vm } " );
		}
		self.options.model = options.model;

		switch( typeof options.data ) {
			case 'string':
				$.when(	self.getData( options.data ) ).then( function() {
						self.setCurrentPage(0);
					});
				break;

			case 'object':
				if( !Array.isArray( options.data ) ) {
					throw('options.data must be an array or url.')
				} 
				self.setData( options.data );
				break;

			case 'undefined':
				break;

			default:
				throw('options.data must be an array or url.');
		}

		self.setCurrentPage(0);

		// var tbl = document.getElementById(options.id);
		// $(tbl).find("thead tr th").each( function( d ) {
		// 	self.visibleColumns.push( ko.observable(true) );
		// });

		//UI setup
		self.slider = $("#"+self.options.id+" input.scrollbar").slider().on("slide", function(se) {
			var v = typeof se.value == 'undefined' ? 0 : se.value;
			self.slideAmount = v;
			}).on("slideStart", self.startSlide ).on("slideStop", self.stopSlide );

		return self;
	}
	if( typeof options != 'undefined' ) {
		self.init( options );
	}
}