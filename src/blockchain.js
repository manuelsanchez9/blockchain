const Block = require('./block');
const SHA256 = require('crypto-js/sha256');

/* The BlockChain class represents a blockchain data structure with methods for adding blocks,
initializing the chain, validating the chain, and printing the blocks. */
class BlockChain {
    /**
     * The constructor function initializes a chain array and sets the height to -1.
     */
    constructor(){
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    /**
     * The `initializeChain` function creates a genesis block if the blockchain height is -1.
     */
    async initializeChain(){
        if (this.height === -1) {
            const block = new Block({data: 'Genesis Block'});
            await this.addBlock(block);
        }
    }

    /**
     * The function `addBlock` adds a new block to a blockchain, ensuring the chain is valid and
     * calculating the block's hash.
     * @param block - The `block` parameter is an object representing a block in a blockchain. It
     * typically contains data, a timestamp, a reference to the previous block's hash, and its own
     * hash.
     * @returns The `addBlock` function returns a Promise.
     */
    addBlock(block){
        let self = this;
        return new Promise(async(resolve, reject) => {
            block.height = self.chain.length;
            block.time = new Date().getTime().toString();
            if (self.chain.length > 0) {
                block.previousBlockHash = self.chain[self.chain.length - 1].hash;
            }
            let errors = await self.validateChain();
            if (errors.length > 0) {
                reject(new Error('The chain is not valid:', errors));
            }
            block.hash = SHA256(JSON.stringify(block)).toString();
            self.chain.push(block);
            resolve(block);
        });
    }

    /**
     * The `validateChain` function iterates through each block in a chain, validates each block, and
     * returns any errors encountered during the process.
     * @returns The `validateChain` function is returning a Promise that resolves with an array of
     * errors after validating each block in the chain.
     */
    validateChain(){
        let self = this;
        const errors = [];
        return new Promise(async (resolve, reject) => {
            self.chain.map(async (block) => {
                try {
                    let isValid = await block.validate();
                    if (!isValid) {
                        errors.push(new Error(`The block ${block.height} is not valid`));
                    }
                } catch (error) {
                    errors.push(error);
                }
            });
            resolve(errors);
        });        
    }

    /**
     * The `print` function iterates over each block in the chain and logs its string representation to
     * the console.
     */
    print(){
        let self = this;
        for (let block of self.chain) {
            console.log(block.toString());            
        }
    }
}

module.exports = BlockChain;