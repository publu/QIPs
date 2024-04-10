---
qip: TBD
title: Resolution Mechanism for Dormant beQI Vault via OTC Exchange
network: Ethereum
status: Proposal
author: Philippe Van Dyck (@pvdyck)
implementor: TBD
implementation-date: To Be Determined
proposal: To Be Outlined
created: 2024-03-25
---

### Summary

This proposal introduces a solution for the currently dormant beQI vault on Ethereum, 
proposing an Over-The-Counter (OTC) exchange to allow beQI holders to convert their 
tokens into MAI with a value adjustment directly linked to its de-peg (around 15%). 
The aim is to address the inefficiency 
and inactivity of the beQI reserve mechanism caused by prohibitive Ethereum gas fees,
offering QiDao a strategic advantage through a buyback at a discounted rate.

### Abstract

Due to the migration of beQI to Ethereum, the beQI reserve system has ceased 
functioning effectively, primarily due to the absence of minting and burning
activities. The vault has remained inactive, and beQI tokens are essentially 
stuck, a situation unlikely to change given the high transaction costs on 
Ethereum - a challenge not faced on Polygon, where beQI was initially active. 
This proposal suggests establishing a new, audited beQI vault on Ethereum with 
a 100% Minimum Collateral to Debt Ratio, leveraging an existing oracle for a 
15% de-pegged value adjustment of beQI, facilitating a smooth OTC exchange process for 
all parties involved.

### Security

Utilizing trusted oracles and secure, audited smart contracts, this proposal
ensures the highest security standards for the OTC exchange mechanism, 
minimizing centralization risks and safeguarding beQI holder assets.

### Vault Specifications:

- **Collateral Asset**: beQI
- **Minimum Collateral to Debt Ratio**: 100%
- **Fees**: None, to encourage participation
- **Oracle Provider**: Employing the current oracle used by the beQI vault on
- Beefy for value adjustments.
- **Risk Grading**: Low, given QiDao's involvement and the utilization of 
- rigorously audited contracts.

### Motivation

The transition to Ethereum has rendered the beQI vault and its reserve mechanism 
non-functional due to prohibitive gas fees, leaving tokens immobilized. 
By offering an OTC exchange at a 15% de-pegged rate, QiDao not only provides 
liquidity to beQI holders but also benefits from acquiring governance tokens
below market value, enhancing its tokenomics.

### OTC Exchange Mechanism

- **Exchange Rate**: Applying a 15% de-peg discount to the market value of beQI when 
- exchanged for MAI benefits QiDao financially and provides immediate liquidity 
- to beQI holders.
- **New beQI Vault**: The introduction of a new beQI vault on Ethereum, 
- featuring a streamlined OTC exchange process with a 100% Minimum Collateral
- to Debt Ratio and a 15% value adjustment via an established oracle.

### Implementation

- **Communication Strategy**: Deploy effective communication to ensure 
- stakeholders are informed about the new beQI vault and the OTC exchange mechanism.
- **Technical Setup**: Implement the new beQI vault on Ethereum with the 
- outlined specifications, including the oracle for the value of beQI.
- **Evaluation and Adaptation**: Regularly assess the buyback's impact on 
- QiDao's tokenomics, adjusting strategies as needed to fully leverage ecosystem benefits.

### Closing Window

- After a month-long window post-Beefy's announcement of this mechanism, 
- the vault will be evaluated for potential closure, ensuring a focused
- period for beQI holders to participate.

