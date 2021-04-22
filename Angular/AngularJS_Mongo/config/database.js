const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbtest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('Db is connected'))
.catch(e => console.error(e));
