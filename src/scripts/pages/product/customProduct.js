import Test from './test.vue';

Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">{{ count }}</button>'
})

if (document.querySelector('.product-custom')) {
  console.log('sfs')
  const productCustom = new Vue({
    delimiters: ['${', '}'],
    el: '.product-custom',
    components: {
      Test
    },
    data() {
      return {
        dataJson: undefined,
        variantSelected: '',
        formData: {
          id: 0,
          quantity: 1
        }
      }
    },

    async created() {
      await this.getDataJson();

      this.variantSelected = this.dataJson.variants[0].title;
      this.formData = {
        id: this.dataJson.variants[0].id,
        quantity: 1,
      }
      console.log(this.formData)
    },

    filters: {
      moneyFormat(value, sign = 'VND') {
        if (!value) return 0;
        return `${sign} ${(value / 100).toFixed(2)} `;
      }
    },

    computed: {
      featureImage() {
        if (this.dataJson) {
          return this.dataJson.featured_image;
        }
      },

      productTitle() {
        if (this.dataJson) {
          return this.dataJson.title;
        }
      },

      productPrice() {
        if (this.dataJson) {
          return this.dataJson.price;
        }
      },

      productDescription() {
        if (this.dataJson) {
          return this.dataJson.description;
        }
      },

      productVariants() {
        if (this.dataJson) {
          return this.dataJson.variants;
        }
      }
    },

    methods: {
      async getDataJson() {
        const jsonData = await fetch(`/products/${productHandle}.js`);
        if (!jsonData.ok) throw new Error(`Bad response from server /products/${productHandle}.js`);

        this.dataJson = await jsonData.json();
      },

      addToCart() {
        console.log(this.formData)
        fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              'items': [this.formData]
            }
          )
        })
          .then(response => {
            location.reload();
            return response.json();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }
  })
}
