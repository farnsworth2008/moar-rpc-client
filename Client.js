'use strict'

const attach = require('farnsworth-attach')
const aws4 = require('aws4')
const request = require('request')

/**
 * @typedef CallResult
 *
 * Map of CallResultArrays for the associated calls
 */

/**
 * @typedef CallResultArray
 * @property 0 {object} Error object
 * @property 1 {object} Data object
 */

/**
 * @typedef CallStructure
 *
 * A structure with method names and their associated parameters.
 *
 * Each result is an CallResultArray for the associated call key.
 */

/**
 * Client for JSON/REST/RPC over http with AWS4 signatures
 *
 * Traditionally making calls to JSON based servers involves way to much syntax.  This client reduces the syntax to the
 * bare minimum.  You get a method name, parameter object, and a result or error structure.  Servers where the http body
 * is processed as a JSON object are supported.
 * <p>
 * If desired you can sign your requests by including AWS keys.
 *
 * @example
 *
 * const client = new Client('api.moarhealth.com')
 * client.call({
 *     greeting: "Mark"
 *     initialize: { "some": "stuff" }
 * }).then(results => {
 *      console.log(`Result for greeting was ${results.greeting}`)
 *      console.log(`Result for initialize was ${results.initialize}`)
 * })
 */
class Client {
    /**
     * Create client for a host
     *
     * @example
     * const client = new Client('api.moarhealth.com', {
     *      "accessKeyId": "XXXXXXXXXXXXXXXXXXXX",
     *      "secretAccessKey": "XXXXXXXX/XXXXXXXXXXXXXXXXXXXX"
     * })
     *
     * @param host {string} Host name
     * @param keys {Credentials} Optional credentials for AWS4 signing
     */
    constructor(host, keys) { client(this, host, keys) }

    /**
     * Call one or more methods
     *
     * @param structures {CallStructure} Structure for the calls the client will make.
     * @returns A promise to produce {CallResult}
     */
    call(structures) {}
}

module.exports = Client

function client(T, host, keys) {
    attach(T, function call(structures) {
        return new Promise((resolve, reject) => {
            const results = {}, methods = Object.keys(structures)
            let errorCount = 0, resultCount = 0
            for(let method of methods) {
                const params = structures[method]
                const signingFn = keys
                                ? aws4.sign
                                : (o, k) => { return o}
                const baseUrl = host === 'localhost'
                              ? `http://${host}:3000`
                              : `https://${host}`
                const options = signingFn({
                    method: 'POST', service: 'execute-api',
                    headers: {'content-type': 'application/json', Host: host},
                    path: method, url: `${baseUrl}/${method}`, json: true,
                    body: JSON.stringify(params)
                }, keys)
                options.body = params
                request(options, (err, res, result) => {
                    if(err) {
                        errorCount++
                    }
                    results[method] = { err: err, data: result }
                    if(++resultCount == methods.length) {
                        return (errorCount ? reject : resolve)(results)
                    }
                })
            }
        })
    })
}