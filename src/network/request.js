import axios from 'axios'
import Vue from 'vue'
import store from '../store'


export function request(config) {
    const instance = axios.create({
        baseURL: 'https://autumnfish.cn/',
        timeout: 8000
    })

    //请求拦截
    instance.interceptors.request.use(config => {
        store.commit('SET_IS_LOADING', true)
        return config;
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        store.commit('SET_IS_LOADING', false)
        return res;
    })
    return instance(config)
}