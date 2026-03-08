const axios = require('axios');
const mongoose = require('mongoose');

async function testApi() {
    try {
        console.log("Registering a test user...");
        const email = "test" + Date.now() + "@example.com";
        const regRes = await axios.post('http://localhost:5000/api/auth/register', {
            name: "Test User API",
            email: email,
            password: "password123",
            role: "patient"
        });

        const token = regRes.data.token;
        console.log("Got token:", token.substring(0, 10) + "...");

        console.log("Uploading record...");
        const hash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

        const uploadRes = await axios.post('http://localhost:5000/api/records/store-record', {
            hash,
            name: `Lab Report - 2023-11-11`,
            type: "Lab Report",
            date: "2023-11-11",
            doc: "Dr. API Test",
            size: "1.2 MB"
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Upload response:", uploadRes.data);
    } catch (err) {
        if (err.response) {
            console.error("API ERROR:", err.response.status, err.response.data);
        } else {
            console.error("ERROR:", err.message);
        }
    }
}

testApi();
