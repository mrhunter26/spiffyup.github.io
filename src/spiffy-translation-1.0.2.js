function billing_hook(){

    // Field Labels
    jQuery('#firstName, #shipFirstName').attr('placeholder', new_text.fname);
    jQuery('#lastName, #shipLastName').attr('placeholder', new_text.lname);
    jQuery('#company, #shipCompany').attr('placeholder',new_text.company);
    jQuery('#addressLine1, #shipAddressLine1').attr('placeholder',new_text.street1);
    jQuery('#addressLine2, #shipAddressLine2').attr('placeholder',new_text.street2);
    jQuery('#city, #shipCity').attr('placeholder',new_text.city);
    jQuery('#state, #shipState').attr('placeholder',new_text.state);
    jQuery('#zipCode, #shipZipCode').attr('placeholder',new_text.zip);
    jQuery('#emailAddress').attr('placeholder',new_text.email).attr('type', 'email');
    jQuery('#phoneNumber, #shipPhoneNumber').attr('placeholder',new_text.phone).attr('type', 'tel');

    // Headers
    jQuery('.billingTable th').text(new_text.header_billing);
    jQuery('.shippingTable th, .sp-heading').text(new_text.header_shipping);

    // Shipping
    if(spiffyCheckHasShippingEnabled()){
        jQuery('#SpiffyShippingPreview .empty').text(new_text.shipping_prompt);
        jQuery('#SpiffyShippingPreview .sp-changeshipping').text(new_text.shipping_change);
    }

}

function payment_hook(){

    // Payment
    jQuery('#cardNumber').attr('placeholder',new_text.payment_cardnumber);
    jQuery('#verificationCode').attr('placeholder',new_text.payment_cvc);
    jQuery('#expirationMonth option[disabled]').text(new_text.payment_month);
    jQuery('#expirationYear option[disabled]').text(new_text.payment_year);
    jQuery('.paymentMethodTable th').html(jQuery('.paymentMethodTable th').html().replace('Payment Info', new_text.header_payment));

}

function payplan_hook(){

    jQuery('.payplanSummaryHeader').text(new_text.payplan_scheduleheader);
    jQuery('.financeDate').text(new_text.payplan_financedate);
    jQuery('.paymentDate').each(function(){
        jQuery(this).html(
        jQuery(this).html()
            .replace('Today', new_text.payplan_date)
          );
    });

    jQuery('.payplanTable th').text(new_text.header_payplan);
    jQuery('.payplanTable .listCell label').each(function(){
    	jQuery(this).html(
        jQuery(this).html()
            .replace('Single payment of', new_text.payplan_single)
            .replace('payments of', new_text.payplan_multi)
        );
    });

}

// SHIPPING OPTIONS
// Daisy chain for compatibility
if(typeof shippingoptions_hook == 'function'){
    var shippingoptions_hook_old = shippingoptions_hook;
}

shippingoptions_hook = function(){

    // Daisy chain for compatibility
    if(typeof summary_hook_old == 'function'){
        shippingoptions_hook_old();
    }

    jQuery('.shipMethodTable th').text(new_text.header_shippingoptions);

}

// ORDER SUMMARY
// Daisy chain for compatibility
if(typeof summary_hook == 'function'){
    var summary_hook_old = summary_hook;
}

summary_hook = function(){

    // Daisy chain for compatibility
    if(typeof summary_hook_old == 'function'){
        summary_hook_old();
    }

    // Header
    jQuery('.viewCart .summaryTitle').text(new_text.header_summary);

    // Product List
    jQuery('.viewCart .subscriptionPlan').each(function(){
        jQuery(this).html(
            jQuery(this).html()
                .replace('month', new_text.payment_month)
                .replace('year', new_text.payment_year)
        );
    });

    // Labels
    jQuery('.totalLabel').text(
            jQuery('.totalLabel').text()
                .replace('Total', new_text.summary_total)
                .replace('Due Today', new_text.summary_duetoday)
        );

    jQuery('.orderTotal').text(
            jQuery('.orderTotal').text()
                .replace('FREE', new_text.summary_free)
        );

    jQuery('.orderSummary .listCell').each(function(){
    	jQuery(this).html(
            jQuery(this).html()
                .replace('Subtotal', new_text.summary_subtotal)
                .replace('Shipping', new_text.summary_shipping)
        );
    });

    // Tax
    jQuery('#taxLabel').text(jQuery('#taxLabel').text().replace('Tax', new_text.summary_tax));

    // Promocode
    if(spiffyCheckHasPromoCodeEnabled()){
        jQuery('.promoField').attr('placeholder', new_text.summary_promo_label);
        jQuery('.spiffy-coupon-toggle').text(new_text.summary_promo_link);
        jQuery('.codeButton').text(new_text.summary_promo_apply);
    }

}

// PAYPAL HOOK
// Daisy chain for compatibility
if(typeof paypalbutton_hook == 'function'){
    var paypalbutton_hook_old = paypalbutton_hook;
}

paypalbutton_hook = function(){

    // Daisy chain for compatibility
    if(typeof paypalbutton_hook_old == 'function'){
        paypalbutton_hook_old();
    }

    jQuery('.checkoutLinks .checkoutWithPayPalLink').html(
        jQuery('.checkoutLinks .checkoutWithPayPalLink').html()
            .replace('Checkout with', new_text.buttons_paypal)
        );

    jQuery('.checkoutLinks .pp-or').text(new_text.buttons_or);

    // Statics
    jQuery('.sp-security').html(
       jQuery('.sp-security').html()
           .replace('Payment secured by 256-bit encryption', new_text.footer_security)
       );

    jQuery('#spiffy-footer').html(
       jQuery('#spiffy-footer').html()
           .replace('Copyright', new_text.footer_copyright)
           .replace('All Rights Reserved', new_text.footer_rights)
       );

    jQuery('.spiffy-footerterms').text(new_text.footer_terms);


}

// checkout button
window.button_text = new_text.buttons_order;
