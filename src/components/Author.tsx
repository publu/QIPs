import React from 'react';
import { flow, trim, split, uniq, map } from 'lodash/fp';

interface Props {
    author: string;
    showName?: Boolean;
}

const Author: React.FC<Props> = ({ author, showName }) => {
    const authors = flow(split(','), map(trim), uniq)(author);

    return (
        <div className="flex flex-nowrap items-center space-x-1">
            <span className="w-full cursor-pointer truncate text-skin-link">
                <div className="flex">
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
                                    <div className="flex">
                                        <img
                                            src={`https://github.com/${trim(
                                                name
                                            )}.png`}
                                            className="rounded-full bg-skin-border object-cover"
                                            alt="avatar"
                                            style={{
                                                width: '25px',
                                                height: '25px',
                                                minWidth: '20px',
                                            }}
                                        />

                                        {showName && (
                                            <span className="ml-2 ">
                                                {i + 1 !== authors.length
                                                    ? `${trim(name)}, `
                                                    : trim(name)}
                                            </span>
                                        )}
                                    </div>
                                </a>
                            );
                        } else if (a.indexOf('(@') > -1) {
                            const [name, value] = a.split('(@');
                            return (
                                <a
                                    className="mr-1"
                                    key={i}
                                    href={`https://github.com/${value.substring(
                                        0,
                                        value.length - 1
                                    )}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <div className="flex space-x-3">
                                        <img
                                            src={`https://github.com/${trim(
                                                name
                                            )}.png`}
                                            className="rounded-full bg-skin-border object-cover"
                                            alt="avatar"
                                            style={{
                                                width: '25px',
                                                height: '25px',
                                                minWidth: '20px',
                                            }}
                                        />
                                        {showName && <span className="ml-2 ">
                                            {i + 1 !== authors.length
                                                ? `${trim(name)}, `
                                                : trim(name)}
                                        </span>}
                                    </div>
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

export default Author;
