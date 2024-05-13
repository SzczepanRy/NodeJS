import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;

const createToken = async () => {
    let token = await sign(
        {
            email: "aaa@test.com",
            anyData: "123",
        },
        "verysecretkey", // key powinien być zapisany w .env
        {
            expiresIn: "5min", // "1m", "1d", "24h"
        }
    );
    console.log({ token: token });
};
const verifyToken = (token) => {
    try {
        let decoded = verify(token, "verysecretkey");
        console.log({ decoded: decoded });
    } catch (ex) {
        console.log({ message: ex.message });
    }
};

const processToken = () => {
    createToken();
    verifyToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUB0ZXN0LmNvbSIsImFueURhdGEiOiIxMjMiLCJpYXQiOjE3MTQ2OTIwMzcsImV4cCI6MTcxNDY5MjMzN30.G4bSP1pD3qjs2o0LE0TfSR7XIkSpKfr-Hl8mMYnpQIU"
    );
};

processToken();
