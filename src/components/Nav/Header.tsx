import { client, nftContract } from "@/consts/parameters";
import { useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Link } from "react-router-dom";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT } from "thirdweb/extensions/erc721";
import { ConnectButton, useReadContract } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";

export const Header: React.FC = () => {
  
  const [docs, setDocs] = useState(false);

  const { data: firstNFT, isLoading: nftLoading } = useReadContract(getNFT, {
    contract: nftContract,
    tokenId: 1n,
  });
  const { data: contractMetadata, isLoading: contractLoading } =
    useReadContract(getContractMetadata, {
      contract: nftContract,
    });
    const wallets = [
      inAppWallet({
        auth: {
          options: [
            "apple",
            "facebook",
            "google",
            "email",
          ],
        },
      }),
    ];
  return (
    <>
      <BrowserView>
        <header className="mx-auto mb-12 flex w-full items-center justify-between p-4">
          <Link to="/">
            <div className="flex items-center space-x-4">
              {contractLoading ? (
                <>
                  <div className="h-14 w-14 animate-pulse rounded-full bg-gray-800" />
                  <div className="h-4 w-40 animate-pulse rounded-md bg-gray-800" />
                </>
              ) : (
                <>
                  <img
                    className="h-auto w-11 md:w-28 object-contain"
                    src={"/logo.svg"}
                    alt={"APRECU"}
                  />
                  <p className="pl-1 text-xs font-medium md:font-normal md:text-lg">
                    <a href="/">
                      Inicio
                    </a>
                  </p>
                  <button onClick={() => location.assign("/nfts")} className="text-xs font-medium md:font-normal md:text-lg">
                    Productos
                  </button>
                  <button onClick={() => location.assign("/documentacion")} className="text-xs font-medium md:font-normal md:text-lg">
                    Documentos
                  </button>
                </>
              )}
            </div>
          </Link>
          <div className="md:h-auto md:max-w-xs">
            <ConnectButton wallets={wallets} connectButton={{ label: "Entrar", style: { color:"white", fontWeight: 700 }}} locale="es_ES" client={client} theme="light" />
          </div>
        </header>
      </BrowserView>
      <MobileView>
        <div className="w-full">
          <Link to="/">
            <img
              className="p-4 pt-11 w-2/3 mx-auto h-auto"
              src={"/logo.svg"}
              alt={"APRECU"}
              />
          </Link>
        </div>
        <div className="w-full flex justify-center my-5">
          <button onClick={() => location.assign("/")} className="px-3 text-xl font-medium">
            Inicio
          </button>
          <button onClick={() => location.assign("/nfts")} className="px-3 text-xl font-medium">
            Productos
          </button>
          <button onClick={() => location.assign("/documentacion")} className="px-3 text-xl font-medium">
            Documentos
          </button>
        </div>
        <center>
          <button onClick={() => location.assign("/administracion")} className="py-2 rounded-xl mb-5 border w-4/5 border-black px-3 text-xl font-medium">
            Administración
          </button>
        </center>
        <div className="h-auto w-full">
          <center>
            <ConnectButton wallets={wallets} connectButton={{ label: "Entrar", style: { color:"white", fontWeight: 700, width: "328px" }}} locale="es_ES" client={client} theme="light" />
          </center>
        </div>
      </MobileView>
    </>
  );
};
