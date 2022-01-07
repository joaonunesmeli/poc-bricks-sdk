async function Bricks(mercadoPagoSDK) {
    const fetchBrickRoot = async () => {
        const r = await fetch('/bricks/root');
        const obj = await r.json();
        return obj.html;
    };

    const rootHtml = await fetchBrickRoot();

    const availableFields = ['CVV', 'cardNumber', 'expirationDate'];
    const placeholders = {
        'CVV': 'CVV',
        'cardNumber': 'Card number',
        'expirationDate': 'MM/YY',
    };

    const dummy = document.createElement('template');
    document.getElementsByTagName('body')[0].appendChild(dummy);
    function createElement(html) {
        dummy.innerHTML = html;
        return dummy.content.firstChild;
    }

    const create = (field) => {
        if (!availableFields.includes(field)) {
            throw new Error('Invalid field');
        }

        const root = createElement(rootHtml);
        const input = mercadoPagoSDK.fields.create(field, {
            placeholder: placeholders[field],
        });
        const inputWrapper = root.children[1];
        const inputWrapperID = `mercadopago-bricks-pci-${field}`;

        inputWrapper.setAttribute('id', inputWrapperID);

        let targetID = null;
        return {
            mount: (id) => {
                targetID = id;
                document.getElementById(id).appendChild(root);
                input.mount(inputWrapperID);
            },
            unmount: () => {
                input.unmount();
                document.getElementById(targetID).removeChild(root);
            },
            setTheme: (theme) => {
                const css = document.querySelector(':root');
                css.style.setProperty('--bg', theme);
            }
        };
    };

    return { create };
};
