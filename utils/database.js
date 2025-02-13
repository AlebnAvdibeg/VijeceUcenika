const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:DYQmQOTJ9sAfISBb@vijece.fndfs.mongodb.net/vijece?retryWrites=true&w=majority&appName=Vijece');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const fileSubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
});
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        default: ''
    },
    images: {
        type: Array,
        default: ['/images/test.jpg']
    },
    files: [fileSubSchema],
    date: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    }
}, { versionKey: false });
const news = mongoose.model('news', newsSchema);

module.exports = { connect, news, months: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'] };