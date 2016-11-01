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

		onSearch: function(oEvent) {
			var aFilter = [];
			var aQueries = oEvent.getParameter("selectionSet");
			var sProductQuery = aQueries[0]._lastValue;
			var sCategoryQuery = aQueries[1]._lastValue;
			if (sProductQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sProductQuery));
			}
			if (sCategoryQuery) {
				aFilter.push(new Filter("Category/CategoryName", FilterOperator.Contains, sCategoryQuery));
			}
			var oList = this.getView().byId("productList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
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