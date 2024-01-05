import type { HeadFC, PageProps } from 'gatsby';
import React from 'react';
import Navigation from '../components/Navigation';
import Layout from '../layout';

const Home: React.FC = () => {
    return (
        <Layout>
            <div className="container max-w-full">
                <div className="content mt-30 overflow-y-auto h-screen flex justify-center items-start">
                    <div
                        id="content-center"
                        className="relative w-full pl-0 lg:w-3/4 lg:pl-5 mt-20"
                    >
                        <div className="container mx-auto px-4 py-8">
                            <h1 className="text-3xl font-bold mt-8 mb-4">
                                QI Dao Improvement Proposals{' '}
                                <a
                                    href="https://discordapp.com/"
                                    rel="nofollow"
                                    className="max-w-full mt-3"
                                >
                                    <img
                                        className="max-w-full"
                                        src="https://camo.githubusercontent.com/294a3116521e16f9164255dd2d386b24767e2610/68747470733a2f2f696d672e736869656c64732e696f2f646973636f72642f3431333839303539313834303237323339342e7376673f636f6c6f723d373638414434266c6162656c3d646973636f7264266c6f676f3d6874747073253341253246253246646973636f72646170702e636f6d25324661737365747325324638633937303162393861643433373262353866313366643966363566393636652e737667"
                                        alt="Discord"
                                        data-canonical-src="https://img.shields.io/discord/413890591840272394.svg?color=768AD4&amp;label=discord&amp;logo=https%3A%2F%2Fdiscordapp.com%2Fassets%2F8c9701b98ad4372b58f13fd9f65f966e.svg"
                                    />
                                </a>
                            </h1>
                            <p className="mb-4">
                                QiDao Improvement Proposals (QIPs) describe standards for the QiDao Protocol,
                                including core protocol specifications, client APIs, contract standards, 
                                and strategic charters. They also request parameter changes to existing
                                smart contracts that make up the protocol.
                            </p>

                            <h2 className="text-xl font-bold my-4">
                                Contributing
                            </h2>
                            <ol className="list-decimal list-inside mb-4">
                                <li>
                                    Review General QIP Template, New Asset Template, and QIP Procedures.
                                </li>
                                <li>
                                    Fork the repository by visiting the QIPs{' '}
                                    <a href="https://github.com/publu/QIPs">
                                        repo
                                    </a>{' '}
                                    and pressing "Fork" in the top right.
                                </li>
                                <li>
                                    Add your QIP to your fork of the repository.
                                    There is a{' '}
                                    <a href="https://github.com//publu/QIPs/blob/master/qip-x.md">
                                        template Proposal here
                                    </a>{' '}
                                    and a{' '}
                                    <a href="https://github.com//publu/QIPs/blob/master/qtp-x.md">
                                        template QTP here
                                    </a>
                                    .
                                </li>
                                <li>
                                    Submit a Pull Request to QiDao's{' '}
                                    <a href="https://github.com//publu/QIPs">
                                        QIPs repository
                                    </a>
                                    .
                                </li>
                            </ol>
                            <h2 className="text-xl font-bold my-4">
                                Status Terms
                            </h2>

                            {/* Rest of the content with appropriate Tailwind CSS classes */}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
