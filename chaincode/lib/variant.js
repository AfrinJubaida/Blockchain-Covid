'use strict';

/**
 * The Product model.
 */
class Variant {
    constructor(generalnameofvariant, scientificnameofvariant, firstidentificationdate, identifiedcountry, variantcategory) {
        this.generalnameofvariant = generalnameofvariant;
        this.scientificnameofvariant = scientificnameofvariant;
        this.firstidentificationdate = firstidentificationdate;
        this.identifiedcountry = identifiedcountry;
	this.variantcategory = variantcategory;
        
    }

    getfirstidentificationdate(){
	return this.firstidentificationdate;
    }

    setfirstidentificationdate(firstidentificationdate){
	this.firstidentificationdate = firstidentificationdate;
    }

    getidentifiedcountry() {
        return this.identifiedcountry;
    }

    setidentifiedcountry(identifiedcountry) {
        this.identifiedcountry = identifiedcountry;
    }

    getvariantcategory() {
        return this.variantcategory;
    }

    setvariantcategory(variantcategory) {
        this.variantcategory = variantcategory;
    }

    

    static deserialize(data) {
        return new Variant(data.generalnameofvariant, data.scientificnameofvariant, data.firstidentificationdate, data.identifiedcountry, data.variantcategory);
    }
}

module.exports = Variant;
