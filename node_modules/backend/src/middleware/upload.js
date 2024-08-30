const multer = require('multer');

// Använd minneslagring istället för diskStorage
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
