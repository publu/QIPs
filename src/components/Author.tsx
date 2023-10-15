import React from 'react';
import { flow, trim, split, uniq, map } from 'lodash/fp';

interface Props {
    author: string;
}

const Author: React.FC<Props> = ({ author }) => {
    const authors = flow(split(','), map(trim), uniq)(author);

    return (
        <div className="flex flex-nowrap items-center space-x-1">
            <div>
                <img
                    src="https://cdn.stamp.fyi/avatar/eth:0xAd95A5fE898679B927C266eB2eDfAbC7fe268C27?s=40"
                    className="rounded-full bg-skin-border object-cover"
                    alt="avatar"
                    style={{
                        width: '20px',
                        height: '20px',
                        minWidth: '20px',
                    }}
                />
            </div>

            <span className="w-full cursor-pointer truncate text-skin-link">
                <div>
                    {authors.map((a, i) => {
                        // Email
                        if (a.indexOf('<') > -1) {
                            const [name, value] = a.split('<');
                            return (
                                <a
                                    className="text-blue-500"
                                    key={i}
                                    href={`mailto:${value.substring(
                                        0,
                                        value.length - 1
                                    )}`}
                                >
                                    {i + 1 !== authors.length
                                        ? `${trim(name)}, `
                                        : trim(name)}
                                </a>
                            );
                        } else if (a.indexOf('(@') > -1) {
                            const [name, value] = a.split('(@');
                            return (
                                <a
                                    key={i}
                                    href={`https://github.com/${value.substring(
                                        0,
                                        value.length - 1
                                    )}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {i + 1 !== authors.length
                                        ? `${trim(name)}, `
                                        : trim(name)}
                                </a>
                            );
                        }
                        return (
                            <span key={i}>
                                {i + 1 !== authors.length
                                    ? `${trim(a)}, `
                                    : trim(a)}
                            </span>
                        );
                    })}
                </div>
            </span>
            {/* <div className="ml-1 rounded-full border px-[7px] text-xs text-skin-text">
                Core
            </div> */}
        </div>
    );
};

export default Author
