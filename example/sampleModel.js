/******************************************************************************
*	Filename: model/sampleModel.js
*	Description: 
*		Sample model to demonstrate how to use knockout-tables
*
******************************************************************************/

sampleModel_vm = function( json ) {
	var self = this;
	self.propertyName = ko.observable( typeof json.propertyName != 'undefined' ? json.propertyName : '' );
}