const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const PORT = process.env.PORT || 3001;

const bakedgoodsPath = path.join(__dirname, 'bakedgoods.json');

app.use(morgan('dev'));

app.get('/', (request, response) => {
	response.send('The Slash Route is working.');
});

app.get('/bakedgoods', (request, response) => {
	fs.readFile(bakedgoodsPath, 'utf-8', (error, bakedgoodsJSON) => {
		if (error) {
			console.error(error);
			return response.sendStatus(500);
		}
		const bakedgoods = JSON.parse(bakedgoodsJSON);
		response.send(bakedgoods);
	});
});

app.get('/bakedgoods/:id', (request, response) => {
	fs.readFile(bakedgoodsPath, 'utf-8', (error, bakedgoodsJSON) => {
		if (error) {
			console.error(error);
			return response.sendStatus(500);
		}
		const bakedgoods = JSON.parse(bakedgoodsJSON);
		response.send(bakedgoods[parseInt(request.params.id)])
	});
});

app.listen(PORT, () => {
	console.log(`bakery-bakedgoods-express: Express application is listening on port ${PORT}...`);
});
