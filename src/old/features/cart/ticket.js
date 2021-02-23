import React from 'react';
import './styles/ticket/pc.scss';

const contacts = [
    {
        text: 'Telegram',
        colorData: '#21A0DC',
        link: 'tg://user?id=336709361'
    },
    {
        text: `What's App`,
        colorData: '#71DD7E',
        link: 'https://wa.me/79295070288'
    },
    {
        text: 'Viber',
        colorData: '#8C67A9',
        link: 'viber://chat?number=79295070288'
    }
]

function CartTicket({orderId}) {

    function copyOrderId(e) {
        const {target} = e;

        navigator.clipboard.writeText(`#${orderId}`)
            .then( () => { 
                target.innerHTML = 'Скопированно!';
                target.classList.add('active');
            }, err => console.log )
    }

    return (
        <div className="cart-ticket">
            <h3>
                Ваш заказ успешно оформлен. <br/>
                Его номер:
            </h3>
            <h1>#{orderId}</h1>

            <button onClick={copyOrderId} className="cart-ticket_copy">
                Скопировать
            </button>

            <p>
                Мы уже направили копию номера
                на указанную вами почту.
                <br/><br/>
                Также, наш менеджер скоро с вами
                свяжется для завершения покупки
                по выбранному вами способу.
                <br/><br/>
                А если вы не хотите ждать, <br/>
                то можете сами обратиться к нам <br/>
                с помощью:
            </p>
            
            <div className="cart-ticket_contacts">
                { 
                    contacts.map(
                        ({text, colorData, link}) => (
                            <a href={link} style={{'--colorData': colorData}} target="_blank">
                                {text}
                            </a>
                        )
                    ) 
                }
            </div>

            <h3 className="cart-ticket_gratitude">
                Спасибо, что выбрали нас <br/>
                и удачных покупок!
            </h3>
        </div>
    );
}

export default CartTicket;