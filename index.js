const express = require('express');
const acceptLanguageParser = require('accept-language-parser');
const path = require('path');

const app = express();
const port = 3000;

// Supported languages
const supportedLanguages = ['en', 'es'];

app.use((req, res, next) => {
  // Get the preferred language from the request headers
  const languages = acceptLanguageParser.parse(req.headers['accept-language']);
  const lang = languages.find(language => supportedLanguages.includes(language.code)) || { code: 'en' };
  req.language = lang.code;
  next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the home page based on the preferred language
app.get('/', (req, res) => {
  const language = req.language;
  if (language === 'es') {
    res.sendFile(path.join(__dirname, 'language', 'index_es.html'));
  } else {
    res.sendFile(path.join(__dirname, 'language', 'index_en.html'));
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});