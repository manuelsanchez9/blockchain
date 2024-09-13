const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

/* The `Block` class in JavaScript represents a block in a blockchain with methods for validation,
retrieving block data, and converting to a string. */
class Block {
    /**
     * The constructor function initializes a block with properties such as hash, height, body, time,
     * and previousBlockHash.
     * @param data - The `data` parameter in the constructor is used to initialize the body of the
     * block. It is converted to a hexadecimal string and stored in the `body` property of the block.
     */
    constructor(data){
        this.hash = null;
        this.height = 0;
        this.body = Buffer.from(JSON.stringify(data).toString('hex'));
        this.time = 0;
        this.previousBlockHash = '';        
    }

    /**
     * The function `validate` in the JavaScript code snippet uses SHA256 hashing to validate the
     * integrity of an object by comparing its current hash with a recalculated hash.
     * @returns The `validate()` function is returning a Promise. Inside the Promise, it is checking if
     * the current hash of the object is equal to the hash generated after removing the hash property
     * from the object and hashing the modified object using SHA256. If the hashes are not equal, it
     * resolves with `false`, indicating that the object is not valid. Otherwise, it resolves with
     * `true`, indicating that the object
     */
    validate(){
        const self = this;
        return new Promise((resolve, reject) => {
            let currentHash = self.hash;
            self.hash = SHA256(JSON.stringify({...self, hash: null})).toString();
            if (currentHash != self.hash) {
                return resolve(false);
            }
            resolve(true);
        });
    }

    /**
     * The function `getBlockData` decodes and parses data from a block, returning a promise that
     * resolves with the data object or rejects with an error if it's the Genesis Block.
     * @returns The `getBlockData` function returns a Promise that resolves with the decoded data
     * object if the data is not 'Genesis Block'. If the data is 'Genesis Block', it rejects with an
     * error message stating 'This is the Genesis Block'.
     */
    getBlockData(){
        const self = this;
        return new Promise((resolve, reject) => {
            let encodedData = self.body;
            let decodedData = hex2ascii(encodedData);
            let dataObject = JSON.parse(decodedData);
            if (dataObject === 'Genesis Block') {
                reject(new Error('This is the Genesis Block'));
            }
            resolve(dataObject);
        });
    }

    /**
     * This function returns a formatted string representation of a block's hash, height, body, time,
     * and previous block hash.
     * @returns The `toString` method is returning a formatted string representation of a block object.
     * It includes the hash, height, body, time, and previousBlockHash properties of the block. Each
     * property is displayed with its corresponding value in the format:
     * ```
     * Block - 
     *     hash: [hash value]
     *     height: [height value]
     *     body: [body value]
     *     time: [time value
     */
    toString(){
        const {hash, height, body, time, previousBlockHash} = this;
        return `Block - 
            hash: ${hash}
            height: ${height}
            body: ${body}
            time: ${time}
            previousBlockHash: ${previousBlockHash}
            ----------------------------------------------------------------------------------`;
    }
}

module.exports = Block;