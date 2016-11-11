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

		onSearch: function() {
			var aFilters = [],
				oView = this.getView(),
				oBinding = oView.byId("productList").getBinding("items"),
				oFilterBar = oView.byId("filterBar"),
				oFilterItems = oFilterBar.getAllFilterItems(true);
			for (var i = 0; i < oFilterItems.length; i++) {
				var oFilterName = oFilterItems[i].getName(),
					oControl = oFilterBar.determineControlByFilterItem(oFilterItems[i]);
				if (oControl) {
					aFilters.push(new Filter(oFilterName, FilterOperator.Contains, oControl.getValue()));
				}
			}
			oBinding.filter(aFilters);
		},
		
		onClear: function() {
			var oView = this.getView(),
				oBinding = oView.byId("productList").getBinding("items"),
				oFilterBar = oView.byId("filterBar"),
				oFilterItems = oFilterBar.getAllFilterItems(true);
			for (var i = 0; i < oFilterItems.length; i++) {
				var oControl = oFilterBar.determineControlByFilterItem(oFilterItems[i]);
				if (oControl) {
					oControl.setValue("");
				}
			}
			oBinding.filter(null);
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