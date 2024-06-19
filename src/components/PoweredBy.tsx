import { nftContract } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import type { FC } from "react";

export const PoweredBy: FC = () => {
  return (
    <a
      href={`https://thirdweb.com/${nftContract.chain.id}/${nftContract.address}`}
      target="_blank"
      rel="noreferrer"
      className="mr-4 flex max-w-[200px] cursor-pointer items-center justify-center gap-3 rounded-lg bg-white/5 px-4 py-2 shadow-2xl md:ml-auto"
    >
      <img
        className="h-auto w-14 object-contain"
        src="/logo.svg"
        alt="thirdweb"
      />
      <div className="flex flex-col">
        <p className="text-xs font-semibold text-black">
          {truncateAddress(nftContract.address)}
        </p>
        <p className="text-[10px] font-bold text-black">
          cedido por APRECU
        </p>
      </div>
    </a>
  );
};
