import { initVanillaRegistryProcessor } from './validatorRegistryProcessor.js';
import { initPreconfManagerProcessor } from './preconfManagerProcessor.js';
import { initSettlementGatewayProcessor } from './settlementBridgeProcessor.js';
import { initL1GatewayProcessor } from './l1GatwayProcessor.js';
import { initOracleProcessor } from './oracleProcessor.js';
import { GLOBAL_CONFIG } from '@sentio/runtime';
GLOBAL_CONFIG.execution = {
  skipStartBlockValidation: true,
};

function main() {
  // Holesky contract events
  initVanillaRegistryProcessor();
  initL1GatewayProcessor();
  // mev-commit chain contract events
  initPreconfManagerProcessor();
  initSettlementGatewayProcessor();
  initOracleProcessor();
}

main();