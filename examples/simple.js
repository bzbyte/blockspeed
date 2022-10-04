import eth from 'k6/x/ethereum';

const client = new eth.Client({
    url: 'http://localhost:10002',
    // You can also specify a private key here
    // privateKey: 'private key of your account',
    // or a mnemonic
    // mnemonic: 'my mnemonic'
});

// You can use an existing premined account
const root_address = "0x85da99c8a7c2c95964c8efd687e95e632fc533d6"

export function setup() {
  return { nonce: client.getNonce(root_address) };
}

export default function (data) {
  console.log(`nonce => ${data.nonce}`);
  const gas = client.gasPrice();
  console.log(`gas price => ${gas}`);

  const bal = client.getBalance(root_address, client.blockNumber());
  console.log(`bal => ${bal}`);
  
  const tx = {
    to: "0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF",
    value: Number(0.0001 * 1e18),
    gas_price: gas,
    nonce: data.nonce,
  };
  
  const txh = client.sendRawTransaction(tx)
  console.log("tx hash => " + txh);
  // Optional: wait for the transaction to be mined
  // const receipt = client.waitForTransactionReceipt(txh).then((receipt) => {
  //   console.log("tx block hash => " + receipt.block_hash);
  // });
  data.nonce = data.nonce + 1;
}
