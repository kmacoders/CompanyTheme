/**
 * Import sections bên dưới
 */
//Components

// Sections
import './sections/sliders/sliders-01';
import './pages/product/customProduct';
import './pages/product/listProducts';
import './sections/listProductSection';
import Cart from '../scripts/base/Cart'
console.log('kmacoders developing...');

const cart = new Cart();

document.getElementById('test').addEventListener('click', () => {
  console.log('click');
  // cart.addItem(37851237351576, 1, {
  // 'Note': 'sdf'
  // },
  //   (res, cart) => {
  //     console.log(res);
  //     console.log('-------------')
  //     console.log(cart);
  //   },
  //   (err) => {
  //     console.log(err);
  //   })
  //Somethign...

  const currentQuantity = 5;
  cart.updateQuantityItemByLine(2, currentQuantity + 1);
  cart.increaseAnItem(2);
})

