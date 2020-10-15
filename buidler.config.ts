import { task, usePlugin } from '@nomiclabs/buidler/config';
import { BuidlerConfig } from '@nomiclabs/buidler/config';

usePlugin('@nomiclabs/buidler-waffle');
usePlugin('@nomiclabs/buidler-web3');
usePlugin('@nomiclabs/buidler-solhint');
usePlugin('buidler-typechain');

task('accounts', 'Prints the list of accounts', async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

const config: BuidlerConfig = {
  solc: {
    version: '0.6.8',
  },
  typechain: {
    outDir: 'types',
    target: 'web3-v1',
  },
};

export default config;
