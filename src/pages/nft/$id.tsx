import { HistoryCard } from "@/components/HistoryCard";
import { Header } from "@/components/Nav/Header";
import { PoweredBy } from "@/components/PoweredBy";
import { client, nftContract } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import {
  MediaRenderer,
  useContractEvents,
  useReadContract,
} from "thirdweb/react";
import { getNFT, transferEvent } from "thirdweb/extensions/erc721";
import { getContractMetadata } from "thirdweb/extensions/common";

const NFTPage = () => {
  const { id } = useParams();
  const { data: nft, isLoading } = useReadContract(getNFT, {
    contract: nftContract,
    tokenId: BigInt(id as string),
  });
  const { data: contractMetadata } = useReadContract(getContractMetadata, {
    contract: nftContract,
  });
  const { data: eventsData, isLoading: eventsLoading } = useContractEvents({
    contract: nftContract,
    events: [
      transferEvent({
        tokenId: BigInt(id as string),
      }),
    ],
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-0 min-h-screen bg-[#f0f0f0] p-0 font-inter text-black">
      <Header />

      <Helmet>
        <title>{nft?.metadata.name}</title>
      </Helmet>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 md:flex-row">
        <div className="flex flex-col px-10 md:min-h-screen md:w-2/5">
          {nft ? (
            <MediaRenderer
              client={client}
              src={nft?.metadata.image}
              className="!md:h-96 !md:w-96 !h-full !max-h-[600px] !w-full !max-w-[600px] !rounded-lg"
            />
          ) : (
            isLoading && (
              <div className="h-full max-h-[600px] w-full !max-w-[600px] animate-pulse rounded-lg bg-white md:h-96 md:w-96" />
            )
          )}

          {eventsData && eventsData?.length > 0 ? (
            <p className="mt-8 hidden text-lg font-semibold uppercase text-black md:flex">
              Historial
            </p>
          ) : (
            isLoading && (
              <div className="mt-8 hidden h-8 w-1/2 animate-pulse rounded-lg bg-white md:flex" />
            )
          )}

          {eventsLoading ? (
            <div className="mt-2 hidden h-8 w-1/2 animate-pulse rounded-lg bg-white md:flex" />
          ) : (
            <div className="mt-4 hidden flex-col gap-4 md:flex">
              {eventsData?.map((event) => (
                <HistoryCard event={event} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex w-full flex-col gap-6 px-10 md:mt-0 md:min-h-screen md:w-3/5">
          <div className="flex flex-col">
            {/* {contractMetadata?.name ? (
              <p className="text-lg font-semibold uppercase text-black">
                collection
              </p>
            ) : (
              isLoading && (
                <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-white" />
              )
            )}

            {isLoading ? (
              <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-white" />
            ) : (
              <p className="text-3xl font-bold text-black">
                {contractMetadata?.name}
              </p>
            )} */}
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-semibold uppercase text-black">
              {/* #{id} */}
            </p>

            {nft?.metadata.name ? (
              <p className="text-3xl font-bold text-black">
                {String(nft?.metadata.name).split("#")[0]}
              </p>
            ) : (
              isLoading && (
                <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-white" />
              )
            )}
          </div>

          {/* <div className="flex flex-col">
            {nft?.owner ? (
              <p className="text-lg font-semibold uppercase text-black">
                CURRENT OWNER
              </p>
            ) : (
              isLoading && (
                <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-white" />
              )
            )}

            {isLoading ? (
              <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-white" />
            ) : (
              <p className="text-3xl font-bold text-black">
                {nft?.owner ? truncateAddress(nft?.owner!) : "N/A"}
              </p>
            )}
          </div> */}

          {nft?.metadata.description ? (
            <p className="text-xl font-bold underline underline-offset-8 text-black">
              Descripción
            </p>
          ) : (
            isLoading && (
              <div className="mt-8 h-8 w-1/2 animate-pulse rounded-lg bg-white" />
            )
          )}

          {isLoading ? (
            <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-white" />
          ) : (
            <p className="text-lg font-medium text-black">
              {nft?.metadata.description}
            </p>
          )}

          <div className="mt-4 w-full flex flex-col gap-4">
            {nft?.metadata.attributes &&
              // @ts-ignore
              nft?.metadata.attributes.length > 0 && (
                <>
                  {isLoading ? (
                    <div className="mt-2 h-8 w-1/2 animate-pulse rounded-lg bg-white" />
                  ) : (
                    <p className="text-xl font-bold underline underline-offset-8 text-black">
                      Características
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4">
                    {/* @ts-ignore */}
                    {nft?.metadata.attributes?.map(
                      (attr: { trait_type: string; value: string }) => (
                        <div className="bg-white shadow-lg shadow-black/20 flex flex-col rounded-2xl border border-gray-700 p-4">
                          <h2 className="text-sm font-extrabold underline underline-offset-4 uppercase text-black">
                            {attr.trait_type}
                          </h2>
                          <h1 className="flex mt-4 text-xl font-medium text-black">
                            {attr.value.split("-").map((x) => 
                              <div className="bg-white px-1 rounded-md border border-black/20 mx-0.5">
                                {x}
                              </div>
                            )}
                          </h1>
                        </div>
                      ),
                    )}
                  </div>
                </>
              )}

            {eventsData && eventsData?.length > 0 ? (
              <p className="mt-8 flex text-lg font-semibold uppercase text-[#646D7A] md:hidden">
                Historial
              </p>
            ) : (
              isLoading && (
                <div className="mt-8 flex h-8 w-1/2 animate-pulse rounded-lg bg-white md:hidden" />
              )
            )}

            {eventsLoading ? (
              <div className="mt-2 flex h-8 w-1/2 animate-pulse rounded-lg bg-white md:hidden" />
            ) : (
              <div className="mt-4  flex flex-col gap-4 md:hidden">
                {eventsData?.map((event) => (
                  <HistoryCard event={event} />
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto md:mb-40 md:w-full">
            <PoweredBy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
