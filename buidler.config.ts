import { usePlugin } from '@nomiclabs/buidler/config';
import { BuidlerConfig } from '@nomiclabs/buidler/config';

usePlugin('@nomiclabs/buidler-waffle');
usePlugin('@nomiclabs/buidler-web3');
usePlugin('@nomiclabs/buidler-solhint');
usePlugin('buidler-typechain');

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
