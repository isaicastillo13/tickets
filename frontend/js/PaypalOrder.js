paypal.Buttons({
    createOrder() {
        return fetch("http://localhost:3000/payment/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: "10.00", // O el valor que desees
                description: "A book on the subject of technology.", // O la descripción que desees
                cart: [
                    {
                        // sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                        // quantity: "YOUR_PRODUCT_QUANTITY",
                        sku: "Ticket of Tickets507.com",
                        quantity: "1",
                    },
                ]
            })
        })
            .then((response) => response.json())
            .then((order) => order.id);
    },
    onSuccess(data) {

        console.log("Pago exitoso, datos:", data);

        fetch("http://localhost:3000/payment/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data,
            })
        })
            // .then((response) => {
            //     response.json();
            //     window.location.href = "http://localhost:3000/success";
            //     alert('¡Compra realizada correctamente!');
            //     console.log('¡Compra realizada correctamente!');
            // });
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log("Respuesta del servidor:", result);
                alert('¡Compra realizada correctamente!');
                // Retrasa la redirección para dar tiempo a que se muestre el alert
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/success";
                }, 5000);
            })
            .catch((error) => {
                console.error("Error en la ejecución del pago:", error);
                alert('Hubo un error al procesar el pago. Por favor, inténtelo de nuevo.');
            });
    },
    onError(err) {
        console.log(err);
        window.location.href = "http://localhost:3000/error";
    },
    onCancel(data) {
        console.log(data);
    },
}).render('#paypal-button-container');