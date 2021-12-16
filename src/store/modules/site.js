export default {
    state: {
        userData: {address: null, isConnected: false},
        isBookModalOpen: false,
        modalBookDataToProcess: {}
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
        }
    }
}