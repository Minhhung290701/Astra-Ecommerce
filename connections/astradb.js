const { createClient } = require("@astrajs/collections");

const getAstraClient = async  () => {
    // create an {astra_db} client
    const astraClient = await createClient({
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
    });
    const Collections = astraClient.namespace(process.env.ASTRA_DB_KEYSPACE)
    //console.log(await Collections.getCollections())
    //const Collection = Collections.collection(collection)
    return Collections
}

module.exports = {getAstraClient}


