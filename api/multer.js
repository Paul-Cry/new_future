const multer  = require('multer');
const path = require('path');



// Настройка хранилища для загруженных файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Указываем папку, куда будут сохраняться файлы
      cb(null, 'img/')
    },
    filename: function (req, file, cb) {
      // Генерируем уникальное имя файла
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Получаем расширение файла
    const fileExtension = path.extname(file.originalname);
    // Проверяем, что тип файла - png или jpg
    if (fileExtension !== '.png' && fileExtension !== '.jpg') {
      cb(new Error('Только файлы типа png и jpg разрешены'), null);
    } else {
      // Присваиваем файлу уникальное имя с расширением
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  }
})
  
// Создаем объект multer
const upload = multer({ storage: storage })

module.exports = {
    upload
}




