/*
 * Copyright ConsenSys Software Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file, You can obtain one at
 *
 * http://mozilla.org/MPL/2.0/
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * SPDX-License-Identifier: MPL-2.0
 */
pragma solidity ^0.6.8;

import "./EventEmitter.sol";

contract CrossContractReader {
    uint256 counter;

    event NewEventEmitter(address contractAddress);

    function read(address emitter_address) public view returns (uint256) {
        EventEmitter em = EventEmitter(emitter_address);
        return em.value();
    }

    function deploy() public {
        EventEmitter em = new EventEmitter();
        emit NewEventEmitter(address(em));
    }

    function deployRemote(address crossAddress) public {
        CrossContractReader cross = CrossContractReader(crossAddress);
        cross.deploy();
    }

    function increment() public {
        counter++;
    }

    function incrementRemote(address crossAddress) public {
        CrossContractReader cross = CrossContractReader(crossAddress);
        cross.increment();
    }

    function destroy() public {
        selfdestruct(msg.sender);
    }

    function remoteDestroy(address crossAddress) public {
        CrossContractReader cross = CrossContractReader(crossAddress);
        cross.destroy();
    }
}
