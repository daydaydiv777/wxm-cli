import _ from 'lodash'
const HotelModule = import(/* webpackChunkName: "hotel.main" */ '../module/Hotel/main')

console.log(HotelModule)
console.log('lodash.version:' + _.VERSION)
