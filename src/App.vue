<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Naslovnica</span>
      </router-link>
      <router-link to="/ProductsView" class="top-bar-link">
        <span>Proizvodi</span>
      </router-link>
      <!-- <router-link to="/OrdersView" class="top-bar-link">
        <span>Vaše narudžbe</span>
      </router-link> -->
      <!-- <router-link to="/LoginView" class="top-bar-link">
        <span>Login</span>
      </router-link> -->
    </nav>
    <div @click="toggleSideBar" class="top-bar-cart-link">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Košarica ({{ totalQuantity }})</span>
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
</template>

<script>
import SideBar from "@/components/SideBar.vue";
// import firebase from "@/firebase";
import food from "./food.json";
// import store from "@/store";
// import router from "@/router/";

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      showSideBar: false,
      inventory: food,
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
      this.cart[name] += quantity;
    },
    toggleSideBar() {
      this.showSideBar = !this.showSideBar;
    },
    removeItem(name) {
      delete this.cart[name];
    },
  },
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
  // },
  }


</script>
