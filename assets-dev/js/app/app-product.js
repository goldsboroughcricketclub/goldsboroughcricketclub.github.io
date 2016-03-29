module.exports = function() {

    var helper = require('../modules/module-helpers');

    return {
        init: function() {

            $(document).ready(function() {

                // init 'sharethis' plugin if there is a button present on the page
                if ($('.st_sharethis_custom').length > 0) {
                    stLight.options({publisher:'1ea6a44f-0e3f-44ae-be95-0516eae2d3e3', onhover: 'false'});
                }

            });
        },
    };

}; // End module
