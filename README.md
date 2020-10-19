# Besu Privacy Example

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

## 2. Run the example

```sh
yarn example:multinode
```
