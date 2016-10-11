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
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
			var oList = this.getView().byId("productList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onSuggestProducts: function(oEvent) {
			var sQuery = oEvent.getParameter("suggestValue");
			var aFilter = [];
			if (sQuery) {
				aFilter = [new Filter([
					new Filter("ProductName", function(sDescription) {
						return (sDescription || "").toUpperCase().indexOf(sQuery.toUpperCase()) > -1;
					})
				], false)];
			}

			this.oSF.getBinding("suggestionItems").filter(aFilter);
			this.oSF.suggest();
		},

		onPressProduct: function(oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("productDetail", {
				productPath: oItem.getBindingContext("northwind").getPath().substr(1)
			});
		}
		
	});
});