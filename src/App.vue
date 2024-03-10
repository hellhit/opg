<template>
  <div>
    <header class="top-bar spread">
      <nav class="top-bar-nav">
        <router-link to="/" class="top-bar-link">
          <i class="fa-solid fa-hand-holding-droplet"></i>
          <span>Naslovnica</span>
        </router-link>
        <router-link to="/ProductsView" class="top-bar-link">
          <span>Usluge</span>
        </router-link>
        <!-- pošto se Rezervacija šalje mailom, ne treba nam autentikacija -->
        <!-- <router-link to="/OrdersView" class="top-bar-link">
          <span>Login</span>
        </router-link> -->
      </nav>
      <div @click="toggleSideBar" class="top-bar-cart-link">
        <i class="icofont-cart-alt icofont-1x"></i>
        <span>Moja rezervacija ({{ totalQuantity }} usluga)</span>
      </div>
    </header>
    <router-view :inventory="inventory" :addToCart="addToCart" />

    <SideBar
      v-if="showSideBar"
      :toggle="toggleSideBar"
      :cart="cart"
      :inventory="inventory"
      :remove="removeItem"
    />
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
// import firebase from "@/firebase";
import usluge from "./usluge.json";
// import store from "@/store";
// import router from "@/router/";

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      showSideBar: false,
      inventory: usluge,
      cart: {},
    };
  },
  computed: {
    totalQuantity() {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    },
  },
  methods: {
    addToCart(name, quantity) {
      if (!this.cart[name]) this.cart[name] = 0;
      
      var newQuantity = this.cart[name] + quantity;

      if (newQuantity <= 3) {
        this.cart[name] = newQuantity;
      } else {
        alert("Najviše tri iste usluge se mogu rezervirati odjednom");
      }

    },
    toggleSideBar() {
      this.showSideBar = !this.showSideBar;
    },
    removeItem(name) {
      delete this.cart[name];
    },
  },
  //Pošto se Rezervacija šalje mailom, ne treba nam autentikacija

  // created() {
  //   firebase.auth().onAuthStateChanged((user) => {
  // if (user) {
  //   // User is signed in.
  //   console.log("*** User", user.email);
  //   store.currentUser = user.email;
  // } else {
  //   // User is not signed in.
  //   console.log("*** No user");
  //   store.currentUser = null;
  //   if (router.name !== "login") {
  //     router.push({ name: "login" });
  //   }
  // }
  // });
  // }
}
</script>

<style>
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;
  z-index: 999;
}
</style>
