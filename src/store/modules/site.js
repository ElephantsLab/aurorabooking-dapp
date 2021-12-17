import axios from "axios";
import config from "../../assets/config.json";

export default {
    state: {
        userData: {address: null, isConnected: false},
        isBookModalOpen: false,
        modalBookDataToProcess: {},
        isSellModalOpen: false,
        modalSellData: {},
        userOrders: [],
        orderDetails: {}
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
        },
        async fetchUserOrders(ctx, data) {
            try {
                const userOrdersResponse = await axios.get(`${config.baseURL}/getUserOrders?address=${data.address}`);
                const finalResArr = [];
                for (let order of userOrdersResponse.data) {
                    const placeId = order.place_id;
                    const nftId = order.nft_id;
                    const tableNumber = order.table_number;
                    const date = order.date;

                    finalResArr.push({placeId, nftId, tableNumber, date});
                }

                ctx.commit("updateUserOrders", finalResArr);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchMetadataById(ctx, data) {
            try {
                const metadataResponse = await axios.get(`${config.baseURL}/metadata/${data.id}`);
                const placeId = metadataResponse.data.place_id;
                const nftId = metadataResponse.data.nft_id;
                const tableNumber = metadataResponse.data.table_number;
                const image = metadataResponse.data.image;

                ctx.commit("updateOrderDetails", {placeId, nftId, tableNumber, image});
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
        },
        updateUserOrders(state, data) {
            state.userOrders = data;
        },
        updateOrderDetails(state, data) {
            state.orderDetails = data;
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
        },
        getUserOrders(state) {
            return state.userOrders;
        },
        getOrderDetails(state) {
            return state.orderDetails;
        }
    }
}