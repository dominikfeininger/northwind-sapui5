sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("test.app.controller.ProductList", {

		onInit: function() {
			var oViewModel = new JSONModel({
				currency: "USD"
			});
			this.getView().setModel(oViewModel, "view");
		},

		onFilterProducts: function(oEvent) {
			var aFilter = [];
			if (oEvent) {
				var sQuery = this.getView().byId("productInput").value;	
			}
				// var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
			var oList = this.getView().byId("productList").text;
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onPress: function(oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				productPath: oItem.getBindingContext("northwind").getPath().substr(1)
			});
		}
	});
});