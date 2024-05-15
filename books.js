const {MongoClient} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

const books = [
		{
			title:'Автостопом по галактике', 
			author:'Дуглас Адамс', 
			genre:'приключения', 
			year:'1979', 
			quantity:'5',
			picture:'Avtostopom.jpg'
		},
		{
			title:'Детективное агенство Дирка Джентли', 
			author:'Дуглас Адамс', 
			genre:'детектив', 
			year:'1994', 
			quantity:'5',
			picture:'agenstvoDJ.jpg'
		  },
		  {
			title:'Шерлок Холмс', 
			author:'Артур Конан Дойл', 
			genre:'детектив', 
			year:'1824', 
			quantity:'4',
			picture:'Sherlock.jpg'
		  },
		  {
			title:'Винни Пух', 
			author:'Алан Александ Милн', 
			genre:'детcкое', 
			year:'1994', 
			quantity:'7',
			picture:'WinniePuh.jpg'
		  },
		  {
			title:'Гарри Поттер', 
			author:'Джоан Роулинг', 
			genre:'приключения', 
			year:'1998', 
			quantity:'3',
			picture:'GarryPotter.jpg'
		  },
		  {
			title:'Держи Марку!', 
			author:'Терри Праттчет', 
			genre:'приключения', 
			year:'1998', 
			quantity:'10',
			picture:'DerzyMarku.jpg'
		  },
		  {
			title:'Оно', 
			author:'Стивен Кинг', 
			genre:'хоррор', 
			year:'1998', 
			quantity:'2',
			picture:'Ono.jpg'
		  }
		];


async function run() {
	  try {
        await mongoClient.connect();
        const db = mongoClient.db("mylibrary");
        const collection = db.collection("books");   
        const results = await collection.insertMany(books);
        console.log(results);
        console.log(books);
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}

run().catch(console.error);


