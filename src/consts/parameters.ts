import { createThirdwebClient, getContract } from "thirdweb";
import { ethereum, polygonAmoy } from "thirdweb/chains";

/** Change these values to configure the application for your own use. **/

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID,
});

export const nftContract = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  address: "0x4E7fa5e94B130e218bC049c450e3150EfDa66BA9",
  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  chain: polygonAmoy,
  client,
});

// The block explorer you want to use (Opens when user clicks on history of events. i.e. transfers)
export const blockExplorer = "https://etherscan.io";
