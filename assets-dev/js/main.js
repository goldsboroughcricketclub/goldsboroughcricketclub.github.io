var app = {};

/*
 * ===============================
 * Application Files
 * ===============================
 *
 * Application files must have an init method, as these files are
 * executed on load.
 *
 */



app.main = require('./app/app-main')().init();
app.product = require('./app/app-product')().init();
app.category = require('./app/app-category')().init();
app.pinboard = require('./app/app-pinboard')().init();
app.popup = require('./app/module-magnific-popup')().init();





// app.index = require('./app/app-index')().init();

/*
 * ===============================
 * Modules
 * ===============================
 */






// console.log('Load main.js - The Module Loader');
// var moduleMain = require('./app/module-main');
// moduleMain();
// require('./app/module-category.js');
// var moduleSlider  = require('./app/module-slider');
// moduleSlider();
