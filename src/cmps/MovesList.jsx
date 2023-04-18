import { userService } from '../services/user.service'
import React from 'react'

export function MovesList({ title, isHome, moves }) {

  return (
    <section className="moves-list">
      <h1>{title}</h1>
      <div id="moves-list" ng-app="moves-list" ng-controller="MovesListCtrl">
        <ul id="moves-list_ul">
          {!moves.length && <div>No moves!</div>}
          {moves.map((move, idx) => (
            <li key={idx}>
              {isHome && <article> {move.to} </article>}
              <article>At: {new Date(move.at).toLocaleString()}</article>
              
              <article>Amount: {move.amount} coins</article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

{
  /* <h1>{title}</h1>
      <ul >
        {!moves.length && <div>No moves!</div>}
        {moves.map((move, idx) => (
          <li key={idx}>
            {isHome && <article> {move.to} </article> }
            <article>At: {date(move.at)}</article> 
            <article>Amount: {move.amount} coins</article> 
          </li>
        ))}
      </ul> */
}
