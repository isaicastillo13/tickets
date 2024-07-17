const { CLIENT_ID, APP_SECRET } = process.env;

const baseUrl = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com"
};

async function generateAccessToken() {
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64")
    const response = await fetch(`${baseUrl.sandbox}/v1/oauth2/token`, {
        method: "post",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const data = await response.json();
    return data.access_token;
}


module.exports = async (req, res) => {

    const { amount, description } = req.body; // valores del cuerpo de la solicitud

    const accessToken = await generateAccessToken();
    const url = `${baseUrl.sandbox}/v2/checkout/orders`;
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        // value: "5.00",
                        value: amount.toString(), // Usa el valor pasado
                    },
                    // description: "A book on the subject of technology.",
                    description: description, // Usa la descripción pasada
                },
            ],
        }),
    });
    const data = await response.json();
    console.log("data desde createOrder.js -> ", { data })
    return data;
};