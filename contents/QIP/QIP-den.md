---
qip: To be assigned
title: Drive Financial Insights via Den
network: NA
status: Draft
author: Jonah Erlich
implementor: Jonah Erlich (@jierlich)
proposal: TBU
created: 2024-01-31
---

### Summary

Enable Den's bookkeeping and financial insights features for the protocol's revenue manager multisigs

### Abstract

QiDAO will sign up for Den's startup tier to provide bookkeeping and financial insights software to the protocol. This will allow the protocol to have a clear understanding of its financials and to provide transparency to the community.

### Motivation

QiDAO's open source code and protocol provide a high-degree of financial transparency. However, this transparent data is not easily comprehensible. It's challenging to get a clear, granular understanding of the protocol's revenues, expenses, and cash flows.

### Specification

### Rationale

QiDAO uses Den for managing it's Safe (formerly Gnosis Safe) multisigs. By enabling the accounting and financial insights features, the protocol will be able to dive deeper into transactions that are already annotated in Den. Annotations including descriptions, address book labels, and file uploads are automatically synced to bookkeeping. This annotation, combined with powerful tooling to categorize transactions and uncover financial insights, will enable the protocol to go beyond transparency and become easily comprehensible.

### Pricing

Den has several pricing tiers based on the number of transfers tracked per month. This excludes spam tokens and includes free historical data. The startup tier is the most appropriate for the revenue manager multisigs today. This tier is $249/month billed annually. It includes 300 transfers tracked per month, with additional transfers billed at $0.95 per transfer. Upgrading to the next tier is possible at any time if volume significantly exceeds 300 transfer per month.

### References

Den website: https://www.onchainden.com/
Twitter Thread: https://twitter.com/OnChainDen/status/1749809315597394118
Farcaster Thread: https://warpcast.com/onchainden/0x9b0cacfd
