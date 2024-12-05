import { initVanillaRegistryProcessor } from './validatorRegistryProcessor.js';
import { initPreconfManagerProcessor } from './preconfManagerProcessor.js';

function main() {
  // Holesky contract events
  initVanillaRegistryProcessor();
  // mev-commit chain contract events
  initPreconfManagerProcessor();
}

main();