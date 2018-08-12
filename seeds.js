var mongoose = require("mongoose"),
    Runner = require("./models/runner");

var data = [
    {
        firstName: "Jacob",
        lastName: "Quigley",
        school: "Washington University in St. Louis",
        image: "http://vector.me/files/images/6/9/691000/winged_foot",
        pr800: "2:10",
        pr1600: "4:57",
        pr3200: "11:11",
        bio: `Echo park poutine farm-to-table XOXO locavore, vice portland actually. Meggings seitan dreamcatcher artisan cold-pressed kickstarter marfa live-edge. Hot chicken adaptogen +1 gluten-free sriracha plaid pitchfork taxidermy prism subway tile post-ironic hashtag poke keffiyeh. Tilde lyft food truck ramps tousled pabst coloring book fixie. Listicle knausgaard mustache, banjo salvia next level activated charcoal DIY venmo af disrupt twee austin hella meh. Offal shaman poke unicorn lyft readymade tattooed, forage iPhone lumbersexual four loko. Schlitz PBR&B chicharrones, cliche four loko selvage tattooed YOLO polaroid. Thundercats shaman tacos tattooed, tbh flannel kinfolk dreamcatcher. Coloring book pinterest 8-bit helvetica organic. Tumeric cornhole cronut, kickstarter salvia lomo williamsburg intelligentsia semiotics. Helvetica ugh umami portland, readymade polaroid affogato. Microdosing gochujang pug, green juice fixie pinterest blue bottle pok pok beard messenger bag slow-carb gentrify bitters. Gluten-free food truck vegan prism salvia fam. Pok pok austin umami butcher chia vexillologist messenger bag venmo sartorial pinterest`
    },
    {
        firstName: "Ricky",
        lastName: "Esparza",
        school: "Millikin University",
        image: "http://vector.me/files/images/6/9/691000/winged_foot",
        pr800: "2:09",
        pr1600: "4:40",
        pr3200: "10:11",
        bio: `Echo park poutine farm-to-table XOXO locavore, vice portland actually. Meggings seitan dreamcatcher artisan cold-pressed kickstarter marfa live-edge. Hot chicken adaptogen +1 gluten-free sriracha plaid pitchfork taxidermy prism subway tile post-ironic hashtag poke keffiyeh. Tilde lyft food truck ramps tousled pabst coloring book fixie. Listicle knausgaard mustache, banjo salvia next level activated charcoal DIY venmo af disrupt twee austin hella meh. Offal shaman poke unicorn lyft readymade tattooed, forage iPhone lumbersexual four loko. Schlitz PBR&B chicharrones, cliche four loko selvage tattooed YOLO polaroid. Thundercats shaman tacos tattooed, tbh flannel kinfolk dreamcatcher. Coloring book pinterest 8-bit helvetica organic. Tumeric cornhole cronut, kickstarter salvia lomo williamsburg intelligentsia semiotics. Helvetica ugh umami portland, readymade polaroid affogato. Microdosing gochujang pug, green juice fixie pinterest blue bottle pok pok beard messenger bag slow-carb gentrify bitters. Gluten-free food truck vegan prism salvia fam. Pok pok austin umami butcher chia vexillologist messenger bag venmo sartorial pinterest.`
    },
    {
        firstName: "Kellen",
        lastName: "Saindon",
        school: "Bishop McNamara Catholic High School",
        image: "http://vector.me/files/images/6/9/691000/winged_foot",
        pr800: "2:30",
        pr1600: "5:03",
        pr3200: "10:34",
        bio: `Echo park poutine farm-to-table XOXO locavore, vice portland actually. Meggings seitan dreamcatcher artisan cold-pressed kickstarter marfa live-edge. Hot chicken adaptogen +1 gluten-free sriracha plaid pitchfork taxidermy prism subway tile post-ironic hashtag poke keffiyeh. Tilde lyft food truck ramps tousled pabst coloring book fixie. Listicle knausgaard mustache, banjo salvia next level activated charcoal DIY venmo af disrupt twee austin hella meh. Offal shaman poke unicorn lyft readymade tattooed, forage iPhone lumbersexual four loko. Schlitz PBR&B chicharrones, cliche four loko selvage tattooed YOLO polaroid. Thundercats shaman tacos tattooed, tbh flannel kinfolk dreamcatcher. Coloring book pinterest 8-bit helvetica organic. Tumeric cornhole cronut, kickstarter salvia lomo williamsburg intelligentsia semiotics. Helvetica ugh umami portland, readymade polaroid affogato. Microdosing gochujang pug, green juice fixie pinterest blue bottle pok pok beard messenger bag slow-carb gentrify bitters. Gluten-free food truck vegan prism salvia fam. Pok pok austin umami butcher chia vexillologist messenger bag venmo sartorial pinterest.`
    }
];

function seedDB() {
    Runner.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            data.forEach(function(seed) {
                Runner.create(seed);
            });
        }
    });
}

module.exports = seedDB;
