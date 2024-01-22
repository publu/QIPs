import React from 'react';
import Author from './Author';
// Template list item component
const TemplateListItem = (props: any) => {
    const { templates } = props;

    return (
        <div className="template-lists mb-15">
            {templates.map((template: any, index: number) => {
                return (
                    <div className="border-y border-skin-border bg-skin-block-bg text-base md:rounded-xl md:border transition-colors mb-3">
                        <div className="leading-5 sm:leading-6">
                            <div>
                                <div className="block p-3 text-skin-text sm:p-4">
                                    <div>
                                        <div className="flex h-[26px] items-start justify-between">
                                            <div className="flex items-center gap-1">
                                                <div className="flex">
                                                    <button
                                                        id="headlessui-popover-button-15"
                                                        type="button"
                                                        aria-expanded="false"
                                                        data-headlessui-state
                                                    >
                                                        <div
                                                            className="whitespace-nowrap"
                                                            tabIndex={-1}
                                                        >
                                                            <div className="flex flex-nowrap items-center space-x-1">
                                                                <span className="w-full cursor-pointer truncate text-skin-link">
                                                                    <div className="flex">
                                                                        <span>
                                                                            {
                                                                                template?.frontmatter?.author || "<Author Name>"
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                            <span className="bg-[#f6cf62] State text-white p-[2px] px-[8px] rounded-[14px] font-normal">
                                                {template?.frontmatter?.title ||
                                                    'Some Title'}
                                            </span>
                                        </div>
                                        <a
                                            href={`https://github.com/publu/QIPs/blob/main/contents/Templates/${template?.parent?.base}`}
                                            className="cursor-pointer"
                                        >
                                            <div className="relative flex mb-1 mt-3 break-words pr-[80px] leading-[32px]">
                                                <h3 className="inline pr-2">
                                                    QIP{' '}
                                                    {template?.frontmatter
                                                        ?.qip !== undefined &&
                                                    template?.frontmatter
                                                        ?.qip !== null
                                                        ? template.frontmatter.qip
                                                              .toString()
                                                              .padStart(3, '0')
                                                        : '<to be assigned>'}
                                                    :{' '}
                                                    {template?.frontmatter
                                                        ?.title ||
                                                        '<QIP title>'}
                                                </h3>
                                            </div>
                                            <p className="line-clamp-2 break-words text-md font-semibold" />
                                        </a>
                                        <div />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TemplateListItem;
