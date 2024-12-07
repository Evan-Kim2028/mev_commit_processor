import { EthChainId, EthContext } from "@sentio/sdk/eth";
import { VanillaRegistryProcessor } from './types/eth/vanillaregistry.js';

const GLOBAL_CONFIG: any = {};
GLOBAL_CONFIG.execution = {
  skipStartBlockValidation: true,
};

export function initVanillaRegistryProcessor() {
  VanillaRegistryProcessor.bind({
    address: '0x87D5F694fAD0b6C8aaBCa96277DE09451E277Bcf', // validator registry contract on holesky - https://docs.primev.xyz/v0.7.0/developers/testnet#validator-registry-contract-addresses-holesky
    network: EthChainId.METIS,
    startBlock: 2146241
  })
    .onEventStaked(async (event, ctx: EthContext) => {
      ctx.eventLogger.emit('Staked', {
        amount: event.args.amount.toString(),
        valBLSPubKey: event.args.valBLSPubKey,
        msgSender: event.args.msgSender,
        withdrawalAddress: event.args.withdrawalAddress
      });
    })
    .onEventStakeWithdrawn(async (event, ctx: EthContext) => {
      ctx.eventLogger.emit('StakeWithdrawn', {
        amount: event.args.amount.toString(),
        valBLSPubKey: event.args.valBLSPubKey,
        msgSender: event.args.msgSender,
        withdrawalAddress: event.args.withdrawalAddress
      });
    })
    .onEventUnstaked(async (event, ctx: EthContext) => {
      ctx.eventLogger.emit('Unstaked', {
        amount: event.args.amount.toString(),
        valBLSPubKey: event.args.valBLSPubKey,
        msgSender: event.args.msgSender,
        withdrawalAddress: event.args.withdrawalAddress
      });
    })
    .onEventMinStakeSet(async (event, ctx: EthContext) => {
      ctx.eventLogger.emit('MinStakeSet', {
        minStake: event.args.newMinStake.toString(),
        amount: event.args.msgSender
      });
    });
}
