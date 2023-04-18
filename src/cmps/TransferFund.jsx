import React from 'react'

export function TransferFund({ contact,changeBalance,maxCoins }) {
  const coinsAmount = (ev) => {
    ev.preventDefault()
      const amount = ev.target.elements.namedItem('amount').value
      changeBalance(amount)
  }
  return (
    <section className="transfer-fund">
       {!maxCoins && <div>No coins to transfer!</div>}
      <div className="login-box">

  {maxCoins &&  <form action='' onSubmit={coinsAmount}>
      <h2 htmlFor="">Transfer coins to {contact.name} </h2>
    <div className="user-box">
          <input
            type="number"
            name="amount"
            id="amount"
            min={1}
            max={maxCoins}
            required
          />
    <label htmlFor="amount">
          Amount:
          </label>
    </div>
    
    <div className="user-box">
    </div>
    <button>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Transfer
    </button>
  </form>}
</div>
    </section>
  )
}
