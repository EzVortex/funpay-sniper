import axios from "axios";
import * as cheerio from "cheerio";
import {playAudioFile} from 'audic';

let snipedOrder = null
const getLotDOM = async (url) => {
    const { data } = await axios.get(`${url}/`)
    return data
}

const getOrders = async (dom) => {
    const $ = cheerio.load(dom)
    const items = $('.tc-item').toArray()
    return items.map(item => {
        const element = $(item)
        return {
            url: element.attr('href'),
            stock: +element.find('.tc-amount').text().replace(/[^0-9]/g, ''),
            price: +element.find('.tc-price').html().split('<div>')[1].split(' <span')[0],
            user: {
                online: element.find('.media-user').hasClass('online')
            }
        }
    })
}

const processSniping = async (lot) => {
    const dom = await getLotDOM(lot.url)
    const orders = await getOrders(dom)
    console.log(orders)
    const filteredOrders = orders.filter(order => {
        return order.user.online && order.stock >= lot.minStock && order.price <= lot.priceThreshold
    })
    if (filteredOrders.length > 0) {
        const oldOrder = snipedOrder
        snipedOrder = filteredOrders[0]
        if (JSON.stringify(oldOrder) !== JSON.stringify(snipedOrder)) {
            console.log(`Sniped new order: ${snipedOrder.url} | Stock: ${snipedOrder.stock} | Price: ${snipedOrder.price}`)
            await playAudioFile('./sound/success.wav');
        }
    }
}

export default { processSniping }
