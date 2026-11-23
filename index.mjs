import express from 'express';
import pldb from 'pldb' with { type: 'json' };

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
   res.render('index')
});

app.listen(3000, () => {
   console.log('server started');
});

const topLanguages = pldb
  .filter(l => l.primaryTag === 'pl' && l.rank)
  .sort((a, b) => a.rank - b.rank)
  .slice(0, 5);

console.table(topLanguages.map(l => ({
  rank: l.rank,
  name: l.name,
  id: l.id,
  appeared: l.appeared
})));