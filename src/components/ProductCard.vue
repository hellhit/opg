<template>
  <div class="card">
    <div class="card-title" style="padding-left: 10px;">
      {{ product.name }}
    </div>
    <div class="card-body">
      <i v-bind:class="['fa-solid', product.icon, 'fa-3x']"></i>
      <form>
        <div class="row">
          <div class="cell">
            <label>Tip usluge:</label>
          </div>
          <div class="cell">
            <em>{{ product.type }}</em>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Vrijeme:</label>
          </div>
          <div class="cell">
            {{ product.time.min }} min
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
        Dodaj u rezervaciju
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
