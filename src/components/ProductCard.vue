<template>
  <div class="card">
    <div class="card-title">
      {{ product.name }}
    </div>
    <div class="card-body">
      <i class="icofont-10x icofont-{{ product.icon }}"></i>
      <form>
        <div class="row">
          <div class="cell">
            <label>Tip proizvoda:</label>
          </div>
          <div class="cell">
            <em>{{ product.type }}</em>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Cijena:</label>
          </div>
          <div class="cell">
            {{ product.price.EUR }} Eur
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Količina:</label>
          </div>
          <div class="cell">
            <input type="number" v-model.number="quantity">
          </div>
        </div>
      </form>
    </div>
    <div class="card-footer">
      <button @click="addToCart(product.name, quantity)" class="btn btn-light">
        Dodaj u košaricu
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'index', 'addToCart'],
  data () {
    return {
      quantity: 1
    }
  }
}
</script>
