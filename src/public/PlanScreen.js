import React, { useEffect, useState } from 'react'
import "./PlanScreen.css"
import db from './firebase'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { loadStripe } from '@stripe/stripe-js'
function PlanScreen() {
    const [products, setproducts] = useState([])
    const user = useSelector(selectUser)
    const [subsription, setsubsription] = useState(null)
    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subsription => {
                    setsubsription({
                        role: subsription.data().role,
                        current_period_end: subsription.data().current_period_end.seconds,
                        current_period_start: subsription.data().current_period_start.seconds,
                    })
                })
            })
    }, [user.uid])
    useEffect(() => {
        db.collection('products').where("active", "==", true).get().then(querySnapshot => {
            const products = {}
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get()
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    }
                })
            })
            setproducts(products)
        })
    }, [])
    console.log(products)
    console.log(subsription)
    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers').doc(user.uid).collection("checkout_sessions").add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        })
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data()
            if (error) {
                alert(`An error occured: ${error.message}`)
            }
            if (sessionId) {
                const stripe = await loadStripe('pk_test_51MrKPWSBNqN8QTevJgpNbOe55CjuwNyV5nqTJHqO8l8WqmmvXCD7b8SeCUMAgkA0MLx5qq5V6Rt6yNxYZmWb79uz00qmNxop0U')
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }
    return (

        <div className='planscreen'>
            <br />
            {subsription && (
                <p>
                    Renewal date:
                    {new Date(
                        subsription?.current_period_end * 1000
                    ).toLocaleDateString()}
                </p>
            )}
            {Object.entries(products).map(([productId, productData]) => {

                //add logic to check if usersubscription is active
                const isCurrentpackage = productData.name?.toLowerCase().includes(subsription?.role)
                console.log(isCurrentpackage);

                return (
                    <div key={productId} className="planscreen_plan">
                        <div className="planscreen_info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentpackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentpackage ? "Current Package" : "Subscribe"}
                        </button>
                    </div>
                )
                
            })}
        </div>
    )
}

export default PlanScreen