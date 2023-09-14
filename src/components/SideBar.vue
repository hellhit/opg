<template>
  <aside class="cart-container">
    <div class="cart">
      <h1 class="cart-title spread">
        <span>
          Košarica
          <i class="icofont-cart-alt icofont-1x"></i>
        </span>
        <button @click="toggle" class="cart-close">&times;</button>
      </h1>

      <div class="cart-body">
        <table class="cart-table">
          <thead>
            <tr>
              <th><span class="sr-only">Slika</span></th>
              <th>Proizvod</th>
              <th>Cijena</th>
              <th>Količina</th>
              <th>Ukupno</th>
              <th><span class="sr-only">Akcije</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(quantity, key, i) in cart" :key="i">
              <td><i class="icofont-carrot icofont-3x"></i></td>
              <td>{{ key }}</td>
              <td>{{ getPrice(key) }} Eur</td>
              <td class="center">{{ quantity }}</td>
              <td>{{ quantity * getPrice(key) }} Eur</td>
              <td class="center">
                <button @click="remove(key)" class="btn btn-light cart-remove">
                  &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center" v-if="!Object.keys(cart).length"><em>No items in cart</em></p>
        <div class="spread">
          <span><strong>Total:</strong> {{ calculateTotal() }} Eur</span>
          <button @click="goToOrderView" class="btn btn-light" >Naruči</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: ['toggle', 'cart', 'inventory', 'remove'],
  methods: {
    getPrice (name) {
      const product = this.inventory.find((p) => {
        return p.name === name
      })
      return product.price.EUR
    },
    calculateTotal () {
      const total = Object.entries(this.cart).reduce((acc, curr) => {
        return acc + (curr[1] * this.getPrice(curr[0]))
      }, 0)
      return total.toFixed(2)
    },
    goToOrderView() {
      sessionStorage.setItem('cart', JSON.stringify(this.cart));
      this.$router.push({ name: 'OrdersView' });
      this.toggle();
    }
  }
}
</script>
