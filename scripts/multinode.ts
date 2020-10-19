import { Web3 } from '@nomiclabs/buidler';
import EEAClient from 'web3-eea';
import dotenv from 'dotenv';
import EventEmitterArtifact from '../artifacts/EventEmitter.json';
import terminalLink from 'terminal-link';
import chalk from 'chalk';

dotenv.config();

function logHeader(message: string){
  console.log(
    chalk.green.bold(`
${'#'.repeat(message.length+8)}
##  ${message}  ##
${'#'.repeat(message.length+8)}

`)
  );
}

function logStep(message?: string){
  console.log(
    `  ${message}`
  );
}

function y(message?: string){
  return chalk.yellowBright(message)
}

function l(message: string, link: string){
  return terminalLink(message,link)
}

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

  const node1 = process.env.NODE1_ORION_PUBLIC_KEY ?? 'xxx'
  const node2 = process.env.NODE2_ORION_PUBLIC_KEY?? 'xxx'
  const node3 = process.env.NODE3_ORION_PUBLIC_KEY?? 'xxx'

  const user1 = process.env.USER1_ADDRESS ?? '0x0'
  const user1Private = process.env.USER1_PRIVATE_KEY ?? '0x0'

  const user2 = process.env.USER2_ADDRESS ?? '0x0'
  const user2Private = process.env.USER2_PRIVATE_KEY ?? '0x0'

  const user3 = process.env.USER3_ADDRESS ?? '0x0'
  const user3Private = process.env.USER3_PRIVATE_KEY ?? '0x0'


  // Deploy private emitter contract for
  logHeader(`Deploying EventEmitter from NODE 1 private for NODE 2`)

  logStep(`1. Deploying EventEmitter from ${y(node1)} for ${y(JSON.stringify([node2]))}`);

  const transactionHash = await web3Node1.eea.sendRawTransaction({
    data: EventEmitterArtifact.bytecode,
    privateFrom: node1,
    privateFor: [node2],
    privateKey: user1Private,
  });

  logStep(`2. Fetching the transaction receipt for ${y(l(transactionHash,`https://${process.env.CONSORTIUM_EXPLORER}/tx/${transactionHash}`))} from ${y('NODE 1')}`);

  const transactionReceipt = await web3Node1.priv.getTransactionReceipt(
    transactionHash,
    node1
  );

  logStep(`3. Contract deployed at ${y(transactionReceipt?.contractAddress ?? 'NOT FOUND')}`);

  logStep(`4. Fetching the transaction receipt for ${y(
    l(
      transactionHash,
      `https://${process.env.CONSORTIUM_EXPLORER}/tx/${transactionHash}`
    )
  )} from ${y('NODE 2')}`
  );

  const transactionReceipt2 = await web3Node2.priv.getTransactionReceipt(
    transactionHash,
    node2
  );

  logStep(`5. Tx receipt from ${y(
    'NODE 2'
  )} found and reports contract deployed at ${y(
      transactionReceipt2?.contractAddress ?? 'NOT FOUND'
    )}`
  );

  logStep(`6. Fetching the transaction receipt for ${y(
    l(
      transactionHash,
      `https://${process.env.CONSORTIUM_EXPLORER}/tx/${transactionHash}`
    )
  )} from ${y('NODE 3')}`
  );

  const transactionReceipt3 = await web3Node3.priv.getTransactionReceipt(
    transactionHash,
    node3
  );

  logStep(`7. Tx receipt from ${y(
    'NODE 3'
  )} found and reports contract deployed at ${y(
      transactionReceipt3?.contractAddress ?? 'NOT FOUND'
    )}`
  );

  logHeader(`Send and receive messages between NODE 1 and NODE 2, invisible to NODE 3`)

  logStep(`1. Store value '5000' from NODE 1`)

  const contract = new web3Node1.eth.Contract(EventEmitterArtifact.abi as any);
  // @ts-ignore
  const functionAbi = contract._jsonInterface.find(e => {
    return e.name === "store";
  });
  const functionArgs = web3Node1.eth.abi
    .encodeParameters(functionAbi!.inputs!, [5000])
    .slice(2);


  const storeTransactionHash = await web3Node1.eea
    .sendRawTransaction({
      to: transactionReceipt!.contractAddress!,
      data: (functionAbi as any).signature + functionArgs,
      privateFrom: node1,
      privateFor: [node2],
      privateKey: user1Private
    })

    logStep(`2. Fetching the transaction receipt for ${y(l(storeTransactionHash,`https://${process.env.CONSORTIUM_EXPLORER}/tx/${transactionHash}`))} from ${y('NODE 1')}`);

    const storeTransactionReceipt = await web3Node1.priv.getTransactionReceipt(
      storeTransactionHash,
      node1
    );

    logStep(`3. Event emitted: ${y(JSON.stringify(storeTransactionReceipt!.logs[0].data))}`);


    logStep(`4. Get value from ${y('NODE 1')}`);

    // @ts-ignore
    const functionAbiValue = contract._jsonInterface.find(e => {
      return e.name === "value";
    });
    const valueNode1TxHash = await web3Node1.eea.sendRawTransaction({
      to: transactionReceipt!.contractAddress!,
      data: (functionAbiValue as any).signature,
      privateFrom:node1,
      privateFor:[node2],
      privateKey: user1Private
    })
    const valueNode1 = await web3Node1.priv.getTransactionReceipt(
      valueNode1TxHash,
      node1)

      console.log(valueNode1)


    logStep(`5. Value from ${y('NODE 1')}: ${web3Node1.utils.toBN(valueNode1!.output!).toString()}`);

    logStep(`6. Get value from ${y('NODE 2')}`);

    const valueNode2TxHash = await web3Node2.eea.sendRawTransaction({
      to: transactionReceipt!.contractAddress!,
      data: (functionAbiValue as any).signature,
      privateFrom:node2,
      privateFor:[node1],
      privateKey: user2Private
    })
    const valueNode2 = await web3Node2.priv.getTransactionReceipt(
      valueNode2TxHash,
      node2)

      console.log(valueNode2)

    logStep(`7. Value from ${y('NODE 2')}: ${web3Node2.utils.toBN(valueNode2!.output!).toString()}`);

    logStep(`8. Get value from ${y('NODE 3')}`);

    const valueNode3TxHash = await web3Node3.eea.sendRawTransaction({
      to: transactionReceipt!.contractAddress!,
      data: (functionAbiValue as any).signature,
      privateFrom:node3,
      privateFor:[node1],
      privateKey: user3Private
    })
    const valueNode3 = await web3Node3.priv.getTransactionReceipt(
      valueNode3TxHash,
      node3)

    logStep(`9. Value from ${y('NODE 3')}: ${web3Node3.utils.toBN(valueNode3!.output!).toString()}`);

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
