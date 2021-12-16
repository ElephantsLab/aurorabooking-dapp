import axios from "axios";
const baseUrl = "http://aurorabooking.net:3000";

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
                console.log(data)
                await axios.post(`${baseUrl}/setNewBooking`, {
                    nft_id: data.nftId,
                    place_id: data.placeId,
                    table_number: data.table
                },{headers: { 'content-type': 'application/x-www-form-urlencoded' }});
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