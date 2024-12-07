import { initVanillaRegistryProcessor } from './validatorRegistryProcessor.js';
import { initPreconfManagerProcessor } from './preconfManagerProcessor.js';
// import { initVanillaTestProcessor } from './vanillaTestProcessor.js';



function main() {
  // Holesky contract events
  initVanillaRegistryProcessor();
  // mev-commit chain contract events
  // initPreconfManagerProcessor();

  // test holesky import
  // initVanillaTestProcessor();
}

main();