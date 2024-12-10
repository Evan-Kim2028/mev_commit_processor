import { EthChainId, EthContext } from "@sentio/sdk/eth";
import { L1GatewayProcessor } from './types/eth/l1gateway.js';
import { TransferFinalizedEvent, TransferInitiatedEvent } from './types/eth/internal/L1Gateway.js';

export function initL1GatewayProcessor() {
  L1GatewayProcessor.bind({
    address: '0x1C2a592950E5dAd49c0E2F3A402DCF496bdf7b67', // L1Gatway contract on Holesky
    network: EthChainId.HOLESKY,
    startBlock: 2146241
  })
    .onEventTransferFinalized(async (event: TransferFinalizedEvent, ctx: EthContext) => {
      ctx.eventLogger.emit('l1gatway_transfer_finalized', {
        counterpartyIdx: event.args.counterpartyIdx.toString(),
        amount: event.args.amount.toString(),
        recipient: event.args.recipient,
      });
    })
    .onEventTransferInitiated(async (event: TransferInitiatedEvent, ctx: EthContext) => {
      ctx.eventLogger.emit('l1gatway_transfer_initiated', {
        sender: event.args.sender,
        recipient: event.args.recipient,
        amount: event.args.amount.toString(),
        transferIdx: event.args.transferIdx.toString(),
      });
    })
}
