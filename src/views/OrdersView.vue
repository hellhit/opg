<template>
  <main class="wrapper">
    <br/>
    <br/>
    
    <h2>Detalji rezervacije</h2>
    <div v-if="purchaseSuccess" class="success-message">Uspješna rezervacija</div>
    <div v-if="!purchaseSuccess" class="order-details">
      <table class="order-table">
        <thead>
          <tr>
            <th>Usluga</th>
            <th>Potrebno vrijeme</th>
            <th>Količina</th>
            <th>Ukupno</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.time.min }} min</td>
            <td>{{ item.quantity }}</td>
            
            <td>
              {{
                item.quantity * item.time.min >= 60
                  ? Math.floor(item.quantity * item.time.min / 60) +
                    " sati " +
                    (item.quantity * item.time.min) % 60 +
                    " minuta"
                  : item.quantity * item.time.min + " minuta"
              }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Sveukupno</td>
            <td>{{ calculateOverallTotal() }} </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <h2 v-if="!purchaseSuccess" >Moji podaci</h2>

    <div v-if="!purchaseSuccess" class="customer-data form-section">
      <label>
        Ime i prezime:
        <input v-model="customer.name" placeholder="Ime i prezime" />
      </label>
      <label>
        Email adresa:
        <input v-model="customer.email" placeholder="Email" />
      </label>
    </div>

   
    <div class="button-container text-right">
      <br/>
      <button v-if="!purchaseSuccess" @click="submitOrder" class="btn btn-dark btn-lg">Rezerviraj termin</button>
    </div>
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
      },
      purchaseSuccess: false,
      cartItems: [], 
    };
  },
  mounted() {
    const cartData = JSON.parse(sessionStorage.getItem("cart") || "{}");
    console.log("Retrieved cart data:", cartData);
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
      const totalMinutes = this.cartItems.reduce((acc, item) => {
        return acc + item.quantity * item.time.min;
      }, 0);

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (minutes === 0) {
        return `${hours} sati`;
      } else if (hours === 0) {
        return `${minutes} minuta`;
      } else {
        return `${hours} sati i ${minutes} minuta`;
      }
      
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

      
      // If all validations pass, proceed with the order submission
      console.log("Order submitted:", this.customer, this.payment);

      const emailData = {
        customer_name: this.customer.name,
        customer_email: this.customer.email,
        order_items: this.cartItems
          .map(
            (item) =>
              `<br/>${item.name} - ${item.quantity} x ${item.time.min.toFixed(
                2
              )} minuta`
          )
          .join(""),
        overall_total: this.calculateOverallTotal(),
      };

      // Send the email
      emailjs
        .send(
          "service_pqxegmu",
          "template_x9l3dmr",
          emailData,
          "7lCgY6dkownKIzBVq"
        )
        .then((response) => {
          console.log("Email successfully sent!", response);
          
          this.clearCart();
          this.purchaseSuccess = true;
          setTimeout(() => {
            this.$router.push({ name: "HomeView" }); 
          }, 3000); // 2 seconds delay
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
        });
    },
    clearCart() {
    // Clear the local component state
    this.cartItems = [];

    // Also clear the sessionStorage
    sessionStorage.removeItem("cart");
  },
  },
};
</script>

<style scoped>
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
  background-color: lightpink;
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
  font-size: 2em;
  text-align: center;
  margin-top: 20px;
}
</style>

