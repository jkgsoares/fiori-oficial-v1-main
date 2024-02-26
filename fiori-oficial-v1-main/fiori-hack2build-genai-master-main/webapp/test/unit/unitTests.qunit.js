/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"numenitcom/hack2build-genai/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
