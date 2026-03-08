const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

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

        // Create a dummy file
        const filePath = path.join(__dirname, 'dummy.txt');
        fs.writeFileSync(filePath, "Hello, this is a test medical record.");

        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));
        formData.append("name", `Lab Report - 2023-11-11`);
        formData.append("type", "Lab Report");
        formData.append("date", "2023-11-11");
        formData.append("doc", "Dr. API Test");
        formData.append("size", "1.2 MB");

        const uploadRes = await axios.post('http://localhost:5000/api/records/store-record', formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Upload response:", uploadRes.data);
        fs.unlinkSync(filePath);
    } catch (err) {
        if (err.response) {
            console.error("API ERROR:", err.response.status, err.response.data);
        } else {
            console.error("ERROR:", err.message);
        }
    }
}

testApi();
