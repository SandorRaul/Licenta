const express = require('express');
const request = require('supertest');
const USER = require('../models/userSchema'); 
const router = require('../routes/router'); 
const app = express();
app.use(express.json());
app.use(router);


// Crearea stub-ului pentru USER.findOne
USER.findOne = (query) => {
    if (query.email === "b@gmail.com") {
        // Presupunem că 'hashedpassword' este parola '123456' criptată în prealabil
        const hashedpassword = "$2a$12$u3O9uFbcWDa72H/TeQLtf.o/zffXta1NLikJHkDHWoerxxc3yAiB."; // înlocuiește cu o parolă reală criptată pentru '123456'
        return Promise.resolve({
            _id: "ObjectId('658adb23a14c05c6555f0fde')",
            fname: "aad",
            email: "b@gmail.com",
            password:hashedpassword,
            userType: "user",
            tokens: [],
            carts: [],  
            
        });
    } else {
        return Promise.resolve(null);
    }
};

USER.prototype.generateAuthtokenn = async function () {
    // Returnează un token fix sau o valoare specifică pentru testare
    return 'fake-token-for-testing';
};

USER.prototype.save = jest.fn();


describe('Testarea rutei /login', () => {
    it('should return user details for existing user', async () => {
        // dresele de email și parolele corespund 
        const res = await request(app)
            .post('/login')
            .send({
                email: 'b@gmail.com', // aceeași adresă ca în stub
                password: '123456',  
                userType: 'user',   
                key: ''            
            });

        expect(res.statusCode).toEqual(201); 
        
    });

    it('should fail for wrong password', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'b@gmail.com',
                password: 'wrong-password',
                userType: 'user',    
                key: ''              
            });

        expect(res.statusCode).toEqual(400); 
        expect(res.body.error).toBeDefined();
    });

    it('should fail for wrong password', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'b@gmail.com',
                password: 'wrong-password',
                userType: 'user',    
                key: ''              
            });

        expect(res.statusCode).toEqual(201); 
        expect(res.body.error).toBeDefined();
    });
});


describe('Testarea rutei /register', () => {
    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                fname: 'Test',
                email: 'raul.sandor@student.upt.ro',
                mobile: '1234567890',
                password: '123456',
                cpassword: '123456'
            });

        expect(res.statusCode).toEqual(201); // Verificăm dacă codul de stare este 201 pentru succes
    });

    it('should fail to register a user due to existing email', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                fname: 'Test',
                email: 'raul.sandor@student.upt.ro',
                mobile: '1234567890',
                password: '123456',
                cpassword: '123456'
            });

        expect(res.statusCode).toEqual(422); // Verificăm dacă codul de stare este 422 pentru email existent
        expect(res.body.error).toBeDefined(); // Verificăm dacă există un mesaj de eroare
    });

});

describe('Testarea rutei /login cu mock-uri', () => {
    beforeEach(() => {
        // Resetarea mock-urilor înainte de fiecare test
        USER.findOne.mockClear();
        sendEmail.mockClear();
    });

    it('should check that sendEmail is called when a user registers', async () => {
        // Setează comportamentul dorit pentru mock-uri
        USER.findOne.mockResolvedValue(null); // Simulează că utilizatorul nu există în baza de date
        sendEmail.mockResolvedValue('Email trimis'); // Simulează că emailul a fost trimis

        const res = await request(app)
            .post('/register')
            .send({
                fname: 'Test',
                email: 'test@example.com',
                mobile: '1234567890',
                password: '123456',
                cpassword: '123456'
            });

        expect(res.statusCode).toEqual(201); // Verificăm dacă codul de stare este 201 pentru succes
        expect(sendEmail).toHaveBeenCalled(); // Verificăm dacă sendEmail a fost apelat
        // Adaugă alte verificări în funcție de logica aplicației tale
    });

    it('should generate a token for successful login', async () => {
        // Setează comportamentul dorit pentru mock-uri
        USER.findOne.mockResolvedValue({
            _id: "ObjectId('658adb23a14c05c6555f0fde')",
            email: "b@gmail.com",
            password: "$2a$12$u3O9uFbcWDa72H/TeQLtf.o/zffXta1NLikJHkDHWoerxxc3yAiB.",
            userType: "user",
            generateAuthtokenn: jest.fn().mockResolvedValue('fake-token-for-testing')
        });

        const res = await request(app)
            .post('/login')
            .send({
                email: 'b@gmail.com',
                password: '123456', // Presupunem că aceasta corespunde cu parola criptată
                userType: 'user',
                key: '' // Ajustează în funcție de logica rutei
            });

        expect(res.statusCode).toEqual(201); // Verificăm dacă codul de stare este 201 pentru succes
        expect(USER.findOne).toHaveBeenCalled(); // Verificăm dacă USER.findOne a fost apelat
        expect(res.body).toHaveProperty('token'); // Verificăm dacă răspunsul include un token
    });

    // Adaugă aici alte teste mock pentru /login sau /register dacă este necesar
});