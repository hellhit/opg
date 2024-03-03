<template>
  <main class="wrapper">
    <h2>Detalji narudžbe</h2>
    <div v-if="purchaseSuccess" class="success-message">Uspješna kupnja</div>
    <div v-if="!purchaseSuccess" class="order-details">
      <table class="order-table">
        <thead>
          <tr>
            <th>Proizvod</th>
            <th>Cijena</th>
            <th>Količina</th>
            <th>Ukupno</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.price.EUR }} Eur</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.quantity * item.price.EUR.toFixed(2) }} Eur</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Sveukupno</td>
            <td>{{ calculateOverallTotal() }} Eur</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <h2 v-if="!purchaseSuccess" >Podatci o kupcu</h2>

    <div v-if="!purchaseSuccess" class="customer-data form-section">
      <label>
        Ime i prezime:
        <input v-model="customer.name" placeholder="Ime i prezime" />
      </label>
      <label>
        Email adresa:
        <input v-model="customer.email" placeholder="Email" />
      </label>
      <label>
        Adresa za dostavu:
        <input v-model="customer.address" placeholder="Adresa" />
      </label>
    </div>

    <h2 v-if="!purchaseSuccess">Naćin plaćanja</h2>

    <div v-if="!purchaseSuccess" class="payment-method form-section">
      <label class="switch">
        <input type="checkbox" v-model="payOnDelivery" />
        <span class="slider"></span>
      </label>
      <span>Plaćanje pouzećem</span>
    </div>

    <h2 v-if="!payOnDelivery">Plaćanje kreditnom karticom</h2>

    <div v-if="!purchaseSuccess && !payOnDelivery " class="payment-data form-section">
      <div class="payment-data form-section">
        <label>
          Broj kartice:
          <input v-model="payment.cardNumber" placeholder="Broj kartice" />
        </label>
        <label>
          Vrijedi do:
          <input v-model="payment.expiryDate" placeholder="(MM/YY)" />
        </label>
        <label>
          CVC:
          <input v-model="payment.cvc" placeholder="CVC" type="password" />
        </label>
      </div>
    </div>

    <button v-if="!purchaseSuccess" @click="submitOrder">Pošalji narudžbu</button>
  </main>
</template>

<script>
import emailjs from "emailjs-com";
export default {
  props: ["inventory"],
  // components: {
  //   ProductCard
  // },
  data() {
    return {
      customer: {
        name: "",
        email: "",
        address: "",
      },
      payment: {
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      },
      payOnDelivery: false,
      purchaseSuccess: false,
      cartItems: [], // This will be populated with the items in the cart from the route params
    };
  },
  mounted() {
    // Retrieve the cart data from sessionStorage
    const cartData = JSON.parse(sessionStorage.getItem("cart") || "{}");
    //const cartData = JSON.parse(sessionStorage.getItem('cart') || '{}');
    console.log("Retrieved cart data:", cartData);
    // Transform the cart data to match the expected structure for cartItems
    this.cartItems = Object.entries(cartData).map(([productName, quantity]) => {
      const product = this.inventory.find((p) => p.name === productName);
      return {
        ...product,
        quantity,
      };
    });
  },

  methods: {
    calculateOverallTotal() {
      return this.cartItems
        .reduce((acc, item) => {
          return acc + item.quantity * item.price.EUR;
        }, 0)
        .toFixed(2);
    },

    validateEmail(email) {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return re.test(email);
    },

    submitOrder() {
      if (!this.customer.name.trim()) {
        alert("Molim upišite puno ime i prezime.");
        return;
      }

      if (!this.validateEmail(this.customer.email)) {
        alert("Molim upišite puno valjanu Email adresu.");
        return;
      }

      if (!this.customer.address.trim()) {
        alert("Molim upišite adresu za dostavu.");
        return;
      }

      // Validate credit card details if payOnDelivery is false
      if (!this.payOnDelivery) {
        if (
          !this.payment.cardNumber.trim() ||
          this.payment.cardNumber.length < 16
        ) {
          alert("Molim upišite broj kreditne kartice.");
          return;
        }

        if (
          !this.payment.expiryDate.trim() ||
          !/^\d{2}\/\d{2}$/.test(this.payment.expiryDate)
        ) {
          alert("Molim upišite puno valjanost u formatu MM/GG.");
          return;
        }

        if (!this.payment.cvc.trim() || this.payment.cvc.length !== 3) {
          alert("Molim upišite valjani cvc (tri znamenke).");
          return;
        }
      }

      // If all validations pass, proceed with the order submission
      console.log("Order submitted:", this.customer, this.payment);

      const emailData = {
        customer_name: this.customer.name,
        customer_email: this.customer.email,
        customer_address: this.customer.address,
        order_items: this.cartItems
          .map(
            (item) =>
              `${item.name} - ${item.quantity} x ${item.price.EUR.toFixed(
                2
              )} Eur`
          )
          .join("<br>"),
        overall_total: this.calculateOverallTotal(),
      };

      // Send the email
      emailjs
        .send(
          "service_qqde79m",
          "template_hpgtqwl",
          emailData,
          "Z6jj03juRIv5dk4rC"
        )
        .then((response) => {
          console.log("Email successfully sent!", response);
          this.purchaseSuccess = true;
          this.cartItems = [];
          sessionStorage.removeItem("cart");
          setTimeout(() => {
            this.$router.push({ name: "HomeView" }); 
          }, 2000); // 2 seconds delay
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
        });
    },
  },
};
</script>

<style scoped>
/* ... existing styles ... */

.form-section {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-section label {
  display: block;
  margin-bottom: 10px;
}

.form-section input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-section input[type="password"] {
  font-family: "Courier New", Courier, monospace; /* Makes the dots in the password field more visible */
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.order-table th,
.order-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.order-table th {
  background-color: #f2f2f2;
}

/* Switch styles */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.success-message {
  color: green;
  font-size: 1.5em;
  text-align: center;
  margin-top: 20px;
}
</style>

