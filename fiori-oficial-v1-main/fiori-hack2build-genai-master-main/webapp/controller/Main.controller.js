sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     */
    function (Controller, JSONModel, BaseController) {
        "use strict";

        return BaseController.extend("numenit.com.hack2buildgenai.controller.Main", {

            onInit: function (evt) {
            },

            onNavToNewsList: function () {
                var rawMaterial = this.getView().byId("rawMaterialInput").getValue();
                var region = this.getView().byId("regionInput").getValue();

                var date = this.getView().byId("dateInput").getValue();

                var info = this.getView().byId("infoInput").getValue();

                console.log("data - " + date);
                console.log("info - " + info);

                var newsModel = this.getView().getModel("newsModel");

                var requestHeaders = {
                    "Content-Type": "application/json",
                    "X-Api-Key": "35688e4e32d44002beeec326abee2973"
                }

                var requestOptions = {
                    method: 'GET',
                    headers: requestHeaders
                }

                var url;

                if(date){
                    console.log("if");
                    url = "https://api.worldnewsapi.com/search-news?text=" + rawMaterial + " " + region + "&earliest-publish-date=" + date;
                }else{
                    console.log("else");
                    url = "https://api.worldnewsapi.com/search-news?text=" + rawMaterial + " " + region;
                }
                
                var urlToFetch = url;
                fetch(urlToFetch, requestOptions)
                    .then(response => response.json())
                    .then(result => newsModel.setData(result))
                    .catch(error => console.log('api get error:', error));

                this.getRouter().navTo("RouteList", {
                    RawMaterial: rawMaterial,
                    Region: region
                });
                
            },

            onNavToNotFound: function () {
                this.getRouter().getTargets().display("NotFound", {
                    fromTarget: "TargetMain"
                });
            }

        });
    });
