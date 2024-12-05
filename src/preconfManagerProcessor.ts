import { EthChainId } from "@sentio/sdk/eth";
import { PreconfManagerProcessor } from './types/eth/preconfmanager.js';

export function initPreconfManagerProcessor() {
    PreconfManagerProcessor.bind({
    address: '0xa254D1A10777e358B0c2e945343664c7309A0D9d',  // settlement contract on mev-commit chain
    network: EthChainId.METIS   // overwrite metis chainID for mev-commit data
  })
    .onEventUnopenedCommitmentStored(async (event, ctx) => {
      ctx.eventLogger.emit('UnopenedCommitmentStored', {
        commitmentDigest: event.args.commitmentDigest,
        commitmentIndex: event.args.commitmentIndex,
        committer: event.args.committer,
        commitmentSignature: event.args.commitmentSignature,
        dispatchTimestamp: event.args.dispatchTimestamp
      });
    });
}
