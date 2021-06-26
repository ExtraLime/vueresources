import * as Vue from 'vue/dist/vue.esm-bundler.js'
const Num = {
    props:['number'],
    template:`<button v-bind:class="getClass(number)"
                        v-on:click="click">    
            {{number}}
            </button>`,
    methods:{
        
        click(){
            this.$emit('clicked', this.number)
            // console.log(this.number)
        },
        isEven(number){ 
            return number%2 === 0 
        },
        getClass(number){
            return this.isEven(number)? 'blue':'red'
        }
    }
}

const app = Vue.createApp({
    components:{
        Num
    },
    
    template:`    
    <num v-for="number in numbers"
         v-bind:number="number"
         v-on:clicked="addNum"

         />
         <hr>
    <num v-for="number in nums"
         v-bind:number="number"         
         />

    `,

  data() {
    return {
        nums :[],
        numbers: [1,3,5,3,2,1,2,3],
      
    }
  },
  computed: {
    evenList() {
        return this.numbers.filter(num => this.isEven(num))
    },

  },
  methods:{
      addNum(number){
        console.log("number", number)
        this.nums.push(number)
      },
      increment(){
          this.count += 1
      }
  }
})
app.mount('#app')