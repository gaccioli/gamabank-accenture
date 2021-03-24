
const status = (request, h) => {
    return {
        status: 'running',
        timestamp: new Date()
    }
}

module.exports = status