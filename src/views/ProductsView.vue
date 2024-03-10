<template>
  <main class="wrapper">
    <br/>
    <br/>
    
    <h1>Usluge</h1>

    <div class="type-links">
  <button @click.prevent="selectType('sve')" :class="{ active: selectedType === 'sve' }">Sve</button>
  <button @click.prevent="selectType('masaža')" :class="{ active: selectedType === 'masaža' }">Masaže</button>
  <button @click.prevent="selectType('šminkanje')" :class="{ active: selectedType === 'šminkanje' }">Šminkanje</button>
  <button @click.prevent="selectType('depilacija')" :class="{ active: selectedType === 'depilacija' }">Depilacija</button>
</div>


    <div class="card-container">
      <ProductCard
        v-for="(product, index) in filteredProducts"
        :key="product.id"
        class="card"
        :index="index"
        :product="product"
        :addToCart="addToCart"
      />
    </div>
  </main>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  props: ["inventory", "addToCart"],
  components: {
    ProductCard,
  },
  data() {
    return {
      selectedType: "sve",
    };
  },
  computed: {
    filteredProducts() {
      if (this.selectedType === "sve") {
        return this.inventory;
      }
      return this.inventory.filter(
        (product) => product.type === this.selectedType
      );
    },
  },
  methods: {
    selectType(type) {
      this.selectedType = type;
    },
  },
};
</script>
<style scoped>
/* ... existing styles ... */

.type-links {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.type-links button {
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 7px; /* Half of the desired spacing on each side to ensure 20px between buttons */
}

.type-links button:hover {
  background-color: #e0e0e0;
}

.type-links button.active {
  background-color: #2196F3;
  color: white;
  border-color: #2196F3;
}
</style>
