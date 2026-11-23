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
   { headers: { 'User-Agent': 'CST336-HW4 (student project)' } });  //wikipedia needs identifiaction and reason or it might block the request
  let data = await response.json();
  res.render(languageName, { languageInfo, data });
});

//routes to the compare view
app.get('/compare', (req, res) => {
   let languages = pldb.slice(0, 5);  //pulls first five languages which are the ones I choose for the project
   res.render('compare', { languages });
});

//routes to timeline view
app.get('/timeline', (req, res) => {
   let languages = pldb.slice(0, 5).sort((a, b) => a.appeared - b.appeared); //pulls and sorts those 5 languages by year they appeared
   res.render('timeline', { languages });
});

// routes to the about page
app.get('/about', (req, res) => {
  res.render('about'); 
});

//routes to the index view
app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
