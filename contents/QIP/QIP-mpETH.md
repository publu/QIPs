---
qip: to be assigned
title: Include mpETH as collateral for MAI on Linea
network: Linea
status: Proposal
author: Lucio Tato (lucio@metapool.app)
implementor: TBD
implementation-date: TBU
proposal: N/A
created: 2024-03-11
---

### Summary

Add the Meta Pool liquid staking token - mpETH - as collateral in Mai Finance. mpETH is the first liquid staking token that is accruing staking rewards every second, allowing it´s users to unstake immediately and get the protocol rewards from their ETH staking. It is a non-rebasing LST.
mpETH on Defillama https://defillama.com/protocol/meta-pool-eth

### Security

Here are both security audits done by @BlockSecteam and @halbornesecurity

* [mpETH Contract Blocksec Audit](https://docs.metapool.app/master/security/audits/blocksec-audit#audit-staking-eth-with-meta-pool-on-ethereum)
* [mpETH Contract Halborn Audit](https://github.com/HalbornSecurity/PublicReports/blob/master/Solidity%20Smart%20Contract%20Audits/MetaPool_ETH_Staking_Smart_Contract_Security_Audit_Report_Halborn_Final.pdf)

### Vault specifications:

* Collateral asset to be used: mpETH
* Minimum collateral to debt ratio: 125%
* Fees: [0.1% / 3% / 0.1% / 0.1%]
* Minimum debt: [ 100 ] MAI
* Maximum debt: [ 100000 ] MAI
* Oracle provider: on-chain price https://docs.metapool.app/master/meta-pool-by-chains/ethereum-network/mpeth#true-price
* Risk grading: Low
* Risk methodology: [link to rubric template](https://docs.google.com/spreadsheets/d/1uvRFiN5FNr4OUKdsueFbnrQhx1lMdf1FfXRw1tnIXJE/edit?usp=sharing)

### Motivation
* Grow QiDAO presence in emergent markets with a focus in Latin America and South East Asia, specifically in Brazil, Indonesia, Mexico, Philippines, Thailand and Vietnam.
* QiDAO community can participate and have access to Meta Pool DAO grants
* mpETH will be bridged on LINEA Protocol, so users can use it as collateral in a MAI vault
* Incentives of $3,000 to $4,000 USD in mpETH for the mpETH<>MAI pool on Lynex 

mpETH wants to empower users from emergent markets to be able to engage with Decentralized Finance, we acknowledge that QiDAO has a large user base in these regions and the Meta Pool DAO wants to support its growth. Working to onboard millions of users.

mpETH is a non-rebasing liquid staking token (LST), which means the scenario of depegged price is reduced and does not need a wrapping to accrue staking rewards, plus the calculation of the accruing rewards is done every second. Coingecko page: https://www.coingecko.com/en/coins/mpeth

Currently mpETH has a boosted APY of more than 5%, which is supported by the SSV Network protocol rewards; which will be accruing for the next 12 months. Rewards are on ETH, accruing all the value in mpETH and avoiding dual token rewards. 

Meta Pool is partnering with Linea and their ecosystem, we intend to build a go to market strategy to expand usage of Linea. There is full alignment from investors such as Dragonfly and IOSG. The first 3 months Meta Pool DAO will be providing liquidity on the Lynex DEX and working with QiDAO to support MAI liquidity pools, providing incentives for their growth and promotion on the current user base of more than 13,000 community members.

Meta Pool DAO is commiting ETH staking rewards fees to be distributed to blockchain projects in emerging markets; they are allocating the first 2000 ETH to this initiative. 

For now they are running programs with Gitcoin, participating in Gitcoin Round 18 (GR18) for LATAM projects and GR19 to the Global Chinese Community.

Currently running a campaign with Giveth to support projects in the APAC region and looking to engage the QiDAO community to have access to this Quadratic Funding round.

In their current Meta Pool DAO grant Round N.6 they are currently allocating more than $20,000 USD to support projects in emerging markets, which will also be open for the QiDAO community to participate in. More information at https://www.metapool.app/grants
