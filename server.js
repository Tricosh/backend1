const express = require('express');
const {MongoClient, ObjectId} = require('mongodb'); //подключение билиотек MongoClient, ObjectId  

const app = express();
const port = 8000;

app.use(express.json())
app.use(express.static('public'))

//функция вызова базы данных
async function getDbCollection(dbCollectionName){
	 const client = new MongoClient('mongodb://127.0.0.1')
    await client.connect()
    const db = client.db("mylibrary")
    return db.collection(dbCollectionName)
}

//для получения списка задач
app.get('/books', async function(req, res) {
	const collection = await getDbCollection('books');//вызов функции
	const data = await collection.find({}).toArray(); //поиск записей в табличке books
	/*console.log(data);*/
	res.send(data);
});

app.get('/cart', async function (req, res){

    const currentUser = 'name1'
    const collectionUserBook = await getDbCollection("usersbooks")
    const userBooksInCart = await collectionUserBook.find({username:currentUser, incart:true}).toArray()
    const collectionBooks = await getDbCollection("books")
	var book2 = []
	for (const book of userBooksInCart){
    	const bookDetail = await collectionBooks.findOne({title:book.bookname})
		book2.push({...book, ...bookDetail})
		/*console.log({...book, ...bookDetail})*/
	}
	console.log(book2)
	
    res.send(book2)
})

app.get('/bookdetail/:id', async function (req, res){

    const collectionBooks = await getDbCollection('books')
    const book = await collectionBooks.findOne({_id: new ObjectId(req.params.id)})

	/*console.log(book)*/
	
    const currentUser = 'name1'
    const collectionUserBook = await getDbCollection("usersbooks")
    const userBookRating = await collectionUserBook.findOne({username:currentUser, bookname:book.title})
    const bookRatings = await collectionUserBook.find({bookname:book.title}).toArray()
    if (bookRatings.length === 0) {
        res.send(book)
        return
    }

    userRating = Number(userBookRating.rating)
    incart = userBookRating.incart

    avarageRating = 0.0
    bookRatings.map(function(item){
        avarageRating += Number(item.rating)
    })
    avarageRating = avarageRating/bookRatings.length
    
    /*console.log("incart = " + incart)*/

    res.send( {...book, userRating, avarageRating, incart })
})

app.post('/bookdetail/:id', async function(req, res){

    incart = req.body.incart

    const collectionBooks = await getDbCollection("books")
    const book = await collectionBooks.findOne({_id: new ObjectId(req.params.id)})

    const currentUser = 'name1'
    const collectionUserBook = await getDbCollection("usersbooks")
    collectionUserBook.updateOne({username:currentUser, bookname:book.title}, {'$set':{incart}})
    
    /*console.log(incart)*/
    res.send( {} )

})

app.patch('/bookdetail/:id', async function(req, res){

    rating = req.body.rating 
    /*console.log(req.body)*/

    const collectionBooks = await getDbCollection("books")
    const book = await collectionBooks.findOne({_id: new ObjectId(req.params.id)})

    const currentUser = 'name1'
    const collectionUserBook = await getDbCollection("usersbooks")
    collectionUserBook.updateOne({username:currentUser, bookname:book.title}, {'$set':{rating}})
    res.send( {} )

})

app.patch('/cart', async function(req, res){

    title = req.body.title 
    console.log(title)

    const currentUser = 'name1'
    const collectionUserBook = await getDbCollection("usersbooks")
    collectionUserBook.updateOne({username:currentUser, bookname:title}, {'$set':{incart:false}})
    res.send( {} )

})

//для получения определенной задчи
app.get('/books/:id', async function(req, res) {
	const collection = await getDbCollection('books');//вызов функции
	const data = await collection.findOne({_id: new ObjectId(req.params.id)}); //поиск записи в табличке books с определенным id
	res.send(data);
});

//для добавления новых задач
app.post('/books', async function(req, res) {
	const book = {...req.body, done: false};//копирование текста из запроса в новую переменную, чтобы оно отобразилось на страничке
	const collection = await getDbCollection('books');//вызов функции
	await collection.insertOne(book);
	res.send(book);
});

//для обновления определенной задачи
app.patch('/books/:id', async function(req, res) {
	const collection = await getDbCollection('books');//вызов функции
	const data = await collection.updateOne({_id: new ObjectId(req.params.id)}, {'$set': req.body}); //поиск записи в табличке books с определенным id
	res.send({});
});

//для удаления определенной задачи
app.delete('/books/:id', async function(req, res) {
	const collection = await getDbCollection('books');//вызов функции
	await collection.deleteOne({_id: new ObjectId(req.params.id)}); //поиск записи в табличке books с определенным id
	res.send({});
});

app.listen(port, function() {
	/*console.log('Server is started');*/
});
