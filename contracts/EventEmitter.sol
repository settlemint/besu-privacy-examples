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

contract EventEmitter {
    address owner;
    event stored(address _to, uint256 _amount);
    address _sender;
    uint256 _value;

    constructor() public {
        owner = msg.sender;
    }

    function store(uint256 _amount) public {
        emit stored(msg.sender, _amount);
        _value = _amount;
        _sender = msg.sender;
    }

    function value() public view returns (uint256) {
        return _value;
    }

    function sender() public view returns (address) {
        return _sender;
    }
}
