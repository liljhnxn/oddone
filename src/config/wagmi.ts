import { http, createConfig, injected } from 'wagmi';
import { botchainMainnet, botchainTestnet } from './chain';

export const wagmiConfig = createConfig({
  chains: [botchainMainnet, botchainTestnet],
  connectors: [
    injected(),
  ],
  transports: {
    [botchainMainnet.id]: http('https://rpc.botchain.ai'),
    [botchainTestnet.id]: http('https://rpc.bohr.life'),
  },
  ssr: true,
});
