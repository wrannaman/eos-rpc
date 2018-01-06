const { wallet } = require('../index');
const w = wallet();

const { DEFAULT_WALLET_PRIVATE_KEY, PRIVATE_KEY_INITA } = require('../config');

const WALLET_NAME = String(Date.now())
let WALLET_PASSWORD = '';

const WALLET_2 = `${String(Date.now())}233`
let WALLET_2_PASSWORD = '';


beforeAll(() => {
  return w.create(WALLET_2)
  .then(res => {
    return WALLET_2_PASSWORD = res;
  })
});


describe('WALLET - #create() ', () => {
  it('should create a wallet', () => {
    w.create(WALLET_NAME)
    .then(res => {
      WALLET_PASSWORD = res;
      expect(res).toBeDefined()
      expect(res).toBeTruthy();
    })
    .catch(e => {
      console.log('wallet_create e ', e);
    })
  })
})

describe('WALLET - #open() ', () => {
  it('should open a wallet', () => {
    w.open(WALLET_NAME)
    .then(res => {
      expect(res).toBeDefined()
      expect(res).toBeTruthy();
      expect(res).toEqual({});
    })
    .catch(e => {
      console.log('open e ', e);
    })
  })
})

describe('WALLET - #lock() ', () => {
  it('should lock a wallet', () => {
    w.lock(WALLET_NAME)
    .then(res => {
      expect(res).toBeDefined()
      expect(res).toBeTruthy();
      expect(res).toEqual({});
    })
    .catch(e => {
      console.log('lock e ', e);
    })
  })
})

describe('WALLET - #lock_all() ', () => {
  it('should lock all wallets', () => {
    w.lock_all(WALLET_NAME)
    .then(res => {
      expect(res).toBeDefined()
      expect(res).toBeTruthy();
      expect(res).toEqual({});
    })
    .catch(e => {
      console.log('lock_all e ', e);
    })
  })
})

describe('WALLET- #unlock', () => {
  const name =  `${WALLET_NAME}1`
  let password = '';
  it('should unlock a wallet', () => {
    w.create(name)
    .then(res => {
      password = res;
      expect(res).toBeDefined()
      expect(res).toBeTruthy();

      /* Now lock it */
      w.lock(name)
      .then(res => {
        expect(res).toBeDefined()
        expect(res).toBeTruthy();
        expect(res).toEqual({});


        /* Now unlock it */
        w.unlock(name, password)
        .then(res => {
          expect(res).toBeDefined()
          expect(res).toBeTruthy();
          expect(res).toEqual({});
        })
        .catch(e => {
          console.log('unlock e ', e.response.body);
        })
      })
      .catch(e => {
        console.log('lock_all e ', e);
      })
    })
    .catch(e => {
      console.log('wallet_create e ', e);
    })
  })
})

describe('WALLET - #list', () => {
  it('should list all wallets', () => {
    w.list()
    .then(res => {
      expect(res).toBeDefined()
      expect(Array.isArray(res)).toEqual(true);
    })
    .catch(e => {
      console.log('lock_all e ', e);
    })
  })
})

describe('WALLET - #list_keys', () => {
  it('should list all wallets', () => {
    w.list_keys()
    .then(res => {
      expect(res).toBeDefined()
      expect(Array.isArray(res)).toEqual(true);
    })
    .catch(e => {
      console.log('lock_all e ', e);
    })
  })
})

describe('WALLET - #get_public_keys', () => {
  it('should list all public keys', () => {
    w.get_public_keys()
    .then(res => {
      expect(res).toBeDefined()
      expect(Array.isArray(res)).toEqual(true);
    })
    .catch(e => {
      console.log('lock_all e ', e);
    })
  })
})

describe('WALLET - #wallet_set_timeout', () => {
  it('should set timeout', () => {
    w.set_timeout(1)
    .then(res => {
      expect(res).toBeDefined()
      expect(res).toEqual({});
    })
    .catch(e => {
      console.log('lock_all e ', e);
    })
  })
})


describe('WALLET - #wallet_sign_trx', () => {
  it('should set wallet timeout', () => {
    w.unlock("default", DEFAULT_WALLET_PRIVATE_KEY)
    .then(res => {
      const ref_block_num = 21453;
      const ref_block_prefix = 3165644999;
      const expiration = new Date().toISOString().split('.')[0]; //"2018-01-09T10:28:49"
      const scope = ["initb","initc"];
      const read_scope = [];

      const d = [{
        ref_block_num,
        ref_block_prefix,
        expiration,
        scope,
        read_scope,
        messages:[{
          code:"currency",
          type:"transfer",
          authorization:[{
            account:"initb",
            permission:"active"
          }],
          data:"000000008093dd74000000000094dd74e803000000000000"}],
          signatures:[]
        },
        ["EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"],
        ""
      ];
      w.wallet_sign_trx(d)
      .then(res => {
        expect(res).toBeDefined()
        expect(res.ref_block_num).toEqual(ref_block_num);
        expect(res.expiration).toEqual(expiration);
        expect(res.expiration).toEqual(expiration);
        expect(Array.isArray(res.messages)).toEqual(true);
        expect(res.signatures).toBeDefined()
        expect(Array.isArray(res.signatures)).toEqual(true);
      })
      .catch(e => {
        console.log('wallet_sign_trx e ', e.response.text);
      })
    })
    .catch(e => {
      console.log('e ', e.response.text);
    })
  })
})

describe('WALLET - #import_key', () => {
  it('should import a key', () => {
    w.unlock('inita', PRIVATE_KEY_INITA)
    .then(res => {
      expect(res).toBeDefined()
      expect(res).toBeTruthy();
      expect(res).toEqual({});
      w.import_key('inita', PRIVATE_KEY_INITA)
      .then(res => {
        console.log('RES', res)
        expect(res).toBeDefined()
        expect(res).toEqual({});
      })
      .catch(e => {
        console.log('lock_all e ', e);
      })
    })
    .catch(e => {
      console.log('unlock e ', e.response.body);
    })
  })
})
