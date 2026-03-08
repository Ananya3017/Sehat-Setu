const axios = require('axios');
const FormData = require('form-data');

const pinFileToIPFS = async (fileBuffer, fileName, fileType) => {
    try {
        const formData = new FormData();
        formData.append('file', fileBuffer, {
            filename: fileName,
            contentType: fileType,
        });

        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${process.env.PINATA_JWT}`
            }
        });
        return res.data.IpfsHash; // The immutable IPFS CID
    } catch (error) {
        console.error("Pinata error data:", error.response?.data);
        throw new Error("Pinata upload failed: " + (error.response?.data?.error?.details || error.message));
    }
};

module.exports = { pinFileToIPFS };
