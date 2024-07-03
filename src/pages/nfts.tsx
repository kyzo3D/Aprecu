import React, { useEffect, useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";
import Quagga from '@ericblade/quagga2';
import { Footer } from "@/components/Nav/Footer";
import { Header } from "@/components/Nav/Header";
import { NFTCard } from "@/components/NFTCard";
import { nftContract } from "@/consts/parameters";
import useDebounce from "@/hooks/useDebounce";
import { SearchIcon } from "@/icons/SearchIcon";
import { NFT } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFTs, totalSupply } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";

function NFTs() {
  const nftsPerPage = 30;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [scanning, setScanning] = useState(false);
  const [scannerReady, setScannerReady] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);

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
          attr.trait_type === "codigos_de_barras" && attr.value === debouncedSearchTerm
        )
      ) || [];
      setFilteredNFTs(filtered);
    } else {
      setFilteredNFTs([]);
    }
  }, [debouncedSearchTerm, nfts]);

  const initializeScanner = useCallback(() => {
    if (!scannerRef.current) {
      console.error("Scanner container not found");
      return;
    }

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment",
            aspectRatio: { min: 1, max: 2 },
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: navigator.hardwareConcurrency ? Math.min(navigator.hardwareConcurrency, 4) : 2,
        decoder: {
          readers: ["ean_reader", "upc_reader"],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("Error initializing Quagga:", err);
          setScanning(false);
          return;
        }
        console.log("Quagga initialization succeeded");
        setScannerReady(true);
        Quagga.start();
      }
    );
  }, []);

  const startScanner = useCallback(() => {
    setScanning(true);
  }, []);

  const stopScanner = useCallback(() => {
    if (scanning) {
      console.log("Stopping Quagga");
      Quagga.stop();
      setScannerReady(false);
    }
    setScanning(false);
  }, [scanning]);

  useEffect(() => {
    let mounted = true;

    if (scanning && !scannerReady && scannerRef.current) {
      console.log("Initializing scanner...");
      initializeScanner();
    }

    if (scanning) {
      Quagga.onDetected((result) => {
        if (mounted && result.codeResult.code) {
          setSearch(result.codeResult.code);
          stopScanner();
        }
      });
    }

    // return () => {
    //   mounted = false;
    //   if (scanning) {
    //     console.log("Cleaning up: stopping Quagga");
    //     Quagga.offDetected();
    //     Quagga.stop();
    //   }
    // };
  }, [scanning, scannerReady, initializeScanner, stopScanner]);

  return (
    <div className="m-0 bg-[#f1f1f1] p-0 font-inter text-black">
      <Header />
      <Helmet>
        <title>{contractMetadata?.name}</title>
      </Helmet>

      <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-4">
        {contractMetadata ? (
          <div className="mb-8 text-center">
            <img className="mx-auto mt-10 -mb-11" width={472} src="/logotipo.png" alt="Logo" />
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

        <div className="mx-auto mb-8 flex h-12 w-96 max-w-full items-center rounded-xl border border-black/10 bg-black/10 px-1 text-xl text-black">
          <div className="ml-2 md:mr-7 flex">
            <SearchIcon />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Busca por código de barras"
              className="w-full bg-transparent px-4 text-black text-sm focus:outline-none"
              />
          </div>
          <button
            onClick={scanning ? stopScanner : startScanner}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
          >
            {scanning ? "Detener" : "Escanear"}
          </button>
        </div>

        {scanning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl">
              <div ref={scannerRef} className="rounded-xl w-64 h-72" />
              <button
                onClick={stopScanner}
                className="backdrop-blur-md mt-4 px-4 py-2 bg-black/20 w-full text-white"
              >
                Atrás
              </button>
            </div>
          </div>
        )}

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
