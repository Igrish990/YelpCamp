const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/YelpCamp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '67698198d3bd1ca6062ec2f5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.Odit perferendis numquam sapiente mollitia dolorem! Voluptatum, architecto ullam odio aliquid non nam adipisci aut ut earum delectus doloremque, sint culpa debitis.',
            price: price,
            images :[
                {
                    url: 'https://res.cloudinary.com/dthuurbnq/image/upload/v1735275797/YelpCamp/i7bdcpuipffa4q3clhru.jpg',
                    filename: 'YelpCamp/i7bdcpuipffa4q3clhru',
                  
                },
                {
                    url: 'https://res.cloudinary.com/dthuurbnq/image/upload/v1735275800/YelpCamp/cnkrsgdgst8h7uyhqnyi.jpg',
                    filename: 'YelpCamp/cnkrsgdgst8h7uyhqnyi',
                   
                }
            ]
        })
        await camp.save()

    }
}
seedDB().then(() => {
    mongoose.connection.close();
})