const phrases = {
  /**
   * The server has received the request headers, and the client should proceed to send the request body.
   */
  CONTINUE: 'Continue',
  /**
   * The requester has asked the server to switch protocols.
   */
  SWITCHING_PROTOCOLS: 'Switching Protocols',
  /**
   * The server has received and is processing the request, but no response is available yet.
   */
  PROCESSING: 'Processing',
  /**
   * The request has succeeded.
   */
  OK: 'OK',
  /**
   * The request has been fulfilled and resulted in a new resource being created.
   */
  CREATED: 'Created',
  /**
   * The request has been accepted for processing, but the processing has not been completed.
   */
  ACCEPTED: 'Accepted',
  /**
   * The server successfully processed the request, but is returning information from another source.
   */
  NON_AUTHORITATIVE_INFORMATION: 'Non-Authoritative Information',
  /**
   * The server successfully processed the request, but is not returning any content.
   */
  NO_CONTENT: 'No Content',
  /**
   * The server successfully processed the request, but is not returning any content and requires the requester to reset the document view.
   */
  RESET_CONTENT: 'Reset Content',
  /**
   * The server is delivering only part of the resource due to a range header sent by the client.
   */
  PARTIAL_CONTENT: 'Partial Content',
  /**
   * The message body that follows is an XML message and can contain a number of separate response codes.
   */
  MULTI_STATUS: 'Multi-Status',
  /**
   * The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.
   */
  ALREADY_REPORTED: 'Already Reported',
  /**
   * The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
   */
  IM_USED: 'IM Used',
  /**
   * Indicates multiple options for the resource from which the client may choose.
   */
  MULTIPLE_CHOICES: 'Multiple Choices',
  /**
   * This and all future requests should be directed to the given URI.
   */
  MOVED_PERMANENTLY: 'Moved Permanently',
  /**
   * Tells the client to look at (browse to) another URL.
   */
  FOUND: 'Found',
  /**
   * The response to the request can be found under another URI using a GET method.
   */
  SEE_OTHER: 'See Other',
  /**
   * Indicates that the resource has not been modified since the version specified by the request headers.
   */
  NOT_MODIFIED: 'Not Modified',
  /**
   * The requested resource is available only through a proxy, the address for which is provided in the response.
   */
  USE_PROXY: 'Use Proxy',
  /**
   * In this case, the request should be repeated with another URI; however, future requests should still use the original URI.
   */
  TEMPORARY_REDIRECT: 'Temporary Redirect',
  /**
   * The request and all future requests should be repeated using another URI.
   */
  PERMANENT_REDIRECT: 'Permanent Redirect',
  /**
   * The server cannot or will not process the request due to an apparent client error.
   */
  BAD_REQUEST: 'Bad Request',
  /**
   * Authentication is required and has failed or has not yet been provided.
   */
  UNAUTHORIZED: 'Unauthorized',
  /**
   * Reserved for future use.
   */
  PAYMENT_REQUIRED: 'Payment Required',
  /**
   * The request was valid, but the server is refusing action.
   */
  FORBIDDEN: 'Forbidden',
  /**
   * The requested resource could not be found.
   */
  NOT_FOUND: 'Not Found',
  /**
   * A request method is not supported for the requested resource.
   */
  METHOD_NOT_ALLOWED: 'Method Not Allowed',
  /**
   * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
   */
  NOT_ACCEPTABLE: 'Not Acceptable',
  /**
   * The client must first authenticate itself with the proxy.
   */
  PROXY_AUTHENTICATION_REQUIRED: 'Proxy Authentication Required',
  /**
   * The server timed out waiting for the request.
   */
  REQUEST_TIMEOUT: 'Request Timeout',
  /**
   * Indicates that the request could not be processed because of conflict in the request.
   */
  CONFLICT: 'Conflict',
  /**
   * Indicates that the resource requested is no longer available and will not be available again.
   */
  GONE: 'Gone',
  /**
   * The request did not specify the length of its content, which is required by the requested resource.
   */
  LENGTH_REQUIRED: 'Length Required',
  /**
   * The server does not meet one of the preconditions that the requester put on the request.
   */
  PRECONDITION_FAILED: 'Precondition Failed',
  /**
   * The request is larger than the server is willing or able to process.
   */
  PAYLOAD_TOO_LARGE: 'Payload Too Large',
  /**
   * The URI provided was too long for the server to process.
   */
  URI_TOO_LONG: 'URI Too Long',
  /**
   * The request entity has a media type which the server or resource does not support.
   */
  UNSUPPORTED_MEDIA_TYPE: 'Unsupported Media Type',
  /**
   * The client has asked for a portion of the file, but the server cannot supply that portion.
   */
  RANGE_NOT_SATISFIABLE: 'Range Not Satisfiable',
  /**
   * The server cannot meet the requirements of the Expect request-header field.
   */
  EXPECTATION_FAILED: 'Expectation Failed',
  /**
   * This code was defined in 1998 as one of the traditional IETF April Fools' jokes.
   */
  IM_A_TEAPOT: "I'm a teapot",
  /**
   * The request was directed at a server that is not able to produce a response.
   */
  MISDIRECTED_REQUEST: 'Misdirected Request',
  /**
   * The request was well-formed but was unable to be followed due to semantic errors.
   */
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
  /**
   * The resource that is being accessed is locked.
   */
  LOCKED: 'Locked',
  /**
   * The request failed due to failure of a previous request.
   */
  FAILED_DEPENDENCY: 'Failed Dependency',
  /**
   * Indicates that the server is unwilling to risk processing a request that might be replayed.
   */
  TOO_EARLY: 'Too Early',
  /**
   * The client should switch to a different protocol.
   */
  UPGRADE_REQUIRED: 'Upgrade Required',
  /**
   * The origin server requires the request to be conditional.
   */
  PRECONDITION_REQUIRED: 'Precondition Required',
  /**
   * The user has sent too many requests in a given amount of time.
   */
  TOO_MANY_REQUESTS: 'Too Many Requests',
  /**
   * The server is unwilling to process the request because its header fields are too large.
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE: 'Request Header Fields Too Large',
  /**
   * The server is denying access to the resource as a consequence of a legal demand.
   */
  UNAVAILABLE_FOR_LEGAL_REASONS: 'Unavailable For Legal Reasons',
  /**
   * A generic error message, given when no more specific message is suitable.
   */
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  /**
   * The server either does not recognize the request method, or it lacks the ability to fulfill the request.
   */
  NOT_IMPLEMENTED: 'Not Implemented',
  /**
   * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
   */
  BAD_GATEWAY: 'Bad Gateway',
  /**
   * The server is currently unavailable (because it is overloaded or down for maintenance).
   */
  SERVICE_UNAVAILABLE: 'Service Unavailable',
  /**
   * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   */
  GATEWAY_TIMEOUT: 'Gateway Timeout',
  /**
   * The server does not support the HTTP protocol version used in the request.
   */
  HTTP_VERSION_NOT_SUPPORTED: 'HTTP Version Not Supported',
  /**
   * Transparent content negotiation for the request results in a circular reference.
   */
  VARIANT_ALSO_NEGOTIATES: 'Variant Also Negotiates',
  /**
   * The server is unable to store the representation needed to complete the request.
   */
  INSUFFICIENT_STORAGE: 'Insufficient Storage',
  /**
   * The server detected an infinite loop while processing the request.
   */
  LOOP_DETECTED: 'Loop Detected',
  /**
   * Further extensions to the request are required for the server to fulfill it.
   */
  NOT_EXTENDED: 'Not Extended',
  /**
   * The client needs to authenticate to gain network access.
   */
  NETWORK_AUTHENTICATION_REQUIRED: 'Network Authentication Required',
} as const

export default phrases
