<template>
  <coin-cards 
    :coins="coins"
    @chosen='getPricerates'
    :selectedId="selectedId"
     />
     <coin-cards 
    :coins="newCoins"
    />
</template>

<script>
import Card from './Card.vue'
import CoinCards from './CoinCards.vue'

const api = 'https://www.okex.com/v2/support/info/announce/detail?t=1624657654004&projectName='
const coinUrl = 'https://fapi.binance.com/fapi/v1/premiumIndex?symbol='
const coins = ['USDT','ETH','BTC',"BCH",'XRP','ADA', 'DOT','LTC','LINK']
export default {
  components:{
    Card,
    CoinCards
  },
    data() {
       return { coins: [],
                newCoins:[],
                selectedId:null }
    },
    methods: {

        async getPricerates(coin){
          this.newCoins = await this.fetchData(['1INCH','UNI','BTT','TRX','SNX'])
          this.selectedId = coin.id
        },
        async fetchData(coins) {
            const responses = await Promise.all(coins.map(coin => window.fetch(api+coin)))
            console.log(responses)
            const data = await Promise.all(responses.map(response => response.json()))
            console.log(data)
            const coinss = data.map(coin => [coin['data']['project'],coin['data']['status'],])
            console.log(coinss)
            return data.map(coin => ({
                id : coin.data.currencyId,
                name : coin.data.project,
                sprite: coin.data.icon,
                types: coin.data.members.map(member => member.name)
            }))
            console.log(this.coins)

            }
            
        },
      async created() {
        this.coins = await this.fetchData(coins)
      }
    }


</script>

<style scoped>



</style>
