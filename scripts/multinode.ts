import { Web3 } from '@nomiclabs/buidler';
import EEAClient from 'web3-eea';
import dotenv from 'dotenv';
import EventEmitterArtifact from '../artifacts/EventEmitter.json';
import terminalLink from 'terminal-link';
import chalk from 'chalk';

dotenv.config();

async function main() {
  const web3Node1 = new EEAClient(
    new Web3(process.env.NODE1_JSONRPC),
    parseInt(process.env.CHAINID ?? '1337', 10)
  );
  const web3Node2 = new EEAClient(
    new Web3(process.env.NODE2_JSONRPC),
    parseInt(process.env.CHAINID ?? '1337', 10)
  );
  const web3Node3 = new EEAClient(
    new Web3(process.env.NODE3_JSONRPC),
    parseInt(process.env.CHAINID ?? '1337', 10)
  );

  // Deploy private emitter contract for

  console.log(
    chalk.green.bold(`
#####################################################################
## Deploying EventEmitter from NODE 1 private for NODE 2           ##
#####################################################################

`)
  );

  console.log(
    `  1. Deploying EventEmitter from ${chalk.yellowBright(
      process.env.NODE1_ORION_PUBLIC_KEY
    )} for ${chalk.yellowBright(
      JSON.stringify([process.env.NODE2_ORION_PUBLIC_KEY])
    )}`
  );

  const transactionHash = await web3Node1.eea.sendRawTransaction({
    data: EventEmitterArtifact.bytecode,
    privateFrom: process.env.NODE1_ORION_PUBLIC_KEY ?? 'xxx',
    privateFor: [process.env.NODE2_ORION_PUBLIC_KEY ?? 'xxx'],
    privateKey: process.env.USER1_PRIVATE_KEY ?? 'xxx',
  });

  console.log(
    `
  2. Fetching the transaction receipt for ${chalk.yellowBright(
    terminalLink(
      transactionHash,
      `https://${process.env.CONSORTIUM_EXPLORER}/tx/${transactionHash}`
    )
  )} from ${chalk.yellowBright('NODE 1')}`
  );

  const transactionReceipt = await web3Node1.priv.getTransactionReceipt(
    transactionHash,
    process.env.NODE1_ORION_PUBLIC_KEY ?? 'xxx'
  );

  console.log(
    `
  3. Contract deployed at ${chalk.yellowBright(
    transactionReceipt?.contractAddress
  )}`
  );

  console.log(
    `
  4. Fetching the transaction receipt for ${chalk.yellowBright(
    terminalLink(
      transactionHash,
      `https://${process.env.CONSORTIUM_EXPLORER}/tx/${transactionHash}`
    )
  )} from ${chalk.yellowBright('NODE 2')}`
  );

  const transactionReceipt2 = await web3Node2.priv.getTransactionReceipt(
    transactionHash,
    process.env.NODE2_ORION_PUBLIC_KEY ?? 'xxx'
  );

  console.log(transactionReceipt2);

  console.log(
    `
  5. Tx receipt from ${chalk.yellowBright(
    'NODE '
  )} found and reports contract deployed at ${chalk.yellowBright(
      transactionReceipt2?.contractAddress
    )}`
  );

  console.log(
    `
  6. Fetching the transaction receipt for ${chalk.yellowBright(
    terminalLink(
      transactionHash,
      `https://${process.env.CONSORTIUM_EXPLORER}/tx/${transactionHash}`
    )
  )} from ${chalk.yellowBright('NODE 3')}`
  );

  const transactionReceipt3 = await web3Node3.priv.getTransactionReceipt(
    transactionHash,
    process.env.NODE3_ORION_PUBLIC_KEY ?? 'xxx'
  );

  console.log(transactionReceipt3);

  console.log(
    `
  7. Tx receipt from ${chalk.yellowBright(
    'NODE 2'
  )} found and reports contract deployed at ${chalk.yellowBright(
      transactionReceipt2?.contractAddress
    )}`
  );

  console.log(
    chalk.green.bold(`
#####################################################################
## Store value from NODE 1                                         ##
#####################################################################

`)
  );
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
