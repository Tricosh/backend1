const {MongoClient} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

const usersbooks = [
		{
			username:'name1', 
			rating:'4', 
			bookname:'Детективное агенство Дирка Джентли', 
			incart:'true'
		},
		{
			username:'name1', 
			rating:'3', 
			bookname:'Гарри Поттер', 
			incart:'false'
		  },
		  {
			username:'name1', 
			rating:'5', 
			bookname:'Держи Марку!', 
			incart:'false'
		  },
		  {
			username:'name1', 
			rating:'4', 
			bookname:'Винни Пух', 
			incart:'true'
		  },
		  {
			username:'name1', 
			rating:'4', 
			bookname:'Оно', 
			incart:'true'
		  },
		  {
			username:'name1', 
			rating:'3', 
			bookname:'Автостопом по галактике', 
			incart:'true'
		  },
		  {
			username:'name', 
			rating:'5', 
			bookname:'Шерлок Холмс', 
			incart:'false'
		  },
		  {
			username:'name2', 
			rating:'5', 
			bookname:'Автостопом по галактике', 
			incart:'true'
		  },
		  {
			username:'name3', 
			rating:'4', 
			bookname:'Шерлок Холмс', 
			incart:'false'
		  }
		];
		
async function run3() {
	  try {
        await mongoClient.connect();
        const db = mongoClient.db("mylibrary");
        const collection = db.collection("usersbooks");   
        const results = await collection.insertMany(usersbooks);
        console.log(results);
        console.log(usersbooks);
    }catch(err) {
        console.log(err);
    } finally {
       await mongoClient.close();
    }
}

run3().catch(console.error);