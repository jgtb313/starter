import {
  User,
  Store,
  Role,
  Invoice,
  InvoiceProduct,
  Delivery,
  Inventory,
  Product,
  Plan,
  UserStatusEnum,
  StoreStatusEnum,
  InvoiceProductStatusEnum,
  InvoiceStatusEnum,
  DeliveryProductStatusEnum,
  DeliveryStatusEnum,
  InventoryStatusEnum,
  InventoryProductStatusEnum,
  RoleTypeEnum,
  ProductStatusEnum,
  DocumentTypeCNPJEnum,
  PlanIntervalEnum,
  PlanStatusEnum
} from '@starter/schema'
import { formatToCPFOrCNPJ } from '@starter/shared'

export type ApiLogin = ApiUser & {
  hash: string
}

export type ApiProduct = {
  productId: number
  name: string
  code: string
  active: 0 | 1
}

export type ApiRole = {
  userTypeId: number
  name: string
}

export type ApiInvoiceProduct = {
  invoiceProductId: number
  invoiceId: number
  productId: number
  product: ApiProduct
  value: number
  boxes: number
  icms?: number
  ipi?: number
  pis?: number
  confins?: number
  lot?: string
  validity?: Date
}

export type ApiInvoice = {
  invoiceId: number
  storeId: number
  store: ApiStore
  number: number
  boxes: number
  value?: number
  icms?: number
  ipi?: number
  pis?: number
  confins?: number
  delivered: 0 | 1
  invoiceProducts?: ApiInvoiceProduct[]
}

export type ApiInvoiceUploadXMLOutput = {
  invoice: number | Record<string, string>
  message: 'Nota salva com sucesso' | 'Nota salva previamente no banco' | 'Erro ao salvar nota'
}[]

export type ApiDeliveryProduct = Omit<ApiInvoiceProduct, 'invoiceId' | 'productId' | 'product' | 'invoiceProductId' | 'invoiceProduct'> & {
  deliveryProductId: number
  productId: number
  product: ApiProduct
  invoiceProductId?: number
  invoiceProduct?: Omit<ApiInvoiceProduct, 'product'> & {
    invoiceId: number
    invoice: Omit<ApiInvoice, 'store'>
  }
}

export type ApiDelivery = {
  deliveryId: number
  storeId: number
  store: ApiStore
  userId: number
  date: string
  deliveryProduct: ApiDeliveryProduct[]
  user: Omit<ApiUser, 'userStores'>
}

export type ApiInventoryProduct = {
  inventoryProductId: number
  inventoryId: number
  productId: number
  unities: number
  product: ApiProduct
  active: 0 | 1
}

export type ApiInventory = {
  inventoryId: number
  storeId: number
  store: ApiStore
  userId: number
  user: ApiUser
  date: Date
  inventoryProducts: ApiInventoryProduct[]
  active: 0 | 1
}

export type ApiStore = {
  storeId: number
  name: string
  rcky: number
  cnpj: string
}

export type ApiUser = {
  userId: number
  userStores: {
    userStoreId: number
    storeId: number
    userId: number
    userTypeId: number
    userType: ApiRole
    store: ApiStore
  }[]
  name: string
  email: string
}

export type ApiPlan = {
  planId: number
  name: string
  stores: number
  price: number
  iuguId: string
}

export type ApiListOutput<T> = {
  items: T[]
  estimatedCount: number
}

export const sortApiProducts = (a: ApiProduct, b: ApiProduct) => {
  if (a.name < b.name) {
    return -1
  }

  if (a.name > b.name) {
    return 1
  }

  return 0
}

export const sortApiInvoiceProducts = (a: ApiInvoiceProduct, b: ApiInvoiceProduct) => {
  if (a.product.name < b.product.name) {
    return -1
  }

  if (a.product.name > b.product.name) {
    return 1
  }
  return 0
}

