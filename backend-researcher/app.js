'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const admin = require('./enrollAdmin.js');
const user = require('./registerUser.js');
const query = require('./query.js');

async function init() {
    app.use(cors())
    app.use(express.json());

    await connect();

    app.get('/', (req, res) => res.send('Hello World!'));

    app.get('/all', (req, res) => allRoute(req, res));

    app.get('/view', (req, res) => viewVariantRoute(req, res));

    app.post('/addVariant', (req, res) => addVariantRoute(req, res));

    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}

async function connect() {
    await admin.enroll();
    await user.register();
}

async function allRoute(req, res) {
    try {
        await query.initialize();
        const result = await query.showAll();
	res.setHeader('Content-Type', 'application/json');
        res.status(200).send(result);
    } catch (error) {
        console.error(`error on allRoute: ${error}`);
    }
}

async function viewVariantRoute(req, res) {
    try {
        await query.initialize();
        const result = await query.viewVariant(req.query.generalnameofvariant, req.query.scientificnameofvariant);
        res.status(200).send(result);
    } catch (error) {
        console.error(`error on viewVariantRoute: ${error}`);
    }
}

async function addVariantRoute(req, res) {
    try {
        await query.initialize();
        const result = await query.addVariant(req.body.generalnameofvariant, req.body.scientificnameofvariant, 
            req.body.firstidentificationdate, req.body.identifiedcountry, req.body.variantcategory);
        res.status(200).send(result);
    } catch (error) {
        console.error(`error on addVariantRoute: ${error}`);
    }
}

init();
