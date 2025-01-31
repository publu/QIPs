---
sip: <to be assigned>
title: <Deploy wstQI, a liquid yield bearing multi-chain derivative for aveQI>
network: <ETH, Base, Polygon, Optimism, Arbitrum>
status: <Draft>
author: StarSeeds Protocol <StarSeedsProtocol>:
proposal: N/A
created: <2025-1-28>
---

### Summary

Deploy wstQI, a multi-chain wrapped liquid derivative of aveQI that increases in value over time relative to Qi (like wstETH/mooBifi). 

### Abstract

Deploy aveQI Vault and LP contracts similar to MooBifi, then deploy layerzero contracts to enable wstQI to be bridged to Polygon, Arbitrum, Optimism and Base. Then deploy V2 LPs for wstQI/ETH on Polygon/Arbitrum/Optimsim/Base. Create front-end to easily bridge wstQI on MAI website.
Deploy Cross-Chain arbitrage bot to generate revenue by arbitraging wstQI-ETH LPs and the wstQI Vault, with profits held as wstQI. 
Deploy Qi/WstQI arbitrage bot to generate revenue and maintain wstQI's Peg by buying/selling wstQI with Qi. 

### Motivation

Deploying wstQI would 
1. Reduce the cost to entree for aveQI to nearly 0.
2. Make aveQI staking available on any chain. 
3. Provide a higher yield over time compare to aveQI, due to compounding aveQi and arbitrage swap profits.
4. Enable users to buy/sell their aveQI postion. 
5. Allow aveQI positions to be deployed in liquidity pools for additional yield. 
6. Enable other protocols to use aveQI positions as a LP partner for their protocol token.
7. Automatically compound yield from aveQI into buying QI, thus increasing Qi's value automatically over time.  
8. Enable aveQI positions to be used as collateral or leveraged through other protocols. 
9. QiDAO Treasury owned wstQI-ETH and wstQI-MAI LPs would generate additional Treasury revenues while supporting MAI's Peg via automated arbitrage swaps. 

### Specification

### Rationale

The gas costs to deploy aveQI positions and to claim aveQI rewards are very high, which reduces aveQI yield and makes aveQI positions underneath $2K virtually unprofitable. wstQI would reduce the cost to enter aveQI to virtually 0. 

A liquid wrapper for aveQI would enable users to buy/sell their position at anytime, which would greatly increase investor appeal for aveQI. 

wstQI would generate additional revenues for the QiDAO treasury via arbitraging wstQI's cross chain LPs and Vault redemption value. 

wstQI yield would be higher then aveQI yield, and would further increase over time compared to aveQI due to compounding yield and buying/burning undervalued wstQI. 


### Technical Specification

Deploy Deposit Only Vault for QI, that automatically converts Qi to AveQI, with receipt tokens labled wstQI. Deposit $150K in Treasuy held Qi. 

Deploy V2 Uniswap LP with 0.3% fee using Treasuy held $50K Qi, and $50K in wstQI.

Deploy V2 Uniswap LPs with 0.3% fee on Base, Polygon, Arbitrum, Optimism using Treasury held $10K wstQI & $10K WETH.

Deploy V2 Uniswap LPs with 0.3% fee on Base & Polygon using treasury held $30K wstQI and $30K MAI. 

Code Vault logic to determine the vault conversion rate of Qi to wstQI by calculating TVL of Vault, divided by the market swap value of QI, then divided by the number of wstQI in circulation. 

Code vault to determine whether wstQI's LP exchange value is more then 0.5% underneath the Vault's exchange rate for Qi to wstQI. 
If yes, then utilize Vault Yield to purchase and burn wstQI from LP. 
If no, then convert yield into additional vault held aveQI. 

Deploy bot configured to sell wstQI for Qi whenever wstQI swap value is 0.25% higher then Qi to wstQI Vault redemption value & to sell Qi for wstQI whenever wstQis swap value is 3% less then the Qi to wstQI redemption value. 


### Configurable Values


