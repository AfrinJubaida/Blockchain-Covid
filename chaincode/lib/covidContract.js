'use strict';

// Fabric smart contract class
const { Contract } = require('fabric-contract-api');

// The Product model
const Variant = require('./variant.js');

/**
 * The e-store smart contract
 */
class covidContract extends Contract {

    /**
     * Initialize the ledger with a few products to start with.
     * @param {Context} ctx the transaction context.
     */
    async initLedger(ctx) {
        const variants = [
            {
                generalnameofvariant: 'Alpha',
                scientificnameofvariant: 'lineage B.1.17',
                firstidentificationdate: '09-2020',
                identifiedcountry: 'UK',
		variantcategory: 'Concern'
            },
            {
                generalnameofvariant: 'Beta',
                scientificnameofvariant: 'lineage B.1.351',
                firstidentificationdate: '05-2020',
                identifiedcountry: 'South Africa',
		variantcategory: 'Concern'
            },
	    {
                generalnameofvariant: 'Gamma',
                scientificnameofvariant: 'lineage P.1',
                firstidentificationdate: '11-2020',
                identifiedcountry: 'Brazil',
		variantcategory: 'Concern'
            },
	    {
                generalnameofvariant: 'Delta',
                scientificnameofvariant: 'lineage B.1.671',
                firstidentificationdate: '10-2020',
                identifiedcountry: 'India',
		variantcategory: 'Concern'
            },
	    {
                generalnameofvariant: 'Epsilon',
                scientificnameofvariant: 'lineage B.1.427',
                firstidentificationdate: '03-2020',
                identifiedcountry: 'USA',
		variantcategory: 'Interest'
            }
        ];

        for (let i = 0; i < variants.length; i++) {
            await this.addVariant(ctx, variants[i].generalnameofvariant, variants[i].scientificnameofvariant, variants[i].firstidentificationdate, 
                variants[i].identifiedcountry,variants[i].variantcategory);
        }

        return variants;
    }

    /**
     * Release a new product into the store.
     * @param {Context} ctx The transaction context
     * @param {String} vendor The vendor for this product.
     * @param {String} name The name of this product.
     * @param {String} price The product price
     * @param {String} owner The owner of the product. If unbought, this field should be the same as the vendor.
     * @param {Boolean} bought Whether this product has been bought yet.
     */
    async addVariant(ctx, generalnameofvariant, scientificnameofvariant, firstidentificationdate, identifiedcountry, variantcategory) {
        // Create a composite key 'PROD{vendor}{name}' for this product.
        let key = ctx.stub.createCompositeKey('PROD', [generalnameofvariant, scientificnameofvariant]);
        // Create a new product object with the input data.
        const variant = new Variant(generalnameofvariant, scientificnameofvariant, firstidentificationdate, identifiedcountry, variantcategory);

        // Save the product in the datastore.
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(variant)));

        return variant;
    }

    

    /**
     * Retrieve information about a product.
     * @param {String} ctx The transaction context.
     * @param {String} vendor The product vendor.
     * @param {String} name The product name.
     */
    async viewVariant(ctx, generalnameofvariant, scientificnameofvariant) {
        // Retrieve the product document from the data store based on its vendor and name.
        const key = ctx.stub.createCompositeKey('PROD', [generalnameofvariant, scientificnameofvariant]);
        const variantAsBytes = await ctx.stub.getState(key);
        
        // Check whether the product exists.
        if (!variantAsBytes || variantAsBytes.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        // Return the product information.
        return variantAsBytes.toString();
    }

  async viewAllVariant(ctx) {
        // Retrieve all products stored in the data store.
        const results = [];
        for await (const result of ctx.stub.getStateByPartialCompositeKey('PROD', [])) {
            const strValue = Buffer.from(result.value).toString('utf8');            
            try {
                let variant = Variant.deserialize(JSON.parse(strValue));

                // Only include those products that haven't been bought yet.
                if (variant) {
                    results.push(variant);
                }
            } catch (error) {
                throw error;
            }
        }

        return results;
    }
    
}
    

module.exports = covidContract;
