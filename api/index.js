const app = require('express')();
const { v4 } = require('uuid');
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

var admin = require("firebase-admin")
var serviceAccount = {
    "type": "service_account",
    "project_id": "shiftmate-5268c",
    "private_key_id": process.env.private_key_id,
    "private_key": private_key,
    "client_email": "firebase-adminsdk-p4sok@shiftmate-5268c.iam.gserviceaccount.com",
    "client_id": "113036844915442980701",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p4sok%40shiftmate-5268c.iam.gserviceaccount.com"
  };

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/firebase', (req, res) => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://project-id.firebaseio.com",
        authDomain: "project-id.firebaseapp.com",
        });
    
    var db=admin.database();
    var userRef=db.ref("Shifts");

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
  });

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;