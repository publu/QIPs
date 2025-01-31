---
qip: 000
title: Uvio Information Markets
network: Base Sepolia
status: Draft
author: xh3b4sd
implementor: TBD
implementation-date: TBD
proposal: TBU
created: 2024-11-13
---

### Summary

Information Markets are a new way of finding truth and consensus, by making
credible predictions about potential future outcomes. This form of futures
thinking leverages the community's ability to find more optimal solutions over
time, which will then result in greater success that the community can enjoy.
This proposal aims to integrate Information Markets to the Mai.Finance
governance process using the [Uvio](https://testnet.uvio.network) platform for
optimal decision making.

### Abstract

When approved, the DAO will conduct a time-boxed governance experiment, which
will facilitate all governance related activities like research, predictions and
consensus on the Uvio platform. The suggested time frame for this governance
experiment is 6 months, after which the DAO can decide whether it wants to keep
using the newly adopted Information Markets for decision making, or revert back
to the established old ways. With this proposal most of the snapshot voting and
QIP related procedures can be kept in place, if desired, since Uvio is only
leveraged for consensus, not for ratification nor execution.

### Motivation

Attributing success that certain decisions or people realize for the community
is currently very difficult, because attribution is implied between invisible
social connections that we may call "politics". Those kinds of politics tend to
be toxic and make remuneration very hard for DAOs, so much so that power
struggles may push out competent actors where they are needed the most. As a
result, governance participation is typically relatively low, because the voices
that feel disempowered or unheard have no chance of any relevant impact in what
those potentially competent voices perceive to be the better solution. By
pushing out competent and honest actors, the risks increase over time for the
DAO to be dominated by suboptimal cabals. This phenomenon is described as
"extractive institutions" in the book "Why Nations Fail".

The thesis here is that using Uvio for decision making enables explicite
attribution of success, which empowered individuals bring to the table over
time. As a result, everyone benefits in the deliberately designed meritocratic
system, because that very system surfaces who is **right** and who is
**honest**, which in turn makes for better vibes and stronger connections
amongst community members. Uvio is to highlight competence and integrity so we
can all be better tomorrow.

### Rationale

The current decision making process is rather vague and implicit in the way that
research, predictions and convictions about problem statements are somewhere
"hidden" in Discord servers, direct messages or other forum like applications.
All the effective wisdom that the DAO members produce collectively is neither
tangibly organized nor standardized to make any of the accrued wisdom
attributable to the extend that attribution and backtracking can become
valuable. Who voted for what and why may or may not be apparent for anyone,
because it is very hard to find relevant information that somebody wants to
attribute to some person or cause. Those very valuable attributions may only be
present in the minds of some individuals, but not others. This proposal here
aims to surface those hidden attributions in a tangible and standardized manner,
for everyone to see and use. So that the sum can become greater than its parts.

### Technical Specification

There are no real technical changes to be made to the protocol code. The changes
that have to be made are of behavioural nature, because every DAO member should
start using Uvio for any contestable truth statement related to DAO activities.
In other words, everyone needs to share their research, predictions, convictions
and ideas in the form of proposed Claims, so that those created Information
Markets hold the DAO and its members accountable, based on their ability to
predict the best solutions concerning any given problem.

Technically speaking, proposing a Claim on Uvio means to write a free text
statement including proofs and an associated expiry, after which the proposed
Claim can be verified in the real world. By proposing a Claim, users stake
reputation on those Claims, in the form of ERC20 tokens. The default token on
the Uvio testnet is UVX, the Uvio Network token. On mainnet it will be possible
to use any stablecoin or governance token, which the DAO is free to choose. The
only technical detail here is that the Uvio "Claims.sol" contract has to be
deployed on the preferred network for the preferred token.

Uvio enables decision making in a dual-step process. The first step is to
propose Claims and stake reputation on those Claims. Staking on Claims means to
express opinions about the future, where the staked reputation is to hold
stakers accountable. Accountability is then enforced once the proposed Claims
expire, which enables the second step of the decision making process. That is,
verifying outcomes in the real world. Verification happens using **random truth
sampling**, where an equal amount of stakers are randomly selected on either
side of the market. Selecting the same amount of aggreeing and disagreeing
voters allows a single honest actor to verify the truth amongst otherwise
entirely selfish voters. After voting concluded, a challenge window of 1 week
enables anyone to dispute any Claim. When Claims settle, the tokens of those who
were wrong in their opinions will be transferred to those who where right. The
given action space provides market participants with game-theoretical optimal
outcomes.

Uvio's dual-step process of staking and voting culminates in user reputation,
where the platform is able to aggregate who is right and who is honest over
time. This is then how Uvio helps to inform communities to make better decisions
long term, because past performance is attributed in a standardized way for
everyone to see.

Claims can be disputed twice, meaning every proposal can be voted on three
times. The third and final verification of real events, if it ever comes to that
point of contention, is then not made by *random* stakers, but by those stakers
with the highest *reputation*. This is then also why competence and integrity
matters long term. And this is how community consensus may be reached over
multiple stages, which starts off maximally decentralized, and if contested,
ruled in a more trusted way by those who earned that trust historically.

A technical detail here on testnet is that some backend logic is run offchain in
order to enable randomization and automation of basic Claim procedures. All of
this code is open source and run by the Uvio Network. The plan is to
decentralize this offchain logic in the future and making it provable by putting
it onchain once suitable solutions have been developed.

All tokens, value, ownership and content checksums are trustlessly managed
onchain in a single smart contract. All code is auditable open source. No formal
audits have been performed so far.

There are no oracles, no market makers. There is no concept of liquidity. There
are no order books, no trading. The smart contracts are heavily unit tested.
All of the critical components have a reasonable test coverage according to
their relevance.

The Uvio frontend is run by the Uvio Network, just like the offchain backend is.
The frontend is a NextJs app complying with all the usual best practices. The
frontend may be hosted in a decentralized fashion in the future. Other client
implementations are welcome and may be developed by other communities. Fee
sharing is a possible option here too. The offchain backend is written in
Golang. User authentication between frontend and backend is done via JWTs. Uvio
provides best in class account abstraction. Privy is used for embedded wallets
upon login using Email or Farcaster. Biconomy is used for gas sponsorship of all
embedded wallet transactions. The usage of EOAs is possible without gas
sponsorship. More technical development is in progress. Any feedback is always
welcome.

### Configurable Values

- The DAO may decide what their preferred tokens are for staking. The default is
  UVX, the Uvio Network token. Any ERC20 may be used on mainnet, including
  non-rebasing yield bearing tokens.
- The DAO may decide what their preferred proposer fees are, since users who
  propose Claims earn parts of any tokens that are transferred from the loosing
  side to the winning side. The default proposer fee is 5%.
- The DAO may decide what their preferred network for contract deployment is.
  The Uvio testnet is currently deployed on Base Sepolia, with mainnet planned
  to be deployed on Base mainnet. Any EVM chain may be used.

### References

Uvio Testnet: https://testnet.uvio.network
Uvio Documentation: https://docs.uvio.network
Uvio Github: https://github.com/uvio-network
Warpcast Profile: https://warpcast.com/xh3b4sd.eth
