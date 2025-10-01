#!/bin/bash

npm install express sequelize sqlite3 cors dotenv bcrypt multer csv-parse
npm install --save-dev nodemon

cd frontend

npm install react react-dom react-router-dom@6 quill react-barcode
npm install --save-dev parcel

cd ..

npm start