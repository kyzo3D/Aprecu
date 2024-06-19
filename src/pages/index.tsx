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
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
	IconArrowWaveRightUp,
	IconBoxAlignRightFilled,
	IconBoxAlignTopLeft,
	IconClipboardCopy,
	IconFileBroken,
	IconSignature,
	IconTableColumn,
  } from "@tabler/icons-react";
import { BrowserView, MobileView } from "react-device-detect";

function App() {
  const nftsPerPage = 30;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [buttonClicked, setButtonClicked] = useState(false)

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
    <>
      <BrowserView>
        {!buttonClicked &&
        <div className="h-screen m-0 bg-[#f1f1f1] p-0 font-inter text-black">
          <Header />
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="mt-10 inline-block max-w-lg text-center justify-center">
              <h1 className="text-4xl font-black">Trabajamos por la defensa y salvaguarda del sector cuchillero&nbsp;</h1>
            </div>

            <div className="mt-10 flex gap-3">
              <button
                onClick={() => setButtonClicked(true)}
                className="rounded-2xl bg-black px-5 py-3 dark:bg-slate-100 text-white dark:text-slate-900 font-bold"
                >
                Acceder a la app
              </button>
              <button
                className="rounded-2xl border border-black px-5 py-3 dark:border-slate-100 text-black dark:text-slate-100 font-bold"
                >
                Web APRECU
              </button>
            </div>
          </section>
        </div>
        }
        {buttonClicked &&
          <>
            <Header />
            <div className="w-10/12 mx-auto grid grid-cols-3 gap-5">
              <div className="p-5 shadow-xl rounded-3xl">
                <img className="rounded-xl shadow-xl shadow-black/20" alt="productos" src="/1.png" />
                <p className="text-xl font-bold mt-5">Productos</p>
                <div className="flex w-full">
                  <p className="w-2/3 justify-start text-md">Añadir y gestionar mis productos.</p>
                  <button className="w-1/3 justify-end bg-black rounded-xl text-white px-3 py-1">
                    <a href="/nfts">
                      Ir a productos
                    </a>
                  </button>
                </div>
              </div>
              <div className="p-5 shadow-xl rounded-3xl">
                <img className="rounded-xl shadow-xl shadow-black/20" alt="productos" src="/2.png" />
                <p className="text-xl font-bold mt-5">Métricas</p>
                <div className="flex w-full">
                  <p className="w-2/3 justify-start text-md">Visitas a tus productos.</p>
                  <button className="w-1/3 justify-end bg-black rounded-xl text-white px-3 py-1">
                    <a href="/metrics">
                      Ir a métricas
                    </a>
                  </button>
                </div>
              </div>
              <div className="p-5 shadow-xl rounded-3xl">
                <img className="rounded-xl shadow-xl shadow-black/20" alt="productos" src="/3.png" />
                <p className="text-xl font-bold mt-5">Ayuda</p>
                <div className="flex w-full">
                  <p className="w-2/3 justify-start text-md">Contacta con soporte.</p>
                  <button className="w-1/3 justify-end bg-black rounded-xl text-white px-3 py-1">
                    <a href="/ayuda">
                      Ir a ayuda
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      </BrowserView>
      <MobileView>
        {!buttonClicked &&
        <div className="h-screen m-0 bg-[#f1f1f1] p-0 font-inter text-black">
          <Header />
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="mt-10 inline-block max-w-lg text-center justify-center">
              <h1 className="mx-4 text-4xl font-black">Trabajamos por la defensa y salvaguarda del sector cuchillero&nbsp;</h1>
            </div>
            <div className="mt-10">
              <button
                onClick={() => setButtonClicked(true)}
                className="w-full mb-5 rounded-2xl bg-black px-5 py-3 dark:bg-slate-100 text-white dark:text-slate-900 font-bold"
                >
                Acceder a la app
              </button>
              <button
                className="w-full rounded-2xl border border-black px-5 py-3 dark:border-slate-100 text-black dark:text-slate-100 font-bold"
                >
                Web APRECU
              </button>
            </div>
          </section>
        </div>
        }
        {buttonClicked &&
          <>
            <Header />
            <div className="w-10/12 mx-auto mt-5">
              <div className="my-5 p-5 shadow-xl rounded-3xl">
                <img className="rounded-xl shadow-xl shadow-black/20" alt="productos" src="/1.png" />
                <p className="text-xl font-bold mt-5">Productos</p>
                <div className="w-full">
                  <p className="w-full justify-start text-md">Añadir y gestionar mis productos.</p>
                  <button className="mt-3 w-full justify-end bg-black rounded-xl text-white px-3 py-1">
                    <a href="/nfts">
                      Ir a productos
                    </a>
                  </button>
                </div>
              </div>
              <div className="mb-5 p-5 shadow-xl rounded-3xl">
                <img className="rounded-xl shadow-xl shadow-black/20" alt="productos" src="/2.png" />
                <p className="text-xl font-bold mt-5">Métricas</p>
                <div className="w-full">
                  <p className="w-full justify-start text-md">Visitas a tus productos.</p>
                  <button className="mt-3 w-full justify-end bg-black rounded-xl text-white px-3 py-1">
                    <a href="/metrics">
                      Ir a métricas
                    </a>
                  </button>
                </div>
              </div>
              <div className="mb-5 p-5 shadow-xl rounded-3xl">
                <img className="rounded-xl shadow-xl shadow-black/20" alt="productos" src="/3.png" />
                <p className="text-xl font-bold mt-5">Ayuda</p>
                <div className="w-full">
                  <p className="w-full justify-start text-md">Contacta con soporte.</p>
                  <button className="mt-3 w-full justify-end bg-black rounded-xl text-white px-3 py-1">
                    <a href="/ayuda">
                      Ir a ayuda
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </>
        }

      </MobileView>
    </>
  );
}

export default App;