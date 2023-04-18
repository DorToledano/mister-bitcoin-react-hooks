import { Component } from 'react'
import { Chart } from '../cmps/Chart'
import { bitcoinService } from '../services/bitcoin.service'
import { useState,useEffect } from 'react'


export function StatisticPage () {

  const [marketPrice, setMarketPrice] = useState(null)
  const [trans, setTrans] = useState(null)
  
  useEffect(() => {
    loadMarketPrice()
    loadTransactions()
  }, [])
  

  async function loadMarketPrice ()  {
    try {
      const marketPrice = await bitcoinService.getMarketPrice()
      setMarketPrice(marketPrice )
    } catch (error) {
      console.log('error:', error)
    }
  }

  async function loadTransactions() {
    try {
      const trans = await bitcoinService.getConfirmedTransactions()
      setTrans(trans)
    } catch (error) {
      console.log('error:', error)
    }
  }


    if (!marketPrice || !trans) return <div>Loading...</div>
    const mp={
        xdata : marketPrice.map((item) => item.x),
        data : marketPrice.map((item) => item.y),
        color : 'blue',
    }
    const tr={
        xdata : trans.map((item) => item.x),
        data : trans.map((item) => item.y),
        color : 'purple',
    }
    return (
      <section className='statistic-page'>
        <div>
          <Chart data={mp.data} xdata={mp.xdata} color={mp.color}/>
        </div>

        <div>
          <Chart data={tr.data} xdata={tr.xdata} color={tr.color}/>
        </div>
      </section>
    )
}
