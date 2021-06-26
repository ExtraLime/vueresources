<template>
 <div class='cards'> 
     <card 
      v-for='coin in coins' 
      :key="coin.id"
      @click="clicked(coin)"
      :class="{ opace: selectedId && coin.id !== selectedId }"
      class="card">
       <template v-slot:title>
          {{ coin.name }}         
       </template>
        <template v-slot:content>
          <img :src="coin.sprite">       
       </template>

       <template v-slot:description>
            <div v-for='type in coin.types'
            :key="type.type"
            >
            {{type}}
            </div>
       </template>

     </card>
    </div>
    
</template>
<script>

import Card from './Card.vue'
export default {
        components: {
            Card
        },
        props: {
            coins: {
                type:Array,
                default:[]
            },
            selectedId: {
                type:Number,
            }
        },
        methods: {
                clicked(coin) {
                    this.$emit('chosen',coin)
                }
            }

        }
</script>
<style scoped>
.opace {
  opacity:.5;
  
}
.card:hover {
  transition: 0.2s;
  box-shadow: 0px 1px 9px darkgrey;
  opacity:1;
}
.cards {
  display:flex;
}
.card {
  border: 1px solid silver;
  border-radius: 8px;
  max-width: 200px;
  margin: 0 5px;
  cursor: pointer;
  box-shadow: 0px 1px 3px darkgrey;
  transition: 0.2s;
}

.title, .content, .description {
  padding: 16px;
  text-transform: capitalize;
  text-align: center;
}
.title, .content {
  border-bottom: 1px solid silver;
}
.title {
  font-size: 1.25em;
}

</style>
