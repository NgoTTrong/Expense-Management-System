import React from "react";
type Props = {
    title: string;
    info: {
        key: string;
        value: string;
    }[];
};
const InfoSection = ({ title, info }: Props) => {
    return (
        <section className="rounded-lg shadow-[0px_0px_6px_0px_rgba(0,_20,_21,_0.14)] flex flex-col gap-[12px] p-[1rem] bg-white">
            <h1 className="text-sm font-[600]">{title}</h1>
            {info.map((value) => {
                return (
                    <div className="flex flex-col gap-[12px]" key={value.key}>
                        <hr className="bg-[#E9EBED]" />
                        <div className="text-sm w-full flex items-center justify-between">
                            <span className="text-[#8F9499]">{value.key}</span>
                            <span className="text-[#36383A] text-end">
                                {value.value}
                            </span>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default InfoSection;
