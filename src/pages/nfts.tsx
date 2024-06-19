import { Footer } from "@/components/Nav/Footer";
import { Header } from "@/components/Nav/Header";
import { NFTCard } from "@/components/NFTCard";
import { nftContract } from "@/consts/parameters";
import useDebounce from "@/hooks/useDebounce";
import { SearchIcon } from "@/icons/SearchIcon";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NFT } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFTs, totalSupply } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";

function NFTs() {
  const nftsPerPage = 30;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);

  const { data: nfts, isLoading } = useReadContract(getNFTs, {
    contract: nftContract,
    count: nftsPerPage,
    start: (page - 1) * nftsPerPage,
  });

  const { data: totalCount } = useReadContract(totalSupply, {
    contract: nftContract,
  });

  const { data: contractMetadata, isLoading: contractLoading } = useReadContract(getContractMetadata, {
    contract: nftContract,
  });

  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = nfts?.filter(nft => 
        nft.metadata.attributes?.some(attr => 
          attr.trait_type === "barcode" && attr.value === debouncedSearchTerm
        )
      ) || [];
      setFilteredNFTs(filtered);
    } else {
      setFilteredNFTs([]);
    }
  }, [debouncedSearchTerm, nfts]);

  return (
    <div className="m-0 bg-[#f1f1f1] p-0 font-inter text-black">
        <Header />
        <Helmet>
            <title>{contractMetadata?.name}</title>
        </Helmet>

        <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-4">
            {contractMetadata ? (
            <div className="mb-8 text-center">
                <img className="mx-auto mt-10 -mb-11" width={472} src="/logotipo.png" />
                {/* <h1 className="text-4xl font-bold text-black">
                {contractMetadata.name}
                </h1> */}
                <h2 className="text-xl font-bold text-black">
                {contractMetadata.description}
                </h2>
            </div>
            ) : contractLoading ? (
            <div className="mx-auto mb-8 text-center">
                <div className="mx-auto h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
                <div className="mx-auto mt-4 h-8 w-96 animate-pulse rounded-lg bg-gray-800" />
            </div>
            ) : null}

            <div className="mx-auto mb-8 flex h-12 w-96 max-w-full items-center rounded-lg border border-black/10 bg-black/10 px-4 text-xl text-black">
            <SearchIcon />
            <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Búsqueda por código de barras"
                className="w-full bg-transparent px-4 text-black text-sm focus:outline-none"
            />
            </div>

            {debouncedSearchTerm && isLoading && (
            <div className="mx-auto !h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
            )}

            {debouncedSearchTerm && !isLoading && filteredNFTs.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-8">
                {filteredNFTs.map(nft => (
                <NFTCard nft={nft} key={nft.id.toString()} />
                ))}
            </div>
            ) : null}

            {!debouncedSearchTerm && nfts && (
            <div className="flex flex-wrap items-center justify-center gap-8">
                {nfts.map(nft => (
                <NFTCard nft={nft} key={nft.id.toString()} />
                ))}
            </div>
            )}

            {!debouncedSearchTerm && (
            <Footer
                page={page}
                setPage={setPage}
                nftsPerPage={nftsPerPage}
                totalCount={totalCount ? Number(totalCount) : undefined}
                loading={isLoading}
            />
            )}
        </div>
    </div>
  );
}

export default NFTs;
