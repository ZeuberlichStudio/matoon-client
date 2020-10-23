import React from 'react';
import NewModal from 'features/new-modal';
import ProductPage from 'pages/product';

const { API_URL } = process.env;

const product = { 
    "_id" : "5f689fc9342826442cbd25b9", 
    "slug" : "product-0", 
    "categories" : [
        "subcat-0"
    ], 
    "name" : "Gucci Wallet", 
    "sku" : "g-679", 
    "description" : "A wallet is a small, flat case that can be used to carry such small personal items as paper currency, credit cards, and identification documents (driver's license, identification card, club card, etc.), photographs, transit pass, business cards and other paper or laminated cards.", 
    "shortDescription" : "A wallet is a small, flat case that can be used to carry such small personal items as paper currency, credit cards, and identification documents (driver's license, identification card, club card, etc.), photographs, transit pass, business cards and other paper or laminated cards.", 
    "variants" : [
        {
            "images" : [
                "static/images/wallet_black-0.jpg", 
                "static/images/wallet_black-1.jpg", 
                "static/images/wallet_black-2.jpg", 
                "static/images/wallet_black-3.jpg", 
                "static/images/wallet_black-4.jpg"
            ], 
            "_id" : "5f693f27c8ea83122827ecae", 
            "name" : "Кошелёк Gucci чёрный", 
            "color" : "black"
        }, 
        {
            "images" : [
                "static/images/wallet_red-0.jpg", 
                "static/images/wallet_red-1.jpg", 
                "static/images/wallet_red-2.jpg", 
                "static/images/wallet_red-3.jpg", 
                "static/images/wallet_red-4.jpg"
            ], 
            "_id" : "5f693f27c8ea83122827ecaf", 
            "name" : "Кошелёк Gucci красный", 
            "color" : "red"
        }
    ], 
    "meta" : {
        "stock" : 700, 
        "orders" : 100, 
        "updatedAt" : "2020-09-22T00:02:47.653+0000", 
        "createdAt" : "2020-09-21T12:50:38.849+0000"
    }, 
    "__v" : 0, 
    "attributes" : {
        "colors" : [
            {
                "name": "black",
                "colorData": "rgb(0,0,0)"
            },
            {
                "name": "red",
                "colorData": "rgb(200,0,80)"
            },
            {
                "name": "black",
                "colorData": "rgb(0,0,0)"
            },
            {
                "name": "red",
                "colorData": "rgb(200,0,80)"
            },
            {
                "name": "black",
                "colorData": "rgb(0,0,0)"
            },
            {
                "name": "red",
                "colorData": "rgb(200,0,80)"
            }
        ], 
        "brands" : [
            {
                "name": "Gucci"
            }
        ]
    }, 
    "specs" : {
        "Карманы" : "3", 
        "Отдел для мелочи" : "есть", 
        "Вид застёжки" : "молния"
    }, 
    "materials" : [
        "leather", 
        "metal"
    ], 
    "for" : "unisex", 
    "price" : 1400
}

export default function DevPage() {
    return (
        <h1>dev page</h1>
    );
}