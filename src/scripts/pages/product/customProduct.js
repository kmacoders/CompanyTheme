if ( document.querySelector('.product-custom')) {
  console.log('sfs')
  const productCustom = new Vue({
    delimiters: ['${', '}'],
    el: '.product-custom',
    data() {
      return {
        dataJson: null,
      }
    },
    created() {
      console.log(productHandle);
      
      this.getDataJson();
      console.log(this.dataJson);
      console.log('asfsf')
    },
    methods: {
      async getDataJson() {
        const jsonData = await axios.get(`/products/${productHandle}.js`);
        this.dataJson = jsonData.data;
      }
    }
  })
}

console.log('safsf')