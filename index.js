import dbConnect from './database/Dbconnection';
import app from './routes/routes';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

dbConnect();

dotenv.config();
const __dirname = path.resolve();

const aPORT = process.env.PORT || 3001;

// Step 1:
app.use(express.static(path.resolve(__dirname, './client/nfterify/build')));
// Step 2:
app.get('*', function (request, response) {
  response.sendFile(
    path.resolve(__dirname, './client/nfterify/build', 'index.html')
  );
});

app.listen(aPORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${aPORT}`);
});
