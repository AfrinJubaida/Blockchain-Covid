$(document).ready(function() {
    $('#addVariant').submit(addVariant);
    $('#viewVariant').submit(viewVariant);
});


const appendVariant = function(variant) {
    let plist = $('#allvariantsList').html();
    const variantInfo = '<li>Firstidentificationdate: ' + variant.firstidentificationdate + '</li><li>IdentifiedCountry: ' + variant.identifiedcountry + '</li><li>Category: ' + variant.variantcategory + '</li>';
    const variantString = '<ul>' + variant.generalnameofvariant + ' ' + variant.scientificnameofvariant + variantInfo + '</ul>';
    $('#allvariantsList').html(plist + variantString);
}

const addVariant = function(event) {
    event.preventDefault();

    const formData = $('#addVariant').serializeArray();
    const generalnameString = formData[0].value;
    const scientificnameString = formData[1].value;
    const dateString = formData[2].value;
    const countryString = formData[3].value;
    const categoryString = formData[4].value;
    $.ajax({
        url: 'http://localhost:3000/addVariant',
        method: 'POST',
        data: JSON.stringify({
            generalnameofvariant: generalnameString,
            scientificnameofvariant: scientificnameString,
	    firstidentificationdate: dateString,
	    identifiedcountry: countryString,
            variantcategory: categoryString
        }),
        contentType: 'application/json',
        success: function(data) {
            appendVariant(JSON.parse(data));
        },
        error: function(error) {
            console.log(error);
        }
    });
}

const putVariant = function(variant) {
    const variantInfo = '<li>Firstidentificationdate: ' + variant.firstidentificationdate + '</li><li>IdentifiedCountry: ' + variant.identifiedcountry + '</li><li>Category: ' + variant.variantcategory + '</li>';
    const variantString = '<ul>' + variant.generalnameofvariant + ' ' + variant.scientificnameofvariant + variantInfo + '</ul>';
    $('#viewvariantdetails').html(variantString);
}

const viewVariant = function(event) {
    event.preventDefault();

    const formData = $(this).serialize();
    $.ajax({
        url: 'http://localhost:3000/view?' + formData,
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
