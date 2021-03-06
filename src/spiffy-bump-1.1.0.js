// Initialize bump settings object
var bump = {};

// Initialize Spiffy Order Bump
spiffyBump = function( options ){

    // Defaults Settings
    var defaults = {
        title: "YES! I want your XYZ offer! (+$37)",
        description: "This is my order bump description text. You can even add HTML here as long as you don't break the quote marks!",
        insertAfter: ".spiffy-ordersummary",
        autoAdd: false,
        showSummary: false
    };

    options = options || {};
    for (var opt in defaults){
        if (defaults.hasOwnProperty(opt) && !options.hasOwnProperty(opt)){
            options[opt] = defaults[opt];
        }
    }

    // Set settings object
    bump.settings = options;

    // Initialization scripts
    jQuery(document).ready(function($){

        // Get ADD Action
        // TODO: Use core hook to inject upsells
        injectSpiffy('#UP_SELLS', function(){

            var $upsell = $('#upsellContainer');

            // Get add action
            if(spiffyHasUpsell() && !$upsell.hasClass('sp-injected')){

                $upsell.addClass('sp-injected');

                bump.settings.upsellAdd = $upsell.find('a.upsellButton').attr('onclick');

                if(typeof bump.settings.upsellAdd != 'undefined'){

                    console.log('Bump ADD Action: '+bump.settings.upsellAdd);

                }

            }

            // Initialize
            spiffyInitializeBumpOffer();

        });

        // Get REMOVE Action
        if(typeof summary_hook == 'function')
            var summary_hook_old = summary_hook;

        summary_hook = function(){

            spiffyUpdateBump();

            // Daisy chain for compatibility
            if(typeof summary_hook_old == 'function'){
                summary_hook_old();
            }

            if(spiffyHasUpsell() && bump.settings.upsellRemove != $('#ORDER_FORM_PRODUCT_LIST tr td a:not(.updateCart)').attr('href')){

                bump.settings.upsellRemove = $('#ORDER_FORM_PRODUCT_LIST tr td a:not(.updateCart)').attr('href');
                console.log('Bump REMOVE Action: '+bump.settings.upsellRemove);

            }

            if(!bump.settings.showSummary)
                $('#ORDER_FORM_PRODUCT_LIST tr td a:not(.updateCart)').parents('tr').hide();

        }


    });

    /* ORDER BUMP UTILITY FUNCTIONS
     * * * * * * * * * * * * * * * * * * * *
    */

    function spiffyHasUpsell(){

        if(jQuery('#upsellContainer').length > 0 || jQuery('.spiffy-ordersummary').length > 0){
            return true;
        }

        return false;

    }

    function spiffyInitializeBumpOffer(){

        if(typeof bump.initialized == 'undefined'){

            var status;

            // Handle auto-add upsells
            // TODO: Add logic in for lock down forms so we don't change the order on failed checkout
            if( bump.settings.autoAdd && !spiffyIsUpsellAdded() ){
                spiffyAddBump();
                var status = 'checked';
            }


            jQuery('<div class="spiffyBumpContainer" />').insertAfter(bump.settings.insertAfter);

            if( spiffyIsUpsellAdded() ){
                var status = 'checked';
            }

            var bumpHtml = '<label for="bumpStatus" class="bumpTitle"><input type="checkbox" id="bumpStatus" name="bumpStatus" value="" '+status+' /> ' + bump.settings.title + '</label><div class="bumpDescription">' + bump.settings.description + '</div>'

            jQuery('.spiffyBumpContainer').html(bumpHtml);

            jQuery('#bumpStatus').on('change', function(e){

                 spiffyUpdateBump();

            });

            bump.initialized = true;

        }

    }

    function spiffyUpdateBump(){

        if(spiffyBumpStatus() != spiffyIsUpsellAdded()){

            if(spiffyBumpStatus()){
                console.log('checked - adding bump - '+bump.settings.upsellAdd);
                spiffyAddBump()
            }else{
                console.log('unchecked - removing bump - '+bump.settings.upsellRemove);
                spiffyRemoveBump()
            }

        }

    }

    function spiffyAddBump(){

        eval(bump.settings.upsellAdd);

    }

    function spiffyRemoveBump(){

        eval(bump.settings.upsellRemove);

    }

    function spiffyBumpStatus(){

        return jQuery('#bumpStatus').prop('checked');

    }

    function spiffyIsUpsellAdded(){

        return ( jQuery('#ORDER_FORM_PRODUCT_LIST tr td a:not(.updateCart)').length > 0 ? true : false );

    }

}

// Adds back compatibility for pre 1.1.0 order bump
if(typeof spiffyBumpSettings != 'undefined')
    spiffyBump(spiffyBumpSettings);
