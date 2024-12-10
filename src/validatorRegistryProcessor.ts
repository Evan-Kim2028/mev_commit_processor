import { EthChainId, EthContext } from "@sentio/sdk/eth";
import { VanillaRegistryProcessor } from './types/eth/vanillaregistry.js';


export function initVanillaRegistryProcessor() {
  VanillaRegistryProcessor.bind({
    address: '0x87D5F694fAD0b6C8aaBCa96277DE09451E277Bcf', // validator registry contract on holesky - https://docs.primev.xyz/v0.7.0/developers/testnet#validator-registry-contract-addresses-holesky
    network: EthChainId.HOLESKY,
    startBlock: 2146241
  })
    .onEventStaked(async (event, ctx: EthContext) => {
      ctx.eventLogger.emit('vanilla_registry_staked', {
        amount: event.args.amount.toString(),
        valBLSPubKey: event.args.valBLSPubKey,
        msgSender: event.args.msgSender,
        withdrawalAddress: event.args.withdrawalAddress
      });
    })
    .onEventStakeWithdrawn(async (event, ctx: EthContext) => {
      ctx.eventLogger.emit('vanilla_registry_stake_withdrawn', {
        amount: event.args.amount.toString(),
        valBLSPubKey: event.args.valBLSPubKey,
        msgSender: event.args.msgSender,
        withdrawalAddress: event.args.withdrawalAddress
      });
    })
    .onEventUnstaked(async (event, ctx: EthContext) => {
      ctx.eventLogger.emit('vanilla_registry_unstaked', {
        amount: event.args.amount.toString(),
        valBLSPubKey: event.args.valBLSPubKey,
        msgSender: event.args.msgSender,
        withdrawalAddress: event.args.withdrawalAddress
      });
    })
    .onEventMinStakeSet(async (event, ctx: EthContext) => {
      ctx.eventLogger.emit('vanilla_registry_min_stake_set', {
        minStake: event.args.newMinStake.toString(),
        amount: event.args.msgSender
      });
    });
}
