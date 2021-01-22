<template>
  <ul class="huwng xo-products-container container grid grid-cols-2 xl:grid-cols-4">
    <li v-for="product in products" :key="product.id" class="m-3">
      <a v-bind:href="'/products/' + product.handle" class="xo-product no-underline">
        <div class="xo-product__img">
          <img v-bind:src="product.images[0]">
        </div>
        <div class="xo-product__description flex flex-column justify-center items-center">
          <div class="xo-product__title text-2xl text-center font-normal mt-4">
            {{product.title}}
          </div>
          <div class="xo-product__price">
            {{product.price | moneyFormat}}
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['products'],
  filters: {
    moneyFormat(value, sign = 'VND') {
      if (!value) return 0;
      return `${sign} ${(value / 100).toFixed(2)} `;
    }
  },
}
</script>
