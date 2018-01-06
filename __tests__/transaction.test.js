const { chain, wallet } = require('../index');
const w = wallet();
const c = chain();

const { PRIVATE_KEY_1 } = require('../config');

describe('X-Action - #create() ', () => {
  it('should create a transaction', () => {

    const expiration = new Date(new Date().getTime() + (1 * 60000)).toISOString().split('.')[0]; //"2018-01-09T10:28:49"
    const messages = [{
      authorization: [{ account: 'initb', permission: 'active' }],
      code: 'currency',
      data: '',
      type: 'transfer',
    }];
    const read_scope = [];
    const scope = ["inita", "initb"];

    // get last block num
    c.get_info()
    .then(info => {
      const ref_block_num = info.last_irreversible_block_num

      // get info on that block.
      c.get_block(ref_block_num)
      .then(b => {
        const ref_block_prefix = b.ref_block_prefix;

        // get abi_json_to_bin
        c.abi_json_to_bin("currency", "transfer", { from: "initb", to: "inita", quantity: 0.1 })
        .then(bin => {
          // set data in message
          messages[0].data = bin.binargs;

          // get signature
          w.wallet_sign_trx([{
              ref_block_num,
              ref_block_prefix,
              expiration,
              scope,
              read_scope,
              messages,
            },
            [PRIVATE_KEY_1],
            ''
          ])
          .then(sig => {
            // push the transaction
            c.push_transaction(expiration, messages, read_scope, ref_block_num, ref_block_prefix, scope, sig.signatures )
            .then(xAction => {
              expect(xAction).toBeDefined()
              expect(xAction.transaction_id).toBeDefined()
              expect(xAction.processed).toBeDefined()
              expect(xAction.processed.ref_block_num).toBeDefined()
              expect(xAction.processed.ref_block_prefix).toBeDefined()
            })
            .catch(e => {
              console.log('eee ', e);
            }) // push xaction
          }) // get sig
          .catch(e => console.error('get sig err ', e.response.text))
        }) // abi
      }) // get block
    }) // get info
  }) // it
}) // define
