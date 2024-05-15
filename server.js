const express = require('express');
const {MongoClient, ObjectId} = require('mongodb'); //подключение билиотек MongoClient, ObjectId  

const app = express();
const port = 8000;

app.use(express.json())
app.use(express.static('public'))

//функция вызова базы данных
async function getDbCollection(dbAddress, dbName, dbCollectionName){
	const client = new MongoClient(dbAddress);//создаем подключение
	await client.connect();//подлкючаемся
	const db = client.db(dbName); //вызываем базу данных
	return db.collection(dbCollectionName); //вызываем табличку books
}

//для получения списка задач
app.get('/books', async function(req, res) {
	const collection = await getDbCollection('mongodb://127.0.0.1', 'mylibrary', 'books');//вызов функции
	const data = await collection.find({}).toArray(); //поиск записей в табличке books
	console.log(data);
	res.send(data);
});

//для получения определенной задчи
app.get('/books/:id', async function(req, res) {
	const collection = await getDbCollection('mongodb://127.0.0.1', 'mylibrary', 'books');//вызов функции
	const data = await collection.findOne({_id: new ObjectId(req.params.id)}); //поиск записи в табличке books с определенным id
	res.send(data);
});

//для добавления новых задач
app.post('/books', async function(req, res) {
	const book = {...req.body, done: false};//копирование текста из запроса в новую переменную, чтобы оно отобразилось на страничке
	const collection = await getDbCollection('mongodb://127.0.0.1', 'mylibrary', 'books');//вызов функции
	await collection.insertOne(book);
	res.send(book);
});

//для обновления определенной задачи
app.patch('/books/:id', async function(req, res) {
	const collection = await getDbCollection('mongodb://127.0.0.1', 'mylibrary', 'books');//вызов функции
	const data = await collection.updateOne({_id: new ObjectId(req.params.id)}, {'$set': req.body}); //поиск записи в табличке books с определенным id
	res.send({});
});

//для удаления определенной задачи
app.delete('/books/:id', async function(req, res) {
	const collection = await getDbCollection('mongodb://127.0.0.1', 'mylibrary', 'books');//вызов функции
	await collection.deleteOne({_id: new ObjectId(req.params.id)}); //поиск записи в табличке books с определенным id
	res.send({});
});

app.listen(port, function() {
	console.log('Server is started');
});



//toArray приводит результат к массиву, а массив записывается в data