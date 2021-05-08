const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basicUsers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('Db is connected'))
.catch(e => console.error(e));
