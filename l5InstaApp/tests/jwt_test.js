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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUB0ZXN0LmNvbSIsImFueURhdGEiOiIxMjMiLCJpYXQiOjE3MTQ2ODk4MjAsImV4cCI6MTcxNDY4OTg1MH0.PLwdawVHS3RBgmOxGcoSETkN4W8fmGToEGp4o30Vet0"
    );
};

processToken();
