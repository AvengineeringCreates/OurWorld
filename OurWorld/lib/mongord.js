const { MongoClient, ServerApiVersion } = require('mongodb');
const { dlUri, dbName, collectionName, testGuildId } = require('../config.json');

const Winchalk = require('./winchalk');

// ! Actual documentation will come eventually but I am just lazy.

class DiscordMongoClient extends MongoClient {
    ConnectToMongo(isPersistent) {
        Winchalk.connection(`Connecting to the Mongo database...`);
        return this.connect().then((result) => {
            Winchalk.connection(`Successfully connected to database.`);
            return this;
        }).catch((e) => {
            Winchalk.warn(`There was an error connecting to the Mongo database.`);
            console.error(e);
            if (isPersistent) {
                Winchalk.warn(`Attempting again to connect to the Mongo database...`);
                return this.ConnectToMongo();
            } else {
                Winchalk.warn(`Persistence for this connection was unspecified or set to false.`);
                return e;
            }
        });
    }
    //
    // Pings the database.
    // Adapted from a tutorial on the MongoDB website.
    //
    Ping() {
        return this.connect()
            .then(this.db("admin").command({ ping: 1 }))
            .then(Winchalk.connection(`Successfully pinged database.`))
            .catch((e) => {
                Winchalk.error(`Database ping did not reply.`);
                console.error(e);
            });
    }
    //
    // Creates a guild entry.
    // I stole part of this too from w3schools I think?
    // EDIT: ...Okay, "steal" is a strong word. We say "adapted" now.
    //
    InsertGuildEntry(guild) {
        let collection = this.db(dbName).collection(collectionName);
        let test = {
            gId: guild.id,
            guildName: guild.name,
            config: {}
        };
        return collection.insertOne(test).then(() => {
            Winchalk.info(`Inserted one document to DB ${dbName}, collection ${collectionName}.`);
        });
    }
    //
    // Reads a guild entry.
    //
    FetchGuildEntry(guildId) {
        let collection = this.db(dbName).collection(collectionName);
        return collection.findOne({ guildId: guildId });
    }
}

module.exports = new DiscordMongoClient(dlUri);