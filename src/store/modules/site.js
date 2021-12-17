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
        orderDetails: {},
        activeLots:[],
        userQrs: []
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
                // date.data
            } catch (error) {
                console.log(error);
            }
        },
        async setNewLot(ctx, data) {
            try {
                const timestamp = Math.floor(new Date().getTime() / 1000);
                await axios.post(`${config.baseURL}/setNewLot`, {
                    id: data.orderId,
                    price: data.price,
                    date: timestamp,
                    lot_id: data.lotId
                });
            } catch (error) {
                console.log(error);
            }
        },
        async fetchUserOrders(ctx, data) {
            try {
                const userOrdersResponse = await axios.get(`${config.baseURL}/getUserOrders?address=${data.address}`);
                const finalResArr = [];
                for (let order of userOrdersResponse.data) {
                    const orderId = order.id;
                    const placeId = order.place_id;
                    const nftId = order.nft_id;
                    const tableNumber = order.table_number;
                    const date = order.date;

                    finalResArr.push({placeId, nftId, tableNumber, date, orderId});
                }
                ctx.dispatch("getUserQrCodes", finalResArr)
                ctx.commit("updateUserOrders", finalResArr);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchMetadataById(ctx, data) {
            try {
                const metadataResponse = await axios.get(`${config.baseURL}/metadata/${data.id}`);
                const name = metadataResponse.data.name;
                const description = metadataResponse.data.description;
                const attributes = metadataResponse.data.atributes;
                const image = metadataResponse.data.image;

                const attributesArrRes = [];
                for (let attribute of attributes) {
                    attributesArrRes.push({ trait_type: attribute.trait_type, value: attribute.value,});
                }

                ctx.commit("updateOrderDetails", {image, name, description, attributesArrRes});
            } catch (error) {
                console.log(error);
            }
        },
      async fetchAllActiveLots(ctx) {
            try {
                const activeLotsResponse = await axios.get(`${config.baseURL}/getAllActiveLots`);
                ctx.commit("updateActiveLots", activeLotsResponse.data);
              } catch (error) {
                console.log(error);
            }
        },
        async fetchActiveOrders(ctx, data) {
            try {
                const activeOrdersResponse = await axios.get(`${config.baseURL}/getTodaysOrders?date=${data.date}`);
                const tableOrdered = [];

                for (let order of activeOrdersResponse.data) {
                    if (order.place_id === data.placeId) {
                        tableOrdered.push(order.table_number);
                    }
                }
                // console.log(tableOrdered)
                return tableOrdered;
              } catch (error) {
                console.log(error);
            }
        },
        async getUserQrCodes(ctx, data){
            const result = [];
            try {
                for(let book of data){
                    const res = await axios.get(`${config.baseURL}/getQrText/${book.nftId}`)
                    result.push(res.data)
                }
                ctx.commit("updateUserQrList", result);
            } catch (error) {
                console.log(error);
            }
        },

        async deletePurchasedLot(ctx, data) {
            try {
                await axios.delete(`${config.baseURL}/deleteLot`, {
                    data: {
                        lot_id: data.lotId
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
    mutations: {
        updateUserQrList(state, data){
            state.userQrs = data
        },
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
        },
        updateActiveLots(state, data) {
            state.activeLots = data;
        }
    },
    getters: {
        getUserQrList(state){
            return state.userQrs;
        },
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
        },
        getActiveLots(state){
            return state.activeLots;
        }
    }
}