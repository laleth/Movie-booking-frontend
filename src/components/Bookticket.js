import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { Button } from 'react-bootstrap';
import { API } from '../Global';
import '../style/bill.css';
import { notification } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';

function Bill() {
    const [custname, setCustname] = useState("");
    const [phone, setPhone] = useState("");
    const [taxRate] = useState(0.1);
    const ticketPrice = 200;
    const [paymentmode, setPayment] = useState("");
    const [totalSeats, setTotalSeats] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const colors2 = ['#3f5efb', '#8355c7', '#b64fa0', '#fc466b'];
    // const colors3 = ['#090979', '#4f4fee', '#090979', '#020024'];
    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    useEffect(() => {
        const calculatedTotal = totalSeats * ticketPrice;
        setTotal(calculatedTotal);
        const calculatedTax = calculatedTotal * taxRate;
        setSubtotal(calculatedTotal + calculatedTax);
    }, [totalSeats, taxRate]);

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    const chargebill = async () => {
        if (!paymentmode) {
            openNotification('error', 'Payment Mode Error', 'Please select a payment mode.');
            return;
        }
        try {
            const token = localStorage.getItem('Authorization');
            const response = await axios.post(`${API}/bills/charge-bill`, {
                customerName: custname,
                customerPhoneNumber: phone,
                totalSeats: totalSeats,
                totalAmount: total,
                tax: total * taxRate,
                subTotal: subtotal,
                paymentMode: paymentmode,
            }, {
                headers: {
                    Authorization: `${token}`,
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                openNotification('success', 'Bill Saved Successful', 'Your Bill has been Saved Successfully.');
                setCustname("");
                setPhone("");
                setTotalSeats(0);
                setPayment("");

            } else {
                console.log(`Error: ${response.data.message}`);
                openNotification('error', 'Bill Error', 'There was an error during Bill Saving.');
            }
        } catch (error) {
            console.error('Error during bill charging:', error);
        }
    };

    // const getBill = async () => {
    //     try {
    //         const response = await axios.get(`${API}/bills/get-bill`);
    //         const billData = response.data;

    //         window.location.href = `/bill-details?data=${JSON.stringify(billData)}`;

    //     } catch (error) {
    //         console.error('Error retrieving bill:', error);
    //         openNotification('error', 'Bill Retrieval Error', 'There was an error retrieving the bill.');
    //     }
    // };

    return (
        <div className="bill-container">
            <label>
                Customer Name:
                <input type='text' placeholder='Customer Name' onChange={(e) => setCustname(e.target.value)} value={custname} />
            </label>
            <label>
                Phone Number:
                <input type='text' placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} value={phone} />
            </label>
            <label>
                Total Seats:
                <input type='number' placeholder='Total Seats' onChange={(e) => setTotalSeats(e.target.value)} value={totalSeats} />
            </label>
            <label>
                Total Amount:
                <input type='text' placeholder='Total Amount' value={total} readOnly />
            </label>
            <label>
                Tax:
                <input type='text' placeholder='Tax' value={total * taxRate} readOnly />
            </label>
            <label>
                Sub Total:
                <input type='text' placeholder='Sub Total' value={subtotal} readOnly />
            </label>
            <label>
                Payment Mode:
                <select onChange={(e) => setPayment(e.target.value)} value={paymentmode}>
                    <option value="">Select Payment Mode</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="UPI">UPI</option>
                </select>
            </label>
            {/* <Button variant='info' onClick={chargebill}>Charge Bill</Button> */}
            <Space>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                                colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                                colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                                lineWidth: 0,
                            },
                        },
                    }}
                >
                    <Button type="primary" size="large" onClick={chargebill}>
                        Confirm Booking
                    </Button>
                </ConfigProvider>
            </Space>
            {/* <Button variant='success' onClick={getBill}>Get Bill</Button> */}
        </div>
    );
}

export default Bill;
