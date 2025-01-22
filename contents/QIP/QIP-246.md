---
qip: 246
title: Q1 25 Interest Rate Changes
network: All Chains
status: Draft
author: 0xNacho, Pablo the Penguin, and QiDao Guardians
implementor: QiDao Guardians
implementation-date: Post-approval
created: 2025-01-17
---

### Summary
This proposal recommends increasing the borrowing rates for QiDao's V2 vaults to 10% for the upcoming quarter. This adjustment aligns QiDao's borrowing costs with rising trends within DeFi, maintaining its market position and sustainability.

### Abstract
Recent macroeconomic conditions have driven higher borrowing costs across DeFi. This proposal suggests adjusting QiDao's interest rates to match market rates. The increase will apply only to V2 vaults with configurable interest rate parameters.

In line with the DAO mandate established in QIP244 to "Follow market rates," this adjustment reflects a significant change since the previous quarter. The proposed rates will remain in effect through Q1 2025, with plans for a follow-up proposal later in the year.

### Motivation
Borrowing rates for USDC across major DeFi platforms over the past 30 days demonstrate significant upward movement:

Aave:
- Ethereum: 11.25%
- Base: 10.56%
- Polygon: 11.22%
- GHO Borrow Rate (non-Aave holders): 9.42%

Morpho:
- Base: Varies between 7% and 14%, depending on utilization rates

Compound:
- Ethereum: 10.75%
- Base: 10.03%
- Polygon: 9.15%

SparkDAO: 12.78%

These figures show a general rise in borrowing costs, making it key for QiDao to adjust rates to remain aligned with the broader DeFI ecosystem and ensure steady protocol performance.

### Rationale
- Competitiveness: Adjusting rates ensures QiDao remains a viable choice to borrowers by aligning with market conditions.
- Adaptability: This change demonstrates QiDao's ability to respond effectively to shifting market trends.
- Increased Revenue from PSMs: Higher market rates have shifted revenue dynamics in favor of MAI Peg Stability Modules (PSMs). Raising the borrow rate to 10% balances revenue generation between vault interest and PSMs, potentially encouraging users to acquire MAI through PSMs and boosting protocol revenue while funding liquidity mining costs.
- DeFi Context: Current conditions, including leveraged collaterals and third-parties high-yield farms, can increase pressure on MAI's peg. Raising the borrowing rate to 10% mitigates this risk and helps maintain MAI's stability.

### Technical Specification
- Adjust the borrowing rate for all configurable V2 vaults to a fixed 10%.
- Vaults without adjustable interest rates will remain unchanged.

### Quorum Standards
The option with the most votes will be adopted

### Options
- Approve the 10% interest rate adjustment
- Maintain current rates
- Abstain

### Conclusion
Setting QiDao's V2 vault borrowing rates at 10% for Q1 2025 aligns the protocol with market conditions while improving stability. DAO members are encouraged to support this proposal to strengthen QiDao's position in DeFi for the upcoming year.
