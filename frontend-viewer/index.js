$(document).ready(function() {
    $('#showAll').click(getAll);
    $('#viewVariant').submit(viewVariant);
});

const getAll = function(event) {
    $.ajax({
        url: 'http://localhost:3001/all',
        method: 'GET',
        accepts: "application/json",
        success: function(data) {
            populateVariants(JSON.parse(data));
        },
        error: function(error) {
            alert(JSON.stringify(error));
        }
    });
}

const populateVariants = function(variants) {
    //let plistString = '<ul id="unsoldProductsList">Unsold Products';
    //let buyButton = "";
    variants.forEach(function(variant) {
        const variantInfo = '<li>Firstidentificationdate: ' + variant.firstidentificationdate + '</li><li>IdentifiedCountry: ' + variant.identifiedcountry + '</li><li>Category: ' + variant.variantcategory + '</li>';
    	const variantString = '<ul>' + variant.generalnameofvariant + ' ' + variant.scientificnameofvariant + variantInfo + '</ul>';
    });
    //plistString = plistString + '</ul>';

    $('#allVariantsDiv').html(variantString);
    //$('.buy').submit(buyProduct);
}

const putVariant = function(variant) {
    const variantInfo = '<li>Firstidentificationdate: ' + variant.firstidentificationdate + '</li><li>IdentifiedCountry: ' + variant.identifiedcountry + '</li><li>Category: ' + variant.variantcategory + '</li>';
    const variantString = '<ul>' + variant.generalnameofvariant + ' ' + variant.scientificnameofvariant + variantInfo + '</ul>';
    $('#viewvariantdetails').html(variantString);
    console.log(variant);
}

const viewVariant = function(event) {
    event.preventDefault();

    const formData = $(this).serialize();
    $.ajax({
        url: 'http://localhost:3001/view?' + formData,
        method: 'GET',
        accepts: 'application/json',
        success: function(data) {
            putVariant(JSON.parse(data));
        },
        error: function(error) {
            console.log(error);
        }
    });
}
