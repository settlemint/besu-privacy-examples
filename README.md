# Besu Privacy Example
This repo explains how you can create private transactions using Besu with Orion in the SettleMint platform.

### Prerequisite
- Create a besu consortium in SettleMint BpaaS.
- Create 3 besu deployments in SettleMint BpaaS.
- The Chain ID and Consortium ID will be available in Consortium detail page.
- The ORION_PUBLIC_KEY for all the 3 nodes will also be available in the consortium detail page, so that other nodes can send private transactions to your node.
- The JSON RPC address for a node will be displayed in the deployment detail page of the respective nodes.
- User addresses - example USER1_ADDRESS and the corresponding private key USER1_PRIVATE_KEY are randomly generated address/ private key pair.


## 1. Create a .env file

```env
CHAINID=<Chain ID>

CONSORTIUM_EXPLORER=<Consortium ID>.settlemint.com

USER1_ADDRESS=0x1337cc4748Cf5C2f63C9572101201d1041485062
USER1_PRIVATE_KEY=xxx

USER2_ADDRESS=0x1337982d28939EAC2058eBd794e1191bd148659e
USER2_PRIVATE_KEY=xxx

USER3_ADDRESS=0x1337703bE11F276d2C17fB0A2C376F104C456D43
USER3_PRIVATE_KEY=xxx

NODE1_JSONRPC=https://<Domain ID NODE 1>.settlemint.com/f526ff8b/besu
NODE1_ORION_PUBLIC_KEY="<Privacy Public Key NODE 1>"

NODE2_JSONRPC=https://<Domain ID NODE 2>.settlemint.com/1283ffa9/besu
NODE2_ORION_PUBLIC_KEY="<Privacy Public Key NODE 2>"

NODE3_JSONRPC=https://<Domain ID NODE 3>.settlemint.com/ce3afb45/besu
NODE3_ORION_PUBLIC_KEY="<Privacy Public Key NODE 3>"
```

## 2. Compile the contracts

This will generate an artificats folder
```
yarn compile
```

To force buidler to re-compile
```
yarn compile --force
```


## 3. Run the example

```sh
yarn example:multinode
```

## 4. Expected output
- Node 1 and Node 2 can both see the contract deployed, whereas Node 3 can't.
- Node 1 and Node 2 both see the common value 5000 whereas Node 3 which is not part of the transaction gets 0.
![Output](output.png)
