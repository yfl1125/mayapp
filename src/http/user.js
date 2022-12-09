import axios from '@/axsio/index'

export let loginpost = (obj) => {
    return axios.post('login', obj)
}
