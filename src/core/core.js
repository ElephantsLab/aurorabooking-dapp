import {ethers} from "ethers";
const contractAddress = "0x8Dc36fB73063Cfa9d18767522b2145A9ca9DF6F9";
const NODE = "https://mainnet.aurora.dev";
import abi from "./contractAbi.json";

export default class Core {
    constructor(context) {
        this.context = context;
        this.init();
    }

    async init() {
        if (window.ethereum) {
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
            this.contract = new ethers.Contract(contractAddress, abi, this.provider).connect(this.signer);
        } else {
            this.provider = new ethers.providers.JsonRpcProvider(NODE);
            this.contract = new ethers.Contract(contractAddress, abi, this.provider).connect("0x525b2f62856d9B1461739fcD05e938d9D92C0B56");
        }
    }

    async bookTable(data) {
        const txResponse = await this.contract.book(data.placeId, data.tableId);
        const txReceipt = await txResponse.wait();
        const eventLogs = parseInt(txReceipt.logs[txReceipt.logs.length - 1].data.substring(2+64*2), 16);

        return {tx: txReceipt, response: txResponse, nftId: eventLogs};
    }
}