export const parseApiDelivery = (delivery: ApiDelivery): Delivery => {
  return {
    id: delivery.deliveryId.toString(),
    storeId: delivery.storeId.toString(),
    store: parseApiStore(delivery.store),
    createdById: delivery.userId.toString(),
    createdBy: parseApiUser({ ...delivery.user, userStores: [] }),
    date: new Date(delivery.date),
    deliveryProducts: delivery.deliveryProduct.map((deliveryProduct) => ({
      id: deliveryProduct.deliveryProductId.toString(),
      invoiceId: deliveryProduct.invoiceProduct ? deliveryProduct.invoiceProduct.invoiceId.toString() : null,
      invoice: deliveryProduct.invoiceProduct
        ? parseApiInvoice({
            ...deliveryProduct.invoiceProduct.invoice,
            store: delivery.store
          })
        : null,
      invoiceProductId: deliveryProduct.invoiceProductId ? deliveryProduct.invoiceProductId.toString() : null,
      invoiceProduct: deliveryProduct.invoiceProduct
        ? parseApiInvoiceProduct({ ...deliveryProduct.invoiceProduct, product: deliveryProduct.product })
        : null,
      productId: deliveryProduct.productId.toString(),
      product: parseApiProduct(deliveryProduct.product),
      boxes: deliveryProduct.boxes,
      value: deliveryProduct.value,
      icms: deliveryProduct.icms,
      ipi: deliveryProduct.ipi,
      pis: deliveryProduct.pis,
      confins: deliveryProduct.confins,
      lot: deliveryProduct.lot,
      validity: deliveryProduct.validity ? new Date(deliveryProduct.validity) : null,
      status: DeliveryProductStatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    })),
    status: DeliveryStatusEnum.ACTIVE,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const parseApiInventory = (inventory: ApiInventory): Inventory => {
  return {
    id: inventory.inventoryId.toString(),
    storeId: inventory.storeId.toString(),
    store: parseApiStore(inventory.store),
    createdById: inventory.userId.toString(),
    createdBy: parseApiUser({ ...inventory.user, userStores: [] }),
    date: new Date(inventory.date),
    inventoryProducts: inventory.inventoryProducts.map((inventoryProduct) => ({
      id: inventoryProduct.inventoryProductId.toString(),
      inventoryId: inventoryProduct.inventoryId.toString(),
      productId: inventoryProduct.productId.toString(),
      product: parseApiProduct(inventoryProduct.product),
      unities: inventoryProduct.unities,
      status: InventoryProductStatusEnum.ACTIVE,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    })),
    status: InventoryStatusEnum.ACTIVE,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const parseApiInvoiceProduct = (invoiceProduct: ApiInvoiceProduct): InvoiceProduct => {
  return {
    id: invoiceProduct.invoiceProductId.toString(),
    invoiceId: invoiceProduct.invoiceId.toString(),
    productId: invoiceProduct.productId.toString(),
    product: parseApiProduct(invoiceProduct.product),
    value: invoiceProduct.value,
    icms: invoiceProduct.icms,
    ipi: invoiceProduct.ipi,
    pis: invoiceProduct.pis,
    confins: invoiceProduct.confins,
    boxes: invoiceProduct.boxes,
    lot: invoiceProduct.lot,
    validity: invoiceProduct.validity ? new Date(invoiceProduct.validity) : null,
    status: InvoiceProductStatusEnum.ACTIVE,
    deletedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const parseApiInvoice = (invoice: ApiInvoice): Invoice => {
  return {
    id: invoice.invoiceId.toString(),
    storeId: invoice.storeId.toString(),
    store: parseApiStore(invoice.store),
    number: invoice.number,
    boxes: invoice.boxes,
    value: invoice.value ? invoice.value * 100 : undefined,
    icms: invoice.icms,
    ipi: invoice.ipi,
    pis: invoice.pis,
    confins: invoice.confins,
    invoiceProducts: invoice.invoiceProducts ? invoice.invoiceProducts.map(parseApiInvoiceProduct) : [],
    delivered: invoice.delivered === 1,
    status: InvoiceStatusEnum.ACTIVE,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const parseApiProduct = (product: ApiProduct): Product => {
  return {
    id: product.productId.toString(),
    name: product.name,
    code: product.code,
    status: product.active === 1 ? ProductStatusEnum.ACTIVE : ProductStatusEnum.INACTIVE,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const parseApiRoleType = (role: ApiRole) => {
  const enums = {
    2: RoleTypeEnum.OWNER,
    3: RoleTypeEnum.STOCK,
    4: RoleTypeEnum.INVENTORY,
    5: RoleTypeEnum.STOCK_INVENTORY
  }

  return enums[role.userTypeId as 2 | 3 | 4 | 5]
}

export const parseApiRole = (role: ApiRole): Role => {
  return {
    id: role.userTypeId.toString(),
    name: role.name,
    type: parseApiRoleType(role),
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const parseApiStore = (store: ApiStore): Store => {
  return {
    id: store.storeId.toString(),
    name: store.name,
    rcky: store.rcky.toString(),
    document: {
      type: DocumentTypeCNPJEnum.COMPANY,
      number: formatToCPFOrCNPJ(store.cnpj)
    },
    status: StoreStatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const parseApiUser = (user: ApiUser): User => {
  return {
    id: user.userId.toString(),
    roles: user.userStores?.map((userStore) => ({
      id: userStore.userStoreId.toString(),
      storeId: userStore.storeId.toString(),
      roleId: userStore.userTypeId.toString(),
      store: parseApiStore(userStore.store),
      role: parseApiRole(userStore.userType)
    })),
    name: user.name,
    email: user.email,
    social: {
      google: null,
      facebook: null
    },
    password: '',
    onboarding: !user.userStores.length,
    status: UserStatusEnum.ACTIVE,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const parseApiPlan = (plan: ApiPlan): Plan => {
  return {
    id: plan.planId.toString(),
    integrationId: plan.iuguId,
    name: 'Plano',
    // name: plan.name,
    amount: plan.price * 100,
    interval: PlanIntervalEnum.MONTH,
    intervalCount: 1,
    features: [
      {
        description: plan.stores === 1 ? `Acesso a ${plan.stores} loja` : `Acesso a ${plan.stores} lojas`
      }
    ],
    status: PlanStatusEnum.ACTIVE,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
