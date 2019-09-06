/**
 * Event to attach landing page product color swatch
 */
klevu.coreEvent.attach("setRemoteConfigLanding", {
    name: "attachLandingPageProductColorSwatch",
    fire: function () {

        /** Set Template */
        klevu.search.landing.getScope().template.setTemplate(klevu.dom.helpers.getHTML("#landingPageProductColorSwatches"), "landingProductSwatch", true);

        /**
         * Initialize color swatches and service before rendering
         */
        klevu.search.landing.getScope().chains.template.render.addBefore("renderResponse", {
            name: "initializeLandingProductSwatches",
            fire: function (data, scope) {
                if (data.context.isSuccess) {
                    /** Initalize color swatch service */
                    klevu.colorSwatchesService();
                    /**	Modify product swatchesInfo data */
                    klevu.search.landing.getScope().colorSwatchesService.parseProductColorSwatch(data, scope);

                }
            }
        });

        /*
         *	Bind landing page color swatches events
         */
        klevu.search.landing.getScope().chains.template.events.add({
            name: "addProductGridColorSwatches",
            fire: function (data, scope) {
                klevu.search.landing.getScope().colorSwatchesService.bindColorGridEventsToLandingProducts(data, scope);
            }
        });

    }
});