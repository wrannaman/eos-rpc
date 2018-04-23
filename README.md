[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# EOS RPC API for Node

Feature complete [EOS RPC API](https://eosio.github.io/eos/group__eosiorpc.html) for node.


## To test
The tests are under the assumption you have followed the initial install from [EOS](https://github.com/EOSIO/eos)
Add a config.js file with  your private keys

`module.exports = {
  PRIVATE_KEY_1: 'xx' ,
  PRIVATE_KEY_INITA: 'xx',
  DEFAULT_WALLET_PRIVATE_KEY: 'xx',
}`

`$ npm test`

## Useage

See the [EOS RPC API docs](https://eosio.github.io/eos/group__eosiorpc.html).

```js
let { chain, wallet } = require('eos-rpc')
chain = chain('host', 'chain_port')
wallet = wallet('host', 'wallet_port')
```

or for local development
```js
let { chain, wallet } = require('eos-rpc')
// Host defaults to 127.0.0.1, chain_port: 8888, wallet_port: 8888
chain = chain()
wallet = wallet()
```

## API

All calls are Promisified. 
### Chain
#### `chain.get_info()`
#### `chain.get_block(block_num_or_id)`
#### `chain.get_account(account_name)`
#### `chain.get_code(account_name)`
#### `chain.get_table_rows(scope, code, table, json)`
#### `chain.abi_json_to_bin(code, action, args)`
#### `chain.get_required_keys(available_keys, transaction)`
#### `chain.push_transaction(expiration, messages, read_scope = [], ref_block_num, ref_block_prefix, scope, signatures)`
#### `chain.push_transactions(xActions)`

### Wallet 
#### `wallet.create(name)`
If the create fails, try putting an extra set of quotes like ```await wallet.create('"default"')```
#### `wallet.open(name)`
#### `wallet.lock(name)`
#### `wallet.lock_all(name)`
#### `wallet.unlock(name, privateKey)`
#### `wallet.import_key(name, privateKey)`
#### `wallet.list()`
#### `wallet.list_keys()`
#### `wallet.get_public_keys()`
#### `wallet.set_timeout(timeout)`
#### `wallet.wallet_sign_trx(timeout)`
