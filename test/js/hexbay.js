// HEX Origin Contract
var hexOAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"data1","type":"uint256"},{"indexed":true,"internalType":"bytes20","name":"btcAddr","type":"bytes20"},{"indexed":true,"internalType":"address","name":"claimToAddr","type":"address"},{"indexed":true,"internalType":"address","name":"referrerAddr","type":"address"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"data1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"data2","type":"uint256"},{"indexed":true,"internalType":"address","name":"senderAddr","type":"address"}],"name":"ClaimAssist","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data0","type":"uint256"},{"indexed":true,"internalType":"address","name":"updaterAddr","type":"address"}],"name":"DailyDataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data0","type":"uint256"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"}],"name":"ShareRateChange","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"data1","type":"uint256"},{"indexed":true,"internalType":"address","name":"stakerAddr","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"}],"name":"StakeEnd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"data1","type":"uint256"},{"indexed":true,"internalType":"address","name":"stakerAddr","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"},{"indexed":true,"internalType":"address","name":"senderAddr","type":"address"}],"name":"StakeGoodAccounting","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data0","type":"uint256"},{"indexed":true,"internalType":"address","name":"stakerAddr","type":"address"},{"indexed":true,"internalType":"uint40","name":"stakeId","type":"uint40"}],"name":"StakeStart","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data0","type":"uint256"},{"indexed":true,"internalType":"address","name":"memberAddr","type":"address"},{"indexed":true,"internalType":"uint256","name":"entryId","type":"uint256"},{"indexed":true,"internalType":"address","name":"referrerAddr","type":"address"}],"name":"XfLobbyEnter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"data0","type":"uint256"},{"indexed":true,"internalType":"address","name":"memberAddr","type":"address"},{"indexed":true,"internalType":"uint256","name":"entryId","type":"uint256"},{"indexed":true,"internalType":"address","name":"referrerAddr","type":"address"}],"name":"XfLobbyExit","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"allocatedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"rawSatoshis","type":"uint256"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"},{"internalType":"address","name":"claimToAddr","type":"address"},{"internalType":"bytes32","name":"pubKeyX","type":"bytes32"},{"internalType":"bytes32","name":"pubKeyY","type":"bytes32"},{"internalType":"uint8","name":"claimFlags","type":"uint8"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint256","name":"autoStakeDays","type":"uint256"},{"internalType":"address","name":"referrerAddr","type":"address"}],"name":"btcAddressClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes20","name":"","type":"bytes20"}],"name":"btcAddressClaims","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes20","name":"btcAddr","type":"bytes20"},{"internalType":"uint256","name":"rawSatoshis","type":"uint256"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"btcAddressIsClaimable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes20","name":"btcAddr","type":"bytes20"},{"internalType":"uint256","name":"rawSatoshis","type":"uint256"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"btcAddressIsValid","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"claimToAddr","type":"address"},{"internalType":"bytes32","name":"claimParamHash","type":"bytes32"},{"internalType":"bytes32","name":"pubKeyX","type":"bytes32"},{"internalType":"bytes32","name":"pubKeyY","type":"bytes32"},{"internalType":"uint8","name":"claimFlags","type":"uint8"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"claimMessageMatchesSignature","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"currentDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"dailyData","outputs":[{"internalType":"uint72","name":"dayPayoutTotal","type":"uint72"},{"internalType":"uint72","name":"dayStakeSharesTotal","type":"uint72"},{"internalType":"uint56","name":"dayUnclaimedSatoshisTotal","type":"uint56"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"beginDay","type":"uint256"},{"internalType":"uint256","name":"endDay","type":"uint256"}],"name":"dailyDataRange","outputs":[{"internalType":"uint256[]","name":"list","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"beforeDay","type":"uint256"}],"name":"dailyDataUpdate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"globalInfo","outputs":[{"internalType":"uint256[13]","name":"","type":"uint256[13]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"globals","outputs":[{"internalType":"uint72","name":"lockedHeartsTotal","type":"uint72"},{"internalType":"uint72","name":"nextStakeSharesTotal","type":"uint72"},{"internalType":"uint40","name":"shareRate","type":"uint40"},{"internalType":"uint72","name":"stakePenaltyTotal","type":"uint72"},{"internalType":"uint16","name":"dailyDataCount","type":"uint16"},{"internalType":"uint72","name":"stakeSharesTotal","type":"uint72"},{"internalType":"uint40","name":"latestStakeId","type":"uint40"},{"internalType":"uint128","name":"claimStats","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"merkleLeaf","type":"bytes32"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"merkleProofIsValid","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"pubKeyX","type":"bytes32"},{"internalType":"bytes32","name":"pubKeyY","type":"bytes32"},{"internalType":"uint8","name":"claimFlags","type":"uint8"}],"name":"pubKeyToBtcAddress","outputs":[{"internalType":"bytes20","name":"","type":"bytes20"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"pubKeyX","type":"bytes32"},{"internalType":"bytes32","name":"pubKeyY","type":"bytes32"}],"name":"pubKeyToEthAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"stakerAddr","type":"address"}],"name":"stakeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"stakeIndex","type":"uint256"},{"internalType":"uint40","name":"stakeIdParam","type":"uint40"}],"name":"stakeEnd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"stakerAddr","type":"address"},{"internalType":"uint256","name":"stakeIndex","type":"uint256"},{"internalType":"uint40","name":"stakeIdParam","type":"uint40"}],"name":"stakeGoodAccounting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakeLists","outputs":[{"internalType":"uint40","name":"stakeId","type":"uint40"},{"internalType":"uint72","name":"stakedHearts","type":"uint72"},{"internalType":"uint72","name":"stakeShares","type":"uint72"},{"internalType":"uint16","name":"lockedDay","type":"uint16"},{"internalType":"uint16","name":"stakedDays","type":"uint16"},{"internalType":"uint16","name":"unlockedDay","type":"uint16"},{"internalType":"bool","name":"isAutoStake","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newStakedHearts","type":"uint256"},{"internalType":"uint256","name":"newStakedDays","type":"uint256"}],"name":"stakeStart","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"xfLobby","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"referrerAddr","type":"address"}],"name":"xfLobbyEnter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"memberAddr","type":"address"},{"internalType":"uint256","name":"entryId","type":"uint256"}],"name":"xfLobbyEntry","outputs":[{"internalType":"uint256","name":"rawAmount","type":"uint256"},{"internalType":"address","name":"referrerAddr","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"enterDay","type":"uint256"},{"internalType":"uint256","name":"count","type":"uint256"}],"name":"xfLobbyExit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"xfLobbyFlush","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"xfLobbyMembers","outputs":[{"internalType":"uint40","name":"headIndex","type":"uint40"},{"internalType":"uint40","name":"tailIndex","type":"uint40"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"memberAddr","type":"address"}],"name":"xfLobbyPendingDays","outputs":[{"internalType":"uint256[2]","name":"words","type":"uint256[2]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"beginDay","type":"uint256"},{"internalType":"uint256","name":"endDay","type":"uint256"}],"name":"xfLobbyRange","outputs":[{"internalType":"uint256[]","name":"list","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"}];
var hexOAddress = "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39";
var hexOContractObj = web3.eth.contract(hexOAbi);
var hexOContract = hexOContractObj.at(hexOAddress);

// HEX Test Contract
var hexTAbi = [ { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "beforeDay", "type": "uint256" } ], "name": "dailyDataUpdate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "data0", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "updaterAddr", "type": "address" } ], "name": "DailyDataUpdate", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "receiver", "type": "address" } ], "name": "mintHearts", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "data0", "type": "uint256" }, { "indexed": true, "internalType": "uint40", "name": "stakeId", "type": "uint40" } ], "name": "ShareRateChange", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "stakeIndex", "type": "uint256" }, { "internalType": "uint40", "name": "stakeIdParam", "type": "uint40" } ], "name": "stakeEnd", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "data0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "data1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "stakerAddr", "type": "address" }, { "indexed": true, "internalType": "uint40", "name": "stakeId", "type": "uint40" } ], "name": "StakeEnd", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "stakerAddr", "type": "address" }, { "internalType": "uint256", "name": "stakeIndex", "type": "uint256" }, { "internalType": "uint40", "name": "stakeIdParam", "type": "uint40" } ], "name": "stakeGoodAccounting", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "data0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "data1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "stakerAddr", "type": "address" }, { "indexed": true, "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "indexed": true, "internalType": "address", "name": "senderAddr", "type": "address" } ], "name": "StakeGoodAccounting", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "newStakedHearts", "type": "uint256" }, { "internalType": "uint256", "name": "newStakedDays", "type": "uint256" } ], "name": "stakeStart", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "data0", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "stakerAddr", "type": "address" }, { "indexed": true, "internalType": "uint40", "name": "stakeId", "type": "uint40" } ], "name": "StakeStart", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [], "name": "allocatedSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "currentDay", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "dailyData", "outputs": [ { "internalType": "uint72", "name": "dayPayoutTotal", "type": "uint72" }, { "internalType": "uint72", "name": "dayStakeSharesTotal", "type": "uint72" }, { "internalType": "uint56", "name": "dayUnclaimedSatoshisTotal", "type": "uint56" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "beginDay", "type": "uint256" }, { "internalType": "uint256", "name": "endDay", "type": "uint256" } ], "name": "dailyDataRange", "outputs": [ { "internalType": "uint256[]", "name": "list", "type": "uint256[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "globalInfo", "outputs": [ { "internalType": "uint256[9]", "name": "", "type": "uint256[9]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "globals", "outputs": [ { "internalType": "uint72", "name": "lockedHeartsTotal", "type": "uint72" }, { "internalType": "uint72", "name": "nextStakeSharesTotal", "type": "uint72" }, { "internalType": "uint40", "name": "shareRate", "type": "uint40" }, { "internalType": "uint72", "name": "stakePenaltyTotal", "type": "uint72" }, { "internalType": "uint16", "name": "dailyDataCount", "type": "uint16" }, { "internalType": "uint72", "name": "stakeSharesTotal", "type": "uint72" }, { "internalType": "uint40", "name": "latestStakeId", "type": "uint40" }, { "internalType": "uint128", "name": "claimStats", "type": "uint128" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "stakerAddr", "type": "address" } ], "name": "stakeCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "stakeLists", "outputs": [ { "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "internalType": "uint72", "name": "stakedHearts", "type": "uint72" }, { "internalType": "uint72", "name": "stakeShares", "type": "uint72" }, { "internalType": "uint16", "name": "lockedDay", "type": "uint16" }, { "internalType": "uint16", "name": "stakedDays", "type": "uint16" }, { "internalType": "uint16", "name": "unlockedDay", "type": "uint16" }, { "internalType": "bool", "name": "isAutoStake", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
var hexTAddress = "0xf1633e8d441f6f5e953956e31923f98b53c9fd89";
var hexTContractObj = web3.eth.contract(hexTAbi);
var hexTContract = hexTContractObj.at(hexTAddress);				// initiate contract for an address

var hexContract;
let currentAccount = "0x0";
let ref = smartRef();

// Bay Contract
var bayAbi = [ { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": true, "internalType": "address", "name": "referral", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "ReferralUsed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "indexed": false, "internalType": "uint72", "name": "stakedHearts", "type": "uint72" }, { "indexed": false, "internalType": "uint72", "name": "stakeShares", "type": "uint72" }, { "indexed": false, "internalType": "uint16", "name": "lockedDay", "type": "uint16" }, { "indexed": false, "internalType": "uint16", "name": "stakedDays", "type": "uint16" }, { "indexed": false, "internalType": "uint16", "name": "unlockedDay", "type": "uint16" }, { "indexed": true, "internalType": "address", "name": "seller", "type": "address" }, { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "priceHearts", "type": "uint256" } ], "name": "StakeBuy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "indexed": false, "internalType": "uint72", "name": "stakedHearts", "type": "uint72" }, { "indexed": false, "internalType": "uint72", "name": "stakeShares", "type": "uint72" }, { "indexed": false, "internalType": "uint16", "name": "lockedDay", "type": "uint16" }, { "indexed": false, "internalType": "uint16", "name": "stakedDays", "type": "uint16" }, { "indexed": false, "internalType": "uint16", "name": "unlockedDay", "type": "uint16" }, { "indexed": true, "internalType": "address", "name": "seller", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "priceHearts", "type": "uint256" } ], "name": "StakeForSale", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "indexed": false, "internalType": "uint256", "name": "newPriceHearts", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" } ], "name": "StakePriceChange", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" } ], "name": "StakeRevoke", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" } ], "name": "StakeTransfer", "type": "event" }, { "constant": false, "inputs": [], "name": "collectDevPayout", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getSalesList", "outputs": [ { "internalType": "uint40[]", "name": "", "type": "uint40[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "smallPayDay", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "internalType": "uint256", "name": "priceHearts", "type": "uint256" } ], "name": "stakeBuy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "internalType": "uint256", "name": "newPriceHearts", "type": "uint256" } ], "name": "stakeChangePrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "stakerAddr", "type": "address" } ], "name": "stakeCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint40", "name": "", "type": "uint40" } ], "name": "stakeData", "outputs": [ { "internalType": "address", "name": "stakeOwner", "type": "address" }, { "internalType": "uint256", "name": "stakeIndexUser", "type": "uint256" }, { "internalType": "uint256", "name": "stakeIndexContract", "type": "uint256" }, { "internalType": "bool", "name": "stakeTransferred", "type": "bool" }, { "internalType": "uint256", "name": "stakeIndexTrade", "type": "uint256" }, { "internalType": "uint256", "name": "stakePrice", "type": "uint256" }, { "internalType": "bool", "name": "isForSale", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "stakeIndexUser", "type": "uint256" }, { "internalType": "uint40", "name": "stakeId", "type": "uint40" } ], "name": "stakeEnd", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "stakeIdList", "outputs": [ { "internalType": "uint40", "name": "", "type": "uint40" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "stakerAddr", "type": "address" } ], "name": "stakeList", "outputs": [ { "internalType": "uint40[]", "name": "", "type": "uint40[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint40", "name": "stakeId", "type": "uint40" } ], "name": "stakeRevoke", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "internalType": "uint256", "name": "priceHearts", "type": "uint256" } ], "name": "stakeSell", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "newStakedHearts", "type": "uint256" }, { "internalType": "uint256", "name": "newStakedDays", "type": "uint256" }, { "internalType": "address", "name": "referral", "type": "address" } ], "name": "stakeStart", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint40", "name": "stakeId", "type": "uint40" }, { "internalType": "address", "name": "receiver", "type": "address" } ], "name": "stakeTransfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ];
var bayAddress = "0x70be97f6653e8a17b26823392e7651fdd56ef201";
var bayContractObject = web3.eth.contract(bayAbi);				// creation of contract object
var bayContract = bayContractObject.at(bayAddress);				// initiate contract for an address

