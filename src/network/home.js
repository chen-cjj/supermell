import {request} from "./request"

export function getHomeMultdata() {
    return request({
        url: '/home/multidata'
    })
}