import axios from "axios";
import config from "../../assets/config.json";

export default {
    state: {
        userData: {address: null, isConnected: false},
        isBookModalOpen: false,
        modalBookDataToProcess: {},
        isSellModalOpen: false,
        modalSellData: {}
    },
    actions: {
        async connectWallet(ctx) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                window.localStorage.setItem("address", accounts[0]);
                ctx.commit("updateUserData", { address: accounts[0], isConnected: true });
            } catch (error) {
                console.log(error);
            }
        },
        async bookTableSaveData(ctx, data) {
            try {
                const currentTimestamp = ~~(new Date().getTime()/1000);
                await axios.post(`${config.baseURL}/setNewBooking`, {
                    nft_id: data.nftId,
                    place_id: data.placeId,
                    table_number: data.table,
                    date: currentTimestamp
                });
                console.log(true)
            } catch (error) {
                console.log(error);
            }
        }
    },
    mutations: {
        updateUserData(state, data) {
            state.userData = data;
        },
        updateIsOpenBookModal(state, data) {
            state.isBookModalOpen = data;
        },
        updateModalBookDataToProcess(state, data) {
            state.modalBookDataToProcess = data;
        },
        updateIsOpenSellModal(state, data) {
            state.isSellModalOpen = data;
        },
        updateModalSellDataToProcess(state, data) {
            state.modalSellData = data;
        }
    },
    getters: {
        userDataGetter(state) {
            return state.userData;
        },
        isOpenBookModalGetter(state) {
            return state.isBookModalOpen;
        },
        modalBookDataToProcessGetter(state) {
            return state.modalBookDataToProcess;
        },
        isOpenSellModalGetter(state) {
            return state.isSellModalOpen;
        },
        modalSellDataToProcessGetter(state) {
            return state.modalSellData;
        }
    }
}