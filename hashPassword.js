const bcrypt = require("bcryptjs");

//before adding a user to the database (in the mongodb atlas site), hash the plain password and put the encrypted password instead
const plainPassword = "test123";
bcrypt.hash(plainPassword, 10).then(console.log);


// example: 

//  {
//      "_id": { "$oid": "684b3345324b5b58242fdf02" },
//      "name": "test",
//      "email": "test@convergeinnov.com",
//      "password": "$2b$10$373nH2yuaEm8K8NbBoIoeuOD3EnnawO0AnbD2TK2PH.tEXDCRXQ/f",
//      "createdAt": { "$date": "2025-06-22T14:30:00Z" }
//  }


// command:
// node hashPassword.js