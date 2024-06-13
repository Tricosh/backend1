async function dbGetCollection(collection){
    const client = new MongoClient('mongodb://127.0.0.1')
    await client.connect()
    const db = client.db("mylibrary")
    return db.collection(collection)
}

async function dbClearBase(){
    const collectionBooks = await dbGetCollection("books")
    const collectionUsers = await dbGetCollection("users")
    const collectionUsersBooks = await dbGetCollection("usersbooks")
    collectionUsers.deleteMany({})
    collectionBooks.deleteMany({})
    collectionUsersBooks.deleteMany({})
}

dbClearBase().catch(console.error);