// Running on the page, in the browser
if (typeof window.ethereum !== 'undefined') {
	console.log('MetaMask is installed!');
	web3 = new Web3("https://ropsten.infura.io/v3/f5cd3e76211e43799e0ab59d6b4dc61b");
} else {
	// get Ethereum Provider
	console.log('No Web3 Detected... using HTTP Provider');
	window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f5cd3e76211e43799e0ab59d6b4dc61b"));
}

function setHexContract() {
	hexContract = hexTContract;
}

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/

// Normally, we would recommend the 'eth_chainId' RPC method, but it currently
// returns incorrectly formatted chain ID values.
let currentChainId = ethereum.chainId;
setHexContract();

ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  console.log("Chain Changed");
  currentChainId = ethereum.chainId;
  setHexContract();
  //window.location.reload();
}

/**********************************************************/
/* Handle user accounts and accountsChanged, per EIP 1193 */
/**********************************************************/


ethereum
  .request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
  });


// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
ethereum.on('accountsChanged', handleAccountsChanged)

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged (accounts) {
	console.log("Account changed");
	console.log("Current address: " + currentAccount);

	if (accounts.length === 0) {
		// MetaMask is locked or the user has not connected any accounts
		console.log('Please connect to MetaMask.');
		currentAccount = "0x0";
		
		resetData();
	} else if (accounts[0] !== currentAccount) {
		currentAccount = accounts[0]
		// Run any other necessary logic...
		console.log("New Address: " + currentAccount);
		
		resetData();
		update();
	} else {		
		resetData();
		update();
	}
}

/***********************************/
/* Handle connecting, per EIP 1102 */
/***********************************/

// You should only attempt to connect in response to user interaction,
// such as a button click. Otherwise, you're popup-spamming the user
// like it's 1999.
// If you can't retrieve the user's account(s), you should encourage the user
// to initiate a connection attempt.
document.getElementById('btnConnect').addEventListener("click", connect);

function connect() {
	console.log("Connect button clicked");

	ethereum
    .request({ method: 'eth_requestAccounts' })
	//.then(function(result) {console.log(result)})
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
}