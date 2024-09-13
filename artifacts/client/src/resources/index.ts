// export * as auth from './Auth.resources'
// export * as delivery from './Delivery.resources'
// export * as file from './File.resources'
// export * as invoice from './Invoice.resources'
// export * as otp from './OTP.resources'
// export * as product from './Product.resources'
// export * as role from './Role.resources'
// export * as store from './Store.resources'
// export * as subscription from './Subscription.resources'
// export * as user from './User.resources'

import * as authResources from './Auth.resources'
import * as deliveryResources from './Delivery.resources'
import * as fileResources from './File.resources'
import * as inventoryResources from './Inventory.resource'
import * as invoiceResources from './Invoice.resources'
import * as otpResources from './OTP.resources'
import * as planResources from './Plan.resources'
import * as productResources from './Product.resources'
import * as roleResources from './Role.resources'
import * as storeResources from './Store.resources'
import * as subscriptionResources from './Subscription.resources'
import * as userResources from './User.resources'

export const auth = authResources

export const delivery = deliveryResources

export const file = fileResources

export const inventory = inventoryResources

export const invoice = invoiceResources

export const otp = otpResources

export const plan = planResources

export const product = productResources

export const role = roleResources

export const store = storeResources

export const subscription = subscriptionResources

export const user = userResources
