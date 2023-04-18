import { storageService } from '../services/storage.service'
import axios from 'axios'

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
}

const KEY_RATE = 'rate'
const KEY_MP = 'market-price'
const KEY_CT = 'Confirmed-Transactions'

async function getRate() {
  let currRate = storageService.load(KEY_RATE)
  console.log('from chache')
  if (!currRate) {
    try {
      const res = await axios.get(
        'https://blockchain.info/tobtc?currency=USD&value=1'
      )
      currRate = res.data
      storageService.store(KEY_RATE, currRate)
      console.log('Rate from api')
    } catch (err) {
      console.log('Could not get rate', err)
    }
  }
  return currRate
}

async function getMarketPrice() {
  let marketPrice = storageService.load(KEY_MP)
  if (!marketPrice) {
    try {
      const res = await axios.get(
        'https://api.blockchain.info/charts/market-price?timespan=1week&format=json&cors=true'
      )
      // const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
      marketPrice = res.data.values
      storageService.store(KEY_MP, marketPrice)
    } catch (err) {
      console.log('Could not get market price', err)
    }
  }
  return marketPrice
}

async function getConfirmedTransactions() {
  //https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&format=json&cors=true
  //Return chart data
  let confirmedTransactions = storageService.load(KEY_CT)
  if (!confirmedTransactions) {
    try {
      const res = await axios.get(
        'https://api.blockchain.info/charts/transactions-per-second?timespan=1day&format=json&cors=true'
      )
      confirmedTransactions = res.data.values
      storageService.store(KEY_CT, confirmedTransactions)
    } catch (err) {
      console.log('Could not get confirmed transactions', err)
    }
  }
  return confirmedTransactions
}
