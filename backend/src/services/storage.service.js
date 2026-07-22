const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer, fileName) {
    return client.files.upload({
        file: await toFile(buffer, fileName),
        fileName,
    });
}

module.exports = {
    uploadFile,
};