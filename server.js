require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
const moment = require("moment");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/paymentRouter"));

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

/* 
const a = async (start) => {
  const now = moment.utc(new Date())
  const today = moment.utc([now.year(),now.month(),now.date()])
  const ttl = 86400000 - (now.valueOf() - today.valueOf())

  const hours = 24 - start
  const minTimes = Math.round(hours/4)  //(24-hourStart)/24*6
  const maxTimes = Math.floor(hours/2)  //(24-hourStart)/24*12
  const times = Math.floor(Math.random()*(maxTimes-minTimes+1)+minTimes)

  const numSpace = Math.floor(hours*60/45)

  let spacesForRain = []

  while (spacesForRain.length < times) {
      const r = Math.floor(Math.random()*numSpace)
      if(spacesForRain.indexOf(r) === -1) spacesForRain.push(r)
  }
  spacesForRain = spacesForRain.sort(function(a, b){return a-b})

  
  await Promise.all(
      spacesForRain.map(async space => {
          const index = spacesForRain.indexOf(space)+1  
          const hStart = start + Math.floor((space*45+Math.floor(Math.random()*5))/60)
          const mStart = (space*45+Math.floor(Math.random()*5))%60
          const minute = Math.floor(Math.random()*15+15)

          const hEnd = start + Math.floor((space*45+Math.floor(Math.random()*5)+minute)/60)
          const mEnd = (space*45+Math.floor(Math.random()*5)+minute)%60
          let timeStart = moment.utc({year :now.year(), month :now.month(), day :now.date(), hour :hStart, minute :mStart})
          let timeEnd = moment.utc({year :now.year(), month :now.month(), day :now.date(), hour :hEnd, minute :mEnd})

          const timeRain = {
              timeStart: timeStart,
              timeEnd: timeEnd
          }

          console.log(timeRain)
      } ),
  )
}

a(0) */

/* const { Client } = require("cassandra-driver");
async function run() {
   const client = new Client({
      cloud: {
      secureConnectBundle: 'C:\secure-connect-ecommerce.zip',
      },
      credentials: {
      username: process.env.ASTRA_DB_CLIENT_ID,
      password: process.env.ASTRA_DB_CLIENT_SECRET,
      },
   });

   await client.connect();

   // Execute a query
    await client.execute("use httmdt");
    let b = await client.execute("select * from users");
    console.log(b.rows)
   await client.shutdown();
}

// Run the async function
run();  */

/* axios({
  method: 'get',
  
  headers: {'X-Cassandra-Token': `${ASTRA_DB_APPLICATION_TOKEN}`,"Content-Type": "application/json",}
})
  .then(function (response) {
     console.log(response)
  }); */

/* 
  const url = 'https://67d25abe-eccb-4da5-9225-4de34713ad0a-asia-south1.apps.astra.datastax.com/api/rest/v2/namespaces/httmdt/collections/user'


  const odd = 'afaa6a14-ece4-40c3-9a92-25ab088f89c9'
const ac = async ()=> {
  const response = await axios(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "x-cassandra-token": "AstraCS:zJmohdwpKlYbuidJPZLBIyqm:212c1feea2e7ee12307f8111af9d948f8534158f4d16b83e4687deab65971900"
    },
  })

  console.log(response.data.data[odd])
}

ac() */
/* 
const schema = {
  $id: "https://example.com/person.schema.json",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Person",
  type: "object",
  properties: {
    firstName: {
      type: "string",
      description: "The persons first name.",
    },
    lastName: {
      type: "string",
      description: "The persons last name.",
    },
    age: {
      description:
        "Age in years which must be equal to or greater than zero.",
      type: "integer",
      minimum: 0,
    },
  },
}; */

/* const b = async () => {
  let testSchemaCollection = null;
  const { getAstraClient } = require("./connections/astradb");
  const usersCollection = (await getAstraClient()).collection("users");
  console.log(await usersCollection.createSchema(schema));
  //const usersCollection = astraCollections.Collection;

  console.log(
    await usersCollection.update("afaa6a14-ece4-40c3-9a92-25ab088f89c9", {
      name: 'HaNoi',
      DiaChi: { Tinh: "a", Phuong: "b" },
    })
  );
 //console.log(await usersCollection.get({name:{$eq:'HaNoi'}}))
  //console.log(usersCollection)
};

b();
 */