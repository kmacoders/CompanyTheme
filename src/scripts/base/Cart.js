class Cart {
  constructor() {
    this.cart = window.globalObj;
  }

  /**
   * Get current state of cart object
   * 
   * @returns {Promise}
   * 
   * @example  
   *  const cartState = await Cart.cartState
   */
  async cartState() {
    const res = await fetch(`/cart.js`);
    if (!res.ok) throw new Error(`Bad response from server`);
    this.cart = await res.json();

    return this.cart;
  }

  /**
   * Callback after add item to Cart success
   *
   * @callback onSuccess
   * @param {object} cart - Cart state after update
   * @param {object} res - Json for item 
   */

  /**
   * Callback after errs when add to cart
   *
   * @callback onError
   * @param {object} error - Error
   */

  /**
   * Add item to cart
   * @param {string|number} id - Variant ID
   * @param {number} quantity - Quantity to add
   * @param {object} lineItem - Line Item property
   * @param {onSuccess} onSuccess - Callback on success
   * @param {onError} onError - Callback on fail
   */
  addItem(id, quantity, lineItem, onSuccess, onError) {
    const quantityProduct = quantity ||1;

    const formData = {
      'items': [{
        'id': id,
        'quantity': quantityProduct,
        'properties': lineItem
      }]
    };

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(async (response) => {
        this.cart = await this.cartState();
        const res = await response.json();
        if (onSuccess instanceof Function) {
          onSuccess(this.cart, res);
        }
      })
      .catch((error) => {
        if (onError instanceof Function) {
          onError(error);
        }
      });
  }

  /**
   * 
   * @param {string|number} id  - Variant ID or Line item's key
   * @param {number} quantity - Quantity update
   * @param {onSuccess} onSuccess - Callback on success
   * @param {onError} onError - Callback on fail
   */
  updateQuantityItemById(id, quantity, onSuccess, onError) {
    const quantityProduct = quantity || 1;
    const formData = {
      'id': id,
      'quantity': quantityProduct
    };

    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(async (response) => {
        this.cart = await this.cartState();
        const res = await response.json();
        if (onSuccess instanceof Function) {
          onSuccess(this.cart, res);
        }
      })
      .catch((error) => {
        if (onError instanceof Function) {
          onError(error);
        }
      });
  }

  /**
   * Update quantity item in cart by line item
   * @param {number} line - Line item in the cart
   * @param {number} quantity - Quantity update
   * @param {onSuccess} onSuccess - Callback on success
   * @param {onError} onError - Callback on fail
   */
  updateQuantityItemByLine(line, quantity, onSuccess, onError) {
    const lineItem = line || 1;
    const quantityProduct = quantity || 1;
    console.log({lineItem, quantityProduct});
    const formData = {
      'line': lineItem,
      'quantity': quantityProduct
    };

    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(async (response) => {
        this.cart = await this.cartState();
        const res = await response.json();
        if (onSuccess instanceof Function) {
          onSuccess(this.cart, res);
        }
      })
      .catch((error) => {
        if (onError instanceof Function) {
          onError(error);
        }
      });
  }

  clearCart() {
    fetch('/cart/clear.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async (response) => {
        this.cart = await this.cartState();
        const res = await response.json();
        if (onSuccess instanceof Function) {
          onSuccess(this.cart, res);
        }
      })
      .catch((error) => {
        if (onError instanceof Function) {
          onError(error);
        }
      });
  }
}

export default Cart;