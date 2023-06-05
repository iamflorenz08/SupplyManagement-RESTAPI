
const sort_available = (a, b) => {
    const percentA = ((a.current_supply - a.buffer) / a.buffer) * 100
    const percentB = ((b.current_supply - b.buffer) / b.buffer) * 100

    return (percentA - percentB)
}

module.exports = { sort_available }