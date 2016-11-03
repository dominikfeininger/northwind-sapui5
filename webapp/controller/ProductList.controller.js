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
			var aFilter = [],
				oFilterBar = this.getView().byId("filterBar"),
				aFilters = oFilterBar.getFilterItems(),
				aQueries = oEvent.getParameter("selectionSet");
			for (var i = 0; i < aFilters.length; i++) {
				aFilter.push(new Filter(aFilters[i].getName(), FilterOperator.Contains, aQueries[i]._lastValue));
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