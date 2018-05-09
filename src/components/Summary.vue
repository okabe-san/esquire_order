<template>
  <div id="order">
    <section>
      <h3>Step 1</h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h3>Step 2</h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h3>Step 3</h3>
      <i class="material-icons step">keyboard_arrow_down</i>
      <h2 class="step">
        Review
      </h2>
    </section>

    <main>
      <div class="form_wrapper">
        <div class="form">
          <div>
            <h2>REVIEW ORDER</h2>
            <div class="display">

              <!-- step 1 -->
              <div class="one">
                <h3 class="title">Step 1
                  <button @click="backToDetails">Edit</button>
                </h3>
                <h4 class="highlight">PO #: {{state.po_number}}</h4>
                <div v-for="(detail, index) in state.order_picked.items" :key="index">
                  <h4>Item: {{index + 1}}</h4>
                  <table style="width:100%">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Location</th>
                        <th>QTY</th>
                        <th>Stitch</th>
                        <th>Logo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{detail.item}}</td>
                        <td>{{detail.location}}</td>
                        <td>{{detail.quantity}}</td>
                        <td>{{detail.stitch}}</td>
                        <td>
                          {{detail.name}}<br />
                          <img class="image" :src="detail.image">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                 </div>
               </div>

              <!-- step 2 -->
              <div class="two">
                <h3 class="title">Step 2
                  <button @click="backToShipping">Edit</button>
                </h3>

                <h4 class="highlight">Representative Name</h4>
                <P>{{state.rep}}</P>

                <h4 class="highlight">Shipping Address(es)</h4>
                <div v-for="(detail, index) in state.shipping" :key="index">
                 <h4>Shipping: {{index + 1}}</h4>
                 <div class="shipping">
                    <b>Method:</b> {{detail.method}}<br />
                    <b style="display:inline-block;vertical-align:top;">Address:</b>
                    <span class="address">
                      {{detail.address}}
                    </span><br />
                    <b>Detail:</b>
                    <span v-if="detail.detail.length > 0">
                      {{detail.detail}}
                    </span>
                    <span v-else>
                      No detail.
                    </span>
                  </div>
                </div>
              </div>

              <!-- step 3 -->
              <div>
                <h3 class="title">Step 3
                  <button @click="backToOptions">Edit</button>
                </h3>

                <h4 class="highlight">Option(s)</h4>
                <div v-if="state.option_checked.length > 0">
                  <ul>
                    <li v-for="(option, index) in state.option_checked" :key="index">
                      {{option}}
                    </li>
                  </ul>
                </div>
                <div v-else>No Option was selected.</div>

                <h4 class="highlight">Comments</h4>
                  <div v-if="state.comments.lenght > 0">{{state.comments}}</div>
                  <div v-else>No Comment</div>
              </div>
            </div>
          </div>

          <!-- nav buttons -->
          <div class="action">
            <button class="submit" @click="submit">
              <span class="button">
                Submit
                <i class="material-icons">check</i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'Summary',
  computed: {
    state: {
      get () {
        return this.$store.state
      }
    }
  },
  methods: {
    backToDetails () {
      this.$router.push('/entry')
    },
    backToShipping () {
      this.$router.push('/shipping')
    },
    backToOptions () {
      this.$router.push('/options')
    },
    submit () {
      this.$router.push('/thanks')
    }
  }
}
</script>

<style scoped>
@import '../assets/css/order_lib.css';
@import '../assets/css/button_lib.css';
/* for steps */
h2 {
  font-weight: 700;
  margin: 0;
}
section > h3 {
  color: rgba(255, 255, 255, 0.5);
}
.display {
  display: flex;
  flex-direction: row;
}
.one {
  flex: 1.2;
}
.two, .three {
  flex: 1.2;
}
.shipping {
  max-width: 150px;
  margin: 0 auto;
  text-align: left;
}
.address {
  display: inline-block;
  max-width: 100px;
}
.action {
  margin-top: 3rem;
}
.title {
  padding-bottom: .5rem;
  border-bottom: 1px solid #555;
}
.highlight {
  display: inline-block;
  padding: .25rem 1rem;
  color: #555;
  background: #fcd020;
}
</style>
