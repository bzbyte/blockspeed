import eth from 'k6/x/ethereum';
import { utils } from "https://cdn.ethers.io/lib/ethers-5.6.umd.min.js"

const client = new eth.Client({
    url: 'http://localhost:8541',
    // You can also specify a private key here
    // privateKey: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    // or a mnemonic
    // mnemonic: 'my mnemonic'
});

// You can use an existing account
const root_address = "0x85da99c8a7c2c95964c8efd687e95e632fc533d6"
var nonce = client.getNonce(root_address);

// export function setup() {
//   const accounts = client.accounts();
//   // If there's not accounts we are not running in dev mode
//   if (accounts.length != 0) {
//     // Transfer some funds from the coinbase address to the test account if needed
//     const bal = client.getBalance(root_address, client.blockNumber());
//     if (bal < utils.parseEther("1000")) {
//       const txh = client.sendTransaction({
//         from: accounts[0],
//         to: root_address,
//         value: utils.parseEther("1000"),
//       });
//       const rcp = client.waitForTransactionReceipt(txh)
//       console.log(`txh => ${JSON.stringify(rcp)}`);
//     }
//   }

//   const lta = client.deployLoadTester();
//   console.log("Load tester deployed at: " + lta);

//   return { lta: lta };
// }

// // Increment the nonce as we've deployed the load tester contract
// nonce = nonce + 1;

export default function (data) {
  const gas = client.gasPrice();
  console.log(`gas => ${gas}`);

  const bal = client.getBalance(root_address, client.blockNumber());
  console.log(`bal => ${bal}`);
  
  const tx = {
    to: "0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF",
    value: utils.parseEther("0.001"),
    gas_price: gas,
    nonce: nonce,
  };
  
  const txh = client.sendRawTransaction(tx)
  console.log("tx hash => " + txh);
  const receipt = client.waitForTransactionReceipt(txh)
  console.log("tx block hash => " + receipt.block_hash);
  nonce = nonce + 1;

  // const f = client.callLoadTester(data.lta, "inc")
  // nonce = nonce + 1;
  // console.log("call inc => " + f);
}
