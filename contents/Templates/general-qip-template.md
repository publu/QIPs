---
qip: 000
title: Harmony Vault Repair
network: <Harmony>
status: <Draft>
author: Boomer
implementor: "[FirstName LastName (@GitHubUsername), FirstName LastName <foo@bar.com>, FirstName (@GitHubUsername), GitHubUsername (@GitHubUsername)]"
implementation-date: asap # 
proposal: https://snapshot.org # Link to the proposal on snapshot.org (optional)
created: 2-16-2024
---

This is the suggested template for new QIPs. Note that Proposals number will be assigned by an editor. When opening a pull request to submit your Proposal, please use an abbreviated title in the filename, qip-draft_title_abbrev.md. The title should be 44 characters or less

### Summary

Update Oracle on Harmony to Band Price Feeds

### Abstract

The Chainlink Oracle currently used on the Mai vaults on Harmony needs to be changed to support the Band Oracle price feed. As of now the vaults do not function at all do to Chainlink cutting all price feeds, which has resulted in the users funds being locked inside. A simple switching of the Oracle would solve this problem and allow users to get access to there funds.
### Motivation

This repair is simple and can be carried out without great time or cost.
### Specification

### Rationale

The Chainlink oracle is no longer used by harmony they have now partnered with Band for all price feeds, do to this change the MAI vaults are unable to be repaid and the user funds are locked inside and vaults are not visible in the application. By updating the oracle this problem would be resolved and the vaults on harmony would be working properly.
### Technical Specification

See Band Oracle Address below:

### Configurable Values

Band Reference contract
    • mainnet : 0xDA7a001b254CD22e46d3eAB04d937489c93174C3
    • testnet : 0xD0b2234eB9431e850a814bCdcBCB18C1093F986B
