sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	
	return Controller.extend("test.app.controller.SupplierList", {
		onInit: function() {

		},
		
		onPressSupplier: function(oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("supplierDetail", {
				supplierPath: oItem.getBindingContext("northwind").getPath().substr(1)
			});
		}
		
	});
});