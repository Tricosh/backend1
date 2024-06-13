const {MongoClient} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

const users = [
		{
			name:'name1', 
			password:'234', 
			role:'reader' 
		},
		{
			name:'name2', 
			password:'456', 
			role:'reader' 
		  },
		  {
			name:'name3', 
			password:'678', 
			role:'reader' 
		  }
		];

async function run2() {
	  try {
        await mongoClient.connect();
        const db = mongoClient.db("mylibrary");
        const collection = db.collection("users");   
        const results = await collection.insertMany(users);
        console.log(results);
        console.log(users);
    }catch(err) {
        console.log(err);
    } finally {
       await mongoClient.close();
    }
}

run2().catch(console.error);