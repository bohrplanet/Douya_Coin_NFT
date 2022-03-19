
export default function web3_reducer(preState=0, action) {

    const { type, data } = action

    switch (type) {
        case 'increment':
            return  data

        case 'decrement':
            return data

        default:
            return preState;
    }

}