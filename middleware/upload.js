const multer = require('multer');
const path = require('path');

// config du stockage
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// config de l'upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 //limite de 2MB
    }
});

module.exports = upload; 