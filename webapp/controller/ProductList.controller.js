sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("test.app.controller.ProductList", {

        onInit: function () {
            var oViewModel = new JSONModel({
                currency: "USD"
            });
            this.getView().setModel(oViewModel, "view");
        },

        onAddProductPress: function (oEvent) {

            debugger;
            var oView = this.getView();
            var oFilterBar = oView.byId("filterBar");
            var oFilterItems = oFilterBar.getAllFilterItems(true);
            var sProductName = oFilterBar.determineControlByFilterItem(oFilterItems[0]).getValue();
            var sCategoryName = oFilterBar.determineControlByFilterItem(oFilterItems[1]).getValue();
            var sSupplierName = oFilterBar.determineControlByFilterItem(oFilterItems[2]).getValue();

            // OPTION 1:
            // create an entry of the Products collection with the specified properties and values
            var oContext = this.getView().getModel("northwind").createEntry("/Products",
                {
                    properties: {
                        ProductName: sProductName,
                        // multiple propertis follow
                    }
                });
            this.getView().getModel("northwind").submitChanges();

            /*
            // // OPTION 2:
            var oData = {
                ProductName: sProductName
                // multiple propertis follow
            };

            this.getView().getModel("northwind").create("/Products", oData);
            */
        },

        onSearch: function () {
            var aFilters = [],
                oView = this.getView(),
                oBinding = oView.byId("productList").getBinding("items"),
                oFilterBar = oView.byId("filterBar"),
                oFilterItems = oFilterBar.getAllFilterItems(true);
            for (var i = 0; i < oFilterItems.length; i++) {
                var oFilterName = oFilterItems[i].getName(),
                    oControl = oFilterBar.determineControlByFilterItem(oFilterItems[i]);
                debugger;
                if (oControl) {
                    aFilters.push(new Filter(oFilterName, FilterOperator.Contains, oControl.getValue()));
                }
            }
            oBinding.filter(aFilters);
        },

        onClear: function () {
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

        onPressProduct: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("productDetail", {
                productPath: oItem.getBindingContext("northwind").getPath().substr(1)
            });
        }
    });
});
