////////////// Model /////////////////////////
// The model is the application's stored data
// allCats is an array holding all of app's cats
var allCats = [
  {
    name: 'Bruce',
    src: 'images/bruce.jpg',
    clickCount: 0,
    nicknames: ['B-Dawg', 'Big-B', 'Deuce-Bruce']
  },
  {
    name: 'Katniss',
    src: 'images/katniss.jpg',
    clickCount: 0,
    nicknames: ['Everdeen', 'Katnip', 'Mockingjay']
  },
  {
    name: 'Leonard',
    src: 'images/leonard.jpg',
    clickCount: 0,
    nicknames: ['Leo', 'Jack Scratch', 'Lord of the Trees']
  },
  {
    name: 'Paco',
    src: 'images/paco.jpg',
    clickCount: 0,
    nicknames: ['Frank', 'Chico', 'King of the Jungle']
  },
  {
    name: 'Whiskers',
    src: 'images/whiskers.jpg',
    clickCount: 0,
    nicknames: ['Curiosity', 'Sneak']
  }
];

// Cat constructor binds all of our cats to knockout observables
var Cat = function(data) {

  // 'self' keeps 'this' in scope for nested functions
  var self = this;

  // Bind all our views to ko.observables
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.src);
  this.nicknames = ko.observableArray(data.nicknames);

  // Set cat's title based on its clickCount
  this.catLevel = ko.computed(function() {
    var catLevel;
    var clickCount = self.clickCount();

    // Change catLevel based on clickCount
    if (clickCount < 10) {
      catLevel = "Kitten";
    } else if (clickCount >= 10 && clickCount < 20) {
      catLevel = "Housecat";
    } else if (clickCount >= 20 && clickCount < 30) {
      catLevel = "Mouser";
    } else if (clickCount >= 30 && clickCount < 40) {
      catLevel = "Margay";
    } else if (clickCount >= 40 && clickCount < 50) {
      catLevel = "Ocelot";
    } else if (clickCount >= 50 && clickCount < 60) {
      catLevel = "Bobcat";
    } else if (clickCount >= 60 && clickCount < 70) {
      catLevel = "Lynx";
    } else if (clickCount >= 70 && clickCount < 80) {
      catLevel = "Cougar";
    } else if (clickCount >= 80 && clickCount < 90) {
      catLevel = "Puma";
    } else if (clickCount >= 90 && clickCount < 100) {
      catLevel = "Panther";
    } else if (clickCount >= 100 && clickCount < 125) {
      catLevel = "Leopard";
    } else if (clickCount >= 125 && clickCount < 150) {
      catLevel = "Cheetah";
    } else if (clickCount >= 150 && clickCount < 200) {
      catLevel = "Leopard";
    } else if (clickCount >= 200 && clickCount < 300) {
      catLevel = "Lion";
    } else if (clickCount >= 300 && clickCount < 400) {
      catLevel = "Tiger";
    } else if (clickCount >= 500) {
      catLevel = "Sabretooth";
    }

    // Pass catLevel to ko.computed
    return catLevel;
  }, this);
};

///////////////// View Model (Octopus) //////////////////
// ViewModel acts as a bridge between the Model and the View
var ViewModel = function() {

  // 'self' keeps 'this' in scope for nested functions
  var self = this;

  // Set initial state when app loads
  this.init = function() {
    // Initialize catList as an observable Array
    self.catList = ko.observableArray([]);

    // Add all our cats to the catList observable array
    allCats.forEach(function(thisCat){
      self.catList.push(new Cat(thisCat));
    });
    // Initialize cat view on a random cat
    self.currentCat = ko.observable( self.catList()[self.getRandomCat(0, 4)] );
  };

  // Initialize cat-clicker on a random cat
  this.getRandomCat = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Set currentCat to the cat button that was clicked
  this.setCurrentCat = function(clickedCat) {
    self.currentCat(clickedCat);
  };

  // Increment clickCount when cat image is clicked
  this.incrementCounter = function() {
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    self.checkForMeow();
  };

  this.checkForMeow = function () {
    // Set variables to hold meow audio file and clickCount
    var meow = new Audio('sounds/meow.mp3'),
        clickCount = self.currentCat().clickCount();

    // Check if currentCat's clickCount equals enough clicks to level up
    if (clickCount === 10 || clickCount === 20 || clickCount === 30 ||  clickCount === 40 || clickCount === 50 || clickCount === 60 || clickCount === 70 || clickCount === 80 || clickCount === 90 || clickCount === 100 || clickCount === 125 || clickCount === 150 || clickCount === 200 || clickCount === 300 || clickCount === 400 || clickCount === 500) {
      // Play level up sound if cat has levelled up
      meow.play();
    }
  };

  // Call initializer for the cat-clicker app
  this.init();
};

// Initialize data-bindings
ko.applyBindings(ViewModel);
