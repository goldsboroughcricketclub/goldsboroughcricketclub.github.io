var accordions = {};

module.exports = function () {


    return {

        /**
         * scrollToTarget
         *
         * Scrolls to an element, using the target attribute as the target to scroll to.
         *
         * @param options Accepts an array of options:
         * @option href string The href of the targer you want to scroll to
         */
        scrollToTarget: function(target, customOffset, pushState) {
            // If href missing, return.
            if (!target) return;

            var offset = 0;

            if(typeof customOffset === "number") {
                offset = customOffset;
            }

            // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
            // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174
            var $target = $(target);

            // Older browsers without pushState might flicker here, as they momentarily
            // jump to the wrong position (IE < 10)
            if ($target.length) {
                $('html, body').animate({
                    scrollTop: $target.offset().top - offset
                });
                if(pushState) {
                    if (history && "pushState" in history) {
                        history.pushState({}, document.title, window.location.pathname + target);
                        return false;
                    }
                }
            }
        },


        /**
         * makeAccordion
         *
         * Shows or hides the TARGET when clicking on the TRIGGER.
         * All accordions on the page are stored so that they can be closed
         * When another from the group is opened.
         *
         * @param trigger string | A DOM selector of the target trigger
         * @param target string | A DOM selector of the target (What will be shown/ hidden)
         * @param callbackOpen function | A function to run once the target has opened
         * @param callbackClose function | A function to run once the target has closed
         * @param groupId int | [Optional] Allows grouping of accordions, so that others with the same ID will close when the target is opened.
         */
        makeAccordion: function(trigger, target, groupId, callbackOpen, callbackClose) {

            var _self = this;

            trigger = $(trigger);
            target = $(target);

            if(groupId === undefined) {
                groupId = "none";
            }

            trigger.addClass("accordion");
            trigger.attr("data-groupId", groupId);


            var accordion_index;
            if(accordions[groupId] === undefined) {
                accordions[groupId] = [];
            }
            console.log("HELLO");
            console.log(accordions);

            accordion_index = accordions[groupId].length;

            accordions[groupId][accordion_index] = {
                "groupId": groupId,
                "trigger": trigger,
                "target": target,
                "opened": false,
                "event": trigger.on("click", function() {

                    // Checks to see if the accordion is open (Or even set)
                    if(accordions[groupId][accordion_index].opened === undefined || accordions[groupId][accordion_index].opened === false) {

                        // If this accordion is part of a group, it is necessary to
                        // close all other accordions part of that group. (Excluding "none")
                        if(accordions[groupId][accordion_index].groupId !== "none") {
                            $.each(accordions[groupId], function(key, value) {
                                accordions[groupId][key].target.attr("data-opened", "false");
                                accordions[groupId][key].trigger.attr("data-opened", "false");
                            });
                        }

                        // We open the accordion, and update the JS info:
                        target.attr("data-opened", "true");
                        trigger.attr("data-opened", "true");

                        accordions[groupId][accordion_index].opened = true;

                        if(callbackOpen !== undefined) {
                            callbackOpen(accordions[groupId][accordion_index]);
                        }

                    } else {

                        // We open the accordion, and update the JS info:
                        target.attr("data-opened", "false");
                        trigger.attr("data-opened", "false");

                        accordions[groupId][accordion_index].opened = false;

                        if(callbackClose !== undefined) {
                            callbackClose(accordions[groupId][accordion_index]);
                        }

                    }
                })
            };

        },

        /**
         * realOwlRefresh
         *
         * Because the Owl Carousel doesn't have a working destroy function
         * and leaves some stuff behind, run it through this function
         * to completely remove traces of its existance.
         * You can also reload the carousel using this method, useful when
         * loading them in popups or slidy things.
         *
         * @param jQueryObject object The serealOwllector object you want to refresh owl carousel on
         * @param justDestroy bool Set to true if you don't want the carousel to refresh and instead just destroy.
         */
        realOwlRefresh: function(jQueryObject, justDestroy) {

            // Sets the just destroy default:
            justDestroy = justDestroy || false;


            // Destroys the Owl Carousel in question:
            jQueryObject.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            jQueryObject.find('.owl-stage-outer').children().unwrap();

            // Check if the user requested just to destroy
            if(!justDestroy) {

                var options = jQueryObject.data('owlCarousel').options;

                // If not, recreate the owl with the same options as before:
                jQueryObject.owlCarousel(options);
            }
        },

        /*
         * carouselRequiresControls
         *
         * Given carousel data gathered from an pre-exisiting carousel,
         * checks whether controls are necessary.
         * If a carousel (At the current resolution) has more items than
         * what can fit on the screen, then controls are required.
         *
         * Carousel data can be retrieved using $(selector).data("owl.carousel")
         *
         * @param object The carousel data object
         * @return bool Are the controls required or not?
         */
        carouselRequiresControls: function(carouselData)
        {

            /* Test to see if the method was used correctly with an object.
             * We'll warn the user in the console if used incorrectly.
             */
            if( typeof carouselData === "object" ) {

                var screenWidth = $(window).width();
                var breakpoint = carouselData._breakpoint;
                var totalItems = carouselData._items.length;

                var itemsVisible = 0;

                /*
                 * Test to see if responsive options have been set and work out the number of items that
                 * will be visible.
                 */
                if(carouselData.options.responsive !== undefined) {

                    itemsVisible = carouselData.options.responsive[breakpoint].items;
                } else {

                    itemsVisible = carouselData.options.items;
                }

                /*
                 * Finally, conduct the final test to see if the controls are required
                 */

                if(itemsVisible < totalItems) {

                    // Controls required, return true:
                    return true;
                } else {

                    // Controls not required, return false:
                    return false;
                }

            } else {
                console.warn("carouselRequiresControls was not run because the carouselData parameter was not an object.");
            }

        },

    };

};
