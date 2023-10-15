---
qip: 1
network: Ethereum & Optimism
title: Qips Purpose and Guidelines
status: Implemented
author: Publu (@publu), Tekrajs (@tekrajs)
created: 2019-06-10T00:00:00.000Z
proposal: >-
  https://snapshot.org/#/qidao.eth/proposal/0x62ae5f092aa1d1469604d5c33c4795b7db2683fcf53444c15a1cdab85cfd8044
type: Governance
---

## What is an Qips?

Qips stands for QiDao Improvement Proposal, it has been adapted from the EIP (Ethereum Improvement Proposal). The purpose of this process is to ensure changes to QiDao are transparent and well governed. An Qips is a design document providing information to the QiDao community about a proposed change to the system. The author is responsible for building consensus within the community and documenting dissenting opinions.

## What is an SCCP?

SCCP stands for QiDao Configuration Change Proposal. SCCP's are documents for making a case for modifying one of the system configuration variables. The intent is to provide a clear and detailed history behind each configuration change and the rationale behind it at the time it was implemented. The author of the document is responsible for building consensus within the community and documenting dissenting opinions.

## Qips & SCCP Rationale

We intend Qipss and SCCPs to be the primary mechanisms for proposing new features, collecting community input on an issue, and for documenting the design decisions for changes to QiDao. Because they are maintained as text files in a versioned repository, their revision history is the historical record of the feature proposal.

It is highly recommended that a single Qips contain a single key proposal or new idea. The more focused the Qips, the more successful it is likely to be.

An Qips or SCCP must meet certain minimum criteria. It must be a clear and complete description of the proposed enhancement. The enhancement must represent a net improvement.

## Qips Work Flow

