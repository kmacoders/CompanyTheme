import Test from './test.vue';
import Products from './products.vue';

if (document.querySelector('.xo-list-products')) {
  const listProducts = new Vue({
    delimiters: ['${', '}'],
    el: '.xo-list-products',

    components: {
      Test,
      Products
    },

    data() {
      return {
        products: collectionProducts,
      }
    },

    created() {
      console.log(this.products);
    },
  
    filters: {
      moneyFormat(value, sign = 'VND') {
        if (!value) return 0;
        return `${sign} ${(value / 100).toFixed(2)} `;
      }
    },
  
    computed: {
      
    },
  
    methods: {
  
    }
  })
}