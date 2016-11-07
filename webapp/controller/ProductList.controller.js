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
				aFilterItems = oFilterBar.getFilterItems(),
				aQueries = oEvent.getParameter("selectionSet"),
				oBinding = this.getView().byId("productList").getBinding("items");
			for (var i = 0; i < aFilterItems.length; i++) {
				aFilter.push(new Filter(aFilterItems[i].getName(), FilterOperator.Contains, aQueries[i]._lastValue));
			}
			oBinding.filter(aFilter);
		},
		
		onClear: function(oEvent) {
			var oView = this.getView(),
				oBinding = oView.byId("productList").getBinding("items"),
				aInputIds = oEvent.getParameter("selectionSet")
					.map(function(input) {
						return input.sId;
					});
			oBinding.filter(null);
			for (var i = 0; i < aInputIds.length; i++) {
				document.querySelector("#" + aInputIds[i] + "-inner").value = "";
			}
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