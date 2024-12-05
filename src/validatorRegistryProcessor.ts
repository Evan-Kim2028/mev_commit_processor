import { EthChainId } from "@sentio/sdk/eth";
import { VanillaRegistryProcessor } from './types/eth/vanillaregistry.js';

export function initVanillaRegistryProcessor() {
  VanillaRegistryProcessor.bind({
    address: '0x87D5F694fAD0b6C8aaBCa96277DE09451E277Bcf',
    // network: EthChainId.METIS, // overwrite Metis network with mev-commit testnet chain id in sentio.yaml
    network: EthChainId.HOLESKY
  })
    .onEventStakeAdded(async (event, ctx) => {
      ctx.eventLogger.emit('StakeAdded', {
        amount: event.args.amount.toString(),
        valBLSPubKey: event.args.valBLSPubKey,
        msgSender: event.args.msgSender,
        withdrawalAddress: event.args.withdrawalAddress,
        newBalance: event.args.newBalance,
      });
    });
}
