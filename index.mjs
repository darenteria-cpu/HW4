import express from 'express';
import pldb from 'pldb' with { type: 'json' };
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
   res.send('Hello Express app!')
});

app.listen(3000, () => {
   console.log('server started');
});

console.log(pldb.go.appeared);
console.log(Object.keys(pldb.go));