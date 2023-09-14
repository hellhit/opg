<template>
  <div class="home">
    <div class="splash-container">
      <div class="splash">
        <h1>OPG FARMA</h1>
      </div>
    </div>

    <main class="wrapper">

      <h2>Najprodavanije</h2>

      <div class="recommended">

        <ProductCard
          v-for="(product, index) in inventory.slice(0,3)"
          :key="product.id"
          class="card"
          :index="index"
          :product="product"
          :addToCart="addToCart"
        />

      </div>

    </main>

  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'

export default {
  props: ['inventory', 'addToCart'],
  components: {
    ProductCard
  }
}
</script>
