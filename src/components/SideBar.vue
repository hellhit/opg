<template>
  <aside class="cart-container">
    <br/>
    <br/>
    <br/>
    
    <div class="cart">
      <h1 class="cart-title spread">
        <span>
          Moja rezervacija
          <i class="icofont-hour-alt icofont-1x"></i>
        </span>
        <button @click="toggle" class="cart-close">&times;</button>
      </h1>

      <div class="cart-body">
        <table class="cart-table">
          <thead>
            <tr>
              <th><span class="sr-only">Slika</span></th>
              <th>Usluga</th>
              <th>Vrijeme</th>
              <th>Količina</th>
              <th>Ukupno</th>
              <th><span class="sr-only">Akcije</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(quantity, key, i) in cart" :key="i">
              <!--fa free icon clock-->
              <td><i class="fa-solid fa-user-clock"></i></td>
              <td>{{ key }}</td>
              <td>{{ getTime(key) }} min</td>
              <td class="center">{{ quantity }}</td>
              <td>{{ quantity * getTime(key) }} min</td>
              <td class="center">
                <button @click="remove(key)" class="btn btn-light cart-remove">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center" style="padding-top: 20px;" v-if="!Object.keys(cart).length"><em>Nemate niti jednu uslugu</em></p>
        <div class="spread" style="padding-top: 20px;">
          <span><strong>Rezervacija:</strong> {{ calculateTotal() }} minuta</span>
          <button @click="goToOrderView" class="btn btn-light" >Naručite se</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: ['toggle', 'cart', 'inventory', 'remove'],
  methods: {
    getTime (name) {
      const product = this.inventory.find((p) => {
        return p.name === name
      })
      return product.time.min
    },
    calculateTotal () {
      const total = Object.entries(this.cart).reduce((acc, curr) => {
        return acc + (curr[1] * this.getTime(curr[0]))
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
