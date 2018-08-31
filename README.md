## Classes

<dl>
<dt><a href="#Client">Client</a></dt>
<dd><p>Client for JSON/REST/RPC over http with AWS4 signatures</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#CallResult">CallResult</a> : <code><a href="#CallResultArray">CallResultArray</a></code></dt>
<dd><p>Map of s for the associated calls</p>
</dd>
<dt><a href="#CallResultArray">CallResultArray</a></dt>
<dd></dd>
<dt><a href="#CallStructure">CallStructure</a> : <code><a href="#CallResultArray">CallResultArray</a></code></dt>
<dd><p>A structure with method names and their associated parameters.</p>
<p>Each result is an  for the associated call key.</p>
</dd>
</dl>

<a name="Client"></a>

## Client
Client for JSON/REST/RPC over http with AWS4 signatures

**Kind**: global class  

* [Client](#Client)
    * [new Client(host, keys)](#new_Client_new)
    * [.call(structures)](#Client+call) ⇒ [<code>CallResult</code>](#CallResult)

<a name="new_Client_new"></a>

### new Client(host, keys)
Create client for a host


| Param | Type | Description |
| --- | --- | --- |
| host | <code>string</code> | Host name |
| keys | <code>Credentials</code> | Optional credentials for AWS4 signing |

**Example**  
```js
const client = new Client('api.moarhealth.com')
client.call({
    greeting: "Mark",
    initialize: { "some": "stuff" }
}).then(results => {
     console.log(`Result for greeting was ${results.greeting}`)
     console.log(`Result for initialize was ${results.initialize}`)
})
```
<a name="Client+call"></a>

### client.call(structures) ⇒ [<code>CallResult</code>](#CallResult)
Call one or more methods

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: [<code>CallResult</code>](#CallResult) - A promise to produce  

| Param | Type | Description |
| --- | --- | --- |
| structures | [<code>CallStructure</code>](#CallStructure) | Structure for the calls the client will make. |

<a name="CallResult"></a>

## CallResult : [<code>CallResultArray</code>](#CallResultArray)
Map of s for the associated calls

**Kind**: global typedef  
<a name="CallResultArray"></a>

## CallResultArray
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>object</code> | Error object |
| 1 | <code>object</code> | Data object |

<a name="CallStructure"></a>

## CallStructure : [<code>CallResultArray</code>](#CallResultArray)
A structure with method names and their associated parameters.

Each result is an  for the associated call key.

**Kind**: global typedef  
