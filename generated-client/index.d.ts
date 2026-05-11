
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model CompanySettings
 * 
 */
export type CompanySettings = $Result.DefaultSelection<Prisma.$CompanySettingsPayload>
/**
 * Model Quotation
 * 
 */
export type Quotation = $Result.DefaultSelection<Prisma.$QuotationPayload>
/**
 * Model QuotationItem
 * 
 */
export type QuotationItem = $Result.DefaultSelection<Prisma.$QuotationItemPayload>
/**
 * Model ProductCatalog
 * 
 */
export type ProductCatalog = $Result.DefaultSelection<Prisma.$ProductCatalogPayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model ProductDatabase
 * 
 */
export type ProductDatabase = $Result.DefaultSelection<Prisma.$ProductDatabasePayload>
/**
 * Model InvoiceProduct
 * 
 */
export type InvoiceProduct = $Result.DefaultSelection<Prisma.$InvoiceProductPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const CompanyType: {
  MR_SWIMMING_POOLS: 'MR_SWIMMING_POOLS',
  KLEAN_TECH_SYSTEMS: 'KLEAN_TECH_SYSTEMS',
  MR_ACADEMY: 'MR_ACADEMY'
};

export type CompanyType = (typeof CompanyType)[keyof typeof CompanyType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type CompanyType = $Enums.CompanyType

export const CompanyType: typeof $Enums.CompanyType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companySettings`: Exposes CRUD operations for the **CompanySettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanySettings
    * const companySettings = await prisma.companySettings.findMany()
    * ```
    */
  get companySettings(): Prisma.CompanySettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quotation`: Exposes CRUD operations for the **Quotation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quotations
    * const quotations = await prisma.quotation.findMany()
    * ```
    */
  get quotation(): Prisma.QuotationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quotationItem`: Exposes CRUD operations for the **QuotationItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuotationItems
    * const quotationItems = await prisma.quotationItem.findMany()
    * ```
    */
  get quotationItem(): Prisma.QuotationItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productCatalog`: Exposes CRUD operations for the **ProductCatalog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductCatalogs
    * const productCatalogs = await prisma.productCatalog.findMany()
    * ```
    */
  get productCatalog(): Prisma.ProductCatalogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productDatabase`: Exposes CRUD operations for the **ProductDatabase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductDatabases
    * const productDatabases = await prisma.productDatabase.findMany()
    * ```
    */
  get productDatabase(): Prisma.ProductDatabaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoiceProduct`: Exposes CRUD operations for the **InvoiceProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvoiceProducts
    * const invoiceProducts = await prisma.invoiceProduct.findMany()
    * ```
    */
  get invoiceProduct(): Prisma.InvoiceProductDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Customer: 'Customer',
    Product: 'Product',
    CompanySettings: 'CompanySettings',
    Quotation: 'Quotation',
    QuotationItem: 'QuotationItem',
    ProductCatalog: 'ProductCatalog',
    Invoice: 'Invoice',
    ProductDatabase: 'ProductDatabase',
    InvoiceProduct: 'InvoiceProduct'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "customer" | "product" | "companySettings" | "quotation" | "quotationItem" | "productCatalog" | "invoice" | "productDatabase" | "invoiceProduct"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      CompanySettings: {
        payload: Prisma.$CompanySettingsPayload<ExtArgs>
        fields: Prisma.CompanySettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanySettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanySettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload>
          }
          findFirst: {
            args: Prisma.CompanySettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanySettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload>
          }
          findMany: {
            args: Prisma.CompanySettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload>[]
          }
          create: {
            args: Prisma.CompanySettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload>
          }
          createMany: {
            args: Prisma.CompanySettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanySettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload>[]
          }
          delete: {
            args: Prisma.CompanySettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload>
          }
          update: {
            args: Prisma.CompanySettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload>
          }
          deleteMany: {
            args: Prisma.CompanySettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanySettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanySettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload>[]
          }
          upsert: {
            args: Prisma.CompanySettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingsPayload>
          }
          aggregate: {
            args: Prisma.CompanySettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanySettings>
          }
          groupBy: {
            args: Prisma.CompanySettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanySettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanySettingsCountArgs<ExtArgs>
            result: $Utils.Optional<CompanySettingsCountAggregateOutputType> | number
          }
        }
      }
      Quotation: {
        payload: Prisma.$QuotationPayload<ExtArgs>
        fields: Prisma.QuotationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuotationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuotationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          findFirst: {
            args: Prisma.QuotationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuotationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          findMany: {
            args: Prisma.QuotationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>[]
          }
          create: {
            args: Prisma.QuotationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          createMany: {
            args: Prisma.QuotationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuotationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>[]
          }
          delete: {
            args: Prisma.QuotationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          update: {
            args: Prisma.QuotationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          deleteMany: {
            args: Prisma.QuotationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuotationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuotationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>[]
          }
          upsert: {
            args: Prisma.QuotationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationPayload>
          }
          aggregate: {
            args: Prisma.QuotationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuotation>
          }
          groupBy: {
            args: Prisma.QuotationGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuotationGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuotationCountArgs<ExtArgs>
            result: $Utils.Optional<QuotationCountAggregateOutputType> | number
          }
        }
      }
      QuotationItem: {
        payload: Prisma.$QuotationItemPayload<ExtArgs>
        fields: Prisma.QuotationItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuotationItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuotationItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          findFirst: {
            args: Prisma.QuotationItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuotationItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          findMany: {
            args: Prisma.QuotationItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>[]
          }
          create: {
            args: Prisma.QuotationItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          createMany: {
            args: Prisma.QuotationItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuotationItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>[]
          }
          delete: {
            args: Prisma.QuotationItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          update: {
            args: Prisma.QuotationItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          deleteMany: {
            args: Prisma.QuotationItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuotationItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuotationItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>[]
          }
          upsert: {
            args: Prisma.QuotationItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotationItemPayload>
          }
          aggregate: {
            args: Prisma.QuotationItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuotationItem>
          }
          groupBy: {
            args: Prisma.QuotationItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuotationItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuotationItemCountArgs<ExtArgs>
            result: $Utils.Optional<QuotationItemCountAggregateOutputType> | number
          }
        }
      }
      ProductCatalog: {
        payload: Prisma.$ProductCatalogPayload<ExtArgs>
        fields: Prisma.ProductCatalogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductCatalogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductCatalogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload>
          }
          findFirst: {
            args: Prisma.ProductCatalogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductCatalogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload>
          }
          findMany: {
            args: Prisma.ProductCatalogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload>[]
          }
          create: {
            args: Prisma.ProductCatalogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload>
          }
          createMany: {
            args: Prisma.ProductCatalogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCatalogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload>[]
          }
          delete: {
            args: Prisma.ProductCatalogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload>
          }
          update: {
            args: Prisma.ProductCatalogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload>
          }
          deleteMany: {
            args: Prisma.ProductCatalogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductCatalogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductCatalogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload>[]
          }
          upsert: {
            args: Prisma.ProductCatalogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductCatalogPayload>
          }
          aggregate: {
            args: Prisma.ProductCatalogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductCatalog>
          }
          groupBy: {
            args: Prisma.ProductCatalogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductCatalogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCatalogCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCatalogCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      ProductDatabase: {
        payload: Prisma.$ProductDatabasePayload<ExtArgs>
        fields: Prisma.ProductDatabaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductDatabaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductDatabaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload>
          }
          findFirst: {
            args: Prisma.ProductDatabaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductDatabaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload>
          }
          findMany: {
            args: Prisma.ProductDatabaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload>[]
          }
          create: {
            args: Prisma.ProductDatabaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload>
          }
          createMany: {
            args: Prisma.ProductDatabaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductDatabaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload>[]
          }
          delete: {
            args: Prisma.ProductDatabaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload>
          }
          update: {
            args: Prisma.ProductDatabaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload>
          }
          deleteMany: {
            args: Prisma.ProductDatabaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductDatabaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductDatabaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload>[]
          }
          upsert: {
            args: Prisma.ProductDatabaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDatabasePayload>
          }
          aggregate: {
            args: Prisma.ProductDatabaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductDatabase>
          }
          groupBy: {
            args: Prisma.ProductDatabaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductDatabaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductDatabaseCountArgs<ExtArgs>
            result: $Utils.Optional<ProductDatabaseCountAggregateOutputType> | number
          }
        }
      }
      InvoiceProduct: {
        payload: Prisma.$InvoiceProductPayload<ExtArgs>
        fields: Prisma.InvoiceProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload>
          }
          findFirst: {
            args: Prisma.InvoiceProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload>
          }
          findMany: {
            args: Prisma.InvoiceProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload>[]
          }
          create: {
            args: Prisma.InvoiceProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload>
          }
          createMany: {
            args: Prisma.InvoiceProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload>[]
          }
          delete: {
            args: Prisma.InvoiceProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload>
          }
          update: {
            args: Prisma.InvoiceProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload>
          }
          deleteMany: {
            args: Prisma.InvoiceProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload>[]
          }
          upsert: {
            args: Prisma.InvoiceProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceProductPayload>
          }
          aggregate: {
            args: Prisma.InvoiceProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoiceProduct>
          }
          groupBy: {
            args: Prisma.InvoiceProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceProductCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceProductCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    customer?: CustomerOmit
    product?: ProductOmit
    companySettings?: CompanySettingsOmit
    quotation?: QuotationOmit
    quotationItem?: QuotationItemOmit
    productCatalog?: ProductCatalogOmit
    invoice?: InvoiceOmit
    productDatabase?: ProductDatabaseOmit
    invoiceProduct?: InvoiceProductOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    quotations: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotations?: boolean | CustomerCountOutputTypeCountQuotationsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountQuotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    items: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | ProductCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationItemWhereInput
  }


  /**
   * Count Type QuotationCountOutputType
   */

  export type QuotationCountOutputType = {
    items: number
  }

  export type QuotationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | QuotationCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * QuotationCountOutputType without action
   */
  export type QuotationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationCountOutputType
     */
    select?: QuotationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuotationCountOutputType without action
   */
  export type QuotationCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationItemWhereInput
  }


  /**
   * Count Type ProductDatabaseCountOutputType
   */

  export type ProductDatabaseCountOutputType = {
    products: number
  }

  export type ProductDatabaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | ProductDatabaseCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * ProductDatabaseCountOutputType without action
   */
  export type ProductDatabaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabaseCountOutputType
     */
    select?: ProductDatabaseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductDatabaseCountOutputType without action
   */
  export type ProductDatabaseCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    phone: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    phone: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    address: number
    phone: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    name: string
    address: string
    phone: string | null
    email: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    quotations?: boolean | Customer$quotationsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "phone" | "email" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quotations?: boolean | Customer$quotationsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      quotations: Prisma.$QuotationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string
      phone: string | null
      email: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quotations<T extends Customer$quotationsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$quotationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly address: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.quotations
   */
  export type Customer$quotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    where?: QuotationWhereInput
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    cursor?: QuotationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    defaultRate: Decimal | null
    sortOrder: number | null
    gstRate: Decimal | null
  }

  export type ProductSumAggregateOutputType = {
    defaultRate: Decimal | null
    sortOrder: number | null
    gstRate: Decimal | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    sectionCode: string | null
    defaultRate: Decimal | null
    unit: string | null
    warranty: string | null
    imagePath: string | null
    imageText: string | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
    hsnCode: string | null
    databaseId: string | null
    gstRate: Decimal | null
    productCode: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    sectionCode: string | null
    defaultRate: Decimal | null
    unit: string | null
    warranty: string | null
    imagePath: string | null
    imageText: string | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
    hsnCode: string | null
    databaseId: string | null
    gstRate: Decimal | null
    productCode: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    sectionCode: number
    defaultRate: number
    unit: number
    warranty: number
    imagePath: number
    imageText: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    hsnCode: number
    databaseId: number
    gstRate: number
    productCode: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    defaultRate?: true
    sortOrder?: true
    gstRate?: true
  }

  export type ProductSumAggregateInputType = {
    defaultRate?: true
    sortOrder?: true
    gstRate?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    sectionCode?: true
    defaultRate?: true
    unit?: true
    warranty?: true
    imagePath?: true
    imageText?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    hsnCode?: true
    databaseId?: true
    gstRate?: true
    productCode?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    sectionCode?: true
    defaultRate?: true
    unit?: true
    warranty?: true
    imagePath?: true
    imageText?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    hsnCode?: true
    databaseId?: true
    gstRate?: true
    productCode?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    sectionCode?: true
    defaultRate?: true
    unit?: true
    warranty?: true
    imagePath?: true
    imageText?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    hsnCode?: true
    databaseId?: true
    gstRate?: true
    productCode?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    description: string
    category: string
    sectionCode: string
    defaultRate: Decimal
    unit: string
    warranty: string
    imagePath: string | null
    imageText: string | null
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    hsnCode: string | null
    databaseId: string | null
    gstRate: Decimal | null
    productCode: string | null
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    sectionCode?: boolean
    defaultRate?: boolean
    unit?: boolean
    warranty?: boolean
    imagePath?: boolean
    imageText?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hsnCode?: boolean
    databaseId?: boolean
    gstRate?: boolean
    productCode?: boolean
    database?: boolean | Product$databaseArgs<ExtArgs>
    items?: boolean | Product$itemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    sectionCode?: boolean
    defaultRate?: boolean
    unit?: boolean
    warranty?: boolean
    imagePath?: boolean
    imageText?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hsnCode?: boolean
    databaseId?: boolean
    gstRate?: boolean
    productCode?: boolean
    database?: boolean | Product$databaseArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    sectionCode?: boolean
    defaultRate?: boolean
    unit?: boolean
    warranty?: boolean
    imagePath?: boolean
    imageText?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hsnCode?: boolean
    databaseId?: boolean
    gstRate?: boolean
    productCode?: boolean
    database?: boolean | Product$databaseArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    sectionCode?: boolean
    defaultRate?: boolean
    unit?: boolean
    warranty?: boolean
    imagePath?: boolean
    imageText?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hsnCode?: boolean
    databaseId?: boolean
    gstRate?: boolean
    productCode?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "category" | "sectionCode" | "defaultRate" | "unit" | "warranty" | "imagePath" | "imageText" | "sortOrder" | "createdAt" | "updatedAt" | "hsnCode" | "databaseId" | "gstRate" | "productCode", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    database?: boolean | Product$databaseArgs<ExtArgs>
    items?: boolean | Product$itemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    database?: boolean | Product$databaseArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    database?: boolean | Product$databaseArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      database: Prisma.$ProductDatabasePayload<ExtArgs> | null
      items: Prisma.$QuotationItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      category: string
      sectionCode: string
      defaultRate: Prisma.Decimal
      unit: string
      warranty: string
      imagePath: string | null
      imageText: string | null
      sortOrder: number
      createdAt: Date
      updatedAt: Date
      hsnCode: string | null
      databaseId: string | null
      gstRate: Prisma.Decimal | null
      productCode: string | null
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    database<T extends Product$databaseArgs<ExtArgs> = {}>(args?: Subset<T, Product$databaseArgs<ExtArgs>>): Prisma__ProductDatabaseClient<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    items<T extends Product$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly sectionCode: FieldRef<"Product", 'String'>
    readonly defaultRate: FieldRef<"Product", 'Decimal'>
    readonly unit: FieldRef<"Product", 'String'>
    readonly warranty: FieldRef<"Product", 'String'>
    readonly imagePath: FieldRef<"Product", 'String'>
    readonly imageText: FieldRef<"Product", 'String'>
    readonly sortOrder: FieldRef<"Product", 'Int'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
    readonly hsnCode: FieldRef<"Product", 'String'>
    readonly databaseId: FieldRef<"Product", 'String'>
    readonly gstRate: FieldRef<"Product", 'Decimal'>
    readonly productCode: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.database
   */
  export type Product$databaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
    where?: ProductDatabaseWhereInput
  }

  /**
   * Product.items
   */
  export type Product$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    where?: QuotationItemWhereInput
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    cursor?: QuotationItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuotationItemScalarFieldEnum | QuotationItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model CompanySettings
   */

  export type AggregateCompanySettings = {
    _count: CompanySettingsCountAggregateOutputType | null
    _avg: CompanySettingsAvgAggregateOutputType | null
    _sum: CompanySettingsSumAggregateOutputType | null
    _min: CompanySettingsMinAggregateOutputType | null
    _max: CompanySettingsMaxAggregateOutputType | null
  }

  export type CompanySettingsAvgAggregateOutputType = {
    defaultGstRate: Decimal | null
  }

  export type CompanySettingsSumAggregateOutputType = {
    defaultGstRate: Decimal | null
  }

  export type CompanySettingsMinAggregateOutputType = {
    id: string | null
    companyName: string | null
    logoUrl: string | null
    address: string | null
    gstin: string | null
    phones: string | null
    email: string | null
    signatureUrl: string | null
    defaultGstRate: Decimal | null
    terms: string | null
    paymentTerms: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanySettingsMaxAggregateOutputType = {
    id: string | null
    companyName: string | null
    logoUrl: string | null
    address: string | null
    gstin: string | null
    phones: string | null
    email: string | null
    signatureUrl: string | null
    defaultGstRate: Decimal | null
    terms: string | null
    paymentTerms: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanySettingsCountAggregateOutputType = {
    id: number
    companyName: number
    logoUrl: number
    address: number
    gstin: number
    phones: number
    email: number
    signatureUrl: number
    defaultGstRate: number
    terms: number
    paymentTerms: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanySettingsAvgAggregateInputType = {
    defaultGstRate?: true
  }

  export type CompanySettingsSumAggregateInputType = {
    defaultGstRate?: true
  }

  export type CompanySettingsMinAggregateInputType = {
    id?: true
    companyName?: true
    logoUrl?: true
    address?: true
    gstin?: true
    phones?: true
    email?: true
    signatureUrl?: true
    defaultGstRate?: true
    terms?: true
    paymentTerms?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanySettingsMaxAggregateInputType = {
    id?: true
    companyName?: true
    logoUrl?: true
    address?: true
    gstin?: true
    phones?: true
    email?: true
    signatureUrl?: true
    defaultGstRate?: true
    terms?: true
    paymentTerms?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanySettingsCountAggregateInputType = {
    id?: true
    companyName?: true
    logoUrl?: true
    address?: true
    gstin?: true
    phones?: true
    email?: true
    signatureUrl?: true
    defaultGstRate?: true
    terms?: true
    paymentTerms?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanySettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanySettings to aggregate.
     */
    where?: CompanySettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySettings to fetch.
     */
    orderBy?: CompanySettingsOrderByWithRelationInput | CompanySettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanySettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanySettings
    **/
    _count?: true | CompanySettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanySettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanySettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanySettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanySettingsMaxAggregateInputType
  }

  export type GetCompanySettingsAggregateType<T extends CompanySettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanySettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanySettings[P]>
      : GetScalarType<T[P], AggregateCompanySettings[P]>
  }




  export type CompanySettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanySettingsWhereInput
    orderBy?: CompanySettingsOrderByWithAggregationInput | CompanySettingsOrderByWithAggregationInput[]
    by: CompanySettingsScalarFieldEnum[] | CompanySettingsScalarFieldEnum
    having?: CompanySettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanySettingsCountAggregateInputType | true
    _avg?: CompanySettingsAvgAggregateInputType
    _sum?: CompanySettingsSumAggregateInputType
    _min?: CompanySettingsMinAggregateInputType
    _max?: CompanySettingsMaxAggregateInputType
  }

  export type CompanySettingsGroupByOutputType = {
    id: string
    companyName: string
    logoUrl: string | null
    address: string
    gstin: string
    phones: string
    email: string
    signatureUrl: string | null
    defaultGstRate: Decimal
    terms: string
    paymentTerms: string
    createdAt: Date
    updatedAt: Date
    _count: CompanySettingsCountAggregateOutputType | null
    _avg: CompanySettingsAvgAggregateOutputType | null
    _sum: CompanySettingsSumAggregateOutputType | null
    _min: CompanySettingsMinAggregateOutputType | null
    _max: CompanySettingsMaxAggregateOutputType | null
  }

  type GetCompanySettingsGroupByPayload<T extends CompanySettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanySettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanySettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanySettingsGroupByOutputType[P]>
            : GetScalarType<T[P], CompanySettingsGroupByOutputType[P]>
        }
      >
    >


  export type CompanySettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    logoUrl?: boolean
    address?: boolean
    gstin?: boolean
    phones?: boolean
    email?: boolean
    signatureUrl?: boolean
    defaultGstRate?: boolean
    terms?: boolean
    paymentTerms?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["companySettings"]>

  export type CompanySettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    logoUrl?: boolean
    address?: boolean
    gstin?: boolean
    phones?: boolean
    email?: boolean
    signatureUrl?: boolean
    defaultGstRate?: boolean
    terms?: boolean
    paymentTerms?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["companySettings"]>

  export type CompanySettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    logoUrl?: boolean
    address?: boolean
    gstin?: boolean
    phones?: boolean
    email?: boolean
    signatureUrl?: boolean
    defaultGstRate?: boolean
    terms?: boolean
    paymentTerms?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["companySettings"]>

  export type CompanySettingsSelectScalar = {
    id?: boolean
    companyName?: boolean
    logoUrl?: boolean
    address?: boolean
    gstin?: boolean
    phones?: boolean
    email?: boolean
    signatureUrl?: boolean
    defaultGstRate?: boolean
    terms?: boolean
    paymentTerms?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanySettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyName" | "logoUrl" | "address" | "gstin" | "phones" | "email" | "signatureUrl" | "defaultGstRate" | "terms" | "paymentTerms" | "createdAt" | "updatedAt", ExtArgs["result"]["companySettings"]>

  export type $CompanySettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanySettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyName: string
      logoUrl: string | null
      address: string
      gstin: string
      phones: string
      email: string
      signatureUrl: string | null
      defaultGstRate: Prisma.Decimal
      terms: string
      paymentTerms: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["companySettings"]>
    composites: {}
  }

  type CompanySettingsGetPayload<S extends boolean | null | undefined | CompanySettingsDefaultArgs> = $Result.GetResult<Prisma.$CompanySettingsPayload, S>

  type CompanySettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanySettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanySettingsCountAggregateInputType | true
    }

  export interface CompanySettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanySettings'], meta: { name: 'CompanySettings' } }
    /**
     * Find zero or one CompanySettings that matches the filter.
     * @param {CompanySettingsFindUniqueArgs} args - Arguments to find a CompanySettings
     * @example
     * // Get one CompanySettings
     * const companySettings = await prisma.companySettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanySettingsFindUniqueArgs>(args: SelectSubset<T, CompanySettingsFindUniqueArgs<ExtArgs>>): Prisma__CompanySettingsClient<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanySettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanySettingsFindUniqueOrThrowArgs} args - Arguments to find a CompanySettings
     * @example
     * // Get one CompanySettings
     * const companySettings = await prisma.companySettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanySettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanySettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanySettingsClient<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanySettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingsFindFirstArgs} args - Arguments to find a CompanySettings
     * @example
     * // Get one CompanySettings
     * const companySettings = await prisma.companySettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanySettingsFindFirstArgs>(args?: SelectSubset<T, CompanySettingsFindFirstArgs<ExtArgs>>): Prisma__CompanySettingsClient<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanySettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingsFindFirstOrThrowArgs} args - Arguments to find a CompanySettings
     * @example
     * // Get one CompanySettings
     * const companySettings = await prisma.companySettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanySettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanySettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanySettingsClient<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanySettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanySettings
     * const companySettings = await prisma.companySettings.findMany()
     * 
     * // Get first 10 CompanySettings
     * const companySettings = await prisma.companySettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companySettingsWithIdOnly = await prisma.companySettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanySettingsFindManyArgs>(args?: SelectSubset<T, CompanySettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanySettings.
     * @param {CompanySettingsCreateArgs} args - Arguments to create a CompanySettings.
     * @example
     * // Create one CompanySettings
     * const CompanySettings = await prisma.companySettings.create({
     *   data: {
     *     // ... data to create a CompanySettings
     *   }
     * })
     * 
     */
    create<T extends CompanySettingsCreateArgs>(args: SelectSubset<T, CompanySettingsCreateArgs<ExtArgs>>): Prisma__CompanySettingsClient<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanySettings.
     * @param {CompanySettingsCreateManyArgs} args - Arguments to create many CompanySettings.
     * @example
     * // Create many CompanySettings
     * const companySettings = await prisma.companySettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanySettingsCreateManyArgs>(args?: SelectSubset<T, CompanySettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanySettings and returns the data saved in the database.
     * @param {CompanySettingsCreateManyAndReturnArgs} args - Arguments to create many CompanySettings.
     * @example
     * // Create many CompanySettings
     * const companySettings = await prisma.companySettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanySettings and only return the `id`
     * const companySettingsWithIdOnly = await prisma.companySettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanySettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanySettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompanySettings.
     * @param {CompanySettingsDeleteArgs} args - Arguments to delete one CompanySettings.
     * @example
     * // Delete one CompanySettings
     * const CompanySettings = await prisma.companySettings.delete({
     *   where: {
     *     // ... filter to delete one CompanySettings
     *   }
     * })
     * 
     */
    delete<T extends CompanySettingsDeleteArgs>(args: SelectSubset<T, CompanySettingsDeleteArgs<ExtArgs>>): Prisma__CompanySettingsClient<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanySettings.
     * @param {CompanySettingsUpdateArgs} args - Arguments to update one CompanySettings.
     * @example
     * // Update one CompanySettings
     * const companySettings = await prisma.companySettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanySettingsUpdateArgs>(args: SelectSubset<T, CompanySettingsUpdateArgs<ExtArgs>>): Prisma__CompanySettingsClient<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanySettings.
     * @param {CompanySettingsDeleteManyArgs} args - Arguments to filter CompanySettings to delete.
     * @example
     * // Delete a few CompanySettings
     * const { count } = await prisma.companySettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanySettingsDeleteManyArgs>(args?: SelectSubset<T, CompanySettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanySettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanySettings
     * const companySettings = await prisma.companySettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanySettingsUpdateManyArgs>(args: SelectSubset<T, CompanySettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanySettings and returns the data updated in the database.
     * @param {CompanySettingsUpdateManyAndReturnArgs} args - Arguments to update many CompanySettings.
     * @example
     * // Update many CompanySettings
     * const companySettings = await prisma.companySettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompanySettings and only return the `id`
     * const companySettingsWithIdOnly = await prisma.companySettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanySettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanySettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompanySettings.
     * @param {CompanySettingsUpsertArgs} args - Arguments to update or create a CompanySettings.
     * @example
     * // Update or create a CompanySettings
     * const companySettings = await prisma.companySettings.upsert({
     *   create: {
     *     // ... data to create a CompanySettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanySettings we want to update
     *   }
     * })
     */
    upsert<T extends CompanySettingsUpsertArgs>(args: SelectSubset<T, CompanySettingsUpsertArgs<ExtArgs>>): Prisma__CompanySettingsClient<$Result.GetResult<Prisma.$CompanySettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanySettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingsCountArgs} args - Arguments to filter CompanySettings to count.
     * @example
     * // Count the number of CompanySettings
     * const count = await prisma.companySettings.count({
     *   where: {
     *     // ... the filter for the CompanySettings we want to count
     *   }
     * })
    **/
    count<T extends CompanySettingsCountArgs>(
      args?: Subset<T, CompanySettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanySettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanySettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanySettingsAggregateArgs>(args: Subset<T, CompanySettingsAggregateArgs>): Prisma.PrismaPromise<GetCompanySettingsAggregateType<T>>

    /**
     * Group by CompanySettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanySettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanySettingsGroupByArgs['orderBy'] }
        : { orderBy?: CompanySettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanySettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanySettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanySettings model
   */
  readonly fields: CompanySettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanySettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanySettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanySettings model
   */
  interface CompanySettingsFieldRefs {
    readonly id: FieldRef<"CompanySettings", 'String'>
    readonly companyName: FieldRef<"CompanySettings", 'String'>
    readonly logoUrl: FieldRef<"CompanySettings", 'String'>
    readonly address: FieldRef<"CompanySettings", 'String'>
    readonly gstin: FieldRef<"CompanySettings", 'String'>
    readonly phones: FieldRef<"CompanySettings", 'String'>
    readonly email: FieldRef<"CompanySettings", 'String'>
    readonly signatureUrl: FieldRef<"CompanySettings", 'String'>
    readonly defaultGstRate: FieldRef<"CompanySettings", 'Decimal'>
    readonly terms: FieldRef<"CompanySettings", 'String'>
    readonly paymentTerms: FieldRef<"CompanySettings", 'String'>
    readonly createdAt: FieldRef<"CompanySettings", 'DateTime'>
    readonly updatedAt: FieldRef<"CompanySettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompanySettings findUnique
   */
  export type CompanySettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * Filter, which CompanySettings to fetch.
     */
    where: CompanySettingsWhereUniqueInput
  }

  /**
   * CompanySettings findUniqueOrThrow
   */
  export type CompanySettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * Filter, which CompanySettings to fetch.
     */
    where: CompanySettingsWhereUniqueInput
  }

  /**
   * CompanySettings findFirst
   */
  export type CompanySettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * Filter, which CompanySettings to fetch.
     */
    where?: CompanySettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySettings to fetch.
     */
    orderBy?: CompanySettingsOrderByWithRelationInput | CompanySettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanySettings.
     */
    cursor?: CompanySettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanySettings.
     */
    distinct?: CompanySettingsScalarFieldEnum | CompanySettingsScalarFieldEnum[]
  }

  /**
   * CompanySettings findFirstOrThrow
   */
  export type CompanySettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * Filter, which CompanySettings to fetch.
     */
    where?: CompanySettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySettings to fetch.
     */
    orderBy?: CompanySettingsOrderByWithRelationInput | CompanySettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanySettings.
     */
    cursor?: CompanySettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanySettings.
     */
    distinct?: CompanySettingsScalarFieldEnum | CompanySettingsScalarFieldEnum[]
  }

  /**
   * CompanySettings findMany
   */
  export type CompanySettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * Filter, which CompanySettings to fetch.
     */
    where?: CompanySettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySettings to fetch.
     */
    orderBy?: CompanySettingsOrderByWithRelationInput | CompanySettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanySettings.
     */
    cursor?: CompanySettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySettings.
     */
    skip?: number
    distinct?: CompanySettingsScalarFieldEnum | CompanySettingsScalarFieldEnum[]
  }

  /**
   * CompanySettings create
   */
  export type CompanySettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a CompanySettings.
     */
    data: XOR<CompanySettingsCreateInput, CompanySettingsUncheckedCreateInput>
  }

  /**
   * CompanySettings createMany
   */
  export type CompanySettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanySettings.
     */
    data: CompanySettingsCreateManyInput | CompanySettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanySettings createManyAndReturn
   */
  export type CompanySettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * The data used to create many CompanySettings.
     */
    data: CompanySettingsCreateManyInput | CompanySettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanySettings update
   */
  export type CompanySettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a CompanySettings.
     */
    data: XOR<CompanySettingsUpdateInput, CompanySettingsUncheckedUpdateInput>
    /**
     * Choose, which CompanySettings to update.
     */
    where: CompanySettingsWhereUniqueInput
  }

  /**
   * CompanySettings updateMany
   */
  export type CompanySettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanySettings.
     */
    data: XOR<CompanySettingsUpdateManyMutationInput, CompanySettingsUncheckedUpdateManyInput>
    /**
     * Filter which CompanySettings to update
     */
    where?: CompanySettingsWhereInput
    /**
     * Limit how many CompanySettings to update.
     */
    limit?: number
  }

  /**
   * CompanySettings updateManyAndReturn
   */
  export type CompanySettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * The data used to update CompanySettings.
     */
    data: XOR<CompanySettingsUpdateManyMutationInput, CompanySettingsUncheckedUpdateManyInput>
    /**
     * Filter which CompanySettings to update
     */
    where?: CompanySettingsWhereInput
    /**
     * Limit how many CompanySettings to update.
     */
    limit?: number
  }

  /**
   * CompanySettings upsert
   */
  export type CompanySettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the CompanySettings to update in case it exists.
     */
    where: CompanySettingsWhereUniqueInput
    /**
     * In case the CompanySettings found by the `where` argument doesn't exist, create a new CompanySettings with this data.
     */
    create: XOR<CompanySettingsCreateInput, CompanySettingsUncheckedCreateInput>
    /**
     * In case the CompanySettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanySettingsUpdateInput, CompanySettingsUncheckedUpdateInput>
  }

  /**
   * CompanySettings delete
   */
  export type CompanySettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
    /**
     * Filter which CompanySettings to delete.
     */
    where: CompanySettingsWhereUniqueInput
  }

  /**
   * CompanySettings deleteMany
   */
  export type CompanySettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanySettings to delete
     */
    where?: CompanySettingsWhereInput
    /**
     * Limit how many CompanySettings to delete.
     */
    limit?: number
  }

  /**
   * CompanySettings without action
   */
  export type CompanySettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySettings
     */
    select?: CompanySettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySettings
     */
    omit?: CompanySettingsOmit<ExtArgs> | null
  }


  /**
   * Model Quotation
   */

  export type AggregateQuotation = {
    _count: QuotationCountAggregateOutputType | null
    _avg: QuotationAvgAggregateOutputType | null
    _sum: QuotationSumAggregateOutputType | null
    _min: QuotationMinAggregateOutputType | null
    _max: QuotationMaxAggregateOutputType | null
  }

  export type QuotationAvgAggregateOutputType = {
    gstPercent: Decimal | null
    subtotal: Decimal | null
    gstAmount: Decimal | null
    grandTotal: Decimal | null
  }

  export type QuotationSumAggregateOutputType = {
    gstPercent: Decimal | null
    subtotal: Decimal | null
    gstAmount: Decimal | null
    grandTotal: Decimal | null
  }

  export type QuotationMinAggregateOutputType = {
    id: string | null
    quoteNumber: string | null
    title: string | null
    customerId: string | null
    date: Date | null
    gstPercent: Decimal | null
    subtotal: Decimal | null
    gstAmount: Decimal | null
    grandTotal: Decimal | null
    amountInWords: string | null
    notes: string | null
    terms: string | null
    paymentTerms: string | null
    isDraft: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuotationMaxAggregateOutputType = {
    id: string | null
    quoteNumber: string | null
    title: string | null
    customerId: string | null
    date: Date | null
    gstPercent: Decimal | null
    subtotal: Decimal | null
    gstAmount: Decimal | null
    grandTotal: Decimal | null
    amountInWords: string | null
    notes: string | null
    terms: string | null
    paymentTerms: string | null
    isDraft: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuotationCountAggregateOutputType = {
    id: number
    quoteNumber: number
    title: number
    customerId: number
    date: number
    gstPercent: number
    subtotal: number
    gstAmount: number
    grandTotal: number
    amountInWords: number
    notes: number
    terms: number
    paymentTerms: number
    projectSpecifications: number
    sections: number
    isDraft: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuotationAvgAggregateInputType = {
    gstPercent?: true
    subtotal?: true
    gstAmount?: true
    grandTotal?: true
  }

  export type QuotationSumAggregateInputType = {
    gstPercent?: true
    subtotal?: true
    gstAmount?: true
    grandTotal?: true
  }

  export type QuotationMinAggregateInputType = {
    id?: true
    quoteNumber?: true
    title?: true
    customerId?: true
    date?: true
    gstPercent?: true
    subtotal?: true
    gstAmount?: true
    grandTotal?: true
    amountInWords?: true
    notes?: true
    terms?: true
    paymentTerms?: true
    isDraft?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuotationMaxAggregateInputType = {
    id?: true
    quoteNumber?: true
    title?: true
    customerId?: true
    date?: true
    gstPercent?: true
    subtotal?: true
    gstAmount?: true
    grandTotal?: true
    amountInWords?: true
    notes?: true
    terms?: true
    paymentTerms?: true
    isDraft?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuotationCountAggregateInputType = {
    id?: true
    quoteNumber?: true
    title?: true
    customerId?: true
    date?: true
    gstPercent?: true
    subtotal?: true
    gstAmount?: true
    grandTotal?: true
    amountInWords?: true
    notes?: true
    terms?: true
    paymentTerms?: true
    projectSpecifications?: true
    sections?: true
    isDraft?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuotationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quotation to aggregate.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quotations
    **/
    _count?: true | QuotationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuotationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuotationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuotationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuotationMaxAggregateInputType
  }

  export type GetQuotationAggregateType<T extends QuotationAggregateArgs> = {
        [P in keyof T & keyof AggregateQuotation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuotation[P]>
      : GetScalarType<T[P], AggregateQuotation[P]>
  }




  export type QuotationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationWhereInput
    orderBy?: QuotationOrderByWithAggregationInput | QuotationOrderByWithAggregationInput[]
    by: QuotationScalarFieldEnum[] | QuotationScalarFieldEnum
    having?: QuotationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuotationCountAggregateInputType | true
    _avg?: QuotationAvgAggregateInputType
    _sum?: QuotationSumAggregateInputType
    _min?: QuotationMinAggregateInputType
    _max?: QuotationMaxAggregateInputType
  }

  export type QuotationGroupByOutputType = {
    id: string
    quoteNumber: string
    title: string
    customerId: string
    date: Date
    gstPercent: Decimal
    subtotal: Decimal
    gstAmount: Decimal
    grandTotal: Decimal
    amountInWords: string
    notes: string
    terms: string
    paymentTerms: string
    projectSpecifications: JsonValue
    sections: JsonValue
    isDraft: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: QuotationCountAggregateOutputType | null
    _avg: QuotationAvgAggregateOutputType | null
    _sum: QuotationSumAggregateOutputType | null
    _min: QuotationMinAggregateOutputType | null
    _max: QuotationMaxAggregateOutputType | null
  }

  type GetQuotationGroupByPayload<T extends QuotationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuotationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuotationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuotationGroupByOutputType[P]>
            : GetScalarType<T[P], QuotationGroupByOutputType[P]>
        }
      >
    >


  export type QuotationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quoteNumber?: boolean
    title?: boolean
    customerId?: boolean
    date?: boolean
    gstPercent?: boolean
    subtotal?: boolean
    gstAmount?: boolean
    grandTotal?: boolean
    amountInWords?: boolean
    notes?: boolean
    terms?: boolean
    paymentTerms?: boolean
    projectSpecifications?: boolean
    sections?: boolean
    isDraft?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    items?: boolean | Quotation$itemsArgs<ExtArgs>
    _count?: boolean | QuotationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotation"]>

  export type QuotationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quoteNumber?: boolean
    title?: boolean
    customerId?: boolean
    date?: boolean
    gstPercent?: boolean
    subtotal?: boolean
    gstAmount?: boolean
    grandTotal?: boolean
    amountInWords?: boolean
    notes?: boolean
    terms?: boolean
    paymentTerms?: boolean
    projectSpecifications?: boolean
    sections?: boolean
    isDraft?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotation"]>

  export type QuotationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quoteNumber?: boolean
    title?: boolean
    customerId?: boolean
    date?: boolean
    gstPercent?: boolean
    subtotal?: boolean
    gstAmount?: boolean
    grandTotal?: boolean
    amountInWords?: boolean
    notes?: boolean
    terms?: boolean
    paymentTerms?: boolean
    projectSpecifications?: boolean
    sections?: boolean
    isDraft?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotation"]>

  export type QuotationSelectScalar = {
    id?: boolean
    quoteNumber?: boolean
    title?: boolean
    customerId?: boolean
    date?: boolean
    gstPercent?: boolean
    subtotal?: boolean
    gstAmount?: boolean
    grandTotal?: boolean
    amountInWords?: boolean
    notes?: boolean
    terms?: boolean
    paymentTerms?: boolean
    projectSpecifications?: boolean
    sections?: boolean
    isDraft?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuotationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quoteNumber" | "title" | "customerId" | "date" | "gstPercent" | "subtotal" | "gstAmount" | "grandTotal" | "amountInWords" | "notes" | "terms" | "paymentTerms" | "projectSpecifications" | "sections" | "isDraft" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["quotation"]>
  export type QuotationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    items?: boolean | Quotation$itemsArgs<ExtArgs>
    _count?: boolean | QuotationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuotationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type QuotationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $QuotationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quotation"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      items: Prisma.$QuotationItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quoteNumber: string
      title: string
      customerId: string
      date: Date
      gstPercent: Prisma.Decimal
      subtotal: Prisma.Decimal
      gstAmount: Prisma.Decimal
      grandTotal: Prisma.Decimal
      amountInWords: string
      notes: string
      terms: string
      paymentTerms: string
      projectSpecifications: Prisma.JsonValue
      sections: Prisma.JsonValue
      isDraft: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["quotation"]>
    composites: {}
  }

  type QuotationGetPayload<S extends boolean | null | undefined | QuotationDefaultArgs> = $Result.GetResult<Prisma.$QuotationPayload, S>

  type QuotationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuotationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuotationCountAggregateInputType | true
    }

  export interface QuotationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quotation'], meta: { name: 'Quotation' } }
    /**
     * Find zero or one Quotation that matches the filter.
     * @param {QuotationFindUniqueArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuotationFindUniqueArgs>(args: SelectSubset<T, QuotationFindUniqueArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quotation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuotationFindUniqueOrThrowArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuotationFindUniqueOrThrowArgs>(args: SelectSubset<T, QuotationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quotation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFindFirstArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuotationFindFirstArgs>(args?: SelectSubset<T, QuotationFindFirstArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quotation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFindFirstOrThrowArgs} args - Arguments to find a Quotation
     * @example
     * // Get one Quotation
     * const quotation = await prisma.quotation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuotationFindFirstOrThrowArgs>(args?: SelectSubset<T, QuotationFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quotations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quotations
     * const quotations = await prisma.quotation.findMany()
     * 
     * // Get first 10 Quotations
     * const quotations = await prisma.quotation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quotationWithIdOnly = await prisma.quotation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuotationFindManyArgs>(args?: SelectSubset<T, QuotationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quotation.
     * @param {QuotationCreateArgs} args - Arguments to create a Quotation.
     * @example
     * // Create one Quotation
     * const Quotation = await prisma.quotation.create({
     *   data: {
     *     // ... data to create a Quotation
     *   }
     * })
     * 
     */
    create<T extends QuotationCreateArgs>(args: SelectSubset<T, QuotationCreateArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quotations.
     * @param {QuotationCreateManyArgs} args - Arguments to create many Quotations.
     * @example
     * // Create many Quotations
     * const quotation = await prisma.quotation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuotationCreateManyArgs>(args?: SelectSubset<T, QuotationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quotations and returns the data saved in the database.
     * @param {QuotationCreateManyAndReturnArgs} args - Arguments to create many Quotations.
     * @example
     * // Create many Quotations
     * const quotation = await prisma.quotation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quotations and only return the `id`
     * const quotationWithIdOnly = await prisma.quotation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuotationCreateManyAndReturnArgs>(args?: SelectSubset<T, QuotationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Quotation.
     * @param {QuotationDeleteArgs} args - Arguments to delete one Quotation.
     * @example
     * // Delete one Quotation
     * const Quotation = await prisma.quotation.delete({
     *   where: {
     *     // ... filter to delete one Quotation
     *   }
     * })
     * 
     */
    delete<T extends QuotationDeleteArgs>(args: SelectSubset<T, QuotationDeleteArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quotation.
     * @param {QuotationUpdateArgs} args - Arguments to update one Quotation.
     * @example
     * // Update one Quotation
     * const quotation = await prisma.quotation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuotationUpdateArgs>(args: SelectSubset<T, QuotationUpdateArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quotations.
     * @param {QuotationDeleteManyArgs} args - Arguments to filter Quotations to delete.
     * @example
     * // Delete a few Quotations
     * const { count } = await prisma.quotation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuotationDeleteManyArgs>(args?: SelectSubset<T, QuotationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quotations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quotations
     * const quotation = await prisma.quotation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuotationUpdateManyArgs>(args: SelectSubset<T, QuotationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quotations and returns the data updated in the database.
     * @param {QuotationUpdateManyAndReturnArgs} args - Arguments to update many Quotations.
     * @example
     * // Update many Quotations
     * const quotation = await prisma.quotation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Quotations and only return the `id`
     * const quotationWithIdOnly = await prisma.quotation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuotationUpdateManyAndReturnArgs>(args: SelectSubset<T, QuotationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Quotation.
     * @param {QuotationUpsertArgs} args - Arguments to update or create a Quotation.
     * @example
     * // Update or create a Quotation
     * const quotation = await prisma.quotation.upsert({
     *   create: {
     *     // ... data to create a Quotation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quotation we want to update
     *   }
     * })
     */
    upsert<T extends QuotationUpsertArgs>(args: SelectSubset<T, QuotationUpsertArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quotations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationCountArgs} args - Arguments to filter Quotations to count.
     * @example
     * // Count the number of Quotations
     * const count = await prisma.quotation.count({
     *   where: {
     *     // ... the filter for the Quotations we want to count
     *   }
     * })
    **/
    count<T extends QuotationCountArgs>(
      args?: Subset<T, QuotationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuotationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quotation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuotationAggregateArgs>(args: Subset<T, QuotationAggregateArgs>): Prisma.PrismaPromise<GetQuotationAggregateType<T>>

    /**
     * Group by Quotation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuotationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuotationGroupByArgs['orderBy'] }
        : { orderBy?: QuotationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuotationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuotationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quotation model
   */
  readonly fields: QuotationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quotation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuotationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Quotation$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Quotation$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Quotation model
   */
  interface QuotationFieldRefs {
    readonly id: FieldRef<"Quotation", 'String'>
    readonly quoteNumber: FieldRef<"Quotation", 'String'>
    readonly title: FieldRef<"Quotation", 'String'>
    readonly customerId: FieldRef<"Quotation", 'String'>
    readonly date: FieldRef<"Quotation", 'DateTime'>
    readonly gstPercent: FieldRef<"Quotation", 'Decimal'>
    readonly subtotal: FieldRef<"Quotation", 'Decimal'>
    readonly gstAmount: FieldRef<"Quotation", 'Decimal'>
    readonly grandTotal: FieldRef<"Quotation", 'Decimal'>
    readonly amountInWords: FieldRef<"Quotation", 'String'>
    readonly notes: FieldRef<"Quotation", 'String'>
    readonly terms: FieldRef<"Quotation", 'String'>
    readonly paymentTerms: FieldRef<"Quotation", 'String'>
    readonly projectSpecifications: FieldRef<"Quotation", 'Json'>
    readonly sections: FieldRef<"Quotation", 'Json'>
    readonly isDraft: FieldRef<"Quotation", 'Boolean'>
    readonly deletedAt: FieldRef<"Quotation", 'DateTime'>
    readonly createdAt: FieldRef<"Quotation", 'DateTime'>
    readonly updatedAt: FieldRef<"Quotation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Quotation findUnique
   */
  export type QuotationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation findUniqueOrThrow
   */
  export type QuotationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation findFirst
   */
  export type QuotationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotations.
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotations.
     */
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Quotation findFirstOrThrow
   */
  export type QuotationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotation to fetch.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotations.
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotations.
     */
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Quotation findMany
   */
  export type QuotationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter, which Quotations to fetch.
     */
    where?: QuotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotations to fetch.
     */
    orderBy?: QuotationOrderByWithRelationInput | QuotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quotations.
     */
    cursor?: QuotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotations.
     */
    skip?: number
    distinct?: QuotationScalarFieldEnum | QuotationScalarFieldEnum[]
  }

  /**
   * Quotation create
   */
  export type QuotationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * The data needed to create a Quotation.
     */
    data: XOR<QuotationCreateInput, QuotationUncheckedCreateInput>
  }

  /**
   * Quotation createMany
   */
  export type QuotationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quotations.
     */
    data: QuotationCreateManyInput | QuotationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quotation createManyAndReturn
   */
  export type QuotationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * The data used to create many Quotations.
     */
    data: QuotationCreateManyInput | QuotationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Quotation update
   */
  export type QuotationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * The data needed to update a Quotation.
     */
    data: XOR<QuotationUpdateInput, QuotationUncheckedUpdateInput>
    /**
     * Choose, which Quotation to update.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation updateMany
   */
  export type QuotationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quotations.
     */
    data: XOR<QuotationUpdateManyMutationInput, QuotationUncheckedUpdateManyInput>
    /**
     * Filter which Quotations to update
     */
    where?: QuotationWhereInput
    /**
     * Limit how many Quotations to update.
     */
    limit?: number
  }

  /**
   * Quotation updateManyAndReturn
   */
  export type QuotationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * The data used to update Quotations.
     */
    data: XOR<QuotationUpdateManyMutationInput, QuotationUncheckedUpdateManyInput>
    /**
     * Filter which Quotations to update
     */
    where?: QuotationWhereInput
    /**
     * Limit how many Quotations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Quotation upsert
   */
  export type QuotationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * The filter to search for the Quotation to update in case it exists.
     */
    where: QuotationWhereUniqueInput
    /**
     * In case the Quotation found by the `where` argument doesn't exist, create a new Quotation with this data.
     */
    create: XOR<QuotationCreateInput, QuotationUncheckedCreateInput>
    /**
     * In case the Quotation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuotationUpdateInput, QuotationUncheckedUpdateInput>
  }

  /**
   * Quotation delete
   */
  export type QuotationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
    /**
     * Filter which Quotation to delete.
     */
    where: QuotationWhereUniqueInput
  }

  /**
   * Quotation deleteMany
   */
  export type QuotationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quotations to delete
     */
    where?: QuotationWhereInput
    /**
     * Limit how many Quotations to delete.
     */
    limit?: number
  }

  /**
   * Quotation.items
   */
  export type Quotation$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    where?: QuotationItemWhereInput
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    cursor?: QuotationItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuotationItemScalarFieldEnum | QuotationItemScalarFieldEnum[]
  }

  /**
   * Quotation without action
   */
  export type QuotationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quotation
     */
    select?: QuotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quotation
     */
    omit?: QuotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationInclude<ExtArgs> | null
  }


  /**
   * Model QuotationItem
   */

  export type AggregateQuotationItem = {
    _count: QuotationItemCountAggregateOutputType | null
    _avg: QuotationItemAvgAggregateOutputType | null
    _sum: QuotationItemSumAggregateOutputType | null
    _min: QuotationItemMinAggregateOutputType | null
    _max: QuotationItemMaxAggregateOutputType | null
  }

  export type QuotationItemAvgAggregateOutputType = {
    serialNo: number | null
    qty: Decimal | null
    rate: Decimal | null
    amount: Decimal | null
  }

  export type QuotationItemSumAggregateOutputType = {
    serialNo: number | null
    qty: Decimal | null
    rate: Decimal | null
    amount: Decimal | null
  }

  export type QuotationItemMinAggregateOutputType = {
    id: string | null
    quotationId: string | null
    section: string | null
    serialNo: number | null
    category: string | null
    description: string | null
    warranty: string | null
    qty: Decimal | null
    unit: string | null
    rate: Decimal | null
    amount: Decimal | null
    imageUrl: string | null
    imageText: string | null
    productId: string | null
    isCustom: boolean | null
    title: string | null
  }

  export type QuotationItemMaxAggregateOutputType = {
    id: string | null
    quotationId: string | null
    section: string | null
    serialNo: number | null
    category: string | null
    description: string | null
    warranty: string | null
    qty: Decimal | null
    unit: string | null
    rate: Decimal | null
    amount: Decimal | null
    imageUrl: string | null
    imageText: string | null
    productId: string | null
    isCustom: boolean | null
    title: string | null
  }

  export type QuotationItemCountAggregateOutputType = {
    id: number
    quotationId: number
    section: number
    serialNo: number
    category: number
    description: number
    warranty: number
    qty: number
    unit: number
    rate: number
    amount: number
    imageUrl: number
    imageText: number
    productId: number
    variableValues: number
    isCustom: number
    title: number
    _all: number
  }


  export type QuotationItemAvgAggregateInputType = {
    serialNo?: true
    qty?: true
    rate?: true
    amount?: true
  }

  export type QuotationItemSumAggregateInputType = {
    serialNo?: true
    qty?: true
    rate?: true
    amount?: true
  }

  export type QuotationItemMinAggregateInputType = {
    id?: true
    quotationId?: true
    section?: true
    serialNo?: true
    category?: true
    description?: true
    warranty?: true
    qty?: true
    unit?: true
    rate?: true
    amount?: true
    imageUrl?: true
    imageText?: true
    productId?: true
    isCustom?: true
    title?: true
  }

  export type QuotationItemMaxAggregateInputType = {
    id?: true
    quotationId?: true
    section?: true
    serialNo?: true
    category?: true
    description?: true
    warranty?: true
    qty?: true
    unit?: true
    rate?: true
    amount?: true
    imageUrl?: true
    imageText?: true
    productId?: true
    isCustom?: true
    title?: true
  }

  export type QuotationItemCountAggregateInputType = {
    id?: true
    quotationId?: true
    section?: true
    serialNo?: true
    category?: true
    description?: true
    warranty?: true
    qty?: true
    unit?: true
    rate?: true
    amount?: true
    imageUrl?: true
    imageText?: true
    productId?: true
    variableValues?: true
    isCustom?: true
    title?: true
    _all?: true
  }

  export type QuotationItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuotationItem to aggregate.
     */
    where?: QuotationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationItems to fetch.
     */
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuotationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuotationItems
    **/
    _count?: true | QuotationItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuotationItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuotationItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuotationItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuotationItemMaxAggregateInputType
  }

  export type GetQuotationItemAggregateType<T extends QuotationItemAggregateArgs> = {
        [P in keyof T & keyof AggregateQuotationItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuotationItem[P]>
      : GetScalarType<T[P], AggregateQuotationItem[P]>
  }




  export type QuotationItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuotationItemWhereInput
    orderBy?: QuotationItemOrderByWithAggregationInput | QuotationItemOrderByWithAggregationInput[]
    by: QuotationItemScalarFieldEnum[] | QuotationItemScalarFieldEnum
    having?: QuotationItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuotationItemCountAggregateInputType | true
    _avg?: QuotationItemAvgAggregateInputType
    _sum?: QuotationItemSumAggregateInputType
    _min?: QuotationItemMinAggregateInputType
    _max?: QuotationItemMaxAggregateInputType
  }

  export type QuotationItemGroupByOutputType = {
    id: string
    quotationId: string
    section: string
    serialNo: number
    category: string
    description: string
    warranty: string
    qty: Decimal
    unit: string
    rate: Decimal
    amount: Decimal
    imageUrl: string | null
    imageText: string | null
    productId: string | null
    variableValues: JsonValue
    isCustom: boolean
    title: string
    _count: QuotationItemCountAggregateOutputType | null
    _avg: QuotationItemAvgAggregateOutputType | null
    _sum: QuotationItemSumAggregateOutputType | null
    _min: QuotationItemMinAggregateOutputType | null
    _max: QuotationItemMaxAggregateOutputType | null
  }

  type GetQuotationItemGroupByPayload<T extends QuotationItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuotationItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuotationItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuotationItemGroupByOutputType[P]>
            : GetScalarType<T[P], QuotationItemGroupByOutputType[P]>
        }
      >
    >


  export type QuotationItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quotationId?: boolean
    section?: boolean
    serialNo?: boolean
    category?: boolean
    description?: boolean
    warranty?: boolean
    qty?: boolean
    unit?: boolean
    rate?: boolean
    amount?: boolean
    imageUrl?: boolean
    imageText?: boolean
    productId?: boolean
    variableValues?: boolean
    isCustom?: boolean
    title?: boolean
    product?: boolean | QuotationItem$productArgs<ExtArgs>
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotationItem"]>

  export type QuotationItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quotationId?: boolean
    section?: boolean
    serialNo?: boolean
    category?: boolean
    description?: boolean
    warranty?: boolean
    qty?: boolean
    unit?: boolean
    rate?: boolean
    amount?: boolean
    imageUrl?: boolean
    imageText?: boolean
    productId?: boolean
    variableValues?: boolean
    isCustom?: boolean
    title?: boolean
    product?: boolean | QuotationItem$productArgs<ExtArgs>
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotationItem"]>

  export type QuotationItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quotationId?: boolean
    section?: boolean
    serialNo?: boolean
    category?: boolean
    description?: boolean
    warranty?: boolean
    qty?: boolean
    unit?: boolean
    rate?: boolean
    amount?: boolean
    imageUrl?: boolean
    imageText?: boolean
    productId?: boolean
    variableValues?: boolean
    isCustom?: boolean
    title?: boolean
    product?: boolean | QuotationItem$productArgs<ExtArgs>
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quotationItem"]>

  export type QuotationItemSelectScalar = {
    id?: boolean
    quotationId?: boolean
    section?: boolean
    serialNo?: boolean
    category?: boolean
    description?: boolean
    warranty?: boolean
    qty?: boolean
    unit?: boolean
    rate?: boolean
    amount?: boolean
    imageUrl?: boolean
    imageText?: boolean
    productId?: boolean
    variableValues?: boolean
    isCustom?: boolean
    title?: boolean
  }

  export type QuotationItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quotationId" | "section" | "serialNo" | "category" | "description" | "warranty" | "qty" | "unit" | "rate" | "amount" | "imageUrl" | "imageText" | "productId" | "variableValues" | "isCustom" | "title", ExtArgs["result"]["quotationItem"]>
  export type QuotationItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | QuotationItem$productArgs<ExtArgs>
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }
  export type QuotationItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | QuotationItem$productArgs<ExtArgs>
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }
  export type QuotationItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | QuotationItem$productArgs<ExtArgs>
    quotation?: boolean | QuotationDefaultArgs<ExtArgs>
  }

  export type $QuotationItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuotationItem"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs> | null
      quotation: Prisma.$QuotationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quotationId: string
      section: string
      serialNo: number
      category: string
      description: string
      warranty: string
      qty: Prisma.Decimal
      unit: string
      rate: Prisma.Decimal
      amount: Prisma.Decimal
      imageUrl: string | null
      imageText: string | null
      productId: string | null
      variableValues: Prisma.JsonValue
      isCustom: boolean
      title: string
    }, ExtArgs["result"]["quotationItem"]>
    composites: {}
  }

  type QuotationItemGetPayload<S extends boolean | null | undefined | QuotationItemDefaultArgs> = $Result.GetResult<Prisma.$QuotationItemPayload, S>

  type QuotationItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuotationItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuotationItemCountAggregateInputType | true
    }

  export interface QuotationItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuotationItem'], meta: { name: 'QuotationItem' } }
    /**
     * Find zero or one QuotationItem that matches the filter.
     * @param {QuotationItemFindUniqueArgs} args - Arguments to find a QuotationItem
     * @example
     * // Get one QuotationItem
     * const quotationItem = await prisma.quotationItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuotationItemFindUniqueArgs>(args: SelectSubset<T, QuotationItemFindUniqueArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuotationItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuotationItemFindUniqueOrThrowArgs} args - Arguments to find a QuotationItem
     * @example
     * // Get one QuotationItem
     * const quotationItem = await prisma.quotationItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuotationItemFindUniqueOrThrowArgs>(args: SelectSubset<T, QuotationItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuotationItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemFindFirstArgs} args - Arguments to find a QuotationItem
     * @example
     * // Get one QuotationItem
     * const quotationItem = await prisma.quotationItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuotationItemFindFirstArgs>(args?: SelectSubset<T, QuotationItemFindFirstArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuotationItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemFindFirstOrThrowArgs} args - Arguments to find a QuotationItem
     * @example
     * // Get one QuotationItem
     * const quotationItem = await prisma.quotationItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuotationItemFindFirstOrThrowArgs>(args?: SelectSubset<T, QuotationItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuotationItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuotationItems
     * const quotationItems = await prisma.quotationItem.findMany()
     * 
     * // Get first 10 QuotationItems
     * const quotationItems = await prisma.quotationItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quotationItemWithIdOnly = await prisma.quotationItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuotationItemFindManyArgs>(args?: SelectSubset<T, QuotationItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuotationItem.
     * @param {QuotationItemCreateArgs} args - Arguments to create a QuotationItem.
     * @example
     * // Create one QuotationItem
     * const QuotationItem = await prisma.quotationItem.create({
     *   data: {
     *     // ... data to create a QuotationItem
     *   }
     * })
     * 
     */
    create<T extends QuotationItemCreateArgs>(args: SelectSubset<T, QuotationItemCreateArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuotationItems.
     * @param {QuotationItemCreateManyArgs} args - Arguments to create many QuotationItems.
     * @example
     * // Create many QuotationItems
     * const quotationItem = await prisma.quotationItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuotationItemCreateManyArgs>(args?: SelectSubset<T, QuotationItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuotationItems and returns the data saved in the database.
     * @param {QuotationItemCreateManyAndReturnArgs} args - Arguments to create many QuotationItems.
     * @example
     * // Create many QuotationItems
     * const quotationItem = await prisma.quotationItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuotationItems and only return the `id`
     * const quotationItemWithIdOnly = await prisma.quotationItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuotationItemCreateManyAndReturnArgs>(args?: SelectSubset<T, QuotationItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuotationItem.
     * @param {QuotationItemDeleteArgs} args - Arguments to delete one QuotationItem.
     * @example
     * // Delete one QuotationItem
     * const QuotationItem = await prisma.quotationItem.delete({
     *   where: {
     *     // ... filter to delete one QuotationItem
     *   }
     * })
     * 
     */
    delete<T extends QuotationItemDeleteArgs>(args: SelectSubset<T, QuotationItemDeleteArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuotationItem.
     * @param {QuotationItemUpdateArgs} args - Arguments to update one QuotationItem.
     * @example
     * // Update one QuotationItem
     * const quotationItem = await prisma.quotationItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuotationItemUpdateArgs>(args: SelectSubset<T, QuotationItemUpdateArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuotationItems.
     * @param {QuotationItemDeleteManyArgs} args - Arguments to filter QuotationItems to delete.
     * @example
     * // Delete a few QuotationItems
     * const { count } = await prisma.quotationItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuotationItemDeleteManyArgs>(args?: SelectSubset<T, QuotationItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuotationItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuotationItems
     * const quotationItem = await prisma.quotationItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuotationItemUpdateManyArgs>(args: SelectSubset<T, QuotationItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuotationItems and returns the data updated in the database.
     * @param {QuotationItemUpdateManyAndReturnArgs} args - Arguments to update many QuotationItems.
     * @example
     * // Update many QuotationItems
     * const quotationItem = await prisma.quotationItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuotationItems and only return the `id`
     * const quotationItemWithIdOnly = await prisma.quotationItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuotationItemUpdateManyAndReturnArgs>(args: SelectSubset<T, QuotationItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuotationItem.
     * @param {QuotationItemUpsertArgs} args - Arguments to update or create a QuotationItem.
     * @example
     * // Update or create a QuotationItem
     * const quotationItem = await prisma.quotationItem.upsert({
     *   create: {
     *     // ... data to create a QuotationItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuotationItem we want to update
     *   }
     * })
     */
    upsert<T extends QuotationItemUpsertArgs>(args: SelectSubset<T, QuotationItemUpsertArgs<ExtArgs>>): Prisma__QuotationItemClient<$Result.GetResult<Prisma.$QuotationItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuotationItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemCountArgs} args - Arguments to filter QuotationItems to count.
     * @example
     * // Count the number of QuotationItems
     * const count = await prisma.quotationItem.count({
     *   where: {
     *     // ... the filter for the QuotationItems we want to count
     *   }
     * })
    **/
    count<T extends QuotationItemCountArgs>(
      args?: Subset<T, QuotationItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuotationItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuotationItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuotationItemAggregateArgs>(args: Subset<T, QuotationItemAggregateArgs>): Prisma.PrismaPromise<GetQuotationItemAggregateType<T>>

    /**
     * Group by QuotationItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuotationItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuotationItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuotationItemGroupByArgs['orderBy'] }
        : { orderBy?: QuotationItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuotationItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuotationItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuotationItem model
   */
  readonly fields: QuotationItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuotationItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuotationItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends QuotationItem$productArgs<ExtArgs> = {}>(args?: Subset<T, QuotationItem$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    quotation<T extends QuotationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuotationDefaultArgs<ExtArgs>>): Prisma__QuotationClient<$Result.GetResult<Prisma.$QuotationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuotationItem model
   */
  interface QuotationItemFieldRefs {
    readonly id: FieldRef<"QuotationItem", 'String'>
    readonly quotationId: FieldRef<"QuotationItem", 'String'>
    readonly section: FieldRef<"QuotationItem", 'String'>
    readonly serialNo: FieldRef<"QuotationItem", 'Int'>
    readonly category: FieldRef<"QuotationItem", 'String'>
    readonly description: FieldRef<"QuotationItem", 'String'>
    readonly warranty: FieldRef<"QuotationItem", 'String'>
    readonly qty: FieldRef<"QuotationItem", 'Decimal'>
    readonly unit: FieldRef<"QuotationItem", 'String'>
    readonly rate: FieldRef<"QuotationItem", 'Decimal'>
    readonly amount: FieldRef<"QuotationItem", 'Decimal'>
    readonly imageUrl: FieldRef<"QuotationItem", 'String'>
    readonly imageText: FieldRef<"QuotationItem", 'String'>
    readonly productId: FieldRef<"QuotationItem", 'String'>
    readonly variableValues: FieldRef<"QuotationItem", 'Json'>
    readonly isCustom: FieldRef<"QuotationItem", 'Boolean'>
    readonly title: FieldRef<"QuotationItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * QuotationItem findUnique
   */
  export type QuotationItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter, which QuotationItem to fetch.
     */
    where: QuotationItemWhereUniqueInput
  }

  /**
   * QuotationItem findUniqueOrThrow
   */
  export type QuotationItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter, which QuotationItem to fetch.
     */
    where: QuotationItemWhereUniqueInput
  }

  /**
   * QuotationItem findFirst
   */
  export type QuotationItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter, which QuotationItem to fetch.
     */
    where?: QuotationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationItems to fetch.
     */
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuotationItems.
     */
    cursor?: QuotationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuotationItems.
     */
    distinct?: QuotationItemScalarFieldEnum | QuotationItemScalarFieldEnum[]
  }

  /**
   * QuotationItem findFirstOrThrow
   */
  export type QuotationItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter, which QuotationItem to fetch.
     */
    where?: QuotationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationItems to fetch.
     */
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuotationItems.
     */
    cursor?: QuotationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuotationItems.
     */
    distinct?: QuotationItemScalarFieldEnum | QuotationItemScalarFieldEnum[]
  }

  /**
   * QuotationItem findMany
   */
  export type QuotationItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter, which QuotationItems to fetch.
     */
    where?: QuotationItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuotationItems to fetch.
     */
    orderBy?: QuotationItemOrderByWithRelationInput | QuotationItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuotationItems.
     */
    cursor?: QuotationItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuotationItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuotationItems.
     */
    skip?: number
    distinct?: QuotationItemScalarFieldEnum | QuotationItemScalarFieldEnum[]
  }

  /**
   * QuotationItem create
   */
  export type QuotationItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * The data needed to create a QuotationItem.
     */
    data: XOR<QuotationItemCreateInput, QuotationItemUncheckedCreateInput>
  }

  /**
   * QuotationItem createMany
   */
  export type QuotationItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuotationItems.
     */
    data: QuotationItemCreateManyInput | QuotationItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuotationItem createManyAndReturn
   */
  export type QuotationItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * The data used to create many QuotationItems.
     */
    data: QuotationItemCreateManyInput | QuotationItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuotationItem update
   */
  export type QuotationItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * The data needed to update a QuotationItem.
     */
    data: XOR<QuotationItemUpdateInput, QuotationItemUncheckedUpdateInput>
    /**
     * Choose, which QuotationItem to update.
     */
    where: QuotationItemWhereUniqueInput
  }

  /**
   * QuotationItem updateMany
   */
  export type QuotationItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuotationItems.
     */
    data: XOR<QuotationItemUpdateManyMutationInput, QuotationItemUncheckedUpdateManyInput>
    /**
     * Filter which QuotationItems to update
     */
    where?: QuotationItemWhereInput
    /**
     * Limit how many QuotationItems to update.
     */
    limit?: number
  }

  /**
   * QuotationItem updateManyAndReturn
   */
  export type QuotationItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * The data used to update QuotationItems.
     */
    data: XOR<QuotationItemUpdateManyMutationInput, QuotationItemUncheckedUpdateManyInput>
    /**
     * Filter which QuotationItems to update
     */
    where?: QuotationItemWhereInput
    /**
     * Limit how many QuotationItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuotationItem upsert
   */
  export type QuotationItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * The filter to search for the QuotationItem to update in case it exists.
     */
    where: QuotationItemWhereUniqueInput
    /**
     * In case the QuotationItem found by the `where` argument doesn't exist, create a new QuotationItem with this data.
     */
    create: XOR<QuotationItemCreateInput, QuotationItemUncheckedCreateInput>
    /**
     * In case the QuotationItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuotationItemUpdateInput, QuotationItemUncheckedUpdateInput>
  }

  /**
   * QuotationItem delete
   */
  export type QuotationItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
    /**
     * Filter which QuotationItem to delete.
     */
    where: QuotationItemWhereUniqueInput
  }

  /**
   * QuotationItem deleteMany
   */
  export type QuotationItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuotationItems to delete
     */
    where?: QuotationItemWhereInput
    /**
     * Limit how many QuotationItems to delete.
     */
    limit?: number
  }

  /**
   * QuotationItem.product
   */
  export type QuotationItem$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * QuotationItem without action
   */
  export type QuotationItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuotationItem
     */
    select?: QuotationItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuotationItem
     */
    omit?: QuotationItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuotationItemInclude<ExtArgs> | null
  }


  /**
   * Model ProductCatalog
   */

  export type AggregateProductCatalog = {
    _count: ProductCatalogCountAggregateOutputType | null
    _avg: ProductCatalogAvgAggregateOutputType | null
    _sum: ProductCatalogSumAggregateOutputType | null
    _min: ProductCatalogMinAggregateOutputType | null
    _max: ProductCatalogMaxAggregateOutputType | null
  }

  export type ProductCatalogAvgAggregateOutputType = {
    unitPrice: Decimal | null
  }

  export type ProductCatalogSumAggregateOutputType = {
    unitPrice: Decimal | null
  }

  export type ProductCatalogMinAggregateOutputType = {
    id: string | null
    companyType: $Enums.CompanyType | null
    category: string | null
    code: string | null
    name: string | null
    description: string | null
    unitPrice: Decimal | null
    unit: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCatalogMaxAggregateOutputType = {
    id: string | null
    companyType: $Enums.CompanyType | null
    category: string | null
    code: string | null
    name: string | null
    description: string | null
    unitPrice: Decimal | null
    unit: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCatalogCountAggregateOutputType = {
    id: number
    companyType: number
    category: number
    code: number
    name: number
    description: number
    specifications: number
    unitPrice: number
    unit: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductCatalogAvgAggregateInputType = {
    unitPrice?: true
  }

  export type ProductCatalogSumAggregateInputType = {
    unitPrice?: true
  }

  export type ProductCatalogMinAggregateInputType = {
    id?: true
    companyType?: true
    category?: true
    code?: true
    name?: true
    description?: true
    unitPrice?: true
    unit?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCatalogMaxAggregateInputType = {
    id?: true
    companyType?: true
    category?: true
    code?: true
    name?: true
    description?: true
    unitPrice?: true
    unit?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCatalogCountAggregateInputType = {
    id?: true
    companyType?: true
    category?: true
    code?: true
    name?: true
    description?: true
    specifications?: true
    unitPrice?: true
    unit?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductCatalogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductCatalog to aggregate.
     */
    where?: ProductCatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCatalogs to fetch.
     */
    orderBy?: ProductCatalogOrderByWithRelationInput | ProductCatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductCatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCatalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCatalogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductCatalogs
    **/
    _count?: true | ProductCatalogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductCatalogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductCatalogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductCatalogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductCatalogMaxAggregateInputType
  }

  export type GetProductCatalogAggregateType<T extends ProductCatalogAggregateArgs> = {
        [P in keyof T & keyof AggregateProductCatalog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductCatalog[P]>
      : GetScalarType<T[P], AggregateProductCatalog[P]>
  }




  export type ProductCatalogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductCatalogWhereInput
    orderBy?: ProductCatalogOrderByWithAggregationInput | ProductCatalogOrderByWithAggregationInput[]
    by: ProductCatalogScalarFieldEnum[] | ProductCatalogScalarFieldEnum
    having?: ProductCatalogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCatalogCountAggregateInputType | true
    _avg?: ProductCatalogAvgAggregateInputType
    _sum?: ProductCatalogSumAggregateInputType
    _min?: ProductCatalogMinAggregateInputType
    _max?: ProductCatalogMaxAggregateInputType
  }

  export type ProductCatalogGroupByOutputType = {
    id: string
    companyType: $Enums.CompanyType
    category: string
    code: string | null
    name: string
    description: string
    specifications: JsonValue | null
    unitPrice: Decimal
    unit: string | null
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductCatalogCountAggregateOutputType | null
    _avg: ProductCatalogAvgAggregateOutputType | null
    _sum: ProductCatalogSumAggregateOutputType | null
    _min: ProductCatalogMinAggregateOutputType | null
    _max: ProductCatalogMaxAggregateOutputType | null
  }

  type GetProductCatalogGroupByPayload<T extends ProductCatalogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductCatalogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductCatalogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductCatalogGroupByOutputType[P]>
            : GetScalarType<T[P], ProductCatalogGroupByOutputType[P]>
        }
      >
    >


  export type ProductCatalogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyType?: boolean
    category?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    specifications?: boolean
    unitPrice?: boolean
    unit?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productCatalog"]>

  export type ProductCatalogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyType?: boolean
    category?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    specifications?: boolean
    unitPrice?: boolean
    unit?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productCatalog"]>

  export type ProductCatalogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyType?: boolean
    category?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    specifications?: boolean
    unitPrice?: boolean
    unit?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productCatalog"]>

  export type ProductCatalogSelectScalar = {
    id?: boolean
    companyType?: boolean
    category?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    specifications?: boolean
    unitPrice?: boolean
    unit?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductCatalogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyType" | "category" | "code" | "name" | "description" | "specifications" | "unitPrice" | "unit" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["productCatalog"]>

  export type $ProductCatalogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductCatalog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyType: $Enums.CompanyType
      category: string
      code: string | null
      name: string
      description: string
      specifications: Prisma.JsonValue | null
      unitPrice: Prisma.Decimal
      unit: string | null
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productCatalog"]>
    composites: {}
  }

  type ProductCatalogGetPayload<S extends boolean | null | undefined | ProductCatalogDefaultArgs> = $Result.GetResult<Prisma.$ProductCatalogPayload, S>

  type ProductCatalogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductCatalogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCatalogCountAggregateInputType | true
    }

  export interface ProductCatalogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductCatalog'], meta: { name: 'ProductCatalog' } }
    /**
     * Find zero or one ProductCatalog that matches the filter.
     * @param {ProductCatalogFindUniqueArgs} args - Arguments to find a ProductCatalog
     * @example
     * // Get one ProductCatalog
     * const productCatalog = await prisma.productCatalog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductCatalogFindUniqueArgs>(args: SelectSubset<T, ProductCatalogFindUniqueArgs<ExtArgs>>): Prisma__ProductCatalogClient<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductCatalog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductCatalogFindUniqueOrThrowArgs} args - Arguments to find a ProductCatalog
     * @example
     * // Get one ProductCatalog
     * const productCatalog = await prisma.productCatalog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductCatalogFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductCatalogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductCatalogClient<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductCatalog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCatalogFindFirstArgs} args - Arguments to find a ProductCatalog
     * @example
     * // Get one ProductCatalog
     * const productCatalog = await prisma.productCatalog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductCatalogFindFirstArgs>(args?: SelectSubset<T, ProductCatalogFindFirstArgs<ExtArgs>>): Prisma__ProductCatalogClient<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductCatalog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCatalogFindFirstOrThrowArgs} args - Arguments to find a ProductCatalog
     * @example
     * // Get one ProductCatalog
     * const productCatalog = await prisma.productCatalog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductCatalogFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductCatalogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductCatalogClient<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductCatalogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCatalogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductCatalogs
     * const productCatalogs = await prisma.productCatalog.findMany()
     * 
     * // Get first 10 ProductCatalogs
     * const productCatalogs = await prisma.productCatalog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productCatalogWithIdOnly = await prisma.productCatalog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductCatalogFindManyArgs>(args?: SelectSubset<T, ProductCatalogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductCatalog.
     * @param {ProductCatalogCreateArgs} args - Arguments to create a ProductCatalog.
     * @example
     * // Create one ProductCatalog
     * const ProductCatalog = await prisma.productCatalog.create({
     *   data: {
     *     // ... data to create a ProductCatalog
     *   }
     * })
     * 
     */
    create<T extends ProductCatalogCreateArgs>(args: SelectSubset<T, ProductCatalogCreateArgs<ExtArgs>>): Prisma__ProductCatalogClient<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductCatalogs.
     * @param {ProductCatalogCreateManyArgs} args - Arguments to create many ProductCatalogs.
     * @example
     * // Create many ProductCatalogs
     * const productCatalog = await prisma.productCatalog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCatalogCreateManyArgs>(args?: SelectSubset<T, ProductCatalogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductCatalogs and returns the data saved in the database.
     * @param {ProductCatalogCreateManyAndReturnArgs} args - Arguments to create many ProductCatalogs.
     * @example
     * // Create many ProductCatalogs
     * const productCatalog = await prisma.productCatalog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductCatalogs and only return the `id`
     * const productCatalogWithIdOnly = await prisma.productCatalog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCatalogCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCatalogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductCatalog.
     * @param {ProductCatalogDeleteArgs} args - Arguments to delete one ProductCatalog.
     * @example
     * // Delete one ProductCatalog
     * const ProductCatalog = await prisma.productCatalog.delete({
     *   where: {
     *     // ... filter to delete one ProductCatalog
     *   }
     * })
     * 
     */
    delete<T extends ProductCatalogDeleteArgs>(args: SelectSubset<T, ProductCatalogDeleteArgs<ExtArgs>>): Prisma__ProductCatalogClient<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductCatalog.
     * @param {ProductCatalogUpdateArgs} args - Arguments to update one ProductCatalog.
     * @example
     * // Update one ProductCatalog
     * const productCatalog = await prisma.productCatalog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductCatalogUpdateArgs>(args: SelectSubset<T, ProductCatalogUpdateArgs<ExtArgs>>): Prisma__ProductCatalogClient<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductCatalogs.
     * @param {ProductCatalogDeleteManyArgs} args - Arguments to filter ProductCatalogs to delete.
     * @example
     * // Delete a few ProductCatalogs
     * const { count } = await prisma.productCatalog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductCatalogDeleteManyArgs>(args?: SelectSubset<T, ProductCatalogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductCatalogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCatalogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductCatalogs
     * const productCatalog = await prisma.productCatalog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductCatalogUpdateManyArgs>(args: SelectSubset<T, ProductCatalogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductCatalogs and returns the data updated in the database.
     * @param {ProductCatalogUpdateManyAndReturnArgs} args - Arguments to update many ProductCatalogs.
     * @example
     * // Update many ProductCatalogs
     * const productCatalog = await prisma.productCatalog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductCatalogs and only return the `id`
     * const productCatalogWithIdOnly = await prisma.productCatalog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductCatalogUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductCatalogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductCatalog.
     * @param {ProductCatalogUpsertArgs} args - Arguments to update or create a ProductCatalog.
     * @example
     * // Update or create a ProductCatalog
     * const productCatalog = await prisma.productCatalog.upsert({
     *   create: {
     *     // ... data to create a ProductCatalog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductCatalog we want to update
     *   }
     * })
     */
    upsert<T extends ProductCatalogUpsertArgs>(args: SelectSubset<T, ProductCatalogUpsertArgs<ExtArgs>>): Prisma__ProductCatalogClient<$Result.GetResult<Prisma.$ProductCatalogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductCatalogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCatalogCountArgs} args - Arguments to filter ProductCatalogs to count.
     * @example
     * // Count the number of ProductCatalogs
     * const count = await prisma.productCatalog.count({
     *   where: {
     *     // ... the filter for the ProductCatalogs we want to count
     *   }
     * })
    **/
    count<T extends ProductCatalogCountArgs>(
      args?: Subset<T, ProductCatalogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCatalogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductCatalog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCatalogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductCatalogAggregateArgs>(args: Subset<T, ProductCatalogAggregateArgs>): Prisma.PrismaPromise<GetProductCatalogAggregateType<T>>

    /**
     * Group by ProductCatalog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCatalogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductCatalogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductCatalogGroupByArgs['orderBy'] }
        : { orderBy?: ProductCatalogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductCatalogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductCatalogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductCatalog model
   */
  readonly fields: ProductCatalogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductCatalog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductCatalogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductCatalog model
   */
  interface ProductCatalogFieldRefs {
    readonly id: FieldRef<"ProductCatalog", 'String'>
    readonly companyType: FieldRef<"ProductCatalog", 'CompanyType'>
    readonly category: FieldRef<"ProductCatalog", 'String'>
    readonly code: FieldRef<"ProductCatalog", 'String'>
    readonly name: FieldRef<"ProductCatalog", 'String'>
    readonly description: FieldRef<"ProductCatalog", 'String'>
    readonly specifications: FieldRef<"ProductCatalog", 'Json'>
    readonly unitPrice: FieldRef<"ProductCatalog", 'Decimal'>
    readonly unit: FieldRef<"ProductCatalog", 'String'>
    readonly source: FieldRef<"ProductCatalog", 'String'>
    readonly createdAt: FieldRef<"ProductCatalog", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductCatalog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductCatalog findUnique
   */
  export type ProductCatalogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * Filter, which ProductCatalog to fetch.
     */
    where: ProductCatalogWhereUniqueInput
  }

  /**
   * ProductCatalog findUniqueOrThrow
   */
  export type ProductCatalogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * Filter, which ProductCatalog to fetch.
     */
    where: ProductCatalogWhereUniqueInput
  }

  /**
   * ProductCatalog findFirst
   */
  export type ProductCatalogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * Filter, which ProductCatalog to fetch.
     */
    where?: ProductCatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCatalogs to fetch.
     */
    orderBy?: ProductCatalogOrderByWithRelationInput | ProductCatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductCatalogs.
     */
    cursor?: ProductCatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCatalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCatalogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductCatalogs.
     */
    distinct?: ProductCatalogScalarFieldEnum | ProductCatalogScalarFieldEnum[]
  }

  /**
   * ProductCatalog findFirstOrThrow
   */
  export type ProductCatalogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * Filter, which ProductCatalog to fetch.
     */
    where?: ProductCatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCatalogs to fetch.
     */
    orderBy?: ProductCatalogOrderByWithRelationInput | ProductCatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductCatalogs.
     */
    cursor?: ProductCatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCatalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCatalogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductCatalogs.
     */
    distinct?: ProductCatalogScalarFieldEnum | ProductCatalogScalarFieldEnum[]
  }

  /**
   * ProductCatalog findMany
   */
  export type ProductCatalogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * Filter, which ProductCatalogs to fetch.
     */
    where?: ProductCatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCatalogs to fetch.
     */
    orderBy?: ProductCatalogOrderByWithRelationInput | ProductCatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductCatalogs.
     */
    cursor?: ProductCatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCatalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCatalogs.
     */
    skip?: number
    distinct?: ProductCatalogScalarFieldEnum | ProductCatalogScalarFieldEnum[]
  }

  /**
   * ProductCatalog create
   */
  export type ProductCatalogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * The data needed to create a ProductCatalog.
     */
    data: XOR<ProductCatalogCreateInput, ProductCatalogUncheckedCreateInput>
  }

  /**
   * ProductCatalog createMany
   */
  export type ProductCatalogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductCatalogs.
     */
    data: ProductCatalogCreateManyInput | ProductCatalogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductCatalog createManyAndReturn
   */
  export type ProductCatalogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * The data used to create many ProductCatalogs.
     */
    data: ProductCatalogCreateManyInput | ProductCatalogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductCatalog update
   */
  export type ProductCatalogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * The data needed to update a ProductCatalog.
     */
    data: XOR<ProductCatalogUpdateInput, ProductCatalogUncheckedUpdateInput>
    /**
     * Choose, which ProductCatalog to update.
     */
    where: ProductCatalogWhereUniqueInput
  }

  /**
   * ProductCatalog updateMany
   */
  export type ProductCatalogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductCatalogs.
     */
    data: XOR<ProductCatalogUpdateManyMutationInput, ProductCatalogUncheckedUpdateManyInput>
    /**
     * Filter which ProductCatalogs to update
     */
    where?: ProductCatalogWhereInput
    /**
     * Limit how many ProductCatalogs to update.
     */
    limit?: number
  }

  /**
   * ProductCatalog updateManyAndReturn
   */
  export type ProductCatalogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * The data used to update ProductCatalogs.
     */
    data: XOR<ProductCatalogUpdateManyMutationInput, ProductCatalogUncheckedUpdateManyInput>
    /**
     * Filter which ProductCatalogs to update
     */
    where?: ProductCatalogWhereInput
    /**
     * Limit how many ProductCatalogs to update.
     */
    limit?: number
  }

  /**
   * ProductCatalog upsert
   */
  export type ProductCatalogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * The filter to search for the ProductCatalog to update in case it exists.
     */
    where: ProductCatalogWhereUniqueInput
    /**
     * In case the ProductCatalog found by the `where` argument doesn't exist, create a new ProductCatalog with this data.
     */
    create: XOR<ProductCatalogCreateInput, ProductCatalogUncheckedCreateInput>
    /**
     * In case the ProductCatalog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductCatalogUpdateInput, ProductCatalogUncheckedUpdateInput>
  }

  /**
   * ProductCatalog delete
   */
  export type ProductCatalogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
    /**
     * Filter which ProductCatalog to delete.
     */
    where: ProductCatalogWhereUniqueInput
  }

  /**
   * ProductCatalog deleteMany
   */
  export type ProductCatalogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductCatalogs to delete
     */
    where?: ProductCatalogWhereInput
    /**
     * Limit how many ProductCatalogs to delete.
     */
    limit?: number
  }

  /**
   * ProductCatalog without action
   */
  export type ProductCatalogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCatalog
     */
    select?: ProductCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductCatalog
     */
    omit?: ProductCatalogOmit<ExtArgs> | null
  }


  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    subTotal: Decimal | null
    cgstPercent: Decimal | null
    sgstPercent: Decimal | null
    cgstAmount: Decimal | null
    sgstAmount: Decimal | null
    roundOff: Decimal | null
    grandTotal: Decimal | null
  }

  export type InvoiceSumAggregateOutputType = {
    subTotal: Decimal | null
    cgstPercent: Decimal | null
    sgstPercent: Decimal | null
    cgstAmount: Decimal | null
    sgstAmount: Decimal | null
    roundOff: Decimal | null
    grandTotal: Decimal | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: string | null
    invoiceNumber: string | null
    invoiceDate: Date | null
    customerName: string | null
    customerAddress: string | null
    customerGST: string | null
    customerMobile: string | null
    subTotal: Decimal | null
    cgstPercent: Decimal | null
    sgstPercent: Decimal | null
    cgstAmount: Decimal | null
    sgstAmount: Decimal | null
    roundOff: Decimal | null
    grandTotal: Decimal | null
    amountInWords: string | null
    isDraft: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    pdfMode: string | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: string | null
    invoiceNumber: string | null
    invoiceDate: Date | null
    customerName: string | null
    customerAddress: string | null
    customerGST: string | null
    customerMobile: string | null
    subTotal: Decimal | null
    cgstPercent: Decimal | null
    sgstPercent: Decimal | null
    cgstAmount: Decimal | null
    sgstAmount: Decimal | null
    roundOff: Decimal | null
    grandTotal: Decimal | null
    amountInWords: string | null
    isDraft: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    pdfMode: string | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    invoiceNumber: number
    invoiceDate: number
    customerName: number
    customerAddress: number
    customerGST: number
    customerMobile: number
    items: number
    subTotal: number
    cgstPercent: number
    sgstPercent: number
    cgstAmount: number
    sgstAmount: number
    roundOff: number
    grandTotal: number
    amountInWords: number
    bankDetails: number
    sectionHeadings: number
    customSections: number
    isDraft: number
    createdAt: number
    updatedAt: number
    pdfMode: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    subTotal?: true
    cgstPercent?: true
    sgstPercent?: true
    cgstAmount?: true
    sgstAmount?: true
    roundOff?: true
    grandTotal?: true
  }

  export type InvoiceSumAggregateInputType = {
    subTotal?: true
    cgstPercent?: true
    sgstPercent?: true
    cgstAmount?: true
    sgstAmount?: true
    roundOff?: true
    grandTotal?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    invoiceNumber?: true
    invoiceDate?: true
    customerName?: true
    customerAddress?: true
    customerGST?: true
    customerMobile?: true
    subTotal?: true
    cgstPercent?: true
    sgstPercent?: true
    cgstAmount?: true
    sgstAmount?: true
    roundOff?: true
    grandTotal?: true
    amountInWords?: true
    isDraft?: true
    createdAt?: true
    updatedAt?: true
    pdfMode?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    invoiceNumber?: true
    invoiceDate?: true
    customerName?: true
    customerAddress?: true
    customerGST?: true
    customerMobile?: true
    subTotal?: true
    cgstPercent?: true
    sgstPercent?: true
    cgstAmount?: true
    sgstAmount?: true
    roundOff?: true
    grandTotal?: true
    amountInWords?: true
    isDraft?: true
    createdAt?: true
    updatedAt?: true
    pdfMode?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    invoiceNumber?: true
    invoiceDate?: true
    customerName?: true
    customerAddress?: true
    customerGST?: true
    customerMobile?: true
    items?: true
    subTotal?: true
    cgstPercent?: true
    sgstPercent?: true
    cgstAmount?: true
    sgstAmount?: true
    roundOff?: true
    grandTotal?: true
    amountInWords?: true
    bankDetails?: true
    sectionHeadings?: true
    customSections?: true
    isDraft?: true
    createdAt?: true
    updatedAt?: true
    pdfMode?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: string
    invoiceNumber: string
    invoiceDate: Date
    customerName: string
    customerAddress: string
    customerGST: string | null
    customerMobile: string | null
    items: JsonValue
    subTotal: Decimal
    cgstPercent: Decimal
    sgstPercent: Decimal
    cgstAmount: Decimal
    sgstAmount: Decimal
    roundOff: Decimal
    grandTotal: Decimal
    amountInWords: string
    bankDetails: JsonValue | null
    sectionHeadings: JsonValue | null
    customSections: JsonValue | null
    isDraft: boolean
    createdAt: Date
    updatedAt: Date
    pdfMode: string
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    customerName?: boolean
    customerAddress?: boolean
    customerGST?: boolean
    customerMobile?: boolean
    items?: boolean
    subTotal?: boolean
    cgstPercent?: boolean
    sgstPercent?: boolean
    cgstAmount?: boolean
    sgstAmount?: boolean
    roundOff?: boolean
    grandTotal?: boolean
    amountInWords?: boolean
    bankDetails?: boolean
    sectionHeadings?: boolean
    customSections?: boolean
    isDraft?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pdfMode?: boolean
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    customerName?: boolean
    customerAddress?: boolean
    customerGST?: boolean
    customerMobile?: boolean
    items?: boolean
    subTotal?: boolean
    cgstPercent?: boolean
    sgstPercent?: boolean
    cgstAmount?: boolean
    sgstAmount?: boolean
    roundOff?: boolean
    grandTotal?: boolean
    amountInWords?: boolean
    bankDetails?: boolean
    sectionHeadings?: boolean
    customSections?: boolean
    isDraft?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pdfMode?: boolean
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    customerName?: boolean
    customerAddress?: boolean
    customerGST?: boolean
    customerMobile?: boolean
    items?: boolean
    subTotal?: boolean
    cgstPercent?: boolean
    sgstPercent?: boolean
    cgstAmount?: boolean
    sgstAmount?: boolean
    roundOff?: boolean
    grandTotal?: boolean
    amountInWords?: boolean
    bankDetails?: boolean
    sectionHeadings?: boolean
    customSections?: boolean
    isDraft?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pdfMode?: boolean
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    customerName?: boolean
    customerAddress?: boolean
    customerGST?: boolean
    customerMobile?: boolean
    items?: boolean
    subTotal?: boolean
    cgstPercent?: boolean
    sgstPercent?: boolean
    cgstAmount?: boolean
    sgstAmount?: boolean
    roundOff?: boolean
    grandTotal?: boolean
    amountInWords?: boolean
    bankDetails?: boolean
    sectionHeadings?: boolean
    customSections?: boolean
    isDraft?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pdfMode?: boolean
  }

  export type InvoiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoiceNumber" | "invoiceDate" | "customerName" | "customerAddress" | "customerGST" | "customerMobile" | "items" | "subTotal" | "cgstPercent" | "sgstPercent" | "cgstAmount" | "sgstAmount" | "roundOff" | "grandTotal" | "amountInWords" | "bankDetails" | "sectionHeadings" | "customSections" | "isDraft" | "createdAt" | "updatedAt" | "pdfMode", ExtArgs["result"]["invoice"]>

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoiceNumber: string
      invoiceDate: Date
      customerName: string
      customerAddress: string
      customerGST: string | null
      customerMobile: string | null
      items: Prisma.JsonValue
      subTotal: Prisma.Decimal
      cgstPercent: Prisma.Decimal
      sgstPercent: Prisma.Decimal
      cgstAmount: Prisma.Decimal
      sgstAmount: Prisma.Decimal
      roundOff: Prisma.Decimal
      grandTotal: Prisma.Decimal
      amountInWords: string
      bankDetails: Prisma.JsonValue | null
      sectionHeadings: Prisma.JsonValue | null
      customSections: Prisma.JsonValue | null
      isDraft: boolean
      createdAt: Date
      updatedAt: Date
      pdfMode: string
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices and returns the data updated in the database.
     * @param {InvoiceUpdateManyAndReturnArgs} args - Arguments to update many Invoices.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invoice model
   */
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'String'>
    readonly invoiceNumber: FieldRef<"Invoice", 'String'>
    readonly invoiceDate: FieldRef<"Invoice", 'DateTime'>
    readonly customerName: FieldRef<"Invoice", 'String'>
    readonly customerAddress: FieldRef<"Invoice", 'String'>
    readonly customerGST: FieldRef<"Invoice", 'String'>
    readonly customerMobile: FieldRef<"Invoice", 'String'>
    readonly items: FieldRef<"Invoice", 'Json'>
    readonly subTotal: FieldRef<"Invoice", 'Decimal'>
    readonly cgstPercent: FieldRef<"Invoice", 'Decimal'>
    readonly sgstPercent: FieldRef<"Invoice", 'Decimal'>
    readonly cgstAmount: FieldRef<"Invoice", 'Decimal'>
    readonly sgstAmount: FieldRef<"Invoice", 'Decimal'>
    readonly roundOff: FieldRef<"Invoice", 'Decimal'>
    readonly grandTotal: FieldRef<"Invoice", 'Decimal'>
    readonly amountInWords: FieldRef<"Invoice", 'String'>
    readonly bankDetails: FieldRef<"Invoice", 'Json'>
    readonly sectionHeadings: FieldRef<"Invoice", 'Json'>
    readonly customSections: FieldRef<"Invoice", 'Json'>
    readonly isDraft: FieldRef<"Invoice", 'Boolean'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
    readonly updatedAt: FieldRef<"Invoice", 'DateTime'>
    readonly pdfMode: FieldRef<"Invoice", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
  }

  /**
   * Invoice updateManyAndReturn
   */
  export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to delete.
     */
    limit?: number
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
  }


  /**
   * Model ProductDatabase
   */

  export type AggregateProductDatabase = {
    _count: ProductDatabaseCountAggregateOutputType | null
    _min: ProductDatabaseMinAggregateOutputType | null
    _max: ProductDatabaseMaxAggregateOutputType | null
  }

  export type ProductDatabaseMinAggregateOutputType = {
    id: string | null
    name: string | null
    module: string | null
    sourceFile: string | null
    isActive: boolean | null
    securityPin: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductDatabaseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    module: string | null
    sourceFile: string | null
    isActive: boolean | null
    securityPin: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductDatabaseCountAggregateOutputType = {
    id: number
    name: number
    module: number
    sourceFile: number
    isActive: number
    securityPin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductDatabaseMinAggregateInputType = {
    id?: true
    name?: true
    module?: true
    sourceFile?: true
    isActive?: true
    securityPin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductDatabaseMaxAggregateInputType = {
    id?: true
    name?: true
    module?: true
    sourceFile?: true
    isActive?: true
    securityPin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductDatabaseCountAggregateInputType = {
    id?: true
    name?: true
    module?: true
    sourceFile?: true
    isActive?: true
    securityPin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductDatabaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductDatabase to aggregate.
     */
    where?: ProductDatabaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDatabases to fetch.
     */
    orderBy?: ProductDatabaseOrderByWithRelationInput | ProductDatabaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductDatabaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDatabases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDatabases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductDatabases
    **/
    _count?: true | ProductDatabaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductDatabaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductDatabaseMaxAggregateInputType
  }

  export type GetProductDatabaseAggregateType<T extends ProductDatabaseAggregateArgs> = {
        [P in keyof T & keyof AggregateProductDatabase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductDatabase[P]>
      : GetScalarType<T[P], AggregateProductDatabase[P]>
  }




  export type ProductDatabaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductDatabaseWhereInput
    orderBy?: ProductDatabaseOrderByWithAggregationInput | ProductDatabaseOrderByWithAggregationInput[]
    by: ProductDatabaseScalarFieldEnum[] | ProductDatabaseScalarFieldEnum
    having?: ProductDatabaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductDatabaseCountAggregateInputType | true
    _min?: ProductDatabaseMinAggregateInputType
    _max?: ProductDatabaseMaxAggregateInputType
  }

  export type ProductDatabaseGroupByOutputType = {
    id: string
    name: string
    module: string
    sourceFile: string | null
    isActive: boolean
    securityPin: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductDatabaseCountAggregateOutputType | null
    _min: ProductDatabaseMinAggregateOutputType | null
    _max: ProductDatabaseMaxAggregateOutputType | null
  }

  type GetProductDatabaseGroupByPayload<T extends ProductDatabaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductDatabaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductDatabaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductDatabaseGroupByOutputType[P]>
            : GetScalarType<T[P], ProductDatabaseGroupByOutputType[P]>
        }
      >
    >


  export type ProductDatabaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    module?: boolean
    sourceFile?: boolean
    isActive?: boolean
    securityPin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    products?: boolean | ProductDatabase$productsArgs<ExtArgs>
    _count?: boolean | ProductDatabaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productDatabase"]>

  export type ProductDatabaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    module?: boolean
    sourceFile?: boolean
    isActive?: boolean
    securityPin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productDatabase"]>

  export type ProductDatabaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    module?: boolean
    sourceFile?: boolean
    isActive?: boolean
    securityPin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productDatabase"]>

  export type ProductDatabaseSelectScalar = {
    id?: boolean
    name?: boolean
    module?: boolean
    sourceFile?: boolean
    isActive?: boolean
    securityPin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductDatabaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "module" | "sourceFile" | "isActive" | "securityPin" | "createdAt" | "updatedAt", ExtArgs["result"]["productDatabase"]>
  export type ProductDatabaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | ProductDatabase$productsArgs<ExtArgs>
    _count?: boolean | ProductDatabaseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductDatabaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductDatabaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductDatabasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductDatabase"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      module: string
      sourceFile: string | null
      isActive: boolean
      securityPin: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productDatabase"]>
    composites: {}
  }

  type ProductDatabaseGetPayload<S extends boolean | null | undefined | ProductDatabaseDefaultArgs> = $Result.GetResult<Prisma.$ProductDatabasePayload, S>

  type ProductDatabaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductDatabaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductDatabaseCountAggregateInputType | true
    }

  export interface ProductDatabaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductDatabase'], meta: { name: 'ProductDatabase' } }
    /**
     * Find zero or one ProductDatabase that matches the filter.
     * @param {ProductDatabaseFindUniqueArgs} args - Arguments to find a ProductDatabase
     * @example
     * // Get one ProductDatabase
     * const productDatabase = await prisma.productDatabase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductDatabaseFindUniqueArgs>(args: SelectSubset<T, ProductDatabaseFindUniqueArgs<ExtArgs>>): Prisma__ProductDatabaseClient<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductDatabase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductDatabaseFindUniqueOrThrowArgs} args - Arguments to find a ProductDatabase
     * @example
     * // Get one ProductDatabase
     * const productDatabase = await prisma.productDatabase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductDatabaseFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductDatabaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductDatabaseClient<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductDatabase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDatabaseFindFirstArgs} args - Arguments to find a ProductDatabase
     * @example
     * // Get one ProductDatabase
     * const productDatabase = await prisma.productDatabase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductDatabaseFindFirstArgs>(args?: SelectSubset<T, ProductDatabaseFindFirstArgs<ExtArgs>>): Prisma__ProductDatabaseClient<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductDatabase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDatabaseFindFirstOrThrowArgs} args - Arguments to find a ProductDatabase
     * @example
     * // Get one ProductDatabase
     * const productDatabase = await prisma.productDatabase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductDatabaseFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductDatabaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductDatabaseClient<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductDatabases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDatabaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductDatabases
     * const productDatabases = await prisma.productDatabase.findMany()
     * 
     * // Get first 10 ProductDatabases
     * const productDatabases = await prisma.productDatabase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productDatabaseWithIdOnly = await prisma.productDatabase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductDatabaseFindManyArgs>(args?: SelectSubset<T, ProductDatabaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductDatabase.
     * @param {ProductDatabaseCreateArgs} args - Arguments to create a ProductDatabase.
     * @example
     * // Create one ProductDatabase
     * const ProductDatabase = await prisma.productDatabase.create({
     *   data: {
     *     // ... data to create a ProductDatabase
     *   }
     * })
     * 
     */
    create<T extends ProductDatabaseCreateArgs>(args: SelectSubset<T, ProductDatabaseCreateArgs<ExtArgs>>): Prisma__ProductDatabaseClient<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductDatabases.
     * @param {ProductDatabaseCreateManyArgs} args - Arguments to create many ProductDatabases.
     * @example
     * // Create many ProductDatabases
     * const productDatabase = await prisma.productDatabase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductDatabaseCreateManyArgs>(args?: SelectSubset<T, ProductDatabaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductDatabases and returns the data saved in the database.
     * @param {ProductDatabaseCreateManyAndReturnArgs} args - Arguments to create many ProductDatabases.
     * @example
     * // Create many ProductDatabases
     * const productDatabase = await prisma.productDatabase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductDatabases and only return the `id`
     * const productDatabaseWithIdOnly = await prisma.productDatabase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductDatabaseCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductDatabaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductDatabase.
     * @param {ProductDatabaseDeleteArgs} args - Arguments to delete one ProductDatabase.
     * @example
     * // Delete one ProductDatabase
     * const ProductDatabase = await prisma.productDatabase.delete({
     *   where: {
     *     // ... filter to delete one ProductDatabase
     *   }
     * })
     * 
     */
    delete<T extends ProductDatabaseDeleteArgs>(args: SelectSubset<T, ProductDatabaseDeleteArgs<ExtArgs>>): Prisma__ProductDatabaseClient<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductDatabase.
     * @param {ProductDatabaseUpdateArgs} args - Arguments to update one ProductDatabase.
     * @example
     * // Update one ProductDatabase
     * const productDatabase = await prisma.productDatabase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductDatabaseUpdateArgs>(args: SelectSubset<T, ProductDatabaseUpdateArgs<ExtArgs>>): Prisma__ProductDatabaseClient<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductDatabases.
     * @param {ProductDatabaseDeleteManyArgs} args - Arguments to filter ProductDatabases to delete.
     * @example
     * // Delete a few ProductDatabases
     * const { count } = await prisma.productDatabase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDatabaseDeleteManyArgs>(args?: SelectSubset<T, ProductDatabaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductDatabases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDatabaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductDatabases
     * const productDatabase = await prisma.productDatabase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductDatabaseUpdateManyArgs>(args: SelectSubset<T, ProductDatabaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductDatabases and returns the data updated in the database.
     * @param {ProductDatabaseUpdateManyAndReturnArgs} args - Arguments to update many ProductDatabases.
     * @example
     * // Update many ProductDatabases
     * const productDatabase = await prisma.productDatabase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductDatabases and only return the `id`
     * const productDatabaseWithIdOnly = await prisma.productDatabase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductDatabaseUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductDatabaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductDatabase.
     * @param {ProductDatabaseUpsertArgs} args - Arguments to update or create a ProductDatabase.
     * @example
     * // Update or create a ProductDatabase
     * const productDatabase = await prisma.productDatabase.upsert({
     *   create: {
     *     // ... data to create a ProductDatabase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductDatabase we want to update
     *   }
     * })
     */
    upsert<T extends ProductDatabaseUpsertArgs>(args: SelectSubset<T, ProductDatabaseUpsertArgs<ExtArgs>>): Prisma__ProductDatabaseClient<$Result.GetResult<Prisma.$ProductDatabasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductDatabases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDatabaseCountArgs} args - Arguments to filter ProductDatabases to count.
     * @example
     * // Count the number of ProductDatabases
     * const count = await prisma.productDatabase.count({
     *   where: {
     *     // ... the filter for the ProductDatabases we want to count
     *   }
     * })
    **/
    count<T extends ProductDatabaseCountArgs>(
      args?: Subset<T, ProductDatabaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductDatabaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductDatabase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDatabaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductDatabaseAggregateArgs>(args: Subset<T, ProductDatabaseAggregateArgs>): Prisma.PrismaPromise<GetProductDatabaseAggregateType<T>>

    /**
     * Group by ProductDatabase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDatabaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductDatabaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductDatabaseGroupByArgs['orderBy'] }
        : { orderBy?: ProductDatabaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductDatabaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductDatabaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductDatabase model
   */
  readonly fields: ProductDatabaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductDatabase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductDatabaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends ProductDatabase$productsArgs<ExtArgs> = {}>(args?: Subset<T, ProductDatabase$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductDatabase model
   */
  interface ProductDatabaseFieldRefs {
    readonly id: FieldRef<"ProductDatabase", 'String'>
    readonly name: FieldRef<"ProductDatabase", 'String'>
    readonly module: FieldRef<"ProductDatabase", 'String'>
    readonly sourceFile: FieldRef<"ProductDatabase", 'String'>
    readonly isActive: FieldRef<"ProductDatabase", 'Boolean'>
    readonly securityPin: FieldRef<"ProductDatabase", 'String'>
    readonly createdAt: FieldRef<"ProductDatabase", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductDatabase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductDatabase findUnique
   */
  export type ProductDatabaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
    /**
     * Filter, which ProductDatabase to fetch.
     */
    where: ProductDatabaseWhereUniqueInput
  }

  /**
   * ProductDatabase findUniqueOrThrow
   */
  export type ProductDatabaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
    /**
     * Filter, which ProductDatabase to fetch.
     */
    where: ProductDatabaseWhereUniqueInput
  }

  /**
   * ProductDatabase findFirst
   */
  export type ProductDatabaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
    /**
     * Filter, which ProductDatabase to fetch.
     */
    where?: ProductDatabaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDatabases to fetch.
     */
    orderBy?: ProductDatabaseOrderByWithRelationInput | ProductDatabaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductDatabases.
     */
    cursor?: ProductDatabaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDatabases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDatabases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductDatabases.
     */
    distinct?: ProductDatabaseScalarFieldEnum | ProductDatabaseScalarFieldEnum[]
  }

  /**
   * ProductDatabase findFirstOrThrow
   */
  export type ProductDatabaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
    /**
     * Filter, which ProductDatabase to fetch.
     */
    where?: ProductDatabaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDatabases to fetch.
     */
    orderBy?: ProductDatabaseOrderByWithRelationInput | ProductDatabaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductDatabases.
     */
    cursor?: ProductDatabaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDatabases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDatabases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductDatabases.
     */
    distinct?: ProductDatabaseScalarFieldEnum | ProductDatabaseScalarFieldEnum[]
  }

  /**
   * ProductDatabase findMany
   */
  export type ProductDatabaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
    /**
     * Filter, which ProductDatabases to fetch.
     */
    where?: ProductDatabaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDatabases to fetch.
     */
    orderBy?: ProductDatabaseOrderByWithRelationInput | ProductDatabaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductDatabases.
     */
    cursor?: ProductDatabaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDatabases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDatabases.
     */
    skip?: number
    distinct?: ProductDatabaseScalarFieldEnum | ProductDatabaseScalarFieldEnum[]
  }

  /**
   * ProductDatabase create
   */
  export type ProductDatabaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductDatabase.
     */
    data: XOR<ProductDatabaseCreateInput, ProductDatabaseUncheckedCreateInput>
  }

  /**
   * ProductDatabase createMany
   */
  export type ProductDatabaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductDatabases.
     */
    data: ProductDatabaseCreateManyInput | ProductDatabaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductDatabase createManyAndReturn
   */
  export type ProductDatabaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * The data used to create many ProductDatabases.
     */
    data: ProductDatabaseCreateManyInput | ProductDatabaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductDatabase update
   */
  export type ProductDatabaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductDatabase.
     */
    data: XOR<ProductDatabaseUpdateInput, ProductDatabaseUncheckedUpdateInput>
    /**
     * Choose, which ProductDatabase to update.
     */
    where: ProductDatabaseWhereUniqueInput
  }

  /**
   * ProductDatabase updateMany
   */
  export type ProductDatabaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductDatabases.
     */
    data: XOR<ProductDatabaseUpdateManyMutationInput, ProductDatabaseUncheckedUpdateManyInput>
    /**
     * Filter which ProductDatabases to update
     */
    where?: ProductDatabaseWhereInput
    /**
     * Limit how many ProductDatabases to update.
     */
    limit?: number
  }

  /**
   * ProductDatabase updateManyAndReturn
   */
  export type ProductDatabaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * The data used to update ProductDatabases.
     */
    data: XOR<ProductDatabaseUpdateManyMutationInput, ProductDatabaseUncheckedUpdateManyInput>
    /**
     * Filter which ProductDatabases to update
     */
    where?: ProductDatabaseWhereInput
    /**
     * Limit how many ProductDatabases to update.
     */
    limit?: number
  }

  /**
   * ProductDatabase upsert
   */
  export type ProductDatabaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductDatabase to update in case it exists.
     */
    where: ProductDatabaseWhereUniqueInput
    /**
     * In case the ProductDatabase found by the `where` argument doesn't exist, create a new ProductDatabase with this data.
     */
    create: XOR<ProductDatabaseCreateInput, ProductDatabaseUncheckedCreateInput>
    /**
     * In case the ProductDatabase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductDatabaseUpdateInput, ProductDatabaseUncheckedUpdateInput>
  }

  /**
   * ProductDatabase delete
   */
  export type ProductDatabaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
    /**
     * Filter which ProductDatabase to delete.
     */
    where: ProductDatabaseWhereUniqueInput
  }

  /**
   * ProductDatabase deleteMany
   */
  export type ProductDatabaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductDatabases to delete
     */
    where?: ProductDatabaseWhereInput
    /**
     * Limit how many ProductDatabases to delete.
     */
    limit?: number
  }

  /**
   * ProductDatabase.products
   */
  export type ProductDatabase$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * ProductDatabase without action
   */
  export type ProductDatabaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDatabase
     */
    select?: ProductDatabaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDatabase
     */
    omit?: ProductDatabaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDatabaseInclude<ExtArgs> | null
  }


  /**
   * Model InvoiceProduct
   */

  export type AggregateInvoiceProduct = {
    _count: InvoiceProductCountAggregateOutputType | null
    _avg: InvoiceProductAvgAggregateOutputType | null
    _sum: InvoiceProductSumAggregateOutputType | null
    _min: InvoiceProductMinAggregateOutputType | null
    _max: InvoiceProductMaxAggregateOutputType | null
  }

  export type InvoiceProductAvgAggregateOutputType = {
    unitPrice: number | null
  }

  export type InvoiceProductSumAggregateOutputType = {
    unitPrice: number | null
  }

  export type InvoiceProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    type: string | null
    unitPrice: number | null
    hsnCode: string | null
    imagePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    type: string | null
    unitPrice: number | null
    hsnCode: string | null
    imagePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceProductCountAggregateOutputType = {
    id: number
    name: number
    description: number
    type: number
    unitPrice: number
    hsnCode: number
    imagePath: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceProductAvgAggregateInputType = {
    unitPrice?: true
  }

  export type InvoiceProductSumAggregateInputType = {
    unitPrice?: true
  }

  export type InvoiceProductMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    type?: true
    unitPrice?: true
    hsnCode?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceProductMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    type?: true
    unitPrice?: true
    hsnCode?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceProductCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    type?: true
    unitPrice?: true
    hsnCode?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceProduct to aggregate.
     */
    where?: InvoiceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceProducts to fetch.
     */
    orderBy?: InvoiceProductOrderByWithRelationInput | InvoiceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvoiceProducts
    **/
    _count?: true | InvoiceProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceProductMaxAggregateInputType
  }

  export type GetInvoiceProductAggregateType<T extends InvoiceProductAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoiceProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoiceProduct[P]>
      : GetScalarType<T[P], AggregateInvoiceProduct[P]>
  }




  export type InvoiceProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceProductWhereInput
    orderBy?: InvoiceProductOrderByWithAggregationInput | InvoiceProductOrderByWithAggregationInput[]
    by: InvoiceProductScalarFieldEnum[] | InvoiceProductScalarFieldEnum
    having?: InvoiceProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceProductCountAggregateInputType | true
    _avg?: InvoiceProductAvgAggregateInputType
    _sum?: InvoiceProductSumAggregateInputType
    _min?: InvoiceProductMinAggregateInputType
    _max?: InvoiceProductMaxAggregateInputType
  }

  export type InvoiceProductGroupByOutputType = {
    id: string
    name: string
    description: string | null
    type: string | null
    unitPrice: number
    hsnCode: string | null
    imagePath: string | null
    createdAt: Date
    updatedAt: Date
    _count: InvoiceProductCountAggregateOutputType | null
    _avg: InvoiceProductAvgAggregateOutputType | null
    _sum: InvoiceProductSumAggregateOutputType | null
    _min: InvoiceProductMinAggregateOutputType | null
    _max: InvoiceProductMaxAggregateOutputType | null
  }

  type GetInvoiceProductGroupByPayload<T extends InvoiceProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceProductGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceProductGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    unitPrice?: boolean
    hsnCode?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["invoiceProduct"]>

  export type InvoiceProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    unitPrice?: boolean
    hsnCode?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["invoiceProduct"]>

  export type InvoiceProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    unitPrice?: boolean
    hsnCode?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["invoiceProduct"]>

  export type InvoiceProductSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    unitPrice?: boolean
    hsnCode?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "type" | "unitPrice" | "hsnCode" | "imagePath" | "createdAt" | "updatedAt", ExtArgs["result"]["invoiceProduct"]>

  export type $InvoiceProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvoiceProduct"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      type: string | null
      unitPrice: number
      hsnCode: string | null
      imagePath: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoiceProduct"]>
    composites: {}
  }

  type InvoiceProductGetPayload<S extends boolean | null | undefined | InvoiceProductDefaultArgs> = $Result.GetResult<Prisma.$InvoiceProductPayload, S>

  type InvoiceProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceProductCountAggregateInputType | true
    }

  export interface InvoiceProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvoiceProduct'], meta: { name: 'InvoiceProduct' } }
    /**
     * Find zero or one InvoiceProduct that matches the filter.
     * @param {InvoiceProductFindUniqueArgs} args - Arguments to find a InvoiceProduct
     * @example
     * // Get one InvoiceProduct
     * const invoiceProduct = await prisma.invoiceProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceProductFindUniqueArgs>(args: SelectSubset<T, InvoiceProductFindUniqueArgs<ExtArgs>>): Prisma__InvoiceProductClient<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvoiceProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceProductFindUniqueOrThrowArgs} args - Arguments to find a InvoiceProduct
     * @example
     * // Get one InvoiceProduct
     * const invoiceProduct = await prisma.invoiceProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceProductFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceProductClient<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoiceProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceProductFindFirstArgs} args - Arguments to find a InvoiceProduct
     * @example
     * // Get one InvoiceProduct
     * const invoiceProduct = await prisma.invoiceProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceProductFindFirstArgs>(args?: SelectSubset<T, InvoiceProductFindFirstArgs<ExtArgs>>): Prisma__InvoiceProductClient<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoiceProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceProductFindFirstOrThrowArgs} args - Arguments to find a InvoiceProduct
     * @example
     * // Get one InvoiceProduct
     * const invoiceProduct = await prisma.invoiceProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceProductFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceProductClient<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvoiceProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvoiceProducts
     * const invoiceProducts = await prisma.invoiceProduct.findMany()
     * 
     * // Get first 10 InvoiceProducts
     * const invoiceProducts = await prisma.invoiceProduct.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceProductWithIdOnly = await prisma.invoiceProduct.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceProductFindManyArgs>(args?: SelectSubset<T, InvoiceProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvoiceProduct.
     * @param {InvoiceProductCreateArgs} args - Arguments to create a InvoiceProduct.
     * @example
     * // Create one InvoiceProduct
     * const InvoiceProduct = await prisma.invoiceProduct.create({
     *   data: {
     *     // ... data to create a InvoiceProduct
     *   }
     * })
     * 
     */
    create<T extends InvoiceProductCreateArgs>(args: SelectSubset<T, InvoiceProductCreateArgs<ExtArgs>>): Prisma__InvoiceProductClient<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvoiceProducts.
     * @param {InvoiceProductCreateManyArgs} args - Arguments to create many InvoiceProducts.
     * @example
     * // Create many InvoiceProducts
     * const invoiceProduct = await prisma.invoiceProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceProductCreateManyArgs>(args?: SelectSubset<T, InvoiceProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InvoiceProducts and returns the data saved in the database.
     * @param {InvoiceProductCreateManyAndReturnArgs} args - Arguments to create many InvoiceProducts.
     * @example
     * // Create many InvoiceProducts
     * const invoiceProduct = await prisma.invoiceProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InvoiceProducts and only return the `id`
     * const invoiceProductWithIdOnly = await prisma.invoiceProduct.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceProductCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InvoiceProduct.
     * @param {InvoiceProductDeleteArgs} args - Arguments to delete one InvoiceProduct.
     * @example
     * // Delete one InvoiceProduct
     * const InvoiceProduct = await prisma.invoiceProduct.delete({
     *   where: {
     *     // ... filter to delete one InvoiceProduct
     *   }
     * })
     * 
     */
    delete<T extends InvoiceProductDeleteArgs>(args: SelectSubset<T, InvoiceProductDeleteArgs<ExtArgs>>): Prisma__InvoiceProductClient<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvoiceProduct.
     * @param {InvoiceProductUpdateArgs} args - Arguments to update one InvoiceProduct.
     * @example
     * // Update one InvoiceProduct
     * const invoiceProduct = await prisma.invoiceProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceProductUpdateArgs>(args: SelectSubset<T, InvoiceProductUpdateArgs<ExtArgs>>): Prisma__InvoiceProductClient<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvoiceProducts.
     * @param {InvoiceProductDeleteManyArgs} args - Arguments to filter InvoiceProducts to delete.
     * @example
     * // Delete a few InvoiceProducts
     * const { count } = await prisma.invoiceProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceProductDeleteManyArgs>(args?: SelectSubset<T, InvoiceProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvoiceProducts
     * const invoiceProduct = await prisma.invoiceProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceProductUpdateManyArgs>(args: SelectSubset<T, InvoiceProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceProducts and returns the data updated in the database.
     * @param {InvoiceProductUpdateManyAndReturnArgs} args - Arguments to update many InvoiceProducts.
     * @example
     * // Update many InvoiceProducts
     * const invoiceProduct = await prisma.invoiceProduct.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InvoiceProducts and only return the `id`
     * const invoiceProductWithIdOnly = await prisma.invoiceProduct.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceProductUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InvoiceProduct.
     * @param {InvoiceProductUpsertArgs} args - Arguments to update or create a InvoiceProduct.
     * @example
     * // Update or create a InvoiceProduct
     * const invoiceProduct = await prisma.invoiceProduct.upsert({
     *   create: {
     *     // ... data to create a InvoiceProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvoiceProduct we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceProductUpsertArgs>(args: SelectSubset<T, InvoiceProductUpsertArgs<ExtArgs>>): Prisma__InvoiceProductClient<$Result.GetResult<Prisma.$InvoiceProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvoiceProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceProductCountArgs} args - Arguments to filter InvoiceProducts to count.
     * @example
     * // Count the number of InvoiceProducts
     * const count = await prisma.invoiceProduct.count({
     *   where: {
     *     // ... the filter for the InvoiceProducts we want to count
     *   }
     * })
    **/
    count<T extends InvoiceProductCountArgs>(
      args?: Subset<T, InvoiceProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvoiceProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceProductAggregateArgs>(args: Subset<T, InvoiceProductAggregateArgs>): Prisma.PrismaPromise<GetInvoiceProductAggregateType<T>>

    /**
     * Group by InvoiceProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceProductGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvoiceProduct model
   */
  readonly fields: InvoiceProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvoiceProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvoiceProduct model
   */
  interface InvoiceProductFieldRefs {
    readonly id: FieldRef<"InvoiceProduct", 'String'>
    readonly name: FieldRef<"InvoiceProduct", 'String'>
    readonly description: FieldRef<"InvoiceProduct", 'String'>
    readonly type: FieldRef<"InvoiceProduct", 'String'>
    readonly unitPrice: FieldRef<"InvoiceProduct", 'Float'>
    readonly hsnCode: FieldRef<"InvoiceProduct", 'String'>
    readonly imagePath: FieldRef<"InvoiceProduct", 'String'>
    readonly createdAt: FieldRef<"InvoiceProduct", 'DateTime'>
    readonly updatedAt: FieldRef<"InvoiceProduct", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InvoiceProduct findUnique
   */
  export type InvoiceProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * Filter, which InvoiceProduct to fetch.
     */
    where: InvoiceProductWhereUniqueInput
  }

  /**
   * InvoiceProduct findUniqueOrThrow
   */
  export type InvoiceProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * Filter, which InvoiceProduct to fetch.
     */
    where: InvoiceProductWhereUniqueInput
  }

  /**
   * InvoiceProduct findFirst
   */
  export type InvoiceProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * Filter, which InvoiceProduct to fetch.
     */
    where?: InvoiceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceProducts to fetch.
     */
    orderBy?: InvoiceProductOrderByWithRelationInput | InvoiceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceProducts.
     */
    cursor?: InvoiceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceProducts.
     */
    distinct?: InvoiceProductScalarFieldEnum | InvoiceProductScalarFieldEnum[]
  }

  /**
   * InvoiceProduct findFirstOrThrow
   */
  export type InvoiceProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * Filter, which InvoiceProduct to fetch.
     */
    where?: InvoiceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceProducts to fetch.
     */
    orderBy?: InvoiceProductOrderByWithRelationInput | InvoiceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceProducts.
     */
    cursor?: InvoiceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceProducts.
     */
    distinct?: InvoiceProductScalarFieldEnum | InvoiceProductScalarFieldEnum[]
  }

  /**
   * InvoiceProduct findMany
   */
  export type InvoiceProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * Filter, which InvoiceProducts to fetch.
     */
    where?: InvoiceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceProducts to fetch.
     */
    orderBy?: InvoiceProductOrderByWithRelationInput | InvoiceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvoiceProducts.
     */
    cursor?: InvoiceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceProducts.
     */
    skip?: number
    distinct?: InvoiceProductScalarFieldEnum | InvoiceProductScalarFieldEnum[]
  }

  /**
   * InvoiceProduct create
   */
  export type InvoiceProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * The data needed to create a InvoiceProduct.
     */
    data: XOR<InvoiceProductCreateInput, InvoiceProductUncheckedCreateInput>
  }

  /**
   * InvoiceProduct createMany
   */
  export type InvoiceProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvoiceProducts.
     */
    data: InvoiceProductCreateManyInput | InvoiceProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvoiceProduct createManyAndReturn
   */
  export type InvoiceProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * The data used to create many InvoiceProducts.
     */
    data: InvoiceProductCreateManyInput | InvoiceProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvoiceProduct update
   */
  export type InvoiceProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * The data needed to update a InvoiceProduct.
     */
    data: XOR<InvoiceProductUpdateInput, InvoiceProductUncheckedUpdateInput>
    /**
     * Choose, which InvoiceProduct to update.
     */
    where: InvoiceProductWhereUniqueInput
  }

  /**
   * InvoiceProduct updateMany
   */
  export type InvoiceProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvoiceProducts.
     */
    data: XOR<InvoiceProductUpdateManyMutationInput, InvoiceProductUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceProducts to update
     */
    where?: InvoiceProductWhereInput
    /**
     * Limit how many InvoiceProducts to update.
     */
    limit?: number
  }

  /**
   * InvoiceProduct updateManyAndReturn
   */
  export type InvoiceProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * The data used to update InvoiceProducts.
     */
    data: XOR<InvoiceProductUpdateManyMutationInput, InvoiceProductUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceProducts to update
     */
    where?: InvoiceProductWhereInput
    /**
     * Limit how many InvoiceProducts to update.
     */
    limit?: number
  }

  /**
   * InvoiceProduct upsert
   */
  export type InvoiceProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * The filter to search for the InvoiceProduct to update in case it exists.
     */
    where: InvoiceProductWhereUniqueInput
    /**
     * In case the InvoiceProduct found by the `where` argument doesn't exist, create a new InvoiceProduct with this data.
     */
    create: XOR<InvoiceProductCreateInput, InvoiceProductUncheckedCreateInput>
    /**
     * In case the InvoiceProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceProductUpdateInput, InvoiceProductUncheckedUpdateInput>
  }

  /**
   * InvoiceProduct delete
   */
  export type InvoiceProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
    /**
     * Filter which InvoiceProduct to delete.
     */
    where: InvoiceProductWhereUniqueInput
  }

  /**
   * InvoiceProduct deleteMany
   */
  export type InvoiceProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceProducts to delete
     */
    where?: InvoiceProductWhereInput
    /**
     * Limit how many InvoiceProducts to delete.
     */
    limit?: number
  }

  /**
   * InvoiceProduct without action
   */
  export type InvoiceProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceProduct
     */
    select?: InvoiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceProduct
     */
    omit?: InvoiceProductOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    phone: 'phone',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    category: 'category',
    sectionCode: 'sectionCode',
    defaultRate: 'defaultRate',
    unit: 'unit',
    warranty: 'warranty',
    imagePath: 'imagePath',
    imageText: 'imageText',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    hsnCode: 'hsnCode',
    databaseId: 'databaseId',
    gstRate: 'gstRate',
    productCode: 'productCode'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const CompanySettingsScalarFieldEnum: {
    id: 'id',
    companyName: 'companyName',
    logoUrl: 'logoUrl',
    address: 'address',
    gstin: 'gstin',
    phones: 'phones',
    email: 'email',
    signatureUrl: 'signatureUrl',
    defaultGstRate: 'defaultGstRate',
    terms: 'terms',
    paymentTerms: 'paymentTerms',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanySettingsScalarFieldEnum = (typeof CompanySettingsScalarFieldEnum)[keyof typeof CompanySettingsScalarFieldEnum]


  export const QuotationScalarFieldEnum: {
    id: 'id',
    quoteNumber: 'quoteNumber',
    title: 'title',
    customerId: 'customerId',
    date: 'date',
    gstPercent: 'gstPercent',
    subtotal: 'subtotal',
    gstAmount: 'gstAmount',
    grandTotal: 'grandTotal',
    amountInWords: 'amountInWords',
    notes: 'notes',
    terms: 'terms',
    paymentTerms: 'paymentTerms',
    projectSpecifications: 'projectSpecifications',
    sections: 'sections',
    isDraft: 'isDraft',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuotationScalarFieldEnum = (typeof QuotationScalarFieldEnum)[keyof typeof QuotationScalarFieldEnum]


  export const QuotationItemScalarFieldEnum: {
    id: 'id',
    quotationId: 'quotationId',
    section: 'section',
    serialNo: 'serialNo',
    category: 'category',
    description: 'description',
    warranty: 'warranty',
    qty: 'qty',
    unit: 'unit',
    rate: 'rate',
    amount: 'amount',
    imageUrl: 'imageUrl',
    imageText: 'imageText',
    productId: 'productId',
    variableValues: 'variableValues',
    isCustom: 'isCustom',
    title: 'title'
  };

  export type QuotationItemScalarFieldEnum = (typeof QuotationItemScalarFieldEnum)[keyof typeof QuotationItemScalarFieldEnum]


  export const ProductCatalogScalarFieldEnum: {
    id: 'id',
    companyType: 'companyType',
    category: 'category',
    code: 'code',
    name: 'name',
    description: 'description',
    specifications: 'specifications',
    unitPrice: 'unitPrice',
    unit: 'unit',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductCatalogScalarFieldEnum = (typeof ProductCatalogScalarFieldEnum)[keyof typeof ProductCatalogScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    invoiceNumber: 'invoiceNumber',
    invoiceDate: 'invoiceDate',
    customerName: 'customerName',
    customerAddress: 'customerAddress',
    customerGST: 'customerGST',
    customerMobile: 'customerMobile',
    items: 'items',
    subTotal: 'subTotal',
    cgstPercent: 'cgstPercent',
    sgstPercent: 'sgstPercent',
    cgstAmount: 'cgstAmount',
    sgstAmount: 'sgstAmount',
    roundOff: 'roundOff',
    grandTotal: 'grandTotal',
    amountInWords: 'amountInWords',
    bankDetails: 'bankDetails',
    sectionHeadings: 'sectionHeadings',
    customSections: 'customSections',
    isDraft: 'isDraft',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    pdfMode: 'pdfMode'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const ProductDatabaseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    module: 'module',
    sourceFile: 'sourceFile',
    isActive: 'isActive',
    securityPin: 'securityPin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductDatabaseScalarFieldEnum = (typeof ProductDatabaseScalarFieldEnum)[keyof typeof ProductDatabaseScalarFieldEnum]


  export const InvoiceProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    type: 'type',
    unitPrice: 'unitPrice',
    hsnCode: 'hsnCode',
    imagePath: 'imagePath',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvoiceProductScalarFieldEnum = (typeof InvoiceProductScalarFieldEnum)[keyof typeof InvoiceProductScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'CompanyType'
   */
  export type EnumCompanyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyType'>
    


  /**
   * Reference to a field of type 'CompanyType[]'
   */
  export type ListEnumCompanyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    address?: StringFilter<"Customer"> | string
    phone?: StringNullableFilter<"Customer"> | string | null
    email?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    quotations?: QuotationListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    quotations?: QuotationOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    address?: StringFilter<"Customer"> | string
    phone?: StringNullableFilter<"Customer"> | string | null
    email?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    quotations?: QuotationListRelationFilter
  }, "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    address?: StringWithAggregatesFilter<"Customer"> | string
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    email?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    sectionCode?: StringFilter<"Product"> | string
    defaultRate?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    unit?: StringFilter<"Product"> | string
    warranty?: StringFilter<"Product"> | string
    imagePath?: StringNullableFilter<"Product"> | string | null
    imageText?: StringNullableFilter<"Product"> | string | null
    sortOrder?: IntFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    hsnCode?: StringNullableFilter<"Product"> | string | null
    databaseId?: StringNullableFilter<"Product"> | string | null
    gstRate?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    productCode?: StringNullableFilter<"Product"> | string | null
    database?: XOR<ProductDatabaseNullableScalarRelationFilter, ProductDatabaseWhereInput> | null
    items?: QuotationItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    sectionCode?: SortOrder
    defaultRate?: SortOrder
    unit?: SortOrder
    warranty?: SortOrder
    imagePath?: SortOrderInput | SortOrder
    imageText?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hsnCode?: SortOrderInput | SortOrder
    databaseId?: SortOrderInput | SortOrder
    gstRate?: SortOrderInput | SortOrder
    productCode?: SortOrderInput | SortOrder
    database?: ProductDatabaseOrderByWithRelationInput
    items?: QuotationItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    sectionCode?: StringFilter<"Product"> | string
    defaultRate?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    unit?: StringFilter<"Product"> | string
    warranty?: StringFilter<"Product"> | string
    imagePath?: StringNullableFilter<"Product"> | string | null
    imageText?: StringNullableFilter<"Product"> | string | null
    sortOrder?: IntFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    hsnCode?: StringNullableFilter<"Product"> | string | null
    databaseId?: StringNullableFilter<"Product"> | string | null
    gstRate?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    productCode?: StringNullableFilter<"Product"> | string | null
    database?: XOR<ProductDatabaseNullableScalarRelationFilter, ProductDatabaseWhereInput> | null
    items?: QuotationItemListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    sectionCode?: SortOrder
    defaultRate?: SortOrder
    unit?: SortOrder
    warranty?: SortOrder
    imagePath?: SortOrderInput | SortOrder
    imageText?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hsnCode?: SortOrderInput | SortOrder
    databaseId?: SortOrderInput | SortOrder
    gstRate?: SortOrderInput | SortOrder
    productCode?: SortOrderInput | SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    category?: StringWithAggregatesFilter<"Product"> | string
    sectionCode?: StringWithAggregatesFilter<"Product"> | string
    defaultRate?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    unit?: StringWithAggregatesFilter<"Product"> | string
    warranty?: StringWithAggregatesFilter<"Product"> | string
    imagePath?: StringNullableWithAggregatesFilter<"Product"> | string | null
    imageText?: StringNullableWithAggregatesFilter<"Product"> | string | null
    sortOrder?: IntWithAggregatesFilter<"Product"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    hsnCode?: StringNullableWithAggregatesFilter<"Product"> | string | null
    databaseId?: StringNullableWithAggregatesFilter<"Product"> | string | null
    gstRate?: DecimalNullableWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    productCode?: StringNullableWithAggregatesFilter<"Product"> | string | null
  }

  export type CompanySettingsWhereInput = {
    AND?: CompanySettingsWhereInput | CompanySettingsWhereInput[]
    OR?: CompanySettingsWhereInput[]
    NOT?: CompanySettingsWhereInput | CompanySettingsWhereInput[]
    id?: StringFilter<"CompanySettings"> | string
    companyName?: StringFilter<"CompanySettings"> | string
    logoUrl?: StringNullableFilter<"CompanySettings"> | string | null
    address?: StringFilter<"CompanySettings"> | string
    gstin?: StringFilter<"CompanySettings"> | string
    phones?: StringFilter<"CompanySettings"> | string
    email?: StringFilter<"CompanySettings"> | string
    signatureUrl?: StringNullableFilter<"CompanySettings"> | string | null
    defaultGstRate?: DecimalFilter<"CompanySettings"> | Decimal | DecimalJsLike | number | string
    terms?: StringFilter<"CompanySettings"> | string
    paymentTerms?: StringFilter<"CompanySettings"> | string
    createdAt?: DateTimeFilter<"CompanySettings"> | Date | string
    updatedAt?: DateTimeFilter<"CompanySettings"> | Date | string
  }

  export type CompanySettingsOrderByWithRelationInput = {
    id?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    address?: SortOrder
    gstin?: SortOrder
    phones?: SortOrder
    email?: SortOrder
    signatureUrl?: SortOrderInput | SortOrder
    defaultGstRate?: SortOrder
    terms?: SortOrder
    paymentTerms?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompanySettingsWhereInput | CompanySettingsWhereInput[]
    OR?: CompanySettingsWhereInput[]
    NOT?: CompanySettingsWhereInput | CompanySettingsWhereInput[]
    companyName?: StringFilter<"CompanySettings"> | string
    logoUrl?: StringNullableFilter<"CompanySettings"> | string | null
    address?: StringFilter<"CompanySettings"> | string
    gstin?: StringFilter<"CompanySettings"> | string
    phones?: StringFilter<"CompanySettings"> | string
    email?: StringFilter<"CompanySettings"> | string
    signatureUrl?: StringNullableFilter<"CompanySettings"> | string | null
    defaultGstRate?: DecimalFilter<"CompanySettings"> | Decimal | DecimalJsLike | number | string
    terms?: StringFilter<"CompanySettings"> | string
    paymentTerms?: StringFilter<"CompanySettings"> | string
    createdAt?: DateTimeFilter<"CompanySettings"> | Date | string
    updatedAt?: DateTimeFilter<"CompanySettings"> | Date | string
  }, "id">

  export type CompanySettingsOrderByWithAggregationInput = {
    id?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    address?: SortOrder
    gstin?: SortOrder
    phones?: SortOrder
    email?: SortOrder
    signatureUrl?: SortOrderInput | SortOrder
    defaultGstRate?: SortOrder
    terms?: SortOrder
    paymentTerms?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanySettingsCountOrderByAggregateInput
    _avg?: CompanySettingsAvgOrderByAggregateInput
    _max?: CompanySettingsMaxOrderByAggregateInput
    _min?: CompanySettingsMinOrderByAggregateInput
    _sum?: CompanySettingsSumOrderByAggregateInput
  }

  export type CompanySettingsScalarWhereWithAggregatesInput = {
    AND?: CompanySettingsScalarWhereWithAggregatesInput | CompanySettingsScalarWhereWithAggregatesInput[]
    OR?: CompanySettingsScalarWhereWithAggregatesInput[]
    NOT?: CompanySettingsScalarWhereWithAggregatesInput | CompanySettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompanySettings"> | string
    companyName?: StringWithAggregatesFilter<"CompanySettings"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"CompanySettings"> | string | null
    address?: StringWithAggregatesFilter<"CompanySettings"> | string
    gstin?: StringWithAggregatesFilter<"CompanySettings"> | string
    phones?: StringWithAggregatesFilter<"CompanySettings"> | string
    email?: StringWithAggregatesFilter<"CompanySettings"> | string
    signatureUrl?: StringNullableWithAggregatesFilter<"CompanySettings"> | string | null
    defaultGstRate?: DecimalWithAggregatesFilter<"CompanySettings"> | Decimal | DecimalJsLike | number | string
    terms?: StringWithAggregatesFilter<"CompanySettings"> | string
    paymentTerms?: StringWithAggregatesFilter<"CompanySettings"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CompanySettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CompanySettings"> | Date | string
  }

  export type QuotationWhereInput = {
    AND?: QuotationWhereInput | QuotationWhereInput[]
    OR?: QuotationWhereInput[]
    NOT?: QuotationWhereInput | QuotationWhereInput[]
    id?: StringFilter<"Quotation"> | string
    quoteNumber?: StringFilter<"Quotation"> | string
    title?: StringFilter<"Quotation"> | string
    customerId?: StringFilter<"Quotation"> | string
    date?: DateTimeFilter<"Quotation"> | Date | string
    gstPercent?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFilter<"Quotation"> | string
    notes?: StringFilter<"Quotation"> | string
    terms?: StringFilter<"Quotation"> | string
    paymentTerms?: StringFilter<"Quotation"> | string
    projectSpecifications?: JsonFilter<"Quotation">
    sections?: JsonFilter<"Quotation">
    isDraft?: BoolFilter<"Quotation"> | boolean
    deletedAt?: DateTimeNullableFilter<"Quotation"> | Date | string | null
    createdAt?: DateTimeFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeFilter<"Quotation"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    items?: QuotationItemListRelationFilter
  }

  export type QuotationOrderByWithRelationInput = {
    id?: SortOrder
    quoteNumber?: SortOrder
    title?: SortOrder
    customerId?: SortOrder
    date?: SortOrder
    gstPercent?: SortOrder
    subtotal?: SortOrder
    gstAmount?: SortOrder
    grandTotal?: SortOrder
    amountInWords?: SortOrder
    notes?: SortOrder
    terms?: SortOrder
    paymentTerms?: SortOrder
    projectSpecifications?: SortOrder
    sections?: SortOrder
    isDraft?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    items?: QuotationItemOrderByRelationAggregateInput
  }

  export type QuotationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    quoteNumber?: string
    AND?: QuotationWhereInput | QuotationWhereInput[]
    OR?: QuotationWhereInput[]
    NOT?: QuotationWhereInput | QuotationWhereInput[]
    title?: StringFilter<"Quotation"> | string
    customerId?: StringFilter<"Quotation"> | string
    date?: DateTimeFilter<"Quotation"> | Date | string
    gstPercent?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFilter<"Quotation"> | string
    notes?: StringFilter<"Quotation"> | string
    terms?: StringFilter<"Quotation"> | string
    paymentTerms?: StringFilter<"Quotation"> | string
    projectSpecifications?: JsonFilter<"Quotation">
    sections?: JsonFilter<"Quotation">
    isDraft?: BoolFilter<"Quotation"> | boolean
    deletedAt?: DateTimeNullableFilter<"Quotation"> | Date | string | null
    createdAt?: DateTimeFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeFilter<"Quotation"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    items?: QuotationItemListRelationFilter
  }, "id" | "quoteNumber">

  export type QuotationOrderByWithAggregationInput = {
    id?: SortOrder
    quoteNumber?: SortOrder
    title?: SortOrder
    customerId?: SortOrder
    date?: SortOrder
    gstPercent?: SortOrder
    subtotal?: SortOrder
    gstAmount?: SortOrder
    grandTotal?: SortOrder
    amountInWords?: SortOrder
    notes?: SortOrder
    terms?: SortOrder
    paymentTerms?: SortOrder
    projectSpecifications?: SortOrder
    sections?: SortOrder
    isDraft?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuotationCountOrderByAggregateInput
    _avg?: QuotationAvgOrderByAggregateInput
    _max?: QuotationMaxOrderByAggregateInput
    _min?: QuotationMinOrderByAggregateInput
    _sum?: QuotationSumOrderByAggregateInput
  }

  export type QuotationScalarWhereWithAggregatesInput = {
    AND?: QuotationScalarWhereWithAggregatesInput | QuotationScalarWhereWithAggregatesInput[]
    OR?: QuotationScalarWhereWithAggregatesInput[]
    NOT?: QuotationScalarWhereWithAggregatesInput | QuotationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Quotation"> | string
    quoteNumber?: StringWithAggregatesFilter<"Quotation"> | string
    title?: StringWithAggregatesFilter<"Quotation"> | string
    customerId?: StringWithAggregatesFilter<"Quotation"> | string
    date?: DateTimeWithAggregatesFilter<"Quotation"> | Date | string
    gstPercent?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalWithAggregatesFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    amountInWords?: StringWithAggregatesFilter<"Quotation"> | string
    notes?: StringWithAggregatesFilter<"Quotation"> | string
    terms?: StringWithAggregatesFilter<"Quotation"> | string
    paymentTerms?: StringWithAggregatesFilter<"Quotation"> | string
    projectSpecifications?: JsonWithAggregatesFilter<"Quotation">
    sections?: JsonWithAggregatesFilter<"Quotation">
    isDraft?: BoolWithAggregatesFilter<"Quotation"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Quotation"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Quotation"> | Date | string
  }

  export type QuotationItemWhereInput = {
    AND?: QuotationItemWhereInput | QuotationItemWhereInput[]
    OR?: QuotationItemWhereInput[]
    NOT?: QuotationItemWhereInput | QuotationItemWhereInput[]
    id?: StringFilter<"QuotationItem"> | string
    quotationId?: StringFilter<"QuotationItem"> | string
    section?: StringFilter<"QuotationItem"> | string
    serialNo?: IntFilter<"QuotationItem"> | number
    category?: StringFilter<"QuotationItem"> | string
    description?: StringFilter<"QuotationItem"> | string
    warranty?: StringFilter<"QuotationItem"> | string
    qty?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    unit?: StringFilter<"QuotationItem"> | string
    rate?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    amount?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableFilter<"QuotationItem"> | string | null
    imageText?: StringNullableFilter<"QuotationItem"> | string | null
    productId?: StringNullableFilter<"QuotationItem"> | string | null
    variableValues?: JsonFilter<"QuotationItem">
    isCustom?: BoolFilter<"QuotationItem"> | boolean
    title?: StringFilter<"QuotationItem"> | string
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
    quotation?: XOR<QuotationScalarRelationFilter, QuotationWhereInput>
  }

  export type QuotationItemOrderByWithRelationInput = {
    id?: SortOrder
    quotationId?: SortOrder
    section?: SortOrder
    serialNo?: SortOrder
    category?: SortOrder
    description?: SortOrder
    warranty?: SortOrder
    qty?: SortOrder
    unit?: SortOrder
    rate?: SortOrder
    amount?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imageText?: SortOrderInput | SortOrder
    productId?: SortOrderInput | SortOrder
    variableValues?: SortOrder
    isCustom?: SortOrder
    title?: SortOrder
    product?: ProductOrderByWithRelationInput
    quotation?: QuotationOrderByWithRelationInput
  }

  export type QuotationItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuotationItemWhereInput | QuotationItemWhereInput[]
    OR?: QuotationItemWhereInput[]
    NOT?: QuotationItemWhereInput | QuotationItemWhereInput[]
    quotationId?: StringFilter<"QuotationItem"> | string
    section?: StringFilter<"QuotationItem"> | string
    serialNo?: IntFilter<"QuotationItem"> | number
    category?: StringFilter<"QuotationItem"> | string
    description?: StringFilter<"QuotationItem"> | string
    warranty?: StringFilter<"QuotationItem"> | string
    qty?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    unit?: StringFilter<"QuotationItem"> | string
    rate?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    amount?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableFilter<"QuotationItem"> | string | null
    imageText?: StringNullableFilter<"QuotationItem"> | string | null
    productId?: StringNullableFilter<"QuotationItem"> | string | null
    variableValues?: JsonFilter<"QuotationItem">
    isCustom?: BoolFilter<"QuotationItem"> | boolean
    title?: StringFilter<"QuotationItem"> | string
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
    quotation?: XOR<QuotationScalarRelationFilter, QuotationWhereInput>
  }, "id">

  export type QuotationItemOrderByWithAggregationInput = {
    id?: SortOrder
    quotationId?: SortOrder
    section?: SortOrder
    serialNo?: SortOrder
    category?: SortOrder
    description?: SortOrder
    warranty?: SortOrder
    qty?: SortOrder
    unit?: SortOrder
    rate?: SortOrder
    amount?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imageText?: SortOrderInput | SortOrder
    productId?: SortOrderInput | SortOrder
    variableValues?: SortOrder
    isCustom?: SortOrder
    title?: SortOrder
    _count?: QuotationItemCountOrderByAggregateInput
    _avg?: QuotationItemAvgOrderByAggregateInput
    _max?: QuotationItemMaxOrderByAggregateInput
    _min?: QuotationItemMinOrderByAggregateInput
    _sum?: QuotationItemSumOrderByAggregateInput
  }

  export type QuotationItemScalarWhereWithAggregatesInput = {
    AND?: QuotationItemScalarWhereWithAggregatesInput | QuotationItemScalarWhereWithAggregatesInput[]
    OR?: QuotationItemScalarWhereWithAggregatesInput[]
    NOT?: QuotationItemScalarWhereWithAggregatesInput | QuotationItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuotationItem"> | string
    quotationId?: StringWithAggregatesFilter<"QuotationItem"> | string
    section?: StringWithAggregatesFilter<"QuotationItem"> | string
    serialNo?: IntWithAggregatesFilter<"QuotationItem"> | number
    category?: StringWithAggregatesFilter<"QuotationItem"> | string
    description?: StringWithAggregatesFilter<"QuotationItem"> | string
    warranty?: StringWithAggregatesFilter<"QuotationItem"> | string
    qty?: DecimalWithAggregatesFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    unit?: StringWithAggregatesFilter<"QuotationItem"> | string
    rate?: DecimalWithAggregatesFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    amount?: DecimalWithAggregatesFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableWithAggregatesFilter<"QuotationItem"> | string | null
    imageText?: StringNullableWithAggregatesFilter<"QuotationItem"> | string | null
    productId?: StringNullableWithAggregatesFilter<"QuotationItem"> | string | null
    variableValues?: JsonWithAggregatesFilter<"QuotationItem">
    isCustom?: BoolWithAggregatesFilter<"QuotationItem"> | boolean
    title?: StringWithAggregatesFilter<"QuotationItem"> | string
  }

  export type ProductCatalogWhereInput = {
    AND?: ProductCatalogWhereInput | ProductCatalogWhereInput[]
    OR?: ProductCatalogWhereInput[]
    NOT?: ProductCatalogWhereInput | ProductCatalogWhereInput[]
    id?: StringFilter<"ProductCatalog"> | string
    companyType?: EnumCompanyTypeFilter<"ProductCatalog"> | $Enums.CompanyType
    category?: StringFilter<"ProductCatalog"> | string
    code?: StringNullableFilter<"ProductCatalog"> | string | null
    name?: StringFilter<"ProductCatalog"> | string
    description?: StringFilter<"ProductCatalog"> | string
    specifications?: JsonNullableFilter<"ProductCatalog">
    unitPrice?: DecimalFilter<"ProductCatalog"> | Decimal | DecimalJsLike | number | string
    unit?: StringNullableFilter<"ProductCatalog"> | string | null
    source?: StringNullableFilter<"ProductCatalog"> | string | null
    createdAt?: DateTimeFilter<"ProductCatalog"> | Date | string
    updatedAt?: DateTimeFilter<"ProductCatalog"> | Date | string
  }

  export type ProductCatalogOrderByWithRelationInput = {
    id?: SortOrder
    companyType?: SortOrder
    category?: SortOrder
    code?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrder
    specifications?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    unit?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductCatalogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductCatalogWhereInput | ProductCatalogWhereInput[]
    OR?: ProductCatalogWhereInput[]
    NOT?: ProductCatalogWhereInput | ProductCatalogWhereInput[]
    companyType?: EnumCompanyTypeFilter<"ProductCatalog"> | $Enums.CompanyType
    category?: StringFilter<"ProductCatalog"> | string
    code?: StringNullableFilter<"ProductCatalog"> | string | null
    name?: StringFilter<"ProductCatalog"> | string
    description?: StringFilter<"ProductCatalog"> | string
    specifications?: JsonNullableFilter<"ProductCatalog">
    unitPrice?: DecimalFilter<"ProductCatalog"> | Decimal | DecimalJsLike | number | string
    unit?: StringNullableFilter<"ProductCatalog"> | string | null
    source?: StringNullableFilter<"ProductCatalog"> | string | null
    createdAt?: DateTimeFilter<"ProductCatalog"> | Date | string
    updatedAt?: DateTimeFilter<"ProductCatalog"> | Date | string
  }, "id">

  export type ProductCatalogOrderByWithAggregationInput = {
    id?: SortOrder
    companyType?: SortOrder
    category?: SortOrder
    code?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrder
    specifications?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    unit?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCatalogCountOrderByAggregateInput
    _avg?: ProductCatalogAvgOrderByAggregateInput
    _max?: ProductCatalogMaxOrderByAggregateInput
    _min?: ProductCatalogMinOrderByAggregateInput
    _sum?: ProductCatalogSumOrderByAggregateInput
  }

  export type ProductCatalogScalarWhereWithAggregatesInput = {
    AND?: ProductCatalogScalarWhereWithAggregatesInput | ProductCatalogScalarWhereWithAggregatesInput[]
    OR?: ProductCatalogScalarWhereWithAggregatesInput[]
    NOT?: ProductCatalogScalarWhereWithAggregatesInput | ProductCatalogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductCatalog"> | string
    companyType?: EnumCompanyTypeWithAggregatesFilter<"ProductCatalog"> | $Enums.CompanyType
    category?: StringWithAggregatesFilter<"ProductCatalog"> | string
    code?: StringNullableWithAggregatesFilter<"ProductCatalog"> | string | null
    name?: StringWithAggregatesFilter<"ProductCatalog"> | string
    description?: StringWithAggregatesFilter<"ProductCatalog"> | string
    specifications?: JsonNullableWithAggregatesFilter<"ProductCatalog">
    unitPrice?: DecimalWithAggregatesFilter<"ProductCatalog"> | Decimal | DecimalJsLike | number | string
    unit?: StringNullableWithAggregatesFilter<"ProductCatalog"> | string | null
    source?: StringNullableWithAggregatesFilter<"ProductCatalog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProductCatalog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductCatalog"> | Date | string
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: StringFilter<"Invoice"> | string
    invoiceNumber?: StringFilter<"Invoice"> | string
    invoiceDate?: DateTimeFilter<"Invoice"> | Date | string
    customerName?: StringFilter<"Invoice"> | string
    customerAddress?: StringFilter<"Invoice"> | string
    customerGST?: StringNullableFilter<"Invoice"> | string | null
    customerMobile?: StringNullableFilter<"Invoice"> | string | null
    items?: JsonFilter<"Invoice">
    subTotal?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    cgstPercent?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    sgstPercent?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    cgstAmount?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    sgstAmount?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    roundOff?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFilter<"Invoice"> | string
    bankDetails?: JsonNullableFilter<"Invoice">
    sectionHeadings?: JsonNullableFilter<"Invoice">
    customSections?: JsonNullableFilter<"Invoice">
    isDraft?: BoolFilter<"Invoice"> | boolean
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    pdfMode?: StringFilter<"Invoice"> | string
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerGST?: SortOrderInput | SortOrder
    customerMobile?: SortOrderInput | SortOrder
    items?: SortOrder
    subTotal?: SortOrder
    cgstPercent?: SortOrder
    sgstPercent?: SortOrder
    cgstAmount?: SortOrder
    sgstAmount?: SortOrder
    roundOff?: SortOrder
    grandTotal?: SortOrder
    amountInWords?: SortOrder
    bankDetails?: SortOrderInput | SortOrder
    sectionHeadings?: SortOrderInput | SortOrder
    customSections?: SortOrderInput | SortOrder
    isDraft?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pdfMode?: SortOrder
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    invoiceNumber?: string
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    invoiceDate?: DateTimeFilter<"Invoice"> | Date | string
    customerName?: StringFilter<"Invoice"> | string
    customerAddress?: StringFilter<"Invoice"> | string
    customerGST?: StringNullableFilter<"Invoice"> | string | null
    customerMobile?: StringNullableFilter<"Invoice"> | string | null
    items?: JsonFilter<"Invoice">
    subTotal?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    cgstPercent?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    sgstPercent?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    cgstAmount?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    sgstAmount?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    roundOff?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFilter<"Invoice"> | string
    bankDetails?: JsonNullableFilter<"Invoice">
    sectionHeadings?: JsonNullableFilter<"Invoice">
    customSections?: JsonNullableFilter<"Invoice">
    isDraft?: BoolFilter<"Invoice"> | boolean
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    pdfMode?: StringFilter<"Invoice"> | string
  }, "id" | "invoiceNumber">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerGST?: SortOrderInput | SortOrder
    customerMobile?: SortOrderInput | SortOrder
    items?: SortOrder
    subTotal?: SortOrder
    cgstPercent?: SortOrder
    sgstPercent?: SortOrder
    cgstAmount?: SortOrder
    sgstAmount?: SortOrder
    roundOff?: SortOrder
    grandTotal?: SortOrder
    amountInWords?: SortOrder
    bankDetails?: SortOrderInput | SortOrder
    sectionHeadings?: SortOrderInput | SortOrder
    customSections?: SortOrderInput | SortOrder
    isDraft?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pdfMode?: SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invoice"> | string
    invoiceNumber?: StringWithAggregatesFilter<"Invoice"> | string
    invoiceDate?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    customerName?: StringWithAggregatesFilter<"Invoice"> | string
    customerAddress?: StringWithAggregatesFilter<"Invoice"> | string
    customerGST?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    customerMobile?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    items?: JsonWithAggregatesFilter<"Invoice">
    subTotal?: DecimalWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    cgstPercent?: DecimalWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    sgstPercent?: DecimalWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    cgstAmount?: DecimalWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    sgstAmount?: DecimalWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    roundOff?: DecimalWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalWithAggregatesFilter<"Invoice"> | Decimal | DecimalJsLike | number | string
    amountInWords?: StringWithAggregatesFilter<"Invoice"> | string
    bankDetails?: JsonNullableWithAggregatesFilter<"Invoice">
    sectionHeadings?: JsonNullableWithAggregatesFilter<"Invoice">
    customSections?: JsonNullableWithAggregatesFilter<"Invoice">
    isDraft?: BoolWithAggregatesFilter<"Invoice"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    pdfMode?: StringWithAggregatesFilter<"Invoice"> | string
  }

  export type ProductDatabaseWhereInput = {
    AND?: ProductDatabaseWhereInput | ProductDatabaseWhereInput[]
    OR?: ProductDatabaseWhereInput[]
    NOT?: ProductDatabaseWhereInput | ProductDatabaseWhereInput[]
    id?: StringFilter<"ProductDatabase"> | string
    name?: StringFilter<"ProductDatabase"> | string
    module?: StringFilter<"ProductDatabase"> | string
    sourceFile?: StringNullableFilter<"ProductDatabase"> | string | null
    isActive?: BoolFilter<"ProductDatabase"> | boolean
    securityPin?: StringNullableFilter<"ProductDatabase"> | string | null
    createdAt?: DateTimeFilter<"ProductDatabase"> | Date | string
    updatedAt?: DateTimeFilter<"ProductDatabase"> | Date | string
    products?: ProductListRelationFilter
  }

  export type ProductDatabaseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    module?: SortOrder
    sourceFile?: SortOrderInput | SortOrder
    isActive?: SortOrder
    securityPin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type ProductDatabaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductDatabaseWhereInput | ProductDatabaseWhereInput[]
    OR?: ProductDatabaseWhereInput[]
    NOT?: ProductDatabaseWhereInput | ProductDatabaseWhereInput[]
    name?: StringFilter<"ProductDatabase"> | string
    module?: StringFilter<"ProductDatabase"> | string
    sourceFile?: StringNullableFilter<"ProductDatabase"> | string | null
    isActive?: BoolFilter<"ProductDatabase"> | boolean
    securityPin?: StringNullableFilter<"ProductDatabase"> | string | null
    createdAt?: DateTimeFilter<"ProductDatabase"> | Date | string
    updatedAt?: DateTimeFilter<"ProductDatabase"> | Date | string
    products?: ProductListRelationFilter
  }, "id">

  export type ProductDatabaseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    module?: SortOrder
    sourceFile?: SortOrderInput | SortOrder
    isActive?: SortOrder
    securityPin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductDatabaseCountOrderByAggregateInput
    _max?: ProductDatabaseMaxOrderByAggregateInput
    _min?: ProductDatabaseMinOrderByAggregateInput
  }

  export type ProductDatabaseScalarWhereWithAggregatesInput = {
    AND?: ProductDatabaseScalarWhereWithAggregatesInput | ProductDatabaseScalarWhereWithAggregatesInput[]
    OR?: ProductDatabaseScalarWhereWithAggregatesInput[]
    NOT?: ProductDatabaseScalarWhereWithAggregatesInput | ProductDatabaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductDatabase"> | string
    name?: StringWithAggregatesFilter<"ProductDatabase"> | string
    module?: StringWithAggregatesFilter<"ProductDatabase"> | string
    sourceFile?: StringNullableWithAggregatesFilter<"ProductDatabase"> | string | null
    isActive?: BoolWithAggregatesFilter<"ProductDatabase"> | boolean
    securityPin?: StringNullableWithAggregatesFilter<"ProductDatabase"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProductDatabase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductDatabase"> | Date | string
  }

  export type InvoiceProductWhereInput = {
    AND?: InvoiceProductWhereInput | InvoiceProductWhereInput[]
    OR?: InvoiceProductWhereInput[]
    NOT?: InvoiceProductWhereInput | InvoiceProductWhereInput[]
    id?: StringFilter<"InvoiceProduct"> | string
    name?: StringFilter<"InvoiceProduct"> | string
    description?: StringNullableFilter<"InvoiceProduct"> | string | null
    type?: StringNullableFilter<"InvoiceProduct"> | string | null
    unitPrice?: FloatFilter<"InvoiceProduct"> | number
    hsnCode?: StringNullableFilter<"InvoiceProduct"> | string | null
    imagePath?: StringNullableFilter<"InvoiceProduct"> | string | null
    createdAt?: DateTimeFilter<"InvoiceProduct"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceProduct"> | Date | string
  }

  export type InvoiceProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    hsnCode?: SortOrderInput | SortOrder
    imagePath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvoiceProductWhereInput | InvoiceProductWhereInput[]
    OR?: InvoiceProductWhereInput[]
    NOT?: InvoiceProductWhereInput | InvoiceProductWhereInput[]
    name?: StringFilter<"InvoiceProduct"> | string
    description?: StringNullableFilter<"InvoiceProduct"> | string | null
    type?: StringNullableFilter<"InvoiceProduct"> | string | null
    unitPrice?: FloatFilter<"InvoiceProduct"> | number
    hsnCode?: StringNullableFilter<"InvoiceProduct"> | string | null
    imagePath?: StringNullableFilter<"InvoiceProduct"> | string | null
    createdAt?: DateTimeFilter<"InvoiceProduct"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceProduct"> | Date | string
  }, "id">

  export type InvoiceProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    hsnCode?: SortOrderInput | SortOrder
    imagePath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceProductCountOrderByAggregateInput
    _avg?: InvoiceProductAvgOrderByAggregateInput
    _max?: InvoiceProductMaxOrderByAggregateInput
    _min?: InvoiceProductMinOrderByAggregateInput
    _sum?: InvoiceProductSumOrderByAggregateInput
  }

  export type InvoiceProductScalarWhereWithAggregatesInput = {
    AND?: InvoiceProductScalarWhereWithAggregatesInput | InvoiceProductScalarWhereWithAggregatesInput[]
    OR?: InvoiceProductScalarWhereWithAggregatesInput[]
    NOT?: InvoiceProductScalarWhereWithAggregatesInput | InvoiceProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InvoiceProduct"> | string
    name?: StringWithAggregatesFilter<"InvoiceProduct"> | string
    description?: StringNullableWithAggregatesFilter<"InvoiceProduct"> | string | null
    type?: StringNullableWithAggregatesFilter<"InvoiceProduct"> | string | null
    unitPrice?: FloatWithAggregatesFilter<"InvoiceProduct"> | number
    hsnCode?: StringNullableWithAggregatesFilter<"InvoiceProduct"> | string | null
    imagePath?: StringNullableWithAggregatesFilter<"InvoiceProduct"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"InvoiceProduct"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InvoiceProduct"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    address: string
    phone?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    name: string
    address: string
    phone?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    quotations?: QuotationUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quotations?: QuotationUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    name: string
    address: string
    phone?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    description?: string
    category?: string
    sectionCode?: string
    defaultRate: Decimal | DecimalJsLike | number | string
    unit?: string
    warranty?: string
    imagePath?: string | null
    imageText?: string | null
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string | null
    productCode?: string | null
    database?: ProductDatabaseCreateNestedOneWithoutProductsInput
    items?: QuotationItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    description?: string
    category?: string
    sectionCode?: string
    defaultRate: Decimal | DecimalJsLike | number | string
    unit?: string
    warranty?: string
    imagePath?: string | null
    imageText?: string | null
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    hsnCode?: string | null
    databaseId?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string | null
    productCode?: string | null
    items?: QuotationItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sectionCode?: StringFieldUpdateOperationsInput | string
    defaultRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    productCode?: NullableStringFieldUpdateOperationsInput | string | null
    database?: ProductDatabaseUpdateOneWithoutProductsNestedInput
    items?: QuotationItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sectionCode?: StringFieldUpdateOperationsInput | string
    defaultRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    databaseId?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    productCode?: NullableStringFieldUpdateOperationsInput | string | null
    items?: QuotationItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    description?: string
    category?: string
    sectionCode?: string
    defaultRate: Decimal | DecimalJsLike | number | string
    unit?: string
    warranty?: string
    imagePath?: string | null
    imageText?: string | null
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    hsnCode?: string | null
    databaseId?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string | null
    productCode?: string | null
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sectionCode?: StringFieldUpdateOperationsInput | string
    defaultRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    productCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sectionCode?: StringFieldUpdateOperationsInput | string
    defaultRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    databaseId?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    productCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanySettingsCreateInput = {
    id?: string
    companyName?: string
    logoUrl?: string | null
    address?: string
    gstin?: string
    phones?: string
    email?: string
    signatureUrl?: string | null
    defaultGstRate?: Decimal | DecimalJsLike | number | string
    terms?: string
    paymentTerms?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanySettingsUncheckedCreateInput = {
    id?: string
    companyName?: string
    logoUrl?: string | null
    address?: string
    gstin?: string
    phones?: string
    email?: string
    signatureUrl?: string | null
    defaultGstRate?: Decimal | DecimalJsLike | number | string
    terms?: string
    paymentTerms?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanySettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    gstin?: StringFieldUpdateOperationsInput | string
    phones?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultGstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanySettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    gstin?: StringFieldUpdateOperationsInput | string
    phones?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultGstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanySettingsCreateManyInput = {
    id?: string
    companyName?: string
    logoUrl?: string | null
    address?: string
    gstin?: string
    phones?: string
    email?: string
    signatureUrl?: string | null
    defaultGstRate?: Decimal | DecimalJsLike | number | string
    terms?: string
    paymentTerms?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanySettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    gstin?: StringFieldUpdateOperationsInput | string
    phones?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultGstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanySettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    gstin?: StringFieldUpdateOperationsInput | string
    phones?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultGstRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationCreateInput = {
    id?: string
    quoteNumber: string
    title?: string
    date: Date | string
    gstPercent: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    gstAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords?: string
    notes?: string
    terms?: string
    paymentTerms?: string
    projectSpecifications: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutQuotationsInput
    items?: QuotationItemCreateNestedManyWithoutQuotationInput
  }

  export type QuotationUncheckedCreateInput = {
    id?: string
    quoteNumber: string
    title?: string
    customerId: string
    date: Date | string
    gstPercent: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    gstAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords?: string
    notes?: string
    terms?: string
    paymentTerms?: string
    projectSpecifications: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: QuotationItemUncheckedCreateNestedManyWithoutQuotationInput
  }

  export type QuotationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    gstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    projectSpecifications?: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutQuotationsNestedInput
    items?: QuotationItemUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    gstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    projectSpecifications?: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: QuotationItemUncheckedUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationCreateManyInput = {
    id?: string
    quoteNumber: string
    title?: string
    customerId: string
    date: Date | string
    gstPercent: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    gstAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords?: string
    notes?: string
    terms?: string
    paymentTerms?: string
    projectSpecifications: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuotationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    gstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    projectSpecifications?: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    gstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    projectSpecifications?: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationItemCreateInput = {
    id?: string
    section: string
    serialNo: number
    category?: string
    description: string
    warranty?: string
    qty: Decimal | DecimalJsLike | number | string
    unit: string
    rate: Decimal | DecimalJsLike | number | string
    amount: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    imageText?: string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: boolean
    title?: string
    product?: ProductCreateNestedOneWithoutItemsInput
    quotation: QuotationCreateNestedOneWithoutItemsInput
  }

  export type QuotationItemUncheckedCreateInput = {
    id?: string
    quotationId: string
    section: string
    serialNo: number
    category?: string
    description: string
    warranty?: string
    qty: Decimal | DecimalJsLike | number | string
    unit: string
    rate: Decimal | DecimalJsLike | number | string
    amount: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    imageText?: string | null
    productId?: string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: boolean
    title?: string
  }

  export type QuotationItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    serialNo?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    qty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    product?: ProductUpdateOneWithoutItemsNestedInput
    quotation?: QuotationUpdateOneRequiredWithoutItemsNestedInput
  }

  export type QuotationItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quotationId?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    serialNo?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    qty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  }

  export type QuotationItemCreateManyInput = {
    id?: string
    quotationId: string
    section: string
    serialNo: number
    category?: string
    description: string
    warranty?: string
    qty: Decimal | DecimalJsLike | number | string
    unit: string
    rate: Decimal | DecimalJsLike | number | string
    amount: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    imageText?: string | null
    productId?: string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: boolean
    title?: string
  }

  export type QuotationItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    serialNo?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    qty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  }

  export type QuotationItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quotationId?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    serialNo?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    qty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCatalogCreateInput = {
    id?: string
    companyType: $Enums.CompanyType
    category: string
    code?: string | null
    name: string
    description: string
    specifications?: NullableJsonNullValueInput | InputJsonValue
    unitPrice: Decimal | DecimalJsLike | number | string
    unit?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCatalogUncheckedCreateInput = {
    id?: string
    companyType: $Enums.CompanyType
    category: string
    code?: string | null
    name: string
    description: string
    specifications?: NullableJsonNullValueInput | InputJsonValue
    unitPrice: Decimal | DecimalJsLike | number | string
    unit?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCatalogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyType?: EnumCompanyTypeFieldUpdateOperationsInput | $Enums.CompanyType
    category?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specifications?: NullableJsonNullValueInput | InputJsonValue
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCatalogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyType?: EnumCompanyTypeFieldUpdateOperationsInput | $Enums.CompanyType
    category?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specifications?: NullableJsonNullValueInput | InputJsonValue
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCatalogCreateManyInput = {
    id?: string
    companyType: $Enums.CompanyType
    category: string
    code?: string | null
    name: string
    description: string
    specifications?: NullableJsonNullValueInput | InputJsonValue
    unitPrice: Decimal | DecimalJsLike | number | string
    unit?: string | null
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCatalogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyType?: EnumCompanyTypeFieldUpdateOperationsInput | $Enums.CompanyType
    category?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specifications?: NullableJsonNullValueInput | InputJsonValue
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCatalogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyType?: EnumCompanyTypeFieldUpdateOperationsInput | $Enums.CompanyType
    category?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specifications?: NullableJsonNullValueInput | InputJsonValue
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateInput = {
    id?: string
    invoiceNumber: string
    invoiceDate: Date | string
    customerName: string
    customerAddress: string
    customerGST?: string | null
    customerMobile?: string | null
    items: JsonNullValueInput | InputJsonValue
    subTotal: Decimal | DecimalJsLike | number | string
    cgstPercent?: Decimal | DecimalJsLike | number | string
    sgstPercent?: Decimal | DecimalJsLike | number | string
    cgstAmount: Decimal | DecimalJsLike | number | string
    sgstAmount: Decimal | DecimalJsLike | number | string
    roundOff?: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords: string
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    sectionHeadings?: NullableJsonNullValueInput | InputJsonValue
    customSections?: NullableJsonNullValueInput | InputJsonValue
    isDraft?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pdfMode?: string
  }

  export type InvoiceUncheckedCreateInput = {
    id?: string
    invoiceNumber: string
    invoiceDate: Date | string
    customerName: string
    customerAddress: string
    customerGST?: string | null
    customerMobile?: string | null
    items: JsonNullValueInput | InputJsonValue
    subTotal: Decimal | DecimalJsLike | number | string
    cgstPercent?: Decimal | DecimalJsLike | number | string
    sgstPercent?: Decimal | DecimalJsLike | number | string
    cgstAmount: Decimal | DecimalJsLike | number | string
    sgstAmount: Decimal | DecimalJsLike | number | string
    roundOff?: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords: string
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    sectionHeadings?: NullableJsonNullValueInput | InputJsonValue
    customSections?: NullableJsonNullValueInput | InputJsonValue
    isDraft?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pdfMode?: string
  }

  export type InvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerGST?: NullableStringFieldUpdateOperationsInput | string | null
    customerMobile?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cgstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sgstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cgstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sgstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundOff?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    sectionHeadings?: NullableJsonNullValueInput | InputJsonValue
    customSections?: NullableJsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pdfMode?: StringFieldUpdateOperationsInput | string
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerGST?: NullableStringFieldUpdateOperationsInput | string | null
    customerMobile?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cgstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sgstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cgstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sgstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundOff?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    sectionHeadings?: NullableJsonNullValueInput | InputJsonValue
    customSections?: NullableJsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pdfMode?: StringFieldUpdateOperationsInput | string
  }

  export type InvoiceCreateManyInput = {
    id?: string
    invoiceNumber: string
    invoiceDate: Date | string
    customerName: string
    customerAddress: string
    customerGST?: string | null
    customerMobile?: string | null
    items: JsonNullValueInput | InputJsonValue
    subTotal: Decimal | DecimalJsLike | number | string
    cgstPercent?: Decimal | DecimalJsLike | number | string
    sgstPercent?: Decimal | DecimalJsLike | number | string
    cgstAmount: Decimal | DecimalJsLike | number | string
    sgstAmount: Decimal | DecimalJsLike | number | string
    roundOff?: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords: string
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    sectionHeadings?: NullableJsonNullValueInput | InputJsonValue
    customSections?: NullableJsonNullValueInput | InputJsonValue
    isDraft?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pdfMode?: string
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerGST?: NullableStringFieldUpdateOperationsInput | string | null
    customerMobile?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cgstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sgstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cgstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sgstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundOff?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    sectionHeadings?: NullableJsonNullValueInput | InputJsonValue
    customSections?: NullableJsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pdfMode?: StringFieldUpdateOperationsInput | string
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerGST?: NullableStringFieldUpdateOperationsInput | string | null
    customerMobile?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cgstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sgstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cgstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sgstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    roundOff?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    sectionHeadings?: NullableJsonNullValueInput | InputJsonValue
    customSections?: NullableJsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pdfMode?: StringFieldUpdateOperationsInput | string
  }

  export type ProductDatabaseCreateInput = {
    id?: string
    name: string
    module: string
    sourceFile?: string | null
    isActive?: boolean
    securityPin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutDatabaseInput
  }

  export type ProductDatabaseUncheckedCreateInput = {
    id?: string
    name: string
    module: string
    sourceFile?: string | null
    isActive?: boolean
    securityPin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutDatabaseInput
  }

  export type ProductDatabaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    module?: StringFieldUpdateOperationsInput | string
    sourceFile?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    securityPin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutDatabaseNestedInput
  }

  export type ProductDatabaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    module?: StringFieldUpdateOperationsInput | string
    sourceFile?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    securityPin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutDatabaseNestedInput
  }

  export type ProductDatabaseCreateManyInput = {
    id?: string
    name: string
    module: string
    sourceFile?: string | null
    isActive?: boolean
    securityPin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDatabaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    module?: StringFieldUpdateOperationsInput | string
    sourceFile?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    securityPin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDatabaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    module?: StringFieldUpdateOperationsInput | string
    sourceFile?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    securityPin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceProductCreateInput = {
    id?: string
    name: string
    description?: string | null
    type?: string | null
    unitPrice: number
    hsnCode?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceProductUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    type?: string | null
    unitPrice: number
    hsnCode?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceProductCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    type?: string | null
    unitPrice: number
    hsnCode?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type QuotationListRelationFilter = {
    every?: QuotationWhereInput
    some?: QuotationWhereInput
    none?: QuotationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type QuotationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type ProductDatabaseNullableScalarRelationFilter = {
    is?: ProductDatabaseWhereInput | null
    isNot?: ProductDatabaseWhereInput | null
  }

  export type QuotationItemListRelationFilter = {
    every?: QuotationItemWhereInput
    some?: QuotationItemWhereInput
    none?: QuotationItemWhereInput
  }

  export type QuotationItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    sectionCode?: SortOrder
    defaultRate?: SortOrder
    unit?: SortOrder
    warranty?: SortOrder
    imagePath?: SortOrder
    imageText?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hsnCode?: SortOrder
    databaseId?: SortOrder
    gstRate?: SortOrder
    productCode?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    defaultRate?: SortOrder
    sortOrder?: SortOrder
    gstRate?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    sectionCode?: SortOrder
    defaultRate?: SortOrder
    unit?: SortOrder
    warranty?: SortOrder
    imagePath?: SortOrder
    imageText?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hsnCode?: SortOrder
    databaseId?: SortOrder
    gstRate?: SortOrder
    productCode?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    sectionCode?: SortOrder
    defaultRate?: SortOrder
    unit?: SortOrder
    warranty?: SortOrder
    imagePath?: SortOrder
    imageText?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hsnCode?: SortOrder
    databaseId?: SortOrder
    gstRate?: SortOrder
    productCode?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    defaultRate?: SortOrder
    sortOrder?: SortOrder
    gstRate?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type CompanySettingsCountOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    gstin?: SortOrder
    phones?: SortOrder
    email?: SortOrder
    signatureUrl?: SortOrder
    defaultGstRate?: SortOrder
    terms?: SortOrder
    paymentTerms?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySettingsAvgOrderByAggregateInput = {
    defaultGstRate?: SortOrder
  }

  export type CompanySettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    gstin?: SortOrder
    phones?: SortOrder
    email?: SortOrder
    signatureUrl?: SortOrder
    defaultGstRate?: SortOrder
    terms?: SortOrder
    paymentTerms?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySettingsMinOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    gstin?: SortOrder
    phones?: SortOrder
    email?: SortOrder
    signatureUrl?: SortOrder
    defaultGstRate?: SortOrder
    terms?: SortOrder
    paymentTerms?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySettingsSumOrderByAggregateInput = {
    defaultGstRate?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type QuotationCountOrderByAggregateInput = {
    id?: SortOrder
    quoteNumber?: SortOrder
    title?: SortOrder
    customerId?: SortOrder
    date?: SortOrder
    gstPercent?: SortOrder
    subtotal?: SortOrder
    gstAmount?: SortOrder
    grandTotal?: SortOrder
    amountInWords?: SortOrder
    notes?: SortOrder
    terms?: SortOrder
    paymentTerms?: SortOrder
    projectSpecifications?: SortOrder
    sections?: SortOrder
    isDraft?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuotationAvgOrderByAggregateInput = {
    gstPercent?: SortOrder
    subtotal?: SortOrder
    gstAmount?: SortOrder
    grandTotal?: SortOrder
  }

  export type QuotationMaxOrderByAggregateInput = {
    id?: SortOrder
    quoteNumber?: SortOrder
    title?: SortOrder
    customerId?: SortOrder
    date?: SortOrder
    gstPercent?: SortOrder
    subtotal?: SortOrder
    gstAmount?: SortOrder
    grandTotal?: SortOrder
    amountInWords?: SortOrder
    notes?: SortOrder
    terms?: SortOrder
    paymentTerms?: SortOrder
    isDraft?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuotationMinOrderByAggregateInput = {
    id?: SortOrder
    quoteNumber?: SortOrder
    title?: SortOrder
    customerId?: SortOrder
    date?: SortOrder
    gstPercent?: SortOrder
    subtotal?: SortOrder
    gstAmount?: SortOrder
    grandTotal?: SortOrder
    amountInWords?: SortOrder
    notes?: SortOrder
    terms?: SortOrder
    paymentTerms?: SortOrder
    isDraft?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuotationSumOrderByAggregateInput = {
    gstPercent?: SortOrder
    subtotal?: SortOrder
    gstAmount?: SortOrder
    grandTotal?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProductNullableScalarRelationFilter = {
    is?: ProductWhereInput | null
    isNot?: ProductWhereInput | null
  }

  export type QuotationScalarRelationFilter = {
    is?: QuotationWhereInput
    isNot?: QuotationWhereInput
  }

  export type QuotationItemCountOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    section?: SortOrder
    serialNo?: SortOrder
    category?: SortOrder
    description?: SortOrder
    warranty?: SortOrder
    qty?: SortOrder
    unit?: SortOrder
    rate?: SortOrder
    amount?: SortOrder
    imageUrl?: SortOrder
    imageText?: SortOrder
    productId?: SortOrder
    variableValues?: SortOrder
    isCustom?: SortOrder
    title?: SortOrder
  }

  export type QuotationItemAvgOrderByAggregateInput = {
    serialNo?: SortOrder
    qty?: SortOrder
    rate?: SortOrder
    amount?: SortOrder
  }

  export type QuotationItemMaxOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    section?: SortOrder
    serialNo?: SortOrder
    category?: SortOrder
    description?: SortOrder
    warranty?: SortOrder
    qty?: SortOrder
    unit?: SortOrder
    rate?: SortOrder
    amount?: SortOrder
    imageUrl?: SortOrder
    imageText?: SortOrder
    productId?: SortOrder
    isCustom?: SortOrder
    title?: SortOrder
  }

  export type QuotationItemMinOrderByAggregateInput = {
    id?: SortOrder
    quotationId?: SortOrder
    section?: SortOrder
    serialNo?: SortOrder
    category?: SortOrder
    description?: SortOrder
    warranty?: SortOrder
    qty?: SortOrder
    unit?: SortOrder
    rate?: SortOrder
    amount?: SortOrder
    imageUrl?: SortOrder
    imageText?: SortOrder
    productId?: SortOrder
    isCustom?: SortOrder
    title?: SortOrder
  }

  export type QuotationItemSumOrderByAggregateInput = {
    serialNo?: SortOrder
    qty?: SortOrder
    rate?: SortOrder
    amount?: SortOrder
  }

  export type EnumCompanyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyType | EnumCompanyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CompanyType[] | ListEnumCompanyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanyType[] | ListEnumCompanyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanyTypeFilter<$PrismaModel> | $Enums.CompanyType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProductCatalogCountOrderByAggregateInput = {
    id?: SortOrder
    companyType?: SortOrder
    category?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    specifications?: SortOrder
    unitPrice?: SortOrder
    unit?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductCatalogAvgOrderByAggregateInput = {
    unitPrice?: SortOrder
  }

  export type ProductCatalogMaxOrderByAggregateInput = {
    id?: SortOrder
    companyType?: SortOrder
    category?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    unitPrice?: SortOrder
    unit?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductCatalogMinOrderByAggregateInput = {
    id?: SortOrder
    companyType?: SortOrder
    category?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    unitPrice?: SortOrder
    unit?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductCatalogSumOrderByAggregateInput = {
    unitPrice?: SortOrder
  }

  export type EnumCompanyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyType | EnumCompanyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CompanyType[] | ListEnumCompanyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanyType[] | ListEnumCompanyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanyTypeWithAggregatesFilter<$PrismaModel> | $Enums.CompanyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCompanyTypeFilter<$PrismaModel>
    _max?: NestedEnumCompanyTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerGST?: SortOrder
    customerMobile?: SortOrder
    items?: SortOrder
    subTotal?: SortOrder
    cgstPercent?: SortOrder
    sgstPercent?: SortOrder
    cgstAmount?: SortOrder
    sgstAmount?: SortOrder
    roundOff?: SortOrder
    grandTotal?: SortOrder
    amountInWords?: SortOrder
    bankDetails?: SortOrder
    sectionHeadings?: SortOrder
    customSections?: SortOrder
    isDraft?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pdfMode?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    subTotal?: SortOrder
    cgstPercent?: SortOrder
    sgstPercent?: SortOrder
    cgstAmount?: SortOrder
    sgstAmount?: SortOrder
    roundOff?: SortOrder
    grandTotal?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerGST?: SortOrder
    customerMobile?: SortOrder
    subTotal?: SortOrder
    cgstPercent?: SortOrder
    sgstPercent?: SortOrder
    cgstAmount?: SortOrder
    sgstAmount?: SortOrder
    roundOff?: SortOrder
    grandTotal?: SortOrder
    amountInWords?: SortOrder
    isDraft?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pdfMode?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    customerName?: SortOrder
    customerAddress?: SortOrder
    customerGST?: SortOrder
    customerMobile?: SortOrder
    subTotal?: SortOrder
    cgstPercent?: SortOrder
    sgstPercent?: SortOrder
    cgstAmount?: SortOrder
    sgstAmount?: SortOrder
    roundOff?: SortOrder
    grandTotal?: SortOrder
    amountInWords?: SortOrder
    isDraft?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pdfMode?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    subTotal?: SortOrder
    cgstPercent?: SortOrder
    sgstPercent?: SortOrder
    cgstAmount?: SortOrder
    sgstAmount?: SortOrder
    roundOff?: SortOrder
    grandTotal?: SortOrder
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductDatabaseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    module?: SortOrder
    sourceFile?: SortOrder
    isActive?: SortOrder
    securityPin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductDatabaseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    module?: SortOrder
    sourceFile?: SortOrder
    isActive?: SortOrder
    securityPin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductDatabaseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    module?: SortOrder
    sourceFile?: SortOrder
    isActive?: SortOrder
    securityPin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type InvoiceProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    unitPrice?: SortOrder
    hsnCode?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceProductAvgOrderByAggregateInput = {
    unitPrice?: SortOrder
  }

  export type InvoiceProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    unitPrice?: SortOrder
    hsnCode?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    unitPrice?: SortOrder
    hsnCode?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceProductSumOrderByAggregateInput = {
    unitPrice?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type QuotationCreateNestedManyWithoutCustomerInput = {
    create?: XOR<QuotationCreateWithoutCustomerInput, QuotationUncheckedCreateWithoutCustomerInput> | QuotationCreateWithoutCustomerInput[] | QuotationUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutCustomerInput | QuotationCreateOrConnectWithoutCustomerInput[]
    createMany?: QuotationCreateManyCustomerInputEnvelope
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
  }

  export type QuotationUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<QuotationCreateWithoutCustomerInput, QuotationUncheckedCreateWithoutCustomerInput> | QuotationCreateWithoutCustomerInput[] | QuotationUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutCustomerInput | QuotationCreateOrConnectWithoutCustomerInput[]
    createMany?: QuotationCreateManyCustomerInputEnvelope
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type QuotationUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<QuotationCreateWithoutCustomerInput, QuotationUncheckedCreateWithoutCustomerInput> | QuotationCreateWithoutCustomerInput[] | QuotationUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutCustomerInput | QuotationCreateOrConnectWithoutCustomerInput[]
    upsert?: QuotationUpsertWithWhereUniqueWithoutCustomerInput | QuotationUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: QuotationCreateManyCustomerInputEnvelope
    set?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    disconnect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    delete?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    update?: QuotationUpdateWithWhereUniqueWithoutCustomerInput | QuotationUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: QuotationUpdateManyWithWhereWithoutCustomerInput | QuotationUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
  }

  export type QuotationUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<QuotationCreateWithoutCustomerInput, QuotationUncheckedCreateWithoutCustomerInput> | QuotationCreateWithoutCustomerInput[] | QuotationUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: QuotationCreateOrConnectWithoutCustomerInput | QuotationCreateOrConnectWithoutCustomerInput[]
    upsert?: QuotationUpsertWithWhereUniqueWithoutCustomerInput | QuotationUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: QuotationCreateManyCustomerInputEnvelope
    set?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    disconnect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    delete?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    connect?: QuotationWhereUniqueInput | QuotationWhereUniqueInput[]
    update?: QuotationUpdateWithWhereUniqueWithoutCustomerInput | QuotationUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: QuotationUpdateManyWithWhereWithoutCustomerInput | QuotationUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
  }

  export type ProductDatabaseCreateNestedOneWithoutProductsInput = {
    create?: XOR<ProductDatabaseCreateWithoutProductsInput, ProductDatabaseUncheckedCreateWithoutProductsInput>
    connectOrCreate?: ProductDatabaseCreateOrConnectWithoutProductsInput
    connect?: ProductDatabaseWhereUniqueInput
  }

  export type QuotationItemCreateNestedManyWithoutProductInput = {
    create?: XOR<QuotationItemCreateWithoutProductInput, QuotationItemUncheckedCreateWithoutProductInput> | QuotationItemCreateWithoutProductInput[] | QuotationItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutProductInput | QuotationItemCreateOrConnectWithoutProductInput[]
    createMany?: QuotationItemCreateManyProductInputEnvelope
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
  }

  export type QuotationItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<QuotationItemCreateWithoutProductInput, QuotationItemUncheckedCreateWithoutProductInput> | QuotationItemCreateWithoutProductInput[] | QuotationItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutProductInput | QuotationItemCreateOrConnectWithoutProductInput[]
    createMany?: QuotationItemCreateManyProductInputEnvelope
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ProductDatabaseUpdateOneWithoutProductsNestedInput = {
    create?: XOR<ProductDatabaseCreateWithoutProductsInput, ProductDatabaseUncheckedCreateWithoutProductsInput>
    connectOrCreate?: ProductDatabaseCreateOrConnectWithoutProductsInput
    upsert?: ProductDatabaseUpsertWithoutProductsInput
    disconnect?: ProductDatabaseWhereInput | boolean
    delete?: ProductDatabaseWhereInput | boolean
    connect?: ProductDatabaseWhereUniqueInput
    update?: XOR<XOR<ProductDatabaseUpdateToOneWithWhereWithoutProductsInput, ProductDatabaseUpdateWithoutProductsInput>, ProductDatabaseUncheckedUpdateWithoutProductsInput>
  }

  export type QuotationItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<QuotationItemCreateWithoutProductInput, QuotationItemUncheckedCreateWithoutProductInput> | QuotationItemCreateWithoutProductInput[] | QuotationItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutProductInput | QuotationItemCreateOrConnectWithoutProductInput[]
    upsert?: QuotationItemUpsertWithWhereUniqueWithoutProductInput | QuotationItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: QuotationItemCreateManyProductInputEnvelope
    set?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    disconnect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    delete?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    update?: QuotationItemUpdateWithWhereUniqueWithoutProductInput | QuotationItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: QuotationItemUpdateManyWithWhereWithoutProductInput | QuotationItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: QuotationItemScalarWhereInput | QuotationItemScalarWhereInput[]
  }

  export type QuotationItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<QuotationItemCreateWithoutProductInput, QuotationItemUncheckedCreateWithoutProductInput> | QuotationItemCreateWithoutProductInput[] | QuotationItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutProductInput | QuotationItemCreateOrConnectWithoutProductInput[]
    upsert?: QuotationItemUpsertWithWhereUniqueWithoutProductInput | QuotationItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: QuotationItemCreateManyProductInputEnvelope
    set?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    disconnect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    delete?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    update?: QuotationItemUpdateWithWhereUniqueWithoutProductInput | QuotationItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: QuotationItemUpdateManyWithWhereWithoutProductInput | QuotationItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: QuotationItemScalarWhereInput | QuotationItemScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutQuotationsInput = {
    create?: XOR<CustomerCreateWithoutQuotationsInput, CustomerUncheckedCreateWithoutQuotationsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutQuotationsInput
    connect?: CustomerWhereUniqueInput
  }

  export type QuotationItemCreateNestedManyWithoutQuotationInput = {
    create?: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput> | QuotationItemCreateWithoutQuotationInput[] | QuotationItemUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutQuotationInput | QuotationItemCreateOrConnectWithoutQuotationInput[]
    createMany?: QuotationItemCreateManyQuotationInputEnvelope
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
  }

  export type QuotationItemUncheckedCreateNestedManyWithoutQuotationInput = {
    create?: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput> | QuotationItemCreateWithoutQuotationInput[] | QuotationItemUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutQuotationInput | QuotationItemCreateOrConnectWithoutQuotationInput[]
    createMany?: QuotationItemCreateManyQuotationInputEnvelope
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CustomerUpdateOneRequiredWithoutQuotationsNestedInput = {
    create?: XOR<CustomerCreateWithoutQuotationsInput, CustomerUncheckedCreateWithoutQuotationsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutQuotationsInput
    upsert?: CustomerUpsertWithoutQuotationsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutQuotationsInput, CustomerUpdateWithoutQuotationsInput>, CustomerUncheckedUpdateWithoutQuotationsInput>
  }

  export type QuotationItemUpdateManyWithoutQuotationNestedInput = {
    create?: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput> | QuotationItemCreateWithoutQuotationInput[] | QuotationItemUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutQuotationInput | QuotationItemCreateOrConnectWithoutQuotationInput[]
    upsert?: QuotationItemUpsertWithWhereUniqueWithoutQuotationInput | QuotationItemUpsertWithWhereUniqueWithoutQuotationInput[]
    createMany?: QuotationItemCreateManyQuotationInputEnvelope
    set?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    disconnect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    delete?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    update?: QuotationItemUpdateWithWhereUniqueWithoutQuotationInput | QuotationItemUpdateWithWhereUniqueWithoutQuotationInput[]
    updateMany?: QuotationItemUpdateManyWithWhereWithoutQuotationInput | QuotationItemUpdateManyWithWhereWithoutQuotationInput[]
    deleteMany?: QuotationItemScalarWhereInput | QuotationItemScalarWhereInput[]
  }

  export type QuotationItemUncheckedUpdateManyWithoutQuotationNestedInput = {
    create?: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput> | QuotationItemCreateWithoutQuotationInput[] | QuotationItemUncheckedCreateWithoutQuotationInput[]
    connectOrCreate?: QuotationItemCreateOrConnectWithoutQuotationInput | QuotationItemCreateOrConnectWithoutQuotationInput[]
    upsert?: QuotationItemUpsertWithWhereUniqueWithoutQuotationInput | QuotationItemUpsertWithWhereUniqueWithoutQuotationInput[]
    createMany?: QuotationItemCreateManyQuotationInputEnvelope
    set?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    disconnect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    delete?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    connect?: QuotationItemWhereUniqueInput | QuotationItemWhereUniqueInput[]
    update?: QuotationItemUpdateWithWhereUniqueWithoutQuotationInput | QuotationItemUpdateWithWhereUniqueWithoutQuotationInput[]
    updateMany?: QuotationItemUpdateManyWithWhereWithoutQuotationInput | QuotationItemUpdateManyWithWhereWithoutQuotationInput[]
    deleteMany?: QuotationItemScalarWhereInput | QuotationItemScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutItemsInput = {
    create?: XOR<ProductCreateWithoutItemsInput, ProductUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type QuotationCreateNestedOneWithoutItemsInput = {
    create?: XOR<QuotationCreateWithoutItemsInput, QuotationUncheckedCreateWithoutItemsInput>
    connectOrCreate?: QuotationCreateOrConnectWithoutItemsInput
    connect?: QuotationWhereUniqueInput
  }

  export type ProductUpdateOneWithoutItemsNestedInput = {
    create?: XOR<ProductCreateWithoutItemsInput, ProductUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutItemsInput
    upsert?: ProductUpsertWithoutItemsInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutItemsInput, ProductUpdateWithoutItemsInput>, ProductUncheckedUpdateWithoutItemsInput>
  }

  export type QuotationUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<QuotationCreateWithoutItemsInput, QuotationUncheckedCreateWithoutItemsInput>
    connectOrCreate?: QuotationCreateOrConnectWithoutItemsInput
    upsert?: QuotationUpsertWithoutItemsInput
    connect?: QuotationWhereUniqueInput
    update?: XOR<XOR<QuotationUpdateToOneWithWhereWithoutItemsInput, QuotationUpdateWithoutItemsInput>, QuotationUncheckedUpdateWithoutItemsInput>
  }

  export type EnumCompanyTypeFieldUpdateOperationsInput = {
    set?: $Enums.CompanyType
  }

  export type ProductCreateNestedManyWithoutDatabaseInput = {
    create?: XOR<ProductCreateWithoutDatabaseInput, ProductUncheckedCreateWithoutDatabaseInput> | ProductCreateWithoutDatabaseInput[] | ProductUncheckedCreateWithoutDatabaseInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutDatabaseInput | ProductCreateOrConnectWithoutDatabaseInput[]
    createMany?: ProductCreateManyDatabaseInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutDatabaseInput = {
    create?: XOR<ProductCreateWithoutDatabaseInput, ProductUncheckedCreateWithoutDatabaseInput> | ProductCreateWithoutDatabaseInput[] | ProductUncheckedCreateWithoutDatabaseInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutDatabaseInput | ProductCreateOrConnectWithoutDatabaseInput[]
    createMany?: ProductCreateManyDatabaseInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutDatabaseNestedInput = {
    create?: XOR<ProductCreateWithoutDatabaseInput, ProductUncheckedCreateWithoutDatabaseInput> | ProductCreateWithoutDatabaseInput[] | ProductUncheckedCreateWithoutDatabaseInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutDatabaseInput | ProductCreateOrConnectWithoutDatabaseInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutDatabaseInput | ProductUpsertWithWhereUniqueWithoutDatabaseInput[]
    createMany?: ProductCreateManyDatabaseInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutDatabaseInput | ProductUpdateWithWhereUniqueWithoutDatabaseInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutDatabaseInput | ProductUpdateManyWithWhereWithoutDatabaseInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutDatabaseNestedInput = {
    create?: XOR<ProductCreateWithoutDatabaseInput, ProductUncheckedCreateWithoutDatabaseInput> | ProductCreateWithoutDatabaseInput[] | ProductUncheckedCreateWithoutDatabaseInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutDatabaseInput | ProductCreateOrConnectWithoutDatabaseInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutDatabaseInput | ProductUpsertWithWhereUniqueWithoutDatabaseInput[]
    createMany?: ProductCreateManyDatabaseInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutDatabaseInput | ProductUpdateWithWhereUniqueWithoutDatabaseInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutDatabaseInput | ProductUpdateManyWithWhereWithoutDatabaseInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCompanyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyType | EnumCompanyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CompanyType[] | ListEnumCompanyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanyType[] | ListEnumCompanyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanyTypeFilter<$PrismaModel> | $Enums.CompanyType
  }

  export type NestedEnumCompanyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyType | EnumCompanyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CompanyType[] | ListEnumCompanyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanyType[] | ListEnumCompanyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanyTypeWithAggregatesFilter<$PrismaModel> | $Enums.CompanyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCompanyTypeFilter<$PrismaModel>
    _max?: NestedEnumCompanyTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type QuotationCreateWithoutCustomerInput = {
    id?: string
    quoteNumber: string
    title?: string
    date: Date | string
    gstPercent: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    gstAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords?: string
    notes?: string
    terms?: string
    paymentTerms?: string
    projectSpecifications: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: QuotationItemCreateNestedManyWithoutQuotationInput
  }

  export type QuotationUncheckedCreateWithoutCustomerInput = {
    id?: string
    quoteNumber: string
    title?: string
    date: Date | string
    gstPercent: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    gstAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords?: string
    notes?: string
    terms?: string
    paymentTerms?: string
    projectSpecifications: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: QuotationItemUncheckedCreateNestedManyWithoutQuotationInput
  }

  export type QuotationCreateOrConnectWithoutCustomerInput = {
    where: QuotationWhereUniqueInput
    create: XOR<QuotationCreateWithoutCustomerInput, QuotationUncheckedCreateWithoutCustomerInput>
  }

  export type QuotationCreateManyCustomerInputEnvelope = {
    data: QuotationCreateManyCustomerInput | QuotationCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type QuotationUpsertWithWhereUniqueWithoutCustomerInput = {
    where: QuotationWhereUniqueInput
    update: XOR<QuotationUpdateWithoutCustomerInput, QuotationUncheckedUpdateWithoutCustomerInput>
    create: XOR<QuotationCreateWithoutCustomerInput, QuotationUncheckedCreateWithoutCustomerInput>
  }

  export type QuotationUpdateWithWhereUniqueWithoutCustomerInput = {
    where: QuotationWhereUniqueInput
    data: XOR<QuotationUpdateWithoutCustomerInput, QuotationUncheckedUpdateWithoutCustomerInput>
  }

  export type QuotationUpdateManyWithWhereWithoutCustomerInput = {
    where: QuotationScalarWhereInput
    data: XOR<QuotationUpdateManyMutationInput, QuotationUncheckedUpdateManyWithoutCustomerInput>
  }

  export type QuotationScalarWhereInput = {
    AND?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
    OR?: QuotationScalarWhereInput[]
    NOT?: QuotationScalarWhereInput | QuotationScalarWhereInput[]
    id?: StringFilter<"Quotation"> | string
    quoteNumber?: StringFilter<"Quotation"> | string
    title?: StringFilter<"Quotation"> | string
    customerId?: StringFilter<"Quotation"> | string
    date?: DateTimeFilter<"Quotation"> | Date | string
    gstPercent?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFilter<"Quotation"> | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFilter<"Quotation"> | string
    notes?: StringFilter<"Quotation"> | string
    terms?: StringFilter<"Quotation"> | string
    paymentTerms?: StringFilter<"Quotation"> | string
    projectSpecifications?: JsonFilter<"Quotation">
    sections?: JsonFilter<"Quotation">
    isDraft?: BoolFilter<"Quotation"> | boolean
    deletedAt?: DateTimeNullableFilter<"Quotation"> | Date | string | null
    createdAt?: DateTimeFilter<"Quotation"> | Date | string
    updatedAt?: DateTimeFilter<"Quotation"> | Date | string
  }

  export type ProductDatabaseCreateWithoutProductsInput = {
    id?: string
    name: string
    module: string
    sourceFile?: string | null
    isActive?: boolean
    securityPin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDatabaseUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    module: string
    sourceFile?: string | null
    isActive?: boolean
    securityPin?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDatabaseCreateOrConnectWithoutProductsInput = {
    where: ProductDatabaseWhereUniqueInput
    create: XOR<ProductDatabaseCreateWithoutProductsInput, ProductDatabaseUncheckedCreateWithoutProductsInput>
  }

  export type QuotationItemCreateWithoutProductInput = {
    id?: string
    section: string
    serialNo: number
    category?: string
    description: string
    warranty?: string
    qty: Decimal | DecimalJsLike | number | string
    unit: string
    rate: Decimal | DecimalJsLike | number | string
    amount: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    imageText?: string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: boolean
    title?: string
    quotation: QuotationCreateNestedOneWithoutItemsInput
  }

  export type QuotationItemUncheckedCreateWithoutProductInput = {
    id?: string
    quotationId: string
    section: string
    serialNo: number
    category?: string
    description: string
    warranty?: string
    qty: Decimal | DecimalJsLike | number | string
    unit: string
    rate: Decimal | DecimalJsLike | number | string
    amount: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    imageText?: string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: boolean
    title?: string
  }

  export type QuotationItemCreateOrConnectWithoutProductInput = {
    where: QuotationItemWhereUniqueInput
    create: XOR<QuotationItemCreateWithoutProductInput, QuotationItemUncheckedCreateWithoutProductInput>
  }

  export type QuotationItemCreateManyProductInputEnvelope = {
    data: QuotationItemCreateManyProductInput | QuotationItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductDatabaseUpsertWithoutProductsInput = {
    update: XOR<ProductDatabaseUpdateWithoutProductsInput, ProductDatabaseUncheckedUpdateWithoutProductsInput>
    create: XOR<ProductDatabaseCreateWithoutProductsInput, ProductDatabaseUncheckedCreateWithoutProductsInput>
    where?: ProductDatabaseWhereInput
  }

  export type ProductDatabaseUpdateToOneWithWhereWithoutProductsInput = {
    where?: ProductDatabaseWhereInput
    data: XOR<ProductDatabaseUpdateWithoutProductsInput, ProductDatabaseUncheckedUpdateWithoutProductsInput>
  }

  export type ProductDatabaseUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    module?: StringFieldUpdateOperationsInput | string
    sourceFile?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    securityPin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDatabaseUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    module?: StringFieldUpdateOperationsInput | string
    sourceFile?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    securityPin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationItemUpsertWithWhereUniqueWithoutProductInput = {
    where: QuotationItemWhereUniqueInput
    update: XOR<QuotationItemUpdateWithoutProductInput, QuotationItemUncheckedUpdateWithoutProductInput>
    create: XOR<QuotationItemCreateWithoutProductInput, QuotationItemUncheckedCreateWithoutProductInput>
  }

  export type QuotationItemUpdateWithWhereUniqueWithoutProductInput = {
    where: QuotationItemWhereUniqueInput
    data: XOR<QuotationItemUpdateWithoutProductInput, QuotationItemUncheckedUpdateWithoutProductInput>
  }

  export type QuotationItemUpdateManyWithWhereWithoutProductInput = {
    where: QuotationItemScalarWhereInput
    data: XOR<QuotationItemUpdateManyMutationInput, QuotationItemUncheckedUpdateManyWithoutProductInput>
  }

  export type QuotationItemScalarWhereInput = {
    AND?: QuotationItemScalarWhereInput | QuotationItemScalarWhereInput[]
    OR?: QuotationItemScalarWhereInput[]
    NOT?: QuotationItemScalarWhereInput | QuotationItemScalarWhereInput[]
    id?: StringFilter<"QuotationItem"> | string
    quotationId?: StringFilter<"QuotationItem"> | string
    section?: StringFilter<"QuotationItem"> | string
    serialNo?: IntFilter<"QuotationItem"> | number
    category?: StringFilter<"QuotationItem"> | string
    description?: StringFilter<"QuotationItem"> | string
    warranty?: StringFilter<"QuotationItem"> | string
    qty?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    unit?: StringFilter<"QuotationItem"> | string
    rate?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    amount?: DecimalFilter<"QuotationItem"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableFilter<"QuotationItem"> | string | null
    imageText?: StringNullableFilter<"QuotationItem"> | string | null
    productId?: StringNullableFilter<"QuotationItem"> | string | null
    variableValues?: JsonFilter<"QuotationItem">
    isCustom?: BoolFilter<"QuotationItem"> | boolean
    title?: StringFilter<"QuotationItem"> | string
  }

  export type CustomerCreateWithoutQuotationsInput = {
    id?: string
    name: string
    address: string
    phone?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUncheckedCreateWithoutQuotationsInput = {
    id?: string
    name: string
    address: string
    phone?: string | null
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerCreateOrConnectWithoutQuotationsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutQuotationsInput, CustomerUncheckedCreateWithoutQuotationsInput>
  }

  export type QuotationItemCreateWithoutQuotationInput = {
    id?: string
    section: string
    serialNo: number
    category?: string
    description: string
    warranty?: string
    qty: Decimal | DecimalJsLike | number | string
    unit: string
    rate: Decimal | DecimalJsLike | number | string
    amount: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    imageText?: string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: boolean
    title?: string
    product?: ProductCreateNestedOneWithoutItemsInput
  }

  export type QuotationItemUncheckedCreateWithoutQuotationInput = {
    id?: string
    section: string
    serialNo: number
    category?: string
    description: string
    warranty?: string
    qty: Decimal | DecimalJsLike | number | string
    unit: string
    rate: Decimal | DecimalJsLike | number | string
    amount: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    imageText?: string | null
    productId?: string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: boolean
    title?: string
  }

  export type QuotationItemCreateOrConnectWithoutQuotationInput = {
    where: QuotationItemWhereUniqueInput
    create: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput>
  }

  export type QuotationItemCreateManyQuotationInputEnvelope = {
    data: QuotationItemCreateManyQuotationInput | QuotationItemCreateManyQuotationInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutQuotationsInput = {
    update: XOR<CustomerUpdateWithoutQuotationsInput, CustomerUncheckedUpdateWithoutQuotationsInput>
    create: XOR<CustomerCreateWithoutQuotationsInput, CustomerUncheckedCreateWithoutQuotationsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutQuotationsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutQuotationsInput, CustomerUncheckedUpdateWithoutQuotationsInput>
  }

  export type CustomerUpdateWithoutQuotationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateWithoutQuotationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationItemUpsertWithWhereUniqueWithoutQuotationInput = {
    where: QuotationItemWhereUniqueInput
    update: XOR<QuotationItemUpdateWithoutQuotationInput, QuotationItemUncheckedUpdateWithoutQuotationInput>
    create: XOR<QuotationItemCreateWithoutQuotationInput, QuotationItemUncheckedCreateWithoutQuotationInput>
  }

  export type QuotationItemUpdateWithWhereUniqueWithoutQuotationInput = {
    where: QuotationItemWhereUniqueInput
    data: XOR<QuotationItemUpdateWithoutQuotationInput, QuotationItemUncheckedUpdateWithoutQuotationInput>
  }

  export type QuotationItemUpdateManyWithWhereWithoutQuotationInput = {
    where: QuotationItemScalarWhereInput
    data: XOR<QuotationItemUpdateManyMutationInput, QuotationItemUncheckedUpdateManyWithoutQuotationInput>
  }

  export type ProductCreateWithoutItemsInput = {
    id?: string
    name: string
    description?: string
    category?: string
    sectionCode?: string
    defaultRate: Decimal | DecimalJsLike | number | string
    unit?: string
    warranty?: string
    imagePath?: string | null
    imageText?: string | null
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string | null
    productCode?: string | null
    database?: ProductDatabaseCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutItemsInput = {
    id?: string
    name: string
    description?: string
    category?: string
    sectionCode?: string
    defaultRate: Decimal | DecimalJsLike | number | string
    unit?: string
    warranty?: string
    imagePath?: string | null
    imageText?: string | null
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    hsnCode?: string | null
    databaseId?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string | null
    productCode?: string | null
  }

  export type ProductCreateOrConnectWithoutItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutItemsInput, ProductUncheckedCreateWithoutItemsInput>
  }

  export type QuotationCreateWithoutItemsInput = {
    id?: string
    quoteNumber: string
    title?: string
    date: Date | string
    gstPercent: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    gstAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords?: string
    notes?: string
    terms?: string
    paymentTerms?: string
    projectSpecifications: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutQuotationsInput
  }

  export type QuotationUncheckedCreateWithoutItemsInput = {
    id?: string
    quoteNumber: string
    title?: string
    customerId: string
    date: Date | string
    gstPercent: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    gstAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords?: string
    notes?: string
    terms?: string
    paymentTerms?: string
    projectSpecifications: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuotationCreateOrConnectWithoutItemsInput = {
    where: QuotationWhereUniqueInput
    create: XOR<QuotationCreateWithoutItemsInput, QuotationUncheckedCreateWithoutItemsInput>
  }

  export type ProductUpsertWithoutItemsInput = {
    update: XOR<ProductUpdateWithoutItemsInput, ProductUncheckedUpdateWithoutItemsInput>
    create: XOR<ProductCreateWithoutItemsInput, ProductUncheckedCreateWithoutItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutItemsInput, ProductUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sectionCode?: StringFieldUpdateOperationsInput | string
    defaultRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    productCode?: NullableStringFieldUpdateOperationsInput | string | null
    database?: ProductDatabaseUpdateOneWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sectionCode?: StringFieldUpdateOperationsInput | string
    defaultRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    databaseId?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    productCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QuotationUpsertWithoutItemsInput = {
    update: XOR<QuotationUpdateWithoutItemsInput, QuotationUncheckedUpdateWithoutItemsInput>
    create: XOR<QuotationCreateWithoutItemsInput, QuotationUncheckedCreateWithoutItemsInput>
    where?: QuotationWhereInput
  }

  export type QuotationUpdateToOneWithWhereWithoutItemsInput = {
    where?: QuotationWhereInput
    data: XOR<QuotationUpdateWithoutItemsInput, QuotationUncheckedUpdateWithoutItemsInput>
  }

  export type QuotationUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    gstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    projectSpecifications?: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutQuotationsNestedInput
  }

  export type QuotationUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    gstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    projectSpecifications?: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateWithoutDatabaseInput = {
    id?: string
    name: string
    description?: string
    category?: string
    sectionCode?: string
    defaultRate: Decimal | DecimalJsLike | number | string
    unit?: string
    warranty?: string
    imagePath?: string | null
    imageText?: string | null
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string | null
    productCode?: string | null
    items?: QuotationItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutDatabaseInput = {
    id?: string
    name: string
    description?: string
    category?: string
    sectionCode?: string
    defaultRate: Decimal | DecimalJsLike | number | string
    unit?: string
    warranty?: string
    imagePath?: string | null
    imageText?: string | null
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string | null
    productCode?: string | null
    items?: QuotationItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutDatabaseInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutDatabaseInput, ProductUncheckedCreateWithoutDatabaseInput>
  }

  export type ProductCreateManyDatabaseInputEnvelope = {
    data: ProductCreateManyDatabaseInput | ProductCreateManyDatabaseInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutDatabaseInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutDatabaseInput, ProductUncheckedUpdateWithoutDatabaseInput>
    create: XOR<ProductCreateWithoutDatabaseInput, ProductUncheckedCreateWithoutDatabaseInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutDatabaseInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutDatabaseInput, ProductUncheckedUpdateWithoutDatabaseInput>
  }

  export type ProductUpdateManyWithWhereWithoutDatabaseInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutDatabaseInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    sectionCode?: StringFilter<"Product"> | string
    defaultRate?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    unit?: StringFilter<"Product"> | string
    warranty?: StringFilter<"Product"> | string
    imagePath?: StringNullableFilter<"Product"> | string | null
    imageText?: StringNullableFilter<"Product"> | string | null
    sortOrder?: IntFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    hsnCode?: StringNullableFilter<"Product"> | string | null
    databaseId?: StringNullableFilter<"Product"> | string | null
    gstRate?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    productCode?: StringNullableFilter<"Product"> | string | null
  }

  export type QuotationCreateManyCustomerInput = {
    id?: string
    quoteNumber: string
    title?: string
    date: Date | string
    gstPercent: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    gstAmount: Decimal | DecimalJsLike | number | string
    grandTotal: Decimal | DecimalJsLike | number | string
    amountInWords?: string
    notes?: string
    terms?: string
    paymentTerms?: string
    projectSpecifications: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuotationUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    gstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    projectSpecifications?: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: QuotationItemUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    gstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    projectSpecifications?: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: QuotationItemUncheckedUpdateManyWithoutQuotationNestedInput
  }

  export type QuotationUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    quoteNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    gstPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gstAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    grandTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountInWords?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    terms?: StringFieldUpdateOperationsInput | string
    paymentTerms?: StringFieldUpdateOperationsInput | string
    projectSpecifications?: JsonNullValueInput | InputJsonValue
    sections?: JsonNullValueInput | InputJsonValue
    isDraft?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuotationItemCreateManyProductInput = {
    id?: string
    quotationId: string
    section: string
    serialNo: number
    category?: string
    description: string
    warranty?: string
    qty: Decimal | DecimalJsLike | number | string
    unit: string
    rate: Decimal | DecimalJsLike | number | string
    amount: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    imageText?: string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: boolean
    title?: string
  }

  export type QuotationItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    serialNo?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    qty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    quotation?: QuotationUpdateOneRequiredWithoutItemsNestedInput
  }

  export type QuotationItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quotationId?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    serialNo?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    qty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  }

  export type QuotationItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quotationId?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    serialNo?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    qty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  }

  export type QuotationItemCreateManyQuotationInput = {
    id?: string
    section: string
    serialNo: number
    category?: string
    description: string
    warranty?: string
    qty: Decimal | DecimalJsLike | number | string
    unit: string
    rate: Decimal | DecimalJsLike | number | string
    amount: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    imageText?: string | null
    productId?: string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: boolean
    title?: string
  }

  export type QuotationItemUpdateWithoutQuotationInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    serialNo?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    qty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    product?: ProductUpdateOneWithoutItemsNestedInput
  }

  export type QuotationItemUncheckedUpdateWithoutQuotationInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    serialNo?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    qty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  }

  export type QuotationItemUncheckedUpdateManyWithoutQuotationInput = {
    id?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    serialNo?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    qty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    variableValues?: JsonNullValueInput | InputJsonValue
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateManyDatabaseInput = {
    id?: string
    name: string
    description?: string
    category?: string
    sectionCode?: string
    defaultRate: Decimal | DecimalJsLike | number | string
    unit?: string
    warranty?: string
    imagePath?: string | null
    imageText?: string | null
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    hsnCode?: string | null
    gstRate?: Decimal | DecimalJsLike | number | string | null
    productCode?: string | null
  }

  export type ProductUpdateWithoutDatabaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sectionCode?: StringFieldUpdateOperationsInput | string
    defaultRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    productCode?: NullableStringFieldUpdateOperationsInput | string | null
    items?: QuotationItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutDatabaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sectionCode?: StringFieldUpdateOperationsInput | string
    defaultRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    productCode?: NullableStringFieldUpdateOperationsInput | string | null
    items?: QuotationItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutDatabaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    sectionCode?: StringFieldUpdateOperationsInput | string
    defaultRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    warranty?: StringFieldUpdateOperationsInput | string
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    imageText?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hsnCode?: NullableStringFieldUpdateOperationsInput | string | null
    gstRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    productCode?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}