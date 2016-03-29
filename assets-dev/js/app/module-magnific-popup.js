module.exports = function() {

    var helper = require('../modules/module-helpers');

    return {

        init: function() {

            $(document).ready(function() {
                //popup stuff
			    $('.js-add-to-pinboard').magnificPopup({
			        disableOn: 700,
			        type: 'iframe',
			        mainClass: 'mfp-fade',
			        removalDelay: 160,
			        preloader: false,
			        fixedContentPos: false
			    });

                $('.js-share-pinboard').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });

                $('.js-add-pinboard-note').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            });

            $(document).ajaxComplete(function() {
                //popup stuff
                $('.js-add-to-pinboard').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });

                $('.js-share-pinboard').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });

                $('.js-add-pinboard-note').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            });
        },
    };

}; // End module
