module.exports = function() {

    var helper = require('../modules/module-helpers');

    function general() {


        // Hide credit card issue number unless Maestro
        var creditCardSelect = $('#card_type');
        var issueNumberWrap = $('.js-issue-number-wrap');
        // issueNumberWrap.css('display', 'none');

        creditCardSelect.on("change", function(e) {
            var getThisVal = $(this).val();
            checkCardType(getThisVal);
        });

        function checkCardType(getThisVal) {
            if (getThisVal === "MAESTRO") {
                issueNumberWrap.slideDown(250, function() {});
            } else {
                issueNumberWrap.slideUp(250, function() {});
            }
        }



        //popup stuff
        $('.js-play-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // autosuggest stuff for search
        $("input#headerSearch").autocomplete({
            source: $("base").attr("href") + "search/suggest",
            delay: 500,
            appendTo: "#js-search-results",
            messages: {
                noResults: '',
                results: function() {}
            },
            select: function(event, ui) {
                var url = ui.item.url;
                if (typeof(url) !== 'undefined') {
                    window.location.href = url;
                }
                return false;
            },
            open: function() {
                $(this).data("uiAutocomplete").menu.element.attr("class", "autocomplete");
                $(this).data("uiAutocomplete").menu.element.attr("id", "autoComplete");
                $(this).data("uiAutocomplete").menu.element.attr("style", "");
            }
        }).data('ui-autocomplete')._renderItem = function(ul, item) {
            if (item.url !== '') {
                return $("<li></li>").data("item.autocomplete", item)
                    .append("<a href='" + item.url + "'>" + item.label + "</a>")
                    .appendTo(ul);
            } else {
                return $("<li></li>").data("item.autocomplete", item)
                    .append("<a >" + item.label + "</a>")
                    .appendTo(ul);
            }
        };

        /*
         * Fastclick
         */
        FastClick.attach(document.body);


        /*
         * Basket - Related Products toggle
         */

        var relatedProduct = $('.js-related-products');
        var relatedProductWrap = $('.js-related-product-wrap');
        relatedProductWrap = $('.js-related-product-wrap');

        relatedProductWrap.css('display', 'none');
        $('body').on('click', '.js-related-products', function(e) {
            e.preventDefault();
            $(this).parents('.js-product-container').next('.js-related-product-wrap').slideToggle(250);
            $(this).parents('.js-product-container').toggleClass('product-panel-active');
        });


        /*
         * Basket - Delivery Address Toggle
         */


        var deliveryAddressWrap = $('.js-delivery-address-wrap');
        //deliveryAddressWrap.css('display', 'none');
        $("#sameAsBilling:checkbox").change(function() {

            if ($(this).is(':checked')) {
                deliveryAddressWrap.slideUp();
            } else {
                deliveryAddressWrap.slideDown();
            }
        });

        /*
         * Checkout billing delivery, if delivery country selected is not UK, hide continue to payment button
         */
        var paymentBtn = $('.btn-continue-payment');
        var internationalMsgContainer = $('#js-international-msg');
        $("#delivery_country").change(function() {
            if ($(this).val() == "GB") {
                paymentBtn.css('display', 'block');
                internationalMsgContainer.css('display', 'none');
            } else {
                paymentBtn.css('display', 'none');
                internationalMsgContainer.css('display', 'block');
            }
        });

        /*
         * Checkout billing delivery, if billing country selected is not UK (and same as delivery), hide continue to payment button
         */
        var paymentBtn = $('.btn-continue-payment');
        var internationalMsgContainer = $('#js-international-msg');
        $("#billing_country").change(function() {
            if ($("#sameAsBilling:checkbox").is(':checked')) {
                if ($(this).val() == "GB") {
                    paymentBtn.css('display', 'block');
                    internationalMsgContainer.css('display', 'none');
                } else {
                    paymentBtn.css('display', 'none');
                    internationalMsgContainer.css('display', 'block');
                }
            }
        });

        /*
         * Email field on checkout index page
         * If user doesn't have a password, need to store email for billing form submission
         * as they are 2 separate forms
         */
        $("#username").change(function() {
            if ($(this).val() !== "") {
                $("#billing_username_check").val($(this).val());
            }
        });

        /*
         * Checkout billing address, on change of address from dropdown, submit form and populate form fields
         *
         */
        $("#billing-address-list").change(function() {
            if ($(this).val() !== "") {
                $("#billing-delivery-form").submit();
            }
        });

        /*
         * Checkout delivery address, on change of address from dropdown, submit form and populate form fields
         *
         */
        $("#delivery-address-list").change(function() {
            if ($(this).val() !== "") {
                $("#billing-delivery-form").submit();
            }
        });


        /*
         * If changing billing postcode and "same as billing" is selected, change submit button to
         * "Update Delivery Cost"
         *
         */
        var continuePaymentBtn = $('.btn-continue-payment');
        var updateDeliveryBtn = $('#update-delivery-container');
        updateDeliveryBtn.css('display', 'none');
        continuePaymentBtn.css('display', 'block');
        $('#billing_postcode').on('click', function(e) {
            if ($("#sameAsBilling:checkbox").is(':checked')) {
                if ($("#billing_country").val() == "GB") {
                    updateDeliveryBtn.css('display', 'block');
                    continuePaymentBtn.css('display', 'none');
                }
            }
        });

        /*
         * If changing delivery postcode change submit button to
         * "Update Delivery Cost"
         *
         */
        var continuePaymentBtn = $('.btn-continue-payment');
        var updateDeliveryBtn = $('#update-delivery-container');
        updateDeliveryBtn.css('display', 'none');
        continuePaymentBtn.css('display', 'block');
        $('#delivery_postcode').on('click', function(e) {
            if ($("#delivery_country").val() == "GB") {
                updateDeliveryBtn.css('display', 'block');
                continuePaymentBtn.css('display', 'none');
            }
        });

        /*
         * Checkout hide / show password
         */

        var enterYourPassword = $('.js-enter-your-password');
        enterYourPassword.css('display', 'none');

        $('body').on('click', '#checkoutPasswordYes', function(e) {
            enterYourPassword.slideDown(250, function() {});
            // if ($(this).prop('checked')) {}
        });

        $('body').on('click', '#checkoutPasswordNo', function(e) {
            enterYourPassword.slideUp(250, function() {});
            // if ($(this).prop('checked', false)) {}
        });

        // if the password form is in error, display the password field
        if ($('.checkout__fieldset-login .form-error').length > 0) {
            $('#checkoutPasswordYes').attr('checked', 'checked');
            enterYourPassword.show();
        }

        /*
         * Pin Button - toggle display
         */


        // $('.js-pin-button').on('touchstart click', function(e) {
        //     e.stopPropagation();
        //     e.preventDefault();
        //     $(this).toggleClass('pin-icon-inactive pin-icon-active');
        // });

        /*
         * Scroll to anchor
         */


        $('body').on('click', '.js-internal-link', function(e) {
            e.preventDefault();
            var target = this.hash;
            var $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 500, 'swing', function() {
                window.location.hash = target;
            });
        });



    } // End General



    var headerMenus = function() {


        var dropDown = $('.dropdown');
        var templateBody = $('.template, .footer__newsletter-wrap, .footer');
        var searchHeader = $('#searchHeader');
        var navLinks = $('#navLinks');
        var svgMenu = $('.svg-menu');
        var svgMagnify = $('.svg-magnify');
        var btnActiveCol = "#aac44a";
        var btnStaticCol = "#666";

        var dropHeight = $('.dropdown').height();
        var headPadBtm = parseInt($('.header__nav--sub').css('padding-bottom'));
        var dropMenu = dropHeight + headPadBtm;

        $('.header__nav--sub .dropdown-menu').css('top', dropMenu + 'px');


        /*
         * Search Toggle
         */

        searchHeader.css('display', 'none');
        $('body').on('click', '#searchToggle', function(e) {
            e.preventDefault();
            console.log('search active');

            $(this).toggleClass('search-active');

            if (window.matchMedia("(max-width: 480px)").matches) {
                navLinks.stop().slideUp(250);
            }

            $('.header__nav-wrap').toggleClass('header-active');

            searchHeader.slideToggle(250, function() {
                if ($(this).is(':visible')) {
                    svgMenu.css('fill', btnStaticCol);
                    showOverlay();
                } else {
                    hideOverlay();
                }
            });

            $('.js-header-search').focus();
            initialVal = $('.js-header-search').val();
            $('.js-header-search').val(initialVal);
        });

        $(document).on('click', function(event) {
            if (!$(event.target).closest('#searchToggle, #searchHeader').length) {
                $('.header__nav-wrap').removeClass('header-active');
                searchHeader.slideUp(250);
                $('#searchToggle').removeClass('search-active');
                hideOverlay();
            }
        });



        /*
         * Mobile Menu Toggle
         */

        $('body').on('click', '#mobMenu', function(e) {
            e.preventDefault();
            searchHeader.stop().slideUp(250);
            navLinks.slideToggle(250, function() {
                if ($(this).is(':visible')) {
                    svgMenu.css('fill', btnActiveCol);
                    svgMagnify.css('fill', btnStaticCol);
                    $('#searchToggle').removeClass('search-active');
                    $('.header__nav-wrap').removeClass('header-active');
                    showOverlay();

                } else {
                    svgMenu.css('fill', btnStaticCol);
                    hideOverlay();
                }
            });
        });



        /*
         * Close Mobile Menu click outside
         */

        if (window.matchMedia("(max-width: 480px)").matches) {
            $(document).on('click', function(event) {
                if (!$(event.target).closest('#mobMenu').length) {
                    navLinks.slideUp(250);
                    $(this).find(svgMenu).css('fill', btnStaticCol);
                    hideOverlay();
                }
            });
        }



        /*
         * Close Sales Strip
         */

        var salesStrip = $('#salesStrip');

        $(window).load(function() {

            setTimeout(function() {
                salesStrip.slideDown(300);
            }, 1500);

            $('body').on('click', '#closeSalesStrip', function(e) {
                e.preventDefault();
                salesStrip.slideUp(250, function() {
                    $(this).remove();
                });
            });

        });

        function showOverlay() {
            templateBody.addClass('overlay');
        }

        function hideOverlay() {
            templateBody.removeClass('overlay');
        }


        /*
         * Sub Nav Bootstrap Dropdowns
         */


        // add slidedown animation to dropdown
        dropDown.on('show.bs.dropdown', function(e) {
            searchHeader.stop().slideUp(250);
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown(250);
            $(this).find('.svg-menu').addClass('svg-wrap-active');
            showOverlay();

        });

        // add slideup animation to dropdown
        dropDown.on('hide.bs.dropdown', function(e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp(250);
            $(this).find('.svg-menu').removeClass('svg-wrap-active');
            hideOverlay();
        });

    };



    /*
     * loadSprites
     *
     * Loads the SVG spritesheet via AJAX and injects in to the DOM,
     * the SVG's can then be used using the use tag: i.e.
     * <svg role="img" title="SVG logo">
     *      <use xlink:href="<?= $this->getRequest()->getRequestUri() ?>#name-of-svg-file"></use>
     * </svg>
     *
     * @return undefined
     */

    var loadSprites = function() {

        $.ajax({
            type: "GET",
            url: "assets/svg-icons/svg-icons.svg",
            success: function(data) {

                var div = $("<div class='svg-sprite-wrap' />");
                div.html($(data).find("svg"));

                $("body").prepend(div);
            }
        });

        $.ajax({
            type: "GET",
            url: "assets/svg-icons/svg-tech-icons.svg",
            success: function(data) {

                var div = $("<div class='svg-tech-sprite-wrap' />");
                div.html($(data).find("svg"));

                $("body").prepend(div);
            }
        });


    };

    /*
     * initLazyload
     *
     * Initiates the lazyload script that AJAXs images in as a background image.
     * Applying a ".lazy" class to an element and setting it's "data-original" attribute
     * to be the source of the image will activate lazy loading on that element
     *
     * @return undefined
     */

    var initLazyload = function() {
        $('.lazyload').lazyload();
    };


    var initCustomScroll = function() {
        $(".filter__list").mCustomScrollbar({
            scrollInertia: 0,
            alwaysShowScrollbar: 2,
        });
    };



    function accordion() {

        /*
         * Accordion toggle icons -----
         */

        function toggleChevron(e) {
            $(e.target)
                .prev('.panel-heading')
                .find('.indicator')
                .toggleClass('show-plus show-minus');
        }


        var accordionMain = $('#categoryAccordion');
        accordionMain.on('hidden.bs.collapse', toggleChevron);
        accordionMain.on('shown.bs.collapse', toggleChevron);

        // Close Accordion for medium views
        if ($('#categoryAccordion').length) {
            if (window.matchMedia("(max-width: 991px)").matches) {
                $('#categoryAccordion .collapse').removeClass('in');
                $('.indicator').removeClass('show-minus').addClass('show-plus');
            }
        }


        /*
         * Collapse Categories Header for medium views
         */

        if (window.matchMedia("(max-width: 991px)").matches) {
            $('#categoryCollapse').removeClass('in');
            $('#filterCollapse').removeClass('in');
        }

        $('#relatedProductWrap').css('display', 'none');

        $('body').on('click', '#addToBasket', function(e) {
            e.preventDefault();
        });
    }



    function owlHeroSlider() {

        /*
         * Home Carousel
         */


        var owl = $('#homeCarousel');
        owl.on('initialize.owl.carousel initialized.owl.carousel ' +
            'refresh.owl.carousel refreshed.owl.carousel ' +
            'update.owl.carousel updated.owl.carousel ' +
            'translate.owl.carousel translated.owl.carousel ' +
            'to.owl.carousel changed.owl.carousel',
            function(e) {

            });

        owl.owlCarousel({
            margin: 10,
            nav: true,
            dots: true,
            info: true,
            callbacks: true,
            slideBy: 1,
            lazyLoad: true,
            responsive: {
                0: {
                    nav: false,
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    }


    function owlProductSlider() {

        /*
         * Product Slider / Fader -----
         */

        var sliderProduct = $('#productSlider'),
            productThumbs = $('#productThumbs');
        sliderProduct.on('changed.owl.carousel', function(e) {
            if (!e.namespace || e.type != 'initialized' && e.property.name != 'position') return;
            var current = e.relatedTarget.current(),
                items = $(this).find('.owl-stage').children(),
                add = e.type == 'changed' || e.type == 'initialized',
                getActive = e.item.index,
                pages = e.page.count,
                item = e.item.index;

            // productThumbs.find(".product-thumb a img").css({
            //     "border-color": "transparent"
            // });
            // $(".js-product-thumb").eq(event.item.index).css({
            //     "border-color": "#164194"
            // });



        }).owlCarousel({
            items: 1,
            animateOut: 'fadeOut',
            nav: false,
        });

        /*
         * Synch thumbs with Carousel
         */
        $('body').on('click', '.js-product-thumb', function(e) {
            e.preventDefault();
            $('.js-product-thumb').removeClass('product-thumb-active');
            $(this).addClass('product-thumb-active');
            var key = $(this).attr("data-key");
            sliderProduct.trigger('to.owl.carousel', [key, 300, true]);
        });


        /*
         * Product Slider Zoom (magnific popup) -----
         */

        // $('.inline-popup').click(function(event) {
        $('body').on('click', '.inline-popup', function(e) {
            e.preventDefault();
            $('.hero-slider .owl-stage owl-item.active img').attr('data-url');
        });


        $('.js-zoom-wrap').magnificPopup({
            type: 'image',
            removalDelay: 500, //delay removal by X to allow out-animation
            disableOn: 481, // disable popup below
            callbacks: {
                beforeOpen: function() {
                    // Add mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = this.st.el.attr('data-effect');
                },
                afterClose: function() {
                    // console.log('Popup is completely closed');
                },
            },
            closeOnContentClick: true,
            midClick: true
        });
    }

    function renderGoogleMap() {
        if ($("#google-map").length > 0) {

            //get showroom map:
            var myLatLng = {
                lat: 53.687374,
                lng: -1.8578587
            };

            // Create a map object and specify the DOM element for display.
            var map = new google.maps.Map($("#google-map")[0], {
                center: myLatLng,
                zoom: 14,
                scrollwheel: false,
                styles: {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                },
                disableDefaultUI: true
            });

            // Create a marker and set its position.
            var marker = new google.maps.Marker({
                map: map,
                position: myLatLng,
                title: 'Showroom',
                icon: "assets/images/background/pin-map.svg"
            });

            // get head office map:
            var myLatLng2 = {
                lat: 53.6786053,
                lng: -1.8332413
            };

            // Create a map object and specify the DOM element for display.
            var map2 = new google.maps.Map($("#google-map-head-office")[0], {
                center: myLatLng2,
                zoom: 14,
                scrollwheel: false,
                styles: {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                },
                disableDefaultUI: true
            });

            // Create a marker and set its position.
            var marker2 = new google.maps.Marker({
                map: map2,
                position: myLatLng2,
                title: 'Head Office',
                icon: "assets/images/background/pin-map.svg"
            });
        }
    }


    function addToBasket() {

        $('.js-add-to-basket').on('click', function(e) {

            e.preventDefault();

            var form = $(this).parents('.js-add-to-basket-form');

            $.ajax({
                url: "store/basket/add",
                data: $(form).serialize(),
                type: "POST",
                dataType: 'json',
                success: function(data) {

                    $('#js-basket-error').hide();

                    $('.js-basket-quantity, .js-basket-amount').fadeOut('fast', function() {
                        $('.js-basket-quantity').text("(" + data.total_qty + ")");
                        $('.js-basket-amount').text(data.grand_total);
                        $('.js-basket-quantity, .js-basket-amount').fadeIn();
                    });

                    if (data.error) {
                        $('#js-basket-error').html(data.message).slideDown();
                    } else {
                        $(form).find('.product__add-basket-anchor').slideDown();
                        $('#relatedProductWrap').slideDown(250, function() {});
                    }

                }
            });

        });
    }

    return {

        /*
         * init
         * This method is called first thing to initiate all the private methods
         * @return undefined
         */
        init: function() {


            $(document).ready(function() {
                headerMenus();
                general();
                loadSprites();
                initLazyload();
                initCustomScroll();
                accordion();
                owlHeroSlider();
                owlProductSlider();
                renderGoogleMap();
                addToBasket();
            });
        },
    };

}; // End module
