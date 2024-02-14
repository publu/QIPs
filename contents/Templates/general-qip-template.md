---
qip: 000
title: General QIP Harmony vault repair
network: <harmony>
status: <Draft>
author: boomer
implementor: "[FirstName LastName (@GitHubUsername), FirstName LastName <foo@bar.com>, FirstName (@GitHubUsername), GitHubUsername (@GitHubUsername)]"
implementation-date: ASAP # 
proposal: https://snapshot.org # Link to the proposal on snapshot.org (optional)
created: 2-14-2024
---

This is the suggested template for new QIPs. Note that Proposals number will be assigned by an editor. When opening a pull request to submit your Proposal, please use an abbreviated title in the filename, qip-draft_title_abbrev.md. The title should be 44 characters or less

### Summary

Repair Harmony vaults to full function.

### Abstract
The Chainlink Orcale on the Mai vaults on Harmony needs to be changed to support the Band Orcale price feed. As of now the vaults do not function at all do to Chainlink cutting all price feeds, which has resulted in the users funds being locked inside. A simple switching of the Orcale would solve this problem and allow users to get access to there funds.
 
### Motivation

 Harmony chain before the price feed issue was pegged and maintained by user activity on that chain. It will easily return to peg once users have access to their funds. Harmony chain has no reliable third party stable and Mai can help users still using the chain have confidence that their funds are safe.  This repair is simple and can be carried out without great time or cost.
### Specification

### Rationale
The Chainlink oracle is no longer used by harmony they have now partnered with Band for all price feeds, do to this change the MAI vaults are unable to be repaid and the user funds are locked inside and vaults are not visible in the application. By updating the oracle this problem would be resolved and the vaults on harmony would be working properly. This would allow for the chain to be pegged, users to repay vaults and to generate more liquid on chain for greater activity.

### Technical Specification

Instructions on how to change the oracle from Chainlink  to Band can be found below.

### Configurable Values

 Band Oracle Test
Band Reference contract
    • mainnet : 0xDA7a001b254CD22e46d3eAB04d937489c93174C3
    • testnet : 0xD0b2234eB9431e850a814bCdcBCB18C1093F986B
requirements
    • Foundry
    • Funded ONE testnet account
Install foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup
https://docs.harmony.one/home/network/validators/node-setup/hmy-cli-download
Extract the private key of your account
if using hmy cli (https://docs.harmony.one/home/network/validators/node-setup/hmy-cli-download)
PRIVATE_KEY=$(hmy keys export-private-key <ACCOUNT_ADDRESS> --passphrase)
Deploy the contract
git clone https://github.com/harmony-one/band_oracle
cd band_oracle

# install the lib
forge install foundry-rs/forge-std

# deploy the contract
forge script script/Bandtest.s.sol:ContractScript --rpc-url https://api.s0.b.hmny.io --private-key $PRIVATE_KEY  --broadcast --legacy
Copy the contrat address
CONTRACT_ADDRESS=<contract_address from previous output>
Test the contract
cast call $CONTRACT_ADDRESS "demo()" --rpc-url https://api.s0.b.hmny.io
0x0000000000000000000000000000000000000000000000000de05bc096e9c00000000000000000000000000000000000000000000000000000000000645cc0c400000000000000000000000000000000000000000000000000000000645cc180
cast call $CONTRACT_ADDRESS "demoBTC()" --rpc-url https://api.s0.b.hmny.io
0x0000000000000000000000000000000000000000000005cfb0f6a66fc372000000000000000000000000000000000000000000000000000000000000645cc0c400000000000000000000000000000000000000000000000000000000645cc186
cast call $CONTRACT_ADDRESS "demo_bulk()" --rpc-url https://api.s0.b.hmny.io
0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000005cf591078e4fd13800000000000000000000000000000000000000000000000000000000000645cbe3800000000000000000000000000000000000000000000000000000000645cc0a800000000000000000000000000000000000000000000000000ebd6f4806fbd2800000000000000000000000000000000000000000000000000000000645cbe3800000000000000000000000000000000000000000000000000000000645cbe38
Feel free to read https://github.com/bandprotocol/band-std-reference-contracts-solidity for more information.