Parties involved in the process are the _author_, the [_Qips editors_](#Qips-editors), the [QiDao Core Contributors] and the QiDao community.

:warning: Before you begin, vet your idea, this will save you time. Ask the QiDao community first if an idea is original to avoid wasting time on something that will be rejected based on prior research (searching the Internet does not always do the trick). It also helps to make sure the idea is applicable to the entire community and not just the author. Just because an idea sounds good to the author does not mean it will have the intend effect. The appropriate public forum to gauge interest around your Qips or SCCP is [the QiDao Discord].

Your role as the champion is to write the Qips using the style and format described below, shepherd the discussions in the appropriate forums, and build community consensus around the idea. Following is the process that a successful Qips will move along:

![Qips-workflow.png](https://github.com/QiDaoio/Qipss/blob/master/static/Qips-workflow.png)

Each status change is requested by the Qips author and reviewed by the Qips editors. Use a pull request to update the status. Please include a link to where people should continue discussing your Qips. The Qips editors will process these requests as per the conditions below.

- **Draft** -- This Qips is work-in-progress and being reviewed by a Spartan Council member with the champion.
- **Feasibility** -- This Qips is assigned with a Core Contributor and underdoing a feasibility study.
- **SC Review Pending** -- This Qips is being formally reviewed by the Spartan Council to decide on voting or sent back for feasibility study.
- **Vote Pending** -- This Qips is scheduled for voting on [staking](https://staking.QiDao.io/)
- **Approved** -- This Qips has passed community governance and is now being prioritised for development.
- **Rejected** -- This Qips has failed to reach community consensus.
- **Implemented** -- This Qips has been implemented and deployed to mainnet.

## What belongs in a successful Qips?

Each Qips or SCCP should have the following parts:

- Preamble - RFC 822 style headers containing metadata about the Qips, including the Qips number, a short descriptive title (limited to a maximum of 44 characters), and the author details.
- Simple Summary - “If you can’t explain it simply, you don’t understand it well enough.” Provide a simplified and layman-accessible explanation of the Qips.
- Abstract - a short (~200 word) description of the technical issue being addressed.
- Motivation (\*optional) - The motivation is critical for Qipss that want to change QiDao. It should clearly explain why the existing specification is inadequate to address the problem that the Qips solves. Qips submissions without sufficient motivation may be rejected outright.
- Specification - The technical specification should describe the syntax and semantics of any new feature.
- Rationale - The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work, e.g. how the feature is supported in other languages. The rationale may also provide evidence of consensus within the community, and should discuss important objections or concerns raised during discussion.
- Test Cases - Test cases may be added during the implementation phase but are required before implementation.
- Copyright Waiver - All Qipss must be in the public domain. See the bottom of this Qips for an example copyright waiver.

## Qips Formats and Templates

Qipss should be written in [markdown] format.
Image files should be included in a subdirectory of the `assets` folder for that Qips as follows: `assets/Qips-X` (for Qips **X**). When linking to an image in the Qips, use relative links such as `../assets/Qips-X/image.png`.

## Qips Header Preamble

Each Qips must begin with an [RFC 822](https://www.ietf.org/rfc/rfc822.txt) style header preamble, preceded and followed by three hyphens (`---`). This header is also termed ["front matter" by Jekyll](https://jekyllrb.com/docs/front-matter/). The headers must appear in the following order. Headers marked with "\*" are optional and are described below. All other headers are required.

` Qips:` <Qips number> (this is determined by the Qips editor)

` title:` <Qips title>

` author:` <a list of the author's or authors' name(s) and/or username(s), or name(s) and email(s). Details are below.>

` * discussions-to:` \<a url pointing to the official discussion thread at research.QiDao.io\>

` status:` < Draft \| Feasibility \| SC Review Pending \| Vote Pending \| Approved \| Rejected \| Implemented >

` created:` <date created on>

` * updated:` <comma separated list of dates>

` * requires:` <Qips number(s)>

` * resolution:` \<a url pointing to the resolution of this Qips\>

Headers that permit lists must separate elements with commas.

Headers requiring dates will always do so in the format of ISO 8601 (yyyy-mm-dd).

#### `author` header

The `author` header optionally lists the names, email addresses or usernames of the authors/owners of the Qips. Those who prefer anonymity may use a username only, or a first name and a username. The format of the author header value must be:

> Random J. User &lt;address@dom.ain&gt;

or

> Random J. User (@username)

if the email address or GitHub username is included, and

> Random J. User

if the email address is not given.

#### `discussions-to` header

While an Qips is in **Draft** or **Feasibility** status, a `discussions-to` header will indicate the URL at [research.QiDao.io](https://research.QiDao.io/) where the Qips is being discussed.

#### `created` header

The `created` header records the date that the Qips was assigned a number. Both headers should be in yyyy-mm-dd format, e.g. 2001-08-14.

#### `updated` header

The `updated` header records the date(s) when the Qips was updated with "substantial" changes. This header is only valid for Qipss of Draft and Active status.

#### `requires` header

Qipss may have a `requires` header, indicating the Qips numbers that this Qips depends on.

## Auxiliary Files

Qipss may include auxiliary files such as diagrams. Such files must be named Qips-XXXX-Y.ext, where “XXXX” is the Qips number, “Y” is a serial number (starting at 1), and “ext” is replaced by the actual file extension (e.g. “png”).

## Qips Editors

The current Qips editors are

` * Publu (@publu)`

` * Tekrajs (@Tekrajs)`

## Qips Editor Responsibilities

For each new Qips that comes in, an editor does the following:

- Read the Qips to check if it is ready: sound and complete. The ideas must make technical sense, even if they don't seem likely to get to final status.
- The title should accurately describe the content.
- Check the Qips for language (spelling, grammar, sentence structure, etc.), markup (Github flavored Markdown), code style

If the Qips isn't ready, the editor will send it back to the author for revision, with specific instructions.

Once the Qips is ready for the repository, the Qips editor will:

- Assign an Qips number (generally the PR number or, if preferred by the author, the Issue # if there was discussion in the Issues section of this repository about this Qips)

- Merge the corresponding pull request

- Send a message back to the Qips author with the next step.

Many Qipss are written and maintained by developers with write access to the Ethereum codebase. The Qips editors monitor Qips changes, and correct any structure, grammar, spelling, or markup mistakes we see.

The editors don't pass judgment on Qipss. We merely do the administrative & editorial part.

## History

The Qips document was derived heavily from the EIP Ethereum Improvement Proposal document in many places text was simply copied and modified. Any comments about the Qips document should be directed to the Qips editors. The history of the EIP is quoted below from the EIP document for context:

- _"This document (EIP) was derived heavily from [Bitcoin's BIP-0001] written by Amir Taaki which in turn was derived from [Python's PEP-0001]. In many places text was simply copied and modified. Although the PEP-0001 text was written by Barry Warsaw, Jeremy Hylton, and David Goodger, they are not responsible for its use..."_ \*

June 10, 2019: Qips 1 has been drafted and submitted as a PR.

See [the revision history for further details](https://github.com/QiDaoio/), which is also available by clicking on the History button in the top right of the Qips.

### Bibliography

[the QiDao discord]: https://discord.gg
[pull request]: https://github.com/QiDaoio/
[markdown]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[bitcoin's bip-0001]: https://github.com/bitcoin/bips
[python's pep-0001]: https://www.python.org/dev/peps/
[QiDao engineering team]: https://github.com/orgs/QiDaoio/people

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).