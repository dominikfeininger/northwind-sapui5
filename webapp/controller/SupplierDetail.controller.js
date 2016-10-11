sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	
	return Controller.extend("test.app.controller.SupplierDetail", {
		
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("supplierDetail").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched: function(oEvent) {
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").supplierPath,
				model: "northwind"
			});
		},
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("suppliers", true);
			}
		},
		
		formatMapUrl: function (sStreet, sCity, sCountry) {
			return "https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=500x300&markers="
					+ jQuery.sap.encodeURL(sStreet + ", " + sCity + ", " + sCountry)
					+ "&key=AIzaSyDyuMFt2xAbHzFE1Bp94wXWvXM3_xgyNpo";
		}
			
	});
});