import express from 'express';
import pldb from 'pldb' with { type: 'json' };

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/language', async (req, res) => {
  let languageName = req.query.languageName;
  let languageInfo = pldb.find(l => l.id === languageName);

  //web api
  let pageName = languageInfo.wikipedia.split('/wiki/')[1];
  let response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${pageName}`,
   { headers: { 'User-Agent': 'CST336-HW4 (student project)' } });
  let data = await response.json();
  res.render(languageName, { languageInfo, data });
});

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
