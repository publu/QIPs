---
sip: <to be assigned>
title: <Deploy Treasury Held ETH, Stables, Qi, and MAI >
network: <Base>
status: <Draft>
author: StarSeeds Protocol <StarSeedsProtocol>:
proposal: N/A
created: <2025-1-28>
---

### Summary

QiDAO Treasury is holding an estimated $150K in non-mai stablecoins and about $700K in ETH that currently serve little purpose. Those tokens could instead be utilized to strengthen MAI’s peg, increase QiDAO protocol revenues, and provide returns for QiDAO’s aveQi Investors. 

### Abstract

Consolidate floating ETH and Stables into revenue optimized LPs with MAI and Qi.

### Motivation

Increase QiDAO protocol revenues while strengthening MAIs peg and increasing the value of QI automatically over time. 

### Specification

### Rationale

Tokens sitting in the Treasury creates no benefits. 

Deploying stables to MAI-USDC LP strengthens MAI’s peg and allows QiDAO Treasury to compound more veAERO emissions into buying MAI off the open market and adds additional POL liquidity for MAI. 

Deploying a properly configured MAI-ETH UNI V3 LP with concentrated liquidity management will generate a high amount of compounded swap fees while adding significant ongoing buying pressure for MAI. 

Deploying a MAI-QI Volatile AMM on base will route significant arbitrage swap volume from ETH to QI to MAI to USDC and back.

Diverting a portion of ve-aero emissions to MAI-QI LP would add value to both tokens and allow the QiDAO Treasury to claim the majority of emissions directed this way.

A UNIV3 Qi-WETH LP using a well configured Steer Concentrated LP management Vault could drive upwards of 50% APR with minimal impermanent loss.

### Technical Specification

Migrate undeployed ETH and Stables to Base. Convert least desirable Treasury tokens into Qi until the Treasury holds at least $350K Qi.

Deposit Stables with MAI into the Beefy vault for MAI-USDC Aerodrome LP.

Deposit up to $500K in ETH into a single sided UNIV3 LP with MAI as the asking token, with 1% fee and managed by a Steer Vault.

Deposit $100K in Qi with $100K in WETH in UNIV3 LP with 0.3% fee and managed by Steer Vault

### Configurable Values

Configure ETH - MAI Steer Vault using Classic Rebalancing V2. Starting Position 100% ETH. Rebalance Trigger: Range Drift 4. Price Range Multipler of 2.

Configure ETH - QI Steer Vault using Classic Rebalancing V2, Starting Position 50/50. Rebalance Trigger: Range Drift 3.5. Price Range Multiplier of 1.4
