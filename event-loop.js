console.log("1")
setImmediate(() => console.log("2"))
setTimeout(() => console.log("3"), 0)
Promise.resolve().then(() => console.log("4"))
console.log("5")

function test() {
    try {
        return 1
    }
    catch (e) {
        return 2
    }
    finally {
        return 3
    }
}
// console.log(test())