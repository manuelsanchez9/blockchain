const BlockChain = require('./src/blockchain');
const Block = require('./src/block');

/**
 * The function creates a blockchain, adds three blocks with different data to the blockchain, and then
 * prints the blockchain.
 */
async function run(){
    const blockchain = await new BlockChain();
    const block1 = new Block({data: 'Block #1'});
    const block2 = new Block({data: 'Block #2'});
    const block3 = new Block({data: 'Block #3'});

    await blockchain.addBlock(block1);
    await blockchain.addBlock(block2);
    await blockchain.addBlock(block3);

    blockchain.print();
}

run();