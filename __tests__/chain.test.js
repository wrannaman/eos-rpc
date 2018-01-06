const { chain } = require('../index');
const c = chain();

describe('CHAIN - #get_info() ', () => {
  it('should load chain info', () => {
    c.get_info()
    .then(res => {
      expect(res).toBeDefined()
      expect(res.server_version).toBeDefined()
      expect(res.head_block_num).toBeDefined()
      expect(res.last_irreversible_block_num).toBeDefined()
      expect(res.head_block_id).toBeDefined()
      expect(res.head_block_time).toBeDefined()
      expect(res.head_block_producer).toBeDefined()
      expect(res.recent_slots).toBeDefined()
      expect(res.participation_rate).toBeDefined()
    })
  })
})

describe('CHAIN - #get_block() ', () => {
  it('should load block info', () => {
    const BLOCK = 4;
    c.get_block(BLOCK)
    .then(res => {
      expect(res).toBeDefined()
      expect(res.previous).toBeDefined()
      expect(res.timestamp).toBeDefined()
      expect(res.transaction_merkle_root).toBeDefined()
      expect(res.producer).toBeDefined()
      expect(res.producer_changes).toBeDefined()
      expect(res.producer_signature).toBeDefined()
      expect(res.cycles).toBeDefined()
      expect(res.id).toBeDefined()
      expect(res.block_num).toBe(BLOCK)
      expect(res.ref_block_prefix).toBeDefined()
    })
  })
})

describe('CHAIN - #get_block() ', () => {
  it('should load block info', () => {
    const BLOCK = 4;
    c.get_block(BLOCK)
    .then(res => {
      expect(res).toBeDefined()
      expect(res.previous).toBeDefined()
      expect(res.timestamp).toBeDefined()
      expect(res.transaction_merkle_root).toBeDefined()
      expect(res.producer).toBeDefined()
      expect(res.producer_changes).toBeDefined()
      expect(res.producer_signature).toBeDefined()
      expect(res.cycles).toBeDefined()
      expect(res.id).toBeDefined()
      expect(res.block_num).toBe(BLOCK)
      expect(res.ref_block_prefix).toBeDefined()
    })
  })
})

describe('CHAIN - #get_account() ', () => {
  it('should load account info', () => {
    const ACCOUNT = 'inita';
    c.get_account(ACCOUNT)
    .then(res => {
      expect(res).toBeDefined()
      expect(res.account_name).toBe(ACCOUNT)
      expect(res.eos_balance).toBeDefined()
      expect(res.staked_balance).toBeDefined()
      expect(res.unstaking_balance).toBeDefined()
      expect(res.last_unstaking_time).toBeDefined()
      expect(res.permissions).toBeDefined()
    })
  })
})

describe('CHAIN - #get_code() ', () => {
  it('should load contract code', () => {
    const ACCOUNT_NAME = 'currency';
    c.get_code(ACCOUNT_NAME)
    .then(res => {
      expect(res).toBeDefined()
      expect(res.account_name).toBeDefined()
      expect(res.account_name).toBe(ACCOUNT_NAME)
      expect(res.code_hash).toBeDefined()
      expect(res.abi).toBeDefined()
      expect(res.wast).toBeDefined()
    })
    .catch(e => {
      console.log('eee ', e.message);
    })
  })
})

describe('CHAIN - #get_table_rows() ', () => {
  it('should load table rows', () => {
    c.get_table_rows('inita', 'currency', 'account', true)
    .then(res => {
      expect(res).toBeDefined()
      expect(res.rows).toBeDefined()
      expect(res.rows[0].key).toBe('account')
      expect(res.rows[0].balance).toBeDefined()
    })
    .catch(e => {
      console.log('eee ', e.message);
    })
  })
})

describe('CHAIN - #abi_json_to_bin() ', () => {
  it('should load bin', () => {
    c.abi_json_to_bin('currency', 'transfer', { from:'initb', to:'initc', quantity: 10 })
    .then(res => {
      expect(res).toBeDefined()
      expect(res.binargs).toBeDefined()
      expect(res.required_scope).toBeDefined()
      expect(res.required_auth).toBeDefined()
    })
    .catch(e => {
      console.log('eee ', e);
    })
  })
})

describe('CHAIN - #get_required_keys() ', () => {
  it('should load required keys', () => {
    const transaction = {
      ref_block_num: '100',
      ref_block_prefix: '137469861',
      expiration: '2017-09-25T06:28:49',
      scope: [
        'initb',
        'initc'
      ],
      messages :[{
        code: 'currency',
        type: 'transfer',
        recipients: ['initb', 'initc'],
        authorization:[{
          account: 'initb',
          permission: 'active'
        }],
        data: '000000000041934b000000008041934be803000000000000'
      }],
      signatures:[],
      authorizations:[]
    }
    const available_keys = [
      'EOS4toFS3YXEQCkuuw1aqDLrtHim86Gz9u3hBdcBw5KNPZcursVHq',
      'EOS7d9A3uLe6As66jzN8j44TXJUqJSK3bFjjEEqR4oTvNAB3iM9SA',
      'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
    ]
    c.get_required_keys(available_keys, transaction)
    .then(res => {
      expect(res).toBeDefined()
      expect(res.required_keys).toBeDefined()
    })
    .catch(e => {
      console.log('eee ', e);
    })
  })
})
