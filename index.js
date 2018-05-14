const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;

const inventoryPath = path.join(__dirname, 'inventory.json'); // '/Users/adam.cooper/code/students/bakery-inventory-express/inventory.json'

app.get('/', (request, response) => {
	response.send('The Slash Route is working.');
});

app.get('/inventory', (request, response) => {
	fs.readFile(inventoryPath, 'utf-8', (error, inventoryJSON) => {
		if (error) {
			console.error(error);
			return response.sendStatus(500);
		}
		const inventory = JSON.parse(inventoryJSON);
		response.send(inventory);
	});
});

app.listen(PORT, () => {
	console.log(`bakery-inventory-express: Express application is listening on port ${PORT}...`);
});
