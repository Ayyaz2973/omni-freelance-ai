const express = require('express');
const cors = require('cors');
const path = require('path');

const chatRoute = require('./routes/chat');
const proposalRoute = require('./routes/proposal');
const seoRoute = require('./routes/seo');
const codeRoute = require('./routes/code');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/chat', chatRoute);
app.use('/api/proposal', proposalRoute);
app.use('/api/seo', seoRoute);
app.use('/api/code', codeRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
