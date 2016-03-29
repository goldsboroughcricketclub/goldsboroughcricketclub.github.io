module.exports = function() {

    var helper = require('../modules/module-helpers');

    return {

        init: function() {

            $(document).ready(function() {
                if ($("#products-container").length) {
                    var showMoreBtn = $("#products-show-more");
                    var showMoreBtnText = "Load more";
                    var productsContainer = $("#products-container");

                    //$(showMoreBtn).on("click", function (e) {

                    // use delegate or on() as this button has been rendered using ajax,
                    // otherwise the onclick wont work on the ajaxed button
                    $("body" ).delegate("#products-show-more", 'click', function(e){

                        // get the pathname from href of last load more button
                        pathname = $("#products-show-more:last").attr("href");
                        $.ajax({
                            url: pathname,
                            data: {format: "html"},
                            dataType: "html",
                            beforeSend: function () {
                                $(showMoreBtn).find("div").text("Loading...");
                            },
                            "success": function (data) {

                                // remove original show more button as the url needs to be different
                                if ( $( ".load-more-wrap-original" ).length ) {
                                    $(".load-more-wrap-original").remove();
                                }

                                // remove last load more div before appending new data and new load more btn
                                $(".load-more-wrap").remove();

                                $(productsContainer).append(data);

                                // disable onclick if text is "No more results"
                                /*
                                if ($(".js-load-more").text() == "No more results") {
                                    alert('test');
                                    $(".js-load-more").off('click');
                                    $(".js-load-more").attr("disabled", true);
                                }
                                */
                                // Scroll to new content
                                $("html,body").animate({scrollTop: $(".load-more-row:last").offset().top}, 'slow');
                            }
                        });
                        return false;

                    });
                }
            });
        },
    };

}; // End module
