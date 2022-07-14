export class SolanaDomainError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'SolanaDomainError',
        this.message = message
    }
}

export class SolanaAddressValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'SolanaAddressValidationError',
        this.message = message
    }
}

export class MessageError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'MessageError',
        this.message = message
    }
}