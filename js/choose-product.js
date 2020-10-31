/* Get the product data from the server, then preload the product images
 * and apply the Knockout bindings */

function getProducts() {
  var images = new Array();

  var ajaxData = {
    products: [
      {
        id: 1,
        variant_id: 33453147077,
        name: 'SuperWidget',
        price: 19.99,
        description:
          'The SuperWidget is a great all-rounder. Simple, fast, and it gets the job done.',
        thumbImage: 'SuperWidget-small.jpg',
        mainImage: 'SuperWidget.jpg',
        options: [
          { optionId: 1, name: 'Large Screen', price: 7 },
          { optionId: 2, name: '64GB Memory', price: 9 },
          { optionId: 3, name: 'Fast Charger', price: 3 },
        ],
      },

      {
        id: 2,
        variant_id: 33448805125,
        name: 'WonderWidget',
        price: 24.99,
        description:
          "If you want a string of admirers following you around, go for the WonderWidget. Its eye-catching bright orange colour and striking lines will catch anybody's attention!",
        thumbImage: 'WonderWidget-small.jpg',
        mainImage: 'WonderWidget.jpg',
        options: [
          { optionId: 4, name: 'Day-Glow Paintwork', price: 3 },
          { optionId: 5, name: 'Turbo Booster', price: 11 },
          { optionId: 6, name: 'WonderWidget Baseball Cap', price: 2 },
        ],
      },

      {
        id: 3,
        variant_id: 33448776197,
        name: 'MegaWidget',
        price: 29.99,
        description:
          'The maximum bang for your buck. The MegaWidget comes with 128GB memory as standard, and enough power to scare a yak 18 miles away.',
        thumbImage: 'MegaWidget-small.jpg',
        mainImage: 'MegaWidget.jpg',
        options: [
          { optionId: 7, name: 'Sonic Enhancer', price: 18 },
          { optionId: 8, name: 'Heavy-Duty Battery Pack', price: 13 },
          { optionId: 9, name: 'MegaWidget Bumper Sticker', price: 1 },
        ],
      },
    ],
  };

  for (var i in ajaxData.products) {
    images[i] = new Image();
    images[i].src = 'images/' + ajaxData.products[i].mainImage;
  }

  ko.applyBindings(new ChooseProductViewModel(ajaxData.products));
}

/* The Knockout View Model object */

function ChooseProductViewModel(productData) {
  /* Store 'this' in 'self' so we can use it throughout the object */
  var self = this;

  /* Store the retrieved list of product objects in the view model
   * so that our view can access it
   */
  self.products = productData;

  /* Create Knockout observables for various parts of our view */
  self.chosenProduct = ko.observable(
    false
  ); /* The currently-chosen product object */
  self.chosenOptions = ko.observableArray(); /* The currently-chosen options array */
  self.qty = ko.observable(1); /* The currently-entered quantity value */

  /* Compute the total order price */

  self.totalPrice = ko.computed(function () {
    /* Grab the currently-chosen product object */
    var product = self.chosenProduct();

    /* If no product has been chosen yet, do nothing */
    if (!product) return false;

    /* Store the base product price */
    var price = product.price;

    /* Add the price of each chosen option to the overall price */

    var chosenOptions = self.chosenOptions();

    for (i = 0; i < product.options.length; i++) {
      for (j = 0; j < chosenOptions.length; j++) {
        if (product.options[i].optionId == chosenOptions[j]) {
          price += product.options[i].price;
          break;
        }
      }
    }

    /* Return the total price multiplied by the chosen quantity */
    return (price * self.qty()).toFixed(2);
  });

  /* Change the chosen product and scroll down to the "chosen product" box */

  self.chooseProduct = function (product) {
    self.chosenProduct(product);
    $('html,body').animate(
      { scrollTop: $('#chosenProduct').offset().top },
      'slow'
    );
  };

  /* Determine if the supplied option has been selected by the user */

  self.optionSelected = function (optionId) {
    var chosenOptions = self.chosenOptions();
    selected = false;

    for (j = 0; j < chosenOptions.length; j++) {
      if (optionId == chosenOptions[j]) {
        selected = true;
        break;
      }
    }

    return selected;
  };

  /* Determine if the supplied product has been selected by the user */

  self.productSelected = function (productId) {
    return productId == self.chosenProduct().id;
  };

  /* Send the product data to the server */

  self.buyProduct = function () {
    /* Extract just the selected options for the chosen product */
    var product = self.chosenProduct();
    var chosenOptions = self.chosenOptions();
    var chosenOptionsForProduct = [];

    for (i = 0; i < product.options.length; i++) {
      for (j = 0; j < chosenOptions.length; j++) {
        if (product.options[i].optionId == chosenOptions[j]) {
          chosenOptionsForProduct.push(product.options[i].optionId);
          break;
        }
      }
    }

    /* Compose the data object */
    var data = {
      variantID: self.chosenProduct().variant_id,
      qty: self.qty(),
    };
    var TagFromSession = sessionStorage.getItem('CurrentUserTag');
    CreateOrder(TagFromSession, data.variantID, data.qty);
    /* Send the data to the server */
  };

  function CreateOrder(tag, variantID, QTY) {
    var JSONbody = {
      order: {
        line_items: [
          {
            variant_id: variantID,
            quantity: QTY,
          },
        ],
        tags: tag,
      },
    };
    alert(
      'Please note that the data has been submitted to the API  (submitted data:):\n\n' +
        JSON.stringify(JSONbody)
    );
    const requestOptions = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(JSONbody),
    };
    fetch(
      'https://5508b86bac3a0a741a216ea7b9711895:c9643de4510f517efd6d240e08193574@loqtaps-dev.myshopify.com/admin/api/2020-10/orders.json',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) =>
        alert(
          'Please note that the data has been submitted to the API and the (and the order details :):\n\n' +
            JSON.stringify(data)
        )
      );
  }
}
