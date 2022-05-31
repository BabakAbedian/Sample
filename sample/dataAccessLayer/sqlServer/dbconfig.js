module.exports = {
    HOST: "DESKTOP-DHNOJCN",
    PORT: "1433",
    USER: "sa",
    PASSWORD: "1",
    DB: "WitcherDb",
    dialect: "mssql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